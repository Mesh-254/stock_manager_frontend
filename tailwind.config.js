/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: "#0d1b2a",
          800: "#132033",
          700: "#1a2d42",
        },
        amber: {
          500: "#e8a020",
          300: "#f5c04a",
        },
        slate: {
          400: "#8fa3b8",
        },
      },
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        dmsan: ["DM Sans", "sans-serif"],
      },
      backgroundColor: {
        primary: "#0d1b2a",
        secondary: "#132033",
        tertiary: "#1a2d42",
      },
      textColor: {
        primary: "#ffffff",
        secondary: "#8fa3b8",
      },
    },
  },
  plugins: [],
};
