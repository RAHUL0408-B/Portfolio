/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg-color)',
        surface: 'var(--surface-color)',
        surfaceHover: 'var(--surface-hover)',
        border: 'var(--border-color)',
        cyan: {
          DEFAULT: '#00D4FF',
          dim: '#00A8CC',
          glow: 'rgba(0,212,255,0.15)',
        },
        green: {
          neon: '#39FF14',
          dim: '#2ACC10',
        },
        purple: {
          glow: '#7B5EA7',
          dim: 'rgba(123,94,167,0.3)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        sans: ['Outfit', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(var(--grid-line-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line-color) 1px, transparent 1px)',
        'hero-glow':
          'radial-gradient(ellipse 80% 50% at 50% -20%, var(--glow-radial-color), transparent)',
      },
      backgroundSize: {
        'grid-size': '40px 40px',
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        'float-up': 'floatUp 20s linear infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16,1,0.3,1)',
        'fade-in': 'fadeIn 0.6s ease forwards',
      },
      keyframes: {
        blink: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0' } },
        floatUp: {
          '0%': { transform: 'translateY(100vh) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '0.6' },
          '90%': { opacity: '0.6' },
          '100%': { transform: 'translateY(-100px) rotate(360deg)', opacity: '0' },
        },
        glowPulse: {
          '0%,100%': { boxShadow: '0 0 20px rgba(0,212,255,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0,212,255,0.6)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      boxShadow: {
        'cyan-glow': '0 0 30px rgba(0,212,255,0.2)',
        'cyan-glow-lg': '0 0 60px rgba(0,212,255,0.3)',
        'purple-glow': '0 0 30px rgba(123,94,167,0.3)',
        card: '0 4px 24px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
};
