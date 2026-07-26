import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Envelope from '../components/letter/Envelope';
import LetterPaper from '../components/letter/LetterPaper';
import { loveLetter } from '../data/content';

type LoveLetterSectionProps = {
  onContinue?: () => void;
};

export default function LoveLetterSection({ onContinue }: LoveLetterSectionProps) {
  const [opening, setOpening] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const handleTap = () => {
    if (opening || revealed) return;
    setOpening(true);
    window.setTimeout(() => setRevealed(true), 1100);
  };

  const readAgain = () => {
    setRevealed(false);
    setOpening(false);
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 py-20 text-center">
      <h2 className="font-display text-2xl sm:text-3xl text-glow mb-10">{loveLetter.chapterTitle}</h2>

      <AnimatePresence mode="wait">
        {!revealed ? (
          <motion.div key="envelope" exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <Envelope opening={opening} onTap={handleTap} />
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center"
          >
            <LetterPaper />
            <div className="mt-8 flex gap-3">
              <button
                onClick={readAgain}
                className="rounded-full glass px-5 py-2 text-sm hover:bg-white/10 transition-colors"
              >
                {loveLetter.readAgainLabel}
              </button>
              <button
                onClick={onContinue}
                className="rounded-full glass px-5 py-2 text-sm hover:bg-white/10 transition-colors"
              >
                Continue →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
