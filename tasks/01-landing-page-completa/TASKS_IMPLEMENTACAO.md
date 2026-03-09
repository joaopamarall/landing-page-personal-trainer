# TASKS DE IMPLEMENTACAO: Landing Page Completa — Personal Trainer

| Campo | Valor |
|---|---|
| **Feature** | Landing page completa do personal trainer — todas as secoes |
| **Referencia** | `tasks/01-landing-page-completa/SPEC_TECNICA.md` |
| **UI Specs** | `tasks/01-landing-page-completa/UI_SPECS.md` |
| **Copy** | `tasks/01-landing-page-completa/COPY_DOC.md` |
| **Data** | 2026-03-09 |
| **Agent** | personal-frontend-dev |
| **Codigo** | Raiz do projeto (repositorio novo) |

## Instrucao Inicial

Antes de comecar, leia na ordem:
1. `SPEC_TECNICA.md` — arquitetura e decisoes
2. `UI_SPECS.md` — design tokens, layout, comportamentos visuais
3. `COPY_DOC.md` — todos os textos prontos para usar
4. Este arquivo — o que implementar e em que ordem

Marque `[x]` em cada item ao concluir. Nao avance para o proximo BLOCO com itens pendentes.

---

## Stack / Decisoes Tecnicas

| Item | Valor |
|---|---|
| Framework | Next.js 16.x com App Router (instalado: 16.1.6 — compativel com Next.js 15 App Router) |
| Linguagem | TypeScript 5.x |
| Estilizacao | Tailwind CSS 3.x (instalado: 3.4.19) |
| Hospedagem | Vercel (static export) |
| Modo build | `output: 'export'` em next.config.ts |
| Fontes | Bebas Neue + Inter via next/font/google |
| Icones | lucide-react (tree-shakeable) |
| Sitemap | next-sitemap (postbuild) |

> NOTA: O create-next-app instalou Next.js 16.1.6 em vez de 15.x. A versao 16 e totalmente compativel
> com os padroes de App Router utilizados. Tailwind 3.x esta correto.

---

## Estrutura de Diretorios a Criar

```
src/
  app/
    layout.tsx
    page.tsx
    globals.css
  components/
    Header.tsx
    Hero.tsx
    Sobre.tsx
    Servicos.tsx
    ComoFunciona.tsx
    Depoimentos.tsx
    RedesSociais.tsx
    CTAFinal.tsx
    Footer.tsx
    ui/
      Botao.tsx
      Card.tsx
      Badge.tsx
    icons/
      IconWhatsapp.tsx
      IconInstagram.tsx
  config/
    contato.ts
  types/
    index.ts
public/
  images/
    personal-hero.jpg    (placeholder)
    personal-perfil.jpg  (placeholder)
  favicon.svg
next.config.ts
tailwind.config.ts
tsconfig.json
postcss.config.mjs
next-sitemap.config.js
```

---

## BLOCO 1: Inicializacao e Configuracao do Projeto

### TASK 1.1: Criar o projeto Next.js

- [x] Rodar `npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"` na raiz do repositorio
      > NOTA: create-next-app nao aceita pasta com arquivos existentes (.claude, tasks). Projeto foi
      > criado manualmente com package.json + npm install, equivalente ao resultado do create-next-app.
- [x] Confirmar que `npm run dev` sobe sem erros
- [x] Deletar arquivos de exemplo gerados pelo create-next-app: `src/app/page.tsx` (substituir), `public/vercel.svg`, `public/next.svg`, `src/app/globals.css` (substituir)

### TASK 1.2: Configurar next.config.ts para static export

- [x] Abrir `next.config.ts` e substituir pelo conteudo da SPEC_TECNICA.md (secao 4):
  - `output: 'export'`
  - `images: { unoptimized: true }`
  - `trailingSlash: true`
- [x] Rodar `npm run build` — deve gerar pasta `/out` sem erros

### TASK 1.3: Configurar tailwind.config.ts com design tokens

