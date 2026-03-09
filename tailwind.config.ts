import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta principal (dark premium + neon)
        background: '#0F1923',          // Fundo principal
        surface: '#1A2535',             // Cards e superficies elevadas
        'surface-elevated': '#1E2D40',  // Cards em hover, elementos flutuantes
        accent: '#E8FF00',              // Amarelo neon — CTAs, destaques, hover states
        'accent-hover': '#D4EB00',      // Accent mais escuro para hover
        'surface-border': '#2A3548',    // Bordas de cards
        'text-primary': '#FFFFFF',      // Texto principal
        'text-secondary': '#8892A4',    // Texto secundario, subtitulos
        'text-muted': '#8892A4',        // Alias para text-secondary
        'text-inverse': '#0F1923',      // Texto sobre fundo accent (botoes CTA)
        success: '#22C55E',             // Badges de resultado positivo
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'], // Bebas Neue — headlines
        sans: ['var(--font-sans)', 'sans-serif'],        // Inter — corpo de texto
      },
      fontSize: {
        // Escala tipografica da landing
        hero: ['clamp(2.5rem, 8vw, 5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        section: ['clamp(1.75rem, 4vw, 2.5rem)', { lineHeight: '1.15' }],
      },
      spacing: {
        section: '5rem',     // Padding vertical padrao entre secoes (80px)
        'section-sm': '3rem', // Versao mobile (48px)
      },
      maxWidth: {
        container: '1200px', // Largura maxima do conteudo
      },
      borderRadius: {
        card: '1rem', // Border radius padrao dos cards
      },
      boxShadow: {
        'accent-glow': '0 0 30px rgba(232, 255, 0, 0.15)', // Brilho neon sutil
      },
    },
  },
  plugins: [],
};

export default config;
