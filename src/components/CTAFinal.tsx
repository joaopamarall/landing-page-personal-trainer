import { gerarUrlWhatsApp } from '@/config/contato';
import { Botao } from '@/components/ui/Botao';
import { IconWhatsapp } from '@/components/icons/IconWhatsapp';

export default function CTAFinal() {
  return (
    <section
      id="contato"
      className="py-section bg-background relative overflow-hidden"
    >
      {/* Efeito de brilho neon no background */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <div className="w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container-page relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Headline */}
          <h2 className="font-display text-section text-white uppercase mb-6">
            Pronto para{' '}
            <span className="text-accent">começar?</span>
          </h2>

          {/* Texto de apoio */}
          <div className="text-text-secondary font-sans text-lg mb-10 space-y-2">
            <p>Não precisa estar em forma para começar.</p>
            <p className="text-white font-medium">
              Precisa começar para chegar lá.
            </p>
          </div>

          {/* CTA principal */}
          <Botao
            variante="primary"
            tamanho="lg"
            href={gerarUrlWhatsApp('Oi Guinho! Estou pronto para começar a treinar. Quero saber mais sobre os seus planos!')}
            target="_blank"
            ariaLabel="Falar com Guinho agora no WhatsApp para começar a treinar"
            className="text-xl px-10 py-5"
          >
            <IconWhatsapp className="w-6 h-6" />
            Falar agora no WhatsApp
          </Botao>

          {/* Nota de sem compromisso */}
          <p className="text-text-secondary font-sans text-sm mt-6">
            Sem compromisso. Respondo na hora.
          </p>
        </div>
      </div>
    </section>
  );
}
