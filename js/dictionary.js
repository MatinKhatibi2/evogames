/* ==========================================================================
   EvoGames — Bilingual Dictionary (fa / en)
   ========================================================================== */
window.EVO_DICT = {
fa: {
  meta: { title: "EvoGames — بازی‌های تکامل" },
  nav: {
    home: "خانه",
    games: "بازی‌ها",
    learn: "تاریخچهٔ تکامل",
    about: "دربارهٔ پروژه",
    play: "شروع بازی"
  },
  hero: {
    eyebrow: "آزمایشگاه شبیه‌سازی تکامل",
    title: "میلیون‌ها سال تکامل، در قالب بازی",
    subtitle: "EvoGames مجموعه‌ای از بازی‌های علمی دربارهٔ تکامل است؛ هرکدام یک مکانیزم واقعی از دنیای زیست‌شناسی تکاملی، از انتخاب طبیعی تا گونه‌زایی، را به تجربه‌ای قابل‌بازی تبدیل می‌کند.",
    cta_primary: "ورود به بازی‌ها",
    cta_secondary: "یادگیری تاریخچهٔ تکامل",
    stat1_num: "۱", stat1_label: "بازی فعال",
    stat2_num: "∞", stat2_label: "نسل قابل‌شبیه‌سازی",
    stat3_num: "۴", stat3_label: "دورهٔ تاریخی آموزشی"
  },
  section_games: {
    eyebrow: "کتابخانهٔ بازی‌ها",
    title: "یک آزمایشگاه، بازی‌های مختلف",
    subtitle: "هر بازی یک مکانیزم واقعی از زیست‌شناسی تکاملی را به یک تجربهٔ قابل‌بازی تبدیل می‌کند.",
    game1_tag: "فعال",
    game1_title: "استخر ژن",
    game1_desc: "جمعیتی زنده از موجودات بساز، فشار محیطی طراحی کن و نسل به نسل انتخاب طبیعی را در زمان واقعی هدایت کن.",
    game1_cta: "ورود به بازی",
    soon_tag: "به‌زودی",
    game2_title: "جزیرهٔ گونه‌ها",
    game2_desc: "گونه‌زایی و انزوای جغرافیایی را روی نقشهٔ یک مجمع‌الجزایر شبیه‌سازی کن.",
    game3_title: "کارت‌های تکامل",
    game3_desc: "نبرد کارتی مبتنی بر صفات واقعی بوم‌شناختی؛ گونه‌ات را در برابر رقبا تکامل بده.",
    game4_title: "عمق زمان",
    game4_desc: "روگ‌لایک نسل‌به‌نسل؛ هر مرگ یک جهش تازه برای نسل بعد است.",
    locked: "قفل — به‌زودی"
  },
  section_learn_teaser: {
    eyebrow: "پیش از بازی",
    title: "داستان ایده‌ای که سه قرن طول کشید",
    subtitle: "پیش از داروین، متفکران بسیاری تلاش کردند بفهمند چرا گونه‌ها این‌گونه‌اند. مسیر پر پیچ‌وخمی از ثبات ازلی گونه‌ها تا ژنتیک مدرن طی شد.",
    cta: "مشاهدهٔ گاه‌شمار تعاملی"
  },
  footer: {
    tagline: "بازی‌سازی علمی برای درک شهودی تکامل.",
    rights: "تمام حقوق محفوظ است.",
    made: "ساخته‌شده با کنجکاوی دربارهٔ حیات."
  },

  /* ---------------- GAME PAGE (Gene Pool) ---------------- */
  game: {
    title: "استخر ژن",
    subtitle: "شبیه‌ساز انتخاب طبیعی زنده",
    back: "بازگشت به EvoGames",
    tutorial_btn: "آموزش",
    stats_btn: "آمار",
    codex_btn: "دانشنامهٔ ژن",

    hud_generation: "نسل",
    hud_population: "جمعیت",
    hud_avg_fitness: "میانگین برازش",
    hud_food: "غذا",
    hud_season: "فصل",
    hud_speed: "سرعت شبیه‌سازی",

    controls_title: "کنترل محیط",
    predator_label: "فشار شکارچی",
    predator_desc: "شکارچی وارد اکوسیستم می‌کند که موجودات کند و بزرگ را شکار می‌کند.",
    temp_label: "دما",
    temp_desc: "دما را کاهش بده تا محیط سرد شود؛ فقط موجودات با عایق حرارتی بالا زنده می‌مانند. دمای بالا برای موجودات با عایق زیاد هم کمی هزینه دارد (گرمازدگی).",
    food_label: "فراوانی غذا",
    food_desc: "کمبود غذا رقابت درون‌گونه‌ای را تشدید می‌کند.",
    toxin_label: "سم محیطی",
    toxin_desc: "موجودات بدون مقاومت به سم، شانس بقای کمتری دارند.",

    action_add_predator: "رهاسازی شکارچی",
    action_ice_age: "آغاز عصر یخبندان",
    action_heat_wave: "موج گرما",
    action_famine: "قحطی",
    action_bloom: "شکوفایی غذا",
    action_meteor: "برخورد شهابی (رویداد انقراض)",
    action_reset: "بازنشانی جمعیت",
    action_pause: "توقف",
    action_play: "پخش",

    panel_traits: "صفات جمعیت",
    trait_speed: "سرعت",
    trait_size: "اندازه",
    trait_camo: "کموفلاژ",
    trait_insulation: "عایق حرارتی",
    trait_toxin_res: "مقاومت به سم",
    trait_fertility: "باروری",

    panel_missions: "مأموریت‌ها",
    panel_missions_desc: "با هدایت تکامل به سمت اهداف مشخص، امتیاز و مدال کسب کن.",

    creature_selected: "موجود انتخاب‌شده",
    no_selection: "برای مشاهدهٔ جزئیات ژنتیکی، روی یک موجود کلیک کن.",
    fitness_score: "امتیاز برازش",
    generation_born: "نسل تولد",

    event_log_title: "رویدادنامه",
    empty_log: "هنوز رویدادی ثبت نشده. شبیه‌سازی را آغاز کن.",

    level_complete: "مأموریت کامل شد!",
    level_failed: "جمعیت منقرض شد",
    new_badge: "نشان جدید کسب شد",
    continue_btn: "ادامه",
    retry_btn: "تلاش دوباره",
    next_mission_btn: "مأموریت بعدی",

    onboard_title: "به استخر ژن خوش آمدید",
    onboard_p1: "شما نقش «فشار محیطی» را بازی می‌کنید، نه خالق موجودات. موجودات تصادفی متولد می‌شوند، صفات متفاوتی دارند و تولیدمثل می‌کنند. کار شما این است که محیط را طوری تغییر دهید که فقط سازگارترین‌ها زنده بمانند — دقیقاً همان‌طور که در طبیعت رخ می‌دهد.",
    onboard_p2: "هر موجود شش صفت ژنتیکی دارد. صفاتی که به بقا کمک کنند در نسل بعد بیشتر می‌شوند؛ صفاتی که کمک نکنند، کم‌کم از جمعیت محو می‌شوند. این «انتخاب طبیعی» است، نه انتخاب هوشمندانه.",
    onboard_p3: "جهش‌های تصادفی گاهی صفات کاملاً تازه می‌سازند. اغلب جهش‌ها خنثی یا مضرند، اما گاهی یک جهش خوش‌شانس، بقای یک خط نسلی را دگرگون می‌کند.",
    onboard_start: "بزن برویم",

    codex_title: "دانشنامهٔ ژن",
    codex_intro: "هر صفت یک مزیت و یک هزینه دارد. تعادل، کلید بقاست.",

    mission_1_title: "بقای سردسیر",
    mission_1_desc: "میانگین «عایق حرارتی» جمعیت را در ۱۵ نسل به بالای ۷۰٪ برسان.",
    mission_2_title: "استادِ کموفلاژ",
    mission_2_desc: "با وجود شکارچی فعال، جمعیت را به بالای ۴۰ موجود با کموفلاژ میانگین ۶۰٪ برسان.",
    mission_3_title: "بقا در قحطی",
    mission_3_desc: "جمعیت را در شرایط کمبود شدید غذا برای ۲۰ نسل بالای ۱۰ موجود نگه دار.",
    mission_4_title: "شکارچی مقاوم به سم",
    mission_4_desc: "هم‌زمان مقاومت به سم و سرعت را در جمعیت بالا ببر.",
    mission_5_title: "بازماندهٔ انقراض",
    mission_5_desc: "جمعیت را از یک رویداد شهابی نجات بده — حداقل ۵ موجود باید زنده بمانند.",

    sim_speed_1: "۱×", sim_speed_2: "۲×", sim_speed_4: "۴×",

    xp_gained: "امتیاز تجربه",
    level_up: "ارتقای سطح!",
    your_level: "سطح شما"
  },

  /* ---------------- LEARN / HISTORY PAGE ---------------- */
  learn: {
    hero_eyebrow: "خط زمانی تعاملی",
    hero_title: "سه قرن تلاش برای فهمیدن اینکه چرا موجودات این‌گونه‌اند",
    hero_subtitle: "پیش از اینکه داروین «خاستگاه گونه‌ها» را منتشر کند، نسل‌ها متفکر تلاش کرده بودند پازلی را حل کنند: چرا فسیل‌ها با جانداران امروزی فرق دارند؟ چرا گونه‌ها گاهی ناپدید می‌شوند؟ آیا زندگی تغییر می‌کند یا ثابت است؟",
    progress_label: "پیشرفت یادگیری",
    quiz_cta: "آزمون این دوره",
    back_to_hub: "بازگشت به EvoGames",

    era1_tag: "پیش از ۱۸۰۰",
    era1_title: "نظریهٔ ثبات گونه‌ها",
    era1_period: "دوران باستان تا اواخر قرن هجدهم",
    era1_body: "برای هزاران سال، دیدگاه غالب این بود که هر گونه از آغاز آفرینش، ثابت و بدون تغییر باقی مانده است. ارسطو مفهوم «مقیاس بزرگ هستی» (Scala Naturae) را مطرح کرد: سلسله‌مراتبی ثابت از موجودات، از ساده‌ترین تا کامل‌ترین، که هرگز تغییر نمی‌کند. این دیدگاه قرن‌ها بر زیست‌شناسی و الهیات غرب حاکم بود و کشف فسیل‌های عجیب را با نظریه‌هایی مانند «گونه‌های ثابت اما گوناگون از ابتدا» توضیح می‌داد.",
    era1_fact_label: "نکتهٔ کلیدی",
    era1_fact: "کارل لینه، پدر رده‌بندی نوین، در ابتدا معتقد بود گونه‌ها کاملاً ثابت‌اند؛ اما در اواخر عمر، با مشاهدهٔ دورگه‌های گیاهی، کمی در این باور تردید کرد.",

    era2_tag: "قرن ۱۸",
    era2_title: "زمزمه‌های نخستین تغییرگرایی",
    era2_period: "۱۷۴۴ تا ۱۸۰۰ میلادی",
    era2_body: "با گسترش علم زمین‌شناسی و کشف فسیل‌های جانورانی که دیگر وجود نداشتند، برخی متفکران به ثبات گونه‌ها شک کردند. ژرژ-لویی بوفون در «تاریخ طبیعی» مطرح کرد که گونه‌ها ممکن است در طول زمان تغییر شکل دهند، هرچند از ترس مخالفت کلیسا این ایده را کامل بسط نداد. اراسموس داروین (پدربزرگ چارلز داروین) در شعر و نوشته‌هایش به امکان تبدیل گونه‌ها اشاره کرد.",
    era2_fact_label: "نکتهٔ کلیدی",
    era2_fact: "ژرژ کوویه، بنیان‌گذار آناتومی مقایسه‌ای، ثابت کرد که برخی گونه‌ها (مانند ماموت) کاملاً منقرض شده‌اند — کشفی که به‌شدت باور «ثبات کامل حیات» را متزلزل کرد.",

    era3_tag: "۱۷۹۶ تا ۱۸۳۰",
    era3_title: "کاتاستروفیسم در برابر یکنواخت‌گرایی",
    era3_period: "اوایل قرن نوزدهم",
    era3_body: "ژرژ کوویه نظریهٔ «کاتاستروفیسم» را مطرح کرد: تاریخ زمین با فاجعه‌های بزرگ و ناگهانی (مانند سیل‌های عظیم) شکل گرفته که گونه‌های زیادی را نابود کرده و گونه‌های جدید پس از آن ظاهر شده‌اند. در مقابل، جیمز هاتن و بعدها چارلز لایل نظریهٔ «یکنواخت‌گرایی» را پیش کشیدند: زمین با فرآیندهای کند و پیوسته (فرسایش، رسوب‌گذاری) در طول میلیون‌ها سال شکل گرفته، نه فاجعه‌های ناگهانی. کتاب «اصول زمین‌شناسی» لایل بعدها الهام‌بخش اصلی داروین در سفر بیگل شد.",
    era3_fact_label: "نکتهٔ کلیدی",
    era3_fact: "داروین در سفر پنج‌سالهٔ خود با کشتی بیگل، جلد اول «اصول زمین‌شناسی» لایل را همراه داشت و از ایدهٔ «تغییر تدریجی در بازهٔ زمانی عظیم» برای فهم تکامل زیستی الهام گرفت.",

    era4_tag: "۱۸۰۹",
    era4_title: "لامارک: نخستین نظریهٔ منسجم تکامل",
    era4_period: "فلسفهٔ جانورشناسی، ۱۸۰۹",
    era4_body: "ژان-باتیست لامارک نخستین نظریهٔ کامل و منسجم دربارهٔ تغییر گونه‌ها در طول زمان را ارائه داد. به باور او، موجودات صفاتی را که در طول زندگی به‌کار می‌برند تقویت می‌کنند و این صفات اکتسابی را به فرزندان خود منتقل می‌کنند (نظریهٔ «وراثت صفات اکتسابی»). مثال معروف او زرافه بود: گردن زرافه در طول زندگی کشیده می‌شود تا به برگ‌های بلند برسد، و این کشیدگی به نسل بعد منتقل می‌شود. اگرچه مکانیزم لامارک نادرست بود، او نخستین کسی بود که «تکامل تدریجی گونه‌ها» را به‌صورت یک نظریهٔ علمی رسمی مطرح کرد.",
    era4_fact_label: "چرا اشتباه بود؟",
    era4_fact: "وایزمن با تجربهٔ قطع دم موش در چند نسل پیاپی نشان داد فرزندان همچنان با دم متولد می‌شوند — صفات اکتسابی به ژن‌ها منتقل نمی‌شوند. اما ایدهٔ لامارک مبنی بر «گونه‌ها تغییر می‌کنند» زمینه را برای داروین آماده کرد.",

    era5_tag: "۱۸۳۱ تا ۱۸۳۶",
    era5_title: "سفر بیگل",
    era5_period: "مشاهدات میدانی چارلز داروین",
    era5_body: "چارلز داروین در سن ۲۲ سالگی به‌عنوان طبیعی‌دان کشتی اچ‌ام‌اس بیگل به سفری پنج‌ساله رفت. در جزایر گالاپاگوس، او متوجه شد فِنچ‌های هر جزیره منقار متفاوتی متناسب با نوع غذای همان جزیره دارند. او همچنین فسیل‌های عظیم جانوران منقرض‌شده در آمریکای جنوبی را با گونه‌های زندهٔ مشابه امروزی مقایسه کرد. این مشاهدات بذر ایده‌ای را کاشت که بیست سال بعد به «انتخاب طبیعی» تبدیل شد.",
    era5_fact_label: "نکتهٔ کلیدی",
    era5_fact: "داروین پس از بازگشت، به‌مدت ۲۰ سال نظریه‌اش را منتشر نکرد — از واکنش اجتماعی و مذهبی می‌ترسید — تا اینکه نامه‌ای از آلفرد راسل والاس با ایدهٔ تقریباً یکسان او را وادار به انتشار کرد.",

    era6_tag: "۱۸۵۸ تا ۱۸۵۹",
    era6_title: "داروین، والاس و انتخاب طبیعی",
    era6_period: "خاستگاه گونه‌ها",
    era6_body: "در سال ۱۸۵۸، آلفرد راسل والاس نامه‌ای برای داروین فرستاد که در آن، مستقل از او، ایدهٔ تقریباً یکسانی دربارهٔ انتخاب طبیعی مطرح کرده بود. هر دو نظریه هم‌زمان در انجمن لینه ارائه شد. یک سال بعد، داروین کتاب «خاستگاه گونه‌ها» را منتشر کرد: موجودات تنوع طبیعی دارند، برخی صفات شانس بقا و تولیدمثل بیشتری می‌دهند، این صفات به نسل بعد منتقل می‌شوند، و در طول زمان طولانی، این فرایند گونه‌های جدید می‌سازد. برخلاف لامارک، مکانیزم داروین نیازی به «قصد» یا «تلاش» موجود نداشت — صرفاً بقای تصادفی صفات مفید بود.",
    era6_fact_label: "نکتهٔ کلیدی",
    era6_fact: "کتاب «خاستگاه گونه‌ها» در روز انتشار (۲۴ نوامبر ۱۸۵۹) کاملاً به فروش رفت. با این حال، داروین هرگز کلمهٔ «تکامل» (evolution) را در چاپ اول کتاب به کار نبرد؛ او از عبارت «تبار با تغییر» (descent with modification) استفاده می‌کرد.",

    era7_tag: "۱۸۶۵",
    era7_title: "مندل: قطعهٔ گمشدهٔ وراثت",
    era7_period: "آزمایش‌های دورگه‌گیری گیاهی",
    era7_body: "هم‌زمان با داروین، گریگور مندل، راهبی اتریشی، در باغچهٔ صومعه‌اش هزاران بوتهٔ نخودفرنگی کاشت و کشف کرد که صفات ارثی به‌صورت واحدهای مجزا (که بعدها «ژن» نامیده شدند) منتقل می‌شوند، نه به‌صورت آمیزش پیوستهٔ صفات والدین. او قوانین وراثت غالب و مغلوب را کشف کرد. اما کار مندل در سال ۱۸۶۵ منتشر شد و تقریباً ۳۵ سال نادیده گرفته شد — داروین هرگز از آن باخبر نشد و نظریهٔ او دربارهٔ نحوهٔ وراثت صفات (که به آن «پانژنز» می‌گفت) نادرست بود.",
    era7_fact_label: "چرا مهم بود؟",
    era7_fact: "نظریهٔ داروین یک مشکل بزرگ داشت: اگر صفات والدین با هم «آمیخته» شوند، صفات مفید جدید باید به‌سرعت در جمعیت رقیق و ناپدید شوند. کشف مندل دربارهٔ واحدهای گسستهٔ وراثتی این مشکل را دقیقاً حل کرد — اما این پیوند سی سال بعد کشف شد.",

    era8_tag: "۱۹۰۰ تا ۱۹۴۰",
    era8_title: "کشف دوبارهٔ مندل و سنتز مدرن",
    era8_period: "تولد ژنتیک نوین",
    era8_body: "در سال ۱۹۰۰، سه زیست‌شناس به‌طور مستقل کار فراموش‌شدهٔ مندل را دوباره کشف کردند. طی دهه‌های بعد، دانشمندانی مانند تئودوسیوس دابژانسکی، رونالد فیشر و اِرنست مایر، ژنتیک مندلی را با نظریهٔ انتخاب طبیعی داروین ترکیب کردند و «سنتز نوین تکامل» (Modern Synthesis) را شکل دادند: جهش‌های ژنتیکی منبع تنوع‌اند، و انتخاب طبیعی روی این تنوع عمل می‌کند. این ترکیب، دقیقاً همان قطعه‌ای بود که نظریهٔ داروین کم داشت.",
    era8_fact_label: "نکتهٔ کلیدی",
    era8_fact: "این دوره برای نخستین‌بار زیست‌شناسی تکاملی، ژنتیک و دیرینه‌شناسی را در یک چارچوب نظری واحد و ریاضی‌شده ادغام کرد.",

    era9_tag: "۱۹۵۳ تا امروز",
    era9_title: "ژنتیک مولکولی و تکامل مدرن",
    era9_period: "از کشف DNA تا امروز",
    era9_body: "کشف ساختار دورشتهٔ DNA توسط واتسون و کریک در سال ۱۹۵۳ (بر پایهٔ داده‌های تعیین‌کنندهٔ روزالیند فرانکلین)، تکامل را از سطح صفات قابل‌مشاهده به سطح مولکولی برد. اکنون دانشمندان می‌توانند مستقیماً جهش‌های DNA را بخوانند، درخت‌های تبارشناسی را با مقایسهٔ ژنوم بسازند و حتی تکامل را در آزمایشگاه (مانند آزمایش بلندمدت تکامل باکتری‌های E. coli در حال اجرا از ۱۹۸۸) مشاهده کنند. مفاهیمی مانند رانش ژنتیکی، جریان ژنی و تعادل نقطه‌ای به این چارچوب افزوده شده‌اند.",
    era9_fact_label: "نکتهٔ کلیدی",
    era9_fact: "آزمایش تکامل بلندمدت E. coli ریچارد لنسکی، از سال ۱۹۸۸ تاکنون بیش از ۷۵٬۰۰۰ نسل باکتری را زیر نظر داشته و انتخاب طبیعی را به‌طور مستقیم و زنده در آزمایشگاه ثبت کرده است.",

    quiz_title: "آزمون گاه‌شمار تکامل",
    quiz_subtitle: "دانش خودت را امتحان کن و نشان بگیر",
    quiz_score: "امتیاز",
    quiz_of: "از",
    quiz_correct: "درست!",
    quiz_incorrect: "نادرست",
    quiz_next: "سؤال بعدی",
    quiz_finish: "پایان آزمون",
    quiz_result_title: "نتیجهٔ آزمون",
    quiz_retry: "تلاش دوباره",
    quiz_perfect: "عالی! تسلط کامل بر تاریخچهٔ تکامل.",
    quiz_good: "خوب بود! چند نکته را دوباره مرور کن.",
    quiz_retry_msg: "دوباره تلاش کن — گاه‌شمار را یک‌بار دیگر مرور کن."
  }
},

en: {
  meta: { title: "EvoGames — Evolution Games" },
  nav: {
    home: "Home",
    games: "Games",
    learn: "History of Evolution",
    about: "About",
    play: "Play Now"
  },
  hero: {
    eyebrow: "Evolution Simulation Lab",
    title: "Millions of years of evolution, turned into a game",
    subtitle: "EvoGames is a collection of science games about evolution; each one turns a real mechanism from evolutionary biology — from natural selection to speciation — into an experience you can actually play.",
    cta_primary: "Enter the Games",
    cta_secondary: "Learn the History of Evolution",
    stat1_num: "1", stat1_label: "Live Game",
    stat2_num: "∞", stat2_label: "Simulatable Generations",
    stat3_num: "4", stat3_label: "Historical Eras Taught"
  },
  section_games: {
    eyebrow: "Game Library",
    title: "One lab, many games",
    subtitle: "Each game turns a real mechanism from evolutionary biology into something you can actually play.",
    game1_tag: "Live",
    game1_title: "Gene Pool",
    game1_desc: "Grow a living population of creatures, design environmental pressures, and steer natural selection generation by generation in real time.",
    game1_cta: "Enter Game",
    soon_tag: "Coming Soon",
    game2_title: "Island of Species",
    game2_desc: "Simulate speciation and geographic isolation across an archipelago map.",
    game3_title: "Evo Cards",
    game3_desc: "A card battler built on real ecological traits — evolve your species against rivals.",
    game4_title: "Deep Time",
    game4_desc: "A generation-to-generation roguelike where every death seeds a fresh mutation.",
    locked: "Locked — Coming Soon"
  },
  section_learn_teaser: {
    eyebrow: "Before You Play",
    title: "The story of an idea that took three centuries",
    subtitle: "Long before Darwin, thinkers struggled to explain why species are the way they are. It's a winding road from the fixity of species to modern genetics.",
    cta: "View Interactive Timeline"
  },
  footer: {
    tagline: "Science gamified for an intuitive grasp of evolution.",
    rights: "All rights reserved.",
    made: "Built out of curiosity about life."
  },

  /* ---------------- GAME PAGE (Gene Pool) ---------------- */
  game: {
    title: "Gene Pool",
    subtitle: "Live Natural Selection Simulator",
    back: "Back to EvoGames",
    tutorial_btn: "Tutorial",
    stats_btn: "Stats",
    codex_btn: "Gene Codex",

    hud_generation: "Generation",
    hud_population: "Population",
    hud_avg_fitness: "Avg. Fitness",
    hud_food: "Food",
    hud_season: "Season",
    hud_speed: "Sim Speed",

    controls_title: "Environment Controls",
    predator_label: "Predator Pressure",
    predator_desc: "Introduces a predator that hunts slow, large creatures.",
    temp_label: "Temperature",
    temp_desc: "Lower the temperature to make it cold; only creatures with high insulation survive. Very high temperatures also cost well-insulated creatures a bit (overheating).",
    food_label: "Food Abundance",
    food_desc: "Scarcity intensifies intraspecies competition.",
    toxin_label: "Environmental Toxin",
    toxin_desc: "Creatures without toxin resistance survive less often.",

    action_add_predator: "Release Predator",
    action_ice_age: "Trigger Ice Age",
    action_heat_wave: "Trigger Heat Wave",
    action_famine: "Trigger Famine",
    action_bloom: "Trigger Food Bloom",
    action_meteor: "Meteor Impact (Extinction Event)",
    action_reset: "Reset Population",
    action_pause: "Pause",
    action_play: "Play",

    panel_traits: "Population Traits",
    trait_speed: "Speed",
    trait_size: "Size",
    trait_camo: "Camouflage",
    trait_insulation: "Insulation",
    trait_toxin_res: "Toxin Resistance",
    trait_fertility: "Fertility",

    panel_missions: "Missions",
    panel_missions_desc: "Steer evolution toward specific goals to earn points and medals.",

    creature_selected: "Selected Creature",
    no_selection: "Click a creature to inspect its genetics.",
    fitness_score: "Fitness Score",
    generation_born: "Born in Gen.",

    event_log_title: "Event Log",
    empty_log: "No events yet. Start the simulation.",

    level_complete: "Mission Complete!",
    level_failed: "Population Extinct",
    new_badge: "New Badge Earned",
    continue_btn: "Continue",
    retry_btn: "Retry",
    next_mission_btn: "Next Mission",

    onboard_title: "Welcome to Gene Pool",
    onboard_p1: "You play the role of 'environmental pressure,' not creator. Creatures are born at random, carry different traits, and reproduce. Your job is to shift the environment so only the fittest survive — exactly as it happens in nature.",
    onboard_p2: "Each creature has six genetic traits. Traits that help survival spread through the next generation; traits that don't fade away. This is natural selection, not intelligent design.",
    onboard_p3: "Random mutations occasionally create entirely new traits. Most mutations are neutral or harmful, but occasionally a lucky one reshapes a whole lineage's fate.",
    onboard_start: "Let's Go",

    codex_title: "Gene Codex",
    codex_intro: "Every trait has a benefit and a cost. Balance is the key to survival.",

    mission_1_title: "Cold Survival",
    mission_1_desc: "Raise average population Insulation above 70% within 15 generations.",
    mission_2_title: "Camouflage Master",
    mission_2_desc: "With an active predator, grow the population above 40 with average camouflage above 60%.",
    mission_3_title: "Famine Survivor",
    mission_3_desc: "Keep the population above 10 for 20 generations under severe food scarcity.",
    mission_4_title: "Toxin-Resistant Hunter",
    mission_4_desc: "Simultaneously raise toxin resistance and speed across the population.",
    mission_5_title: "Extinction Survivor",
    mission_5_desc: "Survive a meteor event — at least 5 creatures must remain alive.",

    sim_speed_1: "1×", sim_speed_2: "2×", sim_speed_4: "4×",

    xp_gained: "XP Gained",
    level_up: "Level Up!",
    your_level: "Your Level"
  },

  /* ---------------- LEARN / HISTORY PAGE ---------------- */
  learn: {
    hero_eyebrow: "Interactive Timeline",
    hero_title: "Three centuries spent asking why living things are the way they are",
    hero_subtitle: "Before Darwin published On the Origin of Species, generations of thinkers had already tried to solve the puzzle: why do fossils differ from living creatures? Why do species vanish? Does life change, or does it stay fixed forever?",
    progress_label: "Learning Progress",
    quiz_cta: "Take the Era Quiz",
    back_to_hub: "Back to EvoGames",

    era1_tag: "Before 1800",
    era1_title: "The Fixity of Species",
    era1_period: "Antiquity to the late 18th century",
    era1_body: "For thousands of years, the dominant view was that each species had remained fixed and unchanged since creation. Aristotle proposed the 'Scala Naturae' — a fixed, unchanging hierarchy of beings from simplest to most perfect. This view dominated Western biology and theology for centuries, and explained strange fossils with theories like 'fixed but diverse forms since the beginning.'",
    era1_fact_label: "Key Fact",
    era1_fact: "Carl Linnaeus, the father of modern taxonomy, initially believed species were entirely fixed — but late in life, after observing plant hybrids, he began to doubt this.",

    era2_tag: "18th Century",
    era2_title: "Early Whispers of Change",
    era2_period: "1744 – 1800",
    era2_body: "As geology advanced and fossils of creatures that no longer existed were discovered, some thinkers began to doubt the fixity of species. Georges-Louis Buffon, in his Natural History, suggested species might transform over time, though he never fully developed the idea for fear of clashing with the Church. Erasmus Darwin — Charles Darwin's grandfather — hinted at species transmutation in his poetry and writings.",
    era2_fact_label: "Key Fact",
    era2_fact: "Georges Cuvier, founder of comparative anatomy, proved that some species (like mammoths) had gone fully extinct — a discovery that badly shook the belief in the total fixity of life.",

    era3_tag: "1796 – 1830",
    era3_title: "Catastrophism vs. Uniformitarianism",
    era3_period: "Early 19th century",
    era3_body: "Georges Cuvier proposed 'catastrophism': Earth's history was shaped by sudden, massive catastrophes (like great floods) that wiped out many species, with new species appearing afterward. In contrast, James Hutton and later Charles Lyell proposed 'uniformitarianism': Earth was shaped by slow, continuous processes (erosion, sedimentation) over millions of years, not sudden disasters. Lyell's Principles of Geology later became Darwin's key inspiration during the Beagle voyage.",
    era3_fact_label: "Key Fact",
    era3_fact: "Darwin carried volume one of Lyell's Principles of Geology on his five-year voyage aboard the Beagle, drawing on the idea of gradual change over immense timescales to make sense of biological evolution.",

    era4_tag: "1809",
    era4_title: "Lamarck: The First Coherent Theory of Evolution",
    era4_period: "Philosophie Zoologique, 1809",
    era4_body: "Jean-Baptiste Lamarck proposed the first complete, coherent theory of how species change over time. He believed organisms strengthen traits they use during their lifetime and pass these 'acquired characteristics' to their offspring. His famous example was the giraffe: its neck stretches during life to reach tall leaves, and this stretching is passed to the next generation. Though his mechanism was wrong, he was the first to formally propose gradual species evolution as a scientific theory.",
    era4_fact_label: "Why Was It Wrong?",
    era4_fact: "August Weismann cut the tails off mice for many successive generations and showed offspring were still born with tails — acquired traits are not passed into genes. But Lamarck's core idea, that species change, paved the way for Darwin.",

    era5_tag: "1831 – 1836",
    era5_title: "The Voyage of the Beagle",
    era5_period: "Charles Darwin's field observations",
    era5_body: "At age 22, Charles Darwin sailed as naturalist aboard HMS Beagle on a five-year voyage. In the Galápagos Islands, he noticed each island's finches had different beak shapes suited to that island's food source. He also compared giant fossils of extinct South American animals to their smaller living relatives. These observations planted the seed of an idea that, twenty years later, would become natural selection.",
    era5_fact_label: "Key Fact",
    era5_fact: "After returning home, Darwin sat on his theory for 20 years — fearing social and religious backlash — until a letter from Alfred Russel Wallace, describing an almost identical idea, forced him to finally publish.",

    era6_tag: "1858 – 1859",
    era6_title: "Darwin, Wallace, and Natural Selection",
    era6_period: "On the Origin of Species",
    era6_body: "In 1858, Alfred Russel Wallace sent Darwin a letter independently outlining almost the same idea about natural selection. Both theories were presented together at the Linnean Society. A year later, Darwin published On the Origin of Species: organisms show natural variation, some traits improve odds of survival and reproduction, those traits pass to offspring, and over vast timescales this process generates new species. Unlike Lamarck, Darwin's mechanism required no 'intent' or 'effort' from the organism — just the random persistence of useful traits.",
    era6_fact_label: "Key Fact",
    era6_fact: "On the Origin of Species sold out completely on its publication day (November 24, 1859). Yet Darwin never used the word 'evolution' in the first edition — he used the phrase 'descent with modification.'",

    era7_tag: "1865",
    era7_title: "Mendel: The Missing Piece of Heredity",
    era7_period: "Plant Hybridization Experiments",
    era7_body: "Around the same time as Darwin, Gregor Mendel, an Austrian monk, planted thousands of pea plants in his monastery garden and discovered that inherited traits pass down as discrete units (later called 'genes'), not as a continuous blend of parental traits. He uncovered the laws of dominant and recessive inheritance. But Mendel's work, published in 1865, was ignored for nearly 35 years — Darwin never learned of it, and his own theory of inheritance ('pangenesis') was incorrect.",
    era7_fact_label: "Why It Mattered",
    era7_fact: "Darwin's theory had a critical flaw: if parental traits simply 'blended,' useful new traits should quickly dilute and vanish from a population. Mendel's discovery of discrete units of heredity solved exactly this problem — but the link wasn't made for another thirty years.",

    era8_tag: "1900 – 1940",
    era8_title: "Mendel Rediscovered & The Modern Synthesis",
    era8_period: "The birth of modern genetics",
    era8_body: "In 1900, three biologists independently rediscovered Mendel's forgotten work. Over the following decades, scientists like Theodosius Dobzhansky, Ronald Fisher, and Ernst Mayr merged Mendelian genetics with Darwin's natural selection into the 'Modern Synthesis': genetic mutations are the source of variation, and natural selection acts on that variation. This was exactly the missing piece Darwin's theory had needed.",
    era8_fact_label: "Key Fact",
    era8_fact: "This era, for the first time, unified evolutionary biology, genetics, and paleontology into a single, mathematically rigorous theoretical framework.",

    era9_tag: "1953 – Today",
    era9_title: "Molecular Genetics and Modern Evolution",
    era9_period: "From the discovery of DNA to today",
    era9_body: "Watson and Crick's 1953 discovery of the double-helix structure of DNA — built on Rosalind Franklin's crucial X-ray data — took evolution from the level of visible traits down to the molecular level. Scientists can now read DNA mutations directly, build phylogenetic trees by comparing genomes, and even watch evolution happen in real time in the lab (like Richard Lenski's Long-Term Evolution Experiment with E. coli, running continuously since 1988). Concepts like genetic drift, gene flow, and punctuated equilibrium have since enriched the framework.",
    era9_fact_label: "Key Fact",
    era9_fact: "Richard Lenski's Long-Term Evolution Experiment with E. coli has tracked over 75,000 bacterial generations since 1988, directly recording natural selection live in the lab.",

    quiz_title: "Evolution Timeline Quiz",
    quiz_subtitle: "Test your knowledge and earn a badge",
    quiz_score: "Score",
    quiz_of: "of",
    quiz_correct: "Correct!",
    quiz_incorrect: "Incorrect",
    quiz_next: "Next Question",
    quiz_finish: "Finish Quiz",
    quiz_result_title: "Quiz Results",
    quiz_retry: "Try Again",
    quiz_perfect: "Excellent! Full mastery of evolution's history.",
    quiz_good: "Good job! Review a few points again.",
    quiz_retry_msg: "Try again — review the timeline once more."
  }
}
};
