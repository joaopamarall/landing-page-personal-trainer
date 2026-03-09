import { gerarUrlWhatsApp } from '@/config/contato';
import { Botao } from '@/components/ui/Botao';
import { IconWhatsapp } from '@/components/icons/IconWhatsapp';
import { ArrowRight } from 'lucide-react';

const passos = [
  {
    numero: '01',
    titulo: 'Fale comigo',
    descricao:
      'Manda uma mensagem no WhatsApp. Sem compromisso. Vou entender seu objetivo e responder na hora.',
  },
  {
    numero: '02',
    titulo: 'Receba seu treino',
    descricao:
      'Monto um treino 100% para você — baseado no seu nível, objetivo e rotina de vida.',
  },
  {
    numero: '03',
    titulo: 'Comece e evolua',
    descricao:
      'Você treina. Eu acompanho. O resultado vai aparecer no espelho.',
  },
];

export default function ComoFunciona() {
  return (
    <section id="como-funciona" className="py-section bg-background">
      <div className="container-page">
        {/* Titulo da secao */}
        <div className="text-center mb-12">
          <h2 className="font-display text-section text-white uppercase">
            Começar é mais simples do que{' '}
            <span className="text-accent">você imagina</span>
          </h2>
        </div>

        {/* Grid de passos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {passos.map((passo, index) => (
            <div key={passo.numero} className="relative">
              {/* Seta separadora — apenas em desktop, entre os passos */}
              {index < passos.length - 1 && (
                <div className="hidden md:flex absolute top-8 -right-4 z-10 text-accent/40">
                  <ArrowRight className="w-8 h-8" aria-hidden="true" />
                </div>
              )}

              {/* Conteudo do passo */}
              <div className="text-center md:text-left">
                {/* Numero grande */}
                <span
                  className="font-display text-6xl text-accent opacity-80 block mb-4 leading-none"
                  aria-hidden="true"
                >
                  {passo.numero}
                </span>

                {/* Titulo */}
                <h3 className="font-display text-xl text-white uppercase mb-3">
                  {passo.titulo}
                </h3>

                {/* Descricao */}
                <p className="text-text-secondary font-sans text-sm leading-relaxed">
                  {passo.descricao}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA abaixo dos passos */}
        <div className="text-center">
          <Botao
            variante="primary"
            tamanho="lg"
            href={gerarUrlWhatsApp('Oi Guinho! Quero começar a treinar. Como funciona?')}
            target="_blank"
            ariaLabel="Falar com Guinho no WhatsApp para começar"
          >
            <IconWhatsapp className="w-5 h-5" />
            Quero começar agora
          </Botao>
        </div>
      </div>
    </section>
  );
}
