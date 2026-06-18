const fs = require('fs');
const { PROCS } = require('./_gen-services.js');
const dir = __dirname + '/';
const cross = '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M10 3h4a1 1 0 011 1v5h5a1 1 0 011 1v4a1 1 0 01-1 1h-5v5a1 1 0 01-1 1h-4a1 1 0 01-1-1v-5H4a1 1 0 01-1-1v-4a1 1 0 011-1h5V4a1 1 0 011-1z"/></svg>';
const callIcon = '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.95.68l1.5 4.5a1 1 0 01-.5 1.2l-2.26 1.13a11 11 0 005.5 5.5l1.13-2.26a1 1 0 011.2-.5l4.5 1.5a1 1 0 01.68.95V19a2 2 0 01-2 2h-1C9.7 21 3 14.3 3 6V5z"/></svg>';
const arrow = '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>';

// ---- Per-concept theme config ----
const THEMES = {
  clean: {
    suffix:'-clean', home:'clean-modern.html',
    fonts:'<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />',
    tw:`tailwind.config={theme:{extend:{fontFamily:{display:['"Plus Jakarta Sans"','sans-serif'],sans:['Inter','sans-serif']},colors:{brand:{50:'#eff8ff',100:'#dbeefe',200:'#bfe2fe',300:'#93d0fd',400:'#60b5fa',500:'#3b97f6',600:'#2479eb',700:'#1c63d8',800:'#1d51af',900:'#1d478a',950:'#162c54'},teal:{400:'#2dd4bf',500:'#14b8a6',600:'#0d9488'}}}}};`,
    style:`body{font-family:'Inter',sans-serif}h1,h2,h3,h4,.font-display{font-family:'Plus Jakarta Sans',sans-serif}details summary::-webkit-details-marker{display:none}@media (prefers-reduced-motion:reduce){#hero-video{display:none!important}}`,
    bodyClass:'bg-white text-slate-700 antialiased',
    accent:'brand-600', accentHover:'brand-700', accent2:'teal-500', heading:'text-slate-900', muted:'text-slate-500',
    radius:'rounded-2xl', radiusLg:'rounded-[2rem]', pill:'rounded-full',
    logoBox:'w-11 h-11 rounded-2xl bg-gradient-to-br from-brand-500 to-teal-500',
    navBg:'sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-100',
    bookBtn:'bg-brand-600 hover:bg-brand-700 text-white font-semibold',
    ghostBtn:'bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 shadow-sm',
    card:'bg-white border border-slate-100 shadow-sm', cardHover:'hover:border-brand-200 hover:shadow-xl',
    sectionAlt:'bg-slate-50/60', darkBg:'bg-brand-950', darkText:'text-brand-200',
    faqCard:'bg-white border border-slate-100 shadow-sm', faqQ:'text-slate-900', faqA:'text-slate-500',
    chipBg:'bg-brand-50 text-brand-700 border border-brand-100',
    footerBg:'bg-brand-950', footerText:'text-brand-200', footerMuted:'text-brand-300/80', footerHover:'hover:text-white',
    callBar:'bg-brand-600',
    fallbackGrad:'linear-gradient(135deg,#dbeefe,#ccfbf1)', fallbackIcon:'#60b5fa',
  },
  warm: {
    suffix:'-warm', home:'warm-friendly.html',
    fonts:'<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Nunito:wght@400;500;600;700;800&display=swap" rel="stylesheet" />',
    tw:`tailwind.config={theme:{extend:{fontFamily:{display:['Fraunces','serif'],sans:['Nunito','sans-serif']},colors:{cream:'#fffaf3',sand:{100:'#fdf3e7',200:'#f9e6d0'},spruce:{100:'#e3f0ed',400:'#5bbcad',500:'#3fa394',600:'#2f8678',700:'#296b60',900:'#1f3f3a'},coral:{100:'#ffe9e0',400:'#ff9b7a',500:'#fb7e57',600:'#ed633a'}}}}};`,
    style:`body{font-family:'Nunito',sans-serif}h1,h2,h3,h4,.font-display{font-family:'Fraunces',serif}.blob{border-radius:42% 58% 63% 37%/41% 44% 56% 59%}details summary::-webkit-details-marker{display:none}@media (prefers-reduced-motion:reduce){#hero-video{display:none!important}}`,
    bodyClass:'bg-cream text-spruce-900/80 antialiased',
    accent:'coral-500', accentHover:'coral-600', accent2:'spruce-500', heading:'text-spruce-900', muted:'text-spruce-700/70',
    radius:'rounded-[1.75rem]', radiusLg:'rounded-[2.5rem]', pill:'rounded-full',
    logoBox:'w-12 h-12 rounded-full bg-coral-500',
    navBg:'sticky top-0 z-50 bg-cream/90 backdrop-blur border-b border-sand-200',
    bookBtn:'bg-coral-500 hover:bg-coral-600 text-white font-bold',
    ghostBtn:'bg-white hover:bg-sand-100 text-spruce-800 border border-sand-200 shadow-sm',
    card:'bg-white shadow-sm', cardHover:'hover:shadow-xl hover:-translate-y-1',
    sectionAlt:'bg-sand-100/50', darkBg:'bg-spruce-700', darkText:'text-white/80',
    faqCard:'bg-white shadow-sm', faqQ:'text-spruce-900', faqA:'text-spruce-700/70',
    chipBg:'bg-coral-100 text-coral-600',
    footerBg:'bg-spruce-900', footerText:'text-white/70', footerMuted:'text-white/50', footerHover:'hover:text-coral-400',
    callBar:'bg-coral-500',
    fallbackGrad:'linear-gradient(135deg,#fdf3e7,#e3f0ed)', fallbackIcon:'#5bbcad',
  },
};

