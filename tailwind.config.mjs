/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#F8FAFC',
          surface: '#FFFFFF',
          pearl: '#F1F5F9',
          sand: '#E2E8F0',
          // Palette Signature BABEL STORE : Bleu Nuit & Grenat Royal
          navy: '#0B132B',
          navydark: '#060B1A',
          navylight: '#162344',
          blue: '#1B365D',
          blueaccent: '#1D4ED8',
          bluelight: '#EFF6FF',
          grenat: '#780016',
          grenatdark: '#54000F',
          grenatlight: '#FDF2F4',
          grenatsoft: '#FCE7EB',
          // Aliases pour composants existants (remplace définitivement le terracotta Cozy Space)
          cognac: '#780016',
          cognacdark: '#54000F',
          cognacsoft: '#FDF2F4',
          // Typographie & Neutres
          ink: '#0B132B',
          charcoal: '#0F172A',
          muted: '#64748B',
          line: '#E2E8F0',
          // Touche d'or champagne
          gold: '#C5A880',
          goldsoft: '#FAF5EE',
          amber: '#B8860B'
        }
      },
      boxShadow: {
        soft: '0 14px 34px rgba(11, 19, 43, 0.05), 0 2px 10px rgba(11, 19, 43, 0.03)',
        premium: '0 24px 60px rgba(11, 19, 43, 0.16), 0 6px 18px rgba(120, 0, 22, 0.08)',
        grenat: '0 10px 25px rgba(120, 0, 22, 0.25)'
      },
      borderRadius: {
        '4xl': '2rem'
      },
      letterSpacing: {
        brand: '0.12em'
      },
      backgroundImage: {
        'babel-hero': 'radial-gradient(ellipse at 80% 20%, rgba(120, 0, 22, 0.25) 0%, transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(29, 78, 216, 0.18) 0%, transparent 60%), linear-gradient(135deg, #0B132B 0%, #0F1D38 60%, #060B1A 100%)',
        'babel-card': 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)',
        'babel-grenat-glow': 'radial-gradient(circle, rgba(120,0,22,0.15) 0%, transparent 70%)'
      }
    }
  },
  plugins: []
};