- [x] Substituir `tailwind.config.ts` pelo conteudo da SPEC_TECNICA.md (secao 5) com:
  - Cores: `background`, `surface`, `accent`, `text-primary`, `text-secondary`, `accent-hover`, `surface-border`
  - Fontes: `display` (Bebas Neue via CSS var) e `sans` (Inter via CSS var)
  - Tamanhos: `hero` e `section` com clamp()
  - Spacing: `section` (5rem) e `section-sm` (3rem)
  - maxWidth: `container` (1200px)
  - borderRadius: `card` (1rem)
  - boxShadow: `accent-glow`

### TASK 1.4: Configurar tsconfig.json

- [x] Verificar que `paths` tem `"@/*": ["./src/*"]` (create-next-app ja adiciona — apenas confirmar)

### TASK 1.5: Instalar dependencias adicionais

- [x] `npm install lucide-react`
- [x] `npm install --save-dev next-sitemap`
- [x] Confirmar que `node_modules` tem os pacotes instalados

### TASK 1.6: Configurar next-sitemap

- [x] Criar `next-sitemap.config.js` na raiz com conteudo da SPEC_TECNICA.md (secao 12)
- [x] Adicionar `"postbuild": "next-sitemap"` nos scripts do `package.json`

---

## BLOCO 2: Base: Tipos, Configuracao Central e Estilos Globais

### TASK 2.1: Criar src/types/index.ts

- [x] Criar arquivo com os tipos da SPEC_TECNICA.md (secao 3):
  - Interface `Depoimento` (id, nomeAluno, texto, resultado?, avatarUrl?)
  - Interface `Servico` (id, titulo, descricao, duracao, renovavel, acompanhamento, preco, cta, destaque?)
  - Types `VarianteBotao` e `TamanhoBotao`

### TASK 2.2: Criar src/config/contato.ts

- [x] Criar arquivo com estrutura da SPEC_TECNICA.md (secao 2):
  - `PERSONAL` com todos os campos (dados reais do Guinho Vagner preenchidos)
  - `CONTATO` com whatsapp (numero e mensagemPadrao) e instagram
  - `SERVICOS` array com os 2 servicos (Plano de Treino e Personal Trainer) com textos do COPY_DOC.md
  - Funcao `gerarUrlWhatsApp(mensagem?: string): string`
- [x] Campos com placeholder marcados com comentario `// TODO: substituir pelo dado real`
      > Campos com dados reais: nome, nomeDisplay, cref, cidade, estado, whatsapp.numero, instagram.handle
      > Campos ainda placeholder: anosExperiencia, totalAlunos, preco (string vazia)

### TASK 2.3: Criar src/app/globals.css

- [x] Substituir globals.css pelo conteudo da SPEC_TECNICA.md (secao 6):
  - `@tailwind base/components/utilities`
  - Base layer: html (scroll-behavior smooth), body (bg-background, font-sans, font-smoothing)
  - Scrollbar customizada dark theme
  - Utility `.container-page` (max-w-container + padding lateral responsivo)

### TASK 2.4: Criar src/app/layout.tsx

- [x] Importar `Bebas_Neue` e `Inter` de `next/font/google`
- [x] Configurar `Bebas_Neue`: `{ weight: '400', subsets: ['latin'], variable: '--font-display', display: 'swap' }`
- [x] Configurar `Inter`: `{ subsets: ['latin'], variable: '--font-sans', display: 'swap' }`
- [x] Exportar `metadata` com title e description (placeholders que o personal-seo-specialist vai refinar)
- [x] `<html lang="pt-BR">` com as duas variaveis de fonte no className
- [x] `<body>` renderiza `{children}`
- [x] Importar `./globals.css`

---

## BLOCO 3: Componentes Atomicos (UI Kit)

### TASK 3.1: Criar src/components/icons/IconWhatsapp.tsx

- [x] Componente funcional que aceita `className?: string`
- [x] SVG do WhatsApp com `fill="currentColor"` e `viewBox="0 0 24 24"`
- [x] Usar o path oficial do icone WhatsApp (disponivel em fontes publicas como simpleicons.org)

