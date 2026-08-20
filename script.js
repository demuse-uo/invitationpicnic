/* =====================================================================
   ██  C O N F I G  ██   ← EDIT BAGIAN INI SAJA
   ===================================================================== */
const CONFIG = {

    folderFoto: "foto/",
  // --- Identitas acara ---
  namaAcara:   "de Muse picnic : Colors of our story🎨🖌️",
  tagline:     "Hii, Muses.. Time really does fly. Our picnic day is almost here!",
  emoji:       "🎉",                 // emoji besar di lingkaran hero
  badge:       "Invitation",   // teks kecil di cover
  eyebrow:     "Save the Date",

  // --- Waktu (format: YYYY-MM-DDTHH:MM:SS, lalu zona waktu) ---
  mulai:       "2026-08-30T10:00:00",
  selesai:     "",
  zona:        "+08:00",             // +07:00 WIB · +08:00 WITA/SG · +09:00 WIT
  labelZona:   "SG",

  // --- Lokasi ---
  tempat:      "Fort Canning Park",
  alamat:      "River Valley Rd, Singapura 179037.",
  mapsUrl:     "https://www.google.com/maps/place/Fort+Canning/@1.2943876,103.8458033,17z/data=!4m14!1m7!3m6!1s0x31da19a224232655:0x6be7c3049c6211a5!2sFort+Canning!8m2!3d1.2943876!4d103.8458033!16zL20vMDdiOWsz!3m5!1s0x31da19a224232655:0x6be7c3049c6211a5!8m2!3d1.2943876!4d103.8458033!16zL20vMDdiOWsz?entry=ttu&g_ep=EgoyMDI2MDgxNy4wIKXMDSoASAFQAw%3D%3D",

  // --- Rundown (boleh tambah/kurangi) ---
  rundown: [
    {judul:"Opening", desc:"MC" },
    {judul:"Group Photo",                 desc:"All de Muse members" },
    {judul:"Introductions & Shirt Philosophy",      desc:"Kicked off by Tarry & Anis, next participants picked randomly" },
    {judul:"Intro + Game",     desc:"First 10 participants play the Paper Ball Race Game (groups drawn randomly)" },
    {judul:"Continue: Speeches & Philosophy",    desc:"Remaining participants share their story and shirt color philosophy" },
    {judul:"Final Game", desc:"Call of the Animals (team leader blindfolded)"},
    {judul:"Fan Favorite Voting", desc:"Live audience vote"},
    {judul:"Winners & Fan Favorite Announcement", desc:"MC"},
    {judul:"Lunch Together", desc:"All de Muse members"}
  ],

  // --- Info tambahan (boleh tambah/kurangi) ---
  catatan: [
    { icon:"👕", teks:"Dress code: Jeans + your favourite T-Shirt colour" },
    { icon:"🚆", teks:"Dhoby Ghaut MRT Exit B" },
    { icon:"🎁", teks:"Team Prize: $50 SGD, Fan Favorite : $25 SGD (1 orang)" }
  ],

  // --- Penutup ---
  ucapanPenutup: "Until Then, Muses 6 ",
  penyelenggara: "With Love, de Muse Executive",

  // --- Opsional ---
  musikUrl: "Elemen/musikringan.mp3"  
};
/* ===================== AKHIR CONFIG ===================== */


/* ---------- Helper ---------- */
const $  = (s) => document.querySelector(s);
const dtMulai   = new Date(CONFIG.mulai + CONFIG.zona);
const adaSelesai = !!CONFIG.selesai;
const dtSelesai  = new Date((adaSelesai ? CONFIG.selesai : CONFIG.mulai) + CONFIG.zona);
if(!adaSelesai) dtSelesai.setHours(dtSelesai.getHours() + 3);  // perkiraan durasi, khusus utk kalender

function offsetMs(z){
  const m = /^([+-])(\d{2}):(\d{2})$/.exec(z);
  if(!m) return 0;
  const sign = m[1] === '-' ? -1 : 1;
  return sign * ((+m[2]) * 3600 + (+m[3]) * 60) * 1000;
}

