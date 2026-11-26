/* ================= i18n (engine in core.js) ================= */
SSK.addStrings({
  ms: {
    navcta: 'WhatsApp admin',
    rail1: 'Dewan',
    rail2: 'Mesyuarat',
    rail4: 'Lain-lain',
    rail5: 'Datang',
    intro:
      'Satu ruang untuk seluruh komuniti Kota Belud: dewan, bilik mesyuarat, CentreKafe, dan panduan geran untuk usahawan.',
    cue: 'Skrol untuk masuk',
    rent: 'Boleh disewa',
    public: 'Terbuka untuk umum',
    ppl: 'orang',
    perhr: 'sejam · komuniti',
    perday: 'sehari · komuniti',
    dewanH: 'Dewan<br><em>Serbaguna</em>',
    dewanP:
      'Seminar, majlis dan acara komuniti. Kadar korporat dan deposit disahkan oleh admin semasa tempahan.',
    checkDates: 'Semak tarikh & tempah',
    mesH: 'Bilik<br><em>Mesyuarat</em>',
    mesP: 'Mesyuarat, latihan dan sesi perbincangan. Ahli Business dapat 2 jam percuma setiap bulan.',
    bookRoom: 'Tempah bilik',
    member: 'Lihat keahlian',
    kafeP:
      'Kafe di dalam SSK Centre. Singgah sebelum atau selepas program, atau sambung berbincang selepas mesyuarat.',
    kafeCta: 'Lihat waktu buka',
    also: 'Dan juga',
    m1: 'Surau',
    m1s: 'Kemudahan',
    m2: 'Kaunter Reception',
    m2s: 'Pertanyaan',
    m3: 'Pejabat SSK',
    m3s: 'Kakitangan',
    m4: 'Tandas & Stor',
    m4s: 'Kemudahan',
    m5: 'Dapur & Stor',
    m5s: 'Kakitangan',
    tab1: 'Dewan',
    tab2: 'Bilik Mesyuarat',
    tab4: 'Lain-lain',
    exHint: 'Klik bilik pada bangunan',
    finalH: 'Cari<br><em>kami.</em>',
    finEye: 'Lokasi',
    finMap: 'Buka di Google Maps',
    finCall: 'Telefon',
    days: 'Isnin – Jumaat',
    wa: 'WhatsApp admin',
    grant: 'Cari geran yang sesuai',
    proto: 'Prototype',
    calEye: 'Ketersediaan ruang',
    calDemo: 'Prototaip: tarikh di bawah ialah contoh, belum disambung ke rekod tempahan sebenar.',
    lgFree: 'Kosong',
    lgPart: 'Separa',
    lgFull: 'Penuh',
    lgClosed: 'Sudah lepas',
    pickDay: 'Pilih tarikh untuk lihat slot.',
    sendReq: 'Hantar permintaan tempahan',
    calNote:
      'Permintaan dihantar ke WhatsApp admin. Tempahan disahkan dalam 24 jam waktu bekerja. Masa di luar slot boleh diatur dengan admin.',
  },
  en: {
    navcta: 'WhatsApp us',
    rail1: 'Hall',
    rail2: 'Meeting',
    rail4: 'More',
    rail5: 'Visit',
    intro:
      'One space for the whole Kota Belud community: a hall, a meeting room, CentreKafe, and a grants guide for entrepreneurs.',
    cue: 'Scroll to step inside',
    rent: 'Available to rent',
    public: 'Open to the public',
    ppl: 'people',
    perhr: 'per hour · community',
    perday: 'per day · community',
    dewanH: 'Multipurpose<br><em>Hall</em>',
    dewanP:
      'Seminars, ceremonies and community events. Corporate rates and deposits are confirmed by the admin when you book.',
    checkDates: 'Check dates & book',
    mesH: 'Meeting<br><em>Room</em>',
    mesP: 'Meetings, training and working sessions. Business members get 2 free hours every month.',
    bookRoom: 'Book the room',
    member: 'See membership',
    kafeP:
      'The café inside SSK Centre. Drop by before or after a programme, or keep the conversation going after a meeting.',
    kafeCta: 'See opening hours',
    also: 'And also',
    m1: 'Prayer Room',
    m1s: 'Facility',
    m2: 'Reception',
    m2s: 'Enquiries',
    m3: 'SSK Office',
    m3s: 'Staff',
    m4: 'Toilets & Storage',
    m4s: 'Facility',
    m5: 'Kitchen & Storage',
    m5s: 'Staff',
    tab1: 'Hall',
    tab2: 'Meeting Room',
    tab4: 'More',
    exHint: 'Click a room on the building',
    finalH: 'Find<br><em>us.</em>',
    finEye: 'Location',
    finMap: 'Open in Google Maps',
    finCall: 'Call',
    days: 'Monday – Friday',
    wa: 'WhatsApp admin',
    grant: 'Find the right grant',
    proto: 'Prototype',
    calEye: 'Space availability',
    calDemo: 'Prototype: the dates below are examples, not yet connected to the real booking records.',
    lgFree: 'Free',
    lgPart: 'Partly booked',
    lgFull: 'Full',
    lgClosed: 'Past',
    pickDay: 'Pick a date to see the slots.',
    sendReq: 'Send booking request',
    calNote:
      'Your request goes to the admin on WhatsApp. Bookings are confirmed within 24 working hours. Times outside these slots can be arranged with the admin.',
  },
});
const NAMES = {
  dewan: ['Dewan Serbaguna', 'Multipurpose Hall'],
  mesyuarat: ['Bilik Mesyuarat', 'Meeting Room'],
  kafe: ['CentreKafe', 'CentreKafe'],
  dapur: ['Dapur & Stor', 'Kitchen & Storage'],
  surau: ['Surau', 'Prayer Room'],
  pejabat: ['Pejabat SSK', 'SSK Office'],
  kaunter: ['Kaunter Reception', 'Reception'],
  tandas: ['Tandas & Stor', 'Toilets & Storage'],
};

