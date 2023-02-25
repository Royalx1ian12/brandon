module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        lapsus: ["lapsus", "sans"],
        'anybody-light': ["anybody-light", "sans"],
      },
      colors: {
        orange: "rgba(254,124,1,1)",
        white: "#FFFFFF",
        brown: "#563921",
        'green-light': '#97A198',
        'purple-dark': '#564063',
        'purple-light': '#8C7A99',
        'red-custom': '#48091C',
        'white-custom': '#F7F7F7',
      },
    },
  },
  plugins: [],
};
