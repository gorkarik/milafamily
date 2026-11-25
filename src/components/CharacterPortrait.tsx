import { useEffect, useState } from 'react';
import type { CharacterId, Lang } from '../types/game';
import { UI_TEXT } from '../data/i18n';

interface CharacterPortraitProps {
  character: CharacterId;
  lang: Lang;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  highlighted?: boolean;
  className?: string;
}

const PORTRAIT_PATHS: Record<CharacterId, string> = {
  mila: '/chars/mila.jpg',
  liza: '/chars/liza.jpg',
  sasha: '/chars/sasha.jpg',
  misha: '/chars/misha.jpg',
};

const FALLBACK_STYLES: Record<CharacterId, { bg: string; initial: string }> = {
  mila: { bg: 'from-amber-700 to-amber-900', initial: 'М' },
  liza: { bg: 'from-stone-600 to-amber-900', initial: 'Л' },
  sasha: { bg: 'from-emerald-800 to-stone-900', initial: 'С' },
  misha: { bg: 'from-orange-700 to-amber-900', initial: 'М' },
};

const SIZE_CLASSES: Record<'sm' | 'md' | 'lg' | 'xl', string> = {
  sm: 'w-12 h-12',
  md: 'w-16 h-16 sm:w-20 sm:h-20',
  lg: 'w-20 h-20 sm:w-24 sm:h-24',
  xl: 'w-28 h-28 sm:w-32 sm:h-32',
};

export function CharacterPortrait({
  character,
  lang,
  size = 'md',
  highlighted = false,
  className = '',
}: CharacterPortraitProps) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [character]);

  const name = UI_TEXT[lang].characters[character];
  const fallback = FALLBACK_STYLES[character];

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-full bg-gradient-to-br ${fallback.bg} ${
        SIZE_CLASSES[size]
      } ${
        highlighted
          ? 'ring-3 ring-[#F5B942] shadow-[0_10px_28px_rgba(245,185,66,0.35)]'
          : 'ring-2 ring-[#E8D7B9] shadow-md'
      } ${className}`}
    >
      {!failed ? (
        <img
          src={PORTRAIT_PATHS[character]}
          alt={name}
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover object-top"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center font-display text-2xl font-bold text-amber-100">
          {fallback.initial}
        </div>
      )}
    </div>
  );
}