requestAnimationFrame(() => document.body.classList.add('loaded'));

/* ================= smooth scroll ================= */
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
let lenis = null;
// touch devices already scroll natively and smoothly; Lenis only adds a second rAF loop there
if (window.Lenis && !reduced && !matchMedia('(pointer: coarse)').matches) {
  lenis = new Lenis({ duration: 1.25, smoothWheel: true });
  window.__lenis = lenis;
  const raf = t => {
    lenis.raf(t);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
}

/* ================= 3D ================= */
const canvas = document.getElementById('scene'),
  tip = document.getElementById('tip');
// phones/tablets: lighter render (lower pixel ratio, smaller hard-edged shadow map)
const LITE = matchMedia('(pointer: coarse)').matches || innerWidth < 900;
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
  powerPreference: 'high-performance',
});
renderer.setPixelRatio(Math.min(devicePixelRatio, LITE ? 1.3 : 1.75));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = LITE ? THREE.PCFShadowMap : THREE.PCFSoftShadowMap;
const scene = new THREE.Scene();
const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 200);
const OFF = new THREE.Vector3(10, 9, 10);

const C = {
  clad: 0xf6f5f1,
  navy: 0x1a2a6c,
  deep: 0x111c4a,
  sky: 0x7ec8e3,
  red: 0xd8352b,
  stone: 0xe6e1d6,
  frame: 0x33363e,
  roof: 0xe2e0da,
  floor: 0xefeae0,
  wood: 0xc9a77c,
  warm: 0xffc979,
};
const hemi = new THREE.HemisphereLight(0xffffff, 0xd9d2c3, 0.8);
scene.add(hemi);
const sun = new THREE.DirectionalLight(0xfff4e0, 0.85);
sun.position.set(6, 12, 4);
sun.castShadow = true;
sun.shadow.mapSize.set(LITE ? 1024 : 2048, LITE ? 1024 : 2048);
Object.assign(sun.shadow.camera, { left: -12, right: 12, top: 12, bottom: -12 });
sun.shadow.radius = 5;
scene.add(sun);

const root = new THREE.Group();
scene.add(root);
const mat = (c, o = {}) =>
  new THREE.MeshStandardMaterial(Object.assign({ color: c, roughness: 0.85, metalness: 0 }, o));
function box(w, h, d, m, x, y, z) {
  const g = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
  g.position.set(x, y + h / 2, z);
  g.castShadow = g.receiveShadow = true;
  return g;
}
function cyl(r, h, m, x, y, z, seg = 16) {
  const g = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, seg), m);
  g.position.set(x, y + h / 2, z);
  g.castShadow = g.receiveShadow = true;
  return g;
}
/* plan units traced from "SSK Centre Layout 2026" -> model units */
const P = (x, y) => [(x - 405) * 0.04, (y - 195) * 0.04];

const ground = new THREE.Mesh(new THREE.PlaneGeometry(80, 80), new THREE.ShadowMaterial({ opacity: 0.09 }));
ground.rotation.x = -Math.PI / 2;
ground.position.y = -0.2;
ground.receiveShadow = true;
root.add(ground);
function slab(x1, y1, x2, y2, h, m) {
  const [a, b] = P(x1, y1),
    [c, d] = P(x2, y2);
  root.add(box(c - a, h, d - b, m, (a + c) / 2, -0.2, (b + d) / 2));
}
slab(255, 62, 555, 328, 0.24, mat(C.stone));
slab(268, 332, 540, 398, 0.06, mat(0xe9e5dc));
const lineM = mat(0xffffff);
[280, 309, 338, 376, 405, 434, 463, 492, 521].forEach(x => {
  const [a, b] = P(x, 340);
  root.add(box(0.03, 0.01, 2.2, lineM, a, -0.14, b + 1.1));
});

const rooms = {},
  pickables = [],
  glowMats = [];
