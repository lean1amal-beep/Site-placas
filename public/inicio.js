// Roda antes da página aparecer: marca que há JavaScript e se a pessoa pediu menos movimento.
document.documentElement.classList.add('js');
if (matchMedia('(prefers-reduced-motion: reduce)').matches)
  document.documentElement.classList.add('rm');
