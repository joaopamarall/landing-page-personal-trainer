import { SERVICOS, gerarUrlWhatsApp } from '@/config/contato';
import { Card } from '@/components/ui/Card';
import { Botao } from '@/components/ui/Botao';
import { Badge } from '@/components/ui/Badge';
import { IconWhatsapp } from '@/components/icons/IconWhatsapp';
import { Check } from 'lucide-react';

export default function Servicos() {
  return (
    <section id="servicos" className="py-section bg-background">
      <div className="container-page">
        {/* Titulo da secao */}
        <div className="text-center mb-12">
          <h2 className="font-display text-section text-white uppercase">
            Escolha como quer{' '}
            <span className="text-accent">começar</span>
          </h2>
        </div>

        {/* Grid de cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {SERVICOS.map((servico) => (
            <Card key={servico.id} destaque={servico.destaque}>
              {/* Badges */}
              <div className="mb-4 flex flex-wrap gap-2">
                {!servico.destaque && (
                  <Badge variante="accent">Online</Badge>
                )}
                {servico.destaque && (
                  <>
                    <Badge variante="accent">Mais Completo</Badge>
                    <Badge variante="accent">Presencial</Badge>
                  </>
                )}
              </div>

              {/* Titulo */}
              <h3 className="font-display text-2xl text-white uppercase mb-3">
                {servico.titulo}
              </h3>

              {/* Descricao */}
              <p className="text-text-secondary font-sans text-sm mb-6 leading-relaxed">
                {servico.descricao}
              </p>

              {/* Preco — exibe apenas se definido */}
              {(servico.preco as string).trim() !== '' && (
                <div className="mb-6">
                  <span className="text-accent font-display text-3xl">
                    {servico.preco}
                  </span>
                </div>
              )}

              {/* Lista de beneficios */}
              <ul className="space-y-2 mb-8">
                {servico.beneficios.map((beneficio) => (
                  <li key={beneficio} className="flex items-start gap-3">
                    <Check
                      className="w-4 h-4 text-accent flex-shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="text-white/80 font-sans text-sm">
                      {beneficio}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Botao
                variante={servico.destaque ? 'primary' : 'secondary'}
                tamanho="md"
                href={gerarUrlWhatsApp(
                  `Oi Guinho! Vi seu site e tenho interesse no ${servico.titulo}. Pode me contar mais?`
                )}
                target="_blank"
                className="w-full justify-center"
                ariaLabel={`Contratar ${servico.titulo} com Guinho via WhatsApp`}
              >
                <IconWhatsapp className="w-4 h-4" />
                {servico.cta}
              </Botao>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
