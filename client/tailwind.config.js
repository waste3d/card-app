/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"  // Обязательно для React
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7c3aed', // пример фиолетового цвета
      },
    },
  },
  plugins: [],
}
