import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-input': '0 4px 4px 0 rgba(0, 0, 0, 0.25) inset',
      },
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
        'grand-seminar-banner': "url('/assets/GrandSeminarBanner.png')",
        'g-seminar-radial-gradient':
          'radial-gradient(rgba(8, 30, 17, 1) 0%, rgba(8, 30, 17, 0.6) 50% , rgba(8, 30, 17, 0.00) 70%)',
        'gradient-light-brown':
          'linear-gradient(160deg, #DBB88B 17.96%, #16471f 84.9%)',
        'gradient-light-cards':
          'linear-gradient(150deg, #1e4a30, #0F3015, #16471f)',
      },
      colors: {
        'green-primary': '#0D432F',
        'dark-green': '#071D10',
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
