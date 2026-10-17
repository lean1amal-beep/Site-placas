import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const $ = <T extends Element = HTMLElement>(s: string, raiz: ParentNode = document) =>
  raiz.querySelector(s) as T | null;
const $$ = <T extends Element = HTMLElement>(s: string, raiz: ParentNode = document) =>
  Array.from(raiz.querySelectorAll(s)) as T[];

export function iniciar() {
  const reduzido = document.documentElement.classList.contains('rm');

  navegacao();
  pedido();

  if (reduzido) {
    const cena = $('.cena');
    cena?.setAttribute('data-etapa', '2');
    return;
  }

  const lenis = new Lenis({ lerp: 0.11, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  // Links internos (#como-funciona) passam pelo Lenis
  $$<HTMLAnchorElement>('a[href^="#"]').forEach((a) =>
    a.addEventListener('click', (e) => {
      const alvo = $(a.getAttribute('href')!);
      if (!alvo) return;
      e.preventDefault();
      lenis.scrollTo(alvo as HTMLElement, { duration: 1.4 });
    }),
  );

  hero();
  problema();
  cena();
  revelacoes();
  final();

  // Fontes e imagens mudam alturas: recalcula os gatilhos quando tudo carregar
  window.addEventListener('load', () => ScrollTrigger.refresh());
}

function navegacao() {
  const nav = $('.nav');
  const flutuante = $('.flutuante');
  const hero = $('.hero');
  const atualizar = () => {
    const y = window.scrollY;
    nav?.classList.toggle('nav--rolou', y > 24);
    const limite = hero ? hero.offsetHeight * 0.7 : 400;
    flutuante?.classList.toggle('flutuante--on', y > limite);
  };
  atualizar();
  window.addEventListener('scroll', atualizar, { passive: true });
}

/* Hero: frase surge palavra por palavra e a placa sai do escuro com a luz correndo na borda */
function hero() {
  const placa = $('.placa--hero');
  const corpo = placa ? $('.placa__corpo', placa) : null;
  const palavras = $$('.hero__titulo .pal');

  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
  tl.fromTo(
    palavras,
    { opacity: 0, yPercent: 60, filter: 'blur(10px)' },
    { opacity: 1, yPercent: 0, filter: 'blur(0px)', duration: 1.3, stagger: 0.055 },
    0.15,
  );

  if (placa && corpo) {
    tl.fromTo('.hero__raios', { opacity: 0 }, { opacity: 1, duration: 3, ease: 'power1.inOut' }, 0.2)
      .fromTo(placa, { opacity: 0 }, { opacity: 1, duration: 1.2, ease: 'power2.out' }, 0.35)
      .fromTo(
        $('.placa__folha', placa),
        { filter: 'brightness(0)' },
        { filter: 'brightness(1)', duration: 2.4, ease: 'power2.out', clearProps: 'filter' },
        0.35,
      )
      .fromTo(
      corpo,
      { rotateY: -48, rotateX: 14, z: -260, yPercent: 8 },
      { rotateY: -22, rotateX: 6, z: 0, yPercent: 0, duration: 2.8 },
      0.35,
    ).fromTo(
      placa,
      { '--brilho': '100%' },
      { '--brilho': '0%', duration: 2.6, ease: 'power2.inOut' },
      0.9,
    );

    // Flutuação suave contínua
    gsap.to(corpo, {
      y: -10,
      duration: 3.2,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: 2.6,
    });

    // Segue o mouse de leve (só em quem tem mouse)
    if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
      const rx = gsap.quickTo(placa, 'rotateX', { duration: 1.2, ease: 'power3.out' });
      const ry = gsap.quickTo(placa, 'rotateY', { duration: 1.2, ease: 'power3.out' });
      window.addEventListener('pointermove', (e) => {
        const nx = e.clientX / innerWidth - 0.5;
        const ny = e.clientY / innerHeight - 0.5;
        ry(nx * 16);
        rx(-ny * 10);
      });
    }

    // Ao rolar, a placa gira e se afasta
    gsap.to($('.hero__placa-wrap'), {
      rotateY: 30,
      yPercent: -12,
      scale: 0.86,
      opacity: 0,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    });
  }

  tl.fromTo(
    $$('.hero .surge'),
    { opacity: 0, y: 24 },
    { opacity: 1, y: 0, duration: 1.2, stagger: 0.12 },
    0.9,
  );

  gsap.to('.hero__texto', {
    yPercent: -18,
    opacity: 0,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: '30% top', end: 'bottom top', scrub: true },
  });
}

/* Problema: as palavras acendem conforme o scroll */
function problema() {
  const spans = $$('[data-acende] span');
  if (!spans.length) return;
  ScrollTrigger.create({
    trigger: '[data-acende]',
    start: 'top 82%',
    end: 'bottom 45%',
    scrub: true,
    onUpdate: (st) => {
      const total = spans.length;
      const p = st.progress * (total + 4);
      spans.forEach((s, i) => {
        const o = gsap.utils.clamp(0.16, 1, 0.16 + (p - i) * 0.28);
        s.style.setProperty('--o', String(o));
      });
    },
  });
}

