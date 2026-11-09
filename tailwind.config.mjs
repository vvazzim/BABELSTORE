/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#F8F5EE',
          surface: '#FFFFFF',
          pearl: '#EDE6DA',
          burgundy: '#6A162B',
          burgundydark: '#4E0F1E',
          burgundysoft: '#F6EBEE',
          cool: '#C7CFD0',
          ink: '#1A1617',
          charcoal: '#2D2627',
          muted: '#6E6462',
          gold: '#C5A059',
          goldsoft: '#F4ECD8',
          amber: '#D9883B',
          line: '#E7DFD4'
        }
      },
      boxShadow: {
        soft: '0 14px 34px rgba(45, 38, 39, 0.07), 0 2px 10px rgba(26, 22, 23, 0.04)',
        premium: '0 24px 60px rgba(78, 15, 30, 0.22), 0 6px 18px rgba(26, 22, 23, 0.08)'
      },
      borderRadius: {
        '4xl': '2rem'
      },
      letterSpacing: {
        brand: '0.12em'
      },
      backgroundImage: {
        'babel-hero': 'radial-gradient(ellipse at 75% 25%, rgba(197, 160, 89, 0.25) 0%, transparent 60%), linear-gradient(135deg, #3A101C 0%, #201317 60%, #151012 100%)',
        'babel-card': 'linear-gradient(180deg, #FFFFFF 0%, #FAF8F5 100%)',
        'cozy-hero': 'radial-gradient(ellipse at 75% 25%, rgba(197, 160, 89, 0.25) 0%, transparent 60%), linear-gradient(135deg, #3A101C 0%, #201317 60%, #151012 100%)'
      }
    }
  },
  plugins: []
};