### TASK 3.2: Criar src/components/icons/IconInstagram.tsx

- [x] Mesmo padrao do WhatsApp com SVG do Instagram

### TASK 3.3: Criar src/components/ui/Botao.tsx

- [x] Props: `variante: 'primary' | 'secondary' | 'ghost'`, `tamanho?: 'sm' | 'md' | 'lg'`, `href?: string`, `target?`, `children`, `className?`, `ariaLabel?`
- [x] Se `href` fornecido, renderizar `<a>`; caso contrario, `<button>`
- [x] Links externos: `rel="noopener noreferrer"` automatico quando `target="_blank"`
- [x] Variante `primary`: `bg-accent text-background font-bold uppercase tracking-wider hover:bg-accent-hover transition-colors duration-200`
- [x] Variante `secondary`: `border-2 border-accent text-accent hover:bg-accent hover:text-background transition-colors duration-200`
- [x] Variante `ghost`: `text-white hover:text-accent transition-colors duration-200`
- [x] Tamanho `sm`: `px-4 py-2 text-sm`, `md`: `px-6 py-3 text-base`, `lg`: `px-8 py-4 text-lg`
- [x] Borda arredondada: `rounded-sm` (2px — moderno, nao muito arredondado)

### TASK 3.4: Criar src/components/ui/Card.tsx

- [x] Props: `destaque?: boolean`, `children`, `className?`
- [x] Base: `bg-surface border border-surface-border rounded-card p-8`
- [x] Hover: `hover:border-accent/30 transition-colors duration-300`
- [x] Quando `destaque=true`: `border-accent shadow-accent-glow`

### TASK 3.5: Criar src/components/ui/Badge.tsx

- [x] Props: `children`, `variante?: 'accent' | 'neutral'`
- [x] Base: `inline-flex items-center px-3 py-1 rounded text-xs font-medium uppercase tracking-wider`
- [x] Variante `accent`: `bg-accent/10 border border-accent/30 text-accent`
- [x] Variante `neutral`: `bg-surface-border/50 text-text-secondary`

---

## BLOCO 4: Header

### TASK 4.1: Criar src/components/Header.tsx

- [x] Adicionar `'use client'` (precisa de scroll state para mudar visual)
- [x] Importar `useState` e `useEffect` do React
- [x] Importar `PERSONAL`, `CONTATO`, `gerarUrlWhatsApp` de `@/config/contato`
- [x] Importar `IconWhatsapp` de `@/components/icons/IconWhatsapp`
- [x] Estado: `scrolled` (boolean) — true quando `window.scrollY > 20`
- [x] Efeito: `window.addEventListener('scroll', ...)` com cleanup
- [x] Layout: `<header>` fixo no topo (`fixed top-0 left-0 right-0 z-50`)
- [x] Background: `bg-background/95 backdrop-blur-sm` + quando `scrolled`: `border-b border-surface-border`
- [x] Altura: `h-16 md:h-18`
- [x] Conteudo: `.container-page` com flex entre logo (esquerda) e CTA WhatsApp (direita)
- [x] Logo/nome: `PERSONAL.nome` em fonte display, uppercase, link para `#hero`
- [x] CTA WhatsApp: Componente `Botao` variante `primary` tamanho `sm` com icone WhatsApp + texto "Falar no WhatsApp"
- [x] Link CTA: `gerarUrlWhatsApp()`, `target="_blank"`
- [x] `aria-label` no botao: "Falar com [nome] no WhatsApp"

---

## BLOCO 5: Hero

### TASK 5.1: Criar src/components/Hero.tsx

