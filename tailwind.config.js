/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#00bcd4',
        'secondary': '#ff9800',
        'dark': '#222222',
        'light': '#ffffff',
      },
      fontFamily: {
        'sans': ['"Roboto"', 'sans-serif'],
        'mono': ['"Roboto Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}