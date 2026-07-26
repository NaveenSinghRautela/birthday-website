import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PolaroidCard from '../components/gallery/PolaroidCard';
import { memories } from '../data/content';

type GallerySectionProps = {
  onContinue?: () => void;
};

// Small deterministic tilt per card index so the stack doesn't look
// perfectly uniform, without relying on Math.random() during render.
const TILTS = [-3, 2, -2, 3, -1.5, 2.5];

export default function GallerySection({ onContinue }: GallerySectionProps) {
  const [index, setIndex] = useState(0);
  const isLast = index === memories.length - 1;
  const current = memories[index];

  const next = () => {
    if (isLast) {
      onContinue?.();
    } else {
      setIndex((i) => i + 1);
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 text-center">
      <h2 className="font-display text-2xl sm:text-3xl text-glow mb-1">Cute Memories 💕</h2>
      <p className="text-white/40 text-sm mb-8">One little moment at a time</p>

      <div className="relative h-[380px] w-72 sm:w-80 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <PolaroidCard
            key={current.id}
            src={current.src}
            caption={current.caption}
            rotate={TILTS[index % TILTS.length]}
          />
        </AnimatePresence>
      </div>

      <div className="mt-6 flex gap-2">
        {memories.map((m, i) => (
          <span
            key={m.id}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? 'w-6 bg-aura-400' : 'w-1.5 bg-white/20'
            }`}
          />
        ))}
      </div>

      <motion.button
        onClick={next}
        whileTap={{ scale: 0.96 }}
        className="mt-8 rounded-full glass px-6 py-2 text-sm tracking-wide hover:bg-white/10 transition-colors"
      >
        {isLast ? 'Continue →' : 'Next Memory →'}
      </motion.button>
    </section>
  );
}
