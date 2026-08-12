/* ==========================================================================
   EvoGames — Learn page data: era list + quiz questions
   ========================================================================== */

const ERAS = [
  { id: 'era1', num: '1', icon: 'anchor' },
  { id: 'era2', num: '2', icon: 'sprout' },
  { id: 'era3', num: '3', icon: 'mountain' },
  { id: 'era4', num: '4', icon: 'giraffe' },
  { id: 'era5', num: '5', icon: 'compass' },
  { id: 'era6', num: '6', icon: 'finch' },
  { id: 'era7', num: '7', icon: 'pea' },
  { id: 'era8', num: '8', icon: 'flask' },
  { id: 'era9', num: '9', icon: 'dna' },
];

const ERA_ICONS = {
  anchor: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="2"/><path d="M12 7v13M5 12H2a10 10 0 0 0 20 0h-3M5 12a7 7 0 0 0 14 0"/></svg>',
  sprout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 20h10M12 20v-8"/><path d="M12 12C7 12 5 8 5 4c4 0 7 2 7 6Z"/><path d="M12 12c3.5 0 6-2 6-5-3 0-5.5 1.5-6 4Z"/></svg>',
  mountain: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3Z"/></svg>',
  giraffe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="17" cy="5" r="2"/><path d="M17 7v6c0 4-3 4-3 8M14 13c0 4-3 3-3 8"/></svg>',
  compass: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m16 8-2 6-6 2 2-6 6-2Z"/></svg>',
  finch: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15c2-5 6-8 11-8 3 0 5 2 5 2l-3 1 3 2s-3 3-7 3c-1.5 3-4 4-9 3l3-3c-2 0-3-1-3-1Z"/></svg>',
  pea: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12c0-4 3-8 8-8s8 4 8 8-3 8-8 8-8-4-8-8Z"/><circle cx="9" cy="10" r="1.4" fill="currentColor" stroke="none"/><circle cx="13" cy="8" r="1.4" fill="currentColor" stroke="none"/><circle cx="15" cy="13" r="1.4" fill="currentColor" stroke="none"/><circle cx="10" cy="15" r="1.4" fill="currentColor" stroke="none"/></svg>',
  flask: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 2v6L4 19a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-5-11V2M9 2h6M8 15h8"/></svg>',
  dna: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3c0 6 12 12 12 18M18 3c0 6-12 12-12 18M7 8h10M7 16h10"/></svg>',
};

/* Quiz questions keyed by language. Each has: q, options[4], correctIdx */
const QUIZ_QUESTIONS = {
  fa: [
    { q: 'کدام دیدگاه باستانی معتقد بود گونه‌ها از آغاز آفرینش تغییرناپذیرند؟', options: ['کاتاستروفیسم', 'ثبات گونه‌ها (Scala Naturae)', 'یکنواخت‌گرایی', 'سنتز نوین'], correct: 1 },
    { q: 'چه کسی اثبات کرد برخی گونه‌ها (مانند ماموت) کاملاً منقرض شده‌اند؟', options: ['چارلز لایل', 'ژان-باتیست لامارک', 'ژرژ کوویه', 'گریگور مندل'], correct: 2 },
    { q: 'نظریهٔ «کاتاستروفیسم» چه می‌گفت؟', options: ['زمین با فرآیندهای کند شکل گرفته', 'تاریخ زمین با فاجعه‌های ناگهانی شکل گرفته', 'گونه‌ها هرگز تغییر نمی‌کنند', 'صفات اکتسابی به ارث می‌رسند'], correct: 1 },
    { q: 'مکانیزم پیشنهادی لامارک برای تکامل چه بود؟', options: ['انتخاب طبیعی', 'جهش تصادفی ژنتیکی', 'وراثت صفات اکتسابی', 'رانش ژنتیکی'], correct: 2 },
    { q: 'داروین در کدام سفر دریایی مشاهدات کلیدی خود دربارهٔ فِنچ‌های گالاپاگوس را ثبت کرد؟', options: ['سفر با کشتی بیگل', 'سفر با کشتی اندور', 'سفر با کشتی ویکتوریا', 'سفر با کشتی دیسکاوری'], correct: 0 },
    { q: 'چه کسی نامه‌ای برای داروین فرستاد که او را وادار به انتشار نظریه‌اش کرد؟', options: ['چارلز لایل', 'آلفرد راسل والاس', 'توماس هاکسلی', 'جیمز هاتن'], correct: 1 },
    { q: 'کشف اصلی گریگور مندل چه بود؟', options: ['ساختار DNA', 'وراثت صفات به‌صورت واحدهای مجزا (ژن)', 'انتخاب طبیعی', 'رانش ژنتیکی'], correct: 1 },
    { q: '«سنتز نوین تکامل» (Modern Synthesis) چه چیزهایی را ترکیب کرد؟', options: ['شیمی و فیزیک', 'ژنتیک مندلی و انتخاب طبیعی داروین', 'دیرینه‌شناسی و نجوم', 'کاتاستروفیسم و لامارکیسم'], correct: 1 },
    { q: 'ساختار دورشتهٔ DNA در چه سالی و توسط چه کسانی کشف شد؟', options: ['۱۹۰۰ توسط مندل', '۱۸۵۹ توسط داروین', '۱۹۵۳ توسط واتسون و کریک', '۱۹۸۸ توسط لنسکی'], correct: 2 },
  ],
  en: [
    { q: 'Which ancient view held that species have been unchanging since creation?', options: ['Catastrophism', 'Fixity of Species (Scala Naturae)', 'Uniformitarianism', 'Modern Synthesis'], correct: 1 },
    { q: 'Who proved that some species (like mammoths) had gone fully extinct?', options: ['Charles Lyell', 'Jean-Baptiste Lamarck', 'Georges Cuvier', 'Gregor Mendel'], correct: 2 },
    { q: 'What did the theory of "catastrophism" propose?', options: ['Earth was shaped by slow processes', "Earth's history was shaped by sudden catastrophes", 'Species never change', 'Acquired traits are inherited'], correct: 1 },
    { q: "What mechanism did Lamarck propose for evolution?", options: ['Natural selection', 'Random genetic mutation', 'Inheritance of acquired characteristics', 'Genetic drift'], correct: 2 },
    { q: 'On which voyage did Darwin record his key observations of Galápagos finches?', options: ['The voyage of the Beagle', 'The voyage of the Endeavour', 'The voyage of the Victoria', 'The voyage of the Discovery'], correct: 0 },
    { q: 'Who sent Darwin a letter that pushed him to finally publish his theory?', options: ['Charles Lyell', 'Alfred Russel Wallace', 'Thomas Huxley', 'James Hutton'], correct: 1 },
    { q: "What was Gregor Mendel's key discovery?", options: ['The structure of DNA', 'Inheritance occurs via discrete units (genes)', 'Natural selection', 'Genetic drift'], correct: 1 },
    { q: 'What did the "Modern Synthesis" combine?', options: ['Chemistry and physics', "Mendelian genetics and Darwin's natural selection", 'Paleontology and astronomy', 'Catastrophism and Lamarckism'], correct: 1 },
    { q: 'When and by whom was the double-helix structure of DNA discovered?', options: ['1900 by Mendel', '1859 by Darwin', '1953 by Watson and Crick', '1988 by Lenski'], correct: 2 },
  ]
};
