/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Azul institucional ajustado según la identidad visual U. Caldas
        'ucaldas-blue': '#002855',
        'ucaldas-gold': '#C5A059',
        'ucaldas-bg': '#F4F7F9',
        'ucaldas-dark': '#001a38',
      },
      borderRadius: {
        // Para estandarizar esas tarjetas súper redondeadas que vimos
        auth: '2.5rem',
      },
      keyframes: {
        'soft-zoom': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
      },
      animation: {
        // El efecto de fondo que mencionaste: lento y sutil
        'bg-zoom': 'soft-zoom 20s infinite alternate ease-in-out',
        'fade-up': 'fade-in-up 0.5s ease-out forwards',
        shake: 'shake 0.2s ease-in-out 0s 2',
      },
    },
  },
  plugins: [
    // Recomiendo instalar este plugin si vas a usar animaciones de entrada
    // npm install tailwindcss-animate
    require('tailwindcss-animate'),
  ],
};
