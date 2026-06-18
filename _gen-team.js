const fs = require('fs');
const dir = __dirname + '/';

const cross = '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M10 3h4a1 1 0 011 1v5h5a1 1 0 011 1v4a1 1 0 01-1 1h-5v5a1 1 0 01-1 1h-4a1 1 0 01-1-1v-5H4a1 1 0 01-1-1v-4a1 1 0 011-1h5V4a1 1 0 011-1z"/></svg>';
const callIcon = '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.95.68l1.5 4.5a1 1 0 01-.5 1.2l-2.26 1.13a11 11 0 005.5 5.5l1.13-2.26a1 1 0 011.2-.5l4.5 1.5a1 1 0 01.68.95V19a2 2 0 01-2 2h-1C9.7 21 3 14.3 3 6V5z"/></svg>';

// Founder + providers (clinical). photo null -> monogram avatar.
const PROVIDERS = [
  { name:'Dr. Amir Aryaie', cred:'MD, FACS, FASMBS', role:'Founder & Owner · Bariatric Surgeon', photo:'images/dr-aryaie.jpg', founder:true,
    bio:'Dr. Aryaie founded BMI Surgical Institute and is a board-certified general surgeon who has performed thousands of weight-loss and minimally invasive GI procedures. He completed his bariatric & minimally invasive fellowship at University Hospitals / Case Western Reserve, and is a Fellow of the American College of Surgeons (FACS) and the American Society for Metabolic & Bariatric Surgery (FASMBS).' },
  { name:'Dr. Gonzalez-Jacobo', cred:'MD', role:'Bariatric & General Surgeon', photo:'images/dr-gonzalez-jacobo.jpg', founder:false,
    bio:'Dr. Gonzalez-Jacobo partners with Dr. Aryaie to deliver advanced bariatric and minimally invasive surgical care, bringing skill and compassion to every patient throughout their weight-loss journey.' },
  { name:'Christine Paulin', cred:'FNP', role:'Family Nurse Practitioner', photo:'images/christine-paulin.jpg', founder:false,
    bio:'As a Family Nurse Practitioner, Christine supports patients before and after surgery — from medical evaluations and pre-op preparation to ongoing follow-up care that helps results last.' },
];

const STAFF = [
  ['Sahar Fatehi','RN, MSN','Chief Operating Officer'],
  ['Estefani Garcia','','Lead Medical Assistant'],
  ['Clarisa Velazquez','','Office Manager & Lead Bariatric Coordinator'],
  ['Sharmillah Horn','','Medical Billing Specialist'],
  ['Breyonia Posey','','Surgery Scheduling & Patient Advocate'],
  ['Mckenzie Hall','','Medical Assistant & Patient Advocate'],
  ['Samantha Avila','','Insurance Verification'],
  ['Tina Sigari','','Patient Advocate'],
];

const initials = n => n.replace(/^Dr\.\s*/,'').split(/[\s-]+/).filter(Boolean).slice(0,2).map(w=>w[0]).join('').toUpperCase();

