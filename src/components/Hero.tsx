import Image from 'next/image';
import { PERSONAL, gerarUrlWhatsApp } from '@/config/contato';
import { Botao } from '@/components/ui/Botao';
import { Badge } from '@/components/ui/Badge';
import { IconWhatsapp } from '@/components/icons/IconWhatsapp';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-16 border-b border-accent/15"
    >
      {/* Foto de fundo — wallpaper */}
      <div className="absolute inset-0">
        <Image
          src="/images/personal-hero.jpeg"
          alt={`${PERSONAL.nome} personal trainer em ${PERSONAL.cidade}`}
          fill
          className="object-cover object-top"
          sizes="100vw"
          priority
          quality={85}
        />
      </div>

      {/* Overlay camada 1 — gradiente horizontal: escuro à esquerda, transparente à direita */}
      <div
        className="absolute inset-0 hidden lg:block"
        style={{
          background:
            'linear-gradient(to right, rgba(15,25,35,0.92) 0%, rgba(15,25,35,0.75) 50%, rgba(15,25,35,0.30) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Overlay camada 1 — mobile: gradiente vertical */}
      <div
        className="absolute inset-0 lg:hidden"
        style={{
          background:
            'linear-gradient(to bottom, rgba(15,25,35,0.85) 0%, rgba(15,25,35,0.65) 60%, rgba(15,25,35,0.90) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Overlay camada 2 — profundidade inferior */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(15,25,35,0.80) 0%, transparent 50%)',
        }}
        aria-hidden="true"
      />

      {/* Conteudo sobre os overlays */}
      <div className="relative z-10 container-page py-20">
        <div className="max-w-xl lg:max-w-2xl text-center lg:text-left mx-auto lg:mx-0">
          {/* Badge de localizacao */}
          <div className="mb-6 flex justify-center lg:justify-start animate-fadeIn">
            <Badge variante="accent">
              Personal Trainer | {PERSONAL.cidade} — {PERSONAL.estado}
            </Badge>
          </div>

          {/* H1 principal */}
          <h1 className="font-display text-hero text-white uppercase mb-6 leading-none animate-fadeInUp delay-100">
            Chega de treino que não dá resultado.{' '}
            <span className="text-accent">Vou montar o seu.</span>
          </h1>

          {/* Tagline */}
          <p className="text-accent text-lg md:text-xl mb-4 font-sans font-medium animate-fadeInUp delay-200">
            Personal trainer em {PERSONAL.cidade} — treinos individualizados para quem quer resultado de verdade.
          </p>

          {/* Descricao */}
          <div className="text-white/80 text-base md:text-lg mb-8 space-y-2 font-sans animate-fadeInUp delay-300">
            <p>Não importa se você quer emagrecer, ganhar massa ou se sentir melhor.</p>
            <p>Eu monto o treino ideal para o seu corpo e o seu objetivo.</p>
            <p className="font-medium text-white">Você faz. Eu oriento. O resultado aparece.</p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4 mb-12 animate-fadeInUp delay-400">
            <Botao
              variante="primary"
              tamanho="lg"
              href={gerarUrlWhatsApp('Oi Guinho! Vi seu site e quero começar a treinar. Pode me contar mais sobre os planos?')}
              target="_blank"
              ariaLabel={`Falar com ${PERSONAL.nomeDisplay} no WhatsApp`}
            >
              <IconWhatsapp className="w-5 h-5" />
              Falar no WhatsApp
            </Botao>

            <Botao
              variante="secondary"
              tamanho="lg"
              href="#servicos"
            >
              Ver meus planos
            </Botao>
          </div>

          {/* Credenciais — 3 números */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm font-sans animate-fadeInUp delay-500">
            <div className="flex items-center gap-2">
              <span className="text-accent font-bold text-lg font-display">
                {PERSONAL.totalAlunos}
              </span>
              <span className="text-text-secondary">alunos cadastrados</span>
            </div>
            <span className="text-surface-border hidden sm:block">|</span>
            <div className="flex items-center gap-2">
              <span className="text-accent font-bold text-lg font-display">
                {PERSONAL.anosExperiencia}
              </span>
              <span className="text-text-secondary">anos de experiência</span>
            </div>
            <span className="text-surface-border hidden sm:block">|</span>
            <div className="flex items-center gap-2">
              <span className="text-text-secondary">CREF</span>
              <span className="text-white font-medium">{PERSONAL.cref}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
