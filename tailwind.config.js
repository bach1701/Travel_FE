/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        nothing_you_could_do: ['"Nothing You Could Do"'],
        rubik: ['Rubik']
      },
      colors: {
        primary: '#FF6A00'
      }
    },
  },
  plugins: [],
}