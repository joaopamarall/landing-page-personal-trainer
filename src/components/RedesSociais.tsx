'use client';
import { CONTATO } from '@/config/contato';
import { IconInstagram } from '@/components/icons/IconInstagram';
import { useInView } from '@/hooks/useInView';

export default function RedesSociais() {
  const { ref: sectionRef, isInView } = useInView();

  return (
    <section
      id="redes-sociais"
      className="py-section bg-surface"
      ref={sectionRef as React.RefObject<HTMLElement>}
    >
      <div className="container-page">
        <div
          className={`text-center max-w-2xl mx-auto will-animate${isInView ? ' animate-fadeIn' : ''}`}
        >
          {/* Titulo */}
          <h2 className="font-display text-section text-white uppercase mb-4">
            Me siga e acompanhe a{' '}
            <span className="text-accent">evolução</span>
          </h2>

          {/* Texto */}
          <p className="text-text-secondary font-sans text-lg mb-8">
            Dicas de treino, bastidores e resultados reais — todo dia no Instagram.
          </p>

          {/* Botao Instagram */}
          <a
            href={CONTATO.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Seguir @${CONTATO.instagram.handle} no Instagram`}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white font-bold font-sans rounded-sm hover:opacity-90 transition-opacity duration-200 text-lg"
          >
            <IconInstagram className="w-6 h-6" />
            @{CONTATO.instagram.handle}
          </a>
        </div>
      </div>
    </section>
  );
}
