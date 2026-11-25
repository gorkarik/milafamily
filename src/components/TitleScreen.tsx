import { ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'motion/react';
import type { CharacterId } from '../types/game';
import { UI_TEXT } from '../data/i18n';
import { CharacterPortrait } from './CharacterPortrait';

interface TitleScreenProps {
  muted: boolean;
  hasProgress: boolean;
  totalStars: number;
  onToggleMute: () => void;
  onStart: () => void;
}

const FAMILY_ORDER: { id: CharacterId; featured?: boolean }[] = [
  { id: 'sasha' },
  { id: 'liza' },
  { id: 'mila', featured: true },
  { id: 'misha' },
];

export function TitleScreen({
  muted,
  hasProgress,
  totalStars,
  onToggleMute,
  onStart,
}: TitleScreenProps) {
  const ui = UI_TEXT;

  return (
    <div className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-gradient-to-b from-[#2A1E17] via-[#1C1410] to-[#120D0A] text-[#FAF5EB]">
      {/* Subtle warm radial lamp glow */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,185,66,0.16),transparent_62%)]"
        aria-hidden="true"
      />

      {/* Minimal top utility bar */}
      <header className="relative z-10 flex items-center justify-end px-4 py-3 sm:px-8 sm:py-4">
        <button
          type="button"
          onClick={onToggleMute}
          aria-label={muted ? ui.soundOff : ui.soundOn}
          className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-amber-200/15 bg-white/[0.05] px-3 py-1.5 text-xs font-semibold text-amber-100 transition-colors hover:bg-white/10 whitespace-nowrap shrink-0"
        >
          {muted ? <VolumeX className="h-4 w-4 text-stone-400" /> : <Volume2 className="h-4 w-4 text-amber-300" />}
          <span className="hidden sm:inline">{muted ? ui.soundOff : ui.soundOn}</span>
        </button>
      </header>

      {/* Main focal centerpiece */}
      <main className="warm-scroll relative z-10 flex flex-1 items-center justify-center overflow-y-auto px-4 pb-6 pt-2 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="my-auto w-full max-w-2xl rounded-3xl border border-[#DFD2BC]/90 bg-[#FAF5EB] px-5 py-6 text-center text-[#2A1F1A] shadow-[0_30px_80px_rgba(0,0,0,0.65)] sm:px-10 sm:py-10"
        >
          {/* Real family portraits gallery */}
          <div className="mb-6 flex items-end justify-center gap-3 sm:gap-5">
            {FAMILY_ORDER.map((member) => (
              <div key={member.id} className="flex flex-col items-center">
                <div className={member.featured ? '-translate-y-2' : ''}>
                  <CharacterPortrait
                    character={member.id}
                    size={member.featured ? 'lg' : 'md'}
                    highlighted={member.featured}
                  />
                </div>
                <span className="mt-2 text-xs font-bold text-[#6E5947]">
                  {ui.characters[member.id]}
                </span>
              </div>
            ))}
          </div>

          <p className="text-xs font-bold tracking-wider text-[#A46016]">
            {ui.mapSubtitle}
            {totalStars > 0 ? ` · ${totalStars}/45 ★` : ''}
          </p>

          <h1
            className="font-display mx-auto mt-2 max-w-lg text-3xl font-extrabold leading-tight text-[#2A1F1A] sm:text-5xl"
            style={{ textWrap: 'balance' }}
          >
            {ui.appTitle}
          </h1>

          <p className="mx-auto mt-3.5 max-w-xl text-sm leading-relaxed text-[#554438] sm:text-base">
            {ui.appSubtitle}
          </p>

          {/* Dominant single primary CTA */}
          <div className="mt-8">
            <button
              type="button"
              onClick={onStart}
              className="inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-2xl bg-[#C67B1E] px-8 py-3.5 text-base font-extrabold text-white shadow-[0_6px_22px_rgba(198,123,30,0.38)] transition-all hover:bg-[#AE6915] active:scale-[0.98] whitespace-nowrap shrink-0"
            >
              <span>{hasProgress ? ui.continueBtn : ui.playBtn}</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
