/* =========================================================
   SSK Centre: activities page (aktiviti.html)
   Lists window.SSK_AKTIVITI grouped by year, with a category
   filter and a photo viewer. Language choice is shared with
   the home page through localStorage "ssk-lang".
   ========================================================= */
(function(){
const T={
  ms:{n0:'Profil',n6:'Ruang 3D',n1:'Kadar sewa',n2:'Geran',n7:'Aktiviti',n5:'Hubungi',navcta:'WhatsApp admin',
      aEye:'Arkib program & aktiviti',aH:'Aktiviti di <em>SSK Centre</em>',
      aLead:'Program, bengkel dan acara komuniti yang telah diadakan di SSK Centre, Kota Belud. Klik mana-mana aktiviti untuk melihat semua gambar.',
      all:'Semua',archive:'Arkib',photos:'gambar',view:'Lihat gambar',
      aCtaH:'Mahu anjurkan program<br><em>di SSK Centre?</em>',aCta1:'Semak kadar & tarikh',footBy:'Diuruskan oleh SmartBah Technology Sdn Bhd',
      close:'Tutup',prev:'Gambar sebelum',next:'Gambar seterusnya'},
  en:{n0:'Profile',n6:'3D space',n1:'Rates',n2:'Grants',n7:'Activities',n5:'Contact',navcta:'WhatsApp admin',
      aEye:'Programme & activity archive',aH:'Activities at <em>SSK Centre</em>',
      aLead:'Programmes, workshops and community events held at SSK Centre, Kota Belud. Click any activity to see all its photos.',
      all:'All',archive:'Archive',photos:'photos',view:'View photos',
      aCtaH:'Want to host a programme<br><em>at SSK Centre?</em>',aCta1:'Check rates & dates',footBy:'Managed by SmartBah Technology Sdn Bhd',
      close:'Close',prev:'Previous photo',next:'Next photo'}
};
const MON={ms:['Jan','Feb','Mac','Apr','Mei','Jun','Jul','Ogo','Sep','Okt','Nov','Dis'],en:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const fmt=(d,l)=>{if(!d)return '';const p=d.split('-');return p.length===1?p[0]:(+p[2])+' '+MON[l][+p[1]-1]+' '+p[0];};
const DATA=(window.SSK_AKTIVITI||[]).slice().sort((a,b)=>(b.date||'').localeCompare(a.date||''));
const CAT=window.SSK_AKTIVITI_CAT||{};
let LANG='ms',filter='all';
try{const s=localStorage.getItem('ssk-lang');if(s&&T[s])LANG=s;}catch(e){}

const list=document.getElementById('aktList'),fbox=document.getElementById('aktFilter');

function render(){
  const l=LANG,t=T[l];
  // filter chips: only categories that have activities
  const cats=['all',...Object.keys(CAT).filter(c=>DATA.some(a=>a.cat===c))];
  fbox.innerHTML=cats.map(c=>`<button data-c="${c}" aria-pressed="${c===filter}">${esc(c==='all'?t.all:CAT[c][l])}</button>`).join('');
  const shown=DATA.filter(a=>filter==='all'||a.cat===filter);
  const groups=[];shown.forEach(a=>{const y=a.date?a.date.slice(0,4):t.archive;let g=groups.find(x=>x.y===y);if(!g)groups.push(g={y,items:[]});g.items.push(a);});
  list.innerHTML=groups.map(g=>`<section class="akt-year" aria-label="${esc(g.y)}">
    <h2 class="akt-y">${esc(g.y)}</h2>
    <div class="akt-grid">${g.items.map(a=>`<button class="akt-card" id="${a.id}" data-id="${a.id}" aria-label="${esc(t.view)}: ${esc(a.title[l])}">
      <span class="akt-img"><img src="assets/aktiviti/${a.photos[0]}.jpg" alt="" loading="lazy"><i class="akt-badge">${a.photos.length} ${t.photos}</i></span>
      <span class="akt-meta">${a.date?esc(fmt(a.date,l))+' · ':''}${esc(CAT[a.cat]?CAT[a.cat][l]:'')}</span>
      <b>${esc(a.title[l])}</b>
      <span class="akt-desc">${esc(a.desc[l])}</span>
    </button>`).join('')}</div></section>`).join('');
}
function setLang(l){
  LANG=l;document.documentElement.lang=l;
  document.querySelectorAll('[data-i18n]').forEach(el=>{const v=T[l][el.dataset.i18n];if(v!=null)el.textContent=v;});
  document.querySelectorAll('[data-i18n-html]').forEach(el=>{const v=T[l][el.dataset.i18nHtml];if(v!=null)el.innerHTML=v;});
  document.querySelectorAll('.lang button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.lang===l));
  ['lbX','lbPrev','lbNext'].forEach((id,i)=>document.getElementById(id).setAttribute('aria-label',T[l][['close','prev','next'][i]]));
  try{localStorage.setItem('ssk-lang',l)}catch(e){}
  render();
}
document.querySelectorAll('.lang button').forEach(b=>b.addEventListener('click',()=>setLang(b.dataset.lang)));
fbox.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;filter=b.dataset.c;render();});

/* ---------- photo viewer ---------- */
const lb=document.getElementById('lb'),img=document.getElementById('lbImg');
let cur=null,idx=0,lastFocus=null;
function show(){const a=cur;img.src=`assets/aktiviti/${a.photos[idx]}.jpg`;img.alt=a.title[LANG];
  document.getElementById('lbTitle').textContent=a.title[LANG];
  document.getElementById('lbCount').textContent=`${idx+1} / ${a.photos.length}${a.date?' · '+fmt(a.date,LANG):''}`;
  lb.classList.toggle('single',a.photos.length<2);}
function open(id){cur=DATA.find(a=>a.id===id);if(!cur)return;idx=0;lastFocus=document.activeElement;show();lb.hidden=false;document.documentElement.style.overflow='hidden';document.getElementById('lbX').focus();}
function close(){lb.hidden=true;document.documentElement.style.overflow='';if(lastFocus)lastFocus.focus();}
const step=d=>{if(!cur)return;idx=(idx+d+cur.photos.length)%cur.photos.length;show();};
list.addEventListener('click',e=>{const c=e.target.closest('.akt-card');if(c)open(c.dataset.id);});
document.getElementById('lbX').addEventListener('click',close);
document.getElementById('lbPrev').addEventListener('click',()=>step(-1));
document.getElementById('lbNext').addEventListener('click',()=>step(1));
lb.addEventListener('click',e=>{if(e.target===lb)close();});
addEventListener('keydown',e=>{if(lb.hidden)return;if(e.key==='Escape')close();else if(e.key==='ArrowLeft')step(-1);else if(e.key==='ArrowRight')step(1);});
let sx=null;lb.addEventListener('touchstart',e=>{sx=e.touches[0].clientX},{passive:true});
lb.addEventListener('touchend',e=>{if(sx==null)return;const dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>40)step(dx<0?1:-1);sx=null;});

/* ---------- mobile menu ---------- */
const menuBtn=document.getElementById('menuBtn');
menuBtn.addEventListener('click',()=>{const o=document.body.classList.toggle('menu-open');menuBtn.setAttribute('aria-expanded',o);});
document.getElementById('navLinks').addEventListener('click',e=>{if(e.target.closest('a'))document.body.classList.remove('menu-open');});

setLang(LANG);
// deep link from the home page (aktiviti.html#id): bring that card into view and open it
if(location.hash){const id=decodeURIComponent(location.hash.slice(1));const el=document.getElementById(id);if(el){el.scrollIntoView({block:'center'});open(id);}}
})();
