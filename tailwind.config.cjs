/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"Courier Prime"', '"Courier New"', 'monospace'],
      },
      animation: {
        'flicker': 'flicker 0.15s infinite',
        'cursor': 'cursor .75s step-end infinite',
      },
      keyframes: {
        flicker: {
          '0%': { opacity: '0.97' },
          '100%': { opacity: '1' },
        },
        cursor: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}