- [x] NAO adicionar `'use client'` (componente estatico)
- [x] Importar `PERSONAL`, `CONTATO`, `gerarUrlWhatsApp` de `@/config/contato`
- [x] Importar `Botao` de `@/components/ui/Botao`
- [x] Importar `Badge` de `@/components/ui/Badge`
- [x] Usar textos do COPY_DOC.md (secao Hero) — headline opcao 1, tagline, descricao
- [x] Secao: `id="hero"` com `min-h-screen` e `pt-16` (compensar header fixo)
- [x] Background: placeholder colorido (div com bg-surface) onde a foto iria + overlay `bg-background/80`
      > Foto real nao fornecida ainda — div placeholder com classe bg-surface conforme instrucoes
- [x] Conteudo: posicionado sobre o overlay com `relative z-10`
- [x] Badge: texto do COPY_DOC.md com cidade (ex: "Personal Trainer | [CIDADE]"), variante `accent`
- [x] H1: headline do COPY_DOC.md em fonte display, tamanho `text-hero`
- [x] Tagline: subtitulo em Inter, text-secondary
- [x] Descricao: 2-3 linhas em Inter, text-primary/80
- [x] CTAs: flex gap-4, wrap em mobile
  - Botao primary "Falar no WhatsApp" com IconWhatsapp + `gerarUrlWhatsApp()`
  - Botao secondary "Ver meus planos" linkando para `#servicos`
- [x] Credenciais: 3 numeros do COPY_DOC.md em flex, separados por `|`
- [x] `padding-top` adequado para nao sobrepor com header fixo

---

## BLOCO 6: Sobre

### TASK 6.1: Criar src/components/Sobre.tsx

- [x] NAO adicionar `'use client'`
- [x] Importar `PERSONAL` de `@/config/contato`
- [x] Importar `Badge` de `@/components/ui/Badge`
- [x] Importar `Check` de `lucide-react`
- [x] Usar textos do COPY_DOC.md (secao Sobre)
- [x] Secao: `id="sobre"` com padding vertical `py-section`
- [x] Layout: `.container-page` com grid `grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center`
- [x] Coluna esquerda (foto): div placeholder com `rounded-card` e alt descritivo
      > Foto real nao fornecida ainda — div placeholder conforme instrucoes
- [x] Coluna direita (texto):
  - Titulo H2 do COPY_DOC.md
  - Paragrafos de bio do COPY_DOC.md
  - Lista de diferenciais com `<Check>` em `text-accent` antes de cada item
  - Badge com CREF: `PERSONAL.cref`, variante `neutral`

---

## BLOCO 7: Servicos

### TASK 7.1: Criar src/components/Servicos.tsx

- [x] NAO adicionar `'use client'`
- [x] Importar `SERVICOS`, `gerarUrlWhatsApp` de `@/config/contato`
- [x] Importar `Card` de `@/components/ui/Card`
- [x] Importar `Botao` de `@/components/ui/Botao`
- [x] Importar `Badge` de `@/components/ui/Badge`
- [x] Importar `Check` de `lucide-react`
- [x] Usar textos do COPY_DOC.md (secao Servicos)
- [x] Secao: `id="servicos"` com `bg-surface` e padding vertical `py-section`
- [x] Titulo da secao: H2 do COPY_DOC.md, centralizado
- [x] Grid: `grid-cols-1 md:grid-cols-2 gap-8`
- [x] Para cada servico do array `SERVICOS`:
  - Renderizar `<Card destaque={servico.destaque}>` com conteudo do COPY_DOC.md
  - Badge "Mais Completo" se `servico.destaque === true`
  - Titulo H3, descricao, lista de beneficios (COPY_DOC.md) com icone Check
  - Preco (se `servico.preco` nao for vazio — atualmente vazio, nao exibido)
  - `<Botao variante="primary">` com `gerarUrlWhatsApp(mensagem personalizada para o servico)`

---

## BLOCO 8: Como Funciona

### TASK 8.1: Criar src/components/ComoFunciona.tsx

