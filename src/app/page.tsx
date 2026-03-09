import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Sobre from '@/components/Sobre';
import Servicos from '@/components/Servicos';
import ComoFunciona from '@/components/ComoFunciona';
import Depoimentos from '@/components/Depoimentos';
import RedesSociais from '@/components/RedesSociais';
import CTAFinal from '@/components/CTAFinal';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      {/* Skip link para acessibilidade */}
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-accent focus:text-background focus:px-4 focus:py-2 focus:rounded font-bold font-sans"
      >
        Ir para o conteudo principal
      </a>

      <Header />

      <main id="main-content">
        <Hero />
        <Sobre />
        <Servicos />
        <ComoFunciona />
        <Depoimentos />
        <RedesSociais />
        <CTAFinal />
      </main>

      <Footer />
    </>
  );
}
