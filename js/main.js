/* ================= i18n ================= */
const T={
 ms:{navcta:'WhatsApp admin',rail1:'Dewan',rail2:'Mesyuarat',rail4:'Lain-lain',rail5:'Datang',
  intro:'Satu ruang untuk seluruh komuniti Kota Belud: dewan, bilik mesyuarat, CentreKafe, dan panduan geran untuk usahawan.',cue:'Skrol untuk masuk',
  rent:'Boleh disewa',public:'Terbuka untuk umum',ppl:'orang',perhr:'sejam · komuniti',perday:'sehari · komuniti',
  dewanH:'Dewan<br><em>Serbaguna</em>',dewanP:'Seminar, majlis dan acara komuniti. Kadar korporat dan deposit disahkan oleh admin semasa tempahan.',checkDates:'Semak tarikh & tempah',
  mesH:'Bilik<br><em>Mesyuarat</em>',mesP:'Mesyuarat, latihan dan sesi perbincangan. Ahli Business dapat 2 jam percuma setiap bulan.',bookRoom:'Tempah bilik',member:'Lihat keahlian',
  kafeP:'Kafe di dalam SSK Centre. Singgah sebelum atau selepas program, atau sambung berbincang selepas mesyuarat.',kafeCta:'Lihat waktu buka',
  also:'Dan juga',m1:'Surau',m1s:'Kemudahan',m2:'Kaunter Reception',m2s:'Pertanyaan',m3:'Pejabat SSK',m3s:'Kakitangan',m4:'Tandas & Stor',m4s:'Kemudahan',m5:'Dapur & Stor',m5s:'Kakitangan',
  tab1:'Dewan',tab2:'Bilik Mesyuarat',tab4:'Lain-lain',exHint:'Klik bilik pada bangunan',finalH:'Pintu kami<br><em>terbuka.</em>',days:'Isnin – Jumaat',wa:'WhatsApp admin',grant:'Cari geran yang sesuai',proto:'Prototype',calEye:'Ketersediaan ruang',calDemo:'Prototaip: tarikh di bawah ialah contoh, belum disambung ke rekod tempahan sebenar.',lgFree:'Kosong',lgPart:'Separa',lgFull:'Penuh',lgClosed:'Sudah lepas',pickDay:'Pilih tarikh untuk lihat slot.',sendReq:'Hantar permintaan tempahan',calNote:'Permintaan dihantar ke WhatsApp admin. Tempahan disahkan dalam 24 jam waktu bekerja. Masa di luar slot boleh diatur dengan admin.'},
 en:{navcta:'WhatsApp us',rail1:'Hall',rail2:'Meeting',rail4:'More',rail5:'Visit',
  intro:'One space for the whole Kota Belud community: a hall, a meeting room, CentreKafe, and a grants guide for entrepreneurs.',cue:'Scroll to step inside',
  rent:'Available to rent',public:'Open to the public',ppl:'people',perhr:'per hour · community',perday:'per day · community',
  dewanH:'Multipurpose<br><em>Hall</em>',dewanP:'Seminars, ceremonies and community events. Corporate rates and deposits are confirmed by the admin when you book.',checkDates:'Check dates & book',
  mesH:'Meeting<br><em>Room</em>',mesP:'Meetings, training and working sessions. Business members get 2 free hours every month.',bookRoom:'Book the room',member:'See membership',
  kafeP:'The café inside SSK Centre. Drop by before or after a programme, or keep the conversation going after a meeting.',kafeCta:'See opening hours',
  also:'And also',m1:'Prayer Room',m1s:'Facility',m2:'Reception',m2s:'Enquiries',m3:'SSK Office',m3s:'Staff',m4:'Toilets & Storage',m4s:'Facility',m5:'Kitchen & Storage',m5s:'Staff',
  tab1:'Hall',tab2:'Meeting Room',tab4:'More',exHint:'Click a room on the building',finalH:'Our doors<br><em>are open.</em>',days:'Monday – Friday',wa:'WhatsApp admin',grant:'Find the right grant',proto:'Prototype',calEye:'Space availability',calDemo:'Prototype: the dates below are examples, not yet connected to the real booking records.',lgFree:'Free',lgPart:'Partly booked',lgFull:'Full',lgClosed:'Past',pickDay:'Pick a date to see the slots.',sendReq:'Send booking request',calNote:'Your request goes to the admin on WhatsApp. Bookings are confirmed within 24 working hours. Times outside these slots can be arranged with the admin.'}
};
const NAMES={dewan:['Dewan Serbaguna','Multipurpose Hall'],mesyuarat:['Bilik Mesyuarat','Meeting Room'],kafe:['CentreKafe','CentreKafe'],dapur:['Dapur & Stor','Kitchen & Storage'],surau:['Surau','Prayer Room'],pejabat:['Pejabat SSK','SSK Office'],kaunter:['Kaunter Reception','Reception'],tandas:['Tandas & Stor','Toilets & Storage']};
let LANG='ms';
function setLang(l){
  LANG=l;document.documentElement.lang=l;
  document.querySelectorAll('[data-i18n]').forEach(el=>{const v=T[l][el.dataset.i18n];if(v!=null)el.textContent=v;});
  document.querySelectorAll('[data-i18n-html]').forEach(el=>{el.innerHTML=T[l][el.dataset.i18nHtml];});
  document.querySelectorAll('.lang button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.lang===l));
  try{localStorage.setItem('ssk-lang',l)}catch(e){}
  (window.__langHooks||[]).forEach(f=>f(l));
}
document.querySelectorAll('.lang button').forEach(b=>b.addEventListener('click',()=>setLang(b.dataset.lang)));
try{const s=localStorage.getItem('ssk-lang');if(s&&T[s])setLang(s)}catch(e){}
requestAnimationFrame(()=>document.body.classList.add('loaded'));

/* ================= smooth scroll ================= */
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
let lenis=null;
// touch devices already scroll natively and smoothly; Lenis only adds a second rAF loop there
if(window.Lenis&&!reduced&&!matchMedia('(pointer: coarse)').matches){lenis=new Lenis({duration:1.25,smoothWheel:true});window.__lenis=lenis;const raf=t=>{lenis.raf(t);requestAnimationFrame(raf)};requestAnimationFrame(raf);}

/* ================= 3D ================= */
const canvas=document.getElementById('scene'),tip=document.getElementById('tip');
// phones/tablets: lighter render (lower pixel ratio, smaller hard-edged shadow map)
const LITE=matchMedia('(pointer: coarse)').matches||innerWidth<900;
const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true,powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(devicePixelRatio,LITE?1.3:1.75));
renderer.shadowMap.enabled=true;renderer.shadowMap.type=LITE?THREE.PCFShadowMap:THREE.PCFSoftShadowMap;
const scene=new THREE.Scene();
const cam=new THREE.OrthographicCamera(-1,1,1,-1,.1,200);
const OFF=new THREE.Vector3(10,9,10);

