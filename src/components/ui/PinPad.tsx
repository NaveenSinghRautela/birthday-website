import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiDelete } from 'react-icons/fi';

type PinPadProps = {
  length: number;
  onSubmit: (code: string) => void;
  shake?: boolean;
};

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'];

export default function PinPad({ length, onSubmit, shake }: PinPadProps) {
  const [value, setValue] = useState('');

  const press = (key: string) => {
    if (key === '' ) return;
    if (key === 'del') {
      setValue((v) => v.slice(0, -1));
      return;
    }
    if (value.length >= length) return;
    const next = value + key;
    setValue(next);
    if (next.length === length) {
      onSubmit(next);
      window.setTimeout(() => setValue(''), 550);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="flex gap-3 mb-8"
        animate={shake ? { x: [0, -8, 8, -8, 8, 0] } : { x: 0 }}
        transition={{ duration: 0.4 }}
      >
        {Array.from({ length }).map((_, i) => (
          <span
            key={i}
            className={`h-3 w-3 rounded-full border border-aura-400/70 transition-colors ${
              i < value.length ? 'bg-aura-400' : 'bg-transparent'
            }`}
          />
        ))}
      </motion.div>

      <div className="grid grid-cols-3 gap-3">
        {KEYS.map((key, i) =>
          key === '' ? (
            <div key={i} />
          ) : (
            <button
              key={i}
              onClick={() => press(key)}
              aria-label={key === 'del' ? 'Delete' : `Digit ${key}`}
              className="h-14 w-14 rounded-full glass text-lg font-display flex items-center justify-center hover:bg-white/10 active:scale-95 transition-all"
            >
              {key === 'del' ? <FiDelete /> : key}
            </button>
          ),
        )}
      </div>
    </div>
  );
}