const THEMES = {
  premium: { suffix:'', home:'premium.html', mono1:'#1e66f0', mono2:'#22d3ee',
    fonts:'<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />',
    tw:`tailwind.config={theme:{extend:{fontFamily:{display:['Sora','sans-serif'],sans:['Inter','sans-serif']},colors:{ink:'#0b1b34',brand:{50:'#eef6ff',100:'#d9ebff',200:'#bcdcff',300:'#8ec6ff',400:'#59a6ff',500:'#3385fb',600:'#1e66f0',700:'#1750dd',800:'#1942b3',900:'#1a3c8d',950:'#142657'}}}}};`,
    style:`body{font-family:'Inter',sans-serif;color:#0b1b34;background:#f4f8ff}h1,h2,h3,h4,.font-display{font-family:'Sora',sans-serif}.glass{background:rgba(255,255,255,.62);backdrop-filter:blur(20px) saturate(150%);border:1px solid rgba(255,255,255,.65);box-shadow:0 20px 50px -22px rgba(20,38,87,.45)}`,
    bodyClass:'antialiased', heading:'text-ink', muted:'text-ink/65', accent:'brand-600', accentText:'text-brand-600',
    card:'glass', radius:'rounded-2xl', radiusLg:'rounded-[2rem]', pill:'rounded-2xl', dark:'bg-ink',
    bookBtn:'bg-brand-600 hover:bg-brand-700 text-white font-semibold shadow-lg shadow-brand-600/30',
    logoBox:'w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 to-cyan-400',
    sienna:'<script src="https://cdn.jsdelivr.net/npm/sienna-accessibility/dist/sienna-accessibility.umd.js" data-asw-position="bottom-left" async></script>',
    navWrap:'fixed top-0 inset-x-0 z-50', navInner:'mt-3 glass rounded-2xl px-4 sm:px-5 h-16', mainPad:'pt-24' },
  clean: { suffix:'-clean', home:'clean-modern.html', mono1:'#2479eb', mono2:'#14b8a6',
    fonts:'<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />',
    tw:`tailwind.config={theme:{extend:{fontFamily:{display:['"Plus Jakarta Sans"','sans-serif'],sans:['Inter','sans-serif']},colors:{brand:{50:'#eff8ff',100:'#dbeefe',200:'#bfe2fe',300:'#93d0fd',400:'#60b5fa',500:'#3b97f6',600:'#2479eb',700:'#1c63d8',800:'#1d51af',900:'#1d478a',950:'#162c54'},teal:{400:'#2dd4bf',500:'#14b8a6',600:'#0d9488'}}}}};`,
    style:`body{font-family:'Inter',sans-serif}h1,h2,h3,h4,.font-display{font-family:'Plus Jakarta Sans',sans-serif}`,
    bodyClass:'bg-white text-slate-700 antialiased', heading:'text-slate-900', muted:'text-slate-500', accent:'brand-600', accentText:'text-brand-600',
    card:'bg-white border border-slate-100 shadow-sm', radius:'rounded-2xl', radiusLg:'rounded-[2rem]', pill:'rounded-full', dark:'bg-brand-950',
    bookBtn:'bg-brand-600 hover:bg-brand-700 text-white font-semibold shadow-lg shadow-brand-600/25',
    logoBox:'w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-teal-500',
    sienna:'', navWrap:'sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-100', navInner:'h-20', mainPad:'' },
  warm: { suffix:'-warm', home:'warm-friendly.html', mono1:'#fb7e57', mono2:'#3fa394',
    fonts:'<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Nunito:wght@400;500;600;700;800&display=swap" rel="stylesheet" />',
    tw:`tailwind.config={theme:{extend:{fontFamily:{display:['Fraunces','serif'],sans:['Nunito','sans-serif']},colors:{cream:'#fffaf3',sand:{100:'#fdf3e7',200:'#f9e6d0'},spruce:{100:'#e3f0ed',400:'#5bbcad',500:'#3fa394',600:'#2f8678',700:'#296b60',900:'#1f3f3a'},coral:{100:'#ffe9e0',400:'#ff9b7a',500:'#fb7e57',600:'#ed633a'}}}}};`,
    style:`body{font-family:'Nunito',sans-serif}h1,h2,h3,h4,.font-display{font-family:'Fraunces',serif}`,
    bodyClass:'bg-cream text-spruce-900/80 antialiased', heading:'text-spruce-900', muted:'text-spruce-700/70', accent:'coral-500', accentText:'text-coral-500',
    card:'bg-white shadow-sm', radius:'rounded-[1.75rem]', radiusLg:'rounded-[2.5rem]', pill:'rounded-full', dark:'bg-spruce-900',
    bookBtn:'bg-coral-500 hover:bg-coral-600 text-white font-bold shadow-lg shadow-coral-500/30',
    logoBox:'w-11 h-11 rounded-full bg-coral-500',
    sienna:'', navWrap:'sticky top-0 z-50 bg-cream/90 backdrop-blur border-b border-sand-200', navInner:'h-20', mainPad:'' },
};

function mono(t,name){ return `<div class="w-full h-full flex items-center justify-center text-white font-display font-extrabold text-4xl" style="background:linear-gradient(135deg,${t.mono1},${t.mono2})" aria-hidden="true">${initials(name)}</div>`; }

