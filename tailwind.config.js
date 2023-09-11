/** @type {import('tailwindcss').Config} */
module.exports = {
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
      },
      container: {
        center: true,
      },
      fontFamily: {
        noto: ['noto-sans', 'sans-serif'],
      },
      colors: {
        'web-blue': "#78C1F3",
        'web-green': "#98E8D8",
        'web-yellow': "#E2F6CA",
        'web-lightyellow': "#F8FDCF",
        'web-black': "#1E1E24",
        'web-white': "#F8F8F8",
      },
      maxWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        '1/3': '33.333333%',
      },
    },
  },
  plugins: [],
}
