import { motion } from 'framer-motion';
import { loveLetter } from '../../data/content';

type EnvelopeProps = {
  opening: boolean;
  onTap: () => void;
};

export default function Envelope({ opening, onTap }: EnvelopeProps) {
  return (
    <div className="flex flex-col items-center" style={{ perspective: 900 }}>
      <motion.button
        type="button"
        aria-label="Open the letter"
        onClick={onTap}
        disabled={opening}
        className="relative outline-none"
        animate={opening ? { scale: 0.9, opacity: 0 } : { y: [0, -8, 0] }}
        transition={
          opening
            ? { duration: 0.5, delay: 0.5 }
            : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
        }
        whileHover={!opening ? { scale: 1.05 } : undefined}
        whileTap={!opening ? { scale: 0.96 } : undefined}
      >
        <div className="absolute inset-0 rounded-2xl bg-blush-500/30 blur-2xl scale-90 animate-pulseGlow" />
        <svg width="180" height="130" viewBox="0 0 180 130" className="relative drop-shadow-[0_12px_30px_rgba(236,72,153,0.35)]">
          <defs>
            <linearGradient id="envBody" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f8e9d2" />
              <stop offset="100%" stopColor="#eccfa0" />
            </linearGradient>
          </defs>
          <rect x="6" y="20" width="168" height="104" rx="8" fill="url(#envBody)" />
          <path d="M6 24 L90 84 L174 24" stroke="#c99b62" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <circle cx="90" cy="72" r="10" fill="#ec4899" />
          <path d="M84 72 q6 6 12 0" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" />

          {/* flap — animates open on tap via 3D rotate */}
          <motion.g
            style={{ transformOrigin: '90px 20px', transformStyle: 'preserve-3d' as const }}
            animate={opening ? { rotateX: -170 } : { rotateX: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            <path d="M6 20 L90 78 L174 20 Z" fill="#fbdcc0" stroke="#c99b62" strokeWidth="1.5" />
          </motion.g>
        </svg>
      </motion.button>

      {!opening && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-5 text-sm tracking-wide text-blush-400/80"
        >
          {loveLetter.envelopeLabel}
        </motion.p>
      )}
    </div>
  );
}