const C={clad:0xf6f5f1,navy:0x1a2a6c,deep:0x111c4a,sky:0x7ec8e3,red:0xd8352b,stone:0xe6e1d6,frame:0x33363e,roof:0xe2e0da,floor:0xefeae0,wood:0xc9a77c,warm:0xffc979};
const hemi=new THREE.HemisphereLight(0xffffff,0xd9d2c3,.8);scene.add(hemi);
const sun=new THREE.DirectionalLight(0xfff4e0,.85);sun.position.set(6,12,4);sun.castShadow=true;
sun.shadow.mapSize.set(LITE?1024:2048,LITE?1024:2048);Object.assign(sun.shadow.camera,{left:-12,right:12,top:12,bottom:-12});sun.shadow.radius=5;scene.add(sun);

const root=new THREE.Group();scene.add(root);
const mat=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.85,metalness:0},o));
function box(w,h,d,m,x,y,z){const g=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);g.position.set(x,y+h/2,z);g.castShadow=g.receiveShadow=true;return g;}
function cyl(r,h,m,x,y,z,seg=16){const g=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,seg),m);g.position.set(x,y+h/2,z);g.castShadow=g.receiveShadow=true;return g;}
/* plan units traced from "SSK Centre Layout 2026" -> model units */
const P=(x,y)=>[(x-405)*.04,(y-195)*.04];

const ground=new THREE.Mesh(new THREE.PlaneGeometry(80,80),new THREE.ShadowMaterial({opacity:.09}));
ground.rotation.x=-Math.PI/2;ground.position.y=-.2;ground.receiveShadow=true;root.add(ground);
function slab(x1,y1,x2,y2,h,m){const[a,b]=P(x1,y1),[c,d]=P(x2,y2);root.add(box(c-a,h,d-b,m,(a+c)/2,-.2,(b+d)/2));}
slab(255,62,555,328,.24,mat(C.stone));
slab(268,332,540,398,.06,mat(0xe9e5dc));
const lineM=mat(0xffffff);
[280,309,338,376,405,434,463,492,521].forEach(x=>{const[a,b]=P(x,340);root.add(box(.03,.01,2.2,lineM,a,-.14,b+1.1));});

const rooms={},pickables=[],glowMats=[];
const T_=.07;
function room(key,x1,y1,x2,y2,h,style){
  const[a,b]=P(x1,y1),[c,d]=P(x2,y2),w=c-a,dd=d-b;
  const g=new THREE.Group();g.position.set((a+c)/2,0,(b+d)/2);
  const fm=mat(C.floor,{emissive:C.warm,emissiveIntensity:0});glowMats.push(fm);
  g.add(box(w-T_,.03,dd-T_,fm,0,0,0));
  if(style==='glass'){
    const gl=mat(0x9fc3d6,{roughness:.1,transparent:true,opacity:.3,depthWrite:false,emissive:C.warm,emissiveIntensity:0});glowMats.push(gl);
    const fr=mat(C.frame,{roughness:.6});
    g.add(box(w,h,T_*.6,gl,0,0,-dd/2));g.add(box(w,h,T_*.6,gl,0,0,dd/2));
    g.add(box(T_*.6,h,dd,gl,-w/2,0,0));g.add(box(T_*.6,h,dd,gl,w/2,0,0));
    for(let i=0;i<=6;i++){const x=-w/2+i*w/6;g.add(box(.05,h,.05,fr,x,0,-dd/2));g.add(box(.05,h,.05,fr,x,0,dd/2));}
    for(let i=1;i<4;i++){const z=-dd/2+i*dd/4;g.add(box(.05,h,.05,fr,-w/2,0,z));g.add(box(.05,h,.05,fr,w/2,0,z));}
    g.add(box(w+.05,.06,.06,fr,0,h-.06,-dd/2));g.add(box(w+.05,.06,.06,fr,0,h-.06,dd/2));
    g.add(box(.06,.06,dd,fr,-w/2,h-.06,0));g.add(box(.06,.06,dd,fr,w/2,h-.06,0));
  }else{
    const wm=mat(C.clad);
    g.add(box(w,h,T_,wm,0,0,-dd/2));g.add(box(w,h,T_,wm,0,0,dd/2));
    g.add(box(T_,h,dd,wm,-w/2,0,0));g.add(box(T_,h,dd,wm,w/2,0,0));
    // window strip on the front face, glows at night
    const win=mat(0x2b3140,{roughness:.3,emissive:C.warm,emissiveIntensity:0});glowMats.push(win);
    g.add(box(w*.55,h*.32,.02,win,0,h*.42,dd/2+.04));
  }
  const roof=new THREE.Group();roof.position.y=h;g.add(roof);
  const rm=mat(style==='glass'?C.frame:C.roof,{transparent:true,opacity:1}),fm2=mat(C.frame,{transparent:true,opacity:1});
  roof.add(box(w+.3,.08,dd+.3,rm,0,0,0));roof.add(box(w+.32,.035,dd+.32,fm2,0,-.03,0));
  // neighbouring roofs overhang into each other; give every roof its own height so overlaps never share a plane
  const bias=.02+Object.keys(rooms).length*.012;
  g.userData={key,fm,roof,roofMats:[rm,fm2],h,bias,open:0};
  g.traverse(o=>{if(o.isMesh){o.userData.room=key;pickables.push(o);}});
  root.add(g);rooms[key]=g;return g;
}
room('dewan',372,240,487,322,1.2,'glass');
room('kafe',372,138,490,205,1.0,'glass');
room('dapur',365,85,500,118,.85,'clad');
room('tandas',272,100,352,160,.85,'clad');
room('mesyuarat',305,165,345,232,.95,'clad');
room('kaunter',305,235,345,290,.95,'glass');
room('surau',260,198,300,252,.9,'clad');
room('pejabat',258,262,300,305,.95,'clad');

