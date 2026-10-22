// Wspólna konfiguracja Tailwind (CDN) dla makiet w folderze design/.
tailwind.config = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FDECEA',
          100: '#F8CFCB',
          300: '#F06A5F',
          600: '#C11B18',
          700: '#A31613',
          800: '#7F110F',
        },
        ink: {
          50: '#EEF2F7',
          100: '#DDE3EA',
          200: '#C9D3E0',
          500: '#5E6878',
          600: '#3B4658',
          800: '#1F3149',
          900: '#162336',
          950: '#0E1724',
        },
        honey: {
          100: '#FCEFD9',
          400: '#E9A23B',
          700: '#8A5A00',
        },
        cream: '#FBF8F4',
        sand: '#F3EDE5',
        line: '#E7E1D9',
        charcoal: '#2B2A29',
        success: { 50: '#ECFDF3', 600: '#1E7A4C' },
        warning: { 50: '#FEF3C7', 700: '#B45309', 800: '#92400E' },
        error: { 50: '#FEF3F2', 600: '#B42318' },
        info: { 50: '#EAF2FC', 600: '#1F5FAE' },
      },
      fontFamily: {
        heading: ['Montserrat', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '1rem',
        btn: '0.75rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(22,35,54,.06), 0 4px 16px rgba(22,35,54,.06)',
        lift: '0 2px 4px rgba(22,35,54,.06), 0 12px 32px rgba(22,35,54,.10)',
      },
    },
  },
};
