// Progressive enhancement: scroll reveals + telemetry-style stat count-up.
// No-JS or reduced-motion users get the final, fully-visible state immediately
// (we only add the hiding .reveal class when we know we can animate it back).
(function () {
  if (typeof document === 'undefined') return;   // node self-check only
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // ── Scroll reveals (staggered per batch entering the viewport) ──
  const items = document.querySelectorAll(
    '.section-tag, .section-title, .section-desc, .about-grid, ' +
    '.feat-card, .proj-card, .skill-cat, .tl-item, .contact-item, .proj-group-tag'
  );
  items.forEach(el => el.classList.add('reveal'));
  const io = new IntersectionObserver((entries, obs) => {
    let i = 0;
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.style.transitionDelay = (i++ * 60) + 'ms';
      e.target.classList.add('in');
      obs.unobserve(e.target);
    }
  }, { threshold: 0.12 });
  items.forEach(el => io.observe(el));

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
