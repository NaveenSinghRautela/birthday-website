import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

type GiftBoxProps = {
  onOpened?: () => void;
};

/**
 * An original gift-box illustration (not traced from any reference):
 * a rounded box body, a criss-cross ribbon, and a bow, rendered in SVG
 * so it stays crisp at any size and is trivial to re-theme.
 *
 * Interaction: idle float -> tap triggers a few shake wiggles ->
 * lid pops open and flies off -> confetti/heart burst -> box fades,
 * revealing whatever the caller renders next via onOpened().
 */
export default function GiftBox({ onOpened }: GiftBoxProps) {
  const [stage, setStage] = useState<'idle' | 'shaking' | 'opening' | 'opened'>('idle');

  const handleTap = () => {
    if (stage !== 'idle') return;
    setStage('shaking');

    window.setTimeout(() => {
      setStage('opening');
      fireBurst();
    }, 650);

    window.setTimeout(() => {
      setStage('opened');
      onOpened?.();
    }, 1500);
  };

  const fireBurst = () => {
    const colors = ['#b794f6', '#ec4899', '#fbbf24', '#ffffff'];
    confetti({
      particleCount: 90,
      spread: 80,
      startVelocity: 32,
      gravity: 0.9,
      scalar: 0.9,
      colors,
      origin: { y: 0.55 },
    });
    window.setTimeout(() => {
      confetti({
        particleCount: 40,
        spread: 100,
        startVelocity: 20,
        gravity: 0.7,
        colors,
        origin: { y: 0.5 },
      });
    }, 200);
  };

  return (
    <div className="relative flex flex-col items-center select-none">
      <motion.button
        type="button"
        aria-label="Open your gift"
        onClick={handleTap}
        className="relative outline-none focus-visible:ring-2 focus-visible:ring-aura-400 rounded-3xl"
        animate={
          stage === 'idle'
            ? { y: [0, -14, 0], rotate: [0, 1.5, 0, -1.5, 0] }
            : stage === 'shaking'
              ? { x: [0, -6, 6, -6, 6, 0], rotate: [0, -3, 3, -3, 3, 0] }
              : { scale: 1 }
        }
        transition={
          stage === 'idle'
            ? { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 0.55, ease: 'easeInOut' }
        }
        whileHover={stage === 'idle' ? { scale: 1.05 } : undefined}
        whileTap={stage === 'idle' ? { scale: 0.96 } : undefined}
      >
        <div className="absolute inset-0 rounded-3xl bg-aura-500/40 blur-2xl scale-90 animate-pulseGlow" />

        <svg width="200" height="180" viewBox="0 0 200 180" className="relative drop-shadow-[0_10px_35px_rgba(124,58,237,0.45)]">
          {/* box body */}
          <defs>
            <linearGradient id="boxBody" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2a1a52" />
              <stop offset="100%" stopColor="#170f30" />
            </linearGradient>
            <linearGradient id="ribbon" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f472b6" />
            </linearGradient>
          </defs>

          <rect x="30" y="80" width="140" height="90" rx="14" fill="url(#boxBody)" stroke="#b794f6" strokeOpacity="0.35" />
          <rect x="88" y="80" width="24" height="90" fill="url(#ribbon)" opacity="0.9" />
          <rect x="30" y="118" width="140" height="18" fill="url(#ribbon)" opacity="0.9" />

          {/* lid — its own group so it can animate independently */}
          <motion.g
            initial={{ y: 0, x: 0, rotate: 0, opacity: 1 }}
            animate={
              stage === 'opening' || stage === 'opened'
              ? { y: -70, x: -6, rotate: -18, opacity: 0 }
              : { y: 0, x: 0, rotate: 0, opacity: 1 }
            }
            transition={{ duration: 0.65, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <rect x="22" y="62" width="156" height="30" rx="10" fill="url(#boxBody)" stroke="#b794f6" strokeOpacity="0.45" />
            <rect x="88" y="62" width="24" height="30" fill="url(#ribbon)" />
            {/* bow */}
            <path
              d="M100 62 C 78 40, 55 42, 62 60 C 68 74, 90 66, 100 62 Z"
              fill="url(#ribbon)"
            />
            <path
              d="M100 62 C 122 40, 145 42, 138 60 C 132 74, 110 66, 100 62 Z"
              fill="url(#ribbon)"
            />
            <circle cx="100" cy="60" r="8" fill="#fde68a" />
          </motion.g>

          {/* soft glow escaping once opened */}
          <AnimatePresence>
            {(stage === 'opening' || stage === 'opened') && (
              <motion.circle
                cx="100"
                cy="95"
                r="10"
                fill="#fde68a"
                initial={{ opacity: 0, r: 5 }}
                animate={{ opacity: [0, 0.9, 0.5], r: [5, 50, 40] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                style={{ filter: 'blur(12px)' }}
              />
            )}
          </AnimatePresence>
        </svg>
      </motion.button>

      <AnimatePresence>
        {stage === 'idle' && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 text-sm tracking-wide text-aura-400/80 font-body"
          >
            Tap the gift to open
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
