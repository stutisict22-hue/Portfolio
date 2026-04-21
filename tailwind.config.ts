import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Light background palette
        bg: '#f4f8ff',
        surface: '#ffffff',
        'surface-alt': '#edf3fe',
        border: 'rgba(15, 23, 42, 0.1)',

        // Typography
        text: '#0f172a',
        't2': '#334155',
        't3': '#64748b',
        't4': '#94a3b8',

        // Accents
        accent: {
          DEFAULT: '#0284c7',
          dim: '#0369a1',
          glow: 'rgba(2,132,199,0.2)',
          subtle: 'rgba(2,132,199,0.08)',
        },
        purple: {
          DEFAULT: '#0d9488',
          dim: '#0f766e',
          glow: 'rgba(13,148,136,0.18)',
        },
        teal: {
          DEFAULT: '#0f766e',
          dim: '#115e59',
        },
        success: '#059669',
        error: '#ef4444',
        amber: '#d97706',

        // Legacy aliases (keep for gradual migration)
        void: '#f4f8ff',
        ivory: '#0f172a',
        pearl: '#334155',
        mist: '#64748b',
        cyan: {
          DEFAULT: '#0284c7',
        },
      },

      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-sora)', 'var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },

      fontSize: {
        '10xl': ['10rem', { lineHeight: '0.85' }],
        '11xl': ['12rem', { lineHeight: '0.85' }],
        '12xl': ['14rem', { lineHeight: '0.85' }],
      },

      letterSpacing: {
        tightest: '-0.05em',
        widest: '0.3em',
        ultra: '0.5em',
      },

      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },

      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        glow: {
          from: { boxShadow: '0 0 20px rgba(2,132,199,0.2)' },
          to: { boxShadow: '0 0 40px rgba(2,132,199,0.42), 0 0 80px rgba(2,132,199,0.2)' },
        },
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'expo-in-out': 'cubic-bezier(0.87, 0, 0.13, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },

      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1000': '1000ms',
        '1200': '1200ms',
      },
    },
  },
  plugins: [],
}

export default config
