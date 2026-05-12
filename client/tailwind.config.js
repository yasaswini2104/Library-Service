/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        ink: { 50: '#f0ede8', 100: '#e0d9d0', 200: '#c4b9a8', 300: '#a89880', 400: '#8c7860', 500: '#70583e', 600: '#5a4430', 700: '#443222', 800: '#2e2014', 900: '#1a1009', DEFAULT: '#2e2014' },
        paper: { 50: '#faf8f5', 100: '#f5f1eb', 200: '#ede6da', 300: '#e3d8c8', DEFAULT: '#f5f1eb' },
        gold: { 300: '#f0c86e', 400: '#e8b84d', 500: '#d4a030', 600: '#b8882a', DEFAULT: '#d4a030' },
        sage: { 400: '#7a9e7e', 500: '#5d8563', 600: '#4a6b50', DEFAULT: '#5d8563' },
        crimson: { 400: '#d4605a', 500: '#c0443e', 600: '#a33832', DEFAULT: '#c0443e' },
      },
      boxShadow: {
        'book': '4px 4px 0px 0px rgba(46,32,20,0.15)',
        'book-hover': '6px 6px 0px 0px rgba(46,32,20,0.2)',
        'inset-sm': 'inset 0 1px 3px rgba(46,32,20,0.1)',
      }
    },
  },
  plugins: [],
}
