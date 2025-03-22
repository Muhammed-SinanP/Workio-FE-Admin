/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#870aff",
          dark: "#360269",
          light: "#b872fc",
          extralight: "#faf5ff",
          text: "#202124",
        },
        dark: {
          DEFAULT: "#1D232A",
          light: "#39424d",
          text: "#A6ADBB",
          input: "#121212",
        },
      },
      fontFamily: {
        "brand-font": ["Lora", "sans-serif"],
        "para-font": ["Noto Sans", "sans-serif"],
      },
      fontSize: {
        xxs: "0.7rem",
      },
      borderWidth: {
        0.5: "0.5px",
        3: "3px",
      },
    },
  },
  plugins: [
    require("daisyui"),
    require("tailwind-scrollbar-hide"),
    require("tailwind-scrollbar")({ nocompatible: true }),
  ],
  daisyui: {
    themes: ["light", "dark"],
  },
  darkMode: ["selector", '[data-theme="dark"]'],
};

