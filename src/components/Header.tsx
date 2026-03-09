'use client';

import { useState, useEffect } from 'react';
import { PERSONAL, gerarUrlWhatsApp } from '@/config/contato';
import { IconWhatsapp } from '@/components/icons/IconWhatsapp';
import { Botao } from '@/components/ui/Botao';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/95 backdrop-blur-sm border-b border-surface-border'
          : 'bg-transparent'
      }`}
    >
      <div className="container-page flex items-center justify-between h-16 md:h-20">
        {/* Logo / Nome */}
        <a
          href="#hero"
          className="font-display text-xl md:text-2xl uppercase text-white tracking-wide hover:text-accent transition-colors duration-200"
          aria-label={`${PERSONAL.nome} — Ir para o topo`}
        >
          {PERSONAL.nome}
        </a>

        {/* CTA WhatsApp */}
        <Botao
          variante="primary"
          tamanho="sm"
          href={gerarUrlWhatsApp()}
          target="_blank"
          ariaLabel={`Falar com ${PERSONAL.nomeDisplay} no WhatsApp`}
        >
          <IconWhatsapp className="w-4 h-4" />
          Falar no WhatsApp
        </Botao>
      </div>
    </header>
  );
}
