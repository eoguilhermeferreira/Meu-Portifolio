(function () {
  var root = document.documentElement;
  root.classList.add('js');

  // Ajusta a palavra gigante para ocupar exatamente a largura do hero
  var word = document.querySelector('.hero-word');
  var fit = word && word.querySelector('.fit');
  function fitWord() {
    if (!fit) return;
    fit.style.fontSize = '100px';
    var w = fit.getBoundingClientRect().width;
    var target = word.clientWidth;
    if (w > 0) fit.style.fontSize = (100 * target / w * 0.995) + 'px';
  }
  var rt;
  window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(fitWord, 80); });
  fitWord();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitWord);

  // Entrada do hero
  function start() { requestAnimationFrame(function () { root.classList.add('loaded'); }); }
  if (document.readyState === 'complete') start(); else window.addEventListener('load', start);
  setTimeout(start, 1500); // garantia caso alguma fonte/imagem demore

  // Barra superior ao rolar
  var bar = document.querySelector('.topbar');
  function onScroll() { bar.classList.toggle('scrolled', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Revelar elementos ao rolar
  var items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  // Pequeno atraso em cascata para itens de grade
  items.forEach(function (el) {
    var p = el.parentElement, sibs = p ? Array.prototype.filter.call(p.children, function (c) { return c.classList.contains('reveal'); }) : [];
    var i = sibs.indexOf(el);
    if (i > 0) el.style.transitionDelay = Math.min(i, 5) * 80 + 'ms';
    io.observe(el);
  });
})();