/* Cena presa: placa gira, celular encosta, ondas de NFC, estrelas acendem */
function cena() {
  const secao = $('.cena');
  if (!secao) return;
  const titulo = $('.cena__titulo', secao);
  const mundo = $('.cena__mundo', secao);
  const corpo = $('.placa__corpo', secao);
  const brilho = $('.placa', secao);
  const alvoQr = $('.placa__alvo--qr', secao);
  const alvoNfc = $('.placa__alvo--nfc', secao);
  const cel = $('.cena__cel', secao);
  const bloqueio = $('.cel__bloqueio', secao);
  const aviso = $('.cel__aviso', secao);
  const folha = $('.cel__folha', secao);
  const estrelas = $$('.cel__estrela', secao);
  const ok = $('.cel__ok', secao);
  const passos = $('.cena__passos', secao);
  const movel = matchMedia('(max-width: 900px)').matches;

  secao.dataset.etapa = '-1';

  const tl = gsap.timeline({
    defaults: { ease: 'power2.inOut' },
    scrollTrigger: {
      trigger: secao,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.8,
      onUpdate: (st) => {
        const p = st.progress;
        const etapa = p < 0.14 ? -1 : p < 0.36 ? 0 : p < 0.62 ? 1 : 2;
        if (secao.dataset.etapa !== String(etapa)) secao.dataset.etapa = String(etapa);
        secao.classList.toggle('cena--nfc', p > 0.38 && p < 0.6);
      },
    },
  });

  // 0 a 1: a cena já começa com o título e a placa de lado (nada de tela vazia)
  tl.set(passos, { opacity: 1 })
    .fromTo(titulo, { opacity: 1, y: 0 }, { opacity: 1, y: 0, duration: 0.6 }, 0)
    .fromTo(mundo, { scale: 0.7, yPercent: 22 }, { scale: 0.74, yPercent: 20, duration: 0.8 }, 0)
    .fromTo(corpo, { rotateY: 38, rotateX: 10 }, { rotateY: 30, rotateX: 8, duration: 0.8 }, 0)
    // 1 a 2.4: título sai, placa vira de frente
    .to(titulo, { opacity: 0, y: -30, filter: 'blur(10px)', duration: 0.7 }, 1)
    .to(mundo, { scale: 1, yPercent: 0, duration: 1.4 }, 1)
    .to(corpo, { rotateY: -14, rotateX: 6, duration: 1.4 }, 1)
    .fromTo(brilho, { '--brilho': '100%' }, { '--brilho': '0%', duration: 1.4 }, 1)
    // 2.4 a 3.2: destaca QR e NFC
    .to([alvoQr, alvoNfc], { opacity: 1, duration: 0.35, stagger: 0.15 }, 2.4)
    .to(alvoQr, { opacity: 0, duration: 0.35 }, 3.1)
    .to(corpo, { rotateY: 0, rotateX: 2, duration: 1 }, 2.6)
    // 3.4 a 4.6: celular entra e encosta no NFC
    .fromTo(
      cel,
      { x: movel ? '60%' : '120%', y: '90%', rotate: 22, z: 140, opacity: 0 },
      { x: movel ? '-6%' : '-4%', y: '0%', rotate: -10, z: 70, opacity: 1, duration: 1.2, ease: 'power3.out' },
      3.4,
    )
    .to(alvoNfc, { opacity: 0, duration: 0.3 }, 4.4)
    .to(mundo, { x: movel ? '-12%' : '-10%', duration: 1.2 }, 3.4)
    // 4.6 a 5.6: aviso de NFC e a tela de avaliação sobe
    .fromTo(aviso, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.35 }, 4.5)
    .to(aviso, { opacity: 0, y: -10, duration: 0.3 }, 5.1)
    .to(bloqueio, { opacity: 0, duration: 0.4 }, 5)
    .fromTo(folha, { y: 0, yPercent: 105 }, { y: 0, yPercent: 0, duration: 0.7, ease: 'power3.out' }, 5.1)
    // 6 a 8: estrelas acendem uma a uma
    .add(() => {}, 6);

  estrelas.forEach((e, i) => {
    const t = 6.1 + i * 0.32;
    tl.fromTo(e, { '--cheia': 0 }, { '--cheia': 1, duration: 0.25, ease: 'none' }, t).fromTo(
      e,
      { '--pulo': 0 },
      { '--pulo': 1, duration: 0.14, ease: 'power2.out', yoyo: true, repeat: 1 },
      t,
    );
  });

  tl.fromTo(ok, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.45 }, 8.1)
    .to(cel, { y: '-3%', duration: 0.6 }, 8.1)
    .to({}, { duration: 0.8 }); // segura a cena um pouco antes de soltar
}

