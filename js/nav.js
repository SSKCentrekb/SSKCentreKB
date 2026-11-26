/* =========================================================
   Header behaviour (both pages): glass bar after scrolling,
   dropdown menus (hover, click and keyboard) and the phone
   menu with accordion sub-menus. Styles: css/nav.css.
   Loaded right after core.js.
   ========================================================= */
(function () {
  SSK.addStrings({
    ms: {
      n0: 'Profil',
      n5: 'Hubungi',
      n7: 'Aktiviti',
      n8: 'Perkhidmatan',
      n9: 'Peluang',
      navBook: 'Tempah',
      dd1: 'Ruang & perkhidmatan',
      dd1s: 'Dewan, bilik mesyuarat, CentreKafe',
      dd2: 'Kadar sewa',
      dd2s: 'Komuniti, korporat, persendirian',
      dd3: 'Borang tempahan',
      dd3s: 'Tempah terus dalam 5 langkah',
      dd4: 'Jelajah 3D',
      dd4s: 'Lihat setiap ruang dalam bangunan',
      dd5: 'Selangkah ke Peluang',
      dd5s: 'Program yang sedang dibuka',
      dd6: 'Quiz geran',
      dd6s: 'Cari geran yang sesuai dalam 5 soalan',
      dd7: 'Kursus & pembiayaan',
      dd7s: 'Senarai penuh peluang usahawan',
      dd8: 'Keahlian kelab',
      dd8s: 'RM10, diskaun 10% semua fasiliti',
    },
    en: {
      n0: 'Profile',
      n5: 'Contact',
      n7: 'Activities',
      n8: 'Services',
      n9: 'Opportunities',
      navBook: 'Book',
      dd1: 'Spaces & services',
      dd1s: 'Hall, meeting room, CentreKafe',
      dd2: 'Rental rates',
      dd2s: 'Community, corporate, private',
      dd3: 'Booking form',
      dd3s: 'Book directly in 5 steps',
      dd4: 'Explore in 3D',
      dd4s: 'See every space in the building',
      dd5: 'Selangkah ke Peluang',
      dd5s: 'Programmes open right now',
      dd6: 'Grant quiz',
      dd6s: 'Find a suitable grant in 5 questions',
      dd7: 'Courses & financing',
      dd7s: 'The full list of opportunities',
      dd8: 'Club membership',
      dd8s: 'RM10, 10% off all facilities',
    },
  });

  const nav = document.querySelector('.nav');
  const links = document.getElementById('navLinks');
  const menuBtn = document.getElementById('menuBtn');
  if (!nav || !links || !menuBtn) return;
  const dds = [...nav.querySelectorAll('.nav-dd')];
  const desktop = matchMedia('(min-width: 901px) and (hover: hover)');

  /* ---------- glass bar once the page has moved ---------- */
  let ticking = false;
  const update = () => {
    ticking = false;
    nav.classList.toggle('solid', scrollY > 30);
  };
  addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true }
  );
  update();

  /* ---------- dropdowns ---------- */
  function setOpen(dd, open) {
    dd.classList.toggle('open', open);
    dd.querySelector('.nav-dd-btn').setAttribute('aria-expanded', String(open));
  }
  const closeAll = except => dds.forEach(dd => dd !== except && setOpen(dd, false));

  dds.forEach(dd => {
    const btn = dd.querySelector('.nav-dd-btn');
    let timer;
    btn.addEventListener('click', e => {
      // On desktop the pointer already opened it on hover, so a mouse click keeps it open instead of
      // toggling it shut. Keyboard (Enter/Space: e.detail === 0) and touch still toggle.
      const hoverClick = desktop.matches && e.detail > 0;
      const open = hoverClick || !dd.classList.contains('open');
      closeAll(dd);
      setOpen(dd, open);
    });
    // desktop: open on hover, with a short grace period when the pointer leaves
    dd.addEventListener('mouseenter', () => {
      if (!desktop.matches) return;
      clearTimeout(timer);
      closeAll(dd);
      setOpen(dd, true);
    });
    dd.addEventListener('mouseleave', () => {
      if (!desktop.matches) return;
      timer = setTimeout(() => setOpen(dd, false), 180);
    });
    // keyboard: leaving the dropdown with Tab closes it
    dd.addEventListener('focusout', e => {
      if (desktop.matches && !dd.contains(e.relatedTarget)) setOpen(dd, false);
    });
  });
  document.addEventListener('click', e => {
    if (!e.target.closest('.nav-dd')) closeAll();
  });

  /* ---------- phone menu ---------- */
  function setMenu(open) {
    document.body.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    document.documentElement.style.overflow = open ? 'hidden' : '';
    if (window.__lenis) open ? __lenis.stop() : __lenis.start();
    if (!open) closeAll();
  }
  menuBtn.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
  // following any link closes the menu and the dropdowns
  links.addEventListener('click', e => {
    if (!e.target.closest('a')) return;
    closeAll();
    if (document.body.classList.contains('menu-open')) setMenu(false);
  });
  addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    const open = dds.find(dd => dd.classList.contains('open'));
    if (open) {
      setOpen(open, false);
      open.querySelector('.nav-dd-btn').focus();
    } else if (document.body.classList.contains('menu-open')) {
      setMenu(false);
      menuBtn.focus();
    }
  });
  // rotating a tablet into desktop width while the menu is open
  desktop.addEventListener('change', () => document.body.classList.contains('menu-open') && setMenu(false));
})();
