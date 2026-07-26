import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import Balloon from '../components/balloons/Balloon';
import { wishes } from '../data/content';

type WishesSectionProps = {
  onContinue?: () => void;
};

const COLORS = ['#f472b6', '#fbbf24', '#9f6cf0', '#5eead4', '#f87171', '#a78bfa'];

export default function WishesSection({ onContinue }: WishesSectionProps) {
  const [popped, setPopped] = useState<boolean[]>(Array(wishes.length).fill(false));
  const [activeWish, setActiveWish] = useState<string | null>(null);

  const poppedCount = popped.filter(Boolean).length;
  const allPopped = poppedCount === wishes.length;

  const pop = (i: number) => {
    if (popped[i]) return;
    setPopped((prev) => {
      const next = [...prev];
      next[i] = true;
      return next;
    });
    setActiveWish(wishes[i]);
    confetti({
      particleCount: 24,
      spread: 55,
      startVelocity: 18,
      colors: [COLORS[i % COLORS.length], '#ffffff'],
      origin: { y: 0.45 },
    });
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 text-center">
      <h2 className="font-display text-2xl sm:text-3xl text-glow mb-1">Pop the Wishes 🎈</h2>
      <p className="text-white/40 text-sm mb-2">Tap each balloon to reveal a little wish</p>
      <p className="text-white/30 text-xs mb-8">
        {poppedCount}/{wishes.length} popped
      </p>

      <div className="grid grid-cols-3 gap-x-4 gap-y-6 sm:gap-x-8 max-w-md">
        {wishes.map((_, i) => (
          <Balloon
            key={i}
            color={COLORS[i % COLORS.length]}
            popped={popped[i]}
            onPop={() => pop(i)}
            delay={i * 0.3}
          />
        ))}
      </div>

      <div className="mt-8 min-h-[90px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {activeWish && (
            <motion.p
              key={activeWish}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="glass rounded-2xl px-6 py-4 max-w-sm text-sm sm:text-base text-white/85 font-body"
            >
              {activeWish}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {allPopped && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={onContinue}
            className="mt-4 rounded-full glass px-6 py-2 text-sm tracking-wide hover:bg-white/10 transition-colors"
          >
            Continue →
          </motion.button>
        )}
      </AnimatePresence>
    </section>
  );
}
