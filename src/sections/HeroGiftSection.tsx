import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GiftBox from '../components/gift/GiftBox';
import { site } from '../data/content';

type HeroGiftSectionProps = {
  onContinue?: () => void;
};

export default function HeroGiftSection({ onContinue }: HeroGiftSectionProps) {
  const [opened, setOpened] = useState(false);

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 text-center">
      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div
            key="wrapped"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="font-display text-3xl sm:text-4xl md:text-5xl text-glow"
            >
              {site.heroTitle}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-3 max-w-md text-white/60 font-body text-sm sm:text-base"
            >
              {site.heroSubtitle}
            </motion.p>

            <div className="mt-10">
              <GiftBox onOpened={() => setOpened(true)} />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="message"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
            className="glass rounded-3xl px-8 py-10 max-w-lg shadow-glow"
          >
            <span className="text-4xl">🧸</span>
            <p className="mt-4 font-display text-xl sm:text-2xl text-glow">
              There's something my heart has been waiting to say...
            </p>
            <p className="mt-2 text-white/50 text-sm">
              Since I can't celebrate beside you, I made this little world for you instead.
            </p>
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