const fmtTanggal = new Intl.DateTimeFormat('en-GB',
  { weekday:'long', day:'numeric', month:'long', year:'numeric', timeZone:'UTC' }
).format(new Date(dtMulai.getTime() + offsetMs(CONFIG.zona)));

function jamLokal(iso){ return iso.slice(11,16).replace(':','.'); }
const rentangWaktu = adaSelesai
  ? `${jamLokal(CONFIG.mulai)} – ${jamLokal(CONFIG.selesai)} ${CONFIG.labelZona}`
  : `${jamLokal(CONFIG.mulai)} ${CONFIG.labelZona} – till we're done`;

/* ---------- Isi konten dari CONFIG ---------- */
document.title               = "Invitation · " + CONFIG.namaAcara;
$('#coverBadge').textContent = CONFIG.badge;
$('#coverTitle').textContent = CONFIG.namaAcara;
$('#coverDate').textContent  = fmtTanggal;
$('#heroTitle').textContent  = CONFIG.namaAcara;
$('#heroTagline').textContent= CONFIG.tagline;
$('#heroEmoji').textContent  = CONFIG.emoji;
$('#heroEyebrow').textContent= CONFIG.eyebrow;
$('#dTanggal').textContent   = fmtTanggal;
$('#dWaktu').textContent     = rentangWaktu;
$('#dTempat').textContent    = CONFIG.tempat;
$('#dAlamat').textContent    = CONFIG.alamat;
$('#mapsBtn').href           = CONFIG.mapsUrl;
$('#footerThanks').textContent = CONFIG.ucapanPenutup;
$('#footerHost').textContent   = CONFIG.penyelenggara;
$('#footerContact').textContent= CONFIG.kontak || '';

$('#heroPills').innerHTML = [
  `📅 ${fmtTanggal}`, `⏰ ${rentangWaktu}`, `📍 ${CONFIG.tempat}`
].map(t => `<span class="pill">${t}</span>`).join('');

$('#timeline').innerHTML = CONFIG.rundown.map(r => `
  <div class="tl-item">
    ${r.jam ? `<div class="tl-time">${r.jam} ${CONFIG.labelZona}</div>` : ``}
    <div class="tl-title">${r.judul}</div>
    <div class="tl-desc">${r.desc}</div>
  </div>`).join('');
if(!CONFIG.rundown.length) $('#rundownSection').style.display = 'none';

$('#noteList').innerHTML = CONFIG.catatan.map(c => `
  <div class="note"><span>${c.icon}</span><span>${c.teks}</span></div>`).join('');
if(!CONFIG.catatan.length) $('#notesSection').style.display = 'none';

/* ---------- Nama tamu dari URL: ?to=Nama ---------- */
(function(){
  const p = new URLSearchParams(location.search);
  const nama = (p.get('to') || p.get('kepada') || '').trim();
  if(nama) $('#guestName').textContent = decodeURIComponent(nama);
})();

/* ---------- Foto tamu dari URL: ?foto=nama-file.jpg ---------- */
(function(){
  const p = new URLSearchParams(location.search);
  const foto = (p.get('foto') || '').trim();
  if(!foto) return;
  const img = $('#heroFoto');
  img.onload  = () => { img.hidden = false; $('#heroEmoji').hidden = true;  };
  img.onerror = () => { img.hidden = true;  $('#heroEmoji').hidden = false; };
  img.src = /^https?:\/\//.test(foto) ? foto : CONFIG.folderFoto + foto;
})();

/* ---------- Countdown ---------- */
const pad = n => String(n).padStart(2,'0');
function tick(){
  const diff = dtMulai - new Date();
  if(diff <= 0){
    $('#cdGrid').style.display = 'none';
    $('#cdDone').style.display = 'block';
    clearInterval(timer);
    return;
  }
  const d = Math.floor(diff / 86400000);
  const h = Math.floor(diff / 3600000) % 24;
  const m = Math.floor(diff / 60000) % 60;
  const s = Math.floor(diff / 1000) % 60;
  $('#cdD').textContent = pad(d);
  $('#cdH').textContent = pad(h);
  $('#cdM').textContent = pad(m);
  $('#cdS').textContent = pad(s);
}
tick();
const timer = setInterval(tick,1000);