const T_ = 0.07;
function room(key, x1, y1, x2, y2, h, style) {
  const [a, b] = P(x1, y1),
    [c, d] = P(x2, y2),
    w = c - a,
    dd = d - b;
  const g = new THREE.Group();
  g.position.set((a + c) / 2, 0, (b + d) / 2);
  const fm = mat(C.floor, { emissive: C.warm, emissiveIntensity: 0 });
  glowMats.push(fm);
  g.add(box(w - T_, 0.03, dd - T_, fm, 0, 0, 0));
  if (style === 'glass') {
    const gl = mat(0x9fc3d6, {
      roughness: 0.1,
      transparent: true,
      opacity: 0.3,
      depthWrite: false,
      emissive: C.warm,
      emissiveIntensity: 0,
    });
    glowMats.push(gl);
    const fr = mat(C.frame, { roughness: 0.6 });
    g.add(box(w, h, T_ * 0.6, gl, 0, 0, -dd / 2));
    g.add(box(w, h, T_ * 0.6, gl, 0, 0, dd / 2));
    g.add(box(T_ * 0.6, h, dd, gl, -w / 2, 0, 0));
    g.add(box(T_ * 0.6, h, dd, gl, w / 2, 0, 0));
    for (let i = 0; i <= 6; i++) {
      const x = -w / 2 + (i * w) / 6;
      g.add(box(0.05, h, 0.05, fr, x, 0, -dd / 2));
      g.add(box(0.05, h, 0.05, fr, x, 0, dd / 2));
    }
    for (let i = 1; i < 4; i++) {
      const z = -dd / 2 + (i * dd) / 4;
      g.add(box(0.05, h, 0.05, fr, -w / 2, 0, z));
      g.add(box(0.05, h, 0.05, fr, w / 2, 0, z));
    }
    g.add(box(w + 0.05, 0.06, 0.06, fr, 0, h - 0.06, -dd / 2));
    g.add(box(w + 0.05, 0.06, 0.06, fr, 0, h - 0.06, dd / 2));
    g.add(box(0.06, 0.06, dd, fr, -w / 2, h - 0.06, 0));
    g.add(box(0.06, 0.06, dd, fr, w / 2, h - 0.06, 0));
  } else {
    const wm = mat(C.clad);
    g.add(box(w, h, T_, wm, 0, 0, -dd / 2));
    g.add(box(w, h, T_, wm, 0, 0, dd / 2));
    g.add(box(T_, h, dd, wm, -w / 2, 0, 0));
    g.add(box(T_, h, dd, wm, w / 2, 0, 0));
    // window strip on the front face, glows at night
    const win = mat(0x2b3140, { roughness: 0.3, emissive: C.warm, emissiveIntensity: 0 });
    glowMats.push(win);
    g.add(box(w * 0.55, h * 0.32, 0.02, win, 0, h * 0.42, dd / 2 + 0.04));
  }
  const roof = new THREE.Group();
  roof.position.y = h;
  g.add(roof);
  const rm = mat(style === 'glass' ? C.frame : C.roof, { transparent: true, opacity: 1 }),
    fm2 = mat(C.frame, { transparent: true, opacity: 1 });
  roof.add(box(w + 0.3, 0.08, dd + 0.3, rm, 0, 0, 0));
  roof.add(box(w + 0.32, 0.035, dd + 0.32, fm2, 0, -0.03, 0));
  // neighbouring roofs overhang into each other; give every roof its own height so overlaps never share a plane
  const bias = 0.02 + Object.keys(rooms).length * 0.012;
  g.userData = { key, fm, roof, roofMats: [rm, fm2], h, bias, open: 0 };
  g.traverse(o => {
    if (o.isMesh) {
      o.userData.room = key;
      pickables.push(o);
    }
  });
  root.add(g);
  rooms[key] = g;
  return g;
}
room('dewan', 372, 240, 487, 322, 1.2, 'glass');
room('kafe', 372, 138, 490, 205, 1.0, 'glass');
room('dapur', 365, 85, 500, 118, 0.85, 'clad');
room('tandas', 272, 100, 352, 160, 0.85, 'clad');
room('mesyuarat', 305, 165, 345, 232, 0.95, 'clad');
room('kaunter', 305, 235, 345, 290, 0.95, 'glass');
room('surau', 260, 198, 300, 252, 0.9, 'clad');
room('pejabat', 258, 262, 300, 305, 0.95, 'clad');

/* interiors */
const navyM = mat(C.navy),
  deepM = mat(C.deep, { roughness: 0.5 }),
  woodM = mat(C.wood),
  whiteM = mat(0xffffff),
  chairM = mat(0xd8d1c2),
  skyM = mat(C.sky, { roughness: 0.6 }),
  redM = mat(C.red, { roughness: 0.5 }),
  greenM = mat(0x8fae9b),
  steelM = mat(0xb9bcc2, { roughness: 0.35, metalness: 0.3 }),
  screenM = mat(0x22252b, { roughness: 0.3, emissive: 0x7ec8e3, emissiveIntensity: 0 });
glowMats.push(screenM);
const add = (k, m) => {
  rooms[k].add(m);
  m.userData.room = k;
  pickables.push(m);
  return m;
};
add('dewan', box(0.9, 0.14, 1.6, navyM, -1.75, 0, -0.1));
add('dewan', box(0.04, 0.7, 1.2, whiteM, -2.22, 0.14, -0.1));
add('dewan', box(0.18, 0.28, 0.3, woodM, -1.55, 0.14, -0.1));
for (let r = 0; r < 4; r++)
  for (let k = 0; k < 5; k++)
    add('dewan', box(0.16, 0.1, 0.16, chairM, -0.75 + r * 0.42, 0, -0.85 + k * 0.42));
add('dewan', box(0.5, 0.22, 0.25, woodM, 1.9, 0, 1.25));
add('mesyuarat', box(0.55, 0.16, 1.5, deepM, 0, 0, 0.05));
for (let k = 0; k < 5; k++) {
  add('mesyuarat', box(0.14, 0.1, 0.14, chairM, -0.42, 0, -0.55 + k * 0.3));
  add('mesyuarat', box(0.14, 0.1, 0.14, chairM, 0.42, 0, -0.55 + k * 0.3));
}
add('mesyuarat', box(0.7, 0.42, 0.04, screenM, 0, 0.3, -1.27));
add('kafe', box(3.4, 0.34, 0.26, navyM, -0.2, 0, -1.0));
add('kafe', box(0.5, 0.12, 0.2, steelM, -1.4, 0.34, -1.0));
[
  [-1.5, 0.15],
  [-0.6, 0.55],
  [0.3, 0.15],
  [1.2, 0.55],
  [2.0, 0.1],
].forEach(([x, z]) => {
  add('kafe', cyl(0.17, 0.2, woodM, x, 0, z, 20));
  add('kafe', cyl(0.07, 0.12, skyM, x + 0.27, 0, z, 12));
  add('kafe', cyl(0.07, 0.12, skyM, x - 0.27, 0, z, 12));
});
[
  [-2.15, 1.05],
  [2.2, -0.9],
].forEach(([x, z]) => {
  add('kafe', cyl(0.09, 0.14, mat(0x6f6a62), x, 0, z, 10));
  const s = add('kafe', new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 10), greenM));
  s.position.set(x, 0.3, z);
  s.castShadow = true;
});
add('dapur', box(4.2, 0.3, 0.22, steelM, -0.2, 0, -0.5));
add('dapur', box(0.32, 0.6, 0.28, whiteM, 2.3, 0, -0.42));
add('dapur', box(0.8, 0.5, 0.2, woodM, -2.1, 0, 0.42));
for (let i = 0; i < 3; i++) add('tandas', box(0.03, 0.55, 0.5, whiteM, 0.35 + i * 0.38, 0, -0.8));
add('tandas', box(0.7, 0.18, 0.18, whiteM, 0.9, 0.2, 0.98));
add('tandas', box(0.18, 0.55, 1.6, woodM, -1.38, 0, -0.2));
add('tandas', box(0.18, 0.55, 1.2, woodM, -0.75, 0, 0.4));
for (let r = 0; r < 3; r++)
  for (let k = 0; k < 2; k++)
    add('surau', box(0.3, 0.012, 0.55, r === 0 ? redM : skyM, -0.35 + k * 0.55, 0, -0.65 + r * 0.68));