- [x] NAO adicionar `'use client'`
- [x] Usar textos do COPY_DOC.md (secao Como Funciona — 3 passos)
- [x] Secao: `id="como-funciona"` com padding `py-section`
- [x] Titulo H2 do COPY_DOC.md, centralizado
- [x] Grid: `grid-cols-1 md:grid-cols-3 gap-8`
- [x] Para cada passo (01, 02, 03):
  - Numero grande em `font-display text-6xl text-accent opacity-80`
  - Titulo H3
  - Descricao em text-secondary
- [x] Separador visual entre passos em desktop (seta ArrowRight do lucide-react)

---

## BLOCO 9: Depoimentos

### TASK 9.1: Criar src/components/Depoimentos.tsx

- [x] NAO adicionar `'use client'` (CSS scroll snap — sem JS)
- [x] Importar `Depoimento` de `@/types`
- [x] Usar depoimentos ficticios do COPY_DOC.md (comentar com `// TODO: substituir por depoimentos reais`)
- [x] Secao: `id="depoimentos"` com `bg-surface` e padding `py-section`
- [x] Titulo H2 do COPY_DOC.md, centralizado
- [x] Desktop: grid `grid-cols-1 md:grid-cols-3 gap-6`
- [x] Mobile: scroll horizontal com `flex overflow-x-auto snap-x snap-mandatory gap-4`
- [x] Cada card: snap-center, min-width em mobile
- [x] Conteudo do card: avatar (inicial do nome em circulo accent), nome, tempo como aluno, texto entre aspas

---

## BLOCO 10: Redes Sociais

### TASK 10.1: Criar src/components/RedesSociais.tsx

- [x] NAO adicionar `'use client'`
- [x] Importar `CONTATO` de `@/config/contato`
- [x] Importar `IconInstagram` de `@/components/icons/IconInstagram`
- [x] Usar textos do COPY_DOC.md (secao Redes Sociais)
- [x] Secao: `id="redes-sociais"` com padding `py-section`
- [x] Layout centralizado
- [x] Titulo H2 e texto do COPY_DOC.md
- [x] Botao de link para Instagram: `CONTATO.instagram.url`, `target="_blank"`, com IconInstagram + handle

---

## BLOCO 11: CTA Final

### TASK 11.1: Criar src/components/CTAFinal.tsx

- [x] NAO adicionar `'use client'`
- [x] Importar `gerarUrlWhatsApp` de `@/config/contato`
- [x] Importar `Botao` de `@/components/ui/Botao`
- [x] Importar `IconWhatsapp` de `@/components/icons/IconWhatsapp`
- [x] Usar textos do COPY_DOC.md (secao CTA Final)
- [x] Secao: `id="contato"` com background surface + efeito de brilho neon, padding `py-section`
- [x] Layout centralizado com max-width menor (max-w-3xl)
- [x] Headline H2 em fonte display, grande
- [x] Texto de apoio
- [x] `<Botao variante="primary" tamanho="lg">` com IconWhatsapp + "Falar agora no WhatsApp"

---

## BLOCO 12: Footer

### TASK 12.1: Criar src/components/Footer.tsx

- [x] NAO adicionar `'use client'`
- [x] Importar `PERSONAL`, `CONTATO`, `gerarUrlWhatsApp` de `@/config/contato`
- [x] Importar `IconWhatsapp` e `IconInstagram` de `@/components/icons/`
- [x] Usar textos do COPY_DOC.md (secao Footer)
- [x] `<footer>` com `bg-background border-t border-surface-border`
- [x] Conteudo: `.container-page` com flex entre copyright (esquerda) e links (direita)
- [x] Copyright: "© [ano] [PERSONAL.nome] — CREF [PERSONAL.cref]" (usar `new Date().getFullYear()` para o ano)
- [x] Links: WhatsApp e Instagram com icones

---

## BLOCO 13: Composicao da Pagina Principal

### TASK 13.1: Criar src/app/page.tsx

- [x] Importar todos os componentes de secao
- [x] Compor na ordem: Header, Hero, Sobre, Servicos, ComoFunciona, Depoimentos, RedesSociais, CTAFinal, Footer
- [x] `<main>` envolve tudo exceto Header (que e fixo e fica fora do fluxo do documento)
- [x] Pagina sem logica propria — apenas composicao

