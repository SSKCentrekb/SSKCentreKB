/* =========================================================
   SSK Centre: facility booking form on the website.
   Answers are sent straight to the Google Form
   "BORANG TEMPAHAN FASILITI" (nothing is stored by the website),
   so they appear in Google Forms → Responses and the linked sheet.

   IF THE GOOGLE FORM IS EDITED: question ids ("entry.…") and the
   exact option texts below must match the form, or Google rejects
   the answer. See README → "Booking form".
   Loaded after content.js (T, LANG, setLang).
   ========================================================= */
(function () {
  const ACTION =
    'https://docs.google.com/forms/d/e/1FAIpQLSdxL2nNW-_JYi-EMKfs2rCzaphW7fKmmeyt9We7tCWJ2iP8jg/formResponse';
  const WA = SSK.WA;

  /* Option values are sent to Google exactly as written in `v`; `ms`/`en` are what the visitor sees. */
  const O = (v, ms, en) => ({ v, ms: ms || v, en: en || ms || v });
  const SOURCE = [
    O('GOOGLE', 'Google'),
    O('WHATSAPP', 'WhatsApp'),
    O('FACEBOOK', 'Facebook'),
    O('TIKTOK', 'TikTok'),
    O('RAKAN SERTA KELUARGA', 'Rakan & keluarga', 'Friends & family'),
    O('DATANG SECARA TERUS (WALK-IN)', 'Datang terus (walk-in)', 'Walked in'),
  ];
  const ORG = [
    O('PERSATUAN / NGO', 'Persatuan / NGO', 'Association / NGO'),
    O('SYARIKAT / ENTERPRISE', 'Syarikat / enterprise', 'Company / enterprise'),
    O('AGENSI KERAJAAN', 'Agensi kerajaan', 'Government agency'),
    O('PARTI POLITIK', 'Parti politik', 'Political party'),
    O('JKKK / KELAB BELIA', 'JKKK / kelab belia', 'JKKK / youth club'),
    O('SEKOLAH / PIBG', 'Sekolah / PIBG', 'School / PIBG'),
    O('KUMPULAN TIDAK FORMAL', 'Kumpulan tidak formal', 'Informal group'),
    O('PERSENDIRIAN', 'Persendirian', 'Private individual'),
  ];
  const YESNO = [O('YA', 'Ya', 'Yes'), O('TIDAK', 'Tidak', 'No')];
  const FAC = [
    O('DEWAN SERBAGUNA (DEWAN SETEMU)', 'Dewan Serbaguna (Dewan Setemu)', 'Multipurpose Hall (Dewan Setemu)'),
    O(
      'BILIK MESYUARAT ( RUANG ASPIRASI)',
      'Bilik Mesyuarat (Ruang Aspirasi)',
      'Meeting Room (Ruang Aspirasi)'
    ),
    O('KAWASAN LUAR', 'Kawasan luar', 'Outdoor area'),
    O('GABUNGAN (SILA NYATAKAN DIBAWAH)', 'Gabungan (nyatakan di bawah)', 'Combination (describe below)'),
  ];
  const DUR = [
    O('PER JAM', 'Per jam', 'Hourly'),
    O('SEPARUH HARI', 'Separuh hari', 'Half day'),
    O('SEHARI PENUH', 'Sehari penuh', 'Full day'),
  ];
  const SETUP = [
    O('SETUP SENDIRI ( PERCUMA )', 'Setup sendiri (percuma)', 'Self setup (free)'),
    O(
      'SETUP OLEH SSK CENTRE HARI BEKERJA ( + RM30 )',
      'Setup oleh SSK Centre, hari bekerja (+RM30)',
      'Setup by SSK Centre, weekday (+RM30)'
    ),
    O(
      'SETUP OLEH SSK CENTRE HUJUNG MINGGU ( + RM50 )',
      'Setup oleh SSK Centre, hujung minggu (+RM50)',
      'Setup by SSK Centre, weekend (+RM50)'
    ),
  ];
  const EXTRA = [
    O('PROJEKTOR', 'Projektor', 'Projector'),
    O('SISTEM AUDIO ASAS (PA SYSTEM)', 'Sistem audio asas (PA)', 'Basic audio (PA system)'),
    O('TELEVISYEN PINTAR', 'Televisyen pintar', 'Smart TV'),
    O('PAPAN PUTIH 4X4', 'Papan putih 4x4', '4x4 whiteboard'),
    O('WIFI', 'WiFi'),
  ];
  const MEMBER = [
    O('BUKAN AHLI', 'Bukan ahli', 'Not a member'),
    O('COMMUNITY MEMBER', 'Community Member'),
    O('BUSINESS MEMBER', 'Business Member'),
    O('CORPORATE PARTNER', 'Corporate Partner'),
  ];
  const ICON = {
    'DEWAN SERBAGUNA (DEWAN SETEMU)': '<path d="M3 20h18M5 20V9l7-5 7 5v11M9 20v-5h6v5"/>',
    'BILIK MESYUARAT ( RUANG ASPIRASI)':
      '<rect x="4" y="9" width="16" height="6" rx="1.5"/><path d="M7 15v4M17 15v4M8 6h8"/>',
    'KAWASAN LUAR': '<path d="M12 3l5 8h-3l4 6H6l4-6H7z"/><path d="M12 17v4"/>',
    'GABUNGAN (SILA NYATAKAN DIBAWAH)':
      '<rect x="3" y="3" width="8" height="8" rx="2"/><rect x="13" y="13" width="8" height="8" rx="2"/><path d="M17 4v6M14 7h6"/>',
  };
  const svg = p => (p ? `<svg viewBox="0 0 24 24" aria-hidden="true">${p}</svg>` : '');
  const needsReg = v => v.org === 'PERSATUAN / NGO' || v.org === 'SYARIKAT / ENTERPRISE';

  /* page: the Google Form section each answer belongs to (used for pageHistory). */
  const STEPS = [
    {
      t: { ms: 'Maklumat anda', en: 'About you' },
      sub: {
        ms: 'Siapa yang membuat tempahan dan cara menghubungi anda.',
        en: 'Who is booking and how to reach you.',
      },
      f: [
        { k: 'email', e: 'emailAddress', type: 'email', req: 1, page: 0, l: { ms: 'Emel', en: 'Email' } },
        {
          k: 'name',
          e: 'entry.743453589',
          type: 'text',
          req: 1,
          page: 0,
          max: 80,
          l: { ms: 'Nama penuh', en: 'Full name' },
          ac: 'name',
        },
        {
          k: 'phone',
          e: 'entry.1520080417',
          type: 'tel',
          req: 1,
          page: 0,
          l: { ms: 'No. telefon', en: 'Phone number' },
          ac: 'tel',
        },
        {
          k: 'role',
          e: 'entry.71854996',
          type: 'text',
          req: 1,
          page: 0,
          max: 80,
          l: { ms: 'Jawatan / peranan dalam program', en: 'Your role in the programme' },
        },
        {
          k: 'org',
          e: 'entry.1666962233',
          type: 'select',
          req: 1,
          page: 0,
          opts: ORG,
          l: { ms: 'Jenis organisasi', en: 'Type of organisation' },
        },
        {
          k: 'orgName',
          e: 'entry.1840366556',
          type: 'text',
          page: 0,
          max: 120,
          l: { ms: 'Nama organisasi (jika berkaitan)', en: 'Organisation name (if any)' },
        },
        {
          k: 'reg',
          e: 'entry.1339672220',
          type: 'text',
          req: 1,
          page: 1,
          max: 60,
          when: needsReg,
          l: { ms: 'No. pendaftaran (SSM / ROS)', en: 'Registration no. (SSM / ROS)' },
        },
        {
          k: 'source',
          e: 'entry.716184965',
          type: 'select',
          req: 1,
          page: 0,
          opts: SOURCE,
          l: { ms: 'Bagaimana anda tahu tentang kami?', en: 'How did you hear about us?' },
        },
      ],
    },
    {
      t: { ms: 'Butiran program', en: 'Programme' },
      sub: { ms: 'Ceritakan sedikit tentang program anda.', en: 'Tell us a little about your programme.' },
      f: [
        {
          k: 'prog',
          e: 'entry.736364408',
          type: 'text',
          req: 1,
          page: 2,
          max: 120,
          l: { ms: 'Nama program', en: 'Programme name' },
        },
        {
          k: 'purpose',
          e: 'entry.228446212',
          type: 'textarea',
          req: 1,
          page: 2,
          max: 1000,
          l: { ms: 'Tujuan program', en: 'Purpose of the programme' },
        },
        {
          k: 'pax',
          e: 'entry.2070761056',
          type: 'number',
          req: 1,
          page: 2,
          l: { ms: 'Anggaran bilangan peserta', en: 'Expected number of participants' },
        },
        {
          k: 'paid',
          ui: 'seg',
          e: 'entry.1791840876',
          type: 'radio',
          req: 1,
          page: 3,
          opts: YESNO,
          l: { ms: 'Adakah peserta dikenakan bayaran?', en: 'Do participants pay a fee?' },
        },
        {
          k: 'fee',
          e: 'entry.158122457',
          type: 'text',
          req: 1,
          page: 4,
          max: 40,
          when: v => v.paid === 'YA',
          l: { ms: 'Amaun bayaran peserta (RM)', en: 'Participant fee (RM)' },
        },
        {
          k: 'sponsor',
          ui: 'seg',
          e: 'entry.2126690421',
          type: 'radio',
          req: 1,
          page: 5,
          opts: YESNO,
          l: {
            ms: 'Adakah program mempunyai penaja korporat?',
            en: 'Does the programme have a corporate sponsor?',
          },
        },
        {
          k: 'sponsorName',
          e: 'entry.128765148',
          type: 'text',
          req: 1,
          page: 6,
          max: 120,
          when: v => v.sponsor === 'YA',
          l: { ms: 'Nama penaja', en: 'Sponsor name' },
        },
      ],
    },
    {
      t: { ms: 'Tarikh & fasiliti', en: 'Date & facility' },
      sub: { ms: 'Ruang mana, bila, dan berapa lama.', en: 'Which space, when, and for how long.' },
      f: [
        {
          k: 'fac',
          ui: 'tiles',
          e: 'entry.232736349',
          type: 'radio',
          req: 1,
          page: 7,
          opts: FAC,
          l: { ms: 'Fasiliti yang diperlukan', en: 'Facility needed' },
        },
        {
          k: 'combo',
          e: 'entry.1767602659',
          type: 'text',
          req: 1,
          page: 7,
          max: 200,
          when: v => v.fac === 'GABUNGAN (SILA NYATAKAN DIBAWAH)',
          l: { ms: 'Nyatakan fasiliti gabungan', en: 'Describe the combination' },
        },
        {
          k: 'd1',
          e: 'entry.1337679079',
          type: 'date',
          req: 1,
          page: 7,
          l: { ms: 'Tarikh mula program', en: 'Start date' },
        },
        {
          k: 'd2',
          e: 'entry.74701310',
          type: 'date',
          page: 7,
          l: { ms: 'Tarikh tamat (jika lebih 1 hari)', en: 'End date (if more than 1 day)' },
        },
        {
          k: 't1',
          e: 'entry.1394259228',
          type: 'time',
          req: 1,
          page: 7,
          l: { ms: 'Masa mula', en: 'Start time' },
        },
        {
          k: 't2',
          e: 'entry.1247161885',
          type: 'time',
          req: 1,
          page: 7,
          l: { ms: 'Masa tamat', en: 'End time' },
        },
        {
          k: 'dur',
          ui: 'chips',
          e: 'entry.257744444',
          type: 'checks',
          req: 1,
          page: 7,
          opts: DUR,
          l: { ms: 'Tempoh penggunaan', en: 'Booking length' },
        },
      ],
    },
    {
      t: { ms: 'Keperluan', en: 'Requirements' },
      sub: { ms: 'Susun atur dan peralatan yang anda perlukan.', en: 'The layout and equipment you need.' },
      f: [
        {
          k: 'needs',
          e: 'entry.1365113038',
          type: 'textarea',
          req: 1,
          page: 7,
          max: 1000,
          l: {
            ms: 'Keperluan majlis (susun atur, meja, kerusi dan lain-lain)',
            en: 'Event needs (layout, tables, chairs, etc.)',
          },
        },
        {
          k: 'setup',
          ui: 'tiles',
          e: 'entry.1097869532',
          type: 'radio',
          req: 1,
          page: 7,
          opts: SETUP,
          l: { ms: 'Setup majlis', en: 'Event setup' },
        },
        {
          k: 'extra',
          ui: 'chips',
          e: 'entry.884724790',
          type: 'radio',
          req: 1,
          page: 7,
          opts: EXTRA,
          l: { ms: 'Keperluan tambahan utama (pilih satu)', en: 'Main extra equipment (pick one)' },
        },
        {
          k: 'member',
          e: 'entry.229667429',
          type: 'select',
          req: 1,
          page: 8,
          opts: MEMBER,
          l: { ms: 'Status keahlian SSK Centre', en: 'SSK Centre membership' },
        },
        {
          k: 'memberNo',
          e: 'entry.1434744216',
          type: 'text',
          page: 8,
          max: 40,
          l: { ms: 'No. keahlian (jika ada)', en: 'Membership no. (if any)' },
        },
      ],
    },
    {
      t: { ms: 'Semak & hantar', en: 'Review & send' },
      sub: {
        ms: 'Pastikan semuanya betul sebelum dihantar.',
        en: 'Make sure everything is right before sending.',
      },
      review: 1,
      f: [
        {
          k: 'agree',
          e: 'entry.1704260128',
          type: 'agree',
          req: 1,
          page: 9,
          val: 'SAH',
          l: {
            ms: 'Saya mengesahkan maklumat adalah benar dan bersetuju dengan syarat penggunaan fasiliti SSK Centre.',
            en: 'I confirm the information is true and agree to the SSK Centre facility terms of use.',
          },
        },
      ],
    },
  ];

  SSK.addStrings({
    ms: {
      bkHeadT: 'Borang Tempahan Fasiliti',
      bkChange: 'Tukar',
      bkChipNone: 'Fasiliti belum dipilih',
      bkHowT: 'Cara tempahan',
      bkHow1: 'Pilih tarikh & slot kosong dalam kalendar',
      bkHow2: 'Isi borang 5 langkah ini',
      bkHow3: 'Admin semak & hantar sebut harga dalam 1–2 hari bekerja',
      bkHow4: 'Sahkan tempahan & bayar deposit',
      bkTr1: 'Percuma untuk menghantar permohonan',
      bkTr2: 'Maklumat terus ke borang rasmi SSK Centre',
      bkTr3: 'Perlu bantuan? WhatsApp 018-243 8180',
      bkEye: 'Borang tempahan',
      bkH: 'Tempah terus<br><em>di sini.</em>',
      bkP: 'Isi borang ini untuk menempah fasiliti. Admin akan menyemak dan menghubungi anda dengan sebut harga dalam 1–2 hari bekerja.',
      bkCal: 'Semak tarikh kosong dulu',
      bkNext: 'Seterusnya',
      bkBack: 'Kembali',
      bkSend: 'Hantar tempahan',
      bkSending: 'Menghantar…',
      bkStep: 'Langkah',
      bkOf: 'daripada',
      bkReq: 'Sila lengkapkan medan yang ditanda.',
      bkEmailBad: 'Emel tidak sah.',
      bkPhoneBad: 'Nombor telefon tidak sah.',
      bkPast: 'Tarikh mula mesti selepas hari ini.',
      bkEndBefore: 'Tarikh tamat mesti selepas tarikh mula.',
      bkPax: 'Masukkan nombor yang sah.',
      bkPrivacy:
        'Maklumat anda dihantar terus ke borang tempahan rasmi SSK Centre (Google Forms) dan digunakan untuk urusan tempahan sahaja.',
      bkOkH: 'Tempahan dihantar',
      bkOkP: 'Terima kasih. Admin akan menyemak permohonan anda dan menghubungi anda dalam 1–2 hari bekerja.',
      bkOkWa: 'Maklumkan admin di WhatsApp',
      bkNew: 'Buat tempahan lain',
      bkErrH: 'Tak dapat dihantar',
      bkErrP: 'Sambungan bermasalah. Cuba lagi, atau hantar butiran melalui WhatsApp.',
      bkRetry: 'Cuba lagi',
      bkPrefill: 'Tarikh, masa dan fasiliti diisi dari kalendar. Semak sebelum hantar.',
      calFill: 'Isi borang tempahan',
      calWa: 'Tanya melalui WhatsApp',
      optional: 'pilihan',
      choose: 'Pilih…',
    },
    en: {
      bkHeadT: 'Facility Booking Form',
      bkChange: 'Change',
      bkChipNone: 'No facility chosen yet',
      bkHowT: 'How booking works',
      bkHow1: 'Pick a free date & slot in the calendar',
      bkHow2: 'Fill in this 5-step form',
      bkHow3: 'The admin reviews it & sends a quotation within 1–2 working days',
      bkHow4: 'Confirm the booking & pay the deposit',
      bkTr1: 'Sending a request is free',
      bkTr2: 'Details go straight to the official SSK Centre form',
      bkTr3: 'Need help? WhatsApp 018-243 8180',
      bkEye: 'Booking form',
      bkH: 'Book right<br><em>here.</em>',
      bkP: 'Fill in this form to book a facility. The admin will review it and contact you with a quotation within 1–2 working days.',
      bkCal: 'Check free dates first',
      bkNext: 'Next',
      bkBack: 'Back',
      bkSend: 'Send booking',
      bkSending: 'Sending…',
      bkStep: 'Step',
      bkOf: 'of',
      bkReq: 'Please complete the highlighted fields.',
      bkEmailBad: 'Invalid email.',
      bkPhoneBad: 'Invalid phone number.',
      bkPast: 'The start date must be after today.',
      bkEndBefore: 'The end date must be after the start date.',
      bkPax: 'Enter a valid number.',
      bkPrivacy:
        'Your details go straight to the official SSK Centre booking form (Google Forms) and are used for this booking only.',
      bkOkH: 'Booking sent',
      bkOkP: 'Thank you. The admin will review your request and contact you within 1–2 working days.',
      bkOkWa: 'Let the admin know on WhatsApp',
      bkNew: 'Make another booking',
      bkErrH: 'Could not send',
      bkErrP: 'There was a connection problem. Try again, or send the details on WhatsApp.',
      bkRetry: 'Try again',
      bkPrefill: 'Date, time and facility were filled in from the calendar. Please check before sending.',
      calFill: 'Fill in the booking form',
      calWa: 'Ask on WhatsApp',
      optional: 'optional',
      choose: 'Choose…',
    },
  });

  const L = () => (LANG === 'en' ? 'en' : 'ms');
  const esc = s =>
    String(s == null ? '' : s).replace(
      /[&<>"]/g,
      c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]
    );
  const box = document.getElementById('bookForm');
  if (!box) return;
  let V = { dur: [] },
    step = 0,
    state = 'form',
    prefilled = false,
    errs = {};
  // bot trap: a hidden field people never see, and a minimum time before sending
  let startedAt = 0;
  const MIN_MS = 8000;

  const visible = f => !f.when || f.when(V);
  /* ---------- field markup: one small builder per field type ---------- */
  const INPUT_TYPE = { email: 'email', tel: 'tel', number: 'number', date: 'date', time: 'time' };
  function inputAttrs(f) {
    if (f.type === 'number') return ' min="1" max="5000" inputmode="numeric"';
    if (f.type === 'tel') return ' inputmode="tel" maxlength="20"';
    if (f.type === 'date') return ` min="${tomorrow()}"`;
    if (f.type === 'email') return ' autocomplete="email"';
    return f.max ? ` maxlength="${f.max}"` : '';
  }
  function optionHTML(f, o, ctx) {
    const multi = f.type === 'checks';
    const on = multi ? (V[f.k] || []).includes(o.v) : V[f.k] === o.v;
    const icon = ctx.ui === 'tiles' && ICON[o.v] ? svg(ICON[o.v]) : '';
    return `<label class="bk-opt">
      <input type="${multi ? 'checkbox' : 'radio'}" name="${ctx.id}" data-k="${f.k}" value="${esc(o.v)}"${on ? ' checked' : ''}>
      ${icon}<span>${esc(o[ctx.l])}</span><i class="bk-tick" aria-hidden="true"></i>
    </label>`;
  }
  const FIELD = {
    textarea: (f, c) => `<label class="bk-f wide" for="${c.id}">
      <span>${c.lab}</span>
      <textarea id="${c.id}" data-k="${f.k}" rows="4" maxlength="${f.max || 1000}"${c.err}>${c.val}</textarea>${c.msg}
    </label>`,
    select: (f, c) => `<label class="bk-f" for="${c.id}">
      <span>${c.lab}</span>
      <select id="${c.id}" data-k="${f.k}"${c.err}>
        <option value="">${T[c.l].choose}</option>
        ${f.opts.map(o => `<option value="${esc(o.v)}"${V[f.k] === o.v ? ' selected' : ''}>${esc(o[c.l])}</option>`).join('')}
      </select>${c.msg}
    </label>`,
    radio: (f, c) => `<fieldset class="bk-f wide"${c.err}>
      <legend>${c.lab}</legend>
      <div class="bk-opts ui-${c.ui}">${f.opts.map(o => optionHTML(f, o, c)).join('')}</div>${c.msg}
    </fieldset>`,
    agree: (f, c) => `<label class="bk-agree">
      <input type="checkbox" data-k="${f.k}"${V[f.k] ? ' checked' : ''}${c.err}><span>${esc(f.l[c.l])}</span>
    </label>${c.msg}`,
    input: (f, c) => `<label class="bk-f" for="${c.id}">
      <span>${c.lab}</span>
      <input id="${c.id}" type="${INPUT_TYPE[f.type] || 'text'}" data-k="${f.k}" value="${c.val}"${inputAttrs(f)}${
        f.ac ? ` autocomplete="${f.ac}"` : ''
      }${c.err}>${c.msg}
    </label>`,
  };
  FIELD.checks = FIELD.radio;
  function fieldHTML(f, l) {
    const mark = f.req ? ' <i class="rq" aria-hidden="true">*</i>' : ` <small>(${T[l].optional})</small>`;
    const ctx = {
      l,
      id: 'bk_' + f.k,
      ui: f.ui || 'list',
      lab: esc(f.l[l]) + mark,
      val: esc(V[f.k]),
      err: errs[f.k] ? ' aria-invalid="true"' : '',
      msg: errs[f.k] ? `<span class="bk-err">${esc(errs[f.k])}</span>` : '',
    };
    return (FIELD[f.type] || FIELD.input)(f, ctx);
  }
  function tomorrow() {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0, 10);
  }
  function optLabel(f, v, l) {
    const o = (f.opts || []).find(x => x.v === v);
    return o ? o[l] : v;
  }
  function reviewHTML(l) {
    return STEPS.slice(0, -1)
      .map(
        s =>
          `<div class="bk-rev"><h4>${esc(s.t[l])}</h4><dl>${s.f
            .filter(visible)
            .filter(f => V[f.k] && (!Array.isArray(V[f.k]) || V[f.k].length))
            .map(
              f =>
                `<div><dt>${esc(f.l[l])}</dt><dd>${esc(Array.isArray(V[f.k]) ? V[f.k].map(v => optLabel(f, v, l)).join(', ') : f.opts ? optLabel(f, V[f.k], l) : V[f.k])}</dd></div>`
            )
            .join('')}</dl></div>`
      )
      .join('');
  }
  const MON = {
    ms: ['Jan', 'Feb', 'Mac', 'Apr', 'Mei', 'Jun', 'Jul', 'Ogo', 'Sep', 'Okt', 'Nov', 'Dis'],
    en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  };
  const fmtD = (s, l) => {
    if (!s) return '';
    const [y, m, d] = s.split('-').map(Number);
    return d + ' ' + MON[l][m - 1] + ' ' + y;
  };
  /* the "what you are booking" chip: facility · date · time, with a link back to the calendar */
  function chipHTML(l) {
    if (!V.fac && !V.d1) return '';
    const t = T[l];
    const fac = V.fac ? optLabel(STEPS[2].f[0], V.fac, l).replace(/\s*\(.*\)$/, '') : '';
    const when = [
      fmtD(V.d1, l) + (V.d2 && V.d2 !== V.d1 ? ' – ' + fmtD(V.d2, l) : ''),
      V.t1 && V.t2 ? `${V.t1}–${V.t2}` : '',
    ]
      .filter(Boolean)
      .join(' · ');
    return `<div class="bk-chip">${svg('<rect x="3" y="5" width="18" height="16" rx="2.5"/><path d="M3 10h18M8 3v4M16 3v4"/>')}<div><b>${esc(fac || t.bkChipNone)}</b><span>${esc(when)}</span></div>
    <button type="button" data-cal="${V.fac === 'BILIK MESYUARAT ( RUANG ASPIRASI)' ? 'mesyuarat' : 'dewan'}">${esc(t.bkChange)}</button></div>`;
  }
  /* ---------- card markup ---------- */
  const SHIELD = '<path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6z"/>';
  const CHECK = '<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
  const btnLink = (cls, href, text) =>
    `<a class="btn ${cls}" href="${href}" target="_blank" rel="noopener"><span>${text}</span><span class="arr">→</span></a>`;
  const btn = (cls, act, text) =>
    `<button class="btn ${cls}" type="button" data-act="${act}">${text}</button>`;

  function headHTML(l, cur) {
    const t = T[l];
    const item = (x, i) => {
      const cls = i < cur ? 'done' : i === cur ? 'on' : '';
      return `<li class="${cls}"${i === cur ? ' aria-current="step"' : ''}>
        <b>${i < cur ? '✓' : i + 1}</b><em>${esc(x.t[l])}</em>
      </li>`;
    };
    return `<div class="bk-head">
      <div class="bk-head-t"><b>${esc(t.bkHeadT)}</b><span>SSK Centre · Kota Belud</span></div>
      <ol class="bk-steps" aria-label="${esc(t.bkStep)} ${cur + 1} ${esc(t.bkOf)} ${STEPS.length}">
        ${STEPS.map(item).join('')}
      </ol>
    </div>`;
  }
  function doneHTML(l, ok) {
    const t = T[l];
    const actions = ok
      ? btnLink('btn-red', waLink(), esc(t.bkOkWa)) + btn('btn-line', 'new', esc(t.bkNew))
      : btn('btn-red', 'send', esc(t.bkRetry)) + btnLink('btn-line', waLink(), 'WhatsApp');
    return `${headHTML(l, ok ? STEPS.length : step)}
    <div class="bk-body">
      <div class="bk-done ${ok ? 'ok' : 'bad'}" tabindex="-1">
        <div class="bk-ico" aria-hidden="true">${ok ? CHECK : '!'}</div>
        <h3>${esc(ok ? t.bkOkH : t.bkErrH)}</h3>
        <p>${esc(ok ? t.bkOkP : t.bkErrP)}</p>
        ${ok ? chipHTML(l).replace(/<button[\s\S]*?<\/button>/, '') : ''}
        <div class="btns">${actions}</div>
      </div>
    </div>`;
  }
  function navHTML(t, last) {
    const back = step ? btn('btn-line', 'back', `← ${esc(t.bkBack)}`) : '<span></span>';
    const label = state === 'sending' ? t.bkSending : last ? t.bkSend : t.bkNext;
    return `<div class="bk-nav">
      ${back}
      <button class="btn btn-red" type="button" data-act="${last ? 'send' : 'next'}"${state === 'sending' ? ' disabled' : ''}>
        <span>${esc(label)}</span><span class="arr">→</span>
      </button>
    </div>`;
  }
  let lastStep = -1;
  function render() {
    const l = L(),
      t = T[l];
    if (state === 'ok' || state === 'err') {
      box.innerHTML = doneHTML(l, state === 'ok');
      lastStep = -1;
      box.querySelector('.bk-done').focus({ preventScroll: true });
      return;
    }
    const s = STEPS[step],
      last = step === STEPS.length - 1,
      anim = step !== lastStep;
    lastStep = step;
    const fields = s.f
      .filter(visible)
      .map(f => fieldHTML(f, l))
      .join('');
    box.innerHTML = `${headHTML(l, step)}
    <div class="bk-body${anim ? ' anim' : ''}">
      ${chipHTML(l)}
      <p class="bk-count">${t.bkStep} ${step + 1} ${t.bkOf} ${STEPS.length}</p>
      <h3 class="bk-title">${esc(s.t[l])}</h3>
      <p class="bk-sub">${esc(s.sub[l])}</p>
      ${prefilled && step === 2 ? `<p class="bk-note">${esc(t.bkPrefill)}</p>` : ''}
      ${s.review ? reviewHTML(l) : ''}
      <div class="bk-grid">${fields}</div>
      ${Object.keys(errs).length ? `<p class="form-err" role="alert">${esc(t.bkReq)}</p>` : ''}
      ${last ? `<p class="bk-privacy">${svg(SHIELD)}${esc(t.bkPrivacy)}</p>` : ''}
      <label class="bk-hp" aria-hidden="true">Website<input data-k="hp" tabindex="-1" autocomplete="off" value="${esc(V.hp)}"></label>
      ${navHTML(t, last)}
    </div>`;
  }
  function validate(i) {
    const l = L(),
      t = T[l];
    errs = {};
    for (const f of STEPS[i].f.filter(visible)) {
      const v = V[f.k];
      const empty = v == null || v === '' || (Array.isArray(v) && !v.length) || v === false;
      if (f.req && empty) {
        errs[f.k] = t.bkReq;
        continue;
      }
      if (empty) continue;
      if (f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) errs[f.k] = t.bkEmailBad;
      if (f.type === 'tel' && !/^[0-9+() -]{7,20}$/.test(v)) errs[f.k] = t.bkPhoneBad;
      if (f.type === 'number' && !(+v >= 1 && +v <= 5000)) errs[f.k] = t.bkPax;
      if (f.k === 'd1' && v < tomorrow()) errs[f.k] = t.bkPast;
      if (f.k === 'd2' && V.d1 && v < V.d1) errs[f.k] = t.bkEndBefore;
    }
    return !Object.keys(errs).length;
  }
  /* the Google Form sections this visitor passes through (Google checks required answers per section) */
  function pageHistory() {
    const p = [0];
    if (needsReg(V)) p.push(1);
    p.push(2, 3);
    if (V.paid === 'YA') p.push(4);
    p.push(5);
    if (V.sponsor === 'YA') p.push(6);
    p.push(7, 8, 9);
    return p.join(',');
  }
  function payload() {
    const b = new URLSearchParams();
    for (const s of STEPS)
      for (const f of s.f) {
        if (!visible(f)) continue;
        const v = V[f.k];
        if (v == null || v === '' || v === false) continue;
        if (f.type === 'date') {
          const [y, m, d] = v.split('-');
          b.append(f.e + '_year', y);
          b.append(f.e + '_month', String(+m));
          b.append(f.e + '_day', String(+d));
        } else if (f.type === 'time') {
          const [h, mi] = v.split(':');
          b.append(f.e + '_hour', h);
          b.append(f.e + '_minute', mi);
        } else if (f.type === 'checks') v.forEach(x => b.append(f.e, x));
        else if (f.type === 'agree') b.append(f.e, f.val);
        else b.append(f.e, String(v).trim());
      }
    // the form marks "fasiliti gabungan" as required even when no combination is chosen
    if (V.fac !== 'GABUNGAN (SILA NYATAKAN DIBAWAH)') b.append('entry.1767602659', 'Tiada');
    b.append('pageHistory', pageHistory());
    return b;
  }
  function waLink() {
    const l = L();
    const fac = V.fac ? optLabel(STEPS[2].f[0], V.fac, l) : '';
    const msg =
      l === 'ms'
        ? `Salam admin SSK Centre. Saya baru menghantar borang tempahan melalui website.\nNama: ${V.name || ''}\nProgram: ${V.prog || ''}\nFasiliti: ${fac}\nTarikh: ${V.d1 || ''} ${V.t1 || ''}–${V.t2 || ''}`
        : `Hi SSK Centre admin. I have just sent a booking form through the website.\nName: ${V.name || ''}\nProgramme: ${V.prog || ''}\nFacility: ${fac}\nDate: ${V.d1 || ''} ${V.t1 || ''}–${V.t2 || ''}`;
    return `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
  }
  async function send() {
    state = 'sending';
    render();
    // looks automated: show the normal success screen but send nothing
    if (V.hp || Date.now() - startedAt < MIN_MS) {
      await new Promise(r => setTimeout(r, 600));
      state = 'ok';
      render();
      return;
    }
    try {
      await fetch(ACTION, { method: 'POST', mode: 'no-cors', body: payload() });
      state = 'ok';
    } catch (e) {
      state = 'err';
    }
    render();
    scrollIntoForm();
  }
  function scrollIntoForm() {
    const sec = document.getElementById('tempah');
    if (!sec) return;
    const y = sec.getBoundingClientRect().top + scrollY - 80;
    if (window.__lenis) __lenis.scrollTo(y);
    else scrollTo({ top: y, behavior: 'smooth' });
  }

  box.addEventListener('input', e => {
    const el = e.target.closest('[data-k]');
    if (!el) return;
    const k = el.dataset.k;
    if (!startedAt) startedAt = Date.now();
    if (el.type === 'checkbox' && el.closest('.bk-opts')) {
      const set = new Set(V[k] || []);
      el.checked ? set.add(el.value) : set.delete(el.value);
      V[k] = [...set];
    } else if (el.type === 'checkbox') V[k] = el.checked;
    else V[k] = el.value;
    // fields that open/close other fields re-render the step
    if (['org', 'paid', 'sponsor', 'fac'].includes(k)) {
      delete errs[k];
      render();
    }
  });
  box.addEventListener('click', e => {
    const b = e.target.closest('[data-act]');
    if (!b) return;
    const a = b.dataset.act;
    if (a === 'next') {
      if (validate(step)) {
        step++;
        errs = {};
      }
      render();
      scrollIntoForm();
    } else if (a === 'back') {
      step--;
      errs = {};
      render();
      scrollIntoForm();
    } else if (a === 'send') {
      if (state === 'err') {
        send();
        return;
      }
      if (validate(step)) send();
      else render();
    } else if (a === 'new') {
      V = { dur: [] };
      step = 0;
      state = 'form';
      prefilled = false;
      startedAt = 0;
      render();
      scrollIntoForm();
    }
  });

  /* calendar → form: date, slot and facility arrive from the availability calendar */
  const SLOT_T = { pagi: ['08:30', '12:30'], petang: ['13:30', '17:00'], malam: ['18:00', '23:00'] };
  addEventListener('ssk:book', e => {
    const { room, date, slot } = e.detail;
    V.fac = room === 'mesyuarat' ? 'BILIK MESYUARAT ( RUANG ASPIRASI)' : 'DEWAN SERBAGUNA (DEWAN SETEMU)';
    V.d1 = date;
    if (SLOT_T[slot]) {
      V.t1 = SLOT_T[slot][0];
      V.t2 = SLOT_T[slot][1];
    }
    if (!(V.dur || []).length) V.dur = ['SEPARUH HARI'];
    prefilled = true;
    state = 'form';
    errs = {};
    // jump to the first step that still has empty required answers
    step = 0;
    while (step < 2 && validate(step)) step++;
    errs = {};
    render();
    setTimeout(scrollIntoForm, 60);
  });

  SSK.onLang(() => render());
})();
