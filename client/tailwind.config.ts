import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./app/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        white: "var(--white)",
      },
    },
  },
  plugins: [],
} satisfies Config;
