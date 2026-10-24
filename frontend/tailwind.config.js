/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0F766E',
          hover: '#115E59',
          light: '#E6F4F1',
          50: '#F0FDFA',
          100: '#CCFBF1',
          500: '#14B8A6',
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A',
        },
        navy: {
          DEFAULT: '#16324F',
          dark: '#0F2134',
          light: '#2A4D73',
        },
        surface: {
          bg: '#F7FAFC',
          card: '#FFFFFF',
          soft: '#F1F5F9',
        },
        content: {
          main: '#172B3A',
          secondary: '#64748B',
          muted: '#94A3B8',
        },
        med: {
          warning: '#B45309',
          error: '#B91C1C',
          success: '#15803D',
          border: '#E2E8F0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        'card': '14px',
        'card-lg': '18px',
      }
    },
  },
  plugins: [],
}
