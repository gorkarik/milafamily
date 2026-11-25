import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Check,
  Lightbulb,
  Map as MapIcon,
  Maximize2,
  RotateCcw,
  Volume2,
  VolumeX,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { CachedSceneData, HiddenItem, LocationDef } from '../types/game';
import { UI_TEXT } from '../data/i18n';
import { audioEngine } from '../lib/audioEngine';
import { AmbientOverlay } from './AmbientOverlay';
import { LoadingScreen } from './LoadingScreen';
import { StoryDialogueModal } from './StoryDialogueModal';
import { VictoryModal } from './VictoryModal';

interface GameScreenProps {
  location: LocationDef;
  muted: boolean;
  scene: CachedSceneData;
  onToggleMute: () => void;
  onBackToMap: () => void;
  onCompleteLocation: (stars: number, elapsedSec: number) => void;
  onNextLocation: () => void;
}

interface BurstEffect {
  id: number;
  xPct: number;
  yPct: number;
  label: string;
}

interface MissRipple {
  id: number;
  xPct: number;
  yPct: number;
}

const ACTIVE_SLOTS = 6;
const MAX_HINTS = 3;

function formatTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function GameScreen({
  location,
  muted,
  scene,
  onToggleMute,
  onBackToMap,
  onCompleteLocation,
  onNextLocation,
}: GameScreenProps) {
  const ui = UI_TEXT;

  // Intro flow: show Mini-Story & Dialogues before playing each location
  const [introDone, setIntroDone] = useState(false);
  const [replayNonce, setReplayNonce] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Gameplay state
  const [foundIds, setFoundIds] = useState<string[]>([]);
  const [justFoundIds, setJustFoundIds] = useState<string[]>([]);
  const [slots, setSlots] = useState<{ activeIds: string[]; queueIds: string[] }>({
    activeIds: [],
    queueIds: [],
  });
  const activeIds = slots.activeIds;
  const queueIds = slots.queueIds;
  const [hintsLeft, setHintsLeft] = useState(MAX_HINTS);
  const [hintTargetId, setHintTargetId] = useState<string | null>(null);
  const [elapsedSec, setElapsedSec] = useState(0);
  const [victory, setVictory] = useState<{ stars: number; elapsed: number; hintsUsed: number } | null>(null);

  // Feedback state
  const [bursts, setBursts] = useState<BurstEffect[]>([]);
  const [misses, setMisses] = useState<MissRipple[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [spamCooldown, setSpamCooldown] = useState(false);

  // Camera transform (scale + px pan offset relative to centered stage)
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [smoothCamera, setSmoothCamera] = useState(false);

  const stageRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [stageSize, setStageSize] = useState({ w: 1000, h: 600 });

  // Refs for gesture tracking, anti-spam, and deterministic timeout cleanup
  const missTimestampsRef = useRef<number[]>([]);
  const toastTimerRef = useRef<number | null>(null);
  const hintTimerRef = useRef<number | null>(null);
  const pendingTimersRef = useRef<number[]>([]);
  const effectIdRef = useRef(0);
  const comboRef = useRef(0);

  const scheduleTimeout = useCallback((fn: () => void, ms: number) => {
    const id = window.setTimeout(() => {
      pendingTimersRef.current = pendingTimersRef.current.filter((t) => t !== id);
      fn();
    }, ms);
    pendingTimersRef.current.push(id);
    return id;
  }, []);

  const clearPendingTimers = useCallback(() => {
    for (const id of pendingTimersRef.current) {
      window.clearTimeout(id);
    }
    pendingTimersRef.current = [];
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
      toastTimerRef.current = null;
    }
    if (hintTimerRef.current) {
      window.clearTimeout(hintTimerRef.current);
      hintTimerRef.current = null;
    }
  }, []);

  useEffect(() => clearPendingTimers, [clearPendingTimers]);

  // Pointer & pinch tracking
  const dragRef = useRef({
    active: false,
    pointerId: -1,
    startX: 0,
    startY: 0,
    origPanX: 0,
    origPanY: 0,
    moved: 0,
    isTouch: false,
  });
  const pinchRef = useRef<{
    active: boolean;
    startDist: number;
    startZoom: number;
  }>({ active: false, startDist: 0, startZoom: 1 });

  const showToast = useCallback((msg: string, ms = 2200) => {
    setToast(msg);
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToast(null), ms);
  }, []);

  // Measure stage dimensions
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const update = () => {
      setStageSize({ w: el.clientWidth || 1, h: el.clientHeight || 1 });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Compute natural 16:9 fitted dimensions inside stage
  const fittedSize = useMemo(() => {
    const aspect = 16 / 9;
    const stageAspect = stageSize.w / Math.max(1, stageSize.h);
    if (stageAspect > aspect) {
      const h = stageSize.h;
      return { w: h * aspect, h };
    }
    const w = stageSize.w;
    return { w, h: w / aspect };
  }, [stageSize]);

  // Comfortable portrait initial zoom so mobile players see rich artwork filling height & can 1-finger pan
  const defaultZoom = useMemo(() => {
    const isPortrait = stageSize.h > stageSize.w * 1.05;
    if (!isPortrait) return 1;
    const fillHeightScale = stageSize.h / Math.max(1, fittedSize.h);
    return Math.min(2.05, Math.max(1.25, fillHeightScale * 0.94));
  }, [stageSize, fittedSize]);

  const defaultZoomRef = useRef(defaultZoom);
  defaultZoomRef.current = defaultZoom;

  const clampPan = useCallback(
    (x: number, y: number, targetZoom: number) => {
      const scaledW = fittedSize.w * targetZoom;
      const scaledH = fittedSize.h * targetZoom;
      const maxX = Math.max(0, (scaledW - stageSize.w) / 2 + 24);
      const maxY = Math.max(0, (scaledH - stageSize.h) / 2 + 24);
      return {
        x: Math.max(-maxX, Math.min(maxX, x)),
        y: Math.max(-maxY, Math.min(maxY, y)),
      };
    },
    [fittedSize, stageSize],
  );

  const resetCamera = useCallback(
    (targetZ?: number) => {
      const z = targetZ ?? defaultZoom;
      setSmoothCamera(true);
      setZoom(z);
      setPan({ x: 0, y: 0 });
      scheduleTimeout(() => setSmoothCamera(false), 360);
    },
    [defaultZoom, scheduleTimeout],
  );

  // Reset intro when switching to a different location
  useEffect(() => {
    setIntroDone(false);
    setImageLoaded(false);
  }, [location.id, scene.imageDataUrl]);

  // Immediately detect cached browser images so LoadingScreen never sticks
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      setImageLoaded(true);
    }
  }, [scene.imageDataUrl]);

  // Deterministically initialize / reset level state ONLY on location change or replay (never on window resize/rotation!)
  useEffect(() => {
    clearPendingTimers();
    const allIds = scene.items.map((item) => item.id);
    setSlots({
      activeIds: allIds.slice(0, ACTIVE_SLOTS),
      queueIds: allIds.slice(ACTIVE_SLOTS),
    });
    setFoundIds([]);
    setJustFoundIds([]);
    setHintsLeft(MAX_HINTS);
    setHintTargetId(null);
    setElapsedSec(0);
    setVictory(null);
    setBursts([]);
    setMisses([]);
    setToast(null);
    setSpamCooldown(false);
    missTimestampsRef.current = [];
    comboRef.current = 0;
    setZoom(defaultZoomRef.current);
    setPan({ x: 0, y: 0 });
  }, [scene, replayNonce, clearPendingTimers]);

  // Apply portrait default zoom smoothly on initial layout measurement without resetting gameplay progress
  const prevOrientationRef = useRef<boolean | null>(null);
  useEffect(() => {
    if (stageSize.w <= 1 || stageSize.h <= 1) return;
    const isPortrait = stageSize.h > stageSize.w * 1.05;
    if (prevOrientationRef.current !== isPortrait) {
      prevOrientationRef.current = isPortrait;
      setZoom(defaultZoom);
      setPan({ x: 0, y: 0 });
    }
  }, [stageSize.w, stageSize.h, defaultZoom]);

  // Keep pan clamped if screen resizes / rotates
  useEffect(() => {
    setPan((prev) => clampPan(prev.x, prev.y, zoom));
  }, [clampPan, zoom]);

  const isPlaying = Boolean(introDone && imageLoaded && !victory);

  // Level timer
  useEffect(() => {
    if (!isPlaying) return;
    const id = window.setInterval(() => {
      setElapsedSec((prev) => prev + 1);
    }, 1000);
    return () => window.clearInterval(id);
  }, [isPlaying]);

  const itemMap = useMemo(() => {
    const map = new Map<string, HiddenItem>();
    for (const item of scene.items) {
      map.set(item.id, item);
    }
    return map;
  }, [scene.items]);

  const totalItems = scene.items.length;

  // Handle finding an active hidden item
  const handleItemFound = useCallback(
    (item: HiddenItem) => {
      if (foundIds.includes(item.id) || justFoundIds.includes(item.id)) return;

      audioEngine.playFound(comboRef.current);
      comboRef.current += 1;

      const [ymin, xmin, ymax, xmax] = item.box_2d;
      const cxPct = ((xmin + xmax) / 2) / 10;
      const cyPct = ((ymin + ymax) / 2) / 10;
      const burstId = ++effectIdRef.current;

      setBursts((prev) => [
        ...prev,
        { id: burstId, xPct: cxPct, yPct: cyPct, label: item.name },
      ]);
      scheduleTimeout(() => {
        setBursts((prev) => prev.filter((b) => b.id !== burstId));
      }, 1150);

      showToast(`${ui.foundToastPrefix} ${item.name}`);

      if (hintTargetId === item.id) {
        setHintTargetId(null);
      }

      const nextFound = [...foundIds, item.id];
      setFoundIds(nextFound);
      setJustFoundIds((prev) => [...prev, item.id]);

      // After cross-off flash, atomically slide in next queued item into that exact slot
      scheduleTimeout(() => {
        setJustFoundIds((prev) => prev.filter((id) => id !== item.id));
        setSlots((prev) => {
          const idx = prev.activeIds.indexOf(item.id);
          if (idx === -1) return prev;
          const [nextUp, ...restQueue] = prev.queueIds;
          const nextActive = [...prev.activeIds];
          if (nextUp) {
            nextActive[idx] = nextUp;
          } else {
            nextActive.splice(idx, 1);
          }
          return { activeIds: nextActive, queueIds: restQueue };
        });
      }, 650);

      // Check level completion
      if (totalItems > 0 && nextFound.length >= totalItems) {
        const hintsUsed = MAX_HINTS - hintsLeft;
        const stars =
          elapsedSec <= 120 && hintsUsed === 0
            ? 3
            : elapsedSec <= 210 && hintsUsed <= 1
              ? 2
              : 1;
        scheduleTimeout(() => {
          audioEngine.playVictory();
          setVictory({ stars, elapsed: elapsedSec, hintsUsed });
          onCompleteLocation(stars, elapsedSec);
        }, 720);
      }
    },
    [
      foundIds,
      justFoundIds,
      showToast,
      ui.foundToastPrefix,
      hintTargetId,
      totalItems,
      hintsLeft,
      elapsedSec,
      onCompleteLocation,
      scheduleTimeout,
    ],
  );

  // Validate click/tap coordinates against currently active 6 targets with touch-friendly tolerance
  const handleSceneTap = useCallback(
    (clientX: number, clientY: number, isTouch: boolean) => {
      if (!isPlaying || spamCooldown) return;
      const imgEl = imgRef.current;
      if (!imgEl) return;

      const rect = imgEl.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      const normX = ((clientX - rect.left) / rect.width) * 1000;
      const normY = ((clientY - rect.top) / rect.height) * 1000;
      if (normX < 0 || normX > 1000 || normY < 0 || normY > 1000) return;

      const pad = isTouch ? 28 : 20;
      const minHalf = isTouch ? 34 : 26;

      let bestMatch: HiddenItem | null = null;
      let bestScore = Infinity;

      for (const id of activeIds) {
        if (foundIds.includes(id) || justFoundIds.includes(id)) continue;
        const item = itemMap.get(id);
        if (!item) continue;

        const [ymin, xmin, ymax, xmax] = item.box_2d;
        const cy = (ymin + ymax) / 2;
        const cx = (xmin + xmax) / 2;
        const halfH = Math.max((ymax - ymin) / 2 + pad, minHalf);
        const halfW = Math.max((xmax - xmin) / 2 + pad, minHalf);

        const insidePadded =
          normY >= cy - halfH &&
          normY <= cy + halfH &&
          normX >= cx - halfW &&
          normX <= cx + halfW;

        if (!insidePadded) continue;

        const insideExact = normY >= ymin && normY <= ymax && normX >= xmin && normX <= xmax;
        const dist = Math.hypot(normX - cx, normY - cy);
        const score = insideExact ? dist * 0.25 : dist + 100;
        if (score < bestScore) {
          bestScore = score;
          bestMatch = item;
        }
      }

      if (bestMatch) {
        handleItemFound(bestMatch);
        return;
      }

      // Miss-click handling + anti-spam detector
      audioEngine.playMiss();
      comboRef.current = 0;

      const missId = ++effectIdRef.current;
      setMisses((prev) => [...prev, { id: missId, xPct: normX / 10, yPct: normY / 10 }]);
      scheduleTimeout(() => {
        setMisses((prev) => prev.filter((m) => m.id !== missId));
      }, 650);

      const now = Date.now();
      missTimestampsRef.current = missTimestampsRef.current.filter((t) => now - t < 2400);
      missTimestampsRef.current.push(now);

      if (missTimestampsRef.current.length >= 4) {
        missTimestampsRef.current = [];
        setSpamCooldown(true);
        scheduleTimeout(() => setSpamCooldown(false), 2400);
      }
    },
    [
      isPlaying,
      spamCooldown,
      activeIds,
      foundIds,
      justFoundIds,
      itemMap,
      handleItemFound,
      scheduleTimeout,
    ],
  );

  // Hint: smoothly pan/zoom camera directly onto an active unfound item & pulse golden ring
  const handleUseHint = useCallback(() => {
    if (!isPlaying) return;
    if (hintsLeft <= 0) {
      showToast(ui.noHintsToast);
      return;
    }

    const candidates = activeIds
      .filter((id) => !foundIds.includes(id) && !justFoundIds.includes(id))
      .map((id) => itemMap.get(id))
      .filter((it): it is HiddenItem => Boolean(it));

    if (candidates.length === 0) return;

    const target = candidates[0];
    setHintsLeft((prev) => Math.max(0, prev - 1));
    setHintTargetId(target.id);
    audioEngine.playHint();
    showToast(`${ui.hintActiveToast} (${target.name})`, 3000);

    // Compute pan offset to center target's box_2d at comfortable zoom
    const [ymin, xmin, ymax, xmax] = target.box_2d;
    const cxNorm = (xmin + xmax) / 2000 - 0.5; // -0.5 .. +0.5
    const cyNorm = (ymin + ymax) / 2000 - 0.5;
    const targetZoom = Math.max(2.05, defaultZoom);
    const desiredPanX = -cxNorm * fittedSize.w * targetZoom;
    const desiredPanY = -cyNorm * fittedSize.h * targetZoom;

    setSmoothCamera(true);
    setZoom(targetZoom);
    setPan(clampPan(desiredPanX, desiredPanY, targetZoom));
    scheduleTimeout(() => setSmoothCamera(false), 520);

    if (hintTimerRef.current) window.clearTimeout(hintTimerRef.current);
    hintTimerRef.current = window.setTimeout(() => {
      setHintTargetId((cur) => (cur === target.id ? null : cur));
    }, 4800);
  }, [
    isPlaying,
    hintsLeft,
    showToast,
    ui.noHintsToast,
    ui.hintActiveToast,
    activeIds,
    foundIds,
    justFoundIds,
    itemMap,
    defaultZoom,
    fittedSize,
    clampPan,
    scheduleTimeout,
  ]);

  const stepZoom = useCallback(
    (delta: number) => {
      setSmoothCamera(true);
      setZoom((prev) => {
        const next = Math.max(1, Math.min(3.2, Number((prev + delta).toFixed(2))));
        setPan((p) => clampPan(p.x, p.y, next));
        return next;
      });
      scheduleTimeout(() => setSmoothCamera(false), 260);
    },
    [clampPan, scheduleTimeout],
  );

  // Non-passive wheel zoom listener so preventDefault never triggers passive listener warnings
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (!isPlaying) return;
      e.preventDefault();
      const delta = e.deltaY < 0 ? 0.25 : -0.25;
      setZoom((prev) => {
        const next = Math.max(1, Math.min(3.2, Number((prev + delta).toFixed(2))));
        setPan((p) => clampPan(p.x, p.y, next));
        return next;
      });
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [isPlaying, clampPan]);

  // Single-finger pan & tap via Pointer Events (with pointer capture for smooth desktop drags)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPlaying || pinchRef.current.active || !e.isPrimary) return;
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    audioEngine.unlock();
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore if pointer capture is unavailable
    }
    dragRef.current = {
      active: true,
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      origPanX: pan.x,
      origPanY: pan.y,
      moved: 0,
      isTouch: e.pointerType === 'touch',
    };
    setSmoothCamera(false);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active || pinchRef.current.active) return;
    if (dragRef.current.pointerId !== e.pointerId) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    dragRef.current.moved = Math.hypot(dx, dy);

    if (dragRef.current.moved > 5 && zoom > 1.01) {
      setPan(clampPan(dragRef.current.origPanX + dx, dragRef.current.origPanY + dy, zoom));
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active || dragRef.current.pointerId !== e.pointerId) return;
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // ignore
    }
    const wasTap = dragRef.current.moved < 10 && !pinchRef.current.active;
    const isTouch = dragRef.current.isTouch;
    dragRef.current.active = false;

    if (wasTap) {
      handleSceneTap(e.clientX, e.clientY, isTouch);
    }
  };

  // Two-finger pinch-to-zoom for mobile touchscreens
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2) {
      dragRef.current.active = false;
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY,
      );
      pinchRef.current = { active: true, startDist: Math.max(1, dist), startZoom: zoom };
      setSmoothCamera(false);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2 && pinchRef.current.active) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY,
      );
      const nextZoom = Math.max(
        1,
        Math.min(3.2, pinchRef.current.startZoom * (dist / pinchRef.current.startDist)),
      );
      setZoom(nextZoom);
      setPan((p) => clampPan(p.x, p.y, nextZoom));
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length < 2) {
      pinchRef.current.active = false;
    }
  };

  const handleReplay = useCallback(() => {
    audioEngine.playTap();
    setReplayNonce((n) => n + 1);
  }, []);

  const hintedItem = hintTargetId ? itemMap.get(hintTargetId) ?? null : null;
  const progressPct = totalItems > 0 ? Math.round((foundIds.length / totalItems) * 100) : 0;

  return (
    <div className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-[#16100D] text-[#FAF5EB] select-none">
      {/* Compact Top HUD */}
      <header className="z-20 flex h-13 shrink-0 items-center justify-between gap-2 border-b border-amber-200/12 bg-[#211813]/96 px-2.5 sm:px-4">
        {/* Left: Map + Chapter Title */}
        <div className="flex min-w-0 items-center gap-2">
          <button
            type="button"
            onClick={() => {
              audioEngine.playTap();
              onBackToMap();
            }}
            className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg border border-amber-200/15 bg-white/[0.06] px-2.5 text-xs font-bold text-amber-100 transition-colors hover:bg-white/12 whitespace-nowrap shrink-0"
          >
            <MapIcon className="h-4 w-4 text-amber-300" />
            <span className="hidden sm:inline">{ui.backToMap}</span>
          </button>

          <div className="min-w-0">
            <h1 className="font-display truncate text-sm font-bold text-[#FFF6E5] sm:text-base">
              {location.id}. {location.title}
            </h1>
          </div>
        </div>

        {/* Center/Right: Clean unboxed metrics + interactive controls */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <div className="flex items-center gap-2 px-1.5 text-xs font-semibold text-amber-100/90 sm:gap-3 sm:px-2 sm:text-sm">
            <span className="font-mono-tabular text-amber-200">{formatTime(elapsedSec)}</span>
            <span className="text-amber-200/35" aria-hidden="true">·</span>
            <span className="font-mono-tabular whitespace-nowrap">
              <span className="hidden md:inline text-amber-200/75">{ui.foundLabel}: </span>
              <strong className="text-emerald-300">{foundIds.length}</strong>
              <span className="text-amber-100/60">/{totalItems}</span>
            </span>
          </div>

          {/* Hint button */}
          <button
            type="button"
            disabled={!isPlaying || hintsLeft <= 0}
            onClick={handleUseHint}
            className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg bg-[#D98A2B] px-2.5 text-xs font-extrabold text-[#1C1208] shadow-sm transition-colors hover:bg-[#E79B3B] disabled:cursor-not-allowed disabled:opacity-40 whitespace-nowrap shrink-0 sm:px-3"
          >
            <Lightbulb className="h-4 w-4" />
            <span className="hidden lg:inline">{ui.hintBtn}</span>
            <span className="font-mono-tabular">{hintsLeft}</span>
          </button>

          {/* Zoom controls (desktop/tablet) */}
          <div className="hidden items-center gap-1 md:flex">
            <button
              type="button"
              onClick={() => stepZoom(-0.35)}
              title={ui.zoomOutBtn}
              aria-label={ui.zoomOutBtn}
              className="inline-flex h-[38px] w-[36px] items-center justify-center rounded-lg border border-amber-200/15 bg-white/[0.05] text-amber-100 hover:bg-white/12"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => stepZoom(0.35)}
              title={ui.zoomInBtn}
              aria-label={ui.zoomInBtn}
              className="inline-flex h-[38px] w-[36px] items-center justify-center rounded-lg border border-amber-200/15 bg-white/[0.05] text-amber-100 hover:bg-white/12"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => resetCamera(1)}
              title={ui.resetViewBtn}
              aria-label={ui.resetViewBtn}
              className="inline-flex h-[38px] w-[36px] items-center justify-center rounded-lg border border-amber-200/15 bg-white/[0.05] text-amber-100 hover:bg-white/12"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
          </div>

          {/* Mobile Reset View */}
          <button
            type="button"
            onClick={() => resetCamera(zoom > 1.08 ? 1 : defaultZoom)}
            title={ui.resetViewBtn}
            aria-label={ui.resetViewBtn}
            className="inline-flex h-[38px] w-[36px] items-center justify-center rounded-lg border border-amber-200/15 bg-white/[0.05] text-amber-100 hover:bg-white/12 md:hidden"
          >
            <Maximize2 className="h-4 w-4" />
          </button>

          {/* Replay current level */}
          <button
            type="button"
            onClick={handleReplay}
            title={ui.replayBtn}
            aria-label={ui.replayBtn}
            className="inline-flex h-[38px] w-[36px] items-center justify-center rounded-lg border border-amber-200/15 bg-white/[0.05] text-amber-100 transition-colors hover:bg-white/12 shrink-0"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>

          {/* Audio toggle */}
          <button
            type="button"
            onClick={onToggleMute}
            aria-label={muted ? ui.soundOff : ui.soundOn}
            className="inline-flex h-[38px] w-[36px] items-center justify-center rounded-lg border border-amber-200/15 bg-white/[0.05] text-amber-100 hover:bg-white/12 shrink-0"
          >
            {muted ? <VolumeX className="h-4 w-4 text-stone-400" /> : <Volume2 className="h-4 w-4 text-amber-300" />}
          </button>
        </div>
      </header>

      {/* Main Responsive Workspace: Side-docked on Desktop & Mobile Landscape, Bottom-docked on Mobile Portrait */}
      <div className="flex min-h-0 flex-1 flex-col lg:flex-row [@media(orientation:landscape)_and_(min-width:560px)]:flex-row">
        {/* Interactive Scene Stage */}
        <div
          ref={stageRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-[#120D0A] touch-none"
        >
          {/* Scene canvas */}
          <div
            className={`relative will-change-transform ${
              smoothCamera ? 'transition-transform duration-400 ease-out' : ''
            } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{
              width: `${fittedSize.w}px`,
              height: `${fittedSize.h}px`,
              transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
              cursor: zoom > 1.02 ? 'grab' : 'crosshair',
            }}
          >
            <img
              ref={imgRef}
              src={scene.imageDataUrl}
              alt={location.title}
              referrerPolicy="no-referrer"
              draggable={false}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(true)}
              className="h-full w-full rounded-sm object-cover shadow-[0_18px_50px_rgba(0,0,0,0.75)]"
            />

            {/* Lightweight looping atmospheric ambient effects */}
            <AmbientOverlay type={location.ambient} />

            {/* Golden pulsing hint beacon */}
            {hintedItem && (
              <div
                className="pointer-events-none absolute z-20"
                style={{
                  left: `${((hintedItem.box_2d[1] + hintedItem.box_2d[3]) / 2) / 10}%`,
                  top: `${((hintedItem.box_2d[0] + hintedItem.box_2d[2]) / 2) / 10}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className="animate-hint-ring h-20 w-20 rounded-full border-4 border-[#F5B942] bg-[#F5B942]/15 shadow-[0_0_28px_rgba(245,185,66,0.9)]" />
                <div className="absolute inset-3 rounded-full border-2 border-dashed border-white/95" />
              </div>
            )}

            {/* Found sparkle burst + floating name */}
            {bursts.map((b) => (
              <div
                key={b.id}
                className="pointer-events-none absolute z-30"
                style={{
                  left: `${b.xPct}%`,
                  top: `${b.yPct}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className="animate-sparkle-burst h-16 w-16 rounded-full border-4 border-amber-300 bg-emerald-400/25 shadow-[0_0_24px_rgba(255,220,110,0.95)]" />
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.9 }}
                  animate={{ opacity: 1, y: -22, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute left-1/2 top-0 -translate-x-1/2 whitespace-nowrap rounded-lg bg-[#1F8A68] px-2.5 py-1 text-xs font-extrabold text-white shadow-lg"
                >
                  {b.label}
                </motion.div>
              </div>
            ))}

            {/* Soft miss-click ripple */}
            {misses.map((m) => (
              <div
                key={m.id}
                className="pointer-events-none absolute z-20"
                style={{
                  left: `${m.xPct}%`,
                  top: `${m.yPct}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className="animate-sparkle-burst h-9 w-9 rounded-full border-2 border-rose-400/90 bg-rose-500/15" />
              </div>
            ))}
          </div>

          {/* Smooth loading screen while the local illustration image finishes decoding */}
          {!imageLoaded && (
            <div className="absolute inset-0 z-25">
              <LoadingScreen location={location} />
            </div>
          )}

          {/* Transient found / hint toast */}
          <AnimatePresence>
            {toast && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
                className="pointer-events-none absolute top-3 left-1/2 z-30 -translate-x-1/2 rounded-xl border border-amber-400/45 bg-[#201611]/94 px-4 py-2 text-xs font-bold text-amber-100 shadow-xl sm:text-sm whitespace-nowrap"
              >
                {toast}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Anti-spam miss-click cooldown overlay */}
          <AnimatePresence>
            {spamCooldown && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-30 flex items-center justify-center bg-black/55 p-4 backdrop-blur-[2px]"
              >
                <div className="max-w-xs rounded-2xl border border-amber-300/60 bg-[#FAF5EB] px-5 py-4 text-center text-[#2A1F1A] shadow-2xl">
                  <p className="font-display text-lg font-bold text-[#9C4A1A]">
                    {ui.spamWarningTitle}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-[#5C4A3C]">
                    {ui.spamWarningSub}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Smart Search List Panel:
            - Right vertical docked panel on Desktop & Mobile Landscape
            - Compact 2-row x 3-col tile panel at bottom on Mobile Portrait */}
        <aside className="z-20 flex shrink-0 flex-col border-t border-[#DFD2BC] bg-[#FAF5EB] text-[#2A1F1A] lg:h-full lg:w-76 lg:border-t-0 lg:border-l xl:w-84 [@media(orientation:landscape)_and_(min-width:560px)]:h-full [@media(orientation:landscape)_and_(min-width:560px)]:w-60 [@media(orientation:landscape)_and_(min-width:560px)]:border-t-0 [@media(orientation:landscape)_and_(min-width:560px)]:border-l lg:[@media(orientation:landscape)_and_(min-width:560px)]:w-76 xl:[@media(orientation:landscape)_and_(min-width:560px)]:w-84">
          {/* Panel Header + Total Progress */}
          <div className="border-b border-[#E7DBC7] bg-[#F3EAD9] px-3 py-2 sm:px-4 sm:py-3">
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-display text-sm font-bold text-[#2A1F1A] sm:text-base">
                {ui.searchListTitle}
              </h2>
              <div className="font-mono-tabular text-xs font-bold text-[#6E5640]">
                {ui.foundLabel}: <span className="text-[#1F8A68]">{foundIds.length}</span> / {totalItems}
              </div>
            </div>

            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[#E1D4BE]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#C67B1E] to-[#1F8A68] transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>

            {queueIds.length > 0 && (
              <p className="mt-1 hidden text-[11px] font-medium text-[#7D6955] lg:block">
                {ui.remainingQueue}: <span className="font-mono-tabular font-bold">{queueIds.length}</span>
              </p>
            )}
          </div>

          {/* 6 Active Targets: 3x2 grid on Mobile Portrait, vertical crisp stack on Desktop/Landscape */}
          <div className="grid grid-cols-3 gap-1.5 p-2 lg:flex lg:flex-1 lg:flex-col lg:gap-2 lg:overflow-y-auto lg:p-3.5 [@media(orientation:landscape)_and_(min-width:560px)]:flex [@media(orientation:landscape)_and_(min-width:560px)]:flex-1 [@media(orientation:landscape)_and_(min-width:560px)]:flex-col [@media(orientation:landscape)_and_(min-width:560px)]:gap-1.5 [@media(orientation:landscape)_and_(min-width:560px)]:overflow-y-auto [@media(orientation:landscape)_and_(min-width:560px)]:p-2.5">
            <AnimatePresence mode="popLayout">
              {activeIds.map((id) => {
                const item = itemMap.get(id);
                if (!item) return null;
                const isJustFound = justFoundIds.includes(id);
                const isHinted = hintTargetId === id;

                return (
                  <motion.div
                    key={id}
                    layout
                    initial={{ opacity: 0, x: 14, scale: 0.96 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -16, scale: 0.94 }}
                    transition={{ duration: 0.22 }}
                    className={`flex min-h-[46px] flex-col justify-center rounded-xl border px-2.5 py-2 transition-colors lg:min-h-[54px] lg:flex-row lg:items-center lg:justify-between lg:px-3.5 lg:py-2.5 ${
                      isJustFound
                        ? 'border-[#1F8A68] bg-[#E3F6EE] text-[#14644B]'
                        : isHinted
                          ? 'border-[#D98A2B] bg-[#FFF2D4] text-[#7D4508] shadow-sm'
                          : 'border-[#E5D9C5] bg-white text-[#2A1F1A]'
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div
                        className={`truncate text-xs font-bold leading-snug lg:text-[14px] ${
                          isJustFound ? 'line-through opacity-75' : ''
                        }`}
                        title={item.name}
                      >
                        {item.name}
                      </div>
                      <div className="hidden text-[11px] font-medium text-[#8B7662] lg:block">
                        {ui.difficulty[item.difficulty]}
                      </div>
                    </div>

                    {isJustFound && (
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1F8A68] text-white lg:mt-0 lg:ml-2">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Subtle footer guidance on desktop */}
          <div className="hidden border-t border-[#E7DBC7] bg-[#F5EFE2] px-4 py-2.5 text-[11px] font-medium text-[#7C6956] lg:block">
            {ui.controlsHintDesktop}
          </div>
        </aside>
      </div>

      {/* Pre-scene Mini-Story & Character Dialogue Modal */}
      {!introDone && (
        <StoryDialogueModal
          key={location.id}
          location={location}
          onFinish={() => setIntroDone(true)}
        />
      )}

      {/* Victory Modal */}
      {victory && (
        <VictoryModal
          location={location}
          elapsedSec={victory.elapsed}
          hintsUsed={victory.hintsUsed}
          totalItems={totalItems}
          stars={victory.stars}
          onMap={onBackToMap}
          onReplay={handleReplay}
          onNext={onNextLocation}
        />
      )}
    </div>
  );
}
