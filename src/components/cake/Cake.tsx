import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMic } from 'react-icons/fi';
import confetti from 'canvas-confetti';
import { cake } from '../../data/content';
import { useMicBlow } from '../../hooks/useMicBlow';

type CakeProps = {
  onAllBlownOut?: () => void;
};

const CANDLE_COUNT = cake.candleCount;
const CANDLE_SPACING = 26;
const START_X = 100 - ((CANDLE_COUNT - 1) * CANDLE_SPACING) / 2;

export default function Cake({ onAllBlownOut }: CakeProps) {
  const [lit, setLit] = useState<boolean[]>(Array(CANDLE_COUNT).fill(true));

  const litCount = lit.filter(Boolean).length;

  const blowOutAll = () => {
    setLit((prev) => {
      if (prev.every((v) => !v)) return prev;
      const next = prev.map(() => false);
      celebrate();
      return next;
    });
  };

  const blowOutOne = (i: number) => {
    setLit((prev) => {
      if (!prev[i]) return prev;
      const next = [...prev];
      next[i] = false;
      if (next.every((v) => !v)) celebrate();
      return next;
    });
  };

  const celebrate = () => {
    confetti({
      particleCount: 70,
      spread: 75,
      startVelocity: 30,
      colors: ['#fbbf24', '#f472b6', '#b794f6', '#ffffff'],
      origin: { y: 0.55 },
    });
    onAllBlownOut?.();
  };

  const { status, listen } = useMicBlow(blowOutAll);

  return (
    <div className="flex flex-col items-center">
      <svg width="260" height="220" viewBox="0 0 200 190" className="drop-shadow-[0_16px_40px_rgba(124,58,237,0.4)]">
        <defs>
          <linearGradient id="tierBottom" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3a2166" />
            <stop offset="100%" stopColor="#241246" />
          </linearGradient>
          <linearGradient id="tierTop" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f9e8ff" />
            <stop offset="100%" stopColor="#e6c9f7" />
          </linearGradient>
          <radialGradient id="flame" cx="50%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#fff7cc" />
            <stop offset="45%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.7" />
          </radialGradient>
        </defs>

        {/* plate shadow */}
        <ellipse cx="100" cy="176" rx="78" ry="10" fill="#000" opacity="0.35" />

        {/* bottom tier */}
        <rect x="26" y="120" width="148" height="56" rx="14" fill="url(#tierBottom)" stroke="#b794f6" strokeOpacity="0.3" />
        {Array.from({ length: 7 }).map((_, i) => (
          <circle key={i} cx={40 + i * 20} cy={132} r="3" fill="#fde68a" opacity="0.8" />
        ))}

        {/* top tier */}
        <rect x="52" y="86" width="96" height="42" rx="12" fill="url(#tierTop)" />
        {Array.from({ length: 9 }).map((_, i) => (
          <path
            key={i}
            d={`M ${58 + i * 10} 86 q 5 -8 10 0`}
            stroke="#f472b6"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
        ))}

        {/* candles */}
        {lit.map((isLit, i) => {
          const x = START_X + i * CANDLE_SPACING;
          return (
            <g key={i} onClick={() => blowOutOne(i)} className="cursor-pointer">
              {/* hit area */}
              <rect x={x - 10} y={40} width="20" height="55" fill="transparent" />
              <rect x={x - 3} y={62} width="6" height="24" rx="2" fill="#fca5f1" />
              <rect x={x - 3} y={62} width="6" height="24" rx="2" fill="url(#tierTop)" opacity="0.25" />
              <AnimatePresence>
                {isLit && (
                  <motion.g
                    key="flame"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.3, y: -6 }}
                    transition={{ duration: 0.35 }}
                    style={{ transformOrigin: `${x}px 58px` }}
                  >
                    <motion.path
                      d={`M ${x} 44 C ${x - 6} 52, ${x - 5} 60, ${x} 62 C ${x + 5} 60, ${x + 6} 52, ${x} 44 Z`}
                      fill="url(#flame)"
                      animate={{
                        scaleY: [1, 1.12, 0.94, 1.06, 1],
                        scaleX: [1, 0.93, 1.05, 0.97, 1],
                      }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                      style={{ transformOrigin: `${x}px 60px` }}
                    />
                  </motion.g>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {!isLit && (
                  <motion.path
                    key="smoke"
                    d={`M ${x} 60 q -3 -10 0 -20`}
                    stroke="#c9c3d6"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ opacity: 0.6, pathLength: 0, y: 0 }}
                    animate={{ opacity: 0, y: -14 }}
                    transition={{ duration: 1.1, ease: 'easeOut' }}
                  />
                )}
              </AnimatePresence>
            </g>
          );
        })}
      </svg>

      <p className="mt-2 text-xs text-white/40">
        {litCount > 0 ? `${litCount} candle${litCount > 1 ? 's' : ''} left — tap to blow out` : 'All out ✨'}
      </p>

      {litCount > 0 && (
        <button
          onClick={listen}
          className="mt-4 flex items-center gap-2 rounded-full glass px-5 py-2 text-sm hover:bg-white/10 transition-colors"
        >
          <FiMic className={status === 'listening' ? 'animate-pulse text-aura-400' : ''} />
          {status === 'listening' ? 'Listening... blow now' : cake.micButtonLabel}
        </button>
      )}
      {status === 'unavailable' && (
        <p className="mt-2 text-xs text-white/40">{cake.micUnavailableMessage}</p>
      )}
    </div>
  );
}
