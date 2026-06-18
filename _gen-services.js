const fs = require('fs');
const dir = __dirname + '/';

// ---- Procedure content (original copy, general medical knowledge) ----
const PROCS = [
  {
    slug:'gastric-sleeve', name:'Gastric Sleeve', cat:'Weight-Loss Surgery',
    title:'Gastric Sleeve (Sleeve Gastrectomy)',
    intro:'The most popular weight-loss procedure in the U.S. — a simple, powerful, minimally invasive surgery that helps you eat less and feel full sooner.',
    img:'svc-consult.jpg',
    overview:'During a sleeve gastrectomy, Dr. Aryaie removes roughly 75–80% of the stomach, leaving a slim, banana-shaped "sleeve." This reduces how much you can eat and lowers ghrelin, the hormone that drives hunger — so you feel satisfied with smaller portions and fewer cravings. There is no rerouting of the intestines, which keeps the operation straightforward and the recovery quick.',
    forYou:['A body mass index (BMI) of 35 or higher','BMI of 30+ with an obesity-related condition such as type-2 diabetes, sleep apnea or high blood pressure','Difficulty losing weight with diet and exercise alone','Ready to commit to long-term, healthier habits'],
    how:['Performed laparoscopically through a few small incisions','Takes about 60–90 minutes under general anesthesia','The stomach is divided and stapled into a narrow sleeve','No intestinal rerouting and no implanted device'],
    recovery:'Most patients go home the same or next day and return to light activity within one to two weeks. Over the following 12–18 months, patients typically lose 60–70% of their excess weight — and many see major improvement in diabetes, blood pressure, sleep apnea and joint pain.',
    faqs:[
      ['Is the gastric sleeve reversible?','No — because part of the stomach is removed, the sleeve is permanent. That permanence is part of why it produces such durable results.'],
      ['Will I always feel hungry?','Most patients feel noticeably less hungry, because the portion of the stomach that produces the hunger hormone ghrelin is removed.'],
      ['How much weight will I lose?','On average, patients lose 60–70% of their excess weight within 12–18 months, with the best results when paired with nutrition and activity changes.'],
      ['Is it covered by insurance?','Many major insurers cover bariatric surgery when criteria are met. We verify your benefits for you before you commit.'],
    ],
  },
  {
    slug:'gastric-bypass', name:'Gastric Bypass', cat:'Weight-Loss Surgery',
    title:'Gastric Bypass (Roux-en-Y)',
    intro:'A proven, powerful procedure that combines a smaller stomach with a rerouted digestive tract — especially effective for type-2 diabetes and severe acid reflux.',
    img:'svc-care.jpg',
    overview:'Roux-en-Y gastric bypass creates a small stomach pouch and reroutes a section of the small intestine to connect to it. This combines two effects — you eat less (restriction) and absorb fewer calories (malabsorption). The bypass is one of the most effective operations for resolving type-2 diabetes and is often recommended for patients with severe GERD or a higher starting BMI.',
    forYou:['A higher BMI or significant weight to lose','Type-2 diabetes that may go into remission after surgery','Severe acid reflux (GERD) that has not responded to other options','Ready for a lifelong commitment to nutrition and supplements'],
    how:['Performed laparoscopically or robotically through small incisions','A small stomach pouch is created and connected to the small intestine','Food bypasses most of the stomach and the upper intestine','Typically takes 1.5–3 hours under general anesthesia'],
    recovery:'Most patients stay one to two nights and return to normal activity in two to three weeks. Patients commonly lose 65–75% of excess weight, and many see rapid improvement — or full remission — of type-2 diabetes, often before significant weight loss occurs.',
    faqs:[
      ['Why choose bypass over the sleeve?','Bypass is often preferred for higher BMI, poorly-controlled diabetes, or severe acid reflux. Dr. Aryaie will recommend the best fit for you at your consultation.'],
      ['Will I need vitamins for life?','Yes — because the procedure reduces absorption, lifelong vitamin and mineral supplements are important and we guide you through them.'],
      ['Does it really help diabetes?','Gastric bypass leads to type-2 diabetes remission in a large share of patients, frequently within days of surgery.'],
      ['Is it reversible?','It can technically be revised, but it is intended to be permanent for lasting results.'],
    ],
  },
  {
    slug:'linx-reflux', name:'Acid Reflux & LINX', cat:'Reflux & GERD',
    title:'Acid Reflux & GERD Treatment',
    intro:'Put an end to chronic heartburn. We offer advanced, minimally invasive options — including the LINX device — that treat the cause of reflux, not just the symptoms.',
    img:'svc-consult.jpg',
    overview:'Chronic acid reflux (GERD) happens when the valve between the esophagus and stomach weakens and lets acid travel upward. Beyond daily discomfort, untreated reflux can damage the esophagus over time. We treat the underlying problem with options such as the LINX device — a small ring of magnetic beads placed around the valve that keeps it closed yet opens to let you swallow — along with TIF, hiatal hernia repair and the non-surgical Stretta procedure.',
    forYou:['Chronic heartburn or regurgitation despite medication','Reliance on daily acid-blocking medication (PPIs)','A hiatal hernia contributing to reflux','Looking for a long-term solution instead of lifelong pills'],
    how:['LINX is placed laparoscopically in about 30–45 minutes','A flexible ring of magnets supports the weakened valve','Outpatient — most patients go home the same day','We also offer TIF (incisionless), hiatal hernia repair and Stretta'],
    recovery:'Most LINX patients eat a normal diet the same day and return to routine activity within about a week. The large majority are able to stop or dramatically reduce their reflux medication.',
    faqs:[
      ['What is the LINX device?','A small, flexible band of titanium-magnetic beads placed around the lower esophagus. It stays closed to stop reflux and opens with the pressure of swallowing.'],
      ['Will I still need my reflux medication?','Most patients are able to stop or greatly reduce acid-blocking medication after treatment.'],
      ['Is the procedure reversible?','Unlike some reflux surgeries, the LINX device can be removed if ever needed.'],
      ['Can you fix my hiatal hernia at the same time?','Yes — a hiatal hernia is commonly repaired during the same minimally invasive procedure.'],
    ],
  },
  {
    slug:'gastroparesis', name:'Gastroparesis', cat:'Esophageal & Motility',
    title:'Gastroparesis & G-POEM',
    intro:'When the stomach empties too slowly, everyday eating becomes a struggle. Dr. Aryaie offers advanced, incisionless treatment — including G-POEM — to get relief.',
    img:'svc-care.jpg',
    overview:'Gastroparesis is delayed stomach emptying, often related to diabetes or following an infection. Because food lingers in the stomach, it can cause nausea, vomiting, early fullness, bloating and unintended weight loss. After confirming the diagnosis with a gastric-emptying study and endoscopy, we tailor treatment to your needs — from diet and medication to the minimally invasive G-POEM procedure and gastric stimulators.',
    forYou:['Frequent nausea, vomiting or feeling full after just a few bites','Bloating, abdominal discomfort or unexplained weight loss','A diagnosis of (or symptoms suggesting) delayed gastric emptying','Symptoms not controlled by diet and medication alone'],
    how:['G-POEM is performed endoscopically — through the mouth, with no incisions','The tight pyloric muscle at the stomach outlet is gently released','Allows the stomach to empty more normally','Gastric stimulators are available for selected patients'],
    recovery:'G-POEM is typically an outpatient or overnight procedure with a short recovery. Studies show roughly 50–70% of patients achieve meaningful, lasting improvement in stomach emptying and symptoms.',
    faqs:[
      ['What causes gastroparesis?','The most common cause is diabetes, but it can also follow a viral infection or certain surgeries. Sometimes no cause is found.'],
      ['What is G-POEM?','G-POEM is an incisionless endoscopic procedure that relaxes the pyloric muscle so the stomach can empty more easily — done entirely through the mouth.'],
      ['How effective is treatment?','Many patients see substantial relief; G-POEM improves emptying and symptoms in an estimated 50–70% of cases.'],
      ['Do I need surgery right away?','Not necessarily — we start with the least invasive approach that fits your situation, escalating only as needed.'],
    ],
  },
  {
    slug:'hernia-repair', name:'Hernia Repair', cat:'General Surgery',
    title:'Hernia Repair',
    intro:'Expert, minimally invasive repair for inguinal, umbilical, incisional and hiatal hernias — most done as a same-day outpatient procedure.',
    img:'svc-consult.jpg',
    overview:'A hernia occurs when an organ or tissue pushes through a weak spot in the abdominal wall. Hernias do not heal on their own and tend to enlarge over time, so surgical repair is usually recommended once they cause symptoms. Dr. Aryaie repairs inguinal (groin), umbilical (belly-button), incisional and hiatal hernias using laparoscopic and robotic techniques that reinforce the area — often with mesh — through a few small incisions.',
    forYou:['A noticeable bulge in the groin or abdomen','Discomfort or pain that worsens with lifting or straining','A hernia that is growing or interfering with daily life','Wanting a faster recovery than open surgery offers'],
    how:['Performed laparoscopically or robotically through small incisions','The weakened area is reinforced, commonly with surgical mesh','Most repairs are completed as same-day outpatient surgery','Less pain and a quicker recovery than traditional open repair'],
    recovery:'Most patients return home the same day and resume light activity within one to two weeks, avoiding heavy lifting for a short period as advised. Minimally invasive repair means smaller scars and a faster return to normal life.',
    faqs:[
      ['Will my hernia heal on its own?','No — hernias do not resolve without treatment and usually grow over time, which is why timely repair is recommended.'],
      ['Is mesh always used?','Mesh reinforcement lowers the chance of recurrence and is used in most repairs, though the plan is tailored to each patient.'],
      ['How soon can I get back to work?','Many patients return to desk work within a few days and to fuller activity in one to two weeks.'],
      ['Is the surgery outpatient?','Most hernia repairs are done as same-day outpatient procedures.'],
    ],
  },
  {
    slug:'medical-weight-loss', name:'Medical Weight Loss', cat:'Non-Surgical',
    title:'Medical Weight Loss',
    intro:'A physician-supervised, non-surgical path to lasting weight loss — personalized nutrition, behavior coaching and medication where appropriate.',
    img:'svc-care.jpg',
    overview:'Not everyone needs or is ready for surgery. Our medical weight-loss program is a structured, doctor-led plan built around your health, your goals and your life. It combines personalized nutrition, behavior and activity coaching, and — when appropriate — modern weight-loss medications. It is a great fit for patients with a lower BMI, those who prefer a non-surgical route, and patients preparing for (or building on) a surgical procedure.',
    forYou:['A BMI roughly between 27 and 35','Preferring a non-surgical approach to weight loss','Wanting medical support beyond diet apps and willpower','Preparing for surgery or maintaining results afterward'],
    how:['A full medical and nutrition assessment with our team','A personalized plan: nutrition, activity and behavior coaching','Modern weight-loss medication when clinically appropriate','Regular check-ins to adjust the plan and keep you on track'],
    recovery:'There is no recovery period — this is an ongoing, supportive program. Most patients begin to see steady, sustainable progress within the first weeks, with our team beside them every step of the way.',
    faqs:[
      ['Do I have to take medication?','No — medication is one optional tool. Your plan is built around what is safe and effective for you, and may be entirely lifestyle-based.'],
      ['Can this replace surgery?','For many patients, yes. For others it is a first step or a complement to a procedure. We help you find the right path.'],
      ['How is this different from a diet?','It is physician-supervised and personalized, addressing the medical, hormonal and behavioral drivers of weight — not just calories.'],
      ['Will it work long-term?','With ongoing support and the right plan, patients achieve and maintain meaningful results. Consistency and follow-up are key.'],
    ],
  },
];

