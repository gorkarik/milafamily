import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import type { Lang, LocationDef } from '../types/game';
import { UI_TEXT } from '../data/i18n';
import { CharacterPortrait } from './CharacterPortrait';

interface LoadingScreenProps {
  lang: Lang;
  location: LocationDef;
}

export function LoadingScreen({ lang, location }: LoadingScreenProps) {
  const ui = UI_TEXT[lang];
  const [tipIndex, setTipIndex] = useState(0);
  const [stageStep, setStageStep] = useState<0 | 1>(0);

  useEffect(() => {
    const tipTimer = window.setInterval(() => {
      setTipIndex((prev) => (prev + 1) % ui.loadingTips.length);
    }, 3600);

    const stageTimer = window.setTimeout(() => {
      setStageStep(1);
    }, 6200);

    return () => {
      window.clearInterval(tipTimer);
      window.clearTimeout(stageTimer);
    };
  }, [ui.loadingTips.length, location.id]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-b from-[#231914] via-[#1B1411] to-[#140E0C] px-6 py-8 text-center text-[#FAF3E6]">
      <div className="w-full max-w-md">
        {/* Mila's portrait with pulsing & orbiting magnifying glass */}
        <div className="relative mx-auto mb-7 flex h-40 w-40 items-center justify-center">
          <div className="absolute inset-2 rounded-full border border-amber-400/25" />
          <div className="animate-hint-ring absolute inset-3 rounded-full border-2 border-amber-400/45" />
          <CharacterPortrait character="mila" lang={lang} size="xl" highlighted />
          <div className="animate-orbit-magnifier absolute left-1/2 top-1/2 -ml-5 -mt-5 flex h-10 w-10 items-center justify-center rounded-full border-2 border-amber-200 bg-[#2C1E16] text-amber-300 shadow-[0_6px_18px_rgba(0,0,0,0.45)]">
            <Search className="h-5 w-5" />
          </div>
        </div>

        <p className="text-xs font-semibold tracking-wide text-amber-300/90">
          {ui.chapterLabel} {location.id} · {location.title[lang]}
        </p>
        <h2 className="font-display mt-1.5 text-2xl font-bold text-[#FFF9EE] sm:text-3xl">
          {ui.loadingTitle}
        </h2>

        {/* Animated storybook progress rail */}
        <div className="mx-auto mt-5 h-2 w-full max-w-xs overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 transition-all duration-500 ease-out"
            style={{ width: stageStep === 0 ? '68%' : '94%' }}
          />
        </div>

        {/* Localized detective tips */}
        <div className="mt-6 rounded-xl border border-amber-200/15 bg-white/[0.04] px-4 py-3.5">
          <p className="text-sm leading-relaxed text-amber-50/90">
            {ui.loadingTips[tipIndex]}
          </p>
        </div>
      </div>
    </div>
  );
}
