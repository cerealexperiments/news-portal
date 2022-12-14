/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "modal": "0px 4px 24px rgba(0, 0, 0, 0.14)"
      }
    }
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
