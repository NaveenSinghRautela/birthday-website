import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiLock, FiUnlock } from 'react-icons/fi';
import confetti from 'canvas-confetti';
import PinPad from '../components/ui/PinPad';
import { secretCode } from '../data/content';

type SecretCodeSectionProps = {
  onContinue?: () => void;
};

export default function SecretCodeSection({ onContinue }: SecretCodeSectionProps) {
  const [status, setStatus] = useState<'locked' | 'wrong' | 'unlocked'>('locked');

  const handleSubmit = (code: string) => {
    if (code === secretCode.code) {
      setStatus('unlocked');
      confetti({
        particleCount: 60,
        spread: 70,
        startVelocity: 28,
        colors: ['#b794f6', '#ec4899', '#fbbf24'],
        origin: { y: 0.5 },
      });
    } else {
      setStatus('wrong');
      window.setTimeout(() => setStatus('locked'), 700);
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 text-center">
      <AnimatePresence mode="wait">
        {status !== 'unlocked' ? (
          <motion.div
            key="lock"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <div className="h-16 w-16 rounded-full glass flex items-center justify-center text-2xl text-aura-400 shadow-glow-sm">
              <FiLock />
            </div>
            <p className="mt-6 font-display text-xl sm:text-2xl text-glow">
              {status === 'wrong' ? secretCode.wrongMessage : secretCode.hint}
            </p>
            <div className="mt-8">
              <PinPad length={4} onSubmit={handleSubmit} shake={status === 'wrong'} />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="unlocked"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="glass rounded-3xl px-8 py-10 max-w-lg shadow-glow flex flex-col items-center"
          >
            <div className="h-14 w-14 rounded-full bg-aura-500/20 flex items-center justify-center text-2xl text-gold-400">
              <FiUnlock />
            </div>
            <p className="mt-5 font-display text-xl sm:text-2xl text-glow">{secretCode.unlockedTitle}</p>
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
