# SPEC TECNICA: Setup Completo e Estrutura da Landing Page

## Contexto

Esta task estabelece a fundacao tecnica completa do projeto. Ela cobre a inicializacao do repositorio
Next.js, a configuracao de todas as ferramentas (TypeScript, Tailwind CSS, next.config.ts), a criacao
de toda a estrutura de diretorios, o arquivo central de configuracao do personal (`contato.ts`) e o
esqueleto de todos os componentes da landing page.

O objetivo de negocio e ter uma landing page de conversao para personal trainer local, onde o
visitante e conduzido a entrar em contato via WhatsApp. Nao ha checkout, formulario complexo ou
autenticacao — apenas uma pagina de apresentacao e vendas com multiplas secoes e CTAs.

Esta task e o prerequisito absoluto para todas as outras: sem a estrutura criada aqui, nenhum outro
agent pode trabalhar.

---

## Decisoes Arquiteturais

| Decisao | Escolha | Justificativa |
|---|---|---|
| Framework | Next.js 15.x | SSG (output: 'export') gera HTML estatico puro. Zero custo de servidor. Otimo SEO. |
| UI Library | React 19.x | Tecnologia ja conhecida pelo desenvolvedor. Maior ecossistema. |
| Linguagem | TypeScript 5.x | Type safety em componentes, props e config. Erros em tempo de compilacao. |
| Estilizacao | Tailwind CSS 3.x | Utility-first. Design tokens unificados. CSS final minificado (apenas classes usadas). |
| Hospedagem | Vercel | Gratuito, deploy automatico via GitHub push, HTTPS automatico, CDN global. |
| Modo de build | `output: 'export'` | Gera site 100% estatico (HTML/CSS/JS). Sem servidor Node em producao. |
| Imagens | `unoptimized: true` | Obrigatorio para static export — o otimizador de imagens do Next.js requer servidor. |
| Fontes | `next/font/google` | Carregamento otimizado, sem layout shift (FOUT), auto-hosted pelo Next.js. |
| Iconografia | `lucide-react` | Tree-shakeable, tipado, consistente com o estilo dark premium. |
| Sitemap | `next-sitemap` | Gera sitemap.xml e robots.txt automaticamente no pos-build. |
| Roteamento | App Router (unica pagina) | Padrao moderno do Next.js 15. Apenas `app/page.tsx` — sem sub-rotas. |
| Server vs Client Components | Server por padrao | 'use client' apenas quando necessario (interatividade/hooks). Melhor performance. |

**Alternativas descartadas:**
- Astro: performatico, mas desenvolvedor nao conhece a tecnologia.
- WordPress: custo de hospedagem, performance inferior, manutencao pesada.
- HTML puro: sem sistema de componentes — manutencao futura seria trabalhosa.
- Netlify: alternativa valida ao Vercel sem mudanca de codigo (fallback documentado).

---

## Design Tecnico

### 1. Estrutura Completa de Diretorios e Arquivos

```
landing-page-vendas-suplementos/
  src/
    app/
      layout.tsx           <- Layout base: <html>, <body>, meta globais, carregamento de fontes
      page.tsx             <- Pagina principal: importa e ordena todas as secoes
    components/
      Header.tsx           <- Barra de navegacao fixa com logo e link WhatsApp
      Hero.tsx             <- Secao de abertura: headline + subheadline + CTA principal
      Sobre.tsx            <- Apresentacao do personal: foto + bio + credenciais (CREF)
      Servicos.tsx         <- Cards dos servicos: Plano de Treino e Personal Trainer
      ComoFunciona.tsx     <- Processo em 3 passos: Contato > Avaliacao > Treino
      Depoimentos.tsx      <- Carrossel/grid de depoimentos de alunos
      RedesSociais.tsx     <- Links para Instagram e outras redes sociais
      CTAFinal.tsx         <- Bloco final de conversao antes do footer
      Footer.tsx           <- Copyright, CREF, links de contato
      ui/
        Botao.tsx          <- Componente atomico de botao (variantes: primary, secondary, ghost)
        Card.tsx           <- Componente atomico de card (surface com bordas e padding)
        Badge.tsx          <- Componente atomico de badge/tag (ex: "CREF 12345")
    config/
      contato.ts           <- Arquivo central de dados do personal (ver secao abaixo)
    types/
      index.ts             <- Tipos TypeScript compartilhados (Servico, Depoimento, etc.)
    styles/
      globals.css          <- Reset CSS, variaveis CSS, importacao do Tailwind
  public/
    images/
      personal-hero.jpg    <- Foto principal do personal (placeholder — cliente fornece)
      personal-perfil.jpg  <- Foto de perfil do personal (placeholder — cliente fornece)
    favicon.svg            <- Icone do site
    robots.txt             <- Gerado pelo next-sitemap no pos-build
    sitemap.xml            <- Gerado pelo next-sitemap no pos-build
  next.config.ts           <- Configuracao Next.js (output export, images unoptimized)
  tailwind.config.ts       <- Design tokens (cores, fontes, breakpoints)
  tsconfig.json            <- Configuracao TypeScript (path aliases: @/components, @/config, etc.)
  postcss.config.mjs       <- Configuracao PostCSS (requerido pelo Tailwind)
  package.json             <- Dependencias e scripts
  next-sitemap.config.js   <- Configuracao do next-sitemap
```

