# Placa de Avaliação para o Google

Landing page em Astro, com duas páginas:

- `/` prospecção geral
- `/clinicas` clínicas e consultórios

Textos em `src/conteudo.ts`. Animações em `src/scripts/animacoes.ts` (GSAP + ScrollTrigger + Lenis).
O QR code da arte em `public/img/placa-*.webp` abre o WhatsApp de pedido.

## Rodar

```
npm install
npm run dev
```

## Publicar

No ar em https://site-placas.vercel.app (deploy automático pela Vercel a cada push na main).

Para medir de onde vem cada visita, mande o link com UTM, por exemplo
`/clinicas?utm_source=prospeccao&utm_content=clinicas`, e ligue o Web Analytics no painel da Vercel.
