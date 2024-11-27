/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'circular-web': ['circular-web', 'sans-serif'],
        'general': ['general', 'sans-serif'],
        'robert-regular': ['robert-regular', 'sans-serif'],
        'robert-medium': ['robert-medium', 'sans-serif'],
        'zentry-regular': ['zentry-regular', 'sans-serif'],
      },
      colors: {
        "bbsu-blue": {
          "50": "#DFDFF0",
          "75": "#DFDFF2",
          "100": "#F0F2FA",
          "300": "#4FB7FF",
        },
        "bbsu-black": {
          "700": "#010101",
        },
        "bbsu-violet": {
          "300": "#5724FF",
        },
        "bbsu-yellow": {
          "100": "#8E983F",
          "300": "#EDFF66",
        },
      }
    },
  },
  plugins: [],
}