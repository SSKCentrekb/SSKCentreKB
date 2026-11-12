/* =========================================================
   SSK Centre: past activities (used by the home page preview
   and by aktiviti.html).

   To add an activity: copy one block, put the photos in
   assets/aktiviti/ (JPG, about 1200px wide) and list their
   file names (without .jpg) in `photos`. The first photo is
   the cover. Newest dates are shown first automatically.
   `date` is yyyy-mm-dd, or just yyyy if only the year is known,
   or null if unknown (shown at the end under "Arkib").
   ========================================================= */
window.SSK_AKTIVITI=[
  {
    id:'kaamatan-kreatif',date:'2026-05-25',cat:'budaya',
    title:{ms:'Kaamatan Kreatif',en:'Kaamatan Kreatif'},
    desc:{ms:'Bengkel kreatif sempena Pesta Kaamatan untuk kanak-kanak Kota Belud, dengan aktiviti seni, pergerakan dan pakaian tradisional. Setiap peserta menerima sijil penghargaan.',
          en:'A creative workshop for Kota Belud children to mark the Kaamatan festival, with art, movement and traditional costume. Every participant received a certificate.'},
    photos:['kaamatan-3','kaamatan-2','kaamatan-1']
  },
  {
    id:'kota-belud-free-market',date:'2026-05-21',cat:'komuniti',
    title:{ms:'Kota Belud Free Market',en:'Kota Belud Free Market'},
    desc:{ms:'Pasar percuma untuk komuniti: pakaian dan barangan sumbangan yang boleh diambil oleh sesiapa yang memerlukan.',
          en:'A free market for the community: donated clothes and goods that anyone in need could take home.'},
    photos:['freemarket-1','freemarket-2','freemarket-3']
  },
  {
    id:'temuduga-city-u',date:'2026-05-13',cat:'pendidikan',
    title:{ms:'Temuduga Terbuka City University Malaysia (Sabah)',en:'City University Malaysia (Sabah) Open Interview'},
    desc:{ms:'Sesi temuduga dan pendaftaran terbuka bersama City University Malaysia untuk pelajar lepasan sekolah dan orang dewasa di Kota Belud.',
          en:'An open interview and enrolment day with City University Malaysia for school leavers and adult learners in Kota Belud.'},
    photos:['cityu-3','cityu-1','cityu-2','cityu-4','cityu-5']
  },
  {
    id:'the-kancil-days',date:'2025-01-29',cat:'komuniti',
    title:{ms:'The Kancil Days',en:'The Kancil Days'},
    desc:{ms:'Himpunan peminat dan kelab kereta Kancil di perkarangan SSK Centre, lengkap dengan pameran kereta dan sesi bersama tetamu kehormat.',
          en:'A meet-up of Kancil car fans and clubs at SSK Centre, with a car display and a session with guests of honour.'},
    photos:['kancil-1','kancil-2','kancil-3']
  },
  {
    id:'kursus-cendawan',date:'2024',cat:'usahawan',
    title:{ms:'Kursus Asas Penanaman Cendawan',en:'Basic Mushroom Cultivation Course'},
    desc:{ms:'Kursus asas penanaman cendawan untuk bakal usahawan tani, dengan penyampaian sijil kepada peserta.',
          en:'An introductory mushroom-growing course for aspiring agri-entrepreneurs, ending with a certificate ceremony.'},
    photos:['cendawan-1']
  },
  {
    id:'program-1suria',date:'2024-03-08',cat:'komuniti',
    title:{ms:'Program Komuniti bersama Yayasan 1Suria',en:'Community Programme with Yayasan 1Suria'},
    desc:{ms:'Hari komuniti bersama Yayasan 1Suria: pertandingan mewarna untuk keluarga, khidmat gunting rambut percuma untuk kanak-kanak dan pelbagai aktiviti santai.',
          en:'A community day with Yayasan 1Suria: a family colouring contest, free haircuts for children and other activities.'},
    photos:['1suria-1','1suria-2']
  },
  {
    id:'kursus-dron',date:null,cat:'latihan',
    title:{ms:'Kursus Fotografi Udara (Dron)',en:'Aerial Photography (Drone) Course'},
    desc:{ms:'Kursus fotografi udara bersama University College Sabah Foundation (UCSF) dan Aerial Tech. Peserta menerima sijil tamat kursus.',
          en:'An aerial photography course with University College Sabah Foundation (UCSF) and Aerial Tech. Participants received completion certificates.'},
    photos:['dron-1']
  },
  {
    id:'promosi-ikn',date:null,cat:'pendidikan',
    title:{ms:'Promosi Institut Kraf Negara (IKN)',en:'Institut Kraf Negara (IKN) Outreach'},
    desc:{ms:'Pameran dan promosi kemasukan Institut Kraf Negara untuk belia yang berminat dalam bidang kraf.',
          en:'An exhibition and admissions drive by Institut Kraf Negara for young people interested in craft.'},
    photos:['ikn-1']
  },
  {
    id:'taklimat-komuniti',date:null,cat:'latihan',
    title:{ms:'Sesi Taklimat Komuniti',en:'Community Briefing Sessions'},
    desc:{ms:'Taklimat dan perkongsian maklumat untuk penduduk setempat di ruang terbuka SSK Centre.',
          en:'Briefings and information sessions for local residents in the SSK Centre open hall.'},
    photos:['taklimat-1','taklimat-2']
  },
  {
    id:'malam-komuniti',date:null,cat:'komuniti',
    title:{ms:'Malam Komuniti',en:'Community Nights'},
    desc:{ms:'Malam santai bersama komuniti di ruang luar SSK Centre dan CentreKafe.',
          en:'Relaxed evenings with the community in the SSK Centre courtyard and CentreKafe.'},
    photos:['malam-1','malam-2']
  }
];
window.SSK_AKTIVITI_CAT={
  komuniti:{ms:'Komuniti',en:'Community'},
  pendidikan:{ms:'Pendidikan',en:'Education'},
  latihan:{ms:'Latihan',en:'Training'},
  usahawan:{ms:'Keusahawanan',en:'Entrepreneurship'},
  budaya:{ms:'Budaya & kanak-kanak',en:'Culture & children'}
};
