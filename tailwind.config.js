/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // This enables class-based dark mode
  theme: {
    extend: {
      colors: {
        // Define your color palette for both modes
        primary: {
          light: "#4F46E5", // indigo-600
          dark: "#6366F1", // indigo-500
        },
        background: {
          light: "#FFFFFF",
          dark: "#1F2937", // gray-800
        },
        text: {
          light: "#1F2937", // gray-800
          dark: "#F9FAFB", // gray-50
        },
      },
    },
  },
  plugins: [],
};