add('surau', box(1.2, 0.32, 0.12, woodM, 0.25, 0, 1.0));
[
  [-0.35, -0.35],
  [0.35, -0.35],
  [0, 0.45],
].forEach(([x, z]) => {
  add('pejabat', box(0.55, 0.18, 0.32, woodM, x, 0, z));
  add('pejabat', box(0.24, 0.16, 0.02, screenM, x, 0.18, z - 0.08));
  add('pejabat', box(0.15, 0.1, 0.15, chairM, x, 0, z + 0.3));
});
add('pejabat', box(0.2, 0.5, 0.6, deepM, -0.7, 0, 0.2));
add('kaunter', box(0.9, 0.3, 0.18, woodM, 0, 0, -0.35));
add('kaunter', box(0.18, 0.3, 0.5, woodM, 0.44, 0, -0.1));
add('kaunter', box(0.7, 0.16, 0.25, navyM, -0.1, 0, 0.75));
add('kaunter', box(0.6, 0.4, 0.03, redM, 0, 0.2, -1.05));

/* exterior details: red portal, tanks, trees, planters, street lamps */
const [ex, ez] = P(358, 326);
root.add(box(0.12, 1.25, 0.5, redM, ex - 0.42, 0, ez));
root.add(box(0.12, 1.25, 0.5, redM, ex + 0.42, 0, ez));
root.add(box(0.96, 0.14, 0.5, redM, ex, 1.25, ez));
[
  [428, 72],
  [440, 72],
].forEach(([x, y]) => {
  const [a, b] = P(x, y);
  root.add(cyl(0.14, 0.5, mat(0xdedad2), a, 0, b, 18));
});
const treeM = mat(0x8fae9b),
  trunkM = mat(0x9a8770);
[
  [245, 120],
  [245, 230],
  [240, 320],
  [565, 150],
  [568, 260],
  [560, 330],
  [300, 55],
  [470, 52],
  [255, 410],
  [550, 410],
].forEach(([px, py], i) => {
  const [x, z] = P(px, py),
    s = 0.7 + ((i * 37) % 5) / 10;
  const t = new THREE.Mesh(new THREE.ConeGeometry(0.32 * s, 1.1 * s, 7), treeM);
  t.position.set(x, 0.15 + 0.55 * s, z);
  t.castShadow = true;
  root.add(t);
  root.add(box(0.06, 0.35, 0.06, trunkM, x, -0.2, z));
});
[400, 420, 440, 460, 480].forEach(px => {
  const [x, z] = P(px, 326);
  root.add(box(0.16, 0.14, 0.16, mat(C.frame), x, 0.04, z));
  const b = new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 8), treeM);
  b.position.set(x, 0.28, z);
  root.add(b);
});
const lampM = mat(0xffffff, { emissive: C.warm, emissiveIntensity: 0 });
glowMats.push(lampM);
[290, 350, 430, 510].forEach(px => {
  const [x, z] = P(px, 400);
  root.add(box(0.04, 1.1, 0.04, mat(C.frame), x, -0.2, z));
  const h = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 10), lampM);
  h.position.set(x, 0.95, z);
  root.add(h);
});
/* phones: small props (chairs, tables, pots…) skip the shadow pass — roughly halves the draw calls per frame */
if (LITE) {
  const bb = new THREE.Box3(),
    sz = new THREE.Vector3();
  root.traverse(o => {
    if (!o.isMesh) return;
    bb.setFromObject(o).getSize(sz);
    if (Math.max(sz.x, sz.y, sz.z) < 0.6) {
      o.castShadow = false;
      o.receiveShadow = false;
    }
  });
}

/* ================= 3D tour pop-up =================
   The building is shown only inside the #tour pop-up (opened by any link to #ruang). Nothing is
   drawn while it is closed. Tabs, arrows, the room list or a click/tap on the building choose a
   room; the camera flies to it and its roof lifts. */
const VIEWS = {
  overview: { room: null, zoom: 0.95, rot: 0.42 },
  dewan: { room: 'dewan', zoom: 1.75, rot: 0.18 },
  mesyuarat: { room: 'mesyuarat', zoom: 2.4, rot: 0.62 },
  kafe: { room: 'kafe', zoom: 1.85, rot: 0.05 },
  surau: { room: 'surau', zoom: 2.3, rot: 0.75 },
  kaunter: { room: 'kaunter', zoom: 2.3, rot: 0.6 },
  pejabat: { room: 'pejabat', zoom: 2.3, rot: 0.85 },
  tandas: { room: 'tandas', zoom: 2.2, rot: 0.7 },
  dapur: { room: 'dapur', zoom: 2.0, rot: 0.3 },
};
const ORDER = ['dewan', 'mesyuarat', 'kafe', 'surau', 'kaunter', 'pejabat', 'dapur', 'tandas'];
const tourEl = document.getElementById('tour'),
  stageEl = document.getElementById('stage'),
  exPanels = document.getElementById('exPanels'),
  tabs = [...document.querySelectorAll('.ex-tabs button')],
  moreLis = [...document.querySelectorAll('#moreList li')],
  panelFor = {};
