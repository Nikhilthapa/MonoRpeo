import sharedTheme from "../../../libs/ui/tailwind.config.js";

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
    extend: {
      colors: {
        'first-shade': 'var(--first-shade, #F0F0F0)',
        'second-shade': 'var(--second-shade, #CCCCCC)',
        'white-colour': 'var(--white-colour, #FCFCFC)',
        'primary-colour': 'var(--primary-colour, #7F5BFF)',
        'second-bg-colour': 'var(--second-bg-colour, #1F2937)',
        'secondary-aaccent': 'var(--secondary-aaccent, #57447F)',
      },
    },
  },
  plugins: [],
};
