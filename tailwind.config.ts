// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Modern Blue/Green palette
        border: {
          light: 'oklch(0.92 0.02 240)', // Light blue-gray
          dark: 'oklch(0.25 0.03 240)',  // Dark blue-gray
        },
        background: {
          light: 'oklch(0.98 0.01 240)', // Very light blue
          dark: 'oklch(0.12 0.03 240)',  // Deep navy
        },
        foreground: {
          light: 'oklch(0.15 0.05 240)', // Dark blue-gray
          dark: 'oklch(0.98 0.01 240)',  // Near white
        },
        primary: {
          light: 'oklch(0.55 0.18 240)', // Vibrant blue
          dark: 'oklch(0.65 0.16 180)',  // Teal accent
        },
        secondary: {
          light: 'oklch(0.95 0.03 180)', // Light teal
          dark: 'oklch(0.25 0.05 180)',  // Dark teal
        },
        accent: {
          light: 'oklch(0.60 0.15 180)', // Bright teal
          dark: 'oklch(0.70 0.14 160)',  // Emerald teal
        },
        muted: {
          light: 'oklch(0.96 0.02 240)', // Very light blue
          dark: 'oklch(0.20 0.03 240)',  // Dark blue-gray
        },
        card: {
          light: 'oklch(1 0 0)',         // Pure white
          dark: 'oklch(0.18 0.03 240)',  // Dark card
        },
        // Extended blue/green shades
        blue: {
          50: 'oklch(0.97 0.02 240)',
          100: 'oklch(0.94 0.04 240)',
          200: 'oklch(0.86 0.08 240)',
          300: 'oklch(0.74 0.16 240)',
          400: 'oklch(0.62 0.20 240)',
          500: 'oklch(0.55 0.22 240)',
          600: 'oklch(0.47 0.20 240)',
          700: 'oklch(0.38 0.16 240)',
          800: 'oklch(0.29 0.12 240)',
          900: 'oklch(0.20 0.08 240)',
        },
        teal: {
          50: 'oklch(0.98 0.02 180)',
          100: 'oklch(0.95 0.04 180)',
          200: 'oklch(0.88 0.08 180)',
          300: 'oklch(0.76 0.14 180)',
          400: 'oklch(0.64 0.18 180)',
          500: 'oklch(0.57 0.20 180)',
          600: 'oklch(0.49 0.18 180)',
          700: 'oklch(0.40 0.15 180)',
          800: 'oklch(0.31 0.11 180)',
          900: 'oklch(0.22 0.07 180)',
        },
        cyan: {
          50: 'oklch(0.98 0.02 200)',
          100: 'oklch(0.95 0.04 200)',
          200: 'oklch(0.88 0.08 200)',
          300: 'oklch(0.78 0.14 200)',
          400: 'oklch(0.66 0.18 200)',
          500: 'oklch(0.59 0.20 200)',
          600: 'oklch(0.51 0.18 200)',
          700: 'oklch(0.42 0.15 200)',
          800: 'oklch(0.33 0.11 200)',
          900: 'oklch(0.24 0.07 200)',
        }
      },
      backgroundColor: {
        light: 'oklch(0.98 0.01 240)',
        dark: 'oklch(0.12 0.03 240)',
      },
      textColor: {
        light: 'oklch(0.15 0.05 240)',
        dark: 'oklch(0.98 0.01 240)',
      },
      borderColor: {
        light: 'oklch(0.92 0.02 240)',
        dark: 'oklch(0.25 0.03 240)',
      },
      gradientColorStops: {
        'primary-start': 'oklch(0.55 0.18 240)',
        'primary-end': 'oklch(0.57 0.20 180)',
        'dark-start': 'oklch(0.18 0.03 240)',
        'dark-end': 'oklch(0.22 0.04 200)',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px oklch(0.4 0.1 240 / 0.1)',
        'soft-dark': '0 2px 15px -3px oklch(0 0 0 / 0.3)',
      }
    },
  },
  plugins: [require('@tailwindcss/animate')],
}

export default config