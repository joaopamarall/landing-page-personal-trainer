# Landing Page Personal Trainer — Instrucoes do Projeto

## Contexto do Projeto

Landing page profissional para personal trainer com atuacao local. Objetivo: converter visitantes
em novos alunos via contato WhatsApp. Publico-alvo: pessoas da cidade que buscam treino
personalizado ou acompanhamento presencial. Monetizacao futura: trafego pago.

Servicos oferecidos pelo personal:
- **Plano de treino** — Treino montado por periodo (~2 meses), renovavel, sem acompanhamento
- **Personal trainer** — Acompanhamento presencial nos treinos + plano de treino incluso

---

## Agents do Projeto

### Consultivos (emitem pareceres, NAO implementam codigo)

| Agent | Arquivo | Responsabilidade | Quando usar |
|---|---|---|---|
| `personal-tech-architect` | `.claude/agents/personal-tech-architect.md` | Decisoes de stack, arquitetura, cria SPEC_TECNICA.md | Antes de qualquer feature nova. Avalia tecnologias. |
| `personal-ui-ux-designer` | `.claude/agents/personal-ui-ux-designer.md` | Identidade visual, design system, layout de conversao | Antes do frontend implementar. Define visual completo. |
| `personal-content-writer` | `.claude/agents/personal-content-writer.md` | Copy, headlines, CTAs, tom de voz do personal | Antes do frontend. Define todos os textos da landing. |

### Implementadores (escrevem codigo)

| Agent | Arquivo | Responsabilidade | Quando usar |
|---|---|---|---|
| `personal-frontend-dev` | `.claude/agents/personal-frontend-dev.md` | Implementa a landing page em Astro + Tailwind | Apos ter SPEC_TECNICA + TASKS + UI specs + copy |
| `personal-seo-specialist` | `.claude/agents/personal-seo-specialist.md` | SEO local, metadata, schema markup, sitemap | Apos frontend implementado ou em paralelo para specs de SEO |

---

## Regra: Delegacao Obrigatoria

O assistente principal (orquestrador) **NUNCA escreve codigo**. Toda implementacao passa pelos agents.

| Tipo de trabalho | Agent obrigatorio |
|---|---|
| Decisao de stack / arquitetura / spec tecnica | `personal-tech-architect` |
| Identidade visual / layout / design system | `personal-ui-ux-designer` |
| Copy / textos / CTAs / tom de voz | `personal-content-writer` |
| Codigo HTML/CSS/JS/Astro/Tailwind | `personal-frontend-dev` |
| Metadata / SEO / schema / sitemap | `personal-seo-specialist` |

### O que o orquestrador PODE fazer
- Responder perguntas do usuario
- Coordenar entre agents e definir a ordem de execucao
- Ler arquivos para entender contexto
- Criar e atualizar TASKS_IMPLEMENTACAO.md
- Atualizar MEMORY.md com decisoes e aprendizados

### O que o orquestrador NAO PODE fazer
- Escrever codigo de producao (.astro, .html, .css, .js, .ts)
- Instalar dependencias (npm install)
- Rodar comandos de build ou preview
- Criar arquivos de componente ou pagina

---

## Workflow: Do Pedido ao Codigo

### Feature nova ou secao nova da landing page

```
1. Usuario descreve o que quer
       |
       v
2. [Sempre] personal-tech-architect cria SPEC_TECNICA.md
       |
       v
3. [Em paralelo, se envolver visual] personal-ui-ux-designer define UI specs
   [Em paralelo, se envolver texto]  personal-content-writer define copy
       |
       v
4. Orquestrador deriva TASKS_IMPLEMENTACAO.md da spec + UI specs + copy
       |
       v
5. personal-frontend-dev implementa seguindo o TASKS file
       |
       v
6. [Apos implementacao] personal-seo-specialist audita e ajusta SEO
```

### Quando SEO e obrigatorio vs dispensavel

**Obrigatorio:**
- Qualquer pagina publica nova
- Mudancas em titulos, headings, copy principal
- Adicao de novas secoes com conteudo

**Dispensavel:**
- Ajustes puramente visuais (cores, espacamento)
- Refatoracao de codigo sem mudanca de conteudo

---

## Dependencias entre Agents

### Blocking (bloqueiam a execucao)

| Agent | Depende de | Quando |
|---|---|---|
| `personal-tech-architect` | Nada | Primeiro a ser consultado sempre |
| `personal-frontend-dev` | SPEC_TECNICA.md | Nunca inicia sem spec |
| `personal-frontend-dev` | UI specs do designer | Para secoes com componentes visuais |
| `personal-seo-specialist` | Frontend implementado | Para auditoria final |

### Non-blocking (enriquecem mas nao bloqueiam)

| Agent | Consulta | Quando |
|---|---|---|
| `personal-frontend-dev` | `personal-content-writer` | Para copy final dos textos |
| `personal-ui-ux-designer` | `personal-content-writer` | Para alinhar tom visual com voz da marca |

---

## Isencoes do Fluxo TASKS_IMPLEMENTACAO

Agents consultivos sao **isentos** de TASKS — eles CRIAM artefatos, nao consomem:
- `personal-tech-architect` — isento (cria SPEC_TECNICA.md)
- `personal-ui-ux-designer` — isento (cria UI specs, moodboards, design tokens)
- `personal-content-writer` — isento (cria copy docs)

---

## Referencias de Arquivos

```
CLAUDE.md                                    <- Este arquivo (regras do projeto)
.claude/agents/
  personal-tech-architect.md
  personal-ui-ux-designer.md
  personal-content-writer.md
  personal-frontend-dev.md
  personal-seo-specialist.md
tasks/
  NN-nome-da-feature/
    SPEC_TECNICA.md
    TASKS_IMPLEMENTACAO.md
.claude/memory/
  MEMORY.md                                  <- Decisoes e gotchas persistentes
```