/* interiors */
const navyM=mat(C.navy),deepM=mat(C.deep,{roughness:.5}),woodM=mat(C.wood),whiteM=mat(0xffffff),chairM=mat(0xd8d1c2),skyM=mat(C.sky,{roughness:.6}),redM=mat(C.red,{roughness:.5}),greenM=mat(0x8fae9b),steelM=mat(0xb9bcc2,{roughness:.35,metalness:.3}),screenM=mat(0x22252b,{roughness:.3,emissive:0x7ec8e3,emissiveIntensity:0});glowMats.push(screenM);
const add=(k,m)=>{rooms[k].add(m);m.userData.room=k;pickables.push(m);return m;};
add('dewan',box(.9,.14,1.6,navyM,-1.75,0,-.1));add('dewan',box(.04,.7,1.2,whiteM,-2.22,.14,-.1));add('dewan',box(.18,.28,.3,woodM,-1.55,.14,-.1));
for(let r=0;r<4;r++)for(let k=0;k<5;k++)add('dewan',box(.16,.1,.16,chairM,-.75+r*.42,0,-.85+k*.42));
add('dewan',box(.5,.22,.25,woodM,1.9,0,1.25));
add('mesyuarat',box(.55,.16,1.5,deepM,0,0,.05));
for(let k=0;k<5;k++){add('mesyuarat',box(.14,.1,.14,chairM,-.42,0,-.55+k*.3));add('mesyuarat',box(.14,.1,.14,chairM,.42,0,-.55+k*.3));}
add('mesyuarat',box(.7,.42,.04,screenM,0,.3,-1.27));
add('kafe',box(3.4,.34,.26,navyM,-.2,0,-1.0));add('kafe',box(.5,.12,.2,steelM,-1.4,.34,-1.0));
[[-1.5,.15],[-.6,.55],[.3,.15],[1.2,.55],[2.0,.1]].forEach(([x,z])=>{add('kafe',cyl(.17,.2,woodM,x,0,z,20));add('kafe',cyl(.07,.12,skyM,x+.27,0,z,12));add('kafe',cyl(.07,.12,skyM,x-.27,0,z,12));});
[[-2.15,1.05],[2.2,-.9]].forEach(([x,z])=>{add('kafe',cyl(.09,.14,mat(0x6f6a62),x,0,z,10));const s=add('kafe',new THREE.Mesh(new THREE.SphereGeometry(.16,12,10),greenM));s.position.set(x,.3,z);s.castShadow=true;});
add('dapur',box(4.2,.3,.22,steelM,-.2,0,-.5));add('dapur',box(.32,.6,.28,whiteM,2.3,0,-.42));add('dapur',box(.8,.5,.2,woodM,-2.1,0,.42));
for(let i=0;i<3;i++)add('tandas',box(.03,.55,.5,whiteM,.35+i*.38,0,-.8));
add('tandas',box(.7,.18,.18,whiteM,.9,.2,.98));add('tandas',box(.18,.55,1.6,woodM,-1.38,0,-.2));add('tandas',box(.18,.55,1.2,woodM,-.75,0,.4));
for(let r=0;r<3;r++)for(let k=0;k<2;k++)add('surau',box(.3,.012,.55,r===0?redM:skyM,-.35+k*.55,0,-.65+r*.68));
add('surau',box(1.2,.32,.12,woodM,.25,0,1.0));
[[-.35,-.35],[.35,-.35],[0,.45]].forEach(([x,z])=>{add('pejabat',box(.55,.18,.32,woodM,x,0,z));add('pejabat',box(.24,.16,.02,screenM,x,.18,z-.08));add('pejabat',box(.15,.1,.15,chairM,x,0,z+.3));});
add('pejabat',box(.2,.5,.6,deepM,-.7,0,.2));
add('kaunter',box(.9,.3,.18,woodM,0,0,-.35));add('kaunter',box(.18,.3,.5,woodM,.44,0,-.1));add('kaunter',box(.7,.16,.25,navyM,-.1,0,.75));add('kaunter',box(.6,.4,.03,redM,0,.2,-1.05));

