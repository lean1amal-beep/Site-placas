// Textos das duas páginas. A /clinicas reaproveita tudo da principal e troca só o que muda.
// Regra do projeto: nunca usar travessão (em dash) nos textos.

export const MARCA = 'Placa de Avaliação para o Google';
export const WHATSAPP_NUMERO = '5521967152172';
export const WHATSAPP_EXIBICAO = '(21) 96715-2172';

export const linkWhatsApp = (mensagem: string) =>
  `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`;

export type Pergunta = { p: string; r: string };

export type Conteudo = {
  seo: { title: string; description: string };
  mensagemWhatsApp: string;
  hero: { headline: string; sub: string; cta: string };
  problema: { titulo: string; texto: string; fecho: string };
  saude?: { titulo: string; itens: { titulo: string; texto: string }[] };
  faq: Pergunta[];
};

const faqBase: Pergunta[] = [
  {
    p: 'Preciso ter perfil no Google?',
    r: 'Sim, a placa leva pro seu Perfil da Empresa no Google. Se ainda não tiver, fala com a gente antes do pedido.',
  },
  {
    p: 'O cliente precisa baixar algum app?',
    r: 'Não. A câmera do celular e o NFC já vêm no aparelho.',
  },
  {
    p: 'O celular precisa estar desbloqueado?',
    r: 'Sim. Por segurança, o celular só abre o link do NFC com a tela desbloqueada. É só desbloquear e encostar na área indicada.',
  },
  {
    p: 'E se o celular não tiver NFC?',
    r: 'Ele usa o QR code. As duas opções estão na mesma placa.',
  },
  {
    p: 'Quanto tempo demora?',
    r: 'Até 10 dias úteis pra produzir, mais o prazo de envio.',
  },
  {
    p: 'Vocês enviam pra minha cidade?',
    r: 'Enviamos para todo o Brasil.',
  },
  {
    p: 'Posso mudar o design depois de aprovar?',
    r: 'A primeira rodada de ajuste está inclusa. Mudanças depois da produção são um novo pedido.',
  },
  {
    p: 'E se parar de funcionar?',
    r: 'Se parar de funcionar, você entra em contato com a gente e nós fazemos a troca sem nenhum custo adicional.',
  },
];

export const principal: Conteudo = {
  seo: {
    title: 'Placa de Avaliação para o Google com NFC e QR Code',
    description:
      'Placa personalizada com NFC e QR code que leva seu cliente direto à avaliação no Google. R$ 100, pronta em 10 dias úteis, envio para todo o Brasil.',
  },
  mensagemWhatsApp: 'Olá, vi a página da placa de avaliação e quero fazer a minha.',
  hero: {
    headline: 'Seu cliente aproxima o celular. A avaliação no Google abre na hora.',
    sub: 'Uma placa com a tecnologia do NFC e do QR code que leva o cliente direto pra tela de avaliação do seu negócio. Sem precisar procurar ou baixar nada.',
    cta: 'Quero minha placa',
  },
  problema: {
    titulo: 'Pedir novas avaliações é sempre complicado.',
    texto:
      'Abrir o celular, pesquisar o perfil no Google, abrir os comentários e só aí chegar na parte certa. Tudo isso demanda tempo e, muitas vezes, o cliente desiste de avaliar.',
    fecho:
      'Essa tecnologia resolve esse problema: o cliente faz a avaliação de forma rápida, apenas encostando o celular na área indicada, e já cai automaticamente na avaliação aberta, precisando somente avaliar o serviço.',
  },
  faq: faqBase,
};

