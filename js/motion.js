/* =========================================================
   Motion (home page): hero intro on load, hero parallax while
   scrolling, and scroll reveals. Styles: css/motion.css.
   Does nothing when the visitor has asked for reduced motion.
   Loaded after the other scripts.
   ========================================================= */
(function () {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const root = document.documentElement;
  root.classList.add('mo');

  /* ---------- headings: wrap every word in a mask ---------- */
  // Headings come from the language engine (data-i18n-html), which rewrites them on every language
  // change, so they are wrapped again after each change.
  const HEADS = '.pf-title, .content .h2';
  function wrapWords(el) {
    if (el.querySelector('.mw')) return;
    let i = 0;
    const walk = node => {
      [...node.childNodes].forEach(n => {
        if (n.nodeType === 3) {
          const parts = n.textContent.split(/(\s+)/);
          const frag = document.createDocumentFragment();
          parts.forEach(p => {
            if (!p) return;
            if (/^\s+$/.test(p)) return frag.append(p);
            const mw = document.createElement('span');
            const inner = document.createElement('span');
            mw.className = 'mw';
            inner.textContent = p;
            inner.style.setProperty('--i', i++);
            mw.append(inner);
            frag.append(mw);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
      });
    };
    walk(el);
  }
  SSK.onLang(() => document.querySelectorAll(HEADS).forEach(wrapWords));

  /* ---------- hero intro ---------- */
  const start = () =>
    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add('mo-ready')));
  const first = document.querySelector('.pf-slides img');
  if (first && !first.complete) {
    first.addEventListener('load', start, { once: true });
    first.addEventListener('error', start, { once: true });
    setTimeout(start, 1500); // never wait long for a slow photo
  } else start();

  /* ---------- hero parallax while scrolling ---------- */
  const stage = document.querySelector('.pf-stage');
  if (stage) {
    let tick = false;
    let last = -1;
    const paint = () => {
      tick = false;
      const h = stage.offsetHeight || 1;
      const p = Math.min(1, Math.max(0, scrollY / h));
      if (p === last) return;
      last = p;
      stage.style.setProperty('--hp', p.toFixed(3));
    };
    addEventListener(
      'scroll',
      () => {
        if (!tick && scrollY < innerHeight * 1.6) {
          tick = true;
          requestAnimationFrame(paint);
        }
      },
      { passive: true }
    );
    paint();
  }

  /* ---------- scroll reveals ---------- */
  const tag = (sel, cls) => document.querySelectorAll(sel).forEach(el => el.classList.add(cls));
  tag(
    '.content .sec .eyebrow, .content .sec .lead, .content .sec .fine, .pf-prose p:not([data-words]), .sec-head > .btn, .pf-facts, .pf-visi, .pf-speech blockquote, .pf-sign, .pf-proof',
    'rv'
  );
  tag('.svc-img, .pf-speech > img', 'rv-img');
  tag(
    '.svc-grid, .pf-stats, .pf-misi, .pf-obj, .pf-chips, .pf-areas, #aktPreview, .tiers, .sel-grid',
    'rv-grid'
  );

  const counters = [...document.querySelectorAll('.pf-stats dt')];
  function count(dt) {
    const m = dt.textContent.match(/^(\d+)(.*)$/);
    if (!m) return;
    const end = +m[1];
    const t0 = performance.now();
    const step = now => {
      const k = Math.min(1, (now - t0) / 1400);
      dt.textContent = Math.round(end * (1 - Math.pow(1 - k, 3))) + m[2];
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const io = new IntersectionObserver(
    entries =>
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        // a fully clipped photo never counts as visible, so photos are watched through their parent
        const el = e.target.classList.contains('rv-img-watch')
          ? e.target.querySelector(':scope > .rv-img')
          : e.target;
        if (el.classList.contains('rv-grid'))
          [...el.children].forEach((c, i) => c.style.setProperty('--i', i));
        el.classList.add('in');
        if (el.classList.contains('pf-stats')) counters.forEach(count);
        io.unobserve(e.target);
      }),
    { rootMargin: '0px 0px -4% 0px', threshold: 0.05 }
  );
  document.querySelectorAll('.rv, .rv-grid, .content .h2').forEach(el => io.observe(el));
  document.querySelectorAll('.rv-img').forEach(el => {
    el.parentElement.classList.add('rv-img-watch');
    io.observe(el.parentElement);
  });
})();
