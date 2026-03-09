import { PERSONAL, CONTATO, gerarUrlWhatsApp } from '@/config/contato';
import { IconWhatsapp } from '@/components/icons/IconWhatsapp';
import { IconInstagram } from '@/components/icons/IconInstagram';

export default function Footer() {
  const anoAtual = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-surface-border">
      <div className="container-page py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright e CREF */}
          <div className="text-center sm:text-left">
            <p className="text-text-secondary font-sans text-sm">
              &copy; {anoAtual}{' '}
              <span className="text-white font-medium">{PERSONAL.nome}</span>{' '}
              — Personal Trainer em {PERSONAL.cidade}
            </p>
            <p className="text-text-secondary font-sans text-xs mt-1">
              CREF {PERSONAL.cref}
            </p>
          </div>

          {/* Links sociais */}
          <div className="flex items-center gap-4">
            {/* WhatsApp */}
            <a
              href={gerarUrlWhatsApp()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Falar com ${PERSONAL.nomeDisplay} no WhatsApp`}
              className="text-text-secondary hover:text-accent transition-colors duration-200 p-2"
            >
              <IconWhatsapp className="w-5 h-5" />
            </a>

            {/* Instagram */}
            <a
              href={CONTATO.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Seguir ${PERSONAL.nome} no Instagram @${CONTATO.instagram.handle}`}
              className="text-text-secondary hover:text-accent transition-colors duration-200 p-2"
            >
              <IconInstagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
