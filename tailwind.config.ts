import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'

const config: Config = {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        terra: {
          DEFAULT: '#C1663A',
          dark:    '#8C4220',
          light:   '#E8946A',
        },
        sand: {
          DEFAULT: '#F5EDE0',
          dark:    '#E8D9C4',
        },
        ink: {
          DEFAULT: '#2A1E14',
          light:   '#5C4033',
        },
        gold:  '#D4A847',
        cream: '#FDFAF6',
      },
      fontFamily: {
        serif:  ['Playfair Display', 'Georgia', 'serif'],
        lora:   ['Lora', 'Georgia', 'serif'],
        sans:   ['Source Sans 3', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to:   { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to:   { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up':   'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [tailwindcssAnimate],
}

export default config
