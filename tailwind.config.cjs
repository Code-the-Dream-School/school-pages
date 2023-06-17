/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./plugin.ts",
  ],
  theme: {
    extend: {
      colors: {
        salmon: {
          // This is the Salmon color you'll see throughout
          // https://codethedream.org/
          //
          // The 500 hue is the exact same color used on the CTD site and also
          // the default
          DEFAULT: "#f15c39",
          50: "#ffece7",
          100: "#ffc2b3",
          200: "#ff9d85",
          300: "#ff9d85",
          400: "#ff8161",
          500: "#f15c39",
          600: "#f53900",
          700: "#bd2c00",
          800: "#a32600",
          900: "#851f00",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
