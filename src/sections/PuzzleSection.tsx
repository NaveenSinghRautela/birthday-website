import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import SlidingPuzzle from '../components/puzzle/SlidingPuzzle';
import { puzzle } from '../data/content';

type PuzzleSectionProps = {
  onContinue?: () => void;
};

export default function PuzzleSection({ onContinue }: PuzzleSectionProps) {
  const [solved, setSolved] = useState(false);

  const handleSolved = () => {
    if (solved) return;
    setSolved(true);
    confetti({
      particleCount: 80,
      spread: 80,
      startVelocity: 30,
      colors: ['#b794f6', '#ec4899', '#fbbf24'],
      origin: { y: 0.5 },
    });
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 text-center">
      <h2 className="font-display text-2xl sm:text-3xl text-glow mb-1">{puzzle.title}</h2>
      <p className="text-white/40 text-sm mb-8">{puzzle.subtitle}</p>

      <SlidingPuzzle image={puzzle.image} onSolved={handleSolved} />

      <AnimatePresence>
        {solved && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 flex flex-col items-center"
          >
            <p className="font-display text-lg text-glow">{puzzle.completedTitle}</p>
            <button
              onClick={onContinue}
              className="mt-4 rounded-full glass px-6 py-2 text-sm tracking-wide hover:bg-white/10 transition-colors"
            >
              {puzzle.continueLabel}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
