/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        'surface-light': 'var(--surface-light)',
        cream: 'var(--cream)',
        accent: 'var(--accent)',
        'accent-hover': '#FF8045',
        muted: '#8E8E9F',
        divider: 'var(--divider)',
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'Sora', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Sora', 'sans-serif'],
      },
      letterSpacing: {
        eyebrow: '0.22em',
        wide: '0.08em',
      },
      boxShadow: {
        'accent-glow': '0 0 35px -5px rgba(255, 106, 43, 0.35)',
        'accent-pill': '0 4px 20px -2px rgba(255, 106, 43, 0.45)',
        'card-dark': '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
        'card-cream': '0 20px 40px -15px rgba(10, 10, 12, 0.08)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}

