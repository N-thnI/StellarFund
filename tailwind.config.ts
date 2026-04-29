import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        obsidian: {
          DEFAULT: '#0B0B0B',
          soft: '#161616',
        },
        gold: {
          DEFAULT: '#D4AF37',
          bright: '#FFD700',
        },
        silver: {
          DEFAULT: '#C0C0C0',
          muted: '#A0A0A0',
        },
      },
      animation: {
        'shimmer-pulse': 'shimmer 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-in-out',
      },
      keyframes: {
        shimmer: {
          '0%, 100%': { opacity: '1', backgroundColor: '#D4AF37' },
          '50%': { opacity: '.5', backgroundColor: '#C0C0C0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },
      letterSpacing: {
        'widest': '.25em',
      }
    },
  },
  plugins: [],
};
export default config;
