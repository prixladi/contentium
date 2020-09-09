module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
