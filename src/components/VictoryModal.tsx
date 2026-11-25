import { ArrowRight, Map, RotateCcw, Star } from 'lucide-react';
import { motion } from 'motion/react';
import type { LocationDef } from '../types/game';
import { UI_TEXT } from '../data/i18n';
import { CharacterPortrait } from './CharacterPortrait';

interface VictoryModalProps {
  location: LocationDef;
  elapsedSec: number;
  hintsUsed: number;
  totalItems: number;
  stars: number;
  onMap: () => void;
  onReplay: () => void;
  onNext: () => void;
}

function formatTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function VictoryModal({
  location,
  elapsedSec,
  hintsUsed,
  totalItems,
  stars,
  onMap,
  onReplay,
  onNext,
}: VictoryModalProps) {
  const ui = UI_TEXT;
  const isFinale = location.id === 15;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#140E0B]/80 p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-[#DFD2BC] bg-[#FAF5EB] text-center text-[#2A1F1A] shadow-[0_28px_70px_rgba(0,0,0,0.6)]"
      >
        <div className="border-b border-[#E7DBC7] bg-gradient-to-b from-[#F4EAD6] to-[#FAF5EB] px-6 pt-6 pb-5">
          {/* Family portraits */}
          {isFinale ? (
            <div className="mb-4 flex items-end justify-center gap-2 sm:gap-3">
              <CharacterPortrait character="sasha" size="sm" />
              <CharacterPortrait character="liza" size="md" />
              <CharacterPortrait character="mila" size="lg" highlighted />
              <CharacterPortrait character="misha" size="sm" />
            </div>
          ) : (
            <div className="mb-4 flex justify-center">
              <CharacterPortrait character="mila" size="lg" highlighted />
            </div>
          )}

          <p className="text-xs font-bold tracking-wide text-[#9C5710]">
            {ui.chapterLabel} {location.id} · {location.title}
          </p>
          <h2 className="font-display mt-1 text-2xl font-bold text-[#2A1F1A] sm:text-3xl">
            {isFinale ? ui.finaleTitle : ui.victoryTitle}
          </h2>

          {/* Star rating */}
          <div className="mt-3 flex items-center justify-center gap-2">
            {[1, 2, 3].map((n) => (
              <Star
                key={n}
                className={`h-8 w-8 transition-transform ${
                  n <= stars
                    ? 'fill-[#F5B942] text-[#C67B1E] drop-shadow-sm'
                    : 'fill-[#E7DCC9] text-[#CFC0A6]'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="px-6 py-5">
          <p className="text-[15px] italic leading-relaxed text-[#433329]">
            {location.outro}
          </p>

          {/* Clean tabular summary row */}
          <div className="mt-5 grid grid-cols-3 divide-x divide-[#E6D9C3] border-y border-[#E6D9C3] py-3 text-center">
            <div>
              <div className="text-xs font-medium text-[#7A6754]">{ui.timeLabel}</div>
              <div className="font-mono-tabular mt-0.5 text-base font-bold text-[#2A1F1A]">
                {formatTime(elapsedSec)}
              </div>
            </div>
            <div>
              <div className="text-xs font-medium text-[#7A6754]">{ui.itemsFoundLabel}</div>
              <div className="font-mono-tabular mt-0.5 text-base font-bold text-[#1F8A68]">
                {totalItems}/{totalItems}
              </div>
            </div>
            <div>
              <div className="text-xs font-medium text-[#7A6754]">{ui.hintsUsedLabel}</div>
              <div className="font-mono-tabular mt-0.5 text-base font-bold text-[#2A1F1A]">
                {hintsUsed}/3
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
            <button
              type="button"
              onClick={onMap}
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-[#D8C8AE] bg-white px-4 py-2 text-sm font-bold text-[#3D2E25] transition-colors hover:bg-[#F3EBD9] whitespace-nowrap shrink-0"
            >
              <Map className="h-4 w-4" />
              <span>{ui.backToMap}</span>
            </button>
            <button
              type="button"
              onClick={onReplay}
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-[#D8C8AE] bg-white px-4 py-2 text-sm font-bold text-[#3D2E25] transition-colors hover:bg-[#F3EBD9] whitespace-nowrap shrink-0"
            >
              <RotateCcw className="h-4 w-4" />
              <span>{ui.replayBtn}</span>
            </button>
            <button
              type="button"
              onClick={onNext}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[#C67B1E] px-5 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#AE6915] whitespace-nowrap shrink-0"
            >
              <span>{isFinale ? ui.finishAdventureBtn : ui.nextLocationBtn}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
