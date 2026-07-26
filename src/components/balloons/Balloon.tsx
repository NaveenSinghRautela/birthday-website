import { motion, AnimatePresence } from 'framer-motion';

type BalloonProps = {
  color: string;
  popped: boolean;
  onPop: () => void;
  delay?: number;
};

export default function Balloon({ color, popped, onPop, delay = 0 }: BalloonProps) {
  return (
    <div className="relative h-28 w-16 flex justify-center">
      <AnimatePresence mode="wait">
        {!popped ? (
          <motion.button
            key="balloon"
            type="button"
            aria-label="Pop this balloon"
            onClick={onPop}
            className="absolute top-0 outline-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: [0, -10, 0] }}
            exit={{ opacity: 0, scale: 1.3 }}
            transition={{
              opacity: { duration: 0.4 },
              y: { duration: 3 + delay, repeat: Infinity, ease: 'easeInOut', delay },
            }}
            whileTap={{ scale: 0.9 }}
          >
            <svg width="56" height="80" viewBox="0 0 56 80">
              <ellipse cx="28" cy="30" rx="26" ry="30" fill={color} opacity="0.92" />
              <ellipse cx="20" cy="18" rx="7" ry="10" fill="#ffffff" opacity="0.25" />
              <path d="M28 60 L24 68 L32 68 Z" fill={color} opacity="0.9" />
              <line x1="28" y1="68" x2="28" y2="80" stroke="#ffffff55" strokeWidth="1.5" />
            </svg>
          </motion.button>
        ) : (
          <motion.div
            key="pop"
            className="absolute top-6"
            initial={{ opacity: 1, scale: 0.6 }}
            animate={{ opacity: 0, scale: 1.8 }}
            transition={{ duration: 0.4 }}
          >
            <span className="text-2xl">✨</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
