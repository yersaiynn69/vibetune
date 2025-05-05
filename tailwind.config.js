/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'SF Pro Display'", "sans-serif"]
      }
    },
  },
  plugins: [],
};
