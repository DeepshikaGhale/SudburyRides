/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: '#FFC107',
          'yellow-dark': '#E0A800',
          black: '#111111',
          gray: '#1c1c1c',
          'gray-light': '#2a2a2a',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'Poppins', 'ui-sans-serif', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 30px rgba(255, 193, 7, 0.35)',
        card: '0 10px 30px rgba(0, 0, 0, 0.12)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0.6' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease-out both',
        'pulse-ring': 'pulse-ring 2s ease-out infinite',
      },
    },
  },
  plugins: [],
}
