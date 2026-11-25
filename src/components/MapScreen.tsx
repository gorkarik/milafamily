import { ArrowLeft, Globe, Lock, Star, Unlock, Volume2, VolumeX } from 'lucide-react';
import type { GameSave, Lang } from '../types/game';
import { LOCATIONS } from '../data/locations';
import { UI_TEXT } from '../data/i18n';
import { CharacterPortrait } from './CharacterPortrait';

interface MapScreenProps {
  lang: Lang;
  muted: boolean;
  save: GameSave;
  thumbnails: Record<number, string>;
  toastMsg: string | null;
  onSelectLocation: (locationId: number) => void;
  onLockedClick: () => void;
  onUnlockAll: () => void;
  onCycleLang: () => void;
  onToggleMute: () => void;
  onBackToTitle: () => void;
}

function formatTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function MapScreen({
  lang,
  muted,
  save,
  thumbnails,
  toastMsg,
  onSelectLocation,
  onLockedClick,
  onUnlockAll,
  onCycleLang,
  onToggleMute,
  onBackToTitle,
}: MapScreenProps) {
  const ui = UI_TEXT[lang];
  const totalStars = Object.values(save.stars).reduce((acc, s) => acc + s, 0);
  const allUnlocked = save.unlocked >= LOCATIONS.length;

  return (
    <div className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-[#19120F] text-[#FAF5EB]">
      {/* Top Bar */}
      <header className="z-20 flex shrink-0 items-center justify-between gap-3 border-b border-amber-200/10 bg-[#221914]/95 px-4 py-3 backdrop-blur-md sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onBackToTitle}
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-amber-200/15 bg-white/[0.05] px-3 py-1.5 text-xs font-bold text-amber-100 transition-colors hover:bg-white/10 whitespace-nowrap shrink-0"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">{ui.backToTitle}</span>
          </button>
          <div className="min-w-0">
            <h1 className="font-display truncate text-lg font-bold text-[#FFF8EB] sm:text-xl">
              {ui.mapTitle}
            </h1>
            <p className="hidden text-xs text-amber-200/70 sm:block">
              {ui.mapSubtitle} · <span className="font-mono-tabular font-semibold text-amber-300">{totalStars}/45 ★</span>
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <span className="font-mono-tabular text-xs font-bold text-amber-300 sm:hidden">
            {totalStars}/45 ★
          </span>

          {!allUnlocked && (
            <button
              type="button"
              onClick={onUnlockAll}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-amber-400/30 bg-amber-500/15 px-3 py-1.5 text-xs font-bold text-amber-200 transition-colors hover:bg-amber-500/25 whitespace-nowrap shrink-0"
            >
              <Unlock className="h-3.5 w-3.5" />
              <span className="hidden md:inline">{ui.unlockAll}</span>
            </button>
          )}

          <button
            type="button"
            onClick={onCycleLang}
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-amber-200/15 bg-white/[0.05] px-3 py-1.5 text-xs font-bold text-amber-100 transition-colors hover:bg-white/10 whitespace-nowrap shrink-0"
          >
            <Globe className="h-3.5 w-3.5 text-amber-300" />
            <span>{lang.toUpperCase()}</span>
          </button>

          <button
            type="button"
            onClick={onToggleMute}
            aria-label={muted ? ui.soundOff : ui.soundOn}
            className="inline-flex min-h-[40px] min-w-[40px] items-center justify-center rounded-lg border border-amber-200/15 bg-white/[0.05] text-amber-100 transition-colors hover:bg-white/10 shrink-0"
          >
            {muted ? <VolumeX className="h-4 w-4 text-stone-400" /> : <Volume2 className="h-4 w-4 text-amber-300" />}
          </button>
        </div>
      </header>

      {/* Scrollable 15-Chapter Grid */}
      <main className="warm-scroll flex-1 overflow-y-auto px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {LOCATIONS.map((loc) => {
            const isLocked = loc.id > save.unlocked;
            const stars = save.stars[loc.id] ?? 0;
            const best = save.bestTime[loc.id];
            const thumb = thumbnails[loc.id];

            return (
              <button
                key={loc.id}
                type="button"
                onClick={() => (isLocked ? onLockedClick() : onSelectLocation(loc.id))}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border text-left transition-all duration-200 ${
                  isLocked
                    ? 'cursor-not-allowed border-white/10 bg-[#231B17]/75 opacity-60'
                    : stars > 0
                      ? 'border-emerald-500/40 bg-[#FAF5EB] text-[#2A1F1A] shadow-md hover:-translate-y-0.5 hover:border-amber-400 hover:shadow-xl'
                      : 'border-[#DFD2BC]/90 bg-[#FAF5EB] text-[#2A1F1A] shadow-md hover:-translate-y-0.5 hover:border-amber-500 hover:shadow-xl'
                }`}
              >
                {/* Visual 16:9 Chapter Preview Header */}
                <div
                  className={`relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br ${loc.cardAccent}`}
                >
                  {thumb ? (
                    <img
                      src={thumb}
                      alt={loc.title[lang]}
                      referrerPolicy="no-referrer"
                      className={`h-full w-full object-cover transition-transform duration-300 ${
                        isLocked ? 'grayscale' : 'group-hover:scale-105'
                      }`}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center p-4">
                      <div className="opacity-90">
                        <CharacterPortrait
                          character={loc.featuredCharacter}
                          lang={lang}
                          size="md"
                          highlighted={!isLocked}
                        />
                      </div>
                    </div>
                  )}

                  {/* Measured dark scrim for crisp legibility */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/15" />

                  {/* Chapter index & status */}
                  <div className="absolute inset-x-3 top-2.5 flex items-center justify-between text-xs font-bold text-amber-100">
                    <span className="font-mono-tabular">
                      {String(loc.id).padStart(2, '0')}
                    </span>
                    {isLocked && <Lock className="h-4 w-4 text-stone-300" />}
                  </div>

                  {/* Bottom overlay stars */}
                  <div className="absolute inset-x-3 bottom-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3].map((n) => (
                        <Star
                          key={n}
                          className={`h-4 w-4 ${
                            n <= stars
                              ? 'fill-[#F5B942] text-[#F5B942]'
                              : 'fill-black/35 text-white/45'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-mono-tabular text-[11px] font-semibold text-amber-100/90">
                      {best != null ? formatTime(best) : '--:--'}
                    </span>
                  </div>
                </div>

                {/* Clean editorial text footer */}
                <div className="flex flex-1 flex-col justify-between p-3.5">
                  <div>
                    <h2
                      className={`font-display text-base font-bold leading-snug ${
                        isLocked ? 'text-stone-300' : 'text-[#2A1F1A]'
                      }`}
                    >
                      {loc.title[lang]}
                    </h2>
                    <p
                      className={`mt-1 line-clamp-2 text-xs leading-relaxed ${
                        isLocked ? 'text-stone-400' : 'text-[#6E5A49]'
                      }`}
                    >
                      {loc.subtitle[lang]}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </main>

      {/* Transient toast */}
      {toastMsg && (
        <div className="pointer-events-none fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-xl border border-amber-400/50 bg-[#231914]/95 px-5 py-2.5 text-sm font-bold text-amber-100 shadow-2xl">
          {toastMsg}
        </div>
      )}
    </div>
  );
}
