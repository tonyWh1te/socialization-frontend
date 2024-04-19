/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        main: ['Playfair Display', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        neucha: ['Neucha', 'sans-serif'],
      },
      colors: {
        'dark-gray': '#5c5c5c',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-5deg)' },
          '50%': { transform: 'rotate(5deg)' },
        },
      },
      animation: {
        wiggle: 'wiggle .7s ease-in-out',
      },
    },
  },
  plugins: [],
};
