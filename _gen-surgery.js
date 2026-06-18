const fs = require('fs');
const dir = __dirname + '/';

const cross = '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M10 3h4a1 1 0 011 1v5h5a1 1 0 011 1v4a1 1 0 01-1 1h-5v5a1 1 0 01-1 1h-4a1 1 0 01-1-1v-5H4a1 1 0 01-1-1v-4a1 1 0 011-1h5V4a1 1 0 011-1z"/></svg>';
const callIcon = '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.95.68l1.5 4.5a1 1 0 01-.5 1.2l-2.26 1.13a11 11 0 005.5 5.5l1.13-2.26a1 1 0 011.2-.5l4.5 1.5a1 1 0 01.68.95V19a2 2 0 01-2 2h-1C9.7 21 3 14.3 3 6V5z"/></svg>';
const arrow = '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>';

// Surgery options. 3rd field = detail-page slug (null = link to booking).
const OPTIONS = [
  ['Gastric Sleeve','Removing about 80% of the stomach to curb hunger and portion size — the most popular weight-loss procedure.','gastric-sleeve'],
  ['Gastric Bypass','A small stomach pouch plus a rerouted intestine — powerful for type-2 diabetes and severe reflux.','gastric-bypass'],
  ['Mini Gastric Bypass','A streamlined single-connection bypass (OAGB) with strong, lasting results and a shorter operation.',null],
  ['Duodenal Switch','SADI-S — one of the most effective procedures, often chosen for a higher starting BMI.',null],
  ['Adjustable Gastric Band','A minimally invasive, adjustable and reversible band placed around the upper stomach.',null],
  ['Gastric Balloon','A non-surgical, temporary balloon placed by endoscopy to jump-start your weight loss.',null],
  ['Endoscopic Sleeve','Incisionless ESG — the stomach is reshaped entirely through a flexible endoscope.',null],
  ['Revisional Surgery','Redo or convert a previous weight-loss procedure that has stalled or caused problems.',null],
];

const CLIPS = [
  ['media/surgery-1.mp4','In the operating room','Advanced laparoscopic & robotic technique'],
  ['media/or.mp4','A dedicated team','Expert surgeons and OR staff at every step'],
  ['media/surgery-2.mp4','Minimally invasive','Smaller incisions, faster recovery'],
];

