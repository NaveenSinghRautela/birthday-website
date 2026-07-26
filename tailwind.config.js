/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: {
          950: '#0a0714',
          900: '#120c24',
          800: '#1b1333',
        },
        aura: {
          400: '#b794f6',
          500: '#9f6cf0',
          600: '#7c3aed',
          700: '#5b21b6',
        },
        blush: {
          400: '#f472b6',
          500: '#ec4899',
        },
        gold: {
          300: '#fde68a',
          400: '#fbbf24',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"Manrope"', 'sans-serif'],
        script: ['"Great Vibes"', 'cursive'],
      },
      boxShadow: {
        glow: '0 0 60px -10px rgba(159, 108, 240, 0.55)',
        'glow-sm': '0 0 30px -8px rgba(159, 108, 240, 0.45)',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(1.5deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.55, transform: 'scale(1)' },
          '50%': { opacity: 0.9, transform: 'scale(1.06)' },
        },
        drift: {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(30px, -40px)' },
        },
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        pulseGlow: 'pulseGlow 4s ease-in-out infinite',
        drift: 'drift 18s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
};