---

### 2. Arquivo de Configuracao Central: `src/config/contato.ts`

Este e o unico arquivo que o cliente (ou seu irmao) vai editar para atualizar dados pessoais.
Todos os componentes importam daqui — nenhum dado do personal deve estar hardcoded em componentes.

```typescript
// src/config/contato.ts

export const PERSONAL = {
  nome: '[NOME_PERSONAL]',           // ex: "Rafael Costa"
  nomeDisplay: '[NOME_DISPLAY]',     // ex: "Rafael" (para "Ola, eu sou o Rafael")
  cref: '[CREF]',                    // ex: "012345-G/SP"
  cidade: '[CIDADE]',                // ex: "Sao Paulo"
  estado: '[ESTADO_SIGLA]',          // ex: "SP"
  anosExperiencia: '[ANOS_EXP]',     // ex: "8"
  totalAlunos: '[TOTAL_ALUNOS]',     // ex: "200+"
  bio: '[BIO_PESSOAL]',              // Paragrafo curto — definido pelo content-writer
} as const;

export const CONTATO = {
  whatsapp: {
    numero: '[WHATSAPP_NUMERO]',     // ex: "5511999999999" (DDI+DDD+numero, sem simbolos)
    mensagemPadrao: '[MSG_WHATSAPP]', // ex: "Ola! Vi seu site e quero saber mais sobre..."
  },
  instagram: {
    handle: '[INSTAGRAM_HANDLE]',    // ex: "rafaelcostafit" (sem @)
    url: 'https://instagram.com/[INSTAGRAM_HANDLE]',
  },
  email: '[EMAIL_OPCIONAL]',         // Opcional — pode ser deixado vazio ('')
} as const;

export const SERVICOS = [
  {
    id: 'plano-treino',
    titulo: 'Plano de Treino',
    descricao: '[DESCRICAO_PLANO]',   // Definido pelo content-writer
    duracao: '~2 meses',
    renovavel: true,
    acompanhamento: false,
    preco: '[PRECO_PLANO]',           // ex: "R$ 150" ou '' para nao exibir
    cta: 'Quero meu plano',
  },
  {
    id: 'personal-trainer',
    titulo: 'Personal Trainer',
    descricao: '[DESCRICAO_PERSONAL]', // Definido pelo content-writer
    duracao: 'Mensal',
    renovavel: true,
    acompanhamento: true,
    preco: '[PRECO_PERSONAL]',         // ex: "R$ 800/mes" ou '' para nao exibir
    cta: 'Quero treinar com voce',
    destaque: true,                    // Exibe badge "Mais popular"
  },
] as const;

// Helper: gera URL do WhatsApp com mensagem pre-preenchida
export function gerarUrlWhatsApp(mensagem?: string): string {
  const msg = mensagem ?? CONTATO.whatsapp.mensagemPadrao;
  return `https://wa.me/${CONTATO.whatsapp.numero}?text=${encodeURIComponent(msg)}`;
}
```

---

### 3. Tipos TypeScript: `src/types/index.ts`

```typescript
export interface Depoimento {
  id: string;
  nomeAluno: string;
  texto: string;
  resultado?: string;    // ex: "Perdeu 12kg em 3 meses"
  avatarUrl?: string;    // Foto do aluno (opcional)
}

export interface Servico {
  id: string;
  titulo: string;
  descricao: string;
  duracao: string;
  renovavel: boolean;
  acompanhamento: boolean;
  preco: string;
  cta: string;
  destaque?: boolean;
}