const THEMES = {
  premium: {
    suffix:'', home:'premium.html',
    fonts:'<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500;600&family=Fraunces:ital,opsz,wght@1,9..144,500&display=swap" rel="stylesheet" />',
    tw:`tailwind.config={theme:{extend:{fontFamily:{display:['Sora','sans-serif'],sans:['Inter','sans-serif'],serif:['Fraunces','serif']},colors:{ink:'#0b1b34',brand:{50:'#eef6ff',100:'#d9ebff',200:'#bcdcff',300:'#8ec6ff',400:'#59a6ff',500:'#3385fb',600:'#1e66f0',700:'#1750dd',800:'#1942b3',900:'#1a3c8d',950:'#142657'}}}}};`,
    style:`body{font-family:'Inter',sans-serif;color:#0b1b34;background:#f4f8ff}h1,h2,h3,h4,.font-display{font-family:'Sora',sans-serif}.glass{background:rgba(255,255,255,.62);backdrop-filter:blur(20px) saturate(150%);border:1px solid rgba(255,255,255,.65);box-shadow:0 20px 50px -22px rgba(20,38,87,.45)}.glass-soft{background:rgba(255,255,255,.5);backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.6)}`,
    bodyClass:'antialiased', heading:'text-ink', muted:'text-ink/70', accent:'brand-600', accentText:'text-brand-600',
    radius:'rounded-2xl', radiusLg:'rounded-[2rem]', pill:'rounded-2xl',
    card:'glass', cardHover:'hover:-translate-y-1', alt:'bg-gradient-to-b from-brand-50/60 to-transparent',
    dark:'bg-ink', bookBtn:'bg-brand-600 hover:bg-brand-700 text-white font-semibold shadow-lg shadow-brand-600/30',
    ghostBtn:'glass text-ink font-semibold', calcBtn:'bg-brand-600 hover:bg-brand-700',
    input:'bg-white/70 border border-white/70 focus:border-brand-500',
    sienna:'<script src="https://cdn.jsdelivr.net/npm/sienna-accessibility/dist/sienna-accessibility.umd.js" data-asw-position="bottom-left" async></script>',
    nav: t => `<header class="fixed top-0 inset-x-0 z-50"><div class="mx-auto max-w-7xl px-4 sm:px-6"><nav aria-label="Primary" class="mt-3 glass rounded-2xl px-4 sm:px-5 h-16 flex items-center justify-between">
      <a href="${t.home}" class="flex items-center gap-2.5"><span aria-hidden="true" class="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 to-cyan-400 flex items-center justify-center text-white shadow-lg">${cross}</span><span class="leading-tight"><span class="block font-display font-extrabold text-ink text-[15px]">Dr. Amir Aryaie, MD, FACS</span><span class="block text-[11px] text-brand-700/70">BMI Surgical Institute · Atlanta, GA</span></span></a>
      <div class="hidden lg:flex items-center gap-7 text-sm font-medium text-ink/75"><a href="surgery-options.html" class="text-brand-700 font-semibold">Surgery Options</a><a href="#bmi" class="hover:text-brand-700 transition">BMI Calculator</a><a href="${t.home}#doctor" class="hover:text-brand-700 transition">Meet Dr. Aryaie</a><a href="${t.home}#reviews" class="hover:text-brand-700 transition">Reviews</a></div>
      <div class="flex items-center gap-2"><a href="tel:+16786260909" class="hidden sm:inline-flex items-center gap-2 text-brand-700 font-semibold text-sm px-3 py-2 rounded-xl hover:bg-brand-50 transition">${callIcon}(678) 626-0909</a><a href="${t.home}#book" class="inline-flex bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-brand-600/30 transition">Book now</a></div></nav></div></header>`,
    footer: t => premiumFooter(t),
  },
  clean: {
    suffix:'-clean', home:'clean-modern.html',
    fonts:'<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />',
    tw:`tailwind.config={theme:{extend:{fontFamily:{display:['"Plus Jakarta Sans"','sans-serif'],sans:['Inter','sans-serif']},colors:{brand:{50:'#eff8ff',100:'#dbeefe',200:'#bfe2fe',300:'#93d0fd',400:'#60b5fa',500:'#3b97f6',600:'#2479eb',700:'#1c63d8',800:'#1d51af',900:'#1d478a',950:'#162c54'},teal:{400:'#2dd4bf',500:'#14b8a6',600:'#0d9488'}}}}};`,
    style:`body{font-family:'Inter',sans-serif}h1,h2,h3,h4,.font-display{font-family:'Plus Jakarta Sans',sans-serif}`,
    bodyClass:'bg-white text-slate-700 antialiased', heading:'text-slate-900', muted:'text-slate-500', accent:'brand-600', accentText:'text-brand-600',
    radius:'rounded-2xl', radiusLg:'rounded-[2rem]', pill:'rounded-full',
    card:'bg-white border border-slate-100 shadow-sm', cardHover:'hover:border-brand-200 hover:shadow-xl', alt:'bg-slate-50/60',
    dark:'bg-brand-950', bookBtn:'bg-brand-600 hover:bg-brand-700 text-white font-semibold shadow-lg shadow-brand-600/25',
    ghostBtn:'bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 shadow-sm font-semibold', calcBtn:'bg-brand-600 hover:bg-brand-700',
    input:'bg-white border border-slate-200 focus:border-brand-500',
    sienna:'',
    nav: t => cwNav(t,'sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-100','w-11 h-11 rounded-2xl bg-gradient-to-br from-brand-500 to-teal-500','text-slate-900','text-slate-400','text-slate-600','brand-600','bg-brand-600 hover:bg-brand-700'),
    footer: t => cwFooter(t,'bg-brand-950','text-brand-200','text-brand-300/80','hover:text-white','w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-teal-500'),
  },
  warm: {
    suffix:'-warm', home:'warm-friendly.html',
    fonts:'<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Nunito:wght@400;500;600;700;800&display=swap" rel="stylesheet" />',
    tw:`tailwind.config={theme:{extend:{fontFamily:{display:['Fraunces','serif'],sans:['Nunito','sans-serif']},colors:{cream:'#fffaf3',sand:{100:'#fdf3e7',200:'#f9e6d0'},spruce:{100:'#e3f0ed',400:'#5bbcad',500:'#3fa394',600:'#2f8678',700:'#296b60',900:'#1f3f3a'},coral:{100:'#ffe9e0',400:'#ff9b7a',500:'#fb7e57',600:'#ed633a'}}}}};`,
    style:`body{font-family:'Nunito',sans-serif}h1,h2,h3,h4,.font-display{font-family:'Fraunces',serif}.blob{border-radius:42% 58% 63% 37%/41% 44% 56% 59%}`,
    bodyClass:'bg-cream text-spruce-900/80 antialiased', heading:'text-spruce-900', muted:'text-spruce-700/70', accent:'coral-500', accentText:'text-coral-500',
    radius:'rounded-[1.75rem]', radiusLg:'rounded-[2.5rem]', pill:'rounded-full',
    card:'bg-white shadow-sm', cardHover:'hover:shadow-xl hover:-translate-y-1', alt:'bg-sand-100/50',
    dark:'bg-spruce-900', bookBtn:'bg-coral-500 hover:bg-coral-600 text-white font-bold shadow-lg shadow-coral-500/30',
    ghostBtn:'bg-white hover:bg-sand-100 text-spruce-800 border border-sand-200 shadow-sm font-bold', calcBtn:'bg-coral-500 hover:bg-coral-600',
    input:'bg-white border border-sand-200 focus:border-coral-400',
    sienna:'',
    nav: t => cwNav(t,'sticky top-0 z-50 bg-cream/90 backdrop-blur border-b border-sand-200','w-12 h-12 rounded-full bg-coral-500','text-spruce-900','text-spruce-600/70','text-spruce-700','coral-500','bg-coral-500 hover:bg-coral-600'),
    footer: t => cwFooter(t,'bg-spruce-900','text-white/70','text-white/50','hover:text-coral-400','w-11 h-11 rounded-full bg-coral-500'),
  },
};