['dewan', 'mesyuarat', 'kafe', 'more'].forEach((g, i) => (panelFor[g] = exPanels.children[i]));
let selected = 'dewan',
  tourOpen = false,
  lastFocus = null;

function select(k) {
  selected = k;
  const grp = ['dewan', 'mesyuarat', 'kafe'].includes(k) ? k : 'more';
  Object.entries(panelFor).forEach(([g, p]) => p.classList.toggle('show', g === grp));
  tabs.forEach(b => {
    const on = b.dataset.sel === grp;
    b.classList.toggle('on', on);
    b.setAttribute('aria-selected', on);
  });
  moreLis.forEach(li => li.classList.toggle('on', li.dataset.room === k));
  document.getElementById('exCount').textContent =
    String(ORDER.indexOf(k) + 1).padStart(2, '0') + ' / ' + String(ORDER.length).padStart(2, '0');
  dirty = true;
}
tabs.forEach(b =>
  b.addEventListener('click', () => select(b.dataset.sel === 'more' ? 'surau' : b.dataset.sel))
);
moreLis.forEach(li => li.addEventListener('click', () => select(li.dataset.room)));
const step = d => select(ORDER[(ORDER.indexOf(selected) + d + ORDER.length) % ORDER.length]);
document.getElementById('exPrev').addEventListener('click', () => step(-1));
document.getElementById('exNext').addEventListener('click', () => step(1));

function openTour(room) {
  if (tourOpen) return;
  tourOpen = true;
  lastFocus = document.activeElement;
  tourEl.hidden = false;
  document.documentElement.style.overflow = 'hidden';
  if (lenis) lenis.stop();
  select(room && VIEWS[room] ? room : 'dewan');
  // start from the overview so the camera visibly flies to the room
  Object.assign(cur, viewTarget('overview'));
  resize();
  requestAnimationFrame(() => tourEl.classList.add('on'));
  document.getElementById('tourX').focus();
}
function closeTour() {
  if (!tourOpen) return;
  tourOpen = false;
  tourEl.classList.remove('on');
  tourEl.hidden = true;
  tip.classList.remove('on');
  document.documentElement.style.overflow = '';
  if (lenis) lenis.start();
  if (lastFocus) lastFocus.focus();
}
document.getElementById('tourX').addEventListener('click', closeTour);
addEventListener('keydown', e => {
  if (!tourOpen) return;
  if (e.key === 'Escape') closeTour();
  if (e.key === 'ArrowRight') step(1);
  if (e.key === 'ArrowLeft') step(-1);
});
// every "explore in 3D" link on the page points at #ruang; capture runs before the in-page scroller
document.addEventListener(
  'click',
  e => {
    const a = e.target.closest('a[href$="#ruang"]');
    if (!a) return;
    e.preventDefault();
    e.stopPropagation();
    if (document.body.classList.contains('menu-open')) document.getElementById('menuBtn').click();
    openTour(a.dataset.room);
  },
  true
);
// the calendar opens above the pop-up: close the tour first so the page underneath is usable
document.addEventListener(
  'click',
  e => {
    if (tourOpen && e.target.closest('#tour [data-cal]')) closeTour();
  },
  true
);
if (location.hash === '#ruang') addEventListener('load', () => openTour());

/* ================= state + loop ================= */
const cur = { zoom: 0.95, rot: 0.42, tx: 0, tz: 0 };
const tgt = Object.assign({}, cur);
const open = {};
Object.keys(rooms).forEach(k => (open[k] = 0));
let hoverKey = null;
const v = new THREE.Vector3();

let lastW = 0,
  lastH = 0,
  dirty = true;
function resize() {
  const w = stageEl.clientWidth,
    h = stageEl.clientHeight;
  if (!w || !h) return;
  if (w !== lastW || h !== lastH) {
    lastW = w;
    lastH = h;
    renderer.setSize(w, h, false);
    const s = w < 900 ? 8.2 : 7.2,
      a = w / h;
    cam.left = -s * a;
    cam.right = s * a;
    cam.top = s;
    cam.bottom = -s;
    cam.updateProjectionMatrix();
  }
  dirty = true;
}
addEventListener('resize', () => tourOpen && resize());

function viewTarget(name) {
  const V = VIEWS[name] || VIEWS.overview;
  const o = { zoom: V.room ? Math.max(1.1, V.zoom * 0.66) : V.zoom, rot: V.rot, tx: 0, tz: 0, room: V.room };
  if (V.room) {
    const p = rooms[V.room].position.clone();
    p.applyAxisAngle(new THREE.Vector3(0, 1, 0), V.rot);
    o.tx = p.x;
    o.tz = p.z;
  }
  return o;
}
function lerp(a, b, t) {
  return a + (b - a) * t;
}

let px = 0,
  roomMoving = 1,
  lastPx = 0,
  lastHover = null,
  lastSel = null,
  lastLang = null;
