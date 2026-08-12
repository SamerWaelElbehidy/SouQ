import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy:      '#16324f',
        teal:      '#178f7a',
        tealLight: '#e6f4f1',
        gold:      '#f5a623',
        darkBg:    '#0d1f2d',
      },
      fontFamily: {
        tajawal: ['var(--font-tajawal)', 'Tajawal', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        teal: '0 8px 32px rgba(23,143,122,0.3)',
        navy: '0 8px 32px rgba(22,50,79,0.3)',
      },
      animation: {
        'float':        'float 6s ease-in-out infinite',
        'float-gentle': 'float-gentle 8s ease-in-out infinite',
        'pulse-glow':   'pulse-glow 2s ease-in-out infinite',
        'slide-up':     'slide-up 0.5s ease forwards',
        'fade-in':      'fade-in 0.4s ease forwards',
        'gradient':     'gradient-shift 4s ease infinite',
      },
      backgroundImage: {
        'hero-gradient':
          'linear-gradient(135deg, #0d1f2d 0%, #16324f 50%, #0f2a20 100%)',
        'teal-gradient':
          'linear-gradient(135deg, #178f7a 0%, #0f6b5a 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
