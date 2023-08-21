/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'hue-main': "#1C41A2",
        'hue-secondary-1': "#A33114",
        'hue-secondary-2': "#65A314",
        'hue-other-1': "#345706",
        'hue-other-2': "#0A1D57",
      },
    },
    
    
  },
  plugins: [],
}