/* Revelações suaves nas seções seguintes */
function revelacoes() {
  ScrollTrigger.batch('.surge-scroll', {
    start: 'top 88%',
    once: true,
    onEnter: (els) =>
      gsap.fromTo(
        els,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.08, overwrite: true },
      ),
  });

  // Vitrine de modelos: as placas sobem em leque
  const modelos = $$('.modelo img');
  if (modelos.length) {
    gsap.fromTo(
      modelos,
      { yPercent: 14, rotate: (i) => [-4, 0, 4][i] ?? 0 },
      {
        yPercent: 0,
        rotate: 0,
        ease: 'none',
        scrollTrigger: { trigger: '.modelos__vitrine', start: 'top bottom', end: 'center center', scrub: true },
      },
    );
  }
}

/* CTA final: estrelas acendem em sequência */
function final() {
  const estrelas = $$('.final__estrelas svg');
  if (!estrelas.length) return;
  gsap.fromTo(
    estrelas,
    { opacity: 0.15, scale: 0.6 },
    {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: 'back.out(3)',
      stagger: 0.12,
      scrollTrigger: { trigger: '.final__estrelas', start: 'top 85%', once: true },
    },
  );
}

/* Preços: escolhe a quantidade e vê preço por placa, total e frete */
function pedido() {
  const raiz = $('[data-pedido]');
  if (!raiz) return;
  type Faixa = { min: number; qtd: string; preco: number; freteGratis: boolean };
  const faixas: Faixa[] = JSON.parse(raiz.dataset.faixas || '[]');
  const msg = raiz.dataset.msg || '';
  const num = $('#qtd-num', raiz)!;
  const barra = $<HTMLInputElement>('#qtd-barra', raiz)!;
  const menos = $<HTMLButtonElement>('[data-menos]', raiz)!;
  const mais = $<HTMLButtonElement>('[data-mais]', raiz)!;
  const unit = $('[data-unit]', raiz)!;
  const total = $('[data-total]', raiz)!;
  const dica = $('[data-dica]', raiz)!;
  const frete = $('[data-frete]', raiz)!;
  const cta = $<HTMLAnchorElement>('[data-cta]', raiz)!;
  const linhas = $$('[data-faixa]', raiz);
  const max = Number(barra.max);
  const reais = (v: number) => v.toLocaleString('pt-BR');

  const faixaDe = (q: number) => {
    let i = 0;
    faixas.forEach((f, k) => q >= f.min && (i = k));
    return i;
  };

  const mostrar = (q: number) => {
    q = Math.min(max, Math.max(1, q));
    const i = faixaDe(q);
    const f = faixas[i];
    num.textContent = q === max ? `${q}+` : String(q);
    barra.value = String(q);
    barra.style.setProperty('--p', `${((q - 1) / (max - 1)) * 100}%`);
    menos.disabled = q <= 1;
    mais.disabled = q >= max;
    unit.textContent = reais(f.preco);
    total.textContent = reais(f.preco * q);
    linhas.forEach((l, k) => l.classList.toggle('faixa--ativa', k === i));

    const prox = faixas[i + 1];
    const economia = (faixas[0].preco - f.preco) * q;
    if (prox) {
      const faltam = prox.min - q;
      dica.innerHTML = `Com mais ${faltam} ${faltam === 1 ? 'placa' : 'placas'}, cada uma sai por <b>R$ ${reais(prox.preco)}</b>${prox.freteGratis ? ' e o frete é grátis' : ''}.`;
    } else {
      dica.innerHTML = `Você economiza <b>R$ ${reais(economia)}</b> no total.`;
    }
    if (prox && economia > 0) dica.innerHTML = `Economia de <b>R$ ${reais(economia)}</b>. ` + dica.innerHTML;

    frete.textContent = f.freteGratis ? 'Frete grátis para todo o Brasil.' : 'Frete à parte, combinado no WhatsApp.';
    frete.classList.toggle('pedido__frete--gratis', f.freteGratis);

    const pedidoTxt = q === 1 ? 'Quero 1 placa.' : q >= max ? `Quero ${max} placas ou mais.` : `Quero ${q} placas.`;
    cta.href = cta.href.replace(/\?text=.*$/, '?text=' + encodeURIComponent(`${msg} ${pedidoTxt}`));
  };

  menos.addEventListener('click', () => mostrar(Number(barra.value) - 1));
  mais.addEventListener('click', () => mostrar(Number(barra.value) + 1));
  barra.addEventListener('input', () => mostrar(Number(barra.value)));
  linhas.forEach((l, k) => {
    l.addEventListener('click', () => mostrar(faixas[k].min));
  });
  mostrar(1);
}
