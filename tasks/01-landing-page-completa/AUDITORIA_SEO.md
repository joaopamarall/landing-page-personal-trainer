# AUDITORIA DE SEO — Landing Page Guinho Vagner

**Agent:** personal-seo-specialist
**Status geral:** ⚠️ Base técnica boa, mas itens críticos de SEO local ausentes.

---

## ✅ Implementado Corretamente

- [x] `lang="pt-BR"` no `<html>`
- [x] `metadataBase` com domínio correto
- [x] `alternates.canonical` definido
- [x] `robots: { index: true, follow: true }`
- [x] `openGraph` com type, title, description, url, locale, siteName
- [x] Fontes com `display: 'swap'` (previne LCP alto)
- [x] Imagem hero com `priority` (preload automático)
- [x] Alt texts com palavras-chave geolocalizadas
- [x] Hierarquia H1/H2/H3 correta (1 H1 na página)
- [x] Sitemap configurado via next-sitemap
- [x] robots.txt gerado automaticamente

---

## ❌ Faltando — Alta Prioridade (CORRIGIDOS)

- [x] **Schema LocalBusiness JSON-LD** — implementado no layout.tsx
- [x] **Schema Person JSON-LD** — implementado no layout.tsx
- [x] **Schema Service JSON-LD** — implementado no layout.tsx
- [x] **`openGraph.images`** — adicionado ao metadata
- [x] **Twitter Card** — adicionado ao metadata

---

## ⚠️ Pendências

### Alta prioridade

- [ ] **Criar `public/images/og-image.jpg`** (1200×630px) — imagem de compartilhamento para WhatsApp/Facebook. Sugestão: foto do Guinho + nome + "Personal Trainer em Piraquara/PR" com fundo dark e accent neon.
- [ ] **Registrar no Google Search Console** — submeter sitemap após domínio propagar
- [ ] **Criar/reclamar perfil no Google Meu Negócio** — essencial para SEO local em Piraquara

### Média prioridade

- [ ] Title tag: 65 caracteres (máximo recomendado: 60) — Google pode truncar. Reduzir para: `"Guinho Vagner — Personal Trainer em Piraquara/PR"`
- [ ] Meta description: 187 caracteres (máximo: 160) — será truncada na SERP. Encurtar e adicionar CTA no final.

### Baixa prioridade

- [ ] Configurar Google Analytics 4 após lançamento
- [ ] Testar no Google Rich Results Test após implementar schemas
- [ ] Solicitar avaliações de alunos no Google Meu Negócio
