// Progressive enhancement: frosted-nav scroll state, scroll reveals, image zoom-in, stat count-up.
// No-JS or reduced-motion users get the final, fully-visible state immediately
// (we only add the hiding .reveal class when we know we can animate it back).
(function () {
  if (typeof document === 'undefined') return;   // node self-check only

  // ── Frosted nav deepens once the page scrolls ──
  const header = document.querySelector('header');
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', scrollY > 8);
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.documentElement.classList.add('js-motion');   // enables .zoom-in hidden state

  // ── Scroll reveals (staggered per batch entering the viewport) ──
  const items = document.querySelectorAll(
    '.section-tag, .section-title, .section-desc, .spotlight-head, .spotlight-points > *, ' +
    '.tile, .proj-card, .tl-item, .contact-grid > *, .proj-group-tag, .editorial-grid > *, ' +
    '.award-grid > li, .detail-list, .about-text, .cta-band > *'
  );
  items.forEach(el => el.classList.add('reveal'));
  // .zoom-in elements are hidden via .js-motion in CSS; observe them too.
  const zooms = document.querySelectorAll('.zoom-in');
  const io = new IntersectionObserver((entries, obs) => {
    let i = 0;
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      const el = e.target;
      el.style.transitionDelay = (i++ * 60) + 'ms';
      el.classList.add('in');
      // Once revealed, drop the helper classes so hover transforms/timings apply normally.
      el.addEventListener('transitionend', function done(ev) {
        if (ev.target !== el || ev.propertyName !== 'transform') return;
        el.style.transitionDelay = '';
        el.classList.remove('reveal');
        el.removeEventListener('transitionend', done);
      });
      obs.unobserve(e.target);
    }
  }, { threshold: 0.12 });
  items.forEach(el => io.observe(el));
  zooms.forEach(el => io.observe(el));

  // ── Stat count-up ──
  const statIO = new IntersectionObserver((entries, obs) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      countUp(e.target);
      obs.unobserve(e.target);
    }
  }, { threshold: 0.6 });
  document.querySelectorAll('.stat-num').forEach(el => statIO.observe(el));

  function countUp(el) {
    const raw = el.textContent.trim();
    const m = raw.match(/^([\d.]+)(.*)$/);   // number + suffix (%, +, ×)
    if (!m) return;
    const target = parseFloat(m[1]);
    const suffix = m[2];
    const decimals = (m[1].split('.')[1] || '').length;
    const dur = 1100, t0 = performance.now();
    (function tick(now) {
      const p = Math.min((now - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);   // easeOutCubic
      el.textContent = (target * eased).toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = raw;
    })(t0);
  }
})();

// ponytail: self-check — `node app.js` then call _parseStat below if needed.
// Inlined sanity for the suffix parser used above:
if (typeof module !== 'undefined') {
  const p = s => { const m = s.match(/^([\d.]+)(.*)$/); return m && [parseFloat(m[1]), m[2]]; };
  console.assert(JSON.stringify(p('86.7%')) === JSON.stringify([86.7, '%']), 'pct');
  console.assert(JSON.stringify(p('10+')) === JSON.stringify([10, '+']), 'plus');
  console.assert(JSON.stringify(p('4×')) === JSON.stringify([4, '×']), 'times');
  console.assert(JSON.stringify(p('2')) === JSON.stringify([2, '']), 'plain');
}
