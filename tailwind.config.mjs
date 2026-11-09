/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#F5EFE6',
          surface: '#FFFFFF',
          pearl: '#E2D6C3',
          sand: '#EAE0D0',
          cognac: '#B26122',
          cognacdark: '#8D4713',
          cognacsoft: '#FAEDE3',
          cool: '#C7CFD0',
          ink: '#1A1615',
          charcoal: '#28211E',
          muted: '#736862',
          gold: '#C49B55',
          goldsoft: '#F7EEDD',
          amber: '#D9883B',
          line: '#E3D8C8'
        }
      },
      boxShadow: {
        soft: '0 14px 34px rgba(40, 33, 30, 0.06), 0 2px 10px rgba(26, 22, 21, 0.03)',
        premium: '0 24px 60px rgba(40, 33, 30, 0.22), 0 6px 18px rgba(26, 22, 21, 0.08)'
      },
      borderRadius: {
        '4xl': '2rem'
      },
      letterSpacing: {
        brand: '0.12em'
      },
      backgroundImage: {
        'babel-hero': 'radial-gradient(ellipse at 78% 22%, rgba(196, 155, 85, 0.28) 0%, transparent 60%), linear-gradient(135deg, #2A211D 0%, #1A1615 65%, #120F0E 100%)',
        'babel-card': 'linear-gradient(180deg, #FFFFFF 0%, #FAF7F2 100%)',
        'cozy-hero': 'radial-gradient(ellipse at 78% 22%, rgba(196, 155, 85, 0.28) 0%, transparent 60%), linear-gradient(135deg, #2A211D 0%, #1A1615 65%, #120F0E 100%)'
      }
    }
  },
  plugins: []
};
