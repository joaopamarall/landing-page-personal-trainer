# AUDITORIA DE CÓDIGO — Landing Page Guinho Vagner

**Agent:** personal-frontend-dev
**Status geral:** ✅ Arquitetura sólida. 1 bug real + melhorias de média prioridade identificadas.

---

## O que está bem implementado

- [x] Arquitetura Next.js App Router correta
- [x] Design system Tailwind aplicado consistentemente
- [x] Skip link de acessibilidade em page.tsx
- [x] `aria-label`, `aria-hidden` nos elementos corretos
- [x] `gerarUrlWhatsApp()` em todos os CTAs de WhatsApp
- [x] Server Components por padrão, `use client` apenas no Header
- [x] Fontes via next/font com variáveis CSS
- [x] Imagens reais em `/public/images/`
- [x] Dados do personal centralizados em `contato.ts`
- [x] Responsividade mobile-first com breakpoints Tailwind

---

## ❌ Bug real — Servicos.tsx (CORRIGIDO)

**Linha 74 — ariaLabel com lógica errada:**
```tsx
// ERRADO (sempre retorna 'Guinho' — condição sem sentido)
ariaLabel={`Contratar ${servico.titulo} com ${SERVICOS[0] ? 'Guinho' : ''} via WhatsApp`}

// CORRETO
ariaLabel={`Contratar ${servico.titulo} com Guinho via WhatsApp`}
```
→ **Corrigido diretamente no arquivo.**

---

## ❌ Classe Tailwind inválida — Header.tsx (CORRIGIDO)

`md:h-18` não existe na escala padrão do Tailwind (vai de h-16 para h-20).
→ **Corrigido para `md:h-20`.**

---

## ⚠️ Melhorias de média prioridade

- [ ] **Imagens com `fill` sem `sizes`** — Hero.tsx e Sobre.tsx usam `fill` sem definir a prop `sizes`. O browser pode baixar resoluções maiores que o necessário, prejudicando performance.
  - Hero: `sizes="100vw"`
  - Sobre: `sizes="(max-width: 1024px) 100vw, 50vw"`
- [ ] **`og:image` ausente** — nenhuma imagem de compartilhamento Open Graph definida no layout.tsx. Quando o site for compartilhado no WhatsApp/Facebook, aparecerá sem preview de imagem.
- [ ] **Schema JSON-LD LocalBusiness ausente** — crítico para SEO local. Responsabilidade do personal-seo-specialist.

## ⚠️ Melhorias de baixa prioridade

- [ ] Contraste de `text-secondary` (#8892A4) sobre fundo dark pode estar abaixo do mínimo WCAG AA (4.5:1) para textos em tamanho normal — verificar com ferramenta como WebAIM Contrast Checker.

---

## Checklist de Pendências

| Prioridade | Item | Status |
|---|---|---|
| 🔴 Alta | Bug ariaLabel em Servicos.tsx | ✅ Corrigido |
| 🔴 Alta | Classe `md:h-18` inválida no Header | ✅ Corrigido |
| 🔴 Alta | `totalAlunos` placeholder | ✅ Corrigido (360+) |
| 🟡 Média | `sizes` nas imagens com `fill` | ✅ Corrigido |
| 🟡 Média | `og:image` no layout.tsx | Pendente — aguarda foto OG |
| 🟡 Média | Schema JSON-LD LocalBusiness | Pendente — personal-seo-specialist |
| 🟢 Baixa | Verificar contraste text-secondary | Pendente |