/* exterior details: red portal, tanks, trees, planters, street lamps */
const[ex,ez]=P(358,326);
root.add(box(.12,1.25,.5,redM,ex-.42,0,ez));root.add(box(.12,1.25,.5,redM,ex+.42,0,ez));root.add(box(.96,.14,.5,redM,ex,1.25,ez));
[[428,72],[440,72]].forEach(([x,y])=>{const[a,b]=P(x,y);root.add(cyl(.14,.5,mat(0xdedad2),a,0,b,18));});
const treeM=mat(0x8fae9b),trunkM=mat(0x9a8770);
[[245,120],[245,230],[240,320],[565,150],[568,260],[560,330],[300,55],[470,52],[255,410],[550,410]].forEach(([px,py],i)=>{
  const[x,z]=P(px,py),s=.7+((i*37)%5)/10;
  const t=new THREE.Mesh(new THREE.ConeGeometry(.32*s,1.1*s,7),treeM);t.position.set(x,.15+.55*s,z);t.castShadow=true;root.add(t);
  root.add(box(.06,.35,.06,trunkM,x,-.2,z));
});
[400,420,440,460,480].forEach(px=>{const[x,z]=P(px,326);root.add(box(.16,.14,.16,mat(C.frame),x,.04,z));const b=new THREE.Mesh(new THREE.SphereGeometry(.1,10,8),treeM);b.position.set(x,.28,z);root.add(b);});
const lampM=mat(0xffffff,{emissive:C.warm,emissiveIntensity:0});glowMats.push(lampM);
[290,350,430,510].forEach(px=>{const[x,z]=P(px,400);root.add(box(.04,1.1,.04,mat(C.frame),x,-.2,z));const h=new THREE.Mesh(new THREE.SphereGeometry(.08,12,10),lampM);h.position.set(x,.95,z);root.add(h);});
/* phones: small props (chairs, tables, pots…) skip the shadow pass — roughly halves the draw calls per frame */
if(LITE){const bb=new THREE.Box3(),sz=new THREE.Vector3();root.traverse(o=>{if(!o.isMesh)return;bb.setFromObject(o).getSize(sz);if(Math.max(sz.x,sz.y,sz.z)<.6){o.castShadow=false;o.receiveShadow=false;}});}

/* ================= scroll keyframes ================= */
const VIEWS={
  intro:{room:null,zoom:.82,rot:.42,side:-.35,lift:2.4},
  dewan:{room:'dewan',zoom:1.75,rot:.18,side:-1},
  mesyuarat:{room:'mesyuarat',zoom:2.4,rot:.62,side:-1},
  kafe:{room:'kafe',zoom:1.85,rot:.05,side:-1},
  surau:{room:'surau',zoom:2.3,rot:.75,side:-1},
  kaunter:{room:'kaunter',zoom:2.3,rot:.6,side:-1},
  pejabat:{room:'pejabat',zoom:2.3,rot:.85,side:-1},
  tandas:{room:'tandas',zoom:2.2,rot:.7,side:-1},
  dapur:{room:'dapur',zoom:2.0,rot:.3,side:-1},
  final:{room:null,zoom:1.05,rot:-.25,side:.55,night:1}
};
/* desktop/laptop (mouse + wide screen): one-screen explorer; phones/tablets: scroll tour */
const EXPLORE=matchMedia('(min-width: 900px) and (pointer: fine)').matches;
document.body.classList.toggle('explore',EXPLORE);
matchMedia('(min-width: 900px) and (pointer: fine)').addEventListener('change',()=>location.reload());
let stops=[];
const chapters=[...document.querySelectorAll('.ch')];
// chapter geometry is cached here (reading offsetTop every frame forces a layout → jank on phones)
const geo=new Map();
// the opaque .content block hides the 3D completely while it fills the screen → no need to draw then
const contentEl=document.querySelector('.content');let coverRange=[Infinity,-Infinity];
function buildStops(){
  stops=[];const vh=innerHeight;
  chapters.forEach(sec=>{
    const top=sec.offsetTop,h=sec.offsetHeight-vh,ch=sec.dataset.ch;
    geo.set(sec,{top,h});
    if(contentEl)coverRange=[contentEl.offsetTop,contentEl.offsetTop+contentEl.offsetHeight];
    if(EXPLORE){
      // desktop: 3 short screens — intro → explorer (camera follows the selected room) → night
      if(ch==='intro')stops.push({s:0,v:'intro'});
      else if(ch==='explorer'){stops.push({s:top,v:'SEL'});stops.push({s:top+vh*.3,v:'SEL'});}
      else if(ch==='final'){stops.push({s:top-vh*.8,v:'SEL'});stops.push({s:top,v:'final'});stops.push({s:top+vh,v:'final'});}
      return;
    }
    if(ch==='explorer')return;
    if(ch==='intro'){stops.push({s:0,v:'intro'});stops.push({s:top+h*.25,v:'intro'});}
    else if(ch==='more'){['surau','kaunter','pejabat','dapur','tandas'].forEach((k,i)=>{const a=top+h*(.05+i*.19);stops.push({s:a,v:k});stops.push({s:a+h*.1,v:k});});}
    else if(ch==='final'){stops.push({s:top-vh*.8,v:stops[stops.length-1].v});stops.push({s:top+h*.45,v:'final'});stops.push({s:top+h+vh,v:'final'});}
    else{stops.push({s:top+h*.22,v:ch});stops.push({s:top+h*.78,v:ch});}
  });
}
const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
function sample(y){
  if(y<=stops[0].s)return{a:stops[0].v,b:stops[0].v,t:0};
  for(let i=0;i<stops.length-1;i++){const A=stops[i],B=stops[i+1];if(y>=A.s&&y<=B.s)return{a:A.v,b:B.v,t:B.s===A.s?0:ease((y-A.s)/(B.s-A.s))};}
  const L=stops[stops.length-1];return{a:L.v,b:L.v,t:0};
}

/* per-chapter progress -> CSS var --in (text panels) */
function sectionIn(sec,y){
  const g=geo.get(sec)||{top:0,h:1},top=g.top,h=g.h;
  const p=(y-top)/Math.max(h,1);
  const inn=Math.min(1,Math.max(0,(p-.08)/.14)),out=Math.min(1,Math.max(0,(p-.80)/.12));
  return Math.max(0,inn-out);
}
const rail=[...document.querySelectorAll('#rail li')],moreLis=[...document.querySelectorAll('#moreList li')],ribbons=document.getElementById('ribbons');

