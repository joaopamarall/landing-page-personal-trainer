# AUDITORIA DE COPY — Landing Page Guinho Vagner

**Agent:** personal-content-writer
**Status geral:** ✅ Muito bom — textos principais implementados fielmente ao COPY_DOC.

---

## Dados Reais Preenchidos Corretamente

| Placeholder | Valor aplicado |
|---|---|
| Nome | Guinho Vagner |
| Cidade/Estado | Piraquara / PR |
| Anos de experiência | 15 |
| CREF | 028414-G/PR |
| Instagram | @personalguinhovagner |
| WhatsApp | 5541997340600 |

---

## Textos Implementados

- [x] Hero — headline opção 1, tagline, descrição 3 parágrafos, 2 CTAs — corretos
- [x] Sobre — título, 4 parágrafos, 5 diferenciais, badge CREF — corretos
- [x] Serviços — título da seção, 2 cards completos com descrições, benefícios e CTAs — corretos
- [x] Como Funciona — título da seção, 3 passos com títulos e descrições — corretos
- [x] Depoimentos — título da seção, estrutura dos cards — correto
- [x] Redes Sociais — título, texto, handle do Instagram — corretos
- [x] CTA Final — headline, 2 linhas de apoio, CTA do botão — corretos
- [x] Footer — copyright dinâmico, CREF, links de redes sociais — corretos
- [x] Tom de voz, acentuação e ortografia — aprovados

---

## Pendências

### 🔴 Alta — bloqueiam publicação definitiva

- [ ] `[TOTAL_ALUNOS]` em `src/config/contato.ts` linha 14 — pedir ao Guinho o número de alunos atendidos. Após preencher, restaurar parágrafo 4 da seção Sobre: *"Hoje atendo X alunos e acompanho de perto cada resultado."*
- [ ] **Depoimentos fictícios** — Carlos M., Ana Paula R., Rodrigo F. são fictícios. Substituir por depoimentos reais com autorização dos alunos antes de publicar
- [ ] **Credencial de alunos no Hero** — o COPY_DOC previa 3 credenciais; implementação exibe apenas 2 (anos + CREF). A terceira (nº de alunos) ficou pendente até o dado real ser fornecido

### 🟡 Média

- [ ] Preços dos serviços — `SERVICOS[0].preco` e `SERVICOS[1].preco` em `contato.ts` com string vazia. Guinho decide: exibe preço ou mantém "consulte no WhatsApp"
- [ ] Fotos reais — `personal-hero.jpeg` e `personal-perfil.jpeg` são as fotos finais? Confirmar com o Guinho

### 🟢 Baixa — refinamentos

- [ ] CTA "Falar comigo" na seção Sobre não consta no COPY_DOC — validar com Guinho (recomendado manter)
- [ ] CTA "Quero começar agora" em ComoFunciona — validar ou padronizar para "Falar no WhatsApp"
- [ ] Nota "Sem compromisso. Respondo na hora." no CTA Final — aprovar com o personal