export const clinicas: Conteudo = {
  seo: {
    title: 'Placa de Avaliação para Clínicas e Consultórios, com NFC e QR Code',
    description:
      'Placa com NFC e QR code para a recepção da sua clínica. O paciente avalia no Google em segundos. R$ 100, envio para todo o Brasil.',
  },
  mensagemWhatsApp: 'Olá, tenho uma clínica e quero a placa de avaliação pra recepção.',
  hero: {
    headline: 'A placa que transforma a recepção da sua clínica em avaliações no Google.',
    sub: 'Uma placa com NFC e QR code na recepção leva o paciente direto pra avaliação da sua clínica. O paciente avalia em segundos, sem precisar procurar nada.',
    cta: 'Quero a placa da minha clínica',
  },
  problema: {
    titulo: 'Quem escolhe uma clínica hoje começa pelo Google.',
    texto:
      'Antes de marcar, o paciente pesquisa, compara as notas e lê o que outros pacientes escreveram. O problema é que quem foi bem atendido raramente lembra de avaliar. A recepção está ocupada demais pra pedir, e o perfil fica com poucas avaliações mesmo com a agenda cheia.',
    fecho:
      'Com a placa na recepção, o paciente avalia em segundos, apenas encostando o celular.',
  },
  saude: {
    titulo: 'Feita pra ambiente de saúde.',
    itens: [
      {
        titulo: 'Aguenta limpeza frequente',
        texto: 'Acabamento que pode ser limpo com pano úmido todos os dias.',
      },
      {
        titulo: 'Visual limpo',
        texto: 'Combina com a recepção da clínica, sem poluir o ambiente.',
      },
      {
        titulo: 'Mensagem neutra',
        texto: 'Um convite simples, como "Conte como foi seu atendimento", alinhado às regras do CFM.',
      },
    ],
  },
  faq: [
    ...faqBase,
    {
      p: 'Posso oferecer um desconto pra quem avaliar?',
      r: 'Não recomendamos. O Google proíbe avaliações em troca de benefício e pode removê-las do perfil.',
    },
    {
      p: 'Funciona pra consultório individual?',
      r: 'Sim. Uma placa na mesa ou na recepção já resolve. Com mais de uma sala, a partir de 3 placas o preço cai e o design vale pra todas.',
    },
    {
      p: 'O texto da placa é permitido pelo CFM/CRO?',
      r: 'O texto padrão só convida a avaliar o atendimento, sem prometer resultado de tratamento. No personalizado, seguimos a mesma linha.',
    },
  ],
};

export const passos = [
  {
    n: '01',
    titulo: 'Desbloqueia e aproxima.',
    texto:
      'Com o celular desbloqueado, o cliente encosta na área do NFC ou aponta a câmera pro QR code.',
  },
  {
    n: '02',
    titulo: 'A tela abre sozinha.',
    texto:
      'Vai direto pra avaliação do seu perfil no Google, com a aba de comentários pronta para avaliação.',
  },
  {
    n: '03',
    titulo: 'Pronto.',
    texto: 'Ele avalia ali mesmo, sem baixar app e sem procurar nada.',
  },
];

export const detalhes = [
  { titulo: 'Acrílico transparente', texto: 'Fica bonita em qualquer ambiente e não parece improvisada.' },
  { titulo: 'Acabamento resistente', texto: 'Pode limpar com pano úmido todo dia.' },
  {
    titulo: 'NFC + QR code',
    texto: 'Quem tem NFC aproxima o celular, quem não tem aponta a câmera e abre a mesma página.',
  },
  { titulo: 'Chega configurada', texto: 'Você só tira da caixa e coloca no lugar.' },
  { titulo: 'Link reconfigurável', texto: 'Mudou o perfil? A gente ajusta na hora.' },
];

// Faixas de preço por placa. `min` é a quantidade a partir da qual a faixa vale.
export const precos = [
  { min: 1, qtd: '1 a 2', preco: 100, freteGratis: false },
  { min: 3, qtd: '3 a 4', preco: 90, freteGratis: false },
  { min: 5, qtd: '5 a 9', preco: 85, freteGratis: false },
  { min: 10, qtd: '10 ou mais', preco: 80, freteGratis: true },
];