/* ---------- Save the Date ---------- */
const toUTC = dt => dt.toISOString().replace(/[-:]/g,'').split('.')[0] + 'Z';
const detailAcara = `${CONFIG.tagline}\n\nLocation: ${CONFIG.tempat}, ${CONFIG.alamat}`;

$('#gcalBtn').href = 'https://calendar.google.com/calendar/render?action=TEMPLATE'
  + '&text='     + encodeURIComponent(CONFIG.namaAcara)
  + '&dates='    + toUTC(dtMulai) + '/' + toUTC(dtSelesai)
  + '&details='  + encodeURIComponent(detailAcara)
  + '&location=' + encodeURIComponent(`${CONFIG.tempat}, ${CONFIG.alamat}`);

$('#icsBtn').addEventListener('click', () => {
  const esc = t => String(t).replace(/([,;\\])/g,'\\$1').replace(/\n/g,'\\n');
  const ics = [
    'BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Undangan Digital//ID','CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    'UID:' + Date.now() + '@undangan.local',
    'DTSTAMP:'  + toUTC(new Date()),
    'DTSTART:'  + toUTC(dtMulai),
    'DTEND:'    + toUTC(dtSelesai),
    'SUMMARY:'  + esc(CONFIG.namaAcara),
    'DESCRIPTION:' + esc(detailAcara),
    'LOCATION:' + esc(`${CONFIG.tempat}, ${CONFIG.alamat}`),
    'BEGIN:VALARM','TRIGGER:-P1D','ACTION:DISPLAY','DESCRIPTION:Event reminder','END:VALARM',
    'END:VEVENT','END:VCALENDAR'
  ].join('\r\n');
  const url = URL.createObjectURL(new Blob([ics], {type:'text/calendar;charset=utf-8'}));
  const a = document.createElement('a');
  a.href = url;
  a.download = CONFIG.namaAcara.replace(/[^\w\s-]/g,'').trim().replace(/\s+/g,'-') + '.ics';
  a.click();
  URL.revokeObjectURL(url);
});

/* ---------- Konfeti ---------- */
function confetti(n = 60){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const warna = ['#FFC93C','#FF6B6B','#4ECDC4','#845EC2','#3DA9FC'];
  for(let i = 0; i < n; i++){
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.left = Math.random()*100 + 'vw';
    c.style.background = warna[i % warna.length];
    c.style.animationDuration = (2.4 + Math.random()*1.8) + 's';
    c.style.animationDelay = (Math.random()*0.6) + 's';
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 5200);
  }
}

/* ---------- Buka undangan ---------- */
$('#openBtn').addEventListener('click', () => {
  $('#cover').classList.add('hidden');
  document.body.classList.remove('locked');
  window.scrollTo(0,0);
    $('#content').classList.add('masuk');
 
  if(CONFIG.musikUrl){
    const bgm = $('#bgm');
    bgm.src = CONFIG.musikUrl;
    bgm.volume = 0.5;
    bgm.play().then(() => $('#musicBtn').classList.add('on')).catch(()=>{});
    $('#musicBtn').style.display = 'grid';
  }
});

/* ---------- Musik toggle ---------- */
$('#musicBtn').addEventListener('click', () => {
  const bgm = $('#bgm');
  if(bgm.paused){ bgm.play(); $('#musicBtn').classList.add('on'); }
  else          { bgm.pause(); $('#musicBtn').classList.remove('on'); }
});

/* ---------- Reveal on scroll ---------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => e.target.classList.toggle('show', e.isIntersecting));
}, { threshold: 0.14, rootMargin: '0px 0px -6% 0px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));