// =============================================================================
// ARQUIVO DE CONFIGURACAO CENTRAL — DADOS DO PERSONAL
// Editar este arquivo para atualizar os dados do personal em toda a landing page.
// Nenhum dado do personal deve estar hardcoded em componentes.
// =============================================================================

export const PERSONAL = {
  nome: 'Guinho Vagner',                    // Nome completo
  nomeDisplay: 'Guinho',                    // Nome curto (para "Olá, eu sou o Guinho")
  cref: '028414-G/PR',                      // Registro profissional
  cidade: 'Piraquara',                      // Cidade de atuação (importante para SEO local)
  estado: 'PR',                             // Sigla do estado
  anosExperiencia: '15',                    // Em academia desde 2011
  totalAlunos: '[TOTAL_ALUNOS]',            // TODO: substituir pelo numero real (ex: "100+")
} as const;

export const CONTATO = {
  whatsapp: {
    numero: '5541997340600',                // DDI+DDD+numero, sem simbolos
    mensagemPadrao: 'Oi Guinho! Vi seu site e quero saber mais sobre os planos de treino.',
  },
  instagram: {
    handle: 'personalguinhovagner',         // sem @
    url: 'https://instagram.com/personalguinhovagner',
  },
  email: '',                                // Opcional — vazio = nao exibir
} as const;

export const SERVICOS = [
  {
    id: 'plano-treino',
    titulo: 'Plano de Treino',
    descricao: 'Você recebe um treino montado especialmente para você — seu corpo, seu objetivo, sua rotina. Sem ficha genérica. Sem enrolação.',
    duracao: '~2 meses',
    renovavel: true,
    acompanhamento: false,
    preco: '',                              // string vazia = nao exibir preco (TODO: substituir quando definido)
    cta: 'Quero meu plano',
    destaque: false,
    beneficios: [
      'Treino 100% personalizado',
      'Montado em até 48h após o contato',
      'Válido por aproximadamente 2 meses',
      'Renovação disponível quando necessário',
      'Suporte via WhatsApp',
    ],
  },
  {
    id: 'personal-trainer',
    titulo: 'Personal Trainer',
    descricao: 'Além do treino personalizado, estou do seu lado em cada sessão. Corrijo, oriento e garanto que você evolua com segurança e eficiência.',
    duracao: 'Mensal',
    renovavel: true,
    acompanhamento: true,
    preco: '',                              // string vazia = nao exibir preco (TODO: substituir quando definido)
    cta: 'Quero acompanhamento',
    destaque: true,                         // Exibe badge "Mais Completo"
    beneficios: [
      'Tudo que está no Plano de Treino',
      'Acompanhamento presencial nas sessões',
      'Correção de postura e execução em tempo real',
      'Evolução monitorada aula a aula',
      'Agenda flexível',
    ],
  },
] as const;

// =============================================================================
// HELPER: Gera URL do WhatsApp com mensagem pre-preenchida
// Usar esta funcao em todos os CTAs de WhatsApp — nunca montar a URL manualmente.
// =============================================================================
export function gerarUrlWhatsApp(mensagem?: string): string {
  const msg = mensagem ?? CONTATO.whatsapp.mensagemPadrao;
  return `https://wa.me/${CONTATO.whatsapp.numero}?text=${encodeURIComponent(msg)}`;
}
