# Project Memory — Landing Page Personal Trainer

## Contexto do Negocio

- Cliente: irmao do usuario — personal trainer com influencia local na cidade
- Servicos: Plano de Treino (~2 meses, renovavel) + Personal Trainer (presencial + plano)
- Conversao: WhatsApp (nao ha checkout ou formulario complexo)
- Fase atual: estrutura de agents criada, projeto ainda sem codigo
- Intencao futura: trafego pago

## Decisoes de Stack (definidas pelo personal-tech-architect)

- Framework: **Next.js 15.x + React 19.x + TypeScript** (SSG via output: 'export')
- Estilizacao: **Tailwind CSS 3.x** (utility-first, design tokens consistentes)
- Hospedagem: **Vercel** (gratuito, deploy automatico via GitHub, HTTPS automatico)
- Alternativa de hospedagem: Netlify (mesmas caracteristicas)
- Iconografia: **lucide-react** (tree-shakeable, tipado)
- Fontes: Bebas Neue (display/headlines) + Inter (corpo de texto) — via next/font/google
- Motivo escolha React/Next.js: tecnologia conhecida pelo desenvolvedor (vs Astro desconhecido)

## Identidade Visual (definida pelo personal-ui-ux-designer)

- Estilo: Dark premium com accent neon (padrao fitness moderno — Nike Training, Gymshark)
- Background principal: #0F1923
- Accent (CTAs, destaques): #E8FF00 (amarelo neon)
- Surface (cards): #1A2535
- Texto principal: #FFFFFF
- Texto secundario: #8892A4

## Agents do Projeto

- personal-tech-architect (consultivo) — specs e decisoes de stack
- personal-ui-ux-designer (consultivo) — identidade visual e layout
- personal-content-writer (consultivo) — copy e tom de voz
- personal-frontend-dev (implementador) — codigo Astro + Tailwind
- personal-seo-specialist (implementador/consultivo) — SEO local

## Dados do Personal (confirmados)

- Nome: Guinho Vagner
- Cidade: Piraquara (PR)
- WhatsApp: 5541997340600 (formato wa.me)
- Instagram: @personalguinhovagner
- CREF: 028414-G/PR

## Dados Ainda Pendentes

- [ ] Anos de experiencia
- [ ] Numero de alunos atendidos
- [ ] Precos dos servicos (se quiser exibir na landing)
- [ ] Fotos profissionais (personal em acao, foto de perfil)
- [ ] Depoimentos de alunos reais (nome + texto + autorizacao)
- [x] Dominio: **personalguinhovagner.com.br** (comprado, pendente configuracao no Vercel)

## Gotchas Tecnicos

- Next.js export estatico: `output: 'export'` em next.config.ts + `images: { unoptimized: true }` (obrigatorio para static export)
- next/font: importar fontes no layout.tsx e passar via CSS variables para o Tailwind (--font-display, --font-sans)
- WhatsApp URL: formato correto e `https://wa.me/[numero_sem_simbolos]?text=[mensagem_encoded]`
- Server Components: padrao no App Router. Adicionar 'use client' APENAS quando necessario (hooks, eventos)
- Tailwind v3 com Next.js 15: usar tailwind.config.ts (TypeScript), content apontando para `./src/**/*.{ts,tsx}`

## Tasks Criadas

- `tasks/01-landing-page-completa/` — CONCLUIDA
  - SPEC_TECNICA.md (personal-tech-architect) — concluido
  - UI_SPECS.md (personal-ui-ux-designer) — concluido
  - COPY_DOC.md (personal-content-writer) — concluido
  - TASKS_IMPLEMENTACAO.md (orquestrador) — concluido, todos os [x] marcados
  - Implementacao pelo personal-frontend-dev — CONCLUIDO
  - Build: npm run build passa, pasta /out gerada, sitemap.xml gerado
  - TypeScript: npx tsc --noEmit retornou 0 erros
  - Next.js instalado: 16.1.6 (create-next-app resolveu para 16 — compativel)

## Pendente (proximas tasks)
- Fotos reais do Guinho (hero + perfil) — substituir placeholders em /public/images/
- Anos de experiencia e total de alunos — atualizar src/config/contato.ts
- Depoimentos reais de alunos (com autorizacao) — substituir ficticios em Depoimentos.tsx
- Schema markup JSON-LD LocalBusiness — personal-seo-specialist (task 02)
- Meta description otimizada — personal-seo-specialist (task 02)
- Deploy no Vercel — conectar repositorio GitHub ao Vercel
- Dominio customizado (opcional)
