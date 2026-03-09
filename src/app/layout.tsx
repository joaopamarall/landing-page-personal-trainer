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
  title: 'Guinho Vagner — Personal Trainer em Piraquara/PR',
  description: 'Treinos 100% personalizados em Piraquara/PR. Emagreça, ganhe massa ou melhore sua saúde com o Guinho Vagner — 15 anos de experiência, 360+ alunos. Fale agora no WhatsApp!',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Guinho Vagner — Personal Trainer em Piraquara/PR',
    description: 'Treinos 100% personalizados em Piraquara/PR. 15 anos de experiência, 360+ alunos. Fale agora no WhatsApp!',
    type: 'website',
    locale: 'pt_BR',
    url: 'https://personalguinhovagner.com.br',
    siteName: 'Guinho Vagner Personal Trainer',
    images: [
      {
        url: 'https://personalguinhovagner.com.br/images/og-image.jpeg',
        width: 1200,
        height: 630,
        alt: 'Guinho Vagner — Personal Trainer em Piraquara/PR',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guinho Vagner — Personal Trainer em Piraquara/PR',
    description: 'Treinos 100% personalizados em Piraquara/PR. 15 anos de experiência, 360+ alunos. Fale agora no WhatsApp!',
    images: ['https://personalguinhovagner.com.br/images/og-image.jpeg'],
  },
  alternates: {
    canonical: 'https://personalguinhovagner.com.br',
  },
  icons: {
    icon: '/favicon.svg',
  },
};

// Schema markup JSON-LD para SEO local
const schemaLocalBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Guinho Vagner Personal Trainer',
  description: 'Personal trainer em Piraquara/PR especializado em treinos personalizados para emagrecer, ganhar massa e melhorar a qualidade de vida. CREF 028414-G/PR.',
  url: 'https://personalguinhovagner.com.br',
  telephone: '+5541997340600',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Piraquara',
    addressRegion: 'PR',
    addressCountry: 'BR',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '06:00',
      closes: '21:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday'],
      opens: '07:00',
      closes: '13:00',
    },
  ],
  sameAs: [
    'https://www.instagram.com/personalguinhovagner',
    'https://wa.me/5541997340600',
  ],
  priceRange: '$$',
  image: 'https://personalguinhovagner.com.br/images/og-image.jpeg',
};

const schemaPerson = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Guinho Vagner',
  jobTitle: 'Personal Trainer',
  description: 'Personal Trainer credenciado pelo CREF 028414-G/PR, com 15 anos de experiência em academia.',
  worksFor: {
    '@type': 'LocalBusiness',
    name: 'Guinho Vagner Personal Trainer',
  },
  url: 'https://personalguinhovagner.com.br',
  sameAs: ['https://www.instagram.com/personalguinhovagner'],
};

const schemaServices = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Plano de Treino Personalizado',
    provider: { '@type': 'LocalBusiness', name: 'Guinho Vagner Personal Trainer' },
    areaServed: { '@type': 'City', name: 'Piraquara' },
    description: 'Treino montado individualmente por aproximadamente 2 meses, renovável.',
    serviceType: 'Personal Training',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Personal Trainer Presencial',
    provider: { '@type': 'LocalBusiness', name: 'Guinho Vagner Personal Trainer' },
    areaServed: { '@type': 'City', name: 'Piraquara' },
    description: 'Acompanhamento presencial com correção de postura e evolução monitorada aula a aula.',
    serviceType: 'Personal Training',
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${fontDisplay.variable} ${fontSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLocalBusiness) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaPerson) }}
        />
        {schemaServices.map((service) => (
          <script
            key={service.name}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
          />
        ))}
      </head>
      <body>{children}</body>
    </html>
  );
}
