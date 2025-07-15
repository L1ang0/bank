/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/app/**/*.{js,ts,jsx,tsx}',
      './src/components/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: 'media', // или 'class', если хочешь переключать вручную
    theme: {
      extend: {
        colors: {
          bg: 'var(--color-bg)',
          text: 'var(--color-text)',
          primary: 'var(--color-primary)',
          secondary: 'var(--color-secondary)',
          surface: 'var(--color-surface)',
          card: 'var(--color-card)',
          muted: 'var(--color-muted)',
        },
      },
    },
    plugins: [],
  }
  