// on phones the room panel sits under the building, so the building is pushed up a little
const phone = () => innerWidth < 900;
function frame() {
  requestAnimationFrame(frame);
  if (!tourOpen) return;
  const T = viewTarget(selected);
  ['zoom', 'rot', 'tx', 'tz'].forEach(p => (tgt[p] = T[p]));
  const sm = reduced ? 1 : 0.085;
  let moving = 0;
  for (const p in tgt) {
    const d = tgt[p] - cur[p];
    cur[p] += d * sm;
    moving = Math.max(moving, Math.abs(d));
  }
  moving = Math.max(moving, roomMoving);
  const idle =
    !dirty &&
    px === lastPx &&
    hoverKey === lastHover &&
    selected === lastSel &&
    LANG === lastLang &&
    moving < 0.0004;
  if (idle) return;
  dirty = false;
  lastPx = px;
  lastHover = hoverKey;
  lastSel = selected;
  lastLang = LANG;

  document.body.classList.toggle('pointing', !!hoverKey);
  roomMoving = 0;
  Object.keys(rooms).forEach(key => {
    const target = key === selected || key === hoverKey ? 1 : 0;
    roomMoving = Math.max(roomMoving, Math.abs(target - open[key]));
    open[key] += (target - open[key]) * (reduced ? 1 : 0.1);
    const u = rooms[key].userData,
      o = open[key];
    // +.02 keeps the roof off the wall tops (no coplanar faces → no z-fighting flicker)
    u.roof.position.y = u.h + u.bias + o * 2.2;
    u.roof.rotation.z = o * 0.25;
    u.roof.rotation.x = -o * 0.12;
    // roofs are only "transparent" while fading; a closed roof is solid so depth sorting can't flip it
    const fading = o > 0.01;
    u.roofMats.forEach(m => {
      m.opacity = 1 - o * 0.97;
      if (m.transparent !== fading) {
        m.transparent = fading;
        m.depthWrite = !fading;
        m.needsUpdate = true;
      }
    });
    u.roof.visible = o < 0.985;
    u.fm.color.setHex(o > 0.5 ? 0xdcecf3 : C.floor);
  });

  // camera: the room sits left of centre on wide screens (the panel is on the right)
  root.rotation.y = cur.rot + (reduced ? 0 : px * 0.08);
  const vw = (cam.right - cam.left) / cur.zoom;
  const right = new THREE.Vector3(1, 0, -1).normalize();
  const focus = new THREE.Vector3(cur.tx, 0, cur.tz).addScaledVector(right, phone() ? 0 : vw * 0.14);
  if (phone()) focus.y -= ((cam.top - cam.bottom) / cur.zoom) * 0.18;
  cam.zoom = cur.zoom;
  cam.position.copy(focus).add(OFF);
  cam.lookAt(focus);
  cam.updateProjectionMatrix();

  // hover tooltip
  if (hoverKey) {
    const g = rooms[hoverKey];
    g.getWorldPosition(v);
    v.y += g.userData.h + 0.6;
    v.project(cam);
    const r = stageEl.getBoundingClientRect();
    tip.style.left = r.left + ((v.x + 1) / 2) * r.width + 'px';
    tip.style.top = r.top + ((1 - v.y) / 2) * r.height + 'px';
    tip.textContent = NAMES[hoverKey][LANG === 'ms' ? 0 : 1];
    tip.classList.add('on');
  } else tip.classList.remove('on');

  renderer.render(scene, cam);
}

/* picking: hover shows the room name, click or tap selects it */
const ray = new THREE.Raycaster(),
  mouse = new THREE.Vector2();
function pick(e) {
  const r = stageEl.getBoundingClientRect();
  mouse.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  ray.setFromCamera(mouse, cam);
  const hit = ray.intersectObjects(pickables, false)[0];
  return hit ? hit.object.userData.room : null;
}
stageEl.addEventListener(
  'pointermove',
  e => {
    px = e.clientX / innerWidth - 0.5;
    hoverKey = e.pointerType === 'mouse' ? pick(e) : null;
  },
  { passive: true }
);
stageEl.addEventListener('pointerleave', () => (hoverKey = null));
stageEl.addEventListener('click', e => {
  const k = pick(e);
  if (k) select(k);
});
select('dewan');