function cwNav(t,navCls,logoCls,headCls,subCls,linkCls,accent,btnCls){
  return `<header class="${navCls}"><nav aria-label="Primary" class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
    <a href="${t.home}" class="flex items-center gap-3"><span aria-hidden="true" class="${logoCls} flex items-center justify-center text-white shadow-lg">${cross}</span><span class="leading-tight"><span class="block font-display font-extrabold ${headCls} text-lg">Dr. Amir Aryaie, MD, FACS</span><span class="block text-xs ${subCls} tracking-wide">BMI Surgical Institute · Atlanta, GA</span></span></a>
    <div class="hidden lg:flex items-center gap-8 text-sm font-semibold ${linkCls}"><a href="surgery-options${t.suffix}.html" class="text-${accent} font-bold">Surgery Options</a><a href="#bmi" class="hover:text-${accent} transition">BMI Calculator</a><a href="${t.home}#about" class="hover:text-${accent} transition">Meet Dr. Aryaie</a><a href="${t.home}#reviews" class="hover:text-${accent} transition">Reviews</a></div>
    <div class="flex items-center gap-3"><a href="tel:+16786260909" class="hidden sm:flex items-center gap-2 text-${accent} font-semibold text-sm">${callIcon}(678) 626-0909</a><a href="${t.home}#booking" class="${btnCls} text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-lg transition">Book now</a></div></nav></header>`;
}
function cwFooter(t,bg,txt,muted,hov,logoCls){
  return `<footer class="${bg} ${txt}"><div class="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-10">
    <div><div class="flex items-center gap-3 mb-4"><span aria-hidden="true" class="${logoCls} flex items-center justify-center text-white">${cross}</span><span class="font-display font-extrabold text-white text-lg">BMI Surgical Institute</span></div><p class="text-sm ${muted} max-w-xs">Advanced bariatric, reflux and minimally invasive surgery for Atlanta.</p></div>
    <nav aria-label="Footer"><p class="font-semibold text-white mb-3">Explore</p><ul class="space-y-2 text-sm"><li><a href="surgery-options${t.suffix}.html" class="${hov} transition">Surgery Options</a></li><li><a href="#bmi" class="${hov} transition">BMI Calculator</a></li><li><a href="${t.home}#about" class="${hov} transition">Meet Dr. Aryaie</a></li><li><a href="${t.home}#booking" class="${hov} transition">Book a consultation</a></li></ul></nav>
    <div><p class="font-semibold text-white mb-3">Get in touch</p><ul class="space-y-2 text-sm"><li>2303 Cumberland Parkway SE, Ste 2</li><li>Atlanta, GA 30339</li><li><a href="tel:+16786260909" class="${hov} transition">(678) 626-0909</a></li><li><a href="mailto:scheduling@bmisurgical.com" class="${hov} transition">scheduling@bmisurgical.com</a></li><li>Mon–Fri · 8 AM – 5 PM · Sat 8–1</li></ul></div></div>
    <div class="border-t border-white/10"><div class="max-w-7xl mx-auto px-6 py-5 text-xs ${muted} flex flex-col sm:flex-row justify-between gap-2"><p>© 2026 BMI Surgical Institute · Dr. Amir Aryaie, MD, FACS</p><p>BMI &amp; eligibility tools are educational, not medical advice.</p></div></div></footer>`;
}
function premiumFooter(t){
  return `<footer class="bg-ink text-white/70"><div class="mx-auto max-w-7xl px-4 sm:px-6 py-14 grid md:grid-cols-3 gap-10">
    <div><div class="flex items-center gap-2.5 mb-4"><span aria-hidden="true" class="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 to-cyan-400 flex items-center justify-center text-white">${cross}</span><span class="font-display font-extrabold text-white text-lg">BMI Surgical Institute</span></div><p class="text-sm text-white/50 max-w-xs">Advanced bariatric, reflux and minimally invasive surgery for Atlanta.</p></div>
    <nav aria-label="Footer"><p class="font-semibold text-white mb-3">Explore</p><ul class="space-y-2 text-sm"><li><a href="surgery-options.html" class="hover:text-white transition">Surgery Options</a></li><li><a href="#bmi" class="hover:text-white transition">BMI Calculator</a></li><li><a href="${t.home}#doctor" class="hover:text-white transition">Meet Dr. Aryaie</a></li><li><a href="${t.home}#book" class="hover:text-white transition">Book a consultation</a></li></ul></nav>
    <div><p class="font-semibold text-white mb-3">Get in touch</p><ul class="space-y-2 text-sm"><li>2303 Cumberland Parkway SE, Ste 2</li><li>Atlanta, GA 30339</li><li><a href="tel:+16786260909" class="hover:text-white transition">(678) 626-0909</a></li><li><a href="mailto:scheduling@bmisurgical.com" class="hover:text-white transition">scheduling@bmisurgical.com</a></li><li>Mon–Fri · 8 AM – 5 PM · Sat 8–1</li></ul></div></div>
    <div class="border-t border-white/10"><div class="mx-auto max-w-7xl px-4 sm:px-6 py-5 text-xs text-white/40 flex flex-col sm:flex-row justify-between gap-2"><p>© 2026 BMI Surgical Institute · Dr. Amir Aryaie, MD, FACS</p><p>BMI &amp; eligibility tools are educational, not medical advice.</p></div></div></footer>`;
}

