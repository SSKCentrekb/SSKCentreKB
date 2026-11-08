/* =========================================================
   SSK Centre — content sections (rates, quiz, opportunities,
   membership, events, FAQ, contact, chatbot, nav).
   Loaded after main.js; shares T, LANG, setLang, lenis.
   ========================================================= */
(function(){
const WA='601121406450';
const wa=msg=>`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
const L=()=>LANG==='ms'?'ms':'en';
const tx=o=>typeof o==='string'?o:(o[L()]||o.ms);
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ---------------- UI strings ---------------- */
Object.assign(T.ms,{
  n1:'Kadar sewa',n2:'Geran',n3:'Kursus & pembiayaan',n4:'Keahlian',n5:'Hubungi',
  dewanP:'Seminar, majlis dan acara komuniti, sehingga 100 orang. Pentas, skrin dan susun atur kerusi boleh diatur.',
  formLink:'Borang tempahan rasmi',footBy:'Diuruskan oleh SmartBah Technology Sdn Bhd',
  kEye:'Kadar sewa 2026',kH:'Harga jelas,<br><em>tiada kejutan.</em>',kP:'Pilih kategori anda. Deposit dipulangkan selepas program jika tiada kerosakan. Ahli SSK dapat diskaun 20–40%.',
  kFine:'Kadar rasmi SSK Centre. Masa di luar waktu operasi mungkin dikenakan caj tambahan; sila semak dengan admin.',
  qEye:'Quiz geran · 5 soalan',qH:'Geran mana<br><em>sesuai untuk anda?</em>',qP:'Jawab 5 soalan ringkas. Kami cadangkan geran dan program yang paling padan dengan situasi anda.',
  pEye:'Peluang usahawan 2026',pH:'Kursus, geran<br><em>&amp; pembiayaan.</em>',pSearchL:'Cari',pEmpty:'Tiada hasil. Cuba kata kunci lain atau set semula penapis.',
  pFine:'Maklumat dikumpul daripada portal agensi untuk 2026. Syarat dan tarikh boleh berubah; sila semak di portal rasmi sebelum memohon.',
  mEye:'Keahlian bulanan',mH:'Guna kerap?<br><em>Jadi ahli.</em>',mP:'Diskaun sewaan, keutamaan tempahan dan manfaat lain sepanjang keahlian aktif.',
  eEye:'Event & komuniti',eH:'Apa yang<br><em>berlaku di SSK.</em>',vEye:'Direktori usahawan',
  fH:'Soalan<br><em>lazim.</em>',
  cEye:'Hubungi kami',cH:'Bincang dengan<br><em>pasukan SSK.</em>',cAddr:'Alamat',cHours:'Waktu operasi',cHoursV:'Isnin – Jumaat, 8:30 pagi – 5:00 petang',cSocial:'Media sosial',
  fName:'Nama penuh',fPhone:'No. telefon',fTopic:'Perkara',fMsg:'Mesej',t1:'Tempahan fasiliti',t2:'Geran & kursus',t3:'Keahlian',t4:'Jadi vendor',t5:'Lain-lain',
  fErr:'Sila isi nama, nombor telefon dan mesej.',fSend:'Hantar melalui WhatsApp',fNote:'Mesej anda dibuka dalam WhatsApp untuk dihantar terus kepada admin. Respons dalam 1–2 hari bekerja.',
  chatSub:'Jawapan pantas · admin di WhatsApp'
});
Object.assign(T.en,{
  n1:'Rates',n2:'Grants',n3:'Courses & financing',n4:'Membership',n5:'Contact',
  dewanP:'Seminars, ceremonies and community events for up to 100 people. Stage, screen and seating layout can be arranged.',
  formLink:'Official booking form',footBy:'Managed by SmartBah Technology Sdn Bhd',
  kEye:'2026 rental rates',kH:'Clear prices,<br><em>no surprises.</em>',kP:'Pick your category. The deposit is refunded after the event if nothing is damaged. SSK members get 20–40% off.',
  kFine:'Official SSK Centre rates. Use outside operating hours may carry an extra charge; please check with the admin.',
  qEye:'Grant quiz · 5 questions',qH:'Which grant<br><em>fits you?</em>',qP:'Answer 5 quick questions and we will suggest the grants and programmes that best match your situation.',
  pEye:'2026 opportunities for entrepreneurs',pH:'Courses, grants<br><em>&amp; financing.</em>',pSearchL:'Search',pEmpty:'No results. Try another keyword or reset the filter.',
  pFine:'Compiled from agency portals for 2026. Terms and dates can change; check the official portal before applying.',
  mEye:'Monthly membership',mH:'Use us often?<br><em>Become a member.</em>',mP:'Rental discounts, booking priority and more while your membership is active.',
  eEye:'Events & community',eH:'What’s happening<br><em>at SSK.</em>',vEye:'Entrepreneur directory',
  fH:'Frequently<br><em>asked.</em>',
  cEye:'Contact us',cH:'Talk to the<br><em>SSK team.</em>',cAddr:'Address',cHours:'Opening hours',cHoursV:'Monday – Friday, 8:30 am – 5:00 pm',cSocial:'Social media',
  fName:'Full name',fPhone:'Phone number',fTopic:'Topic',fMsg:'Message',t1:'Facility booking',t2:'Grants & courses',t3:'Membership',t4:'Become a vendor',t5:'Other',
  fErr:'Please fill in your name, phone number and message.',fSend:'Send via WhatsApp',fNote:'Your message opens in WhatsApp so it goes straight to the admin. We reply within 1–2 working days.',
  chatSub:'Quick answers · admin on WhatsApp'
});

/* ---------------- RATES (from "Kadar & SOP") ---------------- */
const RATES={
  komuniti:{label:{ms:'Komuniti',en:'Community'},note:{ms:'NGO, persatuan belia, individu dan usahawan kecil.',en:'NGOs, youth associations, individuals and small businesses.'},
    rows:[['dewan',50,250,450,100],['mesyuarat',40,100,180,50]]},
  korporat:{label:{ms:'Korporat',en:'Corporate'},note:{ms:'Syarikat, program latihan dan event komersial.',en:'Companies, training programmes and commercial events.'},
    rows:[['dewan',150,400,700,300],['mesyuarat',70,180,300,150]]},
  persendirian:{label:{ms:'Persendirian',en:'Private'},note:{ms:'Majlis keluarga dan acara peribadi.',en:'Family functions and private events.'},
    rows:[['dewan',100,350,600,250],['mesyuarat',60,160,250,100]]}
};
let rateCat='komuniti';
function renderRates(){
  const l=L();
  $('#rateSeg').innerHTML=Object.entries(RATES).map(([k,v])=>`<button role="tab" aria-selected="${k===rateCat}" data-rate="${k}">${tx(v.label)}</button>`).join('');
  const R=RATES[rateCat],H=l==='ms'?['Sejam','½ hari','Sehari','Deposit']:['Per hour','Half day','Full day','Deposit'];
  $('#rateTable').innerHTML=`<p class="rate-note">${tx(R.note)}</p><table><thead><tr><th></th>${H.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${
    R.rows.map(([room,...v])=>`<tr><th scope="row">${NAMES[room][l==='ms'?0:1]}<small>${room==='dewan'?(l==='ms'?'100 orang':'100 people'):(l==='ms'?'20 orang':'20 people')}</small></th>${v.map(n=>`<td>RM${n}</td>`).join('')}</tr>`).join('')
  }</tbody></table>`;
}
$('#rateSeg').addEventListener('click',e=>{const b=e.target.closest('[data-rate]');if(b){rateCat=b.dataset.rate;renderRates();}});

/* ---------------- GRANT QUIZ ---------------- */
const QUIZ=[
  {q:{ms:'Berapa umur anda?',en:'How old are you?'},a:[['belia',{ms:'18 – 30 tahun',en:'18 – 30'}],['dewasa',{ms:'31 – 45 tahun',en:'31 – 45'}],['matang',{ms:'46 tahun ke atas',en:'46 and above'}]]},
  {q:{ms:'Apa sektor utama bisnes anda?',en:'What is your main business sector?'},a:[['pertanian',{ms:'Pertanian / ternakan',en:'Agriculture / livestock'}],['fnb',{ms:'F&B / makanan',en:'F&B / food'}],['digital',{ms:'Digital / IT / kreatif',en:'Digital / IT / creative'}],['umum',{ms:'Runcit / servis / lain-lain',en:'Retail / services / other'}]]},
  {q:{ms:'Status bisnes anda sekarang?',en:'Where is your business now?'},a:[['startup',{ms:'Belum ada, baru nak mula',en:'Not started yet'}],['mikro',{ms:'Baru (bawah 1 tahun)',en:'New (under 1 year)'}],['established',{ms:'Sudah beroperasi 1+ tahun',en:'Operating 1+ years'}]]},
  {q:{ms:'Anda dari kawasan mana?',en:'Where are you based?'},a:[['luar',{ms:'Kota Belud / luar bandar Sabah',en:'Kota Belud / rural Sabah'}],['bandar',{ms:'Bandar utama Sabah',en:'A main town in Sabah'}]]},
  {q:{ms:'Apa yang paling anda perlukan sekarang?',en:'What do you need most right now?'},a:[['modal',{ms:'Modal / wang tunai',en:'Capital / cash'}],['peralatan',{ms:'Peralatan / mesin',en:'Equipment / machinery'}],['training',{ms:'Latihan / tambah kemahiran',en:'Training / new skills'}],['network',{ms:'Rangkaian / mentor',en:'Network / mentors'}]]}
];
const REC={
  belia_modal:[{n:'TUBE — Tunas Usahawan Belia',d:{ms:'RM15,000 dengan latihan 3 fasa. Sabah antara pemohon tertinggi.',en:'RM15,000 plus 3-phase training. Sabah ranks among the top applicants.'},l:'https://tube.smecorp.gov.my'},{n:'BSN Usahawan Muda',d:{ms:'Pembiayaan untuk bawah 30 tahun, daripada RM150 juta Bajet 2026.',en:'Financing for under-30s from the RM150 million Budget 2026 allocation.'},l:'https://www.bsn.com.my'}],
  belia_peralatan:[{n:'Geran Usahawan Mikro BSN',d:{ms:'Sehingga RM10,000 untuk peralatan. 1,000 slot seluruh Malaysia.',en:'Up to RM10,000 for equipment. 1,000 slots nationwide.'},l:'https://www.bsn.com.my'},{n:'GAM Start-Up',d:{ms:'Sehingga RM30,000 dalam bentuk peralatan (pertanian).',en:'Up to RM30,000 in equipment (agriculture).'},l:'https://egam.kpkm.gov.my'}],
  pertanian:[{n:'GAM Start-Up / Scale-Up',d:{ms:'Geran khas pertanian, ternakan dan perikanan. Sehingga RM30,000.',en:'Grants for crops, livestock and fisheries. Up to RM30,000.'},l:'https://egam.kpkm.gov.my'},{n:'Agropreneur NextGen',d:{ms:'Geran dan pembiayaan Agro Bank RM1.1 bilion. Pengecualian cukai 100%.',en:'Agro Bank grants and financing (RM1.1 billion). 100% tax exemption.'},l:'https://www.agrobank.com.my'}],
  digital:[{n:'Geran Pecutan Digital MDEC',d:{ms:'Bahagian RM53 juta untuk AI, blockchain dan sistem digital.',en:'Part of RM53 million for AI, blockchain and digital systems.'},l:'https://mdec.my'},{n:'INSKEN AI Masterclass',d:{ms:'Kursus AI untuk industri kreatif dan F&B. Hands-on.',en:'Hands-on AI course for creative and F&B businesses.'},l:'https://insken.gov.my'}],
  luar:[{n:'Re-Start Usahawan Luar Bandar',d:{ms:'Geran penuh RM3,000 – RM5,000 untuk usahawan luar bandar Sabah.',en:'Full grant of RM3,000 – RM5,000 for rural entrepreneurs in Sabah.'},l:'https://www.rurallink.gov.my'},{n:'Dana Tamu Desa Sabah',d:{ms:'RM20 juta Bajet 2026 khusus peniaga Tamu Desa Sabah.',en:'RM20 million from Budget 2026 for Tamu Desa traders in Sabah.'},l:'#hubungi'}],
  bumiputera:[{n:'TERAJU BSSF',d:{ms:'Dana pemerkasaan Bumiputera Sabah dan Sarawak. Terma fleksibel.',en:'Bumiputera empowerment fund for Sabah and Sarawak. Flexible terms.'},l:'https://www.teraju.gov.my'},{n:'Pembiayaan MARA',d:{ms:'Modal tetap dan modal pusingan. 40% geran jika rekod bayaran baik.',en:'Fixed and working capital. 40% becomes a grant with a good repayment record.'},l:'https://www.mara.gov.my'}],
  startup:[{n:'TEKUN Mikro',d:{ms:'Tiada cagaran, kadar 4%. Sesuai tanpa rekod kredit.',en:'No collateral, 4% rate. Suits founders without a credit record.'},l:'https://www.tekun.gov.my'},{n:'AIM',d:{ms:'Tanpa cagaran untuk B40. Kelulusan 1–2 minggu.',en:'No collateral for B40. Approval in 1–2 weeks.'},l:'https://www.aim.gov.my'}],
  training:[{n:'INSKEN KAK',d:{ms:'Kursus Asas Keusahawanan. RM50, 2 hari, penginapan termasuk.',en:'Basic Entrepreneurship Course. RM50, 2 days, accommodation included.'},l:'https://insken.gov.my/pendaftaran'},{n:'HRD Corp',d:{ms:'Kursus ditanggung untuk PKS. Pelbagai pilihan.',en:'Funded courses for SMEs. Many options.'},l:'https://hrdcorp.gov.my'}],
  network:[{n:{ms:'Jadi ahli SSK Centre',en:'Become an SSK Centre member'},d:{ms:'Akses event, kolaborasi vendor dan rangkaian usahawan Kota Belud.',en:'Events, vendor collaborations and the Kota Belud entrepreneur network.'},l:'#keahlian'},{n:'PULSE',d:{ms:'Persatuan usahawan muda Sabah. Hubungi SSK untuk pengenalan.',en:'Sabah young entrepreneurs association. Ask SSK for an introduction.'},l:'#hubungi'}]
};
let qs={step:0,ans:[]};
function renderQuiz(){
  const l=L(),box=$('#quiz');
  if(qs.step<QUIZ.length){
    const Q=QUIZ[qs.step];
    box.innerHTML=`<div class="q-bar"><i style="width:${qs.step/QUIZ.length*100}%"></i></div>
      <div class="q-count">${l==='ms'?'Soalan':'Question'} ${qs.step+1} / ${QUIZ.length}</div>
      <h3 class="q-q">${tx(Q.q)}</h3>
      <div class="q-ans">${Q.a.map(([tag,t])=>`<button data-tag="${tag}">${esc(tx(t))}<span>→</span></button>`).join('')}</div>
      ${qs.step?`<button class="q-back" data-back>${l==='ms'?'← Kembali':'← Back'}</button>`:''}`;
    return;
  }
  const has=t=>qs.ans.includes(t),recs=[],seen=new Set();
  const add=k=>(REC[k]||[]).forEach(r=>{const key=tx(r.n);if(!seen.has(key)){seen.add(key);recs.push(r);}});
  if(has('belia')&&has('modal'))add('belia_modal');
  if(has('belia')&&has('peralatan'))add('belia_peralatan');
  if(has('pertanian'))add('pertanian');if(has('digital'))add('digital');if(has('luar'))add('luar');
  if(has('startup'))add('startup');if(has('training'))add('training');if(has('network'))add('network');
  if(recs.length<2)add('bumiputera');
  box.innerHTML=`<div class="q-bar"><i style="width:100%"></i></div>
    <div class="q-count">${l==='ms'?'Cadangan untuk anda':'Suggested for you'}</div>
    <ul class="q-recs">${recs.slice(0,4).map(r=>`<li><a href="${r.l}" ${r.l.startsWith('#')?'':'target="_blank" rel="noopener"'}><b>${esc(tx(r.n))}</b><span>${esc(tx(r.d))}</span></a></li>`).join('')}</ul>
    <div class="btns"><a class="btn btn-red" target="_blank" rel="noopener" href="${wa(l==='ms'?'Salam, saya baru selesai Quiz Geran di website SSK Centre. Boleh admin bantu saya tentang permohonan geran yang sesuai?':'Hi, I just finished the Grant Quiz on the SSK Centre website. Could the admin help me with a suitable grant application?')}"><span>${l==='ms'?'Bincang dengan admin':'Talk to the admin'}</span><span class="arr">→</span></a>
    <button class="btn btn-line" data-restart>${l==='ms'?'Mula semula':'Start again'}</button></div>`;
}
$('#quiz').addEventListener('click',e=>{
  const a=e.target.closest('[data-tag]');if(a){qs.ans.push(a.dataset.tag);qs.step++;renderQuiz();return;}
  if(e.target.closest('[data-back]')){qs.ans.pop();qs.step--;renderQuiz();return;}
  if(e.target.closest('[data-restart]')){qs={step:0,ans:[]};renderQuiz();}
});

/* ---------------- OPPORTUNITIES ---------------- */
const OPP={
  kursus:{label:{ms:'Kursus & latihan',en:'Courses & training'},chips:[['all',{ms:'Semua',en:'All'}],['percuma',{ms:'Percuma / subsidi',en:'Free / subsidised'}],['digital',{ms:'Digital & AI',en:'Digital & AI'}],['usahawan',{ms:'Keusahawanan',en:'Entrepreneurship'}],['fasilitator',{ms:'Fasilitator',en:'Facilitators'}]],items:[
    {ag:'INSKEN',t:'Kursus Asas Keusahawanan (KAK)',tags:'usahawan percuma',d:{ms:'Program 2 hari untuk usahawan baru: pemasaran, kewangan, operasi dan pengurusan. Penginapan termasuk.',en:'2-day programme for new founders: marketing, finance, operations and management. Accommodation included.'},m:{ms:'Yuran RM50 · Kota Kinabalu',en:'Fee RM50 · Kota Kinabalu'},l:'https://insken.gov.my/pendaftaran'},
    {ag:'INSKEN Masterclass',t:'Storytelling Ecotourism',tags:'usahawan',d:{ms:'Pemasaran berasaskan naratif untuk usahawan pelancongan, homestay dan komuniti.',en:'Story-led marketing for tourism, homestay and community businesses.'},m:{ms:'Kota Kinabalu · 2026',en:'Kota Kinabalu · 2026'},l:'https://insken.gov.my/pendaftaran'},
    {ag:'INSKEN Masterclass',t:'Strategi AI & Industri Kreatif',tags:'digital',d:{ms:'Bina kandungan iklan dan model perniagaan dengan AI. Sesuai untuk content creator dan F&B.',en:'Build ad content and business models with AI. For content creators and F&B.'},m:{ms:'Kota Kinabalu · AI',en:'Kota Kinabalu · AI'},l:'https://insken.gov.my'},
    {ag:'INSKEN Masterclass',t:'Kawal Kos F&B',tags:'usahawan digital',d:{ms:'Tetapkan harga betul, kawal kos bahan dan operasi, dan kekalkan margin.',en:'Price correctly, control ingredient and running costs, and protect your margin.'},m:{ms:'Sektor F&B',en:'F&B sector'},l:'https://insken.gov.my'},
    {ag:'INSKEN',t:'Kursus Fasilitator (KFK)',tags:'fasilitator',d:{ms:'3 hari intensif: teknik fasilitasi, AI, coaching dan mentoring.',en:'3 intensive days: facilitation, AI, coaching and mentoring.'},m:{ms:'Yuran RM850 · Kota Kinabalu',en:'Fee RM850 · Kota Kinabalu'},l:'https://insken.gov.my'},
    {ag:'MARA',t:'Latihan Keusahawanan MARA 2026',tags:'usahawan percuma',d:{ms:'Pengurusan perniagaan, kewangan, operasi, pemasaran dan ICT bersama pakar industri.',en:'Business management, finance, operations, marketing and ICT with industry experts.'},m:{ms:'Yuran disubsidi',en:'Subsidised fee'},l:'https://myusahawan.mara.gov.my'},
    {ag:'HRD Corp',t:'Kursus Bersubsidi HRD Corp',tags:'usahawan percuma',d:{ms:'Kursus ditaja untuk pekerja dan pemilik PKS: digital, pengurusan, pemasaran dan produk.',en:'Funded courses for SME staff and owners: digital, management, marketing and product.'},m:{ms:'Yuran ditanggung',en:'Fee covered'},l:'https://hrdcorp.gov.my'},
    {ag:'Yayasan Peneraju',t:'Level Up Academy — AI Marketing',tags:'digital usahawan percuma',d:{ms:'Program bertaja untuk pemasaran digital dan AI. SSK Centre dalam perbincangan sebagai venue.',en:'Sponsored digital and AI marketing programme. SSK Centre is in talks to be a venue.'},m:{ms:'Bertaja',en:'Sponsored'},l:'#hubungi'},
    {ag:'PROTEGE',t:'Program PROTEGE',tags:'usahawan percuma',d:{ms:'Pembangunan graduan dalam keusahawanan, dengan penempatan dan bimbingan industri.',en:'Graduate entrepreneurship development with placement and industry mentoring.'},m:{ms:'Sasaran: graduan',en:'For graduates'},l:'https://protege.com.my'}
  ]},
  geran:{label:{ms:'Geran',en:'Grants'},chips:[['all',{ms:'Semua',en:'All'}],['belia',{ms:'Belia',en:'Youth'}],['pertanian',{ms:'Pertanian',en:'Agriculture'}],['mikro',{ms:'Usahawan mikro',en:'Micro business'}],['luar-bandar',{ms:'Luar bandar',en:'Rural'}],['digital',{ms:'Digital',en:'Digital'}]],items:[
    {ag:'BSN · Bajet 2026',t:'Geran Usahawan Mikro BSN',tags:'mikro belia',amt:{ms:'Sehingga RM10,000',en:'Up to RM10,000'},d:{ms:'Untuk pembelian peralatan perniagaan. 1,000 slot seluruh Malaysia; mohon awal.',en:'For business equipment. 1,000 slots nationwide; apply early.'},l:'https://www.bsn.com.my'},
    {ag:'KPKM',t:'GAM Start-Up',tags:'pertanian belia',amt:{ms:'Sehingga RM30,000',en:'Up to RM30,000'},d:{ms:'Tanaman, ternakan, perikanan; diberi dalam bentuk peralatan. Umur 18–43, pendapatan bersih bawah RM5,000.',en:'Crops, livestock, fisheries; given as equipment. Age 18–43, net income under RM5,000.'},l:'https://egam.kpkm.gov.my'},
    {ag:'KPKM',t:'GAM Scale-Up',tags:'pertanian',amt:{ms:'Pengembangan',en:'Scale-up'},d:{ms:'Untuk penerima GAM yang nak kembangkan projek. Umur 21–45, pendapatan bersih melebihi RM5,000.',en:'For GAM recipients expanding their project. Age 21–45, net income above RM5,000.'},l:'https://egam.kpkm.gov.my'},
    {ag:'KKDW · SPKLB',t:'Re-Start Usahawan Luar Bandar',tags:'luar-bandar mikro',amt:{ms:'RM3,000 – RM5,000',en:'RM3,000 – RM5,000'},d:{ms:'Geran penuh untuk usahawan luar bandar yang beroperasi setahun, berdaftar SSM atau OPS.',en:'Full grant for rural businesses operating for a year, registered with SSM or OPS.'},l:'https://www.rurallink.gov.my'},
    {ag:'SME Corp',t:'TUBE — Tunas Usahawan Belia',tags:'belia mikro',amt:{ms:'RM15,000',en:'RM15,000'},d:{ms:'Geran permulaan dengan 3 fasa latihan dan bimbingan. Komitmen 1 tahun.',en:'Start-up grant with 3 phases of training and mentoring. 1-year commitment.'},l:'https://tube.smecorp.gov.my'},
    {ag:'Bajet 2026 · Sabah',t:'Dana Tamu Desa Sabah',tags:'mikro luar-bandar',amt:{ms:'Bahagian RM20 juta',en:'Share of RM20 million'},d:{ms:'Khusus untuk peniaga kecil Tamu Desa di Sabah. Sangat relevan untuk Kota Belud.',en:'For small Tamu Desa traders in Sabah. Highly relevant to Kota Belud.'},l:'#hubungi'},
    {ag:'MDEC',t:'Geran Pecutan Digital',tags:'digital mikro',amt:{ms:'Bahagian RM53 juta',en:'Share of RM53 million'},d:{ms:'Untuk pecutan AI dan blockchain. Sesuai bisnes yang nak naik taraf sistem digital.',en:'For AI and blockchain adoption. Suits businesses upgrading their digital systems.'},l:'https://mdec.my'},
    {ag:'MATRADE',t:'Geran Pembangunan Pasaran',tags:'mikro',amt:{ms:'Bahagian RM60 juta',en:'Share of RM60 million'},d:{ms:'Untuk PKS menembusi pasaran antarabangsa termasuk Afrika, Amerika Latin dan Asia Tengah.',en:'For SMEs entering international markets including Africa, Latin America and Central Asia.'},l:'https://www.matrade.gov.my'},
    {ag:'Agro Bank',t:'Agropreneur NextGen',tags:'pertanian mikro',d:{ms:'Geran permulaan dan pengembangan, disokong RM1.1 bilion Agro Bank. Pengecualian cukai 100%.',en:'Start-up and expansion grants backed by Agro Bank’s RM1.1 billion. 100% tax exemption.'},l:'https://www.agrobank.com.my'}
  ]},
  pembiayaan:{label:{ms:'Pembiayaan',en:'Financing'},chips:[],items:[
    {ag:'TERAJU',t:'Dana BSSF Sabah & Sarawak',d:{ms:'Pembiayaan fleksibel untuk Bumiputera Sabah, disokong jaminan institusi kewangan.',en:'Flexible financing for Sabah Bumiputera, backed by financial institution guarantees.'},l:'https://www.teraju.gov.my'},
    {ag:'TEKUN',t:'Pembiayaan Mikro TEKUN',d:{ms:'Tiada cagaran, kadar pentadbiran 4%, tempoh 1–7 tahun. Sesuai tanpa rekod kredit.',en:'No collateral, 4% admin rate, 1–7 year term. Suits founders without a credit record.'},l:'https://www.tekun.gov.my'},
    {ag:'BSN',t:'Pembiayaan Usahawan Muda',d:{ms:'Khas bawah 30 tahun, daripada RM150 juta Bajet 2026. Terma mesra belia.',en:'For under-30s, from the RM150 million Budget 2026 allocation. Youth-friendly terms.'},l:'https://www.bsn.com.my'},
    {ag:'MARA',t:'Pembiayaan Perniagaan MARA',d:{ms:'Modal tetap, modal pusingan, naik taraf premis dan peralatan. 40% geran jika rekod bayaran baik.',en:'Fixed and working capital, premises and equipment. 40% becomes a grant with a good repayment record.'},l:'https://www.mara.gov.my'},
    {ag:'AIM',t:'Amanah Ikhtiar Malaysia',d:{ms:'Tanpa cagaran untuk asnaf dan B40. Kelulusan 1–2 minggu.',en:'No collateral for asnaf and B40. Approval in 1–2 weeks.'},l:'https://www.aim.gov.my'},
    {ag:'Agro Bank',t:'Pembiayaan Pertanian',d:{ms:'RM1.1 bilion untuk usahawan pertanian termasuk NextGen.',en:'RM1.1 billion for agricultural entrepreneurs, including NextGen.'},l:'https://www.agrobank.com.my'},
    {ag:'SME Bank',t:'Pembiayaan SME Bank',d:{ms:'Pusat sehenti kewangan PKS dengan proses dipercepat dan khidmat nasihat.',en:'One-stop SME financing with faster processing and advisory support.'},l:'https://www.smebank.com.my'},
    {ag:'PUNB',t:'Pembiayaan PUNB',d:{ms:'Untuk Bumiputera dalam francais, runcit moden dan perkhidmatan, dengan bimbingan.',en:'For Bumiputera in franchising, modern retail and services, with mentoring.'},l:'https://www.punb.com.my'}
  ]}
};
let oppTab='kursus',oppChip='all',oppQ='';
function renderOpp(){
  const l=L(),G=OPP[oppTab];
  $('#oppSearch').placeholder=l==='ms'?'Cari: belia, pertanian, digital…':'Search: youth, agriculture, digital…';
  $('#oppTabs').innerHTML=Object.entries(OPP).map(([k,v])=>`<button role="tab" aria-selected="${k===oppTab}" data-tab="${k}">${tx(v.label)} <small>${v.items.length}</small></button>`).join('');
  $('#oppChips').innerHTML=G.chips.map(([k,v])=>`<button aria-pressed="${k===oppChip}" data-chip="${k}">${tx(v)}</button>`).join('');
  const q=oppQ.toLowerCase();
  // a search looks across all three tabs; otherwise show the current tab + chip
  const pool=q?Object.values(OPP).flatMap(g=>g.items):G.items;
  const list=pool.filter(it=>(q||oppChip==='all'||(it.tags||'').includes(oppChip))&&(!q||[it.ag,it.t,tx(it.d),it.tags||''].join(' ').toLowerCase().includes(q)));
  document.getElementById('oppTabs').style.opacity=q?.45:1;
  $('#oppCards').innerHTML=list.map(it=>`<article class="card"><div class="card-ag">${esc(it.ag)}</div><h3>${esc(it.t)}</h3>${it.amt?`<div class="card-amt">${esc(tx(it.amt))}</div>`:''}<p>${esc(tx(it.d))}</p>${it.m?`<div class="card-meta">${esc(tx(it.m))}</div>`:''}<a href="${it.l}" ${it.l.startsWith('#')?'':'target="_blank" rel="noopener"'}>${it.l.startsWith('#')?(l==='ms'?'Hubungi SSK':'Contact SSK'):(l==='ms'?'Portal rasmi':'Official portal')} →</a></article>`).join('');
  $('#oppEmpty').hidden=list.length>0;
}
$('#oppTabs').addEventListener('click',e=>{const b=e.target.closest('[data-tab]');if(b){oppTab=b.dataset.tab;oppChip='all';renderOpp();}});
$('#oppChips').addEventListener('click',e=>{const b=e.target.closest('[data-chip]');if(b){oppChip=b.dataset.chip;renderOpp();}});
$('#oppSearch').addEventListener('input',e=>{oppQ=e.target.value.trim();renderOpp();});

/* ---------------- MEMBERSHIP (fees from "Kadar & SOP") ---------------- */
const TIERS=[
  {k:'Komuniti',price:60,tag:{ms:'Pelan asas',en:'Basic'},b:{ms:['Diskaun 20% semua fasiliti','Keutamaan tempahan','Untuk NGO, persatuan belia dan usahawan kecil'],en:['20% off all facilities','Booking priority','For NGOs, youth groups and small businesses']},wa:'Komuniti Member'},
  {k:'Business',price:200,pop:true,tag:{ms:'Paling popular',en:'Most popular'},b:{ms:['Diskaun 30% semua fasiliti','2 jam Bilik Mesyuarat percuma setiap bulan','Untuk PKS yang kerap guna fasiliti'],en:['30% off all facilities','2 free Meeting Room hours a month','For SMEs who book often']},wa:'Business Member'},
  {k:'Corporate',price:800,tag:{ms:'Rakan korporat',en:'Corporate partner'},b:{ms:['Diskaun 40%, paling tinggi','Slot premium termasuk hujung minggu','Peluang penjenamaan dalam premis'],en:['40% off, the highest','Premium slots including weekends','Branding inside the centre']},wa:'Corporate Partner'}
];
function renderTiers(){
  const l=L();
  $('#tiers').innerHTML=TIERS.map(t=>`<article class="tier${t.pop?' pop':''}"><div class="tier-tag">${tx(t.tag)}</div><h3>${t.k}<span> ${l==='ms'?'Member':'Member'}</span></h3><div class="tier-price">RM${t.price}<small>/${l==='ms'?'bulan':'month'}</small></div><ul>${t.b[l].map(x=>`<li>${esc(x)}</li>`).join('')}</ul><a class="btn ${t.pop?'btn-red':'btn-line'}" target="_blank" rel="noopener" href="${wa(l==='ms'?`Salam, saya berminat untuk mendaftar sebagai ${t.wa} SSK Centre.`:`Hi, I'd like to sign up as an SSK Centre ${t.wa}.`)}">${l==='ms'?'Daftar melalui WhatsApp':'Sign up on WhatsApp'}</a></article>`).join('')+
  `<p class="fine tiers-fine">${l==='ms'?'Diskaun terpakai sepanjang keahlian aktif, sah 1 bulan dari tarikh bayaran.':'Discounts apply while membership is active, valid 1 month from payment.'}</p>`;
}

/* ---------------- EVENTS (edit this list; past events hide automatically) ---------------- */
const EVENTS=[
  // {date:'2026-12-12', title:{ms:'Pasar Malam SSK',en:'SSK Night Market'}, desc:{ms:'Vendor makanan dan kraf.',en:'Food and craft vendors.'}},
];
const VENDORS=[
  {i:'AJ',n:'Kiosk Abang J',t:{ms:'Chicken karaage & popcorn',en:'Chicken karaage & popcorn'},b:{ms:'Vendor SSK',en:'SSK vendor'}},
  {i:'SK',n:'Sri Kenanga Studio',t:{ms:'Fotografi produk & event',en:'Product & event photography'},b:{ms:'Rakan SSK',en:'SSK partner'}}
];
function renderEvents(){
  const l=L(),today=new Date();today.setHours(0,0,0,0);
  const up=EVENTS.filter(e=>new Date(e.date+'T00:00:00')>=today).sort((a,b)=>a.date.localeCompare(b.date));
  const M=l==='ms'?['Jan','Feb','Mac','Apr','Mei','Jun','Jul','Ogo','Sep','Okt','Nov','Dis']:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  $('#events').innerHTML=up.length?`<ul class="events">${up.map(e=>{const d=new Date(e.date+'T00:00:00');return `<li><time datetime="${e.date}"><b>${d.getDate()}</b>${M[d.getMonth()]}</time><div><h3>${esc(tx(e.title))}</h3><p>${esc(tx(e.desc))}</p></div></li>`;}).join('')}</ul>`
    :`<p class="lead">${l==='ms'?'Tiada event yang diumumkan buat masa ni. Ikuti kami untuk program, pasar dan bengkel terkini.':'No events announced right now. Follow us for the latest programmes, markets and workshops.'}</p><div class="btns"><a class="btn btn-line" href="https://www.facebook.com/sskcentrekb" target="_blank" rel="noopener">Facebook</a><a class="btn btn-line" href="https://www.tiktok.com/@sskcentrekb" target="_blank" rel="noopener">TikTok</a></div>`;
  $('#vendors').innerHTML=VENDORS.map(v=>`<li><span class="v-i">${v.i}</span><div><b>${esc(v.n)}</b><span>${esc(tx(v.t))}</span></div><em>${tx(v.b)}</em></li>`).join('')+
    `<li class="v-add"><span class="v-i">+</span><div><b>${l==='ms'?'Senaraikan bisnes anda':'List your business'}</b><span>${l==='ms'?'Vendor tetap, pasar malam dan rakan SSK':'Resident vendors, night markets and SSK partners'}</span></div><a href="${wa(l==='ms'?'Salam, saya berminat jadi vendor di SSK Centre.':'Hi, I am interested in becoming a vendor at SSK Centre.')}" target="_blank" rel="noopener">WhatsApp →</a></li>`;
}

/* ---------------- FAQ ---------------- */
const FAQ=[
  {q:{ms:'Macam mana nak tempah fasiliti?',en:'How do I book a facility?'},a:{ms:'Tekan <b>Semak tarikh &amp; tempah</b>, pilih bilik, tarikh dan slot, kemudian hantar permintaan ke WhatsApp admin. Anda juga boleh isi borang tempahan rasmi. Pengesahan dalam 24 jam waktu bekerja.',en:'Press <b>Check dates &amp; book</b>, choose the room, date and slot, then send the request to the admin on WhatsApp. You can also use the official booking form. Confirmation within 24 working hours.'}},
  {q:{ms:'Apa beza kadar Komuniti, Korporat dan Persendirian?',en:'What is the difference between Community, Corporate and Private rates?'},a:{ms:'<b>Komuniti</b> untuk NGO, persatuan belia, individu dan usahawan kecil. <b>Korporat</b> untuk syarikat, latihan dan event komersial. <b>Persendirian</b> untuk majlis keluarga dan acara peribadi. Lihat jadual kadar untuk harga tepat.',en:'<b>Community</b> is for NGOs, youth groups, individuals and small businesses. <b>Corporate</b> is for companies, training and commercial events. <b>Private</b> is for family and personal functions. See the rates table for exact prices.'}},
  {q:{ms:'Berapa deposit?',en:'How much is the deposit?'},a:{ms:'Dewan: <b>RM100</b> komuniti, <b>RM300</b> korporat, <b>RM250</b> persendirian. Bilik Mesyuarat: <b>RM50</b>, <b>RM150</b>, <b>RM100</b>. Deposit dipulangkan selepas program jika tiada kerosakan.',en:'Hall: <b>RM100</b> community, <b>RM300</b> corporate, <b>RM250</b> private. Meeting Room: <b>RM50</b>, <b>RM150</b>, <b>RM100</b>. The deposit is refunded after the event if nothing is damaged.'}},
  {q:{ms:'Boleh tempah waktu malam atau hujung minggu?',en:'Can I book evenings or weekends?'},a:{ms:'Boleh. Kalendar menunjukkan slot malam (18:00–23:00) dan hujung minggu. Caj tambahan untuk staf di luar waktu operasi mungkin dikenakan; admin akan sahkan.',en:'Yes. The calendar shows evening slots (18:00–23:00) and weekends. An extra staff charge may apply outside opening hours; the admin will confirm.'}},
  {q:{ms:'Saya tak tahu geran mana yang sesuai.',en:'I don’t know which grant suits me.'},a:{ms:'Cuba <b>Quiz Geran</b> di atas. Kalau masih keliru, WhatsApp admin SSK dan kami bantu hubungkan dengan agensi yang betul.',en:'Try the <b>Grant Quiz</b> above. If you are still unsure, WhatsApp the SSK admin and we will connect you with the right agency.'}},
  {q:{ms:'Bukan ahli boleh sewa?',en:'Can non-members rent?'},a:{ms:'Boleh, dengan kadar standard. Kalau guna lebih sekali sebulan, keahlian lebih jimat dengan diskaun 20–40%.',en:'Yes, at the standard rate. If you book more than once a month, membership saves more with 20–40% off.'}},
  {q:{ms:'Boleh jadi vendor di SSK Centre?',en:'Can I become a vendor at SSK Centre?'},a:{ms:'Boleh. Vendor tetap dipilih dengan teliti; Pasar Malam SSK guna sistem kategori eksklusif dengan deposit. WhatsApp admin dengan maklumat bisnes anda (apa dijual, berapa lama beroperasi, SSM atau lesen PBT).',en:'Yes. Resident vendors are selected carefully; the SSK Night Market uses exclusive categories with a deposit. WhatsApp the admin with your business details (what you sell, how long you have operated, SSM or council licence).'}}
];
function renderFaq(){
  $('#faqList').innerHTML=FAQ.map((f,i)=>`<details${i===0?' open':''}><summary>${esc(tx(f.q))}<i></i></summary><div>${tx(f.a)}</div></details>`).join('');
}

/* ---------------- CONTACT → WhatsApp (fixes the old form that sent nothing) ---------------- */
$('#contactForm').addEventListener('submit',e=>{
  e.preventDefault();const f=e.target,v=n=>f.elements[n].value.trim();
  const ok=v('name')&&v('phone')&&v('msg');$('#formErr').hidden=!!ok;if(!ok)return;
  const topic=f.elements.topic.selectedOptions[0].textContent;
  const msg=L()==='ms'?`Salam admin SSK Centre.\nNama: ${v('name')}\nTelefon: ${v('phone')}\nPerkara: ${topic}\n\n${v('msg')}`:`Hi SSK Centre admin.\nName: ${v('name')}\nPhone: ${v('phone')}\nTopic: ${topic}\n\n${v('msg')}`;
  window.open(wa(msg),'_blank','noopener');
});

/* ---------------- CHATBOT ---------------- */
const CHAT={
  root:{m:{ms:'Hai! Saya Bot SSK. Apa yang anda cari?',en:'Hi! I’m the SSK bot. What are you looking for?'},o:[['price',{ms:'Harga sewa',en:'Rental prices'}],['dates',{ms:'Semak tarikh kosong',en:'Check free dates'}],['grant',{ms:'Geran & kursus',en:'Grants & courses'}],['member',{ms:'Keahlian',en:'Membership'}],['contact',{ms:'Hubungi admin',en:'Contact the admin'}]]},
  price:{m:{ms:'Kadar komuniti: <b>Dewan</b> RM50/jam, RM250 ½ hari, RM450 sehari. <b>Bilik Mesyuarat</b> RM40/jam, RM100 ½ hari, RM180 sehari. Kadar korporat dan persendirian ada dalam jadual.',en:'Community rates: <b>Hall</b> RM50/hour, RM250 half day, RM450 full day. <b>Meeting Room</b> RM40/hour, RM100 half day, RM180 full day. Corporate and private rates are in the table.'},o:[['go:#kadar',{ms:'Buka jadual kadar',en:'Open the rates table'}],['dates',{ms:'Semak tarikh',en:'Check dates'}],['root',{ms:'← Menu',en:'← Menu'}]]},
  dates:{m:{ms:'Kalendar menunjukkan slot pagi, petang dan malam yang masih kosong.',en:'The calendar shows which morning, afternoon and evening slots are free.'},o:[['cal:dewan',{ms:'Kalendar Dewan',en:'Hall calendar'}],['cal:mesyuarat',{ms:'Kalendar Bilik Mesyuarat',en:'Meeting Room calendar'}],['root',{ms:'← Menu',en:'← Menu'}]]},
  grant:{m:{ms:'<b>Geran</b> tak perlu dibayar balik (ikut syarat). <b>Pembiayaan</b> ialah pinjaman berkadar rendah. Nak cuba quiz atau terus lihat senarai?',en:'A <b>grant</b> doesn’t need repaying (if you meet the terms). <b>Financing</b> is a low-rate loan. Try the quiz or browse the list?'},o:[['go:#geran',{ms:'Quiz geran',en:'Grant quiz'}],['go:#peluang',{ms:'Senarai penuh',en:'Full list'}],['root',{ms:'← Menu',en:'← Menu'}]]},
  member:{m:{ms:'<b>Komuniti</b> RM60/bulan (diskaun 20%), <b>Business</b> RM200 (30% + 2 jam bilik percuma), <b>Corporate</b> RM800 (40% + penjenamaan).',en:'<b>Community</b> RM60/month (20% off), <b>Business</b> RM200 (30% + 2 free room hours), <b>Corporate</b> RM800 (40% + branding).'},o:[['go:#keahlian',{ms:'Lihat keahlian',en:'See membership'}],['root',{ms:'← Menu',en:'← Menu'}]]},
  contact:{m:{ms:'WhatsApp <b>011-2140 6450</b>, Isnin – Jumaat, 8:30 pagi – 5:00 petang.',en:'WhatsApp <b>011-2140 6450</b>, Monday – Friday, 8:30 am – 5:00 pm.'},o:[['wa',{ms:'Buka WhatsApp',en:'Open WhatsApp'}],['root',{ms:'← Menu',en:'← Menu'}]]}
};
const chatBody=$('#chatBody'),chatPanel=$('#chatPanel'),chatBtn=$('#chatToggle');
function chatSay(html,who){const d=document.createElement('div');d.className='msg '+who;d.innerHTML=html;chatBody.appendChild(d);chatBody.scrollTop=chatBody.scrollHeight;}
function chatNode(k){const n=CHAT[k];chatSay(tx(n.m),'bot');const w=document.createElement('div');w.className='opts';n.o.forEach(([to,lab])=>{const b=document.createElement('button');b.textContent=tx(lab);b.dataset.to=to;w.appendChild(b);});chatBody.appendChild(w);chatBody.scrollTop=chatBody.scrollHeight;}
chatBody.addEventListener('click',e=>{
  const b=e.target.closest('[data-to]');if(!b)return;const to=b.dataset.to;b.parentElement.remove();chatSay(esc(b.textContent),'me');
  if(to.startsWith('go:')){toggleChat(false);goTo(to.slice(3));setTimeout(()=>chatNode('root'),300);}
  else if(to.startsWith('cal:')){toggleChat(false);const x=document.createElement('button');x.dataset.cal=to.slice(4);x.hidden=true;document.body.appendChild(x);x.click();x.remove();setTimeout(()=>chatNode('root'),300);}
  else if(to==='wa'){window.open(wa(L()==='ms'?'Salam admin SSK Centre, saya ingin bertanya.':'Hi SSK Centre admin, I have a question.'),'_blank','noopener');chatNode('root');}
  else chatNode(to);
});
function toggleChat(force){const open=force==null?chatPanel.hidden:force;chatPanel.hidden=!open;chatBtn.setAttribute('aria-expanded',open);if(open&&!chatBody.children.length)chatNode('root');}
chatBtn.addEventListener('click',()=>toggleChat());

/* ---------------- NAV: links, mobile menu, solid bar ---------------- */
function goTo(hash){const el=document.querySelector(hash);if(!el)return;if(lenis)lenis.scrollTo(el,{offset:-70});else el.scrollIntoView({behavior:'smooth'});}
document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(!a||a.getAttribute('href').length<2)return;e.preventDefault();document.body.classList.remove('menu-open');$('#menuBtn').setAttribute('aria-expanded',false);goTo(a.getAttribute('href'));});
$('#menuBtn').addEventListener('click',()=>{const o=document.body.classList.toggle('menu-open');$('#menuBtn').setAttribute('aria-expanded',o);});
const navEl=document.querySelector('.nav');
function onScroll(){const y=lenis?lenis.scroll:scrollY;navEl.classList.toggle('solid',y>innerHeight*.6);}
if(lenis)lenis.on('scroll',onScroll);addEventListener('scroll',onScroll,{passive:true});onScroll();

/* ---------------- render + language ---------------- */
function renderAll(){renderRates();renderQuiz();renderOpp();renderTiers();renderEvents();renderFaq();
  if(!chatPanel.hidden){chatBody.innerHTML='';chatNode('root');}else chatBody.innerHTML='';}
(window.__langHooks=window.__langHooks||[]).push(renderAll);
setLang(LANG);
// layout changed (content added) → recompute 3D scroll keyframes
if(typeof buildStops==='function'){buildStops();addEventListener('load',buildStops);}
})();
