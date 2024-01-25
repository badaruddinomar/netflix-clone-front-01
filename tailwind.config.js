/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        hero: "url('/frontend/src/assets/login.jpg')",
        home: "url(/frontend/src/assets/home.jpg)",
        hometitle: "url('/frontend/src/assets/homeTitle.webp')",
        moviehero: "url('/frontend/src/assets/movie-hero.jpg')",
        tvhero: "url('/frontend/src/assets/tv-series-hero.jpg')",
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
