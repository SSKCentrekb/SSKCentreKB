/* =========================================================
   SSK Centre core: shared settings and the language engine.
   Load this FIRST on every page; every other script uses it.

   Modules add their text with
     SSK.addStrings({ ms: {...}, en: {...} })
   and re-render on language change with
     SSK.onLang(lang => ...)
   Both re-apply the current language right after the calling
   script finishes, so the order the modules load in does not
   matter and no element is ever left showing "undefined".
   Elements use data-i18n="key" (plain text) or
   data-i18n-html="key" (text with <br>/<em>).
   ========================================================= */
(function () {
  const strings = { ms: {}, en: {} };
  const hooks = [];
  let lang = 'ms';
  try {
    const saved = localStorage.getItem('ssk-lang');
    if (saved === 'ms' || saved === 'en') lang = saved;
  } catch (e) {}

  function apply() {
    const dict = strings[lang];
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const v = dict[el.dataset.i18n];
      if (typeof v === 'string') el.textContent = v;
    });
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const v = dict[el.dataset.i18nHtml];
      if (typeof v === 'string') el.innerHTML = v;
    });
    document
      .querySelectorAll('.lang button[data-lang]')
      .forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    hooks.forEach(fn => fn(lang));
  }

  // several modules register in a row: apply once after the current script
  let queued = false;
  function schedule() {
    if (queued) return;
    queued = true;
    queueMicrotask(() => {
      queued = false;
      apply();
    });
  }

  const SSK = {
    /** Admin WhatsApp number for every script (wa.me links written in the HTML are separate). */
    WA: '60182438180',
    strings,
    get lang() {
      return lang;
    },
    addStrings(add) {
      Object.assign(strings.ms, add.ms || {});
      Object.assign(strings.en, add.en || {});
      schedule();
    },
    onLang(fn) {
      hooks.push(fn);
      schedule();
    },
    setLang(l) {
      if (l !== 'ms' && l !== 'en') return;
      lang = l;
      try {
        localStorage.setItem('ssk-lang', l);
      } catch (e) {}
      apply();
    },
  };
  window.SSK = SSK;

  document.addEventListener('click', e => {
    const b = e.target.closest('.lang button[data-lang]');
    if (b) SSK.setLang(b.dataset.lang);
  });

  // Names the page scripts were written with: T[lang][key], LANG, setLang(), SSK_WA.
  window.T = strings;
  window.setLang = SSK.setLang;
  window.SSK_WA = SSK.WA;
  Object.defineProperty(window, 'LANG', { get: () => lang });
})();