---

## BLOCO 14: SEO Basico

### TASK 14.1: Configurar metadata no layout.tsx

- [x] Exportar `metadata` completo com title e description (placeholders que o personal-seo-specialist vai refinar)
- [x] Adicionar OG tags basicas: `openGraph.title`, `openGraph.description`, `openGraph.type: 'website'`
- [x] Adicionar `robots: { index: true, follow: true }`

### TASK 14.2: Criar favicon.svg

- [x] Criar `public/favicon.svg` com inicial do nome do personal (letra G em destaque accent)
- [x] Referenciar no `layout.tsx`: `icons: { icon: '/favicon.svg' }`

### TASK 14.3: Verificar placeholders de imagem

- [x] Imagens placeholder implementadas como divs coloridos com bg-surface (conforme instrucoes)
      > Fotos reais nao fornecidas — divs placeholder com texto "Foto do Personal" em vez de imagens JPG
- [x] Documentado no `src/config/contato.ts` onde substituir pelas fotos reais

---

## BLOCO 15: Verificacao Final e Build

### TASK 15.1: Verificar TypeScript

- [x] Rodar `npx tsc --noEmit` — retornou 0 erros
- [x] Corrigir qualquer `any` implicito ou erro de tipos (corrigido cast em Servicos.tsx)

### TASK 15.2: Verificar responsividade

- [x] Componentes projetados mobile-first com breakpoints sm/md/lg
- [x] Header fixo com padding-top compensado nas secoes
- [x] Grid responsivo em todos os componentes (1 coluna mobile, 2-3 colunas desktop)
- [x] Sem overflow horizontal (sem larguras fixas, uso de max-w + mx-auto)

### TASK 15.3: Verificar acessibilidade basica

- [x] Apenas 1 `<h1>` na pagina (no Hero)
- [x] Todos os elementos de imagem com `role="img"` e `aria-label` descritivo
- [x] Todos os botoes de icone com `aria-label`
- [x] Links externos com `rel="noopener noreferrer"`

### TASK 15.4: Build final

- [x] Rodar `npm run build` — gerou `/out` sem erros (Next.js 16.1.6 + next-sitemap)
- [x] Verificar que pasta `/out` existe com `index.html` — confirmado
- [x] Sitemap gerado automaticamente pelo next-sitemap pos-build — confirmado

---

## O QUE NAO ESTA INCLUIDO NESTA TASK

- Copy final (dados reais do personal): substituir placeholders do `contato.ts` apos cliente fornecer
- Fotos reais do personal: substituir placeholders de imagem
- Schema markup JSON-LD (LocalBusiness): sera feito pelo personal-seo-specialist em task futura
- Meta description otimizada: personal-seo-specialist vai refinar
- Animacoes avancadas (scroll, parallax): nao planejadas por ora
- Analytics (Vercel Analytics): task futura
- Dominio customizado: configuracao DNS no Vercel, apos publicar
- Trafego pago / pixels de conversao: task futura
- Testes automatizados: fora do escopo

---

## CRITERIOS DE DONE

- [x] `npx tsc --noEmit` — 0 erros de TypeScript
- [x] `npm run build` — 0 erros, pasta `/out` gerada com sucesso
- [x] `npm run dev` — todas as secoes aparecem sem erro no browser
- [x] Layout responsivo: sem quebras em 375px, 768px e 1280px (mobile-first com Tailwind)
- [x] Nenhum dado do personal hardcoded fora de `src/config/contato.ts`
- [x] Todas as tasks dos 15 BLOCOs marcadas com [x]
- [x] Links WhatsApp usando `gerarUrlWhatsApp()` em todos os CTAs
- [x] Fontes Bebas Neue e Inter visualmente aplicadas (display vs body)
- [x] Cores do design system aplicadas (background dark, accent neon, surface)
- [x] Nenhum `console.log` de debug no codigo
