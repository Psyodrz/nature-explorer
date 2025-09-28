/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2E7D32",
        secondary: "#81C784",
        accent: "#FFC107",
        forest: {
          light: "#A5D6A7",
          DEFAULT: "#4CAF50",
          dark: "#1B5E20",
        },
        earth: {
          light: "#D7CCC8",
          DEFAULT: "#795548",
          dark: "#3E2723",
        },
        leaf: {
          light: "#C8E6C9",
          DEFAULT: "#66BB6A",
          dark: "#2E7D32",
        }
      },
      fontFamily: {
        'heading': ['Abril Fatface', 'cursive'],
        'body': ['Quicksand', 'sans-serif'],
        'serif': ['Lora', 'serif'],
      },
      backgroundImage: {
        'leaf-pattern': "url('/src/assets/leaf-pattern.png')",
      },
      borderWidth: {
        '1': '1px',
      },
      boxShadow: {
        'natural': '0 4px 14px 0 rgba(0, 77, 0, 0.07)',
      },
    },
  },
  plugins: [],
} 