const li = a => a.map(x=>`<li class="flex items-start gap-3 text-ink/70"><span aria-hidden="true" class="mt-1 w-5 h-5 rounded-full bg-brand-600/10 text-brand-700 flex items-center justify-center shrink-0"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg></span><span>${x}</span></li>`).join('\n              ');
const faqHtml = f => f.map(([q,a])=>`<details class="group glass rounded-2xl px-5 py-4"><summary class="flex items-center justify-between cursor-pointer font-display font-bold text-ink list-none">${q}<svg class="w-5 h-5 text-brand-600 transition group-open:rotate-180" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg></summary><p class="mt-3 text-ink/65 leading-relaxed">${a}</p></details>`).join('\n          ');
const others = (slug) => PROCS.filter(p=>p.slug!==slug).map(p=>`<a href="${p.slug}.html" class="glass rounded-xl px-4 py-3 text-sm font-semibold text-ink hover:text-brand-700 transition">${p.name} →</a>`).join('\n          ');

function page(p){
return `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex, nofollow" />
  <title>${p.title} in Atlanta · BMI Surgical Institute — Dr. Amir Aryaie</title>
  <meta name="description" content="${p.title} at BMI Surgical Institute in Atlanta, GA. ${p.intro}" />
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500;600&family=Fraunces:ital,opsz,wght@1,9..144,500&display=swap" rel="stylesheet" />
  <script>
    tailwind.config = { theme: { extend: {
      fontFamily: { display:['Sora','sans-serif'], sans:['Inter','sans-serif'], serif:['Fraunces','serif'] },
      colors: { ink:'#0b1b34', brand:{50:'#eef6ff',100:'#d9ebff',200:'#bcdcff',300:'#8ec6ff',400:'#59a6ff',500:'#3385fb',600:'#1e66f0',700:'#1750dd',800:'#1942b3',900:'#1a3c8d',950:'#142657'} },
    } } };
  </script>
  <style>
    body{font-family:'Inter',sans-serif;color:#0b1b34;background:#f4f8ff}
    h1,h2,h3,h4,.font-display{font-family:'Sora',sans-serif}
    .font-serif-italic{font-family:'Fraunces',serif;font-style:italic;font-weight:500}
    .glass{background:rgba(255,255,255,.62);-webkit-backdrop-filter:blur(20px) saturate(150%);backdrop-filter:blur(20px) saturate(150%);border:1px solid rgba(255,255,255,.65);box-shadow:0 20px 50px -22px rgba(20,38,87,.45)}
    .glass-soft{background:rgba(255,255,255,.5);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.6)}
    .grad-text{background:linear-gradient(100deg,#1e66f0,#3385fb 40%,#22d3ee);-webkit-background-clip:text;background-clip:text;color:transparent}
    .skip-link{position:absolute;left:-999px;top:0;z-index:100}.skip-link:focus{left:12px;top:12px;padding:10px 16px;background:#1e66f0;color:#fff;border-radius:10px}
    a:focus-visible,button:focus-visible,summary:focus-visible{outline:3px solid #1750dd;outline-offset:2px;border-radius:6px}
    details summary::-webkit-details-marker{display:none}
    @media (prefers-reduced-motion: reduce){ #hero-video{display:none!important} html{scroll-behavior:auto} }
  </style>
</head>
<body class="antialiased">
  <a href="#main" class="skip-link">Skip to main content</a>

  <!-- NAV -->
  <header class="fixed top-0 inset-x-0 z-50">
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <nav aria-label="Primary" class="mt-3 glass rounded-2xl px-4 sm:px-5 h-16 flex items-center justify-between">
        <a href="premium.html" class="flex items-center gap-2.5" aria-label="BMI Surgical Institute home">
          <span aria-hidden="true" class="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-brand-600/30"><svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M10 3h4a1 1 0 011 1v5h5a1 1 0 011 1v4a1 1 0 01-1 1h-5v5a1 1 0 01-1 1h-4a1 1 0 01-1-1v-5H4a1 1 0 01-1-1v-4a1 1 0 011-1h5V4a1 1 0 011-1z"/></svg></span>
          <span class="leading-tight"><span class="block font-display font-extrabold text-ink text-[15px]">Dr. Amir Aryaie, MD, FACS</span><span class="block text-[11px] text-brand-700/70">BMI Surgical Institute · Atlanta, GA</span></span>
        </a>
        <div class="hidden lg:flex items-center gap-7 text-sm font-medium text-ink/75">
          <a href="premium.html#services" class="hover:text-brand-700 transition">Procedures</a>
          <a href="premium.html#doctor" class="hover:text-brand-700 transition">Meet Dr. Aryaie</a>
          <a href="premium.html#reviews" class="hover:text-brand-700 transition">Reviews</a>
          <a href="premium.html#contact" class="hover:text-brand-700 transition">Contact</a>
        </div>
        <div class="flex items-center gap-2">
          <a href="tel:+16786260909" class="hidden sm:inline-flex items-center gap-2 text-brand-700 font-semibold text-sm px-3 py-2 rounded-xl hover:bg-brand-50 transition"><svg class="w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.95.68l1.5 4.5a1 1 0 01-.5 1.2l-2.26 1.13a11 11 0 005.5 5.5l1.13-2.26a1 1 0 011.2-.5l4.5 1.5a1 1 0 01.68.95V19a2 2 0 01-2 2h-1C9.7 21 3 14.3 3 6V5z"/></svg>(678) 626-0909</a>
          <a href="#book" class="inline-flex bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-brand-600/30 transition">Book now</a>
        </div>
      </nav>
    </div>
  </header>

  <main id="main">
    <!-- HERO with looping video -->
    <section class="relative h-[78vh] min-h-[480px] overflow-hidden flex items-end bg-ink">
      <video id="hero-video" class="absolute inset-0 w-full h-full object-cover" autoplay muted loop playsinline aria-hidden="true"><source src="media/or.mp4" type="video/mp4" /></video>
      <div aria-hidden="true" class="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/40"></div>
      <div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 pb-14 w-full text-white">
        <nav aria-label="Breadcrumb" class="text-sm text-white/60 mb-4"><a href="premium.html" class="hover:text-white">Home</a> · <a href="premium.html#services" class="hover:text-white">Procedures</a> · <span class="text-white/90">${p.name}</span></nav>
        <p class="inline-flex items-center gap-2 glass-soft text-white rounded-full px-4 py-1.5 text-sm font-semibold mb-5"><span class="w-2 h-2 rounded-full bg-emerald-400"></span> ${p.cat}</p>
        <h1 class="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] max-w-3xl">${p.title}</h1>
        <p class="mt-5 text-lg text-white/80 max-w-2xl">${p.intro}</p>
        <div class="mt-8 flex flex-wrap gap-3">
          <a href="#book" class="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-7 py-3.5 rounded-2xl shadow-xl shadow-brand-600/30 transition">Book a consultation <svg class="w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg></a>
          <a href="tel:+16786260909" class="inline-flex items-center gap-2 glass text-white font-semibold px-7 py-3.5 rounded-2xl transition">(678) 626-0909</a>
        </div>
      </div>
    </section>

    <!-- OVERVIEW -->
    <section class="py-18 lg:py-24 pt-16">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p class="text-brand-600 font-semibold tracking-widest uppercase text-sm">What it is</p>
          <h2 class="mt-3 font-display font-extrabold text-3xl sm:text-4xl text-ink">${p.name} explained</h2>
          <p class="mt-5 text-ink/70 text-lg leading-relaxed">${p.overview}</p>
        </div>
        <div class="glass rounded-[2rem] p-3"><img src="images/${p.img}" alt="Consultation at BMI Surgical Institute" class="w-full h-[360px] object-cover rounded-[1.5rem]" /></div>
      </div>
    </section>

    <!-- WHO + HOW -->
    <section class="py-16 bg-ink relative overflow-hidden">
      <div aria-hidden="true" class="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand-600/30 blur-3xl"></div>
      <div class="relative mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-2 gap-12">
        <div class="glass-soft rounded-3xl p-8">
          <h3 class="font-display font-extrabold text-2xl text-white">Is it right for you?</h3>
          <ul class="mt-5 space-y-3">${p.forYou.map(x=>`<li class="flex items-start gap-3 text-white/85"><span aria-hidden="true" class="mt-1 text-cyan-300">✓</span><span>${x}</span></li>`).join('')}</ul>
          <p class="mt-6 text-white/55 text-sm">Only a consultation can confirm the right fit — Dr. Aryaie will review your history and goals with you.</p>
        </div>
        <div class="glass rounded-3xl p-8">
          <h3 class="font-display font-extrabold text-2xl text-ink">How it works</h3>
          <ul class="mt-5 space-y-3">${li(p.how)}</ul>
        </div>
      </div>
    </section>

    <!-- RECOVERY -->
    <section class="py-18 lg:py-24">
      <div class="mx-auto max-w-4xl px-4 sm:px-6 text-center">
        <p class="text-brand-600 font-semibold tracking-widest uppercase text-sm">Recovery &amp; results</p>
        <h2 class="mt-3 font-display font-extrabold text-3xl sm:text-4xl text-ink">What to expect</h2>
        <p class="mt-5 text-ink/70 text-lg leading-relaxed">${p.recovery}</p>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-16 bg-gradient-to-b from-brand-50/60 to-transparent">
      <div class="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 class="font-display font-extrabold text-3xl sm:text-4xl text-ink text-center mb-8">Frequently asked questions</h2>
        <div class="space-y-3">
          ${faqHtml(p.faqs)}
        </div>
      </div>
    </section>

    <!-- OTHER PROCEDURES -->
    <section class="pb-16">
      <div class="mx-auto max-w-7xl px-4 sm:px-6">
        <h3 class="font-display font-bold text-xl text-ink mb-4">Explore other procedures</h3>
        <div class="flex flex-wrap gap-3">
          ${others(p.slug)}
        </div>
      </div>
    </section>

    <!-- BOOK CTA -->
    <section id="book" class="py-20 lg:py-28">
      <div class="mx-auto max-w-5xl px-4 sm:px-6">
        <div class="glass rounded-[2rem] p-8 sm:p-12 text-center">
          <p class="text-brand-600 font-semibold tracking-widest uppercase text-sm">Take the next step</p>
          <h2 class="mt-3 font-display font-extrabold text-3xl sm:text-5xl text-ink">Ready to talk about ${p.name.toLowerCase()}?</h2>
          <p class="mt-4 text-ink/60 max-w-2xl mx-auto">Schedule a consultation with Dr. Aryaie to find out whether ${p.name.toLowerCase()} is right for you. We'll review your history, answer every question, and verify your insurance.</p>
          <div class="mt-8 flex flex-wrap gap-3 justify-center">
            <a href="premium.html#book" class="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-8 py-3.5 rounded-2xl shadow-lg shadow-brand-600/30 transition">Request a consultation</a>
            <a href="tel:+16786260909" class="inline-flex items-center gap-2 glass text-ink font-semibold px-8 py-3.5 rounded-2xl transition">Call (678) 626-0909</a>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- FOOTER -->
  <footer class="bg-ink text-white/70">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 py-14 grid md:grid-cols-3 gap-10">
      <div>
        <div class="flex items-center gap-2.5 mb-4"><span aria-hidden="true" class="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 to-cyan-400 flex items-center justify-center text-white"><svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M10 3h4a1 1 0 011 1v5h5a1 1 0 011 1v4a1 1 0 01-1 1h-5v5a1 1 0 01-1 1h-4a1 1 0 01-1-1v-5H4a1 1 0 01-1-1v-4a1 1 0 011-1h5V4a1 1 0 011-1z"/></svg></span><span class="font-display font-extrabold text-white text-lg">BMI Surgical Institute</span></div>
        <p class="text-sm text-white/50 max-w-xs">Advanced bariatric, reflux and minimally invasive surgery for Atlanta — comprehensive care under one roof.</p>
      </div>
      <nav aria-label="Footer"><p class="font-semibold text-white mb-3">Explore</p><ul class="space-y-2 text-sm"><li><a href="premium.html#services" class="hover:text-white transition">Procedures</a></li><li><a href="premium.html#doctor" class="hover:text-white transition">Meet Dr. Aryaie</a></li><li><a href="premium.html#reviews" class="hover:text-white transition">Reviews</a></li><li><a href="#book" class="hover:text-white transition">Book a consultation</a></li></ul></nav>
      <div><p class="font-semibold text-white mb-3">Get in touch</p><ul class="space-y-2 text-sm"><li>2303 Cumberland Parkway SE, Ste 2</li><li>Atlanta, GA 30339</li><li><a href="tel:+16786260909" class="hover:text-white transition">(678) 626-0909</a></li><li><a href="mailto:scheduling@bmisurgical.com" class="hover:text-white transition">scheduling@bmisurgical.com</a></li><li>Mon–Fri · 8 AM – 5 PM · Sat 8–1</li></ul></div>
    </div>
    <div class="border-t border-white/10"><div class="mx-auto max-w-7xl px-4 sm:px-6 py-5 text-xs text-white/40 flex flex-col sm:flex-row justify-between gap-2"><p>© 2026 BMI Surgical Institute · Dr. Amir Aryaie, MD, FACS</p><p>Procedure information is educational and not a substitute for medical advice.</p></div></div>
  </footer>

  <a href="tel:+16786260909" class="sm:hidden fixed bottom-4 left-4 right-4 z-40 bg-brand-600 text-white font-semibold py-3.5 rounded-2xl shadow-2xl flex items-center justify-center gap-2"><svg class="w-5 h-5" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.95.68l1.5 4.5a1 1 0 01-.5 1.2l-2.26 1.13a11 11 0 005.5 5.5l1.13-2.26a1 1 0 011.2-.5l4.5 1.5a1 1 0 01.68.95V19a2 2 0 01-2 2h-1C9.7 21 3 14.3 3 6V5z"/></svg>Call (678) 626-0909</a>

  <!-- Accessibility widget (Sienna) -->
  <script src="https://cdn.jsdelivr.net/npm/sienna-accessibility/dist/sienna-accessibility.umd.js" data-asw-position="bottom-left" async></script>
</body>
</html>`;
}

module.exports = { PROCS };

if (require.main === module) {
  let made=[];
  for(const p of PROCS){ fs.writeFileSync(dir+p.slug+'.html', page(p)); made.push(p.slug+'.html'); }
  console.log('generated premium service pages:\n  '+made.join('\n  '));
}