function nav(t){
  const book = t.suffix==='' ? t.home+'#book' : t.home+'#booking';
  return `<header class="${t.navWrap}"><div class="${t.suffix===''?'mx-auto max-w-7xl px-4 sm:px-6':''}"><nav aria-label="Primary" class="${t.navInner} ${t.suffix===''?'':'max-w-7xl mx-auto px-6'} flex items-center justify-between">
    <a href="${t.home}" class="flex items-center gap-2.5"><span aria-hidden="true" class="${t.logoBox} flex items-center justify-center text-white shadow-lg">${cross}</span><span class="leading-tight"><span class="block font-display font-extrabold ${t.heading} text-[15px]">Dr. Amir Aryaie, MD, FACS</span><span class="block text-[11px] ${t.muted}">BMI Surgical Institute · Atlanta, GA</span></span></a>
    <div class="hidden lg:flex items-center gap-6 text-sm font-medium ${t.muted}"><a href="surgery-options${t.suffix}.html" class="hover:text-${t.accent} transition">Surgery Options</a><a href="surgery-options${t.suffix}.html#bmi" class="hover:text-${t.accent} transition">BMI Calculator</a><a href="team${t.suffix}.html" class="text-${t.accent} font-semibold">Our Team</a><a href="${t.home}#reviews" class="hover:text-${t.accent} transition">Reviews</a></div>
    <div class="flex items-center gap-2"><a href="tel:+16786260909" class="hidden sm:inline-flex items-center gap-2 text-${t.accent} font-semibold text-sm px-3 py-2">${callIcon}(678) 626-0909</a><a href="${book}" class="${t.bookBtn} text-sm px-4 py-2.5 ${t.pill} transition">Book now</a></div>
  </nav></div></header>`;
}
function footer(t){
  const book = t.suffix==='' ? t.home+'#book' : t.home+'#booking';
  return `<footer class="${t.dark} text-white/70"><div class="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-10">
    <div><div class="flex items-center gap-3 mb-4"><span aria-hidden="true" class="${t.logoBox} flex items-center justify-center text-white">${cross}</span><span class="font-display font-extrabold text-white text-lg">BMI Surgical Institute</span></div><p class="text-sm text-white/50 max-w-xs">Advanced bariatric, reflux and minimally invasive surgery — serving Atlanta and the Roswell &amp; Snellville areas.</p></div>
    <nav aria-label="Footer"><p class="font-semibold text-white mb-3">Explore</p><ul class="space-y-2 text-sm"><li><a href="surgery-options${t.suffix}.html" class="hover:text-white transition">Surgery Options</a></li><li><a href="team${t.suffix}.html" class="hover:text-white transition">Our Team</a></li><li><a href="${t.home}#reviews" class="hover:text-white transition">Reviews</a></li><li><a href="${book}" class="hover:text-white transition">Book a consultation</a></li></ul></nav>
    <div><p class="font-semibold text-white mb-3">Get in touch</p><ul class="space-y-2 text-sm"><li>2303 Cumberland Parkway SE, Ste 2</li><li>Atlanta, GA 30339</li><li><a href="tel:+16786260909" class="hover:text-white transition">(678) 626-0909</a></li><li><a href="mailto:scheduling@bmisurgical.com" class="hover:text-white transition">scheduling@bmisurgical.com</a></li><li>Mon–Fri · 8 AM – 5 PM · Sat 8–1</li></ul></div></div>
    <div class="border-t border-white/10"><div class="max-w-7xl mx-auto px-6 py-5 text-xs text-white/40 flex flex-col sm:flex-row justify-between gap-2"><p>© 2026 BMI Surgical Institute · Dr. Amir Aryaie, MD, FACS</p><p>Serving Atlanta · Roswell · Snellville</p></div></div></footer>`;
}

function providerCard(t,p){
  const avatar = p.photo
    ? `<img src="${p.photo}" alt="${p.name}, ${p.cred}" class="w-full h-full object-cover object-top" />`
    : mono(t,p.name);
  const badge = p.founder ? `<span class="inline-flex items-center gap-1 ${t.bookBtn} text-[11px] px-2.5 py-1 rounded-full mb-3">Founder &amp; Owner</span>` : '';
  return `<article class="${t.card} ${t.radiusLg} overflow-hidden flex flex-col">
    <div class="h-72 bg-slate-100 relative">${avatar}</div>
    <div class="p-6 flex flex-col flex-1">
      ${badge}
      <h3 class="font-display font-extrabold text-xl ${t.heading}">${p.name}<span class="block text-sm font-semibold ${t.accentText} mt-0.5">${p.cred}</span></h3>
      <p class="text-sm ${t.muted} font-semibold mt-1">${p.role}</p>
      <p class="mt-3 text-sm ${t.muted} leading-relaxed">${p.bio}</p>
    </div>
  </article>`;
}
function staffCard(t,[name,cred,role]){
  return `<div class="${t.card} ${t.radius} p-5 flex items-center gap-4">
    <div class="w-14 h-14 rounded-full overflow-hidden shrink-0">${mono(t,name)}</div>
    <div><p class="font-display font-bold ${t.heading} leading-tight">${name}${cred?`<span class="${t.accentText} font-semibold text-sm">, ${cred}</span>`:''}</p><p class="text-sm ${t.muted}">${role}</p></div>
  </div>`;
}

