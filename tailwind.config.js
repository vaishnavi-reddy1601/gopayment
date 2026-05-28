/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#003087',
          'blue-light': '#1a56db',
          'blue-dark': '#002366',
          orange: '#e84c0e',
        }
      }
    },
  },
  plugins: [],
}
