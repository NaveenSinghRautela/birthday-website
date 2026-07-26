import { useMemo } from 'react';
import { motion } from 'framer-motion';

const EMOJIS = ['💜', '💗', '✨', '🎊'];

/**
 * A handful of emoji drifting upward on a loop, staggered so they don't
 * all rise together. Positions/delays are randomized once via useMemo
 * rather than on every render.
 */
export default function FloatingHearts({ count = 14 }: { count?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 6,
        duration: 6 + Math.random() * 5,
        emoji: EMOJIS[i % EMOJIS.length],
        size: 14 + Math.random() * 14,
      })),
    [count],
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {items.map((it) => (
        <motion.span
          key={it.id}
          className="absolute bottom-0"
          style={{ left: `${it.left}%`, fontSize: it.size }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: '-110vh', opacity: [0, 1, 1, 0] }}
          transition={{ duration: it.duration, delay: it.delay, repeat: Infinity, ease: 'linear' }}
        >
          {it.emoji}
        </motion.span>
      ))}
    </div>
  );
}
