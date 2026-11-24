/* =========================================================
   SSK Centre: "Selangkah ke Peluang" (programmes open now)
   and the community club sign-up form.
   Loaded after content.js (T, LANG, setLang, buildStops).

   To add a programme: copy a block in SELANGKAH, put the video
   (720p MP4) and a cover image in assets/selangkah/, and set
   `open` / `close` (yyyy-mm-dd). A card hides itself the day
   after `close`; when nothing is open the section says so.
   ========================================================= */
(function () {
  const WA = SSK.WA;
  const wa = msg => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
  const esc = s =>
    String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  const L = () => (LANG === 'en' ? 'en' : 'ms');

  const SELANGKAH = [
    {
      id: 'pibg',
      open: '2026-11-01',
      close: '2026-11-30',
      ag: { ms: 'Saluran Khas PIBG', en: 'Special PIBG channel' },
      t: { ms: 'Wishlist Penyelenggaraan Sekolah 2027', en: 'School Maintenance Wishlist 2027' },
      who: { ms: 'PIBG di sekolah anda', en: 'Your school’s PIBG (parent-teacher association)' },
      d: {
        ms: 'Bumbung bocor, tandas rosak? PIBG boleh memohon untuk kerja penyelenggaraan sekolah melalui saluran khas ini.',
        en: 'Leaking roof, broken toilets? A school’s PIBG can apply for maintenance work through this special channel.',
      },
      link: 'https://go.gov.my/wishlistpibg',
      linkLabel: 'go.gov.my/wishlistpibg',
      video: 'pibg',
    },
    {
      id: 'tubes',
      open: '2026-11-16',
      close: '2026-12-31',
      ag: { ms: 'SME Corp. Malaysia', en: 'SME Corp. Malaysia' },
      t: { ms: 'TUBE: Tunas Usahawan Belia Bumiputera', en: 'TUBE: Tunas Usahawan Belia Bumiputera' },
      amt: { ms: 'Geran sehingga RM15,000', en: 'Grant of up to RM15,000' },
      who: { ms: 'Belia Bumiputera', en: 'Bumiputera youth' },
      d: {
        ms: 'Belia hari ini, usahawan hari esok. Program TUBE-13/2027 dengan latihan, bimbingan dan geran permulaan.',
        en: 'Young today, entrepreneurs tomorrow. The TUBE-13/2027 programme with training, mentoring and a start-up grant.',
      },
      link: 'https://tube.smecorp.gov.my',
      linkLabel: 'tube.smecorp.gov.my',
      video: 'tubes',
      guide: 'panduan-tube',
    },
  ];
  SSK.addStrings({
    ms: {
      selEye: 'Selangkah ke Peluang · dibuka sekarang',
      selH: 'Peluang terkini<br><em>untuk anda.</em>',
      selP: 'Program yang sedang dibuka, diterangkan dalam video ringkas oleh SSK Centre. Perlukan bantuan memohon? Datang ke SSK Centre atau WhatsApp kami.',
      selFine: 'Tarikh dan syarat ikut pengumuman rasmi agensi. Sila semak portal rasmi sebelum memohon.',
      selApply: 'Mohon di portal',
      selWatch: 'Tonton video',
      selGuide: 'Panduan penuh (3:50)',
      selWho: 'Siapa layak',
      selOpen: 'Dibuka',
      selLeft: n => (n === 0 ? 'Tutup hari ini' : n === 1 ? 'Tutup esok' : `Tutup dalam ${n} hari`),
      selHelp: 'Bantu saya mohon',
      selNone: 'Tiada program yang dibuka buat masa ini. Ikuti @sskcentrekb untuk peluang terkini.',
      clEye: 'Keahlian kelab komuniti',
      clH: 'Jadi ahli<br><em>kelab komuniti.</em>',
      clP: 'Sertai Kelab Persatuan Hab Sehenti Sokongan Masyarakat Kota Belud dan nikmati harga istimewa setiap kali anda menggunakan fasiliti SSK Centre.',
      clTag: 'Kelab Persatuan',
      clName: 'Hab Sehenti Sokongan Masyarakat Kota Belud',
      clFee: 'yuran pendaftaran',
      clPerk: 'diskaun untuk semua fasiliti SSK Centre',
      clArea: 'Kampung / kawasan (pilihan)',
      clErr: 'Sila isi nama dan nombor telefon yang sah.',
      clSend: 'Daftar melalui WhatsApp',
      clNote:
        'Butiran anda dibuka dalam WhatsApp untuk dihantar terus kepada admin. Admin akan sahkan pendaftaran dan cara bayaran yuran.',
    },
    en: {
      selEye: 'Selangkah ke Peluang · open now',
      selH: 'The latest<br><em>opportunities.</em>',
      selP: 'Programmes open right now, explained in short videos by SSK Centre. Need help applying? Come to SSK Centre or WhatsApp us.',
      selFine:
        'Dates and terms follow the agency’s official announcement. Please check the official portal before applying.',
      selApply: 'Apply on the portal',
      selWatch: 'Watch the video',
      selGuide: 'Full guide (3:50)',
      selWho: 'Who can apply',
      selOpen: 'Open',
      selLeft: n => (n === 0 ? 'Closes today' : n === 1 ? 'Closes tomorrow' : `Closes in ${n} days`),
      selHelp: 'Help me apply',
      selNone: 'No programmes are open right now. Follow @sskcentrekb for the latest opportunities.',
      clEye: 'Community club membership',
      clH: 'Join the<br><em>community club.</em>',
      clP: 'Join the Kota Belud One-Stop Community Support Hub Association club and get a special rate every time you use SSK Centre facilities.',
      clTag: 'Association club',
      clName: 'Kota Belud One-Stop Community Support Hub',
      clFee: 'sign-up fee',
      clPerk: 'off all SSK Centre facilities',
      clArea: 'Village / area (optional)',
      clErr: 'Please enter your name and a valid phone number.',
      clSend: 'Sign up via WhatsApp',
      clNote:
        'Your details open in WhatsApp so they go straight to the admin, who will confirm your sign-up and how to pay the fee.',
    },
  });

  const MON = {
    ms: ['Jan', 'Feb', 'Mac', 'Apr', 'Mei', 'Jun', 'Jul', 'Ogo', 'Sep', 'Okt', 'Nov', 'Dis'],
    en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  };
  const day = s => {
    const [y, m, d] = s.split('-').map(Number);
    return new Date(y, m - 1, d);
  };
  const fmt = (s, l) => {
    const d = day(s);
    return d.getDate() + ' ' + MON[l][d.getMonth()] + ' ' + d.getFullYear();
  };

  function renderSel() {
    const box = document.getElementById('selGrid');
    if (!box) return;
    const l = L(),
      t = T[l],
      today = new Date();
    today.setHours(0, 0, 0, 0);
    const open = SELANGKAH.filter(p => day(p.open) <= today && day(p.close) >= today).sort((a, b) =>
      a.close.localeCompare(b.close)
    );
    if (!open.length) {
      box.innerHTML = `<p class="empty">${esc(t.selNone)}</p>`;
      return;
    }
    box.innerHTML = open
      .map(p => {
        const left = Math.round((day(p.close) - today) / 864e5);
        return `<article class="sel">
      <button class="sel-cover" data-video="${p.video}" aria-label="${esc(t.selWatch)}: ${esc(p.t[l])}">
        <img src="assets/selangkah/${p.video}.jpg" alt="" loading="lazy"><span class="sel-play" aria-hidden="true"></span>
      </button>
      <div class="sel-body">
        <div class="sel-badges"><span class="sel-left${left <= 7 ? ' soon' : ''}">${esc(t.selLeft(left))}</span><span class="sel-dates">${esc(fmt(p.open, l))} – ${esc(fmt(p.close, l))}</span></div>
        <div class="card-ag">${esc(p.ag[l])}</div>
        <h3>${esc(p.t[l])}</h3>
        ${p.amt ? `<div class="card-amt">${esc(p.amt[l])}</div>` : ''}
        <p>${esc(p.d[l])}</p>
        <dl class="sel-who"><dt>${esc(t.selWho)}</dt><dd>${esc(p.who[l])}</dd></dl>
        <div class="sel-actions">
          <a class="btn btn-red" href="${p.link}" target="_blank" rel="noopener"><span>${esc(t.selApply)}</span><span class="arr">↗</span></a>
          <button class="btn btn-line" data-video="${p.video}"><span>${esc(t.selWatch)}</span><span class="arr">▶</span></button>
        </div>
        <div class="sel-links">
          ${p.guide ? `<button class="sel-link" data-video="${p.guide}">${esc(t.selGuide)}</button>` : ''}
          <a class="sel-link" href="${wa(l === 'ms' ? `Salam admin SSK Centre, saya perlukan bantuan untuk memohon ${p.t.ms}.` : `Hi SSK Centre admin, I need help applying for ${p.t.en}.`)}" target="_blank" rel="noopener">${esc(t.selHelp)}</a>
        </div>
      </div>
    </article>`;
      })
      .join('');
  }

  /* ---------- video player ---------- */
  const vid = document.getElementById('vid'),
    vEl = document.getElementById('vidEl');
  let lastFocus = null;
  function openVid(name) {
    lastFocus = document.activeElement;
    vEl.poster = `assets/selangkah/${name}.jpg`;
    vEl.src = `assets/selangkah/${name}.mp4`;
    vid.hidden = false;
    document.documentElement.style.overflow = 'hidden';
    if (window.__lenis) __lenis.stop();
    vEl.play().catch(() => {});
    document.getElementById('vidX').focus();
  }
  function closeVid() {
    vEl.pause();
    vEl.removeAttribute('src');
    vEl.load();
    vid.hidden = true;
    document.documentElement.style.overflow = '';
    if (window.__lenis) __lenis.start();
    if (lastFocus) lastFocus.focus();
  }
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-video]');
    if (b) {
      openVid(b.dataset.video);
    }
  });
  document.getElementById('vidX').addEventListener('click', closeVid);
  vid.addEventListener('click', e => {
    if (e.target === vid) closeVid();
  });
  addEventListener('keydown', e => {
    if (e.key === 'Escape' && !vid.hidden) closeVid();
  });

  /* ---------- community club sign-up → WhatsApp ---------- */
  const cf = document.getElementById('clubForm');
  cf.addEventListener('submit', e => {
    e.preventDefault();
    const v = n => cf.elements[n].value.trim();
    const ok =
      v('name') && v('name').length <= 80 && /^[0-9+() -]{7,20}$/.test(v('phone')) && v('area').length <= 60;
    document.getElementById('clubErr').hidden = ok;
    if (!ok) return;
    const area = v('area');
    const msg =
      L() === 'ms'
        ? `Salam admin SSK Centre. Saya ingin mendaftar sebagai ahli Kelab Persatuan Hab Sehenti Sokongan Masyarakat Kota Belud (yuran RM10).\nNama: ${v('name')}\nTelefon: ${v('phone')}${area ? `\nKampung/kawasan: ${area}` : ''}`
        : `Hi SSK Centre admin. I would like to join the Kota Belud One-Stop Community Support Hub Association club (RM10 fee).\nName: ${v('name')}\nPhone: ${v('phone')}${area ? `\nVillage/area: ${area}` : ''}`;
    window.open(wa(msg), '_blank', 'noopener');
  });

  SSK.onLang(renderSel);
  if (typeof buildStops === 'function') buildStops();
})();