// Interactive BMI calculator (vanilla JS, theme-aware button)
function calc(t){
  const book = t.suffix==='' ? t.home+'#book' : t.home+'#booking';
  return `<section id="bmi" class="py-20 lg:py-24 ${t.alt}">
    <div class="max-w-5xl mx-auto px-6">
      <div class="text-center max-w-2xl mx-auto">
        <p class="${t.accentText} font-semibold tracking-wide uppercase text-sm">Am I a candidate?</p>
        <h2 class="mt-3 font-display font-extrabold text-3xl sm:text-4xl ${t.heading}">Check your BMI</h2>
        <p class="mt-4 ${t.muted}">Body mass index is the first step doctors use to assess eligibility for weight-loss surgery. Enter your height and weight for an instant estimate — then let's talk about what it means for you.</p>
      </div>
      <div class="mt-10 grid md:grid-cols-2 gap-6 items-stretch">
        <div class="${t.card} ${t.radiusLg} p-7">
          <form id="bmiForm" class="space-y-5">
            <div>
              <label class="block text-sm font-semibold ${t.heading} mb-2">Height</label>
              <div class="flex gap-3">
                <div class="flex-1"><div class="flex items-center ${t.input} rounded-xl px-3"><input id="bmiFt" type="number" inputmode="numeric" min="3" max="8" placeholder="5" class="w-full bg-transparent py-3 outline-none ${t.heading}" aria-label="Height feet" /><span class="${t.muted} text-sm pl-1">ft</span></div></div>
                <div class="flex-1"><div class="flex items-center ${t.input} rounded-xl px-3"><input id="bmiIn" type="number" inputmode="numeric" min="0" max="11" placeholder="6" class="w-full bg-transparent py-3 outline-none ${t.heading}" aria-label="Height inches" /><span class="${t.muted} text-sm pl-1">in</span></div></div>
              </div>
            </div>
            <div>
              <label class="block text-sm font-semibold ${t.heading} mb-2">Weight</label>
              <div class="flex items-center ${t.input} rounded-xl px-3"><input id="bmiLb" type="number" inputmode="numeric" min="60" max="800" placeholder="220" class="w-full bg-transparent py-3 outline-none ${t.heading}" aria-label="Weight in pounds" /><span class="${t.muted} text-sm pl-1">lb</span></div>
            </div>
            <button type="submit" class="w-full ${t.calcBtn} text-white font-semibold py-3.5 ${t.pill} transition">Calculate my BMI</button>
            <p class="text-xs ${t.muted}">This estimate is for education only and is not a medical diagnosis or a guarantee of surgical eligibility.</p>
          </form>
        </div>
        <div id="bmiResult" class="${t.dark} ${t.radiusLg} p-7 text-white flex flex-col justify-center text-center min-h-[280px]">
          <p class="text-white/60 text-sm">Your result will appear here</p>
          <p class="mt-2 text-white/40 text-sm">Enter your height and weight, then press <span class="font-semibold text-white/70">Calculate</span>.</p>
        </div>
      </div>
    </div>
    <script>(function(){
      var f=document.getElementById('bmiForm'),out=document.getElementById('bmiResult');
      function band(b){
        if(b<18.5) return ['Underweight','#38bdf8','A healthy weight is the goal here. A consultation can help you build a balanced plan.'];
        if(b<25) return ['Healthy weight','#34d399','You are in the healthy range. If weight is affecting your health in other ways, we are happy to talk.'];
        if(b<30) return ['Overweight','#fbbf24','A physician-supervised medical weight-loss program may be a great fit for you.'];
        if(b<35) return ['Obesity · Class I','#fb923c','You may qualify for medical weight loss or endoscopic options — and for surgery if you have an obesity-related condition.'];
        if(b<40) return ['Obesity · Class II','#f87171','You may be a candidate for weight-loss surgery, especially with a condition such as diabetes, sleep apnea or high blood pressure.'];
        return ['Obesity · Class III','#ef4444','You likely meet the BMI criteria for bariatric surgery. The next step is a conversation about your options.'];
      }
      f.addEventListener('submit',function(e){
        e.preventDefault();
        var ft=parseFloat(document.getElementById('bmiFt').value)||0,
            inch=parseFloat(document.getElementById('bmiIn').value)||0,
            lb=parseFloat(document.getElementById('bmiLb').value)||0,
            totIn=ft*12+inch;
        if(totIn<36||lb<40){ out.innerHTML='<p class="text-white font-semibold">Please enter a valid height and weight.</p>'; return; }
        var bmi=703*lb/(totIn*totIn), b=band(bmi),
            pct=Math.max(2,Math.min(98,((bmi-15)/(50-15))*100));
        out.innerHTML='<p class="text-white/60 text-sm uppercase tracking-wide">Your estimated BMI</p>'
          +'<p class="font-display font-extrabold text-6xl mt-1" style="color:'+b[1]+'">'+bmi.toFixed(1)+'</p>'
          +'<p class="mt-1 font-semibold text-lg" style="color:'+b[1]+'">'+b[0]+'</p>'
          +'<div class="mt-5 h-2.5 rounded-full overflow-hidden" style="background:linear-gradient(90deg,#34d399,#fbbf24,#fb923c,#ef4444)"></div>'
          +'<div class="relative h-0"><span class="absolute -top-1.5 w-3 h-3 rounded-full bg-white border-2 shadow" style="left:'+pct+'%;transform:translateX(-50%);border-color:'+b[1]+'"></span></div>'
          +'<p class="mt-6 text-white/80 text-sm leading-relaxed">'+b[2]+'</p>'
          +'<a href="${book}" class="mt-6 inline-flex items-center justify-center gap-2 ${t.calcBtn} text-white font-semibold px-6 py-3 ${t.pill} transition">Book a consultation '+'</a>';
      });
    })();</script>
  </section>`;
}

