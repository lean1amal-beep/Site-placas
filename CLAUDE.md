# Placa de Avaliação para o Google: regras do projeto

- Responder ao Leandro em português do Brasil, simples e direto.
- **Mobile first, sempre.** O celular tem prioridade em tudo: desenhar e testar primeiro em ~390px, depois adaptar para o computador. A maioria das visitas vem de link aberto no celular.
- Nunca usar travessão (em dash) em nenhum texto, nem na copy.
- Visual premium, "bem Apple": preto, muito respiro, cor só no G, nas estrelas e nas faixas.
- Não citar a Clintia. Não afirmar afiliação com o Google. Não inventar números ou depoimentos.
- Página /clinicas: nunca usar "clínica popular"; nada de promessa de resultado (CFM/CRO).

## Decisões
- Headline da principal: opção b, "Seu cliente aproxima o celular. A avaliação no Google abre na hora." (17/10)
- Preços por placa: 1 a 2 R$ 100 · 3 a 4 R$ 90 · 5 a 9 R$ 85 · 10+ R$ 80 com frete grátis (17/10)
- QR da arte no site abre o WhatsApp de pedido.
- Fotos: editoriais de fundo preto no produto e formatos; placas recortadas (sem fundo) nos modelos; fotos reais aproximadas na faixa "Já em uso".
- Seção "O problema" da principal com a copy do Leandro ("Pedir novas avaliações é sempre complicado."). (17/10)
- Deixar claro que o celular precisa estar desbloqueado: passo 1 "Desbloqueia e aproxima.", pergunta no FAQ e o celular da animação começa na tela inicial, não na tela de bloqueio. (17/10)
- Hero sem os raios de luz (Leandro não gostou). (17/10)
- Barra do topo sem a estrelinha amarela: só o nome "Placa de Avaliação". (17/10)
- Sem estrelas decorativas (topo, ícone da aba e chamada final). Só ficam as estrelas que fazem parte da placa e da avaliação na animação. (17/10)
- Logo: placa em L vista de lado com um G branco simples no meio (versão B, escolhida pelo Leandro; ele foi avisado do risco de marca e preferiu essa). Arquivos `src/components/Logo.astro` e `public/favicon.svg`. (17/10)
- Cena do "Como funciona" com a dica "Deslize para baixo" (com setinha animada) até a avaliação ser publicada. (17/10)

## Segurança (checklist revisado em 17/10)
O site é estático: sem login, sem banco, sem formulário, sem chave de API. Cuidados que ficam valendo:
- `vercel.json` manda os cabeçalhos de segurança (CSP só com arquivos do próprio site, sem iframe, sem script embutido). Não usar `<script>` inline nem `<style>` inline em HTML: a CSP bloqueia. Script que precisa rodar cedo vai em `public/` (ex.: `public/inicio.js`).
- Nunca colocar senha, token ou chave no código. Repositório é público.
- **Calculadora de frete (Melhor Envio), quando entrar:** chave só como variável de ambiente na Vercel; chamada feita por uma rota de servidor (`/api/frete`), nunca do navegador; validar no servidor que o CEP tem 8 dígitos e a quantidade é de 1 a 50; limite de tentativas por IP; resposta de erro genérica ("Não foi possível calcular o frete agora") sem detalhes técnicos; liberar o domínio da rota no `connect-src` da CSP só se precisar.
