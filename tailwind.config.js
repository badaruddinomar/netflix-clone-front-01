/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        hero: "url('./src/assets/login.jpg')",
        home: "url(./src/assets/home.jpg)",
        hometitle: "url('./src/assets/homeTitle.webp')",
        moviehero: "url('./src/assets/movie-hero.jpg')",
        tvhero: "url('./src/assets/tv-series-hero.jpg')",
      },
    },
    fontFamily: {
      primary: ["Poppins", "sans-serif"],
      secondary: ["Roboto", "sans-serif"],
      ternary: ["Josefin Sans", "sans-serif"],
    },
  },
  plugins: [],
};
