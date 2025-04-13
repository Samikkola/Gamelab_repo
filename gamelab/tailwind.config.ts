import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Käytössä olevat CSS-muuttujat
        background: "var(--background)",
        foreground: "var(--foreground)",
        xamkYellow: "#fdb92a",

        // 🔸 Uusi mukautettu väri nimeltä 'xamkYellow'
        
      },
    },
  },
  plugins: [],
} satisfies Config;
