import { useState } from 'react';
import { ArrowRight, BookOpen, Search } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { LocationDef } from '../types/game';
import { UI_TEXT } from '../data/i18n';
import { CharacterPortrait } from './CharacterPortrait';
import { audioEngine } from '../lib/audioEngine';

interface StoryDialogueModalProps {
  location: LocationDef;
  onFinish: () => void;
}

export function StoryDialogueModal({ location, onFinish }: StoryDialogueModalProps) {
  const ui = UI_TEXT;
  const [phase, setPhase] = useState<'story' | 'dialogue'>('story');
  const [dialogueIndex, setDialogueIndex] = useState(0);

  const currentLine = location.dialogues[dialogueIndex] ?? location.dialogues[0];
  const isLastLine = dialogueIndex >= location.dialogues.length - 1;

  const handleAdvanceStory = () => {
    audioEngine.playTap();
    setPhase('dialogue');
  };

  const handleAdvanceDialogue = () => {
    audioEngine.playTap();
    if (!isLastLine) {
      setDialogueIndex((prev) => prev + 1);
    } else {
      onFinish();
    }
  };

  const handleSkip = () => {
    audioEngine.playTap();
    onFinish();
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-[#140E0B]/80 p-4 backdrop-blur-sm">
      <AnimatePresence mode="wait">
        {phase === 'story' ? (
          <motion.div
            key="story-card"
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-[#DFD2BC] bg-[#FAF5EB] text-[#2A1F1A] shadow-[0_24px_60px_rgba(0,0,0,0.55)]"
          >
            {/* Header banner */}
            <div className="flex items-center justify-between border-b border-[#E7DBC7] bg-[#F2E9D8] px-5 py-3.5 sm:px-6">
              <div className="flex items-center gap-2 text-xs font-bold tracking-wide text-[#8C5B1A]">
                <BookOpen className="h-4 w-4 shrink-0" />
                <span>
                  {ui.chapterLabel} {location.id} / 15
                </span>
              </div>
              <button
                type="button"
                onClick={handleSkip}
                className="text-xs font-semibold text-[#7A6A58] underline-offset-4 transition-colors hover:text-[#2A1F1A] hover:underline whitespace-nowrap shrink-0"
              >
                {ui.skipIntroBtn}
              </button>
            </div>

            {/* Body */}
            <div className="p-5 sm:p-7">
              <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
                <CharacterPortrait
                  character={location.featuredCharacter}
                  size="lg"
                  highlighted
                />
                <div className="text-center sm:text-left">
                  <h2 className="font-display text-2xl font-bold leading-tight text-[#2A1F1A] sm:text-3xl">
                    {location.title}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-[#7A644E]">
                    {location.subtitle}
                  </p>
                </div>
              </div>

              <p className="mt-5 text-[15px] leading-relaxed text-[#3A2D25] sm:text-base sm:leading-7">
                {location.miniStory}
              </p>

              <div className="mt-6 flex items-center justify-end gap-3 border-t border-[#EAE0CF] pt-4">
                <button
                  type="button"
                  onClick={handleAdvanceStory}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[#C67B1E] px-6 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#AE6915] active:scale-[0.99] whitespace-nowrap shrink-0"
                >
                  <span>{ui.storyNextBtn}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={`dlg-${dialogueIndex}`}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-[#DFD2BC] bg-[#FAF5EB] text-[#2A1F1A] shadow-[0_24px_60px_rgba(0,0,0,0.55)]"
          >
            <div className="flex items-center justify-between border-b border-[#E7DBC7] bg-[#F2E9D8] px-5 py-3 text-xs font-semibold text-[#7A644E]">
              <span className="truncate">
                {location.id}. {location.title}
              </span>
              <span className="font-mono-tabular shrink-0 pl-3">
                {dialogueIndex + 1} / {location.dialogues.length}
              </span>
            </div>

            <div className="p-5 sm:p-7">
              <div className="flex items-start gap-4 sm:gap-5">
                <CharacterPortrait
                  character={currentLine.speaker}
                  size="lg"
                  highlighted
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <h3 className="font-display text-xl font-bold text-[#9C5710]">
                      {ui.characters[currentLine.speaker]}
                    </h3>
                    <span className="text-xs font-medium text-[#8A7764]">
                      · {ui.characterRoles[currentLine.speaker]}
                    </span>
                  </div>
                  <p className="mt-2 text-[15px] leading-relaxed font-medium text-[#2A1F1A] sm:text-base">
                    «{currentLine.text}»
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between gap-3 border-t border-[#EAE0CF] pt-4">
                <button
                  type="button"
                  onClick={handleSkip}
                  className="text-xs font-semibold text-[#7A6A58] transition-colors hover:text-[#2A1F1A] whitespace-nowrap shrink-0"
                >
                  {ui.skipIntroBtn}
                </button>

                <button
                  type="button"
                  onClick={handleAdvanceDialogue}
                  className={`inline-flex min-h-[44px] items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-bold text-white shadow-sm transition-colors active:scale-[0.99] whitespace-nowrap shrink-0 ${
                    isLastLine
                      ? 'bg-[#1F8A68] hover:bg-[#197255]'
                      : 'bg-[#C67B1E] hover:bg-[#AE6915]'
                  }`}
                >
                  {isLastLine ? (
                    <>
                      <Search className="h-4 w-4" />
                      <span>{ui.startSearchBtn}</span>
                    </>
                  ) : (
                    <>
                      <span>{ui.dialogueNextBtn}</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