function render(p, t){
  const li = a => a.map(x=>`<li class="flex items-start gap-3 ${t.muted}"><span aria-hidden="true" class="mt-1 w-5 h-5 rounded-full bg-${t.accent2}/15 text-${t.accent2} flex items-center justify-center shrink-0"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg></span><span>${x}</span></li>`).join('');
  const forYou = a => a.map(x=>`<li class="flex items-start gap-3 text-white/85"><span aria-hidden="true" class="mt-1 text-${t.accent2==='teal-500'?'teal-300':'coral-400'}">✓</span><span>${x}</span></li>`).join('');
  const faqHtml = f => f.map(([q,a])=>`<details class="group ${t.faqCard} ${t.radius} px-5 py-4"><summary class="flex items-center justify-between cursor-pointer font-display font-bold ${t.faqQ} list-none">${q}<svg class="w-5 h-5 text-${t.accent} transition group-open:rotate-180 shrink-0 ml-3" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg></summary><p class="mt-3 ${t.faqA} leading-relaxed">${a}</p></details>`).join('');
  const others = PROCS.filter(x=>x.slug!==p.slug).map(x=>`<a href="${x.slug}${t.suffix}.html" class="${t.card} ${t.cardHover} ${t.radius} px-4 py-3 text-sm font-bold ${t.heading} transition">${x.name} →</a>`).join('');

return `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
<meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><meta name="robots" content="noindex, nofollow" />
<title>${p.title} in Atlanta · BMI Surgical Institute — Dr. Amir Aryaie</title>
<meta name="description" content="${p.title} at BMI Surgical Institute in Atlanta, GA. ${p.intro}" />
<script src="https://cdn.tailwindcss.com"></script>
<link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
${t.fonts}
<script>${t.tw}</script>
<style>${t.style}
a:focus-visible,button:focus-visible,summary:focus-visible{outline:3px solid currentColor;outline-offset:2px;border-radius:6px}
.skip-link{position:absolute;left:-999px;top:0;z-index:100}.skip-link:focus{left:12px;top:12px;padding:10px 16px;background:#1c63d8;color:#fff;border-radius:10px}
</style>
</head>
<body class="${t.bodyClass}">
<a href="#main" class="skip-link">Skip to main content</a>

<!-- NAV -->
<header class="${t.navBg}">
  <nav aria-label="Primary" class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
    <a href="${t.home}" class="flex items-center gap-3" aria-label="BMI Surgical Institute home">
      <span aria-hidden="true" class="${t.logoBox} flex items-center justify-center text-white shadow-lg">${cross}</span>
      <span class="leading-tight"><span class="block font-display font-extrabold ${t.heading} text-lg">Dr. Amir Aryaie, MD, FACS</span><span class="block text-xs ${t.muted} tracking-wide">BMI Surgical Institute · Atlanta, GA</span></span>
    </a>
    <div class="hidden lg:flex items-center gap-8 text-sm font-semibold ${t.muted}">
      <a href="${t.home}#services" class="hover:text-${t.accent} transition">Procedures</a>
      <a href="${t.home}#about" class="hover:text-${t.accent} transition">Meet Dr. Aryaie</a>
      <a href="${t.home}#reviews" class="hover:text-${t.accent} transition">Reviews</a>
      <a href="${t.home}#contact" class="hover:text-${t.accent} transition">Contact</a>
    </div>
    <div class="flex items-center gap-3">
      <a href="tel:+16786260909" class="hidden sm:flex items-center gap-2 text-${t.accent} font-semibold text-sm">${callIcon}(678) 626-0909</a>
      <a href="#book" class="${t.bookBtn} text-sm px-5 py-2.5 ${t.pill} shadow-lg transition">Book now</a>
    </div>
  </nav>
</header>

<main id="main">
  <!-- HERO with looping video -->
  <section class="relative h-[74vh] min-h-[460px] overflow-hidden flex items-end bg-slate-900">
    <video id="hero-video" class="absolute inset-0 w-full h-full object-cover" autoplay muted loop playsinline aria-hidden="true"><source src="media/or.mp4" type="video/mp4" /></video>
    <div aria-hidden="true" class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/60 to-black/25"></div>
    <div class="relative z-10 max-w-7xl mx-auto px-6 pb-14 w-full text-white">
      <nav aria-label="Breadcrumb" class="text-sm text-white/60 mb-4"><a href="${t.home}" class="hover:text-white">Home</a> · <a href="${t.home}#services" class="hover:text-white">Procedures</a> · <span class="text-white/90">${p.name}</span></nav>
      <p class="inline-flex items-center gap-2 bg-white/15 backdrop-blur text-white ${t.pill} px-4 py-1.5 text-sm font-semibold mb-5"><span class="w-2 h-2 rounded-full bg-emerald-400"></span> ${p.cat}</p>
      <h1 class="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] max-w-3xl">${p.title}</h1>
      <p class="mt-5 text-lg text-white/85 max-w-2xl">${p.intro}</p>
      <div class="mt-8 flex flex-wrap gap-3">
        <a href="#book" class="inline-flex items-center gap-2 ${t.bookBtn} px-7 py-3.5 ${t.pill} shadow-xl transition">Book a consultation ${arrow}</a>
        <a href="tel:+16786260909" class="inline-flex items-center gap-2 bg-white/15 backdrop-blur text-white font-semibold px-7 py-3.5 ${t.pill} transition hover:bg-white/25">(678) 626-0909</a>
      </div>
    </div>
  </section>

  <!-- OVERVIEW -->
  <section class="py-20 lg:py-24">
    <div class="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <p class="text-${t.accent} font-semibold tracking-wide uppercase text-sm">What it is</p>
        <h2 class="mt-3 font-display font-extrabold text-3xl sm:text-4xl ${t.heading}">${p.name} explained</h2>
        <p class="mt-5 ${t.muted} text-lg leading-relaxed">${p.overview}</p>
      </div>
      <div class="${t.radiusLg} overflow-hidden shadow-2xl"><img src="images/${p.img}" alt="Consultation at BMI Surgical Institute" class="w-full h-[380px] object-cover" /></div>
    </div>
  </section>

  <!-- WHO + HOW -->
  <section class="py-16 ${t.darkBg} relative overflow-hidden">
    <div class="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10">
      <div class="bg-white/10 backdrop-blur ${t.radius} p-8">
        <h3 class="font-display font-extrabold text-2xl text-white">Is it right for you?</h3>
        <ul class="mt-5 space-y-3">${forYou(p.forYou)}</ul>
        <p class="mt-6 text-white/55 text-sm">Only a consultation can confirm the right fit — Dr. Aryaie will review your history and goals with you.</p>
      </div>
      <div class="bg-white ${t.radius} p-8 shadow-xl">
        <h3 class="font-display font-extrabold text-2xl ${t.heading}">How it works</h3>
        <ul class="mt-5 space-y-3">${li(p.how)}</ul>
      </div>
    </div>
  </section>

  <!-- RECOVERY -->
  <section class="py-20 lg:py-24">
    <div class="max-w-4xl mx-auto px-6 text-center">
      <p class="text-${t.accent} font-semibold tracking-wide uppercase text-sm">Recovery &amp; results</p>
      <h2 class="mt-3 font-display font-extrabold text-3xl sm:text-4xl ${t.heading}">What to expect</h2>
      <p class="mt-5 ${t.muted} text-lg leading-relaxed">${p.recovery}</p>
    </div>
  </section>

  <!-- FAQ -->
  <section class="py-16 ${t.sectionAlt}">
    <div class="max-w-3xl mx-auto px-6">
      <h2 class="font-display font-extrabold text-3xl sm:text-4xl ${t.heading} text-center mb-8">Frequently asked questions</h2>
      <div class="space-y-3">${faqHtml(p.faqs)}</div>
    </div>
  </section>

  <!-- OTHER PROCEDURES -->
  <section class="py-14">
    <div class="max-w-7xl mx-auto px-6">
      <h3 class="font-display font-bold text-xl ${t.heading} mb-4">Explore other procedures</h3>
      <div class="flex flex-wrap gap-3">${others}</div>
    </div>
  </section>

  <!-- BOOK CTA -->
  <section id="book" class="py-20 lg:py-28">
    <div class="max-w-5xl mx-auto px-6">
      <div class="${t.darkBg} ${t.radiusLg} p-8 sm:p-12 text-center text-white relative overflow-hidden">
        <p class="font-semibold tracking-wide uppercase text-sm text-white/70">Take the next step</p>
        <h2 class="mt-3 font-display font-extrabold text-3xl sm:text-5xl text-white">Ready to talk about ${p.name.toLowerCase()}?</h2>
        <p class="mt-4 text-white/70 max-w-2xl mx-auto">Schedule a consultation with Dr. Aryaie to find out whether ${p.name.toLowerCase()} is right for you. We'll review your history, answer every question, and verify your insurance.</p>
        <div class="mt-8 flex flex-wrap gap-3 justify-center">
          <a href="${t.home}#booking" class="inline-flex items-center gap-2 ${t.bookBtn} px-8 py-3.5 ${t.pill} shadow-lg transition">Request a consultation</a>
          <a href="tel:+16786260909" class="inline-flex items-center gap-2 bg-white/15 backdrop-blur text-white font-semibold px-8 py-3.5 ${t.pill} transition hover:bg-white/25">Call (678) 626-0909</a>
        </div>
      </div>
    </div>
  </section>
</main>

<!-- FOOTER -->
<footer class="${t.footerBg} ${t.footerText}">
  <div class="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-10">
    <div>
      <div class="flex items-center gap-3 mb-4"><span aria-hidden="true" class="${t.logoBox} flex items-center justify-center text-white">${cross}</span><span class="font-display font-extrabold text-white text-lg">BMI Surgical Institute</span></div>
      <p class="text-sm ${t.footerMuted} max-w-xs">Advanced bariatric, reflux and minimally invasive surgery for Atlanta.</p>
    </div>
    <nav aria-label="Footer"><p class="font-semibold text-white mb-3">Explore</p><ul class="space-y-2 text-sm"><li><a href="${t.home}#services" class="${t.footerHover} transition">Procedures</a></li><li><a href="${t.home}#about" class="${t.footerHover} transition">Meet Dr. Aryaie</a></li><li><a href="${t.home}#reviews" class="${t.footerHover} transition">Reviews</a></li><li><a href="#book" class="${t.footerHover} transition">Book a consultation</a></li></ul></nav>
    <div><p class="font-semibold text-white mb-3">Get in touch</p><ul class="space-y-2 text-sm"><li>2303 Cumberland Parkway SE, Ste 2</li><li>Atlanta, GA 30339</li><li><a href="tel:+16786260909" class="${t.footerHover} transition">(678) 626-0909</a></li><li><a href="mailto:scheduling@bmisurgical.com" class="${t.footerHover} transition">scheduling@bmisurgical.com</a></li><li>Mon–Fri · 8 AM – 5 PM · Sat 8–1</li></ul></div>
  </div>
  <div class="border-t border-white/10"><div class="max-w-7xl mx-auto px-6 py-5 text-xs ${t.footerMuted} flex flex-col sm:flex-row justify-between gap-2"><p>© 2026 BMI Surgical Institute · Dr. Amir Aryaie, MD, FACS</p><p>Procedure information is educational and not a substitute for medical advice.</p></div></div>
</footer>

<a href="tel:+16786260909" class="sm:hidden fixed bottom-4 left-4 right-4 z-40 ${t.callBar} text-white font-bold py-3.5 ${t.pill} shadow-2xl flex items-center justify-center gap-2">${callIcon}Call (678) 626-0909</a>
</body>
</html>`;
}

let made=[];
for(const key of Object.keys(THEMES)){
  const t = THEMES[key];
  for(const p of PROCS){ const fn=p.slug+t.suffix+'.html'; fs.writeFileSync(dir+fn, render(p,t)); made.push(fn); }
}
console.log('generated '+made.length+' pages:\n  '+made.join('\n  '));
