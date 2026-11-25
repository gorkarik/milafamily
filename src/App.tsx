import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { GameSave, Lang } from './types/game';
import { getLocationById, LOCATIONS } from './data/locations';
import { PREBAKED_SCENES } from './data/prebakedScenes';
import { UI_TEXT } from './data/i18n';
import { audioEngine } from './lib/audioEngine';
import { TitleScreen } from './components/TitleScreen';
import { MapScreen } from './components/MapScreen';
import { GameScreen } from './components/GameScreen';

type ScreenMode = 'title' | 'map' | 'game';

const SAVE_KEY = 'mila_adventure_save_v2';
const LANG_KEY = 'mila_l';

function loadInitialLang(): Lang {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === 'ru' || saved === 'uk' || saved === 'sk') return saved;
  } catch {
    // ignore storage errors in restricted iframes
  }
  return 'ru';
}

function loadInitialSave(): GameSave {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<GameSave>;
      return {
        unlocked: Math.max(1, Math.min(LOCATIONS.length, Number(parsed.unlocked) || 1)),
        stars: parsed.stars ?? {},
        bestTime: parsed.bestTime ?? {},
      };
    }
  } catch {
    // ignore storage errors
  }
  return { unlocked: 1, stars: {}, bestTime: {} };
}

export default function App() {
  const [screen, setScreen] = useState<ScreenMode>('title');
  const [lang, setLang] = useState<Lang>(loadInitialLang);
  const [muted, setMuted] = useState<boolean>(() => audioEngine.isMuted());
  const [save, setSave] = useState<GameSave>(loadInitialSave);
  const [mapToast, setMapToast] = useState<string | null>(null);
  const [currentLocationId, setCurrentLocationId] = useState<number>(1);

  const mapToastTimerRef = useRef<number | null>(null);

  // Persist save & language
  useEffect(() => {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(save));
    } catch {
      // ignore
    }
  }, [save]);

  useEffect(() => {
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch {
      // ignore
    }
    document.documentElement.lang = lang;
  }, [lang]);

  // Global first-gesture audio unlock for iOS/Android
  useEffect(() => {
    const unlockOnce = () => {
      audioEngine.unlock();
    };
    window.addEventListener('pointerdown', unlockOnce, { once: true, passive: true });
    window.addEventListener('touchstart', unlockOnce, { once: true, passive: true });
    return () => {
      window.removeEventListener('pointerdown', unlockOnce);
      window.removeEventListener('touchstart', unlockOnce);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (mapToastTimerRef.current) window.clearTimeout(mapToastTimerRef.current);
    };
  }, []);

  // Pre-mapped thumbnails for all unlocked locations directly from local assets
  const thumbnails = useMemo(() => {
    const map: Record<number, string> = {};
    for (const loc of LOCATIONS) {
      if (loc.id <= save.unlocked) {
        const scene = PREBAKED_SCENES[loc.id];
        if (scene) map[loc.id] = scene.imageDataUrl;
      }
    }
    return map;
  }, [save.unlocked]);

  const showMapToast = useCallback((msg: string) => {
    setMapToast(msg);
    if (mapToastTimerRef.current) window.clearTimeout(mapToastTimerRef.current);
    mapToastTimerRef.current = window.setTimeout(() => setMapToast(null), 2200);
  }, []);

  const handleChangeLang = useCallback((nextLang: Lang) => {
    audioEngine.playTap();
    setLang(nextLang);
  }, []);

  const handleCycleLang = useCallback(() => {
    const order: Lang[] = ['ru', 'uk', 'sk'];
    const next = order[(order.indexOf(lang) + 1) % order.length];
    handleChangeLang(next);
  }, [lang, handleChangeLang]);

  const handleToggleMute = useCallback(() => {
    const nextMuted = audioEngine.toggleMute();
    setMuted(nextMuted);
  }, []);

  const handleOpenLocation = useCallback((locationId: number) => {
    audioEngine.playTap();
    setCurrentLocationId(locationId);
    setScreen('game');
  }, []);

  const handleCompleteLocation = useCallback(
    (stars: number, elapsedSec: number) => {
      setSave((prev) => {
        const prevStars = prev.stars[currentLocationId] ?? 0;
        const prevBest = prev.bestTime[currentLocationId];
        return {
          unlocked: Math.min(LOCATIONS.length, Math.max(prev.unlocked, currentLocationId + 1)),
          stars: {
            ...prev.stars,
            [currentLocationId]: Math.max(prevStars, stars),
          },
          bestTime: {
            ...prev.bestTime,
            [currentLocationId]: prevBest == null ? elapsedSec : Math.min(prevBest, elapsedSec),
          },
        };
      });
    },
    [currentLocationId],
  );

  const handleNextLocation = useCallback(() => {
    audioEngine.playTap();
    if (currentLocationId < LOCATIONS.length) {
      setCurrentLocationId(currentLocationId + 1);
    } else {
      setScreen('map');
    }
  }, [currentLocationId]);

  const totalStars = Object.values(save.stars).reduce((acc, s) => acc + s, 0);
  const currentLocation = getLocationById(currentLocationId);
  const currentScene = PREBAKED_SCENES[currentLocationId] ?? PREBAKED_SCENES[1];

  if (screen === 'title') {
    return (
      <TitleScreen
        lang={lang}
        muted={muted}
        hasProgress={save.unlocked > 1 || totalStars > 0}
        totalStars={totalStars}
        onChangeLang={handleChangeLang}
        onToggleMute={handleToggleMute}
        onStart={() => {
          audioEngine.playTap();
          setScreen('map');
        }}
      />
    );
  }

  if (screen === 'map') {
    return (
      <MapScreen
        lang={lang}
        muted={muted}
        save={save}
        thumbnails={thumbnails}
        toastMsg={mapToast}
        onSelectLocation={handleOpenLocation}
        onLockedClick={() => {
          audioEngine.playMiss();
          showMapToast(UI_TEXT[lang].lockedToast);
        }}
        onUnlockAll={() => {
          audioEngine.playTap();
          setSave((prev) => ({ ...prev, unlocked: LOCATIONS.length }));
          showMapToast(UI_TEXT[lang].unlockAllToast);
        }}
        onCycleLang={handleCycleLang}
        onToggleMute={handleToggleMute}
        onBackToTitle={() => {
          audioEngine.playTap();
          setScreen('title');
        }}
      />
    );
  }

  return (
    <GameScreen
      location={currentLocation}
      lang={lang}
      muted={muted}
      scene={currentScene}
      onCycleLang={handleCycleLang}
      onToggleMute={handleToggleMute}
      onBackToMap={() => setScreen('map')}
      onCompleteLocation={handleCompleteLocation}
      onNextLocation={handleNextLocation}
    />
  );
}