/* ================= desktop explorer ================= */
const ORDER=['dewan','mesyuarat','kafe','surau','kaunter','pejabat','dapur','tandas'];
let selected='dewan';
const exSec=document.getElementById('explore'),exPanels=document.getElementById('exPanels'),panelFor={};
const tabs=[...document.querySelectorAll('.ex-tabs button')];
if(EXPLORE){
  ['dewan','mesyuarat','kafe','more'].forEach(ch=>{const p=document.querySelector(`[data-ch="${ch}"] .panel`);exPanels.appendChild(p);panelFor[ch]=p;});
  tabs.forEach(b=>b.addEventListener('click',()=>select(b.dataset.sel==='more'?'surau':b.dataset.sel)));
  moreLis.forEach(li=>li.addEventListener('click',()=>select(li.dataset.room)));
  const step=d=>select(ORDER[(ORDER.indexOf(selected)+d+ORDER.length)%ORDER.length]);
  document.getElementById('exPrev').addEventListener('click',()=>step(-1));
  document.getElementById('exNext').addEventListener('click',()=>step(1));
  addEventListener('keydown',e=>{if(!inExplorer()||document.getElementById('cal').classList.contains('open'))return;if(e.key==='ArrowRight')step(1);if(e.key==='ArrowLeft')step(-1);});
  select('dewan');
}
function select(k){
  selected=k;const grp=['dewan','mesyuarat','kafe'].includes(k)?k:'more';
  Object.entries(panelFor).forEach(([g,p])=>p.classList.toggle('show',g===grp));
  tabs.forEach(b=>{const on=b.dataset.sel===grp;b.classList.toggle('on',on);b.setAttribute('aria-selected',on);});
  moreLis.forEach(li=>li.classList.toggle('on',li.dataset.room===k));
  document.getElementById('exCount').textContent=String(ORDER.indexOf(k)+1).padStart(2,'0')+' / '+String(ORDER.length).padStart(2,'0');
}
function scrollY_(){return lenis?lenis.scroll:scrollY}
function inExplorer(){const g=geo.get(exSec);return EXPLORE&&!!g&&Math.abs(scrollY_()-g.top)<innerHeight*.35}
/* only touch the DOM when a value actually changes */
const _last=new WeakMap();
function setVar(el,name,val){let m=_last.get(el);if(!m){m={};_last.set(el,m);}if(m[name]!==val){m[name]=val;el.style.setProperty(name,val);}}

/* ================= state + loop ================= */
const cur={zoom:.82,rot:.42,tx:0,tz:0,side:-.35,night:0,lift:2.4};
const tgt=Object.assign({},cur);
const open={};Object.keys(rooms).forEach(k=>open[k]=0);
let hoverKey=null,activeTip=null;
const v=new THREE.Vector3(),right=new THREE.Vector3(1,0,-1).normalize();

// The stage is sized to the *large* viewport (100lvh), so the phone's address bar showing/hiding
// does not reallocate the WebGL buffers mid-scroll; only real width changes do.
const stageEl=document.getElementById('stage');let lastW=0,lastH=0;
function resize(){
  const w=stageEl.clientWidth||innerWidth,h=stageEl.clientHeight||innerHeight;
  if(w!==lastW||h!==lastH){
    lastW=w;lastH=h;renderer.setSize(w,h,false);
    const s=w<900?8.2:7.2,a=w/h;
    cam.left=-s*a;cam.right=s*a;cam.top=s;cam.bottom=-s;cam.updateProjectionMatrix();
  }
  buildStops();dirty=true;
}
let dirty=true;
addEventListener('resize',resize);resize();
addEventListener('load',()=>{buildStops();dirty=true;});
if(window.ResizeObserver)new ResizeObserver(()=>{buildStops();dirty=true;}).observe(document.body);

function viewTarget(name){
  const sel=name==='SEL';if(sel)name=selected;
  const V=VIEWS[name]||VIEWS.intro;const o={zoom:sel?Math.max(1.1,V.zoom*.66):V.zoom,rot:V.rot,side:V.side||0,night:V.night||0,lift:V.lift||0,tx:0,tz:0,room:V.room};
  if(V.room){const g=rooms[V.room];const p=g.position.clone();p.applyAxisAngle(new THREE.Vector3(0,1,0),V.rot);o.tx=p.x;o.tz=p.z;}
  return o;
}
function lerp(a,b,t){return a+(b-a)*t}

let t0=0,px=0,py=0;
addEventListener('pointermove',e=>{px=e.clientX/innerWidth-.5;py=e.clientY/innerHeight-.5;},{passive:true});

