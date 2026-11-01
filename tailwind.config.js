/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: {
            DEFAULT: '#0B192C',
            dark: '#070F1B',
            light: '#1E2E45',
            muted: '#334155'
          },
          orange: {
            DEFAULT: '#FF6B00',
            hover: '#E55E00',
            light: '#FFF4EB',
            glow: '#FFA057'
          },
          amber: '#F59E0B',
          emerald: '#10B981',
          slate: '#F8FAFC'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(11, 25, 44, 0.06), 0 2px 6px -1px rgba(11, 25, 44, 0.04)',
        'card-hover': '0 12px 30px -4px rgba(11, 25, 44, 0.12), 0 4px 10px -2px rgba(11, 25, 44, 0.06)',
        'glow-orange': '0 0 25px rgba(255, 107, 0, 0.35)',
      }
    },
  },
  plugins: [],
}

