import { PERSONAL } from '@/config/contato';
import { Depoimento } from '@/types';

// TODO: substituir por depoimentos reais com autorizacao dos alunos
const depoimentos: Depoimento[] = [
  {
    id: '1',
    nomeAluno: 'Carlos M.',
    texto: `Eu tentei treinar sozinho por anos e não saía do lugar. Com o ${PERSONAL.nomeDisplay}, em dois meses eu já sentia a diferença. O treino é feito pra mim, não é copiar e colar.`,
    tempoComoAluno: 'aluno há 4 meses',
  },
  {
    id: '2',
    nomeAluno: 'Ana Paula R.',
    texto: 'Perdi 8 kg em 3 meses e o mais importante: aprendi a treinar direito. Ele explica tudo, corrige tudo. Não dá pra comparar com treinar sem acompanhamento.',
    resultado: 'Perdeu 8kg em 3 meses',
    tempoComoAluno: 'aluna há 3 meses',
  },
  {
    id: '3',
    nomeAluno: 'Rodrigo F.',
    texto: `Nunca pensei que conseguiria ir à academia com consistência. O plano de treino do ${PERSONAL.nomeDisplay} é prático, encaixa na minha rotina e funciona de verdade.`,
    tempoComoAluno: 'aluno há 6 meses',
  },
];

function getInicial(nome: string): string {
  return nome.charAt(0).toUpperCase();
}

export default function Depoimentos() {
  return (
    <section id="depoimentos" className="py-section bg-background">
      <div className="container-page">
        {/* Titulo da secao */}
        <div className="text-center mb-12">
          <h2 className="font-display text-section text-white uppercase">
            Quem já{' '}
            <span className="text-accent">transformou</span>
          </h2>
        </div>

        {/* Desktop: grid 3 colunas | Mobile: scroll horizontal */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {depoimentos.map((dep) => (
            <DepoimentoCard key={dep.id} depoimento={dep} />
          ))}
        </div>

        {/* Mobile: scroll horizontal com snap */}
        <div className="flex md:hidden overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4">
          {depoimentos.map((dep) => (
            <div
              key={dep.id}
              className="snap-center flex-shrink-0 w-[85vw] max-w-sm"
            >
              <DepoimentoCard depoimento={dep} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DepoimentoCard({ depoimento }: { depoimento: Depoimento }) {
  return (
    <div className="bg-background border border-surface-border rounded-card p-6 flex flex-col gap-4 h-full">
      {/* Texto do depoimento */}
      <blockquote className="text-white/80 font-sans text-sm leading-relaxed flex-1">
        &ldquo;{depoimento.texto}&rdquo;
      </blockquote>

      {/* Resultado, se houver */}
      {depoimento.resultado && (
        <div className="bg-accent/10 border border-accent/20 rounded px-3 py-2">
          <p className="text-accent text-xs font-medium font-sans">
            {depoimento.resultado}
          </p>
        </div>
      )}

      {/* Autor */}
      <div className="flex items-center gap-3 pt-2 border-t border-surface-border">
        {/* Avatar com inicial */}
        <div
          className="w-10 h-10 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center flex-shrink-0"
          aria-hidden="true"
        >
          <span className="font-display text-accent text-lg leading-none">
            {getInicial(depoimento.nomeAluno)}
          </span>
        </div>

        {/* Nome e tempo */}
        <div>
          <p className="text-white font-medium font-sans text-sm">
            {depoimento.nomeAluno}
          </p>
          {depoimento.tempoComoAluno && (
            <p className="text-text-secondary font-sans text-xs">
              {depoimento.tempoComoAluno}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
