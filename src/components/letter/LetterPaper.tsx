import { motion } from 'framer-motion';
import { loveLetter } from '../../data/content';

export default function LetterPaper() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="glass rounded-2xl px-6 py-8 sm:px-10 sm:py-10 max-w-xl text-left shadow-glow"
    >
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="font-script text-2xl sm:text-3xl text-blush-400"
      >
        {loveLetter.greeting}
      </motion.p>

      <div className="mt-5 space-y-4">
        {loveLetter.paragraphs.map((p, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.35, duration: 0.5 }}
            className="text-sm sm:text-base text-white/75 leading-relaxed"
          >
            {p}
          </motion.p>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 + loveLetter.paragraphs.length * 0.35 + 0.2, duration: 0.5 }}
        className="mt-6 font-script text-xl sm:text-2xl text-gold-300 whitespace-pre-line"
      >
        {loveLetter.signature}
      </motion.p>
    </motion.div>
  );
}
