import type { Metadata } from 'next';
import { Bebas_Neue, Inter } from 'next/font/google';
import './globals.css';

const fontDisplay = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://personalguinhovagner.com.br'),
  title: 'Guinho Vagner — Personal Trainer em Piraquara | Treino Individualizado',
  description: 'Personal trainer em Piraquara/PR. Treinos 100% personalizados para emagrecer, ganhar massa ou melhorar a saude. Atendimento presencial e planos de treino online. CREF 028414-G/PR.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Guinho Vagner — Personal Trainer em Piraquara',
    description: 'Personal trainer em Piraquara/PR. Treinos 100% personalizados para emagrecer, ganhar massa ou melhorar a saude.',
    type: 'website',
    locale: 'pt_BR',
    url: 'https://personalguinhovagner.com.br',
    siteName: 'Guinho Vagner Personal Trainer',
  },
  alternates: {
    canonical: 'https://personalguinhovagner.com.br',
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${fontDisplay.variable} ${fontSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
