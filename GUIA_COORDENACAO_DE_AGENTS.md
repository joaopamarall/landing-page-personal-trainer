# Guia: Como Construir um Sistema de Coordenacao de Agents com Claude Code

> Baseado no projeto CarbonRails — 9 agents especializados trabalhando em conjunto para construir uma plataforma fintech.

---

## Indice

1. [Visao Geral da Arquitetura](#1-visao-geral-da-arquitetura)
2. [Os 3 Pilares do Sistema](#2-os-3-pilares-do-sistema)
3. [Passo 1: Definir os Papeis (Agents)](#3-passo-1-definir-os-papeis-agents)
4. [Passo 2: Definir o Fluxo de Documentacao](#4-passo-2-definir-o-fluxo-de-documentacao)
5. [Passo 3: Definir as Regras de Coordenacao (CLAUDE.md)](#5-passo-3-definir-as-regras-de-coordenacao-claudemd)
6. [Passo 4: Definir as Dependencias entre Agents](#6-passo-4-definir-as-dependencias-entre-agents)
7. [Anatomia de um Agent](#7-anatomia-de-um-agent)
8. [O Flow Completo: Do Pedido ao Codigo](#8-o-flow-completo-do-pedido-ao-codigo)
9. [Mecanismo de Delegacao (Task Tool)](#9-mecanismo-de-delegacao-task-tool)
10. [Artefatos de Coordenacao](#10-artefatos-de-coordenacao)
11. [Regras de Governanca](#11-regras-de-governanca)
12. [Patterns e Anti-Patterns](#12-patterns-e-anti-patterns)
13. [Template: Criando Seu Proprio Sistema](#13-template-criando-seu-proprio-sistema)
14. [Exemplo Pratico Completo](#14-exemplo-pratico-completo)

---

## 1. Visao Geral da Arquitetura

### O Problema

Quando voce usa Claude Code para um projeto complexo, uma unica conversa sem estrutura leva a:
- Codigo sem testes (porque ninguem obrigou)
- Decisoes arquiteturais esquecidas entre conversas
- Falta de compliance/seguranca (porque "nao era o foco")
- Implementacoes que divergem do planejado

### A Solucao: Orquestrador + Agents Especializados

O sistema do CarbonRails resolve isso com uma arquitetura de **1 orquestrador + 9 agents especializados**:

```
                         Usuario
                           |
                           v
                 ┌─────────────────────┐
                 │  ASSISTENTE PRINCIPAL │  ← Orquestrador
                 │  (Conversa direta)   │     Planeja, coordena, responde perguntas
                 └──────────┬──────────┘     NUNCA implementa codigo
                            │
           ┌────────────────┼────────────────┐
           │     Task tool (delegacao)        │
           │                                  │
    ┌──────┴───────┐              ┌───────────┴──────────┐
    │   CONSULTIVOS │              │   IMPLEMENTADORES    │
    │   (Pareceres)  │              │   (Codigo)            │
    ├───────────────┤              ├──────────────────────┤
    │ Legal Advisor  │              │ Backend Dev          │
    │ Tech Architect │              │ Frontend Dev         │
    │ UI/UX Designer │              │ DevOps Engineer      │
    │ Content Writer │              │ SEO Specialist       │
    │ Security Rev.  │              │                      │
    └───────────────┘              └──────────────────────┘
```

### Principio Central

> **O assistente principal (orquestrador) NUNCA escreve codigo.** Ele planeja, coordena e delega. Cada agent especializado carrega suas proprias regras, checklists e padroes de qualidade. Se o orquestrador implementa diretamente, essas regras sao ignoradas.

Esta regra surgiu de uma falha real: na Feature #2 do projeto, o assistente principal implementou diretamente e os testes (obrigatorios pelo agent backend-dev) foram pulados.

---

## 2. Os 3 Pilares do Sistema

O sistema se sustenta em tres pilares:

### Pilar 1: Agent Files (`.claude/agents/*.md`)
Definem **quem faz o que** — cada arquivo e uma "persona" completa com:
- Papel e responsabilidades
- Stack tecnica
- Principios de engenharia
- Checklists de qualidade
- Workflow de implementacao

### Pilar 2: CLAUDE.md (Regras de Coordenacao)
Define **como os agents interagem** — regras de:
- Delegacao obrigatoria
- Fluxo de documentacao (SPEC → TASKS → Implementacao)
- Mapeamento tipo-de-trabalho → agent
- Isencoes (quem nao segue quais regras)

### Pilar 3: Artefatos de Coordenacao (SPEC_TECNICA + TASKS_IMPLEMENTACAO)
Define **o contrato entre planejamento e execucao**:
- `SPEC_TECNICA.md` — O QUE e POR QUE (arquitetura, decisoes)
- `TASKS_IMPLEMENTACAO.md` — COMO e EM QUE ORDEM (checkboxes, configs exatas)

---

## 3. Passo 1: Definir os Papeis (Agents)

### Categorias de Agents

Identifique as dimensoes do seu projeto e crie um agent por dimensao. Os agents se dividem em duas categorias:

#### Consultivos (emitem pareceres, NAO implementam codigo)
- Produzem specs, analises, recomendacoes
- Sao ISENTOS do fluxo TASKS_IMPLEMENTACAO
- Informam os implementadores

| Agent CarbonRails | Responsabilidade | Tipo |
|---|---|---|
| `legal-advisor` | Compliance regulatorio, contratos, riscos | Consultivo |
| `tech-architect` | Decisoes arquiteturais, specs tecnicas | Consultivo |
| `ui-ux-designer` | Interface, experiencia, design system | Consultivo |
| `content-writer` | Copy, UX writing, voz da marca | Consultivo |
| `security-reviewer` | Auditorias, vulnerabilidades, OWASP | Consultivo |

#### Implementadores (escrevem codigo)
- Consomem specs e TASKS files
- DEVEM seguir checklists antes de "dar como pronto"
- Marcam `[x]` no TASKS file conforme implementam

| Agent CarbonRails | Responsabilidade | Tipo |
|---|---|---|
| `backend-dev` | APIs, services, testes (NestJS) | Implementador |
| `frontend-dev` | Paginas, componentes (Next.js) | Implementador |
| `devops-engineer` | Docker, CI/CD, observabilidade | Implementador |
| `seo-specialist` | Metadata, JSON-LD, sitemap | Implementador (quando gera codigo) |

### Como Decidir Quantos Agents Criar

**Regra:** Crie um agent quando existe um **conjunto coeso de regras, checklists e padroes** que seria ignorado se a responsabilidade fosse misturada com outra.

Exemplos:
- Se voce tem regras de seguranca complexas (OWASP, LGPD) → agent de seguranca separado
- Se voce tem brand guidelines + design system → agent de UI/UX separado
- Se voce tem compliance regulatorio (CVM, BACEN) → agent legal separado

**Anti-pattern:** Criar agents demais para responsabilidades triviais. Se um "agent" teria apenas 20 linhas de instrucao, ele provavelmente nao precisa existir como agent separado.

---

## 4. Passo 2: Definir o Fluxo de Documentacao

### O Pipeline de Feature

Toda feature segue este pipeline linear:

```
1. Pedido do usuario
       │
       v
2. [Se feature de negocio] Consulta ao agent consultivo (ex: legal)
       │
       v
3. Agent arquiteto cria SPEC_TECNICA.md
       │
       v
4. Derivar TASKS_IMPLEMENTACAO.md da spec
       │
       v
5. Agent implementador segue o TASKS file como guia
       │
       v
6. [Opcional] Agent de seguranca audita o resultado
```

### SPEC_TECNICA.md — O Contrato de Arquitetura

Este documento responde: **O QUE construir e POR QUE?**

```markdown
# SPEC TECNICA: [Nome da Feature]

## Contexto
[Por que esta feature existe, qual problema resolve]

## Decisoes Arquiteturais
| Decisao | Escolha | Justificativa |
|---|---|---|
| Pattern | Strategy | Permite trocar implementacao sem mudar consumidores |
| DB | PostgreSQL raw | Zero ORM, controle total de queries |

## Design Tecnico
[Endpoints com request/response, schemas de banco, fluxos]

## Requisitos de Compliance
[Do legal advisor, quando aplicavel. "N/A" se task puramente tecnica]

## Dependencias
[O que precisa existir antes]

## Fora do Escopo
[O que explicitamente NAO faz parte]
```

### TASKS_IMPLEMENTACAO.md — O Guia de Execucao

Este documento responde: **COMO construir e EM QUE ORDEM?**

```markdown
# TASKS DE IMPLEMENTACAO: [Nome da Feature]

| Campo | Valor |
|---|---|
| **Feature** | Nome descritivo |
| **Referencia** | Path para a SPEC_TECNICA.md |
| **Data** | YYYY-MM-DD |
| **Codigo** | Path base do codigo |

## Stack / Decisoes Tecnicas
| Item | Valor |
|---|---|
| Framework | NestJS 11 |
| Pattern | DIP via Custom Provider |

## Estrutura de Diretorios
[Arvore de arquivos que serao criados/modificados]

## BLOCO 1: [Nome do Bloco]

### TASK 1.1: [Descricao]
- [ ] Criar arquivo X com Y
- [ ] Implementar metodo Z

### TASK 1.2: [Descricao]
- [ ] ...

## BLOCO 2: [Nome do Bloco]
...

## O QUE NAO ESTA INCLUIDO
- Feature X (sera feita na Task NN)
- Otimizacao Y (prematura neste momento)

## CRITERIOS DE DONE
- [ ] `npm run build` — 0 erros
- [ ] `npm run test` — todos passando
- [ ] Swagger documentado (se API)
- [ ] Todas as tasks marcadas [x]
```

### Relacao entre os Dois Documentos

| Aspecto | SPEC_TECNICA.md | TASKS_IMPLEMENTACAO.md |
|---|---|---|
| Criado por | Arquiteto / Designer | Derivado da spec |
| Conteudo | O QUE e POR QUE | COMO e EM QUE ORDEM |
| Formato | Prosa, tabelas, diagramas | Checkboxes, blocos sequenciais |
| Mutabilidade | Atualizar ANTES de divergir | Marcar `[x]` conforme implementa |
| Quando muda | Se a arquitetura precisa mudar | Continuamente durante implementacao |

---

## 5. Passo 3: Definir as Regras de Coordenacao (CLAUDE.md)

O `CLAUDE.md` na raiz do projeto e o "contrato social" entre todos os agents. Ele contem:

### Secao 1: Catalogo de Agents
Lista todos os agents com:
- Arquivo de definicao
- Responsabilidade (1 paragrafo)
- Quando usar (gatilhos)

### Secao 2: Regra de Delegacao Obrigatoria
A tabela de mapeamento:

```markdown
| Tipo de trabalho | Agent obrigatorio | Como delegar |
|---|---|---|
| Codigo backend | backend-dev | Task tool → general-purpose com prompt |
| Codigo frontend | frontend-dev | Task tool → general-purpose com prompt |
| Infraestrutura | devops-engineer | Task tool → general-purpose com prompt |
| Pareceres legais | legal-advisor | Task tool → general-purpose com prompt |
```

### Secao 3: O que o orquestrador PODE e NAO PODE fazer

```markdown
**PODE:**
- Responder perguntas do usuario
- Coordenar entre agents
- Ler arquivos para entender contexto
- Planejar (plan mode) antes de delegar
- Criar/atualizar TASKS_IMPLEMENTACAO.md

**NAO PODE:**
- Escrever codigo de producao
- Rodar migrations ou comandos de build/test
- Instalar dependencias
- Criar arquivos de codigo novos
```

### Secao 4: Workflow de Features
O pipeline completo: pedido → consulta legal → spec → tasks → implementacao.

### Secao 5: Isencoes
Quem NAO precisa seguir quais regras:
- Arquiteto e isento de TASKS (ele CRIA as specs)
- Legal e isento de TASKS (ele emite pareceres)
- Security reviewer e isento de TASKS (ele audita)

---

## 6. Passo 4: Definir as Dependencias entre Agents

### Grafo de Dependencias do CarbonRails

```
                    ┌──────────────┐
                    │ Legal Advisor │
                    └──────┬───────┘
                           │ Compliance check
                           v
                    ┌──────────────┐       ┌──────────────┐
                    │ Tech Architect│◄─────│ UI/UX Designer│
                    └──────┬───────┘       └──────┬───────┘
                           │ SPEC_TECNICA          │ UI Specs
                           v                       v
                    ┌──────────────┐       ┌──────────────┐
                    │ Backend Dev  │       │ Frontend Dev │◄── Content Writer (copy)
                    └──────┬───────┘       └──────┬───────┘◄── SEO Specialist (metadata)
                           │                       │
                           └───────────┬───────────┘
                                       │
                                       v
                              ┌──────────────────┐
                              │ DevOps Engineer   │  (fornece ambientes)
                              └──────────────────┘
                                       │
                                       v
                              ┌──────────────────┐
                              │ Security Reviewer │  (audita tudo)
                              └──────────────────┘
```

### Dependencias Obrigatorias (Blocking)

Estas dependencias BLOQUEIAM o trabalho ate serem satisfeitas:

| Agent | Depende de | Quando |
|---|---|---|
| Tech Architect | Legal Advisor | Features de negocio (dados, transacoes, compliance) |
| Backend Dev | SPEC_TECNICA | Sempre — nao inicia sem spec |
| Frontend Dev | SPEC_TECNICA | Sempre — nao inicia sem spec |
| DevOps | SPEC_TECNICA | Sempre — nao inicia sem spec |

### Dependencias Opcionais (Non-blocking)

Estas dependencias enriquecem o trabalho mas nao bloqueiam:

| Agent | Consulta | Quando |
|---|---|---|
| Frontend Dev | Content Writer | Para copy e UX writing |
| Frontend Dev | SEO Specialist | Para metadata de paginas publicas |
| Security Reviewer | Legal Advisor | Quando vulnerabilidades impactam compliance |
| Tech Architect | UI/UX Designer | Para features que envolvem interface |

### Quando a Consulta Legal e Obrigatoria vs Dispensavel

**Obrigatoria** — features que tocam:
- Dados de usuario, transacoes, regulacao
- Autenticacao, autorizacao, KYC
- Marketplace, financeiro, compliance

**Dispensavel** — tasks puramente tecnicas:
- Setup de infra, observabilidade, refactoring
- Atualizacao de dependencias, testes

---

## 7. Anatomia de um Agent

Cada agent e um arquivo `.md` em `.claude/agents/` com a seguinte estrutura:

### Estrutura Obrigatoria

```markdown
---
name: nome-do-agent
description: "Descricao curta para o sistema de agents"
---

# [Nome do Projeto] [Papel] Agent

## Papel
[1 paragrafo: quem voce e e o que faz]

## PRE-REQUISITO OBRIGATORIO: Spec Tecnica + Task File
[Regra de nao iniciar sem os artefatos — APENAS para implementadores]

## Stack Principal
[Tabela com tecnologias]

## PRINCIPIOS DE ENGENHARIA
[Regras que o agent DEVE seguir ao implementar]
[Ex: SOLID, Object Calisthenics, Clean Architecture]

## [DOMINIO ESPECIFICO]
[Secoes com conhecimento profundo do dominio]
[Ex: NestJS modules, Next.js App Router, Docker multi-stage]

## WORKFLOW DE IMPLEMENTACAO
[Passo a passo de como o agent executa uma task]

## CHECKLIST DE QUALIDADE
[Checkboxes que DEVEM estar ok antes de considerar "pronto"]
```

### Anatomia Detalhada dos Agents do CarbonRails

#### Agent Consultivo (ex: Legal Advisor) — ~720 linhas

```
├── Proposito e papel
├── Identidade e comportamento (tom, formato de resposta)
├── Base legal completa (artigos, leis, pareceres)
├── Analise da zona cinzenta (quando consultar)
├── Templates de documentos (contratos, disclaimers)
├── Checklist de estruturacao juridica
├── FAQ com respostas estruturadas
├── Contexto do plano de negocio (estrategia, mercado)
├── Analise competitiva
├── Gestao de riscos
└── Como usar este agent (exemplos de consulta)
```

**Ponto-chave:** Carrega TODO o conhecimento de dominio que o Claude precisa para emitir pareceres informados. Quanto mais contexto, mais preciso o parecer.

#### Agent Arquiteto (ex: Tech Architect) — ~515 linhas

```
├── Proposito e responsabilidade
├── REGRA: Consulta legal obrigatoria (com fluxo)
├── REGRA: Criar SPEC_TECNICA.md (com template)
├── Identidade e comportamento
├── Contexto do projeto (posicionamento, o que faz/nao faz)
├── Arquitetura tecnica completa
│   ├── Camadas da plataforma (diagrama)
│   ├── Smart contract (funcoes: mint, transfer, retire, lock)
│   ├── Compliance mode (PRIVATE/REGULATED)
│   ├── Mecanismo de preco (classificado privado)
│   ├── Sistema de royalties
│   ├── Ponte on-chain ↔ registro oficial
│   └── Gateway de conformidade (KYC/AML)
├── Cenarios de operacao
├── Roadmap tecnico (Fases 0-1)
├── Principios de arquitetura
└── Decisoes que requerem consulta legal
```

**Ponto-chave:** Contem a visao completa do sistema. Cada decisao arquitetural e justificada. Cada area sensivel tem uma flag "consultar legal".

#### Agent Implementador (ex: Backend Dev) — ~1960 linhas

```
├── Papel (3 disciplinas combinadas)
├── PRE-REQUISITO: Spec + Task file (regra inviolavel)
├── Stack principal (tabela)
├── PRINCIPIOS DE ENGENHARIA (~500 linhas)
│   ├── SOLID (5 principios com exemplos TypeScript)
│   ├── Object Calisthenics (9 regras adaptadas para NestJS)
│   ├── Clean Architecture (camadas)
│   ├── GoF Patterns (ativos, a considerar, a evitar)
│   └── Principios gerais (DRY, KISS, YAGNI, Composition)
├── NESTJS — Dominio completo (~400 linhas)
│   ├── Arquitetura modular (arvore de diretorios)
│   ├── Modules (principios)
│   ├── Controllers (API layer, Swagger)
│   ├── Services (business logic)
│   ├── DTOs (validacao)
│   └── Repository Pattern
├── TYPESCRIPT — Excelencia
│   ├── Strict mode (tsconfig)
│   ├── Branded types, Result pattern, Discriminated unions
│   └── Exhaustive pattern matching
├── API DESIGN (~200 linhas)
│   ├── Convencoes REST (endpoints)
│   ├── Response envelope padrao
│   ├── Error codes padronizados
│   └── Paginacao, versionamento
├── AUTH (JWT + API Keys + RBAC + Rate Limiting)
├── INTEGRACOES (Adapter pattern, Circuit Breaker, Webhooks)
├── DATABASE (Prisma schema, migrations)
├── BACKGROUND JOBS (BullMQ)
├── CACHING (Redis)
├── TESTES (unit, integration, E2E)
├── SEGURANCA (Helmet, CORS, validation, secrets)
├── SWAGGER padrao obrigatorio
├── WORKFLOW DE IMPLEMENTACAO (passo a passo)
└── CHECKLIST DE QUALIDADE (~40 items em 5 categorias)
```

**Ponto-chave:** E uma referencia exaustiva. O agent nao precisa "inventar" nada — tem o padrao exato para cada situacao. Isso garante consistencia entre todas as features implementadas.

### Tamanho dos Agents

| Agent | Linhas | Motivo |
|---|---|---|
| Backend Dev | ~1960 | Maior — carrega SOLID, patterns, exemplos de codigo |
| Frontend Dev | ~1380 | Grande — Next.js, PWA, acessibilidade, mobile |
| Legal Advisor | ~720 | Base legal completa com artigos |
| Tech Architect | ~515 | Arquitetura do sistema inteiro |
| Security Reviewer | ~475 | 7 checklists de auditoria |
| UI/UX Designer | ~464 | Identidade visual, brand system, design system |
| SEO Specialist | ~810 | Keywords, structured data, estrategia conteudo |
| DevOps Engineer | ~789 | Docker, CI/CD, Terraform, observabilidade |
| Content Writer | ~340 | Glossario, padroes de copy, tom da marca |

**Regra pratica:** Agents implementadores sao maiores porque carregam exemplos de codigo e principios de engenharia. Agents consultivos sao menores mas mais densos em conhecimento de dominio.

---

## 8. O Flow Completo: Do Pedido ao Codigo

### Exemplo Real: "Implementar abstração de mensageria com DIP"

```
PASSO 1: Usuario pede a feature
  "Quero refatorar o RabbitMQ para usar Dependency Inversion"

PASSO 2: Orquestrador avalia
  - Feature puramente tecnica? SIM → Consulta legal dispensavel
  - Precisa de spec? SIM → Delegar ao tech-architect

PASSO 3: Tech Architect cria SPEC_TECNICA.md
  Task tool → {
    subagent_type: "general-purpose",
    prompt: "Voce e o agent carbonrails-tech-architect.
             Leia .claude/agents/carbonrails-tech-architect.md.
             Crie uma SPEC_TECNICA.md para refatorar RabbitMQ
             com DIP em Carbon-Rails-Estudo/tasks/12-messaging-abstraction/"
  }

  Resultado: SPEC_TECNICA.md criada com:
  - Decisoes arquiteturais (DIP, Symbol token, modulo @Global)
  - Interface IMessagePublisher
  - Estrutura de diretorios
  - O que esta fora do escopo

PASSO 4: Derivar TASKS_IMPLEMENTACAO.md
  (Pode ser feito pelo orquestrador ou pelo agent implementador)

  Resultado: TASKS_IMPLEMENTACAO.md com:
  - BLOCO 1: Camada abstrata (interface, types, token)
  - BLOCO 2: Implementacao concreta (RabbitMqPublisherService)
  - BLOCO 3: Modulo NestJS + integracao
  - BLOCO 4: Testes
  - BLOCO 5: Limpeza do codigo antigo
  - CRITERIOS DE DONE

PASSO 5: Backend Dev implementa
  Task tool → {
    subagent_type: "general-purpose",
    prompt: "Voce e o agent carbonrails-backend-dev.
             Leia .claude/agents/carbonrails-backend-dev.md.
             Implemente a Task 12 seguindo
             Carbon-Rails-Estudo/tasks/12-messaging-abstraction/TASKS_IMPLEMENTACAO.md"
  }

  O agent:
  1. Le a SPEC_TECNICA para entender as decisoes
  2. Le o TASKS_IMPLEMENTACAO para saber o que fazer
  3. Implementa BLOCO por BLOCO, na ordem
  4. Marca [x] em cada task conforme conclui
  5. Roda build/testes
  6. Verifica CRITERIOS DE DONE

PASSO 6 (opcional): Security Reviewer audita
  Task tool → {
    subagent_type: "general-purpose",
    prompt: "Voce e o agent carbonrails-security-reviewer.
             Leia .claude/agents/carbonrails-security-reviewer.md.
             Audite a implementacao em src/messaging/"
  }
```

### Diagrama de Sequencia

```
Usuario          Orquestrador        Tech Architect       Backend Dev        Security
  │                  │                     │                    │                │
  │ "Implement DIP"  │                     │                    │                │
  │─────────────────>│                     │                    │                │
  │                  │ Task tool           │                    │                │
  │                  │────────────────────>│                    │                │
  │                  │                     │ Cria SPEC_TECNICA  │                │
  │                  │<────────────────────│                    │                │
  │                  │                     │                    │                │
  │                  │ Cria TASKS file     │                    │                │
  │                  │                     │                    │                │
  │                  │ Task tool           │                    │                │
  │                  │────────────────────────────────────────>│                │
  │                  │                     │                    │ Le SPEC+TASKS  │
  │                  │                     │                    │ Implementa     │
  │                  │                     │                    │ Marca [x]      │
  │                  │<────────────────────────────────────────│                │
  │                  │                     │                    │                │
  │                  │ Task tool (audit)   │                    │                │
  │                  │────────────────────────────────────────────────────────>│
  │                  │                     │                    │                │ Audita
  │                  │<────────────────────────────────────────────────────────│
  │                  │                     │                    │                │
  │  "Feito! ..."   │                     │                    │                │
  │<─────────────────│                     │                    │                │
```

---

## 9. Mecanismo de Delegacao (Task Tool)

### Como Funciona

O Claude Code possui uma ferramenta chamada `Task` que lanca subprocessos (agents) autonomos. Cada agent recebe um prompt e tem acesso a todas as ferramentas (Read, Write, Edit, Bash, etc.).

### Formato de Delegacao

```
Task tool → {
  subagent_type: "general-purpose",
  description: "Implementar feature X",
  prompt: "Voce e o agent [nome-do-agent].
           Leia suas instrucoes em .claude/agents/[nome-do-agent].md
           e siga-as fielmente.

           [Descricao da task]

           Siga o TASKS_IMPLEMENTACAO.md em
           Carbon-Rails-Estudo/tasks/<NN>/TASKS_IMPLEMENTACAO.md
           como guia de execucao."
}
```

### Elementos Criticos do Prompt de Delegacao

1. **Identidade:** "Voce e o agent X" — faz o Claude assumir o papel
2. **Instrucoes:** "Leia .claude/agents/X.md" — carrega as regras do agent
3. **Task:** Descricao clara do que fazer
4. **Guia:** Referencia ao TASKS_IMPLEMENTACAO.md

### Quando Usar Agents em Paralelo

Agents podem ser lancados em paralelo quando suas tarefas sao independentes:

```
// Paralelo: Legal + UI/UX (independentes)
Task 1: Legal Advisor analisa compliance da feature
Task 2: UI/UX Designer especifica interface

// Sequencial: Architect → Backend Dev (dependente)
Task 3: Tech Architect cria spec (DEPENDE de Task 1)
Task 4: Backend Dev implementa (DEPENDE de Task 3)
```

---

## 10. Artefatos de Coordenacao

### Hierarquia de Artefatos

```
CLAUDE.md                          ← Regras do projeto (permanente)
  │
  ├── .claude/agents/*.md          ← Definicoes dos agents (permanente)
  │
  └── Carbon-Rails-Estudo/tasks/   ← Artefatos por feature (cumulativo)
       └── NN-nome-da-feature/
            ├── SPEC_TECNICA.md    ← Arquitetura (criada uma vez, atualizada se necessario)
            └── TASKS_IMPLEMENTACAO.md  ← Execucao (checkboxes marcados conforme implementa)
```

### Nomenclatura das Tasks

As tasks sao numeradas sequencialmente:

```
01-smart-contract/
02-nestjs-setup/
03-observabilidade/
04-nextjs-frontend-setup/
05-user-registration/
06-frontend-auth-integration/
07-correlation-id-propagation/
08-microservico-de-notificacoes/
09-centralizacao-infra/
10-email-template-management/
11-domain-layer-refactoring/
12-messaging-abstraction/
```

Cada pasta e auto-contida: spec + tasks + (opcionalmente) notas adicionais.

### MEMORY.md — Memoria Persistente

Alem dos artefatos por feature, o sistema usa um arquivo `MEMORY.md` que persiste entre conversas:

```markdown
# Project Memory

## Architecture Decisions
- Zero ORM — raw SQL com node-postgres
- JWT dual (access 15min + refresh 7d)

## Tech Gotchas
- Next.js 16: proxy.ts, nao middleware.ts
- NestJS 11 + Express v5: forRoutes('{*path}')

## Docker Ports (avoid conflicts)
- PostgreSQL: 5434 (nao 5432)
- Redis: 6380 (nao 6379)
```

Isso evita que o mesmo erro seja cometido em conversas futuras.

---

## 11. Regras de Governanca

### Regra 1: Delegacao Obrigatoria

**O assistente principal NUNCA implementa codigo.**

| Pode | Nao pode |
|---|---|
| Responder perguntas | Escrever .ts, .tsx, .sql |
| Coordenar entre agents | Rodar build/test/migrations |
| Ler arquivos | Instalar dependencias |
| Planejar | Criar arquivos de codigo |
| Atualizar docs/memoria | — |

### Regra 2: Spec Antes de Codigo

**Nenhum agent implementador comeca sem SPEC_TECNICA.md + TASKS_IMPLEMENTACAO.md.**

Fluxo de verificacao do agent:
```
1. Verificar se existe SPEC_TECNICA.md → Se nao: PARAR
2. Verificar se existe TASKS_IMPLEMENTACAO.md → Se nao: criar
3. Ler ambos ANTES de qualquer linha de codigo
4. Implementar na ORDEM dos blocos
5. Marcar [x] ao concluir cada task
6. Verificar CRITERIOS DE DONE ao final
```

### Regra 3: Divergencia Controlada

**Se precisar divergir da spec durante implementacao:**
1. Atualizar a SPEC_TECNICA.md ANTES
2. Justificar a mudanca
3. So entao mudar o codigo

### Regra 4: Checklists Sao Lei

Cada agent implementador tem um CHECKLIST DE QUALIDADE. A feature so e "pronta" quando TODOS os itens do checklist estao satisfeitos.

Exemplo (Backend Dev — 40 items):
- Funcional: Swagger, DTOs, error codes, paginacao
- Arquitetura: Modulos isolados, repository pattern, adapter pattern
- Seguranca: Auth em todos endpoints, RBAC, rate limiting, sem PII em logs
- Testes: Unit tests, integration tests, 80% cobertura
- Performance: Indices, cache, connection pooling

### Regra 5: Consulta Legal para Features de Negocio

Features que tocam dados de usuario, transacoes, ou regulacao DEVEM ser validadas pelo legal advisor antes da spec tecnica.

---

## 12. Patterns e Anti-Patterns

### Patterns que Funcionam

**1. Agent com Contexto de Dominio Profundo**
Quanto mais contexto o agent tem sobre o dominio, melhores as decisoes. O legal advisor do CarbonRails carrega 720 linhas de base legal — artigos, pareceres, analise de zona cinzenta. Isso permite pareceres precisos sem pesquisa adicional.

**2. Checklists Embutidos no Agent**
Cada agent implementador tem um checklist de qualidade que funciona como "gate" de entrega. Isso substitui code review manual para padroes basicos.

**3. Isencoes Explicitas**
Definir claramente quem NAO segue quais regras evita burocracia desnecessaria. Agents consultivos (legal, architect, security) sao isentos do fluxo TASKS porque nao implementam codigo.

**4. Memoria entre Conversas**
O MEMORY.md captura gotchas, portas, decisoes — evitando erros repetidos. Ex: "PostgreSQL porta 5434, nao 5432" salvou horas de debug.

**5. Exemplos de Codigo no Agent**
O backend-dev tem exemplos de "ERRADO" e "CORRETO" para cada principio SOLID. Isso e mais efetivo que regras abstratas.

### Anti-Patterns a Evitar

**1. Orquestrador Implementando Diretamente**
Quando o assistente principal escreve codigo, as regras dos agents (testes, Swagger, security checks) sao ignoradas. Foi assim que a Feature #2 do CarbonRails foi implementada sem testes.

**2. Agents Sem Checklists**
Sem checklist, o agent decide arbitrariamente quando "esta pronto". Com checklist, ha criterios objetivos.

**3. Spec Tecnica Vaga**
Uma spec que diz "implementar auth" sem definir endpoints, schemas e fluxos gera implementacoes inconsistentes.

**4. Agents com Responsabilidades Sobrepostas**
Se dois agents podem fazer a mesma coisa, nenhum assume responsabilidade total. Responsabilidades devem ser exclusivas.

**5. Ignorar o TASKS File**
O TASKS file nao e checklist — e o GUIA DE EXECUCAO. Contem configs exatas, ordem de implementacao, decisoes tecnicas. Pular e implementar "do seu jeito" gera divergencias.

---

## 13. Template: Criando Seu Proprio Sistema

### Passo 1: Identifique as Dimensoes do Seu Projeto

Responda:
- Quais areas de conhecimento sao necessarias? (backend, frontend, infra, design, legal, seguranca)
- Quais areas tem regras/padroes complexos que seriam ignorados sem um agent dedicado?
- Quais areas precisam se consultar antes de agir?

### Passo 2: Crie os Agent Files

Para cada dimensao, crie `.claude/agents/meu-projeto-[papel].md`:

```markdown
---
name: meu-projeto-[papel]
description: "Descricao curta"
---

# [Projeto] [Papel] Agent

## Papel
[Quem voce e, o que faz, como se relaciona com outros agents]

## PRE-REQUISITO (se implementador)
[Regra de nao comecar sem spec + tasks]

## Stack
[Tecnologias]

## Principios
[Regras de engenharia que DEVEM ser seguidas]

## [Dominio Especifico]
[Conhecimento profundo: patterns, exemplos, configs]

## Workflow
[Como executa uma task, passo a passo]

## Checklist de Qualidade
[O que DEVE estar ok antes de considerar "pronto"]
```

### Passo 3: Crie o CLAUDE.md

```markdown
# [Projeto] — Instrucoes do Projeto

## Agents
[Lista completa com responsabilidades e quando usar]

## Regra: Delegacao Obrigatoria
[Tabela tipo-de-trabalho → agent]
[O que o orquestrador pode/nao pode fazer]

## Workflow: SPEC → TASKS → Implementacao
[Pipeline completo de uma feature]
[Quem cria spec, quem consome, quem esta isento]

## Dependencias entre Agents
[Quem consulta quem, quando e obrigatorio]

## Referencias
[Paths para todos os arquivos importantes]
```

### Passo 4: Crie a Pasta de Tasks

```
tasks/
  01-primeira-feature/
    SPEC_TECNICA.md
    TASKS_IMPLEMENTACAO.md
```

### Passo 5: Configure a Memoria

```
.claude/memory/MEMORY.md
```

Popule conforme descobre gotchas, toma decisoes, e encontra padroes.

---

## 14. Exemplo Pratico Completo

### Cenario: Projeto SaaS de Gestao Financeira

Voce quer criar um sistema similar para um projeto SaaS com 5 agents:

```
.claude/agents/
  finapp-tech-architect.md     ← Decisoes de arquitetura
  finapp-backend-dev.md        ← NestJS, APIs, testes
  finapp-frontend-dev.md       ← React, Next.js, UI
  finapp-security-reviewer.md  ← OWASP, PCI-DSS, audit
  finapp-devops.md             ← Docker, CI/CD, AWS
```

#### CLAUDE.md minimo viavel:

```markdown
# FinApp — Instrucoes do Projeto

## Agents
- tech-architect: Decisoes de stack, specs de features
- backend-dev: Codigo NestJS, APIs, testes
- frontend-dev: Codigo React/Next.js, componentes
- security-reviewer: Auditorias de seguranca
- devops: Docker, CI/CD, deploy

## Regra: Delegacao
| Trabalho | Agent |
|---|---|
| API/service/teste | backend-dev |
| Componente/pagina | frontend-dev |
| Docker/pipeline | devops |
| Spec/arquitetura | tech-architect |
| Auditoria | security-reviewer |

O assistente principal NUNCA implementa codigo.

## Workflow de Feature
1. Usuario pede feature
2. Tech Architect cria SPEC_TECNICA.md
3. Derivar TASKS_IMPLEMENTACAO.md
4. Agent implementador segue o TASKS
5. Security Reviewer audita (features criticas)

## Isencoes
- tech-architect: isento de TASKS (cria specs)
- security-reviewer: isento de TASKS (emite pareceres)
```

#### Prompt de delegacao:

```
Task tool → {
  subagent_type: "general-purpose",
  description: "Implementar endpoint de pagamentos",
  prompt: "Voce e o agent finapp-backend-dev.
           Leia .claude/agents/finapp-backend-dev.md e siga fielmente.
           Implemente o endpoint POST /api/v1/payments seguindo
           tasks/05-payments/TASKS_IMPLEMENTACAO.md"
}
```

---

## Resumo Final

### O que torna este sistema eficaz:

1. **Separacao de concerns** — Cada agent tem UMA responsabilidade clara
2. **Regras embutidas** — Checklists e principios sao carregados automaticamente pelo agent
3. **Pipeline de documentacao** — SPEC → TASKS → Codigo garante rastreabilidade
4. **Governanca explicita** — CLAUDE.md define quem faz o que, quando e como
5. **Memoria persistente** — Gotchas e decisoes sobrevivem entre conversas
6. **Dependencias claras** — Quem consulta quem e quando e formal
7. **Delegacao obrigatoria** — O orquestrador nunca bypassa os agents

### Custo vs Beneficio

| Custo | Beneficio |
|---|---|
| Tempo para criar 9 agent files | Consistencia em TODAS as features |
| Overhead de SPEC + TASKS por feature | Zero surpresas na implementacao |
| Regras no CLAUDE.md | Testes, Swagger, seguranca NUNCA esquecidos |
| Consulta legal bloqueante | Compliance-by-design, nao afterthought |

> O sistema adiciona ~30min de setup por feature (spec + tasks), mas economiza horas de retrabalho, bugs de seguranca e divergencias arquiteturais.