let roomMoving=1,lastY=-1,lastPx=0,lastHover=null,lastSel=null,lastLang=null;
function frame(){
  requestAnimationFrame(frame);
  t0+=1/60;
  const y=lenis?lenis.scroll:scrollY;
  const s=sample(y),A=viewTarget(s.a),B=viewTarget(s.b),k=s.t;
  ['zoom','rot','side','night','lift','tx','tz'].forEach(p=>tgt[p]=lerp(A[p],B[p],k));
  const sm=reduced?1:.085;
  let moving=0;
  for(const p in tgt){const d=tgt[p]-cur[p];cur[p]+=d*sm;moving=Math.max(moving,Math.abs(d));}
  moving=Math.max(moving,roomMoving);
  // idle: nothing scrolled, hovered or animating → skip DOM work and the WebGL draw (saves battery, frees the GPU)
  const idle=!dirty&&y===lastY&&px===lastPx&&hoverKey===lastHover&&selected===lastSel&&LANG===lastLang&&moving<.0004;
  if(idle)return;
  dirty=false;lastY=y;lastPx=px;lastHover=hoverKey;lastSel=selected;lastLang=LANG;

  // which rooms are open from scroll (weighted by proximity), plus hover in free views
  const scrollOpen={};if(A.room)scrollOpen[A.room]=(scrollOpen[A.room]||0)+(1-k);if(B.room)scrollOpen[B.room]=(scrollOpen[B.room]||0)+k;
  const free=!A.room&&!B.room,inEx=inExplorer();
  document.body.classList.toggle('pointing',!!hoverKey&&(free||inEx));
  roomMoving=0;
  Object.keys(rooms).forEach(key=>{
    let target=scrollOpen[key]||0;
    if((free||inEx)&&hoverKey===key)target=1;
    roomMoving=Math.max(roomMoving,Math.abs(target-open[key]));
    open[key]+=(target-open[key])*(reduced?1:.1);
    const u=rooms[key].userData,o=open[key];
    // +.02 keeps the roof off the wall tops (no coplanar faces → no z-fighting flicker)
    u.roof.position.y=u.h+u.bias+o*2.2;u.roof.rotation.z=o*.25;u.roof.rotation.x=-o*.12;
    // roofs are only "transparent" while fading; a closed roof is solid so depth sorting can't flip it
    const fading=o>.01;
    u.roofMats.forEach(m=>{m.opacity=1-o*.97;if(m.transparent!==fading){m.transparent=fading;m.depthWrite=!fading;m.needsUpdate=true;}});
    u.roof.visible=o<.985;
    u.fm.color.setHex(o>.5?0xdcecf3:C.floor);
  });

  // camera
  root.rotation.y=cur.rot+(reduced?0:px*.08);
  root.position.y=cur.lift;
  const vw=(cam.right-cam.left)/cur.zoom;
  const sideShift=innerWidth<900?0:cur.side*vw*.25;
  const focus=new THREE.Vector3(cur.tx,0,cur.tz).addScaledVector(right,-sideShift);
  // on mobile push the building up so panels sit underneath
  if(innerWidth<900){focus.y-=(cam.top-cam.bottom)/cur.zoom*.2;}
  cam.zoom=cur.zoom;cam.position.copy(focus).add(OFF);cam.lookAt(focus);cam.updateProjectionMatrix();

  // night
  const n=cur.night;
  hemi.intensity=lerp(.8,.22,n);sun.intensity=lerp(.85,.05,n);
  hemi.color.setHex(n>.5?0x9fb0e6:0xffffff);
  glowMats.forEach(m=>m.emissiveIntensity=n*(m.transparent?.95:.8));
  document.body.classList.toggle('night',n>.5);
  const bg=`rgb(${Math.round(lerp(244,13,n))},${Math.round(lerp(241,20,n))},${Math.round(lerp(234,51,n))})`;
  setVar(document.documentElement,'--bg',bg);

  // text panels + rail
  let activeCh='intro';
  if(EXPLORE){
    const vh=innerHeight,cl=x=>Math.min(1,Math.max(0,x));
    chapters.forEach(sec=>{const top=(geo.get(sec)||{top:0}).top;let i=1;
      if(sec.dataset.ch==='explorer')i=cl(1-Math.abs(y-top)/(vh*.45));
      else if(sec.dataset.ch==='final')i=cl((y-(top-vh*.45))/(vh*.4));
      setVar(sec,'--in',i.toFixed(3));});
  }else{
    chapters.forEach(sec=>{const i=sectionIn(sec,y);setVar(sec,'--in',sec.dataset.ch==='intro'?'1':i.toFixed(3));if(i>.5)activeCh=sec.dataset.ch;});
    rail.forEach(li=>li.classList.toggle('on',li.dataset.r===activeCh));
    const moreKey=['surau','kaunter','pejabat','dapur','tandas'].includes(s.a)?(k<.5?s.a:s.b):null;
    moreLis.forEach(li=>li.classList.toggle('on',li.dataset.room===moreKey));
  }
  // intro type + ribbons drift away as you scroll in
  const introP=Math.min(1,y/(innerHeight*.9));
  setVar(ribbons,'opacity',(1-introP).toFixed(3));
  setVar(ribbons,'transform',`translateY(-50%) translateX(${(-introP*18).toFixed(2)}vw)`);
  setVar(introPin,'opacity',(1-Math.max(0,introP-.35)/.5).toFixed(3));

  // hover tooltip (free views only)
  if((free||inEx)&&hoverKey){const g=rooms[hoverKey];g.getWorldPosition(v);v.y+=g.userData.h+.6;v.project(cam);tip.style.left=((v.x+1)/2*innerWidth)+'px';tip.style.top=((1-v.y)/2*innerHeight)+'px';tip.textContent=NAMES[hoverKey][LANG==='ms'?0:1];tip.classList.add('on');}
  else tip.classList.remove('on');

  const covered=y>=coverRange[0]&&y+innerHeight<=coverRange[1];
  if(!covered)renderer.render(scene,cam);
}
const introPin=document.querySelector('.intro .pin');
/* hover picking on the fixed canvas (only matters when the view is not in a room chapter) */
const ray=new THREE.Raycaster(),mouse=new THREE.Vector2();
addEventListener('pointermove',e=>{
  mouse.set((e.clientX/innerWidth)*2-1,-(e.clientY/innerHeight)*2+1);
  ray.setFromCamera(mouse,cam);
  const hit=ray.intersectObjects(pickables,false)[0];
  hoverKey=hit?hit.object.userData.room:null;
},{passive:true});
/* desktop: clicking a room on the building selects it */
addEventListener('click',e=>{
  if(!EXPLORE||!hoverKey||e.target.closest('a,button,.ex-ui,.nav,.cal'))return;
  if(inExplorer()){select(hoverKey);return;}
  // from the intro: clicking a room jumps into the explorer on that room
  if(scrollY_()<innerHeight*.5){select(hoverKey);lenis?lenis.scrollTo(exSec.offsetTop):scrollTo({top:exSec.offsetTop,behavior:'smooth'});}
});
/* ================= availability calendar ================= */
(function(){
  const WA='601121406450';
  const SLOTS=[{id:'pagi',ms:'Pagi',en:'Morning',t:'8:30 – 12:30'},{id:'petang',ms:'Petang',en:'Afternoon',t:'13:30 – 17:00'},{id:'malam',ms:'Malam',en:'Evening',t:'18:00 – 23:00'}];
  const MONTHS={ms:['Januari','Februari','Mac','April','Mei','Jun','Julai','Ogos','September','Oktober','November','Disember'],en:['January','February','March','April','May','June','July','August','September','October','November','December']};
  const WD={ms:['Isn','Sel','Rab','Kha','Jum','Sab','Ahd'],en:['Mon','Tue','Wed','Thu','Fri','Sat','Sun']};
  const TXT={ms:{free:'Kosong',taken:'Sudah ditempah',full:'Hari ini penuh. Cuba tarikh lain.',closed:'Hujung minggu: hubungi admin untuk atur.'},en:{free:'Available',taken:'Booked',full:'This day is full. Try another date.',closed:'Weekend: contact the admin to arrange.'}};
  /* ---- DATA SOURCE: Google Sheet "SSK CENTRE LAPORAN FASILITI" ----
     Paste the "Publish to web → CSV" link of the PUBLIC "Web Kalendar" tab here.
     That tab only holds: tarikh | fasiliti | mula | tamat  (no names, no payments).
     Empty → example data with a visible "prototype" label. */
  const SHEET_CSV='https://docs.google.com/spreadsheets/d/1x9QA00fKmnYwE2hM5KjOcjrvlZtkStrJaf0od5IqTsU/gviz/tq?tqx=out:csv&gid=0'; // public copy: tarikh, fasiliti, mula, tamat only
  const SLOT_MIN={pagi:[510,750],petang:[810,1020],malam:[1080,1380]}; // 8:30–12:30, 13:30–17:00, 18:00–23:00
  let LIVE=null,LOAD='idle'; // idle | loading | ok | error
  function demoBooked(room,iso){let h=0;for(const c of room+iso)h=(h*31+c.charCodeAt(0))>>>0;const r=h%9;return r<2?['pagi','petang']:r===2?['pagi']:r===3?['petang']:[];}
  function booked(room,iso){if(LIVE){const s=LIVE[room]&&LIVE[room][iso];return s?[...s]:[];}return SHEET_CSV?[]:demoBooked(room,iso);}
  function parseCSV(txt){const rows=[];let row=[],f='',q=false;for(let i=0;i<txt.length;i++){const c=txt[i];if(q){if(c==='"'&&txt[i+1]==='"'){f+='"';i++;}else if(c==='"')q=false;else f+=c;}else if(c==='"')q=true;else if(c===','){row.push(f);f='';}else if(c==='\n'||c==='\r'){if(c==='\r'&&txt[i+1]==='\n')i++;row.push(f);rows.push(row);row=[];f='';}else f+=c;}if(f||row.length){row.push(f);rows.push(row);}return rows;}
  const MON={jan:0,feb:1,mar:2,apr:3,may:4,mei:4,jun:5,jul:6,aug:7,ogo:7,sep:8,oct:9,okt:9,nov:10,dec:11,dis:11};
  function parseDate(s){s=(s||'').trim();let m;
    if(m=s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/))return new Date(+m[1],m[2]-1,+m[3]);
    if(m=s.match(/^(\d{1,2})[-\s]([A-Za-z]{3})[A-Za-z]*[-\s](\d{2,4})$/)){const y=+m[3]<100?2000+ +m[3]:+m[3];const mo=MON[m[2].toLowerCase()];return mo==null?null:new Date(y,mo,+m[1]);}
    if(m=s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/)){const y=+m[3]<100?2000+ +m[3]:+m[3];return new Date(y,m[2]-1,+m[1]);} // dd/mm/yyyy (Malaysia)
    return null;}
  function parseTime(s){s=(s||'').trim().toUpperCase();const m=s.match(/^(\d{1,2})[:.](\d{2})\s*(AM|PM)?/);if(!m)return null;let h=+m[1];if(m[3]==='PM'&&h<12)h+=12;if(m[3]==='AM'&&h===12)h=0;return h*60+ +m[2];}
  // "Special" = outdoor + dewan, so it blocks the hall
  function roomOf(s){s=(s||'').toLowerCase();return (s.includes('dewan')||s.includes('special'))?'dewan':s.includes('mesyuarat')?'mesyuarat':null;}
  async function loadSheet(){
    if(!SHEET_CSV||LOAD==='loading'||LOAD==='ok')return;LOAD='loading';render();
    try{
      const r=await fetch(SHEET_CSV+(SHEET_CSV.includes('?')?'&':'?')+'t='+Date.now());if(!r.ok)throw new Error(r.status);
      const rows=parseCSV(await r.text());const map={dewan:{},mesyuarat:{}};
      rows.forEach(c=>{
        if(/cancel/i.test(c.join(' ')))return;
        const d=parseDate(c[0]),rm=roomOf(c[1]);if(!d||!rm)return;
        const a=parseTime(c[2]),b=parseTime(c[3]),k=iso(d);
        Object.entries(SLOT_MIN).forEach(([id,[s,e]])=>{
          const hit=(a==null||b==null)?true:(a<e&&b>s); // no times = treat whole day as taken
          if(hit)(map[rm][k]=map[rm][k]||new Set()).add(id);
        });
      });
      LIVE=map;LOAD='ok';
    }catch(err){LOAD='error';}
    render();
  }

  const el=id=>document.getElementById(id);
  const cal=el('cal'),grid=el('calGrid'),slotsEl=el('slots'),bookBtn=el('calBook');
  const today=new Date();today.setHours(0,0,0,0);
  const limit=new Date(today.getFullYear(),today.getMonth()+3,1); // 3 months ahead
  let room='dewan',view=new Date(today.getFullYear(),today.getMonth(),1),pickDate=null,pickSlot=null;
  const iso=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
  const L=()=>LANG==='ms'?'ms':'en';
  function status(d){
    if(d<=today)return'past'; // admin confirms within 24h, so bookings start tomorrow
    // weekends are bookable: the log has Saturday and Sunday events
    const b=booked(room,iso(d));return b.length>=SLOTS.length?'full':b.length?'part':'free';
  }
  function render(){
    const l=L();
    el('calTitle').textContent=NAMES[room][l==='ms'?0:1];
    document.querySelectorAll('[data-calroom]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.calroom===room));
    el('calMonth').textContent=MONTHS[l][view.getMonth()]+' '+view.getFullYear();
    el('calPrev').disabled=view<=new Date(today.getFullYear(),today.getMonth(),1);
    el('calNext').disabled=new Date(view.getFullYear(),view.getMonth()+1,1)>=limit;
    let h=WD[l].map(w=>`<div class="wd">${w}</div>`).join('');
    const lead=(view.getDay()+6)%7;for(let i=0;i<lead;i++)h+='<div></div>';
    const days=new Date(view.getFullYear(),view.getMonth()+1,0).getDate();
    for(let n=1;n<=days;n++){
      const d=new Date(view.getFullYear(),view.getMonth(),n),s=status(d),k=iso(d);
      const cls=['day',s,+d===+today?'today':'',pickDate===k?'sel':''].join(' ');
      const can=s==='free'||s==='part'||s==='full'||s==='closed';
      h+=`<button class="${cls}" data-d="${k}" ${s==='past'?'disabled':''} aria-label="${n} ${MONTHS[l][view.getMonth()]}">${n}</button>`;
    }
    // never show "free" days while the real data is still loading or failed
    if(SHEET_CSV&&LOAD!=='ok'){
      const msg=LOAD==='error'
        ?(l==='ms'?'Kalendar tak dapat dimuatkan sekarang. Sila WhatsApp admin untuk semak tarikh.':'The calendar could not load right now. Please WhatsApp the admin to check dates.')
        :(l==='ms'?'Memuatkan kalendar…':'Loading calendar…');
      h=`<p class="slots-hint" style="grid-column:1/-1;padding:40px 0;text-align:center">${msg}</p>`;
      pickDate=null;
    }
    document.querySelector('.cal-demo').style.display=SHEET_CSV?'none':'';
    grid.innerHTML=h;
    renderSlots();
  }
  function renderSlots(){
    const l=L();
    if(!pickDate){slotsEl.innerHTML=`<p class="slots-hint">${T[LANG].pickDay}</p>`;updateBook();return;}
    const d=new Date(pickDate+'T00:00:00'),s=status(d),b=booked(room,pickDate);
    let h=`<div class="slots-date">${d.getDate()} ${MONTHS[l][d.getMonth()]} ${d.getFullYear()}</div>`;
    if(s==='closed'){h+=`<p class="slots-hint">${TXT[l].closed}</p>`;}
    else{
      if(s==='full')h+=`<p class="slots-hint" style="margin-bottom:10px">${TXT[l].full}</p>`;
      SLOTS.forEach(x=>{const tk=b.includes(x.id);h+=`<button class="slot ${tk?'taken':'ok'} ${pickSlot===x.id?'on':''}" data-slot="${x.id}" ${tk?'disabled':''}><span>${x[l]} · ${x.t}</span><small>${tk?TXT[l].taken:TXT[l].free}</small></button>`;});
    }
    slotsEl.innerHTML=h;updateBook();
  }
  function updateBook(){
    const ready=pickDate&&pickSlot,l=L();
    bookBtn.setAttribute('aria-disabled',!ready);
    if(!ready){bookBtn.href='#';return;}
    const d=new Date(pickDate+'T00:00:00'),sl=SLOTS.find(x=>x.id===pickSlot);
    const msg=l==='ms'
      ?`Salam admin SSK Centre, saya ingin menempah ${NAMES[room][0]} pada ${d.getDate()} ${MONTHS.ms[d.getMonth()]} ${d.getFullYear()}, slot ${sl.ms} (${sl.t}). Boleh sahkan ketersediaan dan kadar?`
      :`Hi SSK Centre admin, I'd like to book the ${NAMES[room][1]} on ${d.getDate()} ${MONTHS.en[d.getMonth()]} ${d.getFullYear()}, ${sl.en} slot (${sl.t}). Could you confirm availability and the rate?`;
    bookBtn.href=`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
  }
  grid.addEventListener('click',e=>{const b=e.target.closest('.day');if(!b||b.disabled)return;pickDate=b.dataset.d;pickSlot=null;render();});
  slotsEl.addEventListener('click',e=>{const b=e.target.closest('.slot.ok');if(!b)return;pickSlot=b.dataset.slot;renderSlots();});
  document.querySelectorAll('[data-calroom]').forEach(b=>b.addEventListener('click',()=>{room=b.dataset.calroom;pickDate=null;pickSlot=null;render();}));
  el('calPrev').addEventListener('click',()=>{view=new Date(view.getFullYear(),view.getMonth()-1,1);render();});
  el('calNext').addEventListener('click',()=>{view=new Date(view.getFullYear(),view.getMonth()+1,1);render();});
  let lastFocus=null;
  function open(r){room=r||room;pickDate=null;pickSlot=null;view=new Date(today.getFullYear(),today.getMonth(),1);render();loadSheet();lastFocus=document.activeElement;cal.classList.add('open');if(lenis)lenis.stop();document.documentElement.style.overflow='hidden';setTimeout(()=>cal.querySelector('.cal-x').focus(),50);}
  function close(){cal.classList.remove('open');if(lenis)lenis.start();document.documentElement.style.overflow='';if(lastFocus)lastFocus.focus();}
  document.addEventListener('click',e=>{const b=e.target.closest('[data-cal]');if(b){e.preventDefault();open(b.dataset.cal);}});
  cal.querySelectorAll('[data-close]').forEach(x=>x.addEventListener('click',close));
  addEventListener('keydown',e=>{if(e.key==='Escape'&&cal.classList.contains('open'))close();});
  bookBtn.addEventListener('click',e=>{if(bookBtn.getAttribute('aria-disabled')==='true')e.preventDefault();});
  document.querySelectorAll('.lang button').forEach(b=>b.addEventListener('click',()=>{if(cal.classList.contains('open'))render();}));
})();
addEventListener('load',buildStops);
frame();