/* ================= availability calendar ================= */
(function () {
  const WA = SSK.WA;
  const SLOTS = [
    { id: 'pagi', ms: 'Pagi', en: 'Morning', t: '8:30 – 12:30' },
    { id: 'petang', ms: 'Petang', en: 'Afternoon', t: '13:30 – 17:00' },
    { id: 'malam', ms: 'Malam', en: 'Evening', t: '18:00 – 23:00' },
  ];
  const MONTHS = {
    ms: [
      'Januari',
      'Februari',
      'Mac',
      'April',
      'Mei',
      'Jun',
      'Julai',
      'Ogos',
      'September',
      'Oktober',
      'November',
      'Disember',
    ],
    en: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
  };
  const WD = {
    ms: ['Isn', 'Sel', 'Rab', 'Kha', 'Jum', 'Sab', 'Ahd'],
    en: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  };
  const TXT = {
    ms: {
      free: 'Kosong',
      taken: 'Sudah ditempah',
      full: 'Hari ini penuh. Cuba tarikh lain.',
      closed: 'Hujung minggu: hubungi admin untuk atur.',
    },
    en: {
      free: 'Available',
      taken: 'Booked',
      full: 'This day is full. Try another date.',
      closed: 'Weekend: contact the admin to arrange.',
    },
  };
  /* ---- DATA SOURCE: Google Sheet "SSK CENTRE LAPORAN FASILITI" ----
     Paste the "Publish to web → CSV" link of the PUBLIC "Web Kalendar" tab here.
     That tab only holds: tarikh | fasiliti | mula | tamat  (no names, no payments).
     Empty → example data with a visible "prototype" label. */
  const SHEET_CSV =
    'https://docs.google.com/spreadsheets/d/1x9QA00fKmnYwE2hM5KjOcjrvlZtkStrJaf0od5IqTsU/gviz/tq?tqx=out:csv&gid=0'; // public copy: tarikh, fasiliti, mula, tamat only
  const SLOT_MIN = { pagi: [510, 750], petang: [810, 1020], malam: [1080, 1380] }; // 8:30–12:30, 13:30–17:00, 18:00–23:00
  let LIVE = null,
    LOAD = 'idle'; // idle | loading | ok | error
  function demoBooked(room, iso) {
    let h = 0;
    for (const c of room + iso) h = (h * 31 + c.charCodeAt(0)) >>> 0;
    const r = h % 9;
    return r < 2 ? ['pagi', 'petang'] : r === 2 ? ['pagi'] : r === 3 ? ['petang'] : [];
  }
  function booked(room, iso) {
    if (LIVE) {
      const s = LIVE[room] && LIVE[room][iso];
      return s ? [...s] : [];
    }
    return SHEET_CSV ? [] : demoBooked(room, iso);
  }
  function parseCSV(txt) {
    const rows = [];
    let row = [],
      f = '',
      q = false;
    for (let i = 0; i < txt.length; i++) {
      const c = txt[i];
      if (q) {
        if (c === '"' && txt[i + 1] === '"') {
          f += '"';
          i++;
        } else if (c === '"') q = false;
        else f += c;
      } else if (c === '"') q = true;
      else if (c === ',') {
        row.push(f);
        f = '';
      } else if (c === '\n' || c === '\r') {
        if (c === '\r' && txt[i + 1] === '\n') i++;
        row.push(f);
        rows.push(row);
        row = [];
        f = '';
      } else f += c;
    }
    if (f || row.length) {
      row.push(f);
      rows.push(row);
    }
    return rows;
  }
  const MON = {
    jan: 0,
    feb: 1,
    mar: 2,
    apr: 3,
    may: 4,
    mei: 4,
    jun: 5,
    jul: 6,
    aug: 7,
    ogo: 7,
    sep: 8,
    oct: 9,
    okt: 9,
    nov: 10,
    dec: 11,
    dis: 11,
  };
  function parseDate(s) {
    s = (s || '').trim();
    let m;
    if ((m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/))) return new Date(+m[1], m[2] - 1, +m[3]);
    if ((m = s.match(/^(\d{1,2})[-\s]([A-Za-z]{3})[A-Za-z]*[-\s](\d{2,4})$/))) {
      const y = +m[3] < 100 ? 2000 + +m[3] : +m[3];
      const mo = MON[m[2].toLowerCase()];
      return mo == null ? null : new Date(y, mo, +m[1]);
    }
    if ((m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/))) {
      const y = +m[3] < 100 ? 2000 + +m[3] : +m[3];
      return new Date(y, m[2] - 1, +m[1]);
    } // dd/mm/yyyy (Malaysia)
    return null;
  }
  function parseTime(s) {
    s = (s || '').trim().toUpperCase();
    const m = s.match(/^(\d{1,2})[:.](\d{2})\s*(AM|PM)?/);
    if (!m) return null;
    let h = +m[1];
    if (m[3] === 'PM' && h < 12) h += 12;
    if (m[3] === 'AM' && h === 12) h = 0;
    return h * 60 + +m[2];
  }
  // "Special" = outdoor + dewan, so it blocks the hall
  function roomOf(s) {
    s = (s || '').toLowerCase();
    return s.includes('dewan') || s.includes('special')
      ? 'dewan'
      : s.includes('mesyuarat')
        ? 'mesyuarat'
        : null;
  }
  async function loadSheet() {
    if (!SHEET_CSV || LOAD === 'loading' || LOAD === 'ok') return;
    LOAD = 'loading';
    render();
    try {
      const r = await fetch(SHEET_CSV + (SHEET_CSV.includes('?') ? '&' : '?') + 't=' + Date.now());
      if (!r.ok) throw new Error(r.status);
      const rows = parseCSV(await r.text());
      const map = { dewan: {}, mesyuarat: {} };
      rows.forEach(c => {
        if (/cancel/i.test(c.join(' '))) return;
        const d = parseDate(c[0]),
          rm = roomOf(c[1]);
        if (!d || !rm) return;
        const a = parseTime(c[2]),
          b = parseTime(c[3]),
          k = iso(d);
        Object.entries(SLOT_MIN).forEach(([id, [s, e]]) => {
          const hit = a == null || b == null ? true : a < e && b > s; // no times = treat whole day as taken
          if (hit) (map[rm][k] = map[rm][k] || new Set()).add(id);
        });
      });
      LIVE = map;
      LOAD = 'ok';
    } catch (err) {
      LOAD = 'error';
    }
    render();
  }

  const el = id => document.getElementById(id);
  const cal = el('cal'),
    grid = el('calGrid'),
    slotsEl = el('slots'),
    bookBtn = el('calBook');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const limit = new Date(today.getFullYear(), today.getMonth() + 3, 1); // 3 months ahead
  let room = 'dewan',
    view = new Date(today.getFullYear(), today.getMonth(), 1),
    pickDate = null,
    pickSlot = null;
  const iso = d =>
    d.getFullYear() +
    '-' +
    String(d.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(d.getDate()).padStart(2, '0');
  const L = () => (LANG === 'ms' ? 'ms' : 'en');
  function status(d) {
    if (d <= today) return 'past'; // admin confirms within 24h, so bookings start tomorrow
    // weekends are bookable: the log has Saturday and Sunday events
    const b = booked(room, iso(d));
    return b.length >= SLOTS.length ? 'full' : b.length ? 'part' : 'free';
  }
  function render() {
    const l = L();
    el('calTitle').textContent = NAMES[room][l === 'ms' ? 0 : 1];
    document
      .querySelectorAll('[data-calroom]')
      .forEach(b => b.setAttribute('aria-pressed', b.dataset.calroom === room));
    el('calMonth').textContent = MONTHS[l][view.getMonth()] + ' ' + view.getFullYear();
    el('calPrev').disabled = view <= new Date(today.getFullYear(), today.getMonth(), 1);
    el('calNext').disabled = new Date(view.getFullYear(), view.getMonth() + 1, 1) >= limit;
    let h = WD[l].map(w => `<div class="wd">${w}</div>`).join('');
    const lead = (view.getDay() + 6) % 7;
    for (let i = 0; i < lead; i++) h += '<div></div>';
    const days = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
    for (let n = 1; n <= days; n++) {
      const d = new Date(view.getFullYear(), view.getMonth(), n),
        s = status(d),
        k = iso(d);
      const cls = ['day', s, +d === +today ? 'today' : '', pickDate === k ? 'sel' : ''].join(' ');
      const can = s === 'free' || s === 'part' || s === 'full' || s === 'closed';
      h += `<button class="${cls}" data-d="${k}" ${s === 'past' ? 'disabled' : ''} aria-label="${n} ${MONTHS[l][view.getMonth()]}">${n}</button>`;
    }
    // never show "free" days while the real data is still loading or failed
    if (SHEET_CSV && LOAD !== 'ok') {
      const msg =
        LOAD === 'error'
          ? l === 'ms'
            ? 'Kalendar tak dapat dimuatkan sekarang. Sila WhatsApp admin untuk semak tarikh.'
            : 'The calendar could not load right now. Please WhatsApp the admin to check dates.'
          : l === 'ms'
            ? 'Memuatkan kalendar…'
            : 'Loading calendar…';
      h = `<p class="slots-hint" style="grid-column:1/-1;padding:40px 0;text-align:center">${msg}</p>`;
      pickDate = null;
    }
    document.querySelector('.cal-demo').style.display = SHEET_CSV ? 'none' : '';
    grid.innerHTML = h;
    renderSlots();
  }
  function renderSlots() {
    const l = L();
    if (!pickDate) {
      slotsEl.innerHTML = `<p class="slots-hint">${T[LANG].pickDay}</p>`;
      updateBook();
      return;
    }
    const d = new Date(pickDate + 'T00:00:00'),
      s = status(d),
      b = booked(room, pickDate);
    let h = `<div class="slots-date">${d.getDate()} ${MONTHS[l][d.getMonth()]} ${d.getFullYear()}</div>`;
    if (s === 'closed') {
      h += `<p class="slots-hint">${TXT[l].closed}</p>`;
    } else {
      if (s === 'full') h += `<p class="slots-hint" style="margin-bottom:10px">${TXT[l].full}</p>`;
      SLOTS.forEach(x => {
        const tk = b.includes(x.id);
        h += `<button class="slot ${tk ? 'taken' : 'ok'} ${pickSlot === x.id ? 'on' : ''}" data-slot="${x.id}" ${tk ? 'disabled' : ''}><span>${x[l]} · ${x.t}</span><small>${tk ? TXT[l].taken : TXT[l].free}</small></button>`;
      });
    }
    slotsEl.innerHTML = h;
    updateBook();
  }
  const waBtn = el('calWa');
  // main button: hand the chosen date/slot/room to the booking form (js/tempah.js)
  bookBtn.addEventListener('click', () => {
    if (!(pickDate && pickSlot)) return;
    const detail = { room, date: pickDate, slot: pickSlot };
    close();
    dispatchEvent(new CustomEvent('ssk:book', { detail }));
  });
  function updateBook() {
    const ready = pickDate && pickSlot,
      l = L();
    bookBtn.setAttribute('aria-disabled', !ready);
    waBtn.setAttribute('aria-disabled', !ready);
    if (!ready) {
      waBtn.href = '#';
      return;
    }
    const d = new Date(pickDate + 'T00:00:00'),
      sl = SLOTS.find(x => x.id === pickSlot);
    const msg =
      l === 'ms'
        ? `Salam admin SSK Centre, saya ingin menempah ${NAMES[room][0]} pada ${d.getDate()} ${MONTHS.ms[d.getMonth()]} ${d.getFullYear()}, slot ${sl.ms} (${sl.t}). Boleh sahkan ketersediaan dan kadar?`
        : `Hi SSK Centre admin, I'd like to book the ${NAMES[room][1]} on ${d.getDate()} ${MONTHS.en[d.getMonth()]} ${d.getFullYear()}, ${sl.en} slot (${sl.t}). Could you confirm availability and the rate?`;
    waBtn.href = `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
  }
  grid.addEventListener('click', e => {
    const b = e.target.closest('.day');
    if (!b || b.disabled) return;
    pickDate = b.dataset.d;
    pickSlot = null;
    render();
  });
  slotsEl.addEventListener('click', e => {
    const b = e.target.closest('.slot.ok');
    if (!b) return;
    pickSlot = b.dataset.slot;
    renderSlots();
  });
  document.querySelectorAll('[data-calroom]').forEach(b =>
    b.addEventListener('click', () => {
      room = b.dataset.calroom;
      pickDate = null;
      pickSlot = null;
      render();
    })
  );
  el('calPrev').addEventListener('click', () => {
    view = new Date(view.getFullYear(), view.getMonth() - 1, 1);
    render();
  });
  el('calNext').addEventListener('click', () => {
    view = new Date(view.getFullYear(), view.getMonth() + 1, 1);
    render();
  });
  let lastFocus = null;
  function open(r) {
    room = r || room;
    pickDate = null;
    pickSlot = null;
    view = new Date(today.getFullYear(), today.getMonth(), 1);
    render();
    loadSheet();
    lastFocus = document.activeElement;
    cal.classList.add('open');
    if (lenis) lenis.stop();
    document.documentElement.style.overflow = 'hidden';
    setTimeout(() => cal.querySelector('.cal-x').focus(), 50);
  }
  function close() {
    cal.classList.remove('open');
    if (lenis) lenis.start();
    document.documentElement.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-cal]');
    if (b) {
      e.preventDefault();
      open(b.dataset.cal);
    }
  });
  cal.querySelectorAll('[data-close]').forEach(x => x.addEventListener('click', close));
  addEventListener('keydown', e => {
    if (e.key === 'Escape' && cal.classList.contains('open')) close();
  });
  bookBtn.addEventListener('click', e => {
    if (bookBtn.getAttribute('aria-disabled') === 'true') e.preventDefault();
  });
  document.querySelectorAll('.lang button').forEach(b =>
    b.addEventListener('click', () => {
      if (cal.classList.contains('open')) render();
    })
  );
})();
frame();
