import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Cake from '../components/cake/Cake';
import { cake } from '../data/content';

type CakeSectionProps = {
  onContinue?: () => void;
};

export default function CakeSection({ onContinue }: CakeSectionProps) {
  const [granted, setGranted] = useState(false);

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 text-center">
      <AnimatePresence mode="wait">
        {!granted ? (
          <motion.div
            key="cake"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <h2 className="font-display text-2xl sm:text-3xl text-glow">{cake.title}</h2>
            <p className="mt-2 max-w-sm text-white/50 text-sm">{cake.subtitle}</p>
            <div className="mt-8">
              <Cake onAllBlownOut={() => window.setTimeout(() => setGranted(true), 900)} />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="granted"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="glass rounded-3xl px-8 py-10 max-w-lg shadow-glow flex flex-col items-center"
          >
            <span className="text-3xl">🎂</span>
            <p className="mt-4 font-display text-xl sm:text-2xl text-glow">{cake.wishGrantedTitle}</p>
            <button
              onClick={onContinue}
              className="mt-6 rounded-full glass px-6 py-2 text-sm tracking-wide hover:bg-white/10 transition-colors"
            >
              Continue →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