export type VarianteBotao = 'primary' | 'secondary' | 'ghost';
export type TamanhoBotao = 'sm' | 'md' | 'lg';
```

---

### 4. Configuracao: `next.config.ts`

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',          // Gera site 100% estatico em /out
  images: {
    unoptimized: true,       // Obrigatorio para output: 'export'
  },
  trailingSlash: true,       // Compatibilidade com hospedagens estaticas
};

export default nextConfig;
```

---

### 5. Configuracao: `tailwind.config.ts`

Design tokens definidos pelo personal-ui-ux-designer. O config abaixo codifica esses tokens
para uso em classes Tailwind (ex: `bg-background`, `text-accent`, `font-display`).

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta principal (dark premium + neon)
        background: '#0F1923',   // Fundo principal
        surface:    '#1A2535',   // Cards e superficies elevadas
        accent:     '#E8FF00',   // Amarelo neon — CTAs, destaques, hover states
        'text-primary':   '#FFFFFF',   // Texto principal
        'text-secondary': '#8892A4',   // Texto secundario, subtitulos
        // Utilitarios
        'accent-hover':   '#D4EB00',   // Accent mais escuro para hover
        'surface-border': '#2A3548',   // Bordas de cards
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'], // Bebas Neue — headlines
        sans:    ['var(--font-sans)', 'sans-serif'],    // Inter — corpo de texto
      },
      fontSize: {
        // Escala tipografica da landing
        'hero':    ['clamp(2.5rem, 8vw, 5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'section': ['clamp(1.75rem, 4vw, 2.5rem)', { lineHeight: '1.15' }],
      },
      spacing: {
        'section': '5rem',       // Padding vertical padrao entre secoes (80px)
        'section-sm': '3rem',    // Versao mobile (48px)
      },
      maxWidth: {
        'container': '1200px',   // Largura maxima do conteudo
      },
      borderRadius: {
        'card': '1rem',          // Border radius padrao dos cards
      },
      boxShadow: {
        'accent-glow': '0 0 30px rgba(232, 255, 0, 0.15)', // Brilho neon sutil
      },
    },
  },
  plugins: [],
};

export default config;
```

---

### 6. Configuracao: `src/styles/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-background text-text-primary font-sans;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Scrollbar customizada para dark theme */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #0F1923; }
  ::-webkit-scrollbar-thumb { background: #2A3548; border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: #E8FF00; }
}

@layer utilities {
  .container-page {
    @apply max-w-container mx-auto px-4 sm:px-6 lg:px-8;
  }
}
```

---

### 7. Layout Base: `src/app/layout.tsx`

Responsabilidades:
- Carregamento das fontes via `next/font/google` (Bebas Neue + Inter)
- Injecao das variaveis CSS `--font-display` e `--font-sans` no `<html>`
- Meta tags globais (viewport, charset)
- Metadados basicos via `export const metadata` do Next.js

```typescript
// Estrutura esperada (nao e codigo final — frontend-dev implementa)
import { Bebas_Neue, Inter } from 'next/font/google';
import './globals.css';

const fontDisplay = Bebas_Neue({ ... variable: '--font-display' });
const fontSans    = Inter({ ... variable: '--font-sans' });

