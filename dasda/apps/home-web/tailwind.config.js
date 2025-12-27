import sharedTheme from "@hirenova/ui/tailwind.config.js";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "../../libs/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [sharedTheme],
  theme: {
    extend: {},
  },
  plugins: [],
};
