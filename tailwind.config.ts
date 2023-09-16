import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['var(--font-poppins)'],
        inter: ['var(--font-inter)'],
        'museo-muderno': ['var(--font-museo-moderno)'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-brown':
          'linear-gradient(34deg, #AB814E 17.96%, #FFFBB9 84.9%)',
      },
      colors: {
        'green-primary': '#0D432F',
        'cream-secondary-light': '#FFE1B9',
        'cream-secondary-normal': '#D8B88B',
        'brown-secondary': '#AB814E',
      },
      keyframes: {
        'countdown-sec': {
          '0%': { transform: 'translateY(-64px)', opacity: '0' },
          '20%': { transform: 'translateY(0rem)', opacity: '1.0' },
          '80%': { transform: 'translateY(0rem)', opacity: '1.0' },
          '100%': { transform: 'translateY(+64px)', opacity: '0' },
        },
        'countdown-in': {
          '0%': { transform: 'translateY(-64px)', opacity: '0' },
          '20%': { transform: 'translateY(0rem)', opacity: '1.0' },
          '100%': { transform: 'translateY(0rem)', opacity: '1.0' },
        },
        'countdown-out': {
          '0%': { transform: 'translateY(0rem)', opacity: '1.0' },
          '80%': { transform: 'translateY(0rem)', opacity: '1.0' },
          '100%': { transform: 'translateY(+64px)', opacity: '0' },
        },
      },
      animation: {
        'countdown-sec': 'countdown-sec 1.05s ease-in-out',
        'countdown-in': 'countdown-in 1s ease-in',
        'countdown-out': 'countdown-out 1s ease-out',
      },
    },
  },
  plugins: [],
};
export default config;
