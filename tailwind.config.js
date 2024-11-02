/** @type {import('tailwindcss').Config} */
module.exports = {
  content: { 
    files: [
      "*.html", 
      "./src/**/*.{rs,html,js,tsx,ts}",
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [],
}
