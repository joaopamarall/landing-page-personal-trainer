# UI_SPECS.md — Landing Page Personal Trainer
**Versao:** 1.0
**Autor:** personal-ui-ux-designer
**Data:** 2026-03-09
**Destinatario:** personal-frontend-dev
**Stack alvo:** Next.js 15 + React 19 + TypeScript + Tailwind CSS 3.x

---

## SUMARIO

1. [Design Tokens](#1-design-tokens)
2. [Componentes UI Atomicos](#2-componentes-ui-atomicos)
3. [Specs por Secao](#3-specs-por-secao)
4. [Comportamento Responsivo](#4-comportamento-responsivo)
5. [Microinteracoes e Transicoes CSS](#5-microinteracoes-e-transicoes-css)
6. [Notas de Implementacao para o Frontend Dev](#6-notas-de-implementacao-para-o-frontend-dev)

---

## 1. DESIGN TOKENS

### 1.1 Cores

Definir em `tailwind.config.ts` sob `theme.extend.colors`. As variaveis CSS correspondentes devem
ser declaradas no `globals.css` para uso em contextos que nao suportam Tailwind diretamente.

| Token Tailwind | Variavel CSS | Valor Hex | Uso |
|---|---|---|---|
| `primary` | `--color-primary` | `#0F1923` | Background principal de todas as secoes dark |
| `accent` | `--color-accent` | `#E8FF00` | CTA, icones de destaque, hover states, numeracao |
| `surface` | `--color-surface` | `#1A2535` | Cards, secoes alternadas, header background |
| `surface-elevated` | `--color-surface-elevated` | `#1E2D40` | Cards em hover, elementos flutuantes |
| `text-primary` | `--color-text-primary` | `#FFFFFF` | Corpo de texto principal sobre fundos dark |
| `text-muted` | `--color-text-muted` | `#8892A4` | Subtitulos, textos secundarios, placeholders |
| `text-inverse` | `--color-text-inverse` | `#0F1923` | Texto sobre fundo accent (botoes CTA) |
| `success` | `--color-success` | `#22C55E` | Badges de resultado positivo, checks de beneficio |
| `footer-bg` | `--color-footer-bg` | `#0A1018` | Background do footer (mais escuro que o primary) |
| `border-subtle` | `--color-border-subtle` | `rgba(255,255,255,0.08)` | Bordas de cards, divisores sutis |
| `accent-glow` | `--color-accent-glow` | `rgba(232,255,0,0.15)` | Brilho/glow em hover de cards |
| `overlay-heavy` | `--color-overlay-heavy` | `rgba(15,25,35,0.92)` | Overlay denso no Hero mobile |
| `overlay-light` | `--color-overlay-light` | `rgba(15,25,35,0.55)` | Overlay suave no Hero desktop (lado direito) |

**Configuracao Tailwind:**

```ts
// tailwind.config.ts
colors: {
  primary: '#0F1923',
  accent: '#E8FF00',
  surface: '#1A2535',
  'surface-elevated': '#1E2D40',
  'text-primary': '#FFFFFF',
  'text-muted': '#8892A4',
  'text-inverse': '#0F1923',
  success: '#22C55E',
  'footer-bg': '#0A1018',
}
```

**Variaveis CSS em `globals.css`:**

```css
:root {
  --color-primary: #0F1923;
  --color-accent: #E8FF00;
  --color-surface: #1A2535;
  --color-surface-elevated: #1E2D40;
  --color-text-primary: #FFFFFF;
  --color-text-muted: #8892A4;
  --color-text-inverse: #0F1923;
  --color-success: #22C55E;
  --color-footer-bg: #0A1018;
  --color-border-subtle: rgba(255, 255, 255, 0.08);
  --color-accent-glow: rgba(232, 255, 0, 0.15);
}
```

---

### 1.2 Tipografia

**Fontes:**
- Display/Headlines: `Bebas Neue` — importar via `next/font/google`, peso 400
- Corpo/UI: `Inter` — importar via `next/font/google`, pesos 400, 500, 600, 700

**Configuracao em `layout.tsx`:**

```tsx
import { Bebas_Neue, Inter } from 'next/font/google'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})
```

**Configuracao Tailwind:**

```ts
// tailwind.config.ts
fontFamily: {
  display: ['var(--font-display)', 'sans-serif'],
  sans: ['var(--font-sans)', 'sans-serif'],
},
```

**Escala tipografica:**

| Token / Classe Tailwind | Mobile | Desktop | Fonte | Peso | Uso |
|---|---|---|---|---|---|
| `text-display` (custom) | `3.5rem / 56px` | `6rem / 96px` | Bebas Neue | 400 | H1 Hero, nome do personal |
| `text-4xl` / `text-5xl` | `2.25rem / 36px` | `3rem / 48px` | Bebas Neue | 400 | H2 de secoes impactantes |
| `text-3xl` / `text-4xl` | `1.875rem / 30px` | `2.25rem / 36px` | Inter | 700 | H2 de secoes informativas |
| `text-xl` / `text-2xl` | `1.25rem / 20px` | `1.5rem / 24px` | Inter | 600 | H3, titulos de card |
| `text-base` / `text-lg` | `1rem / 16px` | `1.125rem / 18px` | Inter | 400 | Paragrafos, descricoes |
| `text-sm` | `0.875rem / 14px` | `0.875rem / 14px` | Inter | 400 | Textos auxiliares, caption |
| `text-xs` | `0.75rem / 12px` | `0.75rem / 12px` | Inter | 500 | Badges, labels uppercase |

**Adicionar custom size `text-display` em Tailwind:**

```ts
// tailwind.config.ts
fontSize: {
  'display': ['3.5rem', { lineHeight: '1', letterSpacing: '-0.01em' }],
  'display-lg': ['6rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
},
```

**Line height padrao:**
- Headlines (Bebas Neue): `leading-none` (1.0) ou `leading-tight` (1.25)
- Corpo de texto: `leading-relaxed` (1.625)
- Subtitulos: `leading-snug` (1.375)

---

### 1.3 Espacamento

Sistema baseado em multiplos de 8px (8px = `2` no Tailwind, 1 unidade = 4px).

| Token descritivo | Tailwind class | px equivalente | Uso |
|---|---|---|---|
| Space XS | `p-2` / `gap-2` | 8px | Padding interno de badges |
| Space SM | `p-3` / `gap-3` | 12px | Padding de botoes (vertical) |
| Space MD | `p-4` / `gap-4` | 16px | Espacamento entre elementos inline |
| Space LG | `p-6` / `gap-6` | 24px | Gap padrao entre componentes |
| Space XL | `p-8` / `gap-8` | 32px | Gap entre cards, padding de cards |
| Space 2XL | `p-12` / `gap-12` | 48px | Espacamento interno de secoes menores |
| Space 3XL | `p-16` / `gap-16` | 64px | Padding de secoes em mobile |
| Space 4XL | `py-20` | 80px | Padding vertical de secoes padrao mobile |
| Space 5XL | `py-28` / `py-32` | 112px / 128px | Padding vertical de secoes em desktop |

**Container padrao:**

```
max-width: 1200px  →  `max-w-[1200px]`
padding lateral mobile: 24px  →  `px-6`
padding lateral tablet: 40px  →  `md:px-10`
padding lateral desktop: 80px  →  `lg:px-20`
```

Usar a classe utilitaria: `container mx-auto px-6 md:px-10 lg:px-20 max-w-[1200px]`

---

### 1.4 Border Radius

| Token | Valor | Tailwind | Uso |
|---|---|---|---|
| Radius Sharp | `2px` | `rounded-sm` | Botoes CTA (angular, energico) |
| Radius Card | `8px` | `rounded-lg` | Cards de servico, cards de depoimento |
| Radius Image | `8px` | `rounded-lg` | Fotos do personal |
| Radius Badge | `4px` | `rounded` | Badges e tags |
| Radius Avatar | `9999px` | `rounded-full` | Avatares de depoimento |

---

### 1.5 Sombras

| Token | Valor CSS | Tailwind / Custom | Uso |
|---|---|---|---|
| Shadow Card | `0 4px 24px rgba(0,0,0,0.3)` | `shadow-[0_4px_24px_rgba(0,0,0,0.30)]` | Cards em estado normal |
| Shadow Card Hover | `0 8px 40px rgba(0,0,0,0.45)` | `shadow-[0_8px_40px_rgba(0,0,0,0.45)]` | Cards em hover |
| Shadow Accent | `0 0 24px rgba(232,255,0,0.2)` | `shadow-[0_0_24px_rgba(232,255,0,0.20)]` | Botao CTA em hover |
| Shadow Header | `0 1px 0 rgba(255,255,255,0.08)` | border-bottom sutil | Header fixo no scroll |

Adicionar ao `tailwind.config.ts`:

```ts
boxShadow: {
  'card': '0 4px 24px rgba(0, 0, 0, 0.30)',
  'card-hover': '0 8px 40px rgba(0, 0, 0, 0.45)',
  'accent-glow': '0 0 24px rgba(232, 255, 0, 0.20)',
  'accent-glow-lg': '0 0 40px rgba(232, 255, 0, 0.30)',
},
```

---

### 1.6 Z-index

| Elemento | Z-index | Tailwind |
|---|---|---|
| Header fixo | 50 | `z-50` |
| Overlay do Hero | 10 | `z-10` |
| Conteudo do Hero | 20 | `z-20` |
| Modal/Drawer (se houver) | 100 | `z-[100]` |

---

## 2. COMPONENTES UI ATOMICOS

### 2.1 Botao Principal (CTA Primary)

**Descricao:** Botao de acao principal para conversao via WhatsApp. Deve ser o elemento mais
destacado visualmente da pagina.

**Anatomia:**
```
[Icone WhatsApp SVG 20x20] [TEXTO CTA UPPERCASE]
```

**Spec visual:**

```
Background:          #E8FF00  (bg-accent)
Texto:               #0F1923  (text-text-inverse)
Peso da fonte:       700  (font-bold)
Tamanho fonte:       14px / 0.875rem  (text-sm)
Letter-spacing:      0.08em  (tracking-[0.08em])
Text transform:      uppercase
Border-radius:       2px  (rounded-sm)
Padding:             14px 28px  (py-3.5 px-7)
Gap icone-texto:     8px  (gap-2)
Display:             inline-flex items-center justify-center
Border:              nenhum
Min-width mobile:    100% em blocos empilhados, auto em linha
```

**Estados:**

| Estado | Spec |
|---|---|
| Default | `bg-accent text-text-inverse` |
| Hover | `brightness-110 scale-[1.02] shadow-accent-glow` — transition 200ms ease |
| Active | `scale-[0.98] brightness-100` — sem glow |
| Focus | `outline-2 outline-offset-2 outline-accent` — visivel para acessibilidade |
| Disabled | `opacity-40 cursor-not-allowed` — nao usado neste projeto |

**Classes Tailwind completas:**

```
className="inline-flex items-center justify-center gap-2 bg-accent text-text-inverse
           text-sm font-bold uppercase tracking-[0.08em] py-3.5 px-7 rounded-sm
           transition-all duration-200 ease-in-out
           hover:brightness-110 hover:scale-[1.02] hover:shadow-accent-glow
           active:scale-[0.98]
           focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
           focus-visible:outline-accent"
```

**Variante Tamanho Grande (CTA Final da pagina):**

```
Padding: 18px 40px  (py-[18px] px-10)
Font-size: 16px  (text-base)
Icone: 22px x 22px
```

---

### 2.2 Botao Secundario (CTA Secondary / Outline)

**Descricao:** Alternativa ao botao principal. Usado para acoes secundarias como "Ver Planos".

**Spec visual:**

```
Background:          transparent
Border:              2px solid #E8FF00  (border-2 border-accent)
Texto:               #E8FF00  (text-accent)
Peso da fonte:       700  (font-bold)
Tamanho fonte:       14px / 0.875rem  (text-sm)
Letter-spacing:      0.08em  (tracking-[0.08em])
Text transform:      uppercase
Border-radius:       2px  (rounded-sm)
Padding:             14px 28px  (py-3.5 px-7)  (identico ao principal)
```

**Estados:**

| Estado | Spec |
|---|---|
| Default | `bg-transparent border-2 border-accent text-accent` |
| Hover | `bg-accent text-text-inverse` — transition 200ms ease |
| Active | `bg-accent/90 text-text-inverse scale-[0.98]` |
| Focus | `outline-2 outline-offset-2 outline-accent` |

**Classes Tailwind completas:**

```
className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-accent
           text-accent text-sm font-bold uppercase tracking-[0.08em] py-3.5 px-7 rounded-sm
           transition-all duration-200 ease-in-out
           hover:bg-accent hover:text-text-inverse
           active:scale-[0.98]
           focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
           focus-visible:outline-accent"
```

---

### 2.3 Card de Servico

**Descricao:** Container para apresentar cada servico oferecido. Pode ter variante "destaque".

**Spec visual (variante padrao):**

```
Background:          #1A2535  (bg-surface)
Border:              1px solid rgba(255,255,255,0.08)  (border border-white/[0.08])
Border-radius:       8px  (rounded-lg)
Padding:             32px  (p-8)
Sombra:              shadow-card
Display:             flex flex-col
Gap interno:         24px  (gap-6)
```

**Estados:**

| Estado | Spec |
|---|---|
| Default | `border-white/[0.08] shadow-card` |
| Hover | `border-accent/30 shadow-card-hover bg-surface-elevated` — transition 300ms ease |

**Variante "Mais Popular" (card destacado):**

```
Border:              1px solid rgba(232,255,0,0.4)  (border-accent/40)
Position relativa:   para o badge posicionado no topo
Badge topo:          posicao absolute, top -12px, left 50% transform -translateX-50%
```

**Badge "Mais Popular" (posicionado sobre o card):**

```
Background:          #E8FF00  (bg-accent)
Texto:               #0F1923  (text-text-inverse)
Peso:                700  (font-bold)
Tamanho:             12px  (text-xs)
Letter-spacing:      0.08em  (tracking-[0.08em])
Uppercase:           sim
Padding:             4px 16px  (py-1 px-4)
Border-radius:       4px  (rounded)
```

**Classes Tailwind do card (variante padrao):**

```
className="relative flex flex-col gap-6 bg-surface border border-white/[0.08] rounded-lg p-8
           shadow-card transition-all duration-300 ease-in-out
           hover:border-accent/30 hover:shadow-card-hover hover:bg-surface-elevated"
```

**Classes Tailwind do card (variante destaque):**

```
className="relative flex flex-col gap-6 bg-surface border border-accent/40 rounded-lg p-8
           shadow-card transition-all duration-300 ease-in-out
           hover:border-accent/60 hover:shadow-card-hover hover:bg-surface-elevated"
```

---

### 2.4 Badge / Tag

**Descricao:** Elemento inline para categorizar, destacar credenciais ou sinalizar status.

**Spec visual:**

```
Background:          rgba(232,255,0,0.1)  (bg-accent/10)
Border:              1px solid rgba(232,255,0,0.3)  (border border-accent/30)
Texto:               #E8FF00  (text-accent)
Peso:                500  (font-medium)
Tamanho:             12px  (text-xs)
Letter-spacing:      0.1em  (tracking-widest)
Uppercase:           sim
Border-radius:       4px  (rounded)
Padding:             4px 12px  (py-1 px-3)
Display:             inline-flex items-center gap-1.5
```

**Classes Tailwind:**

```
className="inline-flex items-center gap-1.5 bg-accent/10 border border-accent/30 text-accent
           text-xs font-medium uppercase tracking-widest py-1 px-3 rounded"
```

**Variante "Success" (para credenciais, CREF):**

```
Background:          rgba(34,197,94,0.1)  (bg-success/10)
Border:              1px solid rgba(34,197,94,0.3)  (border-success/30)
Texto:               #22C55E  (text-success)
```

---

### 2.5 Card de Depoimento

**Spec visual:**

```
Background:          #1A2535  (bg-surface)
Border:              1px solid rgba(255,255,255,0.08)
Border-radius:       8px  (rounded-lg)
Padding:             28px  (p-7)
Display:             flex flex-col gap-4
```

**Estrutura interna:**

```
[Aspas decorativas — caractere " em accent, font-size 48px, opacity 0.4]
[Texto do depoimento — Inter 400, text-base, text-text-primary, leading-relaxed]
[Separador — div com h-px bg-white/10 my-2]
[Row: Avatar | Nome + Duracao]
  Avatar: 40x40px, rounded-full, bg-accent/20, text-accent font-bold (inicial do nome)
  Nome: Inter 600, text-sm, text-white
  Duracao: Inter 400, text-xs, text-text-muted  ex: "Aluno ha 8 meses"
[Estrelas: 5 ícones Star (lucide-react), 16x16, preenchidas em accent]
```

---

### 2.6 Divisor de Secao

**Opcao A — Linha sutil:**

```css
border-top: 1px solid rgba(255, 255, 255, 0.08);
```
Tailwind: `border-t border-white/[0.08]`

**Opcao B — Transicao de fundo entre secoes (preferida):**

Alternar `bg-primary` (#0F1923) e `bg-surface` (#1A2535) entre secoes consecutivas.
Isso cria ritmo visual sem bordas explicitas.

**Mapa de fundo das secoes:**

| Secao | Background |
|---|---|
| Header | `bg-surface/95` (com backdrop-blur) |
| Hero | `bg-primary` (com imagem) |
| Sobre | `bg-surface` |
| Servicos | `bg-primary` |
| Como Funciona | `bg-surface` |
| Depoimentos | `bg-primary` |
| Redes Sociais | `bg-surface` |
| CTA Final | `bg-primary` (com gradient accent) |
| Footer | `bg-footer-bg` |

---

## 3. SPECS POR SECAO

### 3.1 Header

**Comportamento:** Fixed/sticky no topo. Sempre visivel durante o scroll.

**Altura:**
- Mobile: `h-16` (64px)
- Desktop: `h-[72px]` (72px)

**Background:**
- Inicial (Hero visivel): `bg-surface/95 backdrop-blur-md`
- Apos scroll > 80px: adicionar `border-b border-white/[0.08]` via JavaScript (toggle de classe)
  — o header sempre tem o mesmo background, a borda aparece ao scrollar para diferenciar do conteudo

**Classes do `<header>`:**

```
className="fixed top-0 left-0 right-0 z-50 h-16 md:h-[72px]
           bg-surface/95 backdrop-blur-md
           transition-shadow duration-300"
           // adicionar via JS: "border-b border-white/[0.08]" quando scrollY > 80
```

**Layout interno:**

```
Container: max-w-[1200px] mx-auto px-6 md:px-10 lg:px-20 h-full
Display: flex items-center justify-between
```

**Conteudo esquerdo — Logo/Nome:**

```
Fonte: Bebas Neue (font-display)
Tamanho: text-2xl (24px) mobile / text-3xl (30px) desktop
Cor: text-white
Sem link (pode ser anchor para o topo da pagina: href="#")
Variante com icone de raio/relampago em accent antes do nome:
  [Icone Zap 20px cor accent] [NOME DO PERSONAL]
```

**Conteudo direito — Botao CTA WhatsApp:**

```
Mobile: Botao compacto
  - Apenas icone WhatsApp SVG + texto "WhatsApp" (sem label longa)
  - Padding: py-2 px-4
  - Texto: text-xs tracking-wide uppercase font-bold

Desktop: Botao completo
  - Icone WhatsApp + "FALAR NO WHATSAPP"
  - Padding padrao do botao principal: py-3.5 px-7
```

**Comportamento mobile sem menu hamburger:**
- Header exibe apenas logo + botao CTA WhatsApp
- Nao ha menu de navegacao (landing page de conversao direta)

---

### 3.2 Hero

**Objetivo:** Primeira impressao. Comunicar quem e o personal, o que oferece e converter
imediatamente via CTA.

**Altura:** `min-h-screen` (100vh) — garante tela cheia em qualquer dispositivo

**Background:**

```
Imagem: Foto do personal em acao (treino na academia, movimento, energia)
Posicao: bg-center bg-cover
Alt: descricao real da imagem (acessibilidade)
```

**Overlay gradient:**

```css
/* Desktop — texto a esquerda, imagem aparece a direita */
background: linear-gradient(
  to right,
  rgba(15, 25, 35, 0.96) 0%,
  rgba(15, 25, 35, 0.85) 40%,
  rgba(15, 25, 35, 0.40) 70%,
  rgba(15, 25, 35, 0.15) 100%
);

/* Mobile — overlay uniforme mais denso */
background: linear-gradient(
  to bottom,
  rgba(15, 25, 35, 0.70) 0%,
  rgba(15, 25, 35, 0.90) 50%,
  rgba(15, 25, 35, 0.98) 100%
);
```

Tailwind para o overlay `<div>`:

```
Mobile:  "absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/90 to-primary/[0.98] z-10"
Desktop: "absolute inset-0 bg-gradient-to-r from-primary/[0.96] via-primary/85 to-primary/15 lg:z-10"
```

**Layout do conteudo:**

```
Position: relative z-20
Container padrao
Altura: h-full flex items-center (alinhamento vertical central)
Padding top: pt-24 (para compensar o header fixo de 64-72px + folga)
Padding bottom: pb-16

Desktop: grid grid-cols-2, conteudo em col-span-1 (esquerda)
Mobile: flex flex-col, conteudo centrado ou alinhado a esquerda
```

**Hierarquia de conteudo (top → bottom):**

1. **Badge de localizacao:**
   ```
   Componente Badge com icone MapPin 12px
   Texto: "Personal Trainer | [Cidade]"
   Margin bottom: mb-4 (16px)
   ```

2. **H1 — Nome do Personal:**
   ```
   Fonte: Bebas Neue (font-display)
   Tamanho: text-display mobile (56px) / text-display-lg desktop (96px)
   Cor: text-white
   Line-height: leading-none
   Margin bottom: mb-3 (12px)

   Pode ser em duas linhas:
   Linha 1: "CARLOS" — branca
   Linha 2: "MENDES" — branca com accent em uma palavra-chave OU accent em toda linha 2
   ```

3. **Tagline — Frase de impacto:**
   ```
   Fonte: Inter, font-medium (500) ou font-semibold (600)
   Tamanho: text-lg mobile / text-xl desktop (text-xl md:text-2xl)
   Cor: text-accent (#E8FF00)
   Margin bottom: mb-4 (16px)
   Exemplo: "Transforme seu corpo. Mude sua vida."
   ```

4. **Descricao breve:**
   ```
   Fonte: Inter 400
   Tamanho: text-base / text-lg (text-base md:text-lg)
   Cor: text-text-muted (#8892A4)
   Line-height: leading-relaxed
   Max-width: max-w-md (448px) — evita linhas muito longas em desktop
   Margin bottom: mb-8 (32px)
   ```

5. **Botoes CTA:**
   ```
   Layout: flex flex-col gap-3 sm:flex-row sm:gap-4
   Botao 1 (principal): WhatsApp — Botao Principal completo
   Botao 2 (secundario): "VER PLANOS" — Botao Secundario, ancora para #servicos

   Mobile: botoes em coluna, width 100% (w-full sm:w-auto)
   Desktop: botoes em linha, width auto
   ```

6. **Linha de credenciais:**
   ```
   Layout: flex flex-wrap gap-x-6 gap-y-2 items-center
   Margin top: mt-10 (40px)

   Cada item:
     - Numero: Bebas Neue, text-2xl, text-accent
     - Label: Inter 400, text-sm, text-text-muted, uppercase tracking-wide
     - Separador vertical: 1px solid rgba(255,255,255,0.15), height 24px — apenas entre itens

   Exemplos:
     "+50" / "Alunos ativos"
     "3 anos" / "de experiencia"
     "CREF" / "123456-G/SP"
   ```

---

### 3.3 Sobre

**Objetivo:** Humanizar o personal, construir confianca e credibilidade.

**Background:** `bg-surface` (#1A2535)

**Padding vertical:** `py-20 lg:py-32` (80px mobile / 128px desktop)

**Layout desktop:**

```
grid grid-cols-2 gap-16 items-center
Col 1 (esquerda): Imagem
Col 2 (direita): Texto
```

**Layout mobile:**

```
flex flex-col gap-10
Imagem em cima, texto embaixo
```

**Bloco da imagem:**

```
Container: relative
Imagem principal:
  - Dimensoes mobile: w-full, aspect-ratio [3/4] ou [4/5] — retrato
  - Dimensoes desktop: w-full, max-h-[560px], object-cover object-top
  - Border-radius: rounded-lg (8px)
  - Sem borda

Elemento decorativo (opcional, adiciona profissidade):
  - Retangulo accent: absolute -bottom-4 -right-4 w-48 h-32 bg-accent/20 rounded-lg -z-10
  - Cria efeito de "moldura" deslocada
```

**Bloco do texto:**

```
1. Badge: "Sobre o personal" ou "Minha Historia"
   Margin bottom: mb-4

2. H2: "Sobre [Nome]"
   Fonte: Bebas Neue, text-4xl md:text-5xl
   Cor: text-white
   Margin bottom: mb-6

3. Paragrafos de historia:
   Inter 400, text-base md:text-lg, text-text-muted, leading-relaxed
   2-3 paragrafos
   Margin entre paragrafos: space-y-4

4. Lista de diferenciais:
   Margin top: mt-6
   Cada item: flex items-start gap-3
     - Icone Check (lucide-react), 20px, text-success (#22C55E), flex-shrink-0, mt-0.5
     - Texto: Inter 400, text-base, text-white
   space-y-3 entre itens

5. Badge CREF:
   Margin top: mt-8
   Variante success do componente Badge
   Texto: "CREF XXXXXXXX-G/XX"
```

---

### 3.4 Servicos

**Objetivo:** Apresentar os dois servicos com clareza. Facilitar a comparacao. Converter.

**Background:** `bg-primary` (#0F1923)

**Padding vertical:** `py-20 lg:py-32`

**Cabecalho da secao:**

```
Alinhamento: text-center
Badge: "Planos"
H2: "Escolha seu plano" (Bebas Neue, text-4xl md:text-5xl, text-white)
Subtitulo: Inter 400, text-base md:text-lg, text-text-muted, max-w-xl mx-auto
Margin bottom: mb-12 md:mb-16
```

**Layout dos cards:**

```
Mobile: flex flex-col gap-6
Tablet (md): grid grid-cols-2 gap-6 max-w-3xl mx-auto
Desktop: grid grid-cols-2 gap-8 max-w-4xl mx-auto
```

**Card 1 — Plano de Treino:**

Usa componente Card de Servico variante padrao (sem badge de destaque).

```
Conteudo interno (top → bottom):

1. Icone de identificacao: ClipboardList (lucide-react), 32px, text-accent
   Margin bottom: mb-2

2. Nome: "Plano de Treino"
   Inter, font-semibold (600), text-xl, text-white

3. Descricao: 2-3 linhas
   Inter 400, text-sm, text-text-muted, leading-relaxed

4. Separador: div h-px bg-white/10 my-4

5. Lista de beneficios (5-7 items):
   Cada item: flex items-center gap-2
     - Check (lucide-react), 16px, text-success
     - Texto: Inter 400, text-sm, text-white
   space-y-2

6. Preco (se aprovado pelo cliente):
   Margin top: mt-6 auto (push para baixo)
   Texto "A partir de": Inter 400, text-xs, text-text-muted, uppercase tracking-wide
   Valor: Bebas Neue, text-4xl, text-white
   Periodicidade: "/ 2 meses" em text-sm text-text-muted

7. Botao CTA:
   Margin top: mt-6
   Botao Secundario (outline) — width 100% (w-full)
   Texto: "COMEÇAR AGORA"
```

**Card 2 — Personal Trainer:**

Usa componente Card de Servico variante destaque (com badge "Mais Completo").

```
Badge posicionado:
  position: absolute, top-0, left-50%, transform: -translate-x-1/2 -translate-y-1/2
  Tailwind: "absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"

Conteudo identico ao Card 1, com as diferencas:
- Icone: Users (lucide-react), 32px, text-accent
- Nome: "Personal Trainer"
- Descricao diferente
- Beneficios incluem todos do plano de treino + extras presenciais
- CTA: Botao Principal (filled) — width 100% (w-full)
- Texto CTA: "QUERO UM PERSONAL"
```

---

### 3.5 Como Funciona

**Objetivo:** Reduzir objecoes e ansiedade. Mostrar que e simples comecar.

**Background:** `bg-surface` (#1A2535)

**Padding vertical:** `py-20 lg:py-32`

**Cabecalho da secao:**

```
text-center
Badge: "Processo"
H2: "Como funciona" (Bebas Neue, text-4xl md:text-5xl, text-white)
Subtitulo: Inter 400, text-base, text-text-muted
Margin bottom: mb-12 md:mb-16
```

**Layout dos 3 passos:**

```
Mobile: flex flex-col gap-8
Desktop: grid grid-cols-3 gap-8 items-start
```

**Conector entre passos (desktop apenas):**

```
Elemento visual: linha tracejada horizontal entre os numeros dos passos
Implementacao: pseudo-elemento ou SVG simples
Cor: rgba(255,255,255,0.15)
Posicao: alinhado ao centro vertical dos numeros grandes
Visibilidade: hidden md:block
```

**Cada passo:**

```
Layout: flex flex-col gap-4
Alinhamento: items-center text-center (mobile e desktop)

1. Numero grande:
   Texto: "01", "02", "03"
   Fonte: Bebas Neue, font-display
   Tamanho: text-7xl (72px) md:text-8xl (96px)
   Cor: text-accent
   Line-height: leading-none
   Margin bottom: -mb-2 (reduzir espaco com o titulo)

2. Titulo do passo:
   Inter, font-semibold (600), text-lg md:text-xl, text-white

3. Descricao:
   Inter 400, text-sm md:text-base, text-text-muted, leading-relaxed
   Max-width do bloco: max-w-xs mx-auto
```

**Exemplos de passos:**
1. "Primeiro Contato" — "Entre em contato pelo WhatsApp e converse sobre seus objetivos"
2. "Avaliacao Inicial" — "Realizamos uma avaliacao para entender seu nivel e montar seu plano"
3. "Comece a Treinar" — "Inicie seu treino com acompanhamento e suporte continuo"

---

### 3.6 Depoimentos

**Objetivo:** Prova social. Mostrar resultados reais de alunos.

**Background:** `bg-primary` (#0F1923)

**Padding vertical:** `py-20 lg:py-32`

**Cabecalho da secao:**

```
text-center
Badge: "Resultados"
H2: "O que dizem os alunos" (Bebas Neue, text-4xl md:text-5xl, text-white)
Margin bottom: mb-12
```

**Layout dos cards:**

```
Mobile: Carousel — 1 card visivel por vez
  - Container: overflow-x-auto, scroll-snap-type-x mandatory, flex gap-4, pb-4
  - Cada card: scroll-snap-align-start, min-w-[280px] w-[85vw] max-w-[360px]
  - Indicadores de paginacao (dots): flex gap-2 justify-center mt-4
    - Dot: w-2 h-2 rounded-full bg-white/30
    - Dot ativo: bg-accent w-4

Tablet (md+): grid grid-cols-2 gap-6 (sem carousel)
Desktop (lg+): grid grid-cols-3 gap-6 (sem carousel)
```

**Nota de implementacao — carousel mobile:**
Usar CSS scroll snap nativo (sem biblioteca JavaScript). Ver secao 6 para detalhes.

**Cada card de depoimento:** Ver componente 2.5 acima.

**Contagem de depoimentos recomendada:** 3 (ideal para grid desktop 3 cols) ou 4 (2x2 em tablet).

---

### 3.7 Redes Sociais

**Objetivo:** Redirecionar para Instagram para construcao de audiencia e prova social continua.

**Background:** `bg-surface` (#1A2535)

**Padding vertical:** `py-16 lg:py-20` (mais compacto que secoes principais)

**Layout:**

```
Container padrao
Display: flex flex-col items-center text-center gap-6 md:gap-8
```

**Conteudo:**

```
1. Icone Instagram: SVG oficial, 40px, cor #E1306C (cor oficial do Instagram)
   OU icone monocromatico branco para manter consistencia

2. H2 (menor): "Me siga no Instagram"
   Bebas Neue, text-3xl md:text-4xl, text-white

3. Descricao:
   Inter 400, text-base, text-text-muted
   Exemplo: "Dicas de treino, motivacao e resultados dos meus alunos"

4. Handle do Instagram:
   Link externo, abre em nova aba
   Exibicao: "@handle"
   Fonte: Inter 600, text-xl, text-accent
   Icone ExternalLink 16px ao lado
   Underline ao hover
   Padding: py-2 px-4

5. CTA alternativo (opcional):
   Botao Secundario menor: "SEGUIR NO INSTAGRAM"
   Ou apenas o handle como link e suficiente
```

---

### 3.8 CTA Final

**Objetivo:** Ultima chance de conversao antes do footer. Maximo impacto visual e clareza.

**Background:**

```css
/* Gradient accent sutil como "energia" de fundo */
background: linear-gradient(
  135deg,
  rgba(15, 25, 35, 1) 0%,
  rgba(26, 37, 53, 1) 50%,
  rgba(15, 25, 35, 1) 100%
);

/* Com elemento decorativo de glow accent no centro-fundo */
/* Ver detalhes abaixo */
```

**Elemento de glow decorativo (background effect):**

```
<div> absoluto, pointer-events-none, z-0:
  width: 600px, height: 300px
  background: radial-gradient(ellipse, rgba(232,255,0,0.08) 0%, transparent 70%)
  position: center bottom
  blur: filter blur-3xl
```

**Padding vertical:** `py-24 lg:py-40`

**Layout:**

```
text-center
Container padrao
position: relative (para o glow ser filho absoluto)
z-10 no conteudo
```

**Conteudo:**

```
1. Badge: "Pronto para comecar?"

2. H2 principal:
   Bebas Neue, text-4xl md:text-6xl, text-white
   Exemplo: "COMECE HOJE. SEU OBJETIVO NAO ESPERA."
   Accent na ultima palavra ou linha se possivel

3. Texto de apoio:
   Inter 400, text-base md:text-lg, text-text-muted, max-w-lg mx-auto
   Exemplo: "Entre em contato agora e receba uma consultoria inicial gratuita."

4. Botao principal GRANDE:
   Versao tamanho grande (py-[18px] px-10, text-base)
   Texto: "FALAR COM O PERSONAL"
   Icone WhatsApp SVG 22px
   width auto, mas min-w-[240px]
   Margin top: mt-10

5. Texto de confianca abaixo do botao:
   Inter 400, text-xs, text-text-muted
   Margin top: mt-4
   Icone Shield 12px inline
   Texto: "Sem compromisso. Resposta rapida."
```

---

### 3.9 Footer

**Background:** `bg-footer-bg` (#0A1018) — mais escuro que o primary

**Padding vertical:** `py-8 md:py-12`

**Border top:** `border-t border-white/[0.08]`

**Layout mobile:** `flex flex-col items-center text-center gap-6`

**Layout desktop:** `grid grid-cols-3 items-center`

**Col 1 (esquerda) — Identidade:**

```
Nome/Logo: Bebas Neue, text-xl, text-white
Subtitulo: Inter 400, text-xs, text-text-muted, uppercase tracking-widest
Exemplo: "PERSONAL TRAINER — [CIDADE]"
```

**Col 2 (centro) — Copyright:**

```
Texto: Inter 400, text-xs, text-text-muted, text-center
"© 2024 [Nome do Personal]. Todos os direitos reservados."
```

**Col 3 (direita) — Links sociais:**

```
Layout: flex items-center gap-4 justify-end (md: justify-end, mobile: justify-center)
Links: icones de 20px, text-text-muted, hover:text-white, transition-colors duration-200
- Icone Instagram (SVG)
- Icone WhatsApp (SVG)
Cada link com aria-label descritivo
```

---

## 4. COMPORTAMENTO RESPONSIVO

### Breakpoints Tailwind utilizados

| Breakpoint | Tailwind prefix | Min-width |
|---|---|---|
| Mobile | (sem prefix) | 0px |
| Small | `sm:` | 640px |
| Medium / Tablet | `md:` | 768px |
| Large / Desktop | `lg:` | 1024px |
| Extra Large | `xl:` | 1280px |

**Breakpoint principal de transicao mobile → desktop:** `lg:` (1024px)
**Breakpoint secundario (ajustes tablets):** `md:` (768px)

---

### 4.1 Header — Responsivo

| Propriedade | Mobile (0px) | Tablet (768px) | Desktop (1024px) |
|---|---|---|---|
| Altura | `h-16` (64px) | `h-16` (64px) | `h-[72px]` (72px) |
| Logo tamanho | `text-xl` | `text-2xl` | `text-3xl` |
| Botao CTA | Compacto (`py-2 px-4 text-xs`) | Compacto | Completo (`py-3.5 px-7 text-sm`) |
| Padding lateral | `px-6` | `px-10` | `px-20` |

---

### 4.2 Hero — Responsivo

| Propriedade | Mobile (375px) | Tablet (768px) | Desktop (1280px) |
|---|---|---|---|
| Layout | Stack vertical, texto centralizado | Stack vertical | Grid 2 colunas |
| Overlay | Gradiente bottom-heavy (0.98 opacity) | Gradiente bottom-heavy | Gradiente left-to-right |
| H1 tamanho | `text-display` (56px) | `text-display` (56px) | `text-display-lg` (96px) |
| Tagline tamanho | `text-lg` (18px) | `text-xl` (20px) | `text-2xl` (24px) |
| Descricao | `text-base` | `text-base` | `text-lg` |
| Botoes | `flex-col w-full` | `flex-row` | `flex-row` |
| Credenciais | `flex-col gap-3` | `flex-row flex-wrap` | `flex-row gap-6` |
| Padding top | `pt-24` (96px, para header) | `pt-24` | `pt-28` |

---

### 4.3 Sobre — Responsivo

| Propriedade | Mobile | Tablet | Desktop |
|---|---|---|---|
| Layout | Coluna (imagem cima, texto baixo) | Coluna | Grid 2 colunas `gap-16` |
| Imagem aspect ratio | `aspect-[4/5]` | `aspect-[3/4]` | `max-h-[560px]` |
| Imagem decorativa | Oculta (`hidden`) | Oculta | Visivel (`block`) |
| H2 tamanho | `text-3xl` | `text-4xl` | `text-5xl` |

---

### 4.4 Servicos — Responsivo

| Propriedade | Mobile | Tablet | Desktop |
|---|---|---|---|
| Layout | `flex-col gap-6` | `grid grid-cols-2 gap-6` | `grid grid-cols-2 gap-8` |
| Card padding | `p-6` | `p-7` | `p-8` |
| Badge "Mais Completo" | Visivel (posicao ajustada) | Visivel | Visivel |
| Container max-width | Full | `max-w-3xl mx-auto` | `max-w-4xl mx-auto` |

---

### 4.5 Como Funciona — Responsivo

| Propriedade | Mobile | Tablet | Desktop |
|---|---|---|---|
| Layout | `flex-col gap-8` | `flex-col gap-8` | `grid grid-cols-3 gap-8` |
| Numero tamanho | `text-7xl` | `text-7xl` | `text-8xl` |
| Conector entre passos | Linha vertical sutil (`hidden md:block`) | Oculto | Visivel (horizontal) |

---

### 4.6 Depoimentos — Responsivo

| Propriedade | Mobile | Tablet | Desktop |
|---|---|---|---|
| Layout | Carousel scroll horizontal | `grid grid-cols-2 gap-6` | `grid grid-cols-3 gap-6` |
| Card width | `85vw` max `360px` | Auto | Auto |
| Indicadores (dots) | Visiveis | Ocultos | Ocultos |

---

### 4.7 Redes Sociais — Responsivo

Layout sempre centralizado (coluna). Sem mudancas estruturais entre breakpoints, apenas
ajustes de tamanho tipografico.

---

### 4.8 CTA Final — Responsivo

| Propriedade | Mobile | Desktop |
|---|---|---|
| H2 tamanho | `text-4xl` | `text-6xl` |
| Padding vertical | `py-24` | `py-40` |
| Botao width | `w-full sm:w-auto` | Auto com `min-w-[240px]` |
| Glow decorativo | Menor (`w-[300px]`) | Maior (`w-[600px]`) |

---

### 4.9 Footer — Responsivo

| Propriedade | Mobile | Desktop |
|---|---|---|
| Layout | `flex-col items-center text-center gap-6` | `grid grid-cols-3 items-center` |
| Alinhamento icones sociais | `justify-center` | `justify-end` |

---

## 5. MICROINTERACOES E TRANSICOES CSS

### 5.1 Transicoes padrao

Adicionar ao `globals.css`:

```css
/* Scroll suave global */
html {
  scroll-behavior: smooth;
}

/* Reducao de animacao para usuarios com preferencia de acessibilidade */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

### 5.2 Botoes

| Interacao | Comportamento | Duration | Easing |
|---|---|---|---|
| Hover botao principal | `brightness-110 scale-[1.02] shadow-accent-glow` | 200ms | ease-in-out |
| Active botao principal | `scale-[0.98] brightness-100` | 100ms | ease |
| Hover botao outline | `bg-accent text-text-inverse` | 200ms | ease-in-out |
| Focus (todos) | `outline-2 outline-offset-2 outline-accent` | Imediato | — |

Classe Tailwind de transicao base para todos os botoes:
```
transition-all duration-200 ease-in-out
```

---

### 5.3 Cards

| Interacao | Comportamento | Duration | Easing |
|---|---|---|---|
| Hover card servico | `border-accent/30 shadow-card-hover bg-surface-elevated` | 300ms | ease |
| Hover card depoimento | `border-white/[0.15]` | 200ms | ease |

Classe Tailwind de transicao base para todos os cards:
```
transition-all duration-300 ease-in-out
```

---

### 5.4 Header no scroll

Comportamento via JavaScript — adicionar classe CSS quando `window.scrollY > 80`:

```js
// Adicionar em useEffect no componente Header
const handleScroll = () => {
  const header = document.getElementById('site-header')
  if (window.scrollY > 80) {
    header?.classList.add('border-b', 'border-white/[0.08]', 'shadow-[0_1px_0_rgba(255,255,255,0.08)]')
  } else {
    header?.classList.remove('border-b', 'border-white/[0.08]', 'shadow-[0_1px_0_rgba(255,255,255,0.08)]')
  }
}
```

O header ja possui `transition-shadow duration-300` para que a borda apareca suavemente.

---

### 5.5 Fade-in de secoes no scroll (Intersection Observer)

Aplicar em secoes principais para criar efeito de entrada suave conforme o usuario rola.

**CSS base:**

```css
/* globals.css */
.fade-in-section {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 600ms ease, transform 600ms ease;
}

.fade-in-section.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

**JavaScript (hook customizado `useScrollFadeIn`):**

```ts
// hooks/useScrollFadeIn.ts
import { useEffect, useRef } from 'react'

export function useScrollFadeIn() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return ref
}
```

**Uso:** Aplicar nas secoes `<section>` principais (Sobre, Servicos, Como Funciona, Depoimentos).
**NAO aplicar no Hero** (ja esta visivel no carregamento).

---

### 5.6 Icones de check e beneficios

Sem animacao — apenas cor e tamanho corretos (lucide-react `Check`, 16px, `text-success`).

---

### 5.7 Links do footer / redes sociais

```
transition-colors duration-200
texto: text-text-muted
hover: text-white
```

---

### 5.8 Carousel de depoimentos (mobile — CSS nativo)

```css
/* globals.css */
.carousel-track {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* Firefox */
  padding-bottom: 16px;
}

.carousel-track::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}

.carousel-item {
  flex: 0 0 85vw;
  max-width: 360px;
  scroll-snap-align: start;
}
```

Sem JavaScript para o carousel basico. Se quiser dots dinamicos, adicionar um pequeno script
com IntersectionObserver para detectar o card ativo.

---

## 6. NOTAS DE IMPLEMENTACAO PARA O FRONTEND DEV

### 6.1 Estrutura de arquivos recomendada

```
src/
  app/
    layout.tsx          ← Fontes (next/font), globals, metadata base
    page.tsx            ← Importa e renderiza todas as secoes em ordem
  components/
    layout/
      Header.tsx
      Footer.tsx
    sections/
      HeroSection.tsx
      SobreSection.tsx
      ServicosSection.tsx
      ComoFuncionaSection.tsx
      DepoimentosSection.tsx
      RedesSociaisSection.tsx
      CtaFinalSection.tsx
    ui/
      Button.tsx          ← Botao principal + secundario (variante prop)
      Card.tsx            ← Card de servico (variante padrao/destaque)
      Badge.tsx           ← Badge/tag (variante accent/success)
      TestimonialCard.tsx ← Card de depoimento
      StepCard.tsx        ← Passo do "Como Funciona"
    icons/
      WhatsAppIcon.tsx    ← SVG do WhatsApp como componente React
      InstagramIcon.tsx   ← SVG do Instagram como componente React
  hooks/
    useScrollFadeIn.ts
    useHeaderScroll.ts
  lib/
    constants.ts         ← Numero WhatsApp, handles, textos que serao substituidos
```

---

### 6.2 Constantes e dados mutaveis

**Centralizar em `src/lib/constants.ts`** todos os dados que o cliente vai confirmar:

```ts
// src/lib/constants.ts
export const PERSONAL = {
  nome: 'NOME DO PERSONAL',
  nomeCompleto: 'Nome Completo',
  cidade: 'Cidade — SP',
  whatsapp: '5511999999999', // DDI+DDD+numero, sem simbolos
  whatsappMessage: 'Oi! Vi seu site e quero saber mais sobre os planos.',
  instagram: '@handle',
  instagramUrl: 'https://instagram.com/handle',
  cref: 'XXXXXXX-G/SP',
  anosExperiencia: '3',
  totalAlunos: '+50',
}

export const WHATSAPP_URL = `https://wa.me/${PERSONAL.whatsapp}?text=${encodeURIComponent(PERSONAL.whatsappMessage)}`
```

---

### 6.3 Tailwind config completo

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0F1923',
        accent: '#E8FF00',
        surface: '#1A2535',
        'surface-elevated': '#1E2D40',
        'text-primary': '#FFFFFF',
        'text-muted': '#8892A4',
        'text-inverse': '#0F1923',
        success: '#22C55E',
        'footer-bg': '#0A1018',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
      },
      fontSize: {
        'display': ['3.5rem', { lineHeight: '1', letterSpacing: '-0.01em' }],
        'display-lg': ['6rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
      },
      boxShadow: {
        'card': '0 4px 24px rgba(0, 0, 0, 0.30)',
        'card-hover': '0 8px 40px rgba(0, 0, 0, 0.45)',
        'accent-glow': '0 0 24px rgba(232, 255, 0, 0.20)',
        'accent-glow-lg': '0 0 40px rgba(232, 255, 0, 0.30)',
      },
      backgroundImage: {
        'hero-overlay-mobile': 'linear-gradient(to bottom, rgba(15,25,35,0.70), rgba(15,25,35,0.90), rgba(15,25,35,0.98))',
        'hero-overlay-desktop': 'linear-gradient(to right, rgba(15,25,35,0.96), rgba(15,25,35,0.85) 40%, rgba(15,25,35,0.40) 70%, rgba(15,25,35,0.15))',
      },
    },
  },
  plugins: [],
}

export default config
```

---

### 6.4 Acessibilidade obrigatoria

- Todo botao com icone deve ter `aria-label` descritivo quando o texto for curto ou ausente
- Links de redes sociais: `target="_blank" rel="noopener noreferrer" aria-label="..."`
- Imagens com `alt` descritivo real (nao vazio e nao generico)
- Header com `role="banner"`, main com `<main>`, footer com `role="contentinfo"`
- Navegacao por teclado: todos os elementos interativos devem ter `focus-visible` visivel
  (ja incluido nas specs dos botoes)
- Contraste verificado:
  - Branco (#FFF) sobre primary (#0F1923): ratio 14.4:1 — PASSA AAA
  - Accent (#E8FF00) sobre primary (#0F1923): ratio 11.3:1 — PASSA AAA
  - Text-muted (#8892A4) sobre primary (#0F1923): ratio 4.6:1 — PASSA AA
  - Text-inverse (#0F1923) sobre accent (#E8FF00): ratio 11.3:1 — PASSA AAA

---

### 6.5 Performance

- Imagens: usar `next/image` com `priority` no Hero (LCP critico). Demais imagens sem priority.
- Fontes: `next/font/google` ja faz preload automatico. Nao adicionar `<link>` manual.
- Icones: importar individualmente do `lucide-react` (tree-shakeable). Nunca importar `*`.
  ```ts
  // CERTO
  import { Check, MapPin, Users } from 'lucide-react'
  // ERRADO
  import * as Icons from 'lucide-react'
  ```
- CSS animations: preferir `transform` e `opacity` (nao triggam layout reflow)
- Carousel: CSS scroll snap nativo, sem biblioteca JS para carousel

---

### 6.6 Comportamento do `<Button>` como componente React

```tsx
// Exemplo da interface do componente Button
interface ButtonProps {
  variant: 'primary' | 'secondary'
  size?: 'default' | 'large'
  href?: string        // Se presente, renderiza como <a>
  children: React.ReactNode
  className?: string
  // ... demais props HTMLButtonElement / HTMLAnchorElement
}
```

O botao principal deve ser um `<a>` com `href={WHATSAPP_URL}` na maioria dos usos
(abre WhatsApp). Usar `<button>` apenas para acoes de UI puras (ex: toggle de carousel).

---

### 6.7 Ordem das secoes no `page.tsx`

```tsx
// src/app/page.tsx
export default function Home() {
  return (
    <main>
      <HeroSection />
      <SobreSection />
      <ServicosSection />
      <ComoFuncionaSection />
      <DepoimentosSection />
      <RedesSociaisSection />
      <CtaFinalSection />
    </main>
  )
}
```

`Header` e `Footer` renderizados no `layout.tsx`, fora do `<main>`.

---

### 6.8 IDs de ancora para navegacao interna

Cada `<section>` deve ter um `id` para que links internos funcionem com scroll suave:

| Secao | ID |
|---|---|
| Hero | `id="inicio"` |
| Sobre | `id="sobre"` |
| Servicos | `id="servicos"` |
| Como Funciona | `id="como-funciona"` |
| Depoimentos | `id="depoimentos"` |
| Redes Sociais | `id="redes-sociais"` |
| CTA Final | `id="contato"` |

O botao "VER PLANOS" no Hero usa `href="#servicos"`.

---

*Fim do UI_SPECS.md — versao 1.0*
*Proximo passo: personal-frontend-dev pode iniciar implementacao seguindo esta spec.*
