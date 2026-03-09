import Image from 'next/image';
import { PERSONAL, gerarUrlWhatsApp } from '@/config/contato';
import { Badge } from '@/components/ui/Badge';
import { Botao } from '@/components/ui/Botao';
import { IconWhatsapp } from '@/components/icons/IconWhatsapp';
import { Check } from 'lucide-react';

const diferenciais = [
  'Treino individualizado',
  'Montado para o seu corpo, nível e rotina',
  'Suporte direto pelo WhatsApp',
  'Revisão periódica do treino',
  `Atendimento presencial em ${PERSONAL.cidade}`,
];

export default function Sobre() {
  return (
    <section id="sobre" className="py-section bg-surface">
      <div className="container-page">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Coluna esquerda: Foto de perfil */}
          <div className="order-2 lg:order-1">
            <div className="relative w-full aspect-[3/4] max-w-sm mx-auto lg:max-w-none rounded-card overflow-hidden">
              <Image
                src="/images/personal-perfil.jpeg"
                alt={`${PERSONAL.nome}, personal trainer em ${PERSONAL.cidade}`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={85}
              />
            </div>
          </div>

          {/* Coluna direita: Texto */}
          <div className="order-1 lg:order-2">
            <h2 className="font-display text-section text-white uppercase mb-6">
              Quem é{' '}
              <span className="text-accent">{PERSONAL.nome}</span>
            </h2>

            <div className="space-y-4 text-white/80 font-sans mb-8">
              <p>
                Sou {PERSONAL.nomeDisplay}, personal trainer em {PERSONAL.cidade} com{' '}
                <span className="text-white font-medium">{PERSONAL.anosExperiencia} anos de experiência</span>{' '}
                em academia — desde 2011.
              </p>
              <p>
                Comecei na academia como aluno, igual a você. Sei o que é errar, desistir e começar de novo.
              </p>
              <p>
                Por isso, quando decidi me tornar personal, jurei que cada aluno ia ter um treino pensado de verdade — não uma ficha genérica copiada da internet.
              </p>
              <p>
                Hoje são{' '}
                <span className="text-white font-medium">{PERSONAL.totalAlunos} alunos cadastrados</span>{' '}
                e acompanho de perto cada resultado.{' '}
                <span className="text-accent font-medium">Seu objetivo vira o meu objetivo.</span>
              </p>
            </div>

            {/* Lista de diferenciais */}
            <ul className="space-y-3 mb-8">
              {diferenciais.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check
                    className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span className="text-white/80 font-sans">{item}</span>
                </li>
              ))}
            </ul>

            {/* Badge CREF */}
            <div className="flex flex-wrap gap-4 items-center">
              <Badge variante="neutral">
                CREF {PERSONAL.cref} — Profissional certificado
              </Badge>
              <Botao
                variante="primary"
                tamanho="md"
                href={gerarUrlWhatsApp('Oi Guinho! Vi seu perfil e quero saber mais sobre o treino personalizado.')}
                target="_blank"
                ariaLabel={`Falar com ${PERSONAL.nomeDisplay} no WhatsApp`}
              >
                <IconWhatsapp className="w-4 h-4" />
                Falar comigo
              </Botao>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
