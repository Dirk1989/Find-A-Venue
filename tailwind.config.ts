import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: '#0F3D2E',
        gold: '#C9A24B',
        sand: '#F6F1E7',
        ivory: '#FBF8F2',
        charcoal: '#1B1B1B',
        muted: '#6B6B6B',
      },
      fontFamily: {
        fraunces: ['var(--font-fraunces)', 'serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      letterSpacing: {
        'tight': '-0.01em',
        'eyebrow': '0.18em',
      },
      backgroundImage: {
        'gradient-bottom': 'linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.4))',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease-out',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