export const metadata = {
  title: '[NOME_PERSONAL] — Personal Trainer em [CIDADE]',
  description: '[META_DESCRIPTION]',  // Definido pelo personal-seo-specialist
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${fontDisplay.variable} ${fontSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

---

### 8. Pagina Principal: `src/app/page.tsx`

Responsabilidades:
- Importar e ordenar todos os componentes de secao
- Nao contem logica propria — apenas composicao

```typescript
// Ordem das secoes (nao e codigo final — frontend-dev implementa)
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Sobre from '@/components/Sobre';
import Servicos from '@/components/Servicos';
import ComoFunciona from '@/components/ComoFunciona';
import Depoimentos from '@/components/Depoimentos';
import RedesSociais from '@/components/RedesSociais';
import CTAFinal from '@/components/CTAFinal';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Sobre />
      <Servicos />
      <ComoFunciona />
      <Depoimentos />
      <RedesSociais />
      <CTAFinal />
      <Footer />
    </main>
  );
}
```

---

### 9. Secoes da Landing Page — Responsabilidades e Props

| Componente | Dados necessarios | Responsabilidade | Client? |
|---|---|---|---|
| `Header` | `PERSONAL.nome`, `CONTATO.whatsapp` | Logo/nome, nav anchors, botao WhatsApp fixo | Sim (scroll state) |
| `Hero` | `PERSONAL.nome`, `PERSONAL.cidade`, `CONTATO.whatsapp` | H1 principal, subheadline, CTA primario, imagem de fundo | Nao |
| `Sobre` | `PERSONAL.*`, imagem perfil | Foto + bio + credenciais (CREF, anos exp, total alunos) | Nao |
| `Servicos` | `SERVICOS[]` | 2 cards de servicos com preco e CTA WhatsApp | Nao |
| `ComoFunciona` | Texto estatico | 3 passos numerados: Contato > Avaliacao > Treino | Nao |
| `Depoimentos` | `Depoimento[]` | Grid ou carrossel de depoimentos de alunos | Opcional |
| `RedesSociais` | `CONTATO.instagram` | CTA para seguir no Instagram, embed ou link | Nao |
| `CTAFinal` | `CONTATO.whatsapp` | Bloco de urgencia/escassez + botao WhatsApp grande | Nao |
| `Footer` | `PERSONAL.cref`, `PERSONAL.nome` | Copyright, CREF, link WhatsApp e Instagram | Nao |

---

### 10. Componentes Atomicos: `src/components/ui/`

**`Botao.tsx`**
```typescript
interface BotaoProps {
  variante: 'primary' | 'secondary' | 'ghost';
  tamanho?: 'sm' | 'md' | 'lg';
  href?: string;            // Se fornecido, renderiza <a>; senao, <button>
  target?: '_blank' | '_self';
  children: React.ReactNode;
  className?: string;
}
```
- `primary`: fundo accent (#E8FF00), texto background (#0F1923), bold
- `secondary`: borda accent, texto accent, fundo transparente
- `ghost`: texto branco, sem borda, underline no hover

**`Card.tsx`**
```typescript
interface CardProps {
  destaque?: boolean;       // Se true, aplica borda accent e brilho neon
  children: React.ReactNode;
  className?: string;
}
```
- Fundo surface (#1A2535), border-radius card (1rem)
- `destaque=true`: borda accent, box-shadow accent-glow

**`Badge.tsx`**
```typescript
interface BadgeProps {
  children: React.ReactNode;
  variante?: 'accent' | 'neutral';
}
```
- Pequeno label arredondado (ex: "CREF 012345", "Mais Popular", "Presencial")

---

### 11. Configuracao TSConfig Path Aliases

No `tsconfig.json`, adicionar paths para imports limpos:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

Isso permite `import { PERSONAL } from '@/config/contato'` em vez de paths relativos frageis.

---

### 12. next-sitemap: `next-sitemap.config.js`

```javascript
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://[DOMINIO_DO_SITE]',
  generateRobotsTxt: true,
  singleFile: true,
};
```

Script no `package.json`:
```json
"postbuild": "next-sitemap"
```

---

## Dependencias

### Packages a instalar

```bash
# Core
npm install next@15 react@19 react-dom@19

# TypeScript e tipos
npm install --save-dev typescript @types/node @types/react @types/react-dom

# Estilizacao
npm install tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p  # Gera tailwind.config e postcss.config

# Iconografia
npm install lucide-react

# Sitemap
npm install --save-dev next-sitemap
```

### Versoes fixas (conforme MEMORY.md)

| Package | Versao |
|---|---|
| next | 15.x |
| react | 19.x |
| react-dom | 19.x |
| tailwindcss | 3.x |
| lucide-react | latest |
| next-sitemap | latest |

### Pre-requisitos de ambiente

- Node.js >= 18.17 (requisito minimo do Next.js 15)
- npm >= 9 ou pnpm >= 8
- Conta GitHub (para deploy automatico no Vercel)
- Conta Vercel (gratuita) conectada ao repositorio GitHub

---

## Consideracoes de Performance e SEO Tecnico

### Core Web Vitals — Metas

| Metrica | Meta | Como atingir |
|---|---|---|
| LCP | < 2.5s | Imagem hero com `priority` prop, fonte preloaded, HTML estatico |
| CLS | < 0.1 | Atributos `width`/`height` obrigatorios em todas as imagens |
| FID/INP | < 100ms | Minimo de JavaScript, Server Components por padrao |
| TTFB | < 0.8s | CDN Vercel, assets estaticos, sem requisicao de servidor |

### Imagens

- Todas as imagens em `public/images/` com dimensoes definidas
- Usar `<Image>` do Next.js para lazy loading automatico
- Com `unoptimized: true`, o desenvolvedor deve fornecer imagens ja otimizadas (WebP/AVIF)
- Imagem hero: usar `priority={true}` para nao bloquear LCP
- Alt text descritivo obrigatorio em todas as imagens

### SEO Tecnico — Fundacao

- Um unico `<h1>` em toda a pagina (no componente Hero)
- Hierarquia de headings logica: h1 > h2 (titulos de secao) > h3 (sub-itens)
- Meta title: "[NOME_PERSONAL] — Personal Trainer em [CIDADE] | [SERVICO_PRINCIPAL]"
- Meta description: definida pelo personal-seo-specialist (150-160 caracteres)
- `lang="pt-BR"` no elemento `<html>`
- Schema markup LocalBusiness: responsabilidade do personal-seo-specialist (task futura)
- Sitemap gerado automaticamente pelo next-sitemap no pos-build
- robots.txt gerado automaticamente

### Responsividade (Mobile-First)

- Todos os componentes projetados primeiro para mobile (320px+)
- Breakpoints Tailwind usados: `sm:` (640px), `md:` (768px), `lg:` (1024px)
- Header mobile: menu simplificado ou hamburguer com estado minimo em JS
- Fontes com `clamp()` para escala fluida (evitar font-size fixo em px)
- Touch targets minimos: 44x44px para botoes e links (WCAG 2.5.5)

### Acessibilidade

- Contraste minimo WCAG AA: 4.5:1 para texto normal, 3:1 para texto grande
  - Accent (#E8FF00) sobre Background (#0F1923): ratio ~15:1 (passa AAA)
  - Texto primario (#FFFFFF) sobre Background (#0F1923): ratio ~18:1 (passa AAA)
  - Texto secundario (#8892A4) sobre Background (#0F1923): verificar (pode nao passar AA)
- Botoes com `aria-label` quando o texto sozinho nao for descritivo
- Links externos com `rel="noopener noreferrer"` e indicacao visual/textual
- Skip link `<a href="#main-content">` para usuarios de teclado

---

## Dependencias desta Task

Esta e a task zero do projeto. Ela nao depende de nenhuma outra task anterior.

Porem, para que o frontend-dev possa preencher o `contato.ts` com valores reais e criar
copy nao-placeholder nos componentes, as seguintes informacoes do cliente sao necessarias
(identificadas no MEMORY.md como pendentes):

- Nome do personal
- Cidade de atuacao
- Numero do WhatsApp
- Handle do Instagram
- CREF

O frontend-dev PODE e DEVE criar a estrutura completa com placeholders e comentarios `// TODO: substituir`.

---

## Fora do Escopo desta Task

Os seguintes itens NAO fazem parte da task 01 e serao abordados em tasks futuras:

- **Conteudo final dos textos:** copy, headlines, CTAs — responsabilidade do personal-content-writer
- **Design detalhado de cada secao:** layout especifico, animacoes, espacamentos finos — responsabilidade do personal-ui-ux-designer
- **Schema markup LocalBusiness:** JSON-LD para SEO local — responsabilidade do personal-seo-specialist
- **Meta description otimizada:** texto final para SEO — responsabilidade do personal-seo-specialist
- **Depoimentos reais de alunos:** dados reais precisam ser fornecidos pelo cliente
- **Fotos reais do personal:** arquivos de imagem precisam ser fornecidos pelo cliente
- **Precos dos servicos:** decisao do cliente
- **Animacoes e transicoes avancadas:** scroll animations, parallax, etc.
- **Analytics:** Vercel Analytics ou similar
- **Dominio customizado:** configuracao do DNS e dominio no Vercel
- **Trafego pago:** integracao com pixels de conversao (Meta Pixel, Google Tag)
- **Testes automatizados:** unit tests, e2e tests

---

## Checklist de Entrega (para o personal-frontend-dev)

Ao concluir esta task, os seguintes itens devem estar funcionando:

- [ ] `npm run dev` sobe o servidor de desenvolvimento sem erros
- [ ] `npm run build` gera a pasta `/out` sem erros (static export)
- [ ] Todas as secoes aparecem na pagina, mesmo com conteudo placeholder
- [ ] Nenhum dado do personal esta hardcoded fora de `src/config/contato.ts`
- [ ] TypeScript sem erros (`tsc --noEmit` passa)
- [ ] Tailwind classes funcionando (cores, fontes do design system aplicadas)
- [ ] Fontes Bebas Neue e Inter carregadas via next/font (sem FOUT)
- [ ] Layout responsivo basico: mobile (320px) e desktop (1200px) sem quebras visuais
- [ ] Todos os links de WhatsApp usam `gerarUrlWhatsApp()` de `contato.ts`
- [ ] Imagens com `alt`, `width` e `height` definidos
- [ ] `console.log` de desenvolvimento removidos
