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
        'custom-card-vote':
          '0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 2px 0px rgba(0, 0, 0, 0.25), 0px 4px 1px 0px rgba(0, 0, 0, 0.25)',
      },
      fontFamily: {
        poppins: ['var(--font-poppins)'],
        inter: ['var(--font-inter)'],
        'museo-muderno': ['var(--font-museo-moderno)'],
      },
      backgroundImage: {
        'green-gradient':
          'linear-gradient(180deg, rgba(5, 31, 18, 0.99) 0%, rgba(6, 25, 12, 0.99) 100%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-brown':
          'linear-gradient(34deg, #AB814E 17.96%, #FFFBB9 84.9%)',
        'gradient-green':
          'linear-gradient(180deg, #0F3015 100%, rgba(0, 0, 0, 0.00) 69.27%)',
        'gradient-card-vote':
          'linear-gradient(180deg, #FFE1B9 0%, rgba(171, 129, 78, 0.86) 100%)',
        'gradient-section': 'linear-gradient(to bottom, #0b2712, #123b1a)',
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
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        trans: {
          '0%': { opacity: '0' },
          '15%': { opacity: '1' },
          '80%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'fade-in': {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        'fade-out': {
          '0%': {
            opacity: '1',
          },
          '100%': {
            opacity: '0',
          },
        },
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
        'ghost-left': {
          '0%': {
            transform: 'translateY(0.25rem) translateX(-0.25rem)',
            opacity: '0.75',
          },
          '16%': {
            transform: 'translateY(0.5rem) translateX(-0.5rem)',
            opacity: '0.5',
          },
          '33%': {
            transform: 'translateY(0.75rem) translateX(-0.75rem)',
            opacity: '0.25',
          },
          '50%': {
            transform: 'translateY(0.5rem) translateX(-0.5rem)',
            opacity: '0.5',
          },
          '66%': {
            transform: 'translateY(0.25rem) translateX(-0.25rem)',
            opacity: '0.75',
          },
          '100%': {
            transform: 'translateY(0rem) translateX(-0rem)',
            opacity: '1.0',
          },
        },
        blink: {
          '0%': {
            opacity: '0',
          },
          '100%': { opacity: '1' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0) rotate(0deg)' },
          '10%, 30%, 50%, 70%, 90%': {
            transform: 'translateX(-10px) rotate(-5deg)',
          },
          '20%, 40%, 60%, 80%': { transform: 'translateX(10px) rotate(5deg)' },
        },
        walk: {
          '0%': { transform: 'translateX(0%)', opacity: '1' },
          '25%': { transform: 'translateX(-10%)', opacity: '0.75' },
          '50%': { transform: 'translateX(0%)', opacity: '1' },
          '75%': { transform: 'translateX(10%)', opacity: '0.75' },
          '100%': { transform: 'translateX(0%)', opacity: '1' },
        },
      },
      animation: {
        'countdown-sec': 'countdown-sec 1.05s ease-in-out',
        'countdown-in': 'countdown-in 1s ease-in',
        'countdown-out': 'countdown-out 1s ease-out',
        blink: 'blink 1s ease-in-out',
        'ghost-left': 'ghost-left 5s ease-out infinite',
        walk: 'walk 18s linear infinite',
        shake: 'shake 4s ease-in-out infinite',
        marquee: 'marquee 16s linear infinite',
        trans: 'trans 16s ease-in-out',
        'fade-in': 'fade-in 0.5s ease-in-out',
        'fade-out': 'fade-out 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
};
export default config;