function render(t){
  const optHref = slug => slug ? (slug + t.suffix + '.html') : (t.suffix==='' ? t.home+'#book' : t.home+'#booking');
  const optBadge = slug => slug ? `<span class="text-xs font-semibold ${t.accentText} inline-flex items-center gap-1 mt-3">Learn more →</span>` : `<span class="text-xs ${t.muted} mt-3 inline-block">Ask at your consultation</span>`;
  const optCards = OPTIONS.map(([n,d,s])=>`<a href="${optHref(s)}" class="${t.card} ${t.cardHover} ${t.radius} p-6 block transition group">
    <span aria-hidden="true" class="w-11 h-11 rounded-xl bg-${t.accent}/10 ${t.accentText} flex items-center justify-center mb-4"><svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12h4l2 5 3.5-11 2.5 8 1.5-2H21"/></svg></span>
    <h3 class="font-display font-bold text-lg ${t.heading}">${n}</h3><p class="mt-1.5 text-sm ${t.muted}">${d}</p>${optBadge(s)}</a>`).join('');
  const clipCards = CLIPS.map(([src,h,d])=>`<figure class="${t.card} ${t.radius} overflow-hidden"><video class="w-full h-52 object-cover" autoplay muted loop playsinline preload="metadata" aria-hidden="true"><source src="${src}" type="video/mp4" /></video><figcaption class="p-5"><p class="font-display font-bold ${t.heading}">${h}</p><p class="text-sm ${t.muted} mt-1">${d}</p></figcaption></figure>`).join('');
  const heroPadTop = t.suffix==='' ? 'pt-0' : '';
  const book = t.suffix==='' ? t.home+'#book' : t.home+'#booking';

return `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
<meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><meta name="robots" content="noindex, nofollow" />
<title>Weight-Loss Surgery Options &amp; BMI Calculator · BMI Surgical Institute — Atlanta</title>
<meta name="description" content="Explore weight-loss surgery options with Dr. Amir Aryaie at BMI Surgical Institute in Atlanta — gastric sleeve, bypass, duodenal switch and more — and check your BMI to see if you may be a candidate." />
<script src="https://cdn.tailwindcss.com"></script>
<link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
${t.fonts}
<script>${t.tw}</script>
<style>${t.style}
a:focus-visible,button:focus-visible,input:focus-visible{outline:3px solid #1750dd;outline-offset:2px;border-radius:6px}
.skip-link{position:absolute;left:-999px;top:0;z-index:100}.skip-link:focus{left:12px;top:12px;padding:10px 16px;background:#1750dd;color:#fff;border-radius:10px}
@media (prefers-reduced-motion:reduce){video{display:none!important}html{scroll-behavior:auto}}
</style>
</head>
<body class="${t.bodyClass}">
<a href="#main" class="skip-link">Skip to main content</a>
${t.nav(t)}
<main id="main">
  <!-- HERO -->
  <section class="relative h-[78vh] min-h-[480px] overflow-hidden flex items-end bg-slate-900 ${heroPadTop}">
    <video class="absolute inset-0 w-full h-full object-cover" autoplay muted loop playsinline aria-hidden="true"><source src="media/surgery-1.mp4" type="video/mp4" /></video>
    <div aria-hidden="true" class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/65 to-black/35"></div>
    <div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 pb-14 w-full text-white">
      <nav aria-label="Breadcrumb" class="text-sm text-white/60 mb-4"><a href="${t.home}" class="hover:text-white">Home</a> · <span class="text-white/90">Surgery Options</span></nav>
      <p class="inline-flex items-center gap-2 bg-white/15 backdrop-blur rounded-full px-4 py-1.5 text-sm font-semibold mb-5"><span class="w-2 h-2 rounded-full bg-emerald-400"></span> Weight-loss &amp; minimally invasive surgery</p>
      <h1 class="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] max-w-3xl">Surgery options that change lives</h1>
      <p class="mt-5 text-lg text-white/85 max-w-2xl">Surgery is the most effective, lasting treatment for obesity and its related conditions. Dr. Aryaie offers the full range of advanced procedures — and helps you choose the right one with confidence.</p>
      <div class="mt-8 flex flex-wrap gap-3">
        <a href="#bmi" class="inline-flex items-center gap-2 ${t.bookBtn} px-7 py-3.5 ${t.pill} transition">Check your BMI ${arrow}</a>
        <a href="#options" class="inline-flex items-center gap-2 bg-white/15 backdrop-blur text-white font-semibold px-7 py-3.5 ${t.pill} transition hover:bg-white/25">Explore procedures</a>
      </div>
    </div>
  </section>

  <!-- WHY SURGERY (focus band) -->
  <section class="py-16 ${t.dark} text-white">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
      <div>
        <p class="text-cyan-300 font-semibold tracking-wide uppercase text-sm">Why surgery</p>
        <h2 class="mt-3 font-display font-extrabold text-3xl sm:text-4xl">The most effective path — when diet alone hasn't worked</h2>
        <p class="mt-5 text-white/75 leading-relaxed">For many people living with obesity, surgery achieves what years of dieting can't: significant, durable weight loss and real improvement — often resolution — of conditions like type-2 diabetes, sleep apnea, high blood pressure and acid reflux. Every plan is built around your health, your goals and your life.</p>
      </div>
      <dl class="grid grid-cols-3 gap-4 text-center">
        <div class="bg-white/10 rounded-2xl py-6"><dt class="font-display font-extrabold text-3xl">1000s</dt><dd class="text-white/60 text-xs mt-1">procedures performed</dd></div>
        <div class="bg-white/10 rounded-2xl py-6"><dt class="font-display font-extrabold text-3xl">60–70%</dt><dd class="text-white/60 text-xs mt-1">avg. excess weight lost</dd></div>
        <div class="bg-white/10 rounded-2xl py-6"><dt class="font-display font-extrabold text-3xl">1–2 wk</dt><dd class="text-white/60 text-xs mt-1">typical recovery</dd></div>
      </dl>
    </div>
  </section>

  <!-- OPTIONS GRID -->
  <section id="options" class="py-20 lg:py-24">
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <div class="max-w-2xl">
        <p class="${t.accentText} font-semibold tracking-wide uppercase text-sm">Your options</p>
        <h2 class="mt-3 font-display font-extrabold text-3xl sm:text-4xl ${t.heading}">A full range of weight-loss procedures</h2>
        <p class="mt-4 ${t.muted}">From the most popular operations to non-surgical and endoscopic options — Dr. Aryaie will help you find the right fit.</p>
      </div>
      <div class="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">${optCards}</div>
    </div>
  </section>

  <!-- CLIPS -->
  <section class="py-16 ${t.alt}">
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <div class="max-w-2xl mb-10"><p class="${t.accentText} font-semibold tracking-wide uppercase text-sm">Inside the OR</p><h2 class="mt-3 font-display font-extrabold text-3xl sm:text-4xl ${t.heading}">Precision, technology and a team you can trust</h2></div>
      <div class="grid sm:grid-cols-3 gap-5">${clipCards}</div>
    </div>
  </section>

  ${calc(t)}

  <!-- PROCESS -->
  <section class="py-20 lg:py-24">
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <h2 class="font-display font-extrabold text-3xl sm:text-4xl ${t.heading} text-center">Your path, step by step</h2>
      <div class="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        ${[['1','Consultation','Meet Dr. Aryaie, review your history and goals, and learn which options fit.'],['2','Insurance &amp; prep','We verify your benefits and guide you through any required pre-op steps.'],['3','Your surgery','A minimally invasive procedure performed by an experienced surgical team.'],['4','Lifelong support','Nutrition, follow-up and support groups to help your results last.']].map(([n,h,d])=>`<div class="${t.card} ${t.radius} p-6"><span class="w-10 h-10 rounded-full ${t.bookBtn} flex items-center justify-center font-display font-bold">${n}</span><h3 class="mt-4 font-display font-bold text-lg ${t.heading}">${h}</h3><p class="mt-1.5 text-sm ${t.muted}">${d}</p></div>`).join('')}
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="py-20 lg:py-28">
    <div class="mx-auto max-w-5xl px-4 sm:px-6">
      <div class="${t.dark} ${t.radiusLg} p-8 sm:p-12 text-center text-white">
        <h2 class="font-display font-extrabold text-3xl sm:text-5xl">Ready to explore your options?</h2>
        <p class="mt-4 text-white/70 max-w-2xl mx-auto">Book a consultation with Dr. Aryaie. We'll talk through every option, check your eligibility and verify your insurance — no pressure, just answers.</p>
        <div class="mt-8 flex flex-wrap gap-3 justify-center">
          <a href="${book}" class="inline-flex items-center gap-2 ${t.bookBtn} px-8 py-3.5 ${t.pill} transition">Request a consultation</a>
          <a href="tel:+16786260909" class="inline-flex items-center gap-2 bg-white/15 backdrop-blur text-white font-semibold px-8 py-3.5 ${t.pill} transition hover:bg-white/25">Call (678) 626-0909</a>
        </div>
      </div>
    </div>
  </section>
</main>
${t.footer(t)}
<a href="tel:+16786260909" class="sm:hidden fixed bottom-4 left-4 right-4 z-40 ${t.bookBtn} py-3.5 ${t.pill} shadow-2xl flex items-center justify-center gap-2">${callIcon}Call (678) 626-0909</a>
${t.sienna}
</body>
</html>`;
}

let made=[];
for(const key of Object.keys(THEMES)){ const t=THEMES[key]; const fn='surgery-options'+t.suffix+'.html'; fs.writeFileSync(dir+fn, render(t)); made.push(fn); }
console.log('generated:\n  '+made.join('\n  '));
