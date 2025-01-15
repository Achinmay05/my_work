/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"], 
  darkMode: "class", // Specify paths to your files
  theme: {
    extend: {
      animation: {
        shimmer: "shimmer 2s linear infinite", // Define the shimmer animation
      },
      keyframes: {
        shimmer: {
          from: { backgroundPosition: "0 0" }, // Start position of the shimmer
          to: { backgroundPosition: "-200% 0" }, // End position of the shimmer
        },
      },
    },
  },
  plugins: [], // Add any plugins here
};