function render(t){
  const book = t.suffix==='' ? t.home+'#book' : t.home+'#booking';
return `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
<meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><meta name="robots" content="noindex, nofollow" />
<title>Our Team · BMI Surgical Institute — Dr. Amir Aryaie, Atlanta GA</title>
<meta name="description" content="Meet the BMI Surgical Institute team in Atlanta, GA — founder Dr. Amir Aryaie (MD, FACS, FASMBS), Dr. Gonzalez-Jacobo, Christine Paulin FNP, and the full clinical and patient-care staff." />
<script src="https://cdn.tailwindcss.com"></script>
<link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
${t.fonts}
<script>${t.tw}</script>
<style>${t.style}
a:focus-visible,button:focus-visible{outline:3px solid #1750dd;outline-offset:2px;border-radius:6px}
.skip-link{position:absolute;left:-999px;top:0;z-index:100}.skip-link:focus{left:12px;top:12px;padding:10px 16px;background:#1750dd;color:#fff;border-radius:10px}
@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}}
</style>
</head>
<body class="${t.bodyClass}">
<a href="#main" class="skip-link">Skip to main content</a>
${nav(t)}
<main id="main" class="${t.mainPad}">
  <!-- HERO -->
  <section class="py-16 lg:py-20 ${t.dark} text-white relative overflow-hidden">
    <div aria-hidden="true" class="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 blur-3xl"></div>
    <div class="relative max-w-7xl mx-auto px-6">
      <nav aria-label="Breadcrumb" class="text-sm text-white/55 mb-4"><a href="${t.home}" class="hover:text-white">Home</a> · <span class="text-white/90">Our Team</span></nav>
      <h1 class="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] max-w-3xl">Meet the team behind your care</h1>
      <p class="mt-5 text-lg text-white/75 max-w-2xl">From your surgeon to your patient advocate, every member of BMI Surgical Institute is here to guide you — with expertise and genuine compassion — through every step of your journey.</p>
    </div>
  </section>

  <!-- PROVIDERS -->
  <section class="py-18 lg:py-24 pt-16">
    <div class="max-w-7xl mx-auto px-6">
      <div class="max-w-2xl"><p class="${t.accentText} font-semibold tracking-wide uppercase text-sm">Your providers</p><h2 class="mt-3 font-display font-extrabold text-3xl sm:text-4xl ${t.heading}">Surgeons &amp; clinicians</h2></div>
      <div class="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        ${PROVIDERS.map(p=>providerCard(t,p)).join('\n        ')}
      </div>
    </div>
  </section>

  <!-- STAFF -->
  <section class="py-16 ${t.suffix==='' ? 'bg-gradient-to-b from-brand-50/60 to-transparent' : (t.suffix==='-warm'?'bg-sand-100/60':'bg-slate-50/60')}">
    <div class="max-w-7xl mx-auto px-6">
      <div class="max-w-2xl"><p class="${t.accentText} font-semibold tracking-wide uppercase text-sm">Your care team</p><h2 class="mt-3 font-display font-extrabold text-3xl sm:text-4xl ${t.heading}">Coordinators &amp; patient care</h2><p class="mt-4 ${t.muted}">The people who make your experience smooth — from scheduling and insurance to bilingual support and post-op coordination.</p></div>
      <div class="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        ${STAFF.map(s=>staffCard(t,s)).join('\n        ')}
      </div>
      <p class="mt-6 text-xs ${t.muted}">Headshots for our wider team are being added — individual staff photos coming soon.</p>
    </div>
  </section>

  <!-- CTA -->
  <section class="py-20 lg:py-28">
    <div class="max-w-5xl mx-auto px-6">
      <div class="${t.dark} ${t.radiusLg} p-8 sm:p-12 text-center text-white">
        <h2 class="font-display font-extrabold text-3xl sm:text-5xl">Ready to meet us in person?</h2>
        <p class="mt-4 text-white/70 max-w-2xl mx-auto">Book a consultation and let our team help you find the right path — serving Atlanta and the Roswell &amp; Snellville areas.</p>
        <div class="mt-8 flex flex-wrap gap-3 justify-center">
          <a href="${book}" class="inline-flex items-center gap-2 ${t.bookBtn} px-8 py-3.5 ${t.pill} transition">Request a consultation</a>
          <a href="tel:+16786260909" class="inline-flex items-center gap-2 bg-white/15 backdrop-blur text-white font-semibold px-8 py-3.5 ${t.pill} transition hover:bg-white/25">Call (678) 626-0909</a>
        </div>
      </div>
    </div>
  </section>
</main>
${footer(t)}
<a href="tel:+16786260909" class="sm:hidden fixed bottom-4 left-4 right-4 z-40 ${t.bookBtn} py-3.5 ${t.pill} shadow-2xl flex items-center justify-center gap-2">${callIcon}Call (678) 626-0909</a>
${t.sienna}
</body>
</html>`;
}

let made=[];
for(const k of Object.keys(THEMES)){ const t=THEMES[k]; const fn='team'+t.suffix+'.html'; fs.writeFileSync(dir+fn, render(t)); made.push(fn); }
console.log('generated:\n  '+made.join('\n  '));
