/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#23262F',
        secondary: '#777E91',
        accent: '#3772FF',
      },
      spacing: {
        '128': '32rem',
      }
    },
  },
  plugins: [],
}