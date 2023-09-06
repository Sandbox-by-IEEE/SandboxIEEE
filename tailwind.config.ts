import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'modal-bg-image': "url('/src/assets/ModalBackground.png')",
      },
      colors: {
        'green-primary': '#0D432F',
        'cream-secondary-light': '#FFE1B9',
        'cream-secondary-normal': '#D8B88B',
        'brown-secondary': '#AB814E',
      },
    },
  },
  plugins: [],
};
export default config;
