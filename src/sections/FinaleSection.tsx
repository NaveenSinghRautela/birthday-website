import { motion } from 'framer-motion';
import Fireworks from '../components/finale/Fireworks';
import FloatingHearts from '../components/finale/FloatingHearts';
import { finale } from '../data/content';

type FinaleSectionProps = {
  onRestart?: () => void;
};

export default function FinaleSection({ onRestart }: FinaleSectionProps) {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 text-center overflow-hidden">
      <Fireworks />
      <FloatingHearts />

      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-20 font-display text-3xl sm:text-5xl text-glow"
      >
        {finale.title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35 }}
        className="relative z-20 mt-5 max-w-md text-white/65 text-sm sm:text-base"
      >
        {finale.subtitle}
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="relative z-20 mt-6 font-script text-2xl text-gold-300"
      >
        {finale.signOff}
      </motion.p>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        onClick={onRestart}
        className="relative z-20 mt-10 rounded-full glass px-6 py-2 text-sm tracking-wide hover:bg-white/10 transition-colors"
      >
        {finale.restartLabel}
      </motion.button>
    </section>
  );
}
