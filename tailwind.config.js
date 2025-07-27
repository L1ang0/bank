/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/app/**/*.{js,ts,jsx,tsx}',
      './src/components/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: 'class',
    theme: {
      backgroundImage: {
        'gradient-text': 'linear-gradient(to right, #ff8a00, #e52e71)',
        'gradient-text-dark': 'linear-gradient(to right, #4facfe, #00f2fe)',
      },
    },
    plugins: [],
  }
  