/* ==========================================================================
   EvoGames — Gene Pool: UI Controller
   ========================================================================== */

const TRAIT_META = {
  speed:      { color: 'var(--ocean)',     labelKey: 'game.trait_speed' },
  size:       { color: 'var(--amber)',     labelKey: 'game.trait_size' },
  camo:       { color: 'var(--green-glow)',labelKey: 'game.trait_camo' },
  insulation: { color: 'var(--violet-mut)',labelKey: 'game.trait_insulation' },
  toxinRes:   { color: 'var(--coral)',     labelKey: 'game.trait_toxin_res' },
  fertility:  { color: 'var(--green-soft)',labelKey: 'game.trait_fertility' },
};

const CODEX_DATA = [
  { key: 'speed', fa_pro: 'فرار سریع‌تر از شکارچی', fa_con: 'مصرف انرژی بالا',
    en_pro: 'Escapes predators faster', en_con: 'High energy upkeep' },
  { key: 'size', fa_pro: 'صید توسط شکارچی سخت‌تر است', fa_con: 'مصرف انرژی بیشتر، سرعت کمتر',
    en_pro: 'Harder for predators to catch', en_con: 'Costs more energy, slows you down' },
  { key: 'camo', fa_pro: 'شکارچی دیرتر شناسایی می‌کند (تقریباً رایگان)', fa_con: 'تأثیر مستقیمی روی سرعت یا اندازه ندارد',
    en_pro: 'Predators spot you later (nearly free)', en_con: 'No direct benefit without predators present' },
  { key: 'insulation', fa_pro: 'مقاومت در برابر دمای نامناسب', fa_con: 'هزینهٔ انرژی دائمی',
    en_pro: 'Tolerates extreme temperatures', en_con: 'Constant metabolic cost' },
  { key: 'toxinRes', fa_pro: 'کاهش شانس مرگ از سموم محیطی', fa_con: 'مصرف انرژی، بی‌فایده در محیط پاک',
    en_pro: 'Lowers chance of death from toxins', en_con: 'Wasted energy in a clean environment' },
  { key: 'fertility', fa_pro: 'آستانهٔ تولیدمثل پایین‌تر، فرزندان بیشتر', fa_con: 'هزینهٔ انرژی بالا برای نگهداری',
    en_pro: 'Lower reproduction threshold, more offspring', en_con: 'High energy maintenance cost' },
];

(function GenePoolApp() {
  const canvas = document.getElementById('simCanvas');
  const sim = new Simulation(800, 600);
  const renderer = new Renderer(canvas, sim);

  let progress = Progression.load();
  let activeMissionIdx = 0;
  let missionCtx = {};
  let missionResolved = false;

  sim.seedPopulation(24);

  sim.onGeneration = () => {
    missionCtx.generationsElapsed = (missionCtx.generationsElapsed || 0) + 1;
  };

  const hudGeneration = document.getElementById('hudGeneration');
  const hudPopulation = document.getElementById('hudPopulation');
  const hudFitness = document.getElementById('hudFitness');
  const envSummaryChip = document.getElementById('envSummaryChip');
  const levelCircle = document.getElementById('levelCircle');
  const levelXpFill = document.getElementById('levelXpFill');

  function updateHud() {
    hudGeneration.textContent = toLocaleDigits(sim.generation);
    hudPopulation.textContent = toLocaleDigits(sim.creatures.length);
    hudFitness.textContent = toLocaleDigits(Math.round(sim.avgFitness())) + '%';
    envSummaryChip.textContent =
      `🌡️ ${Math.round(sim.env.temperature*100)}% · 🍃 ${Math.round(sim.env.foodAbundance*100)}% · ☠️ ${Math.round(sim.env.toxinLevel*100)}%`;
    levelCircle.textContent = progress.level;
    const need = Progression.xpForLevel(progress.level);
    levelXpFill.style.width = Math.round((progress.xp / need) * 100) + '%';
  }

  function toLocaleDigits(n) {
    if (EvoI18n.currentLang === 'fa') {
      return String(n).replace(/[0-9]/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
    }
    return String(n);
  }
  window.toLocaleDigits = toLocaleDigits;

  const tempSlider = document.getElementById('tempSlider');
  const foodSlider = document.getElementById('foodSlider');
  const toxinSlider = document.getElementById('toxinSlider');
  const tempValue = document.getElementById('tempValue');
  const foodValue = document.getElementById('foodValue');
  const toxinValue = document.getElementById('toxinValue');

  function syncSlidersFromEnv() {
    tempSlider.value = Math.round(sim.env.temperature * 100);
    foodSlider.value = Math.round(sim.env.foodAbundance * 100);
    toxinSlider.value = Math.round(sim.env.toxinLevel * 100);
    tempValue.textContent = tempSlider.value + '%';
    foodValue.textContent = foodSlider.value + '%';
    toxinValue.textContent = toxinSlider.value + '%';
  }

  tempSlider.addEventListener('input', () => {
    sim.env.temperature = tempSlider.value / 100;
    tempValue.textContent = tempSlider.value + '%';
  });
  foodSlider.addEventListener('input', () => {
    sim.env.foodAbundance = foodSlider.value / 100;
    foodValue.textContent = foodSlider.value + '%';
  });
  toxinSlider.addEventListener('input', () => {
    sim.env.toxinLevel = toxinSlider.value / 100;
    toxinValue.textContent = toxinSlider.value + '%';
  });

  syncSlidersFromEnv();
  applyMissionSetup(activeMissionIdx);

  document.getElementById('btnPredator').addEventListener('click', () => {
    sim.addPredator();
    logEvent('predator', 'danger');
  });
  document.getElementById('btnIceAge').addEventListener('click', () => {
    sim.env.temperature = Math.max(0, sim.env.temperature - 0.4);
    syncSlidersFromEnv();
    logEvent('ice_age', 'danger');
  });
  document.getElementById('btnHeatWave').addEventListener('click', () => {
    sim.env.temperature = Math.min(1, sim.env.temperature + 0.4);
    syncSlidersFromEnv();
    logEvent('heat_wave', 'danger');
  });
  document.getElementById('btnFamine').addEventListener('click', () => {
    sim.env.foodAbundance = Math.max(0, sim.env.foodAbundance - 0.45);
    syncSlidersFromEnv();
    logEvent('famine', 'danger');
  });
  document.getElementById('btnBloom').addEventListener('click', () => {
    sim.env.foodAbundance = Math.min(1, sim.env.foodAbundance + 0.35);
    syncSlidersFromEnv();
    logEvent('bloom', 'birth');
  });
  document.getElementById('btnMeteor').addEventListener('click', () => {
    const res = sim.triggerMeteor();
    logEvent('meteor_manual', 'danger', res);
  });
  document.getElementById('btnReset').addEventListener('click', () => {
    sim.seedPopulation(24);
    missionCtx = {};
    applyMissionSetup(activeMissionIdx);
    missionResolved = false;
    document.getElementById('eventLog').innerHTML =
      `<div class="event-empty" data-i18n="game.empty_log">${EvoI18n.get('game.empty_log')}</div>`;
  });

  const playPauseBtn = document.getElementById('playPauseBtn');
  const playIcon = document.getElementById('playIcon');
  const pauseIcon = document.getElementById('pauseIcon');
  playPauseBtn.addEventListener('click', () => {
    sim.paused = !sim.paused;
    playIcon.style.display = sim.paused ? 'block' : 'none';
    pauseIcon.style.display = sim.paused ? 'none' : 'block';
  });
  document.querySelectorAll('.sim-speed-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.sim-speed-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      sim.speedMultiplier = parseInt(btn.dataset.speed, 10);
    });
  });

  const selectedCard = document.getElementById('selectedCard');
  const sccMeta = document.getElementById('sccMeta');
  const sccFitness = document.getElementById('sccFitness');
  const sccTraits = document.getElementById('sccTraits');

  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    const c = renderer.pickCreatureAt(x, y);
    if (c) {
      renderer.selectedId = c.id;
      showSelectedCreature(c);
    } else {
      renderer.selectedId = null;
      selectedCard.classList.remove('visible');
    }
  });
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    const c = renderer.pickCreatureAt(x, y);
    renderer.hoveredId = c ? c.id : null;
    canvas.style.cursor = c ? 'pointer' : 'default';
  });
  document.getElementById('closeSelected').addEventListener('click', () => {
    renderer.selectedId = null;
    selectedCard.classList.remove('visible');
  });

  function showSelectedCreature(c) {
    selectedCard.classList.add('visible');
    sccMeta.innerHTML = `${EvoI18n.get('game.generation_born')}: ${toLocaleDigits(c.generation)}`;
    const fit = Math.round(c.fitnessScore(sim.env));
    sccFitness.textContent = toLocaleDigits(fit) + '%';
    sccTraits.innerHTML = TRAITS.map(t => {
      const meta = TRAIT_META[t];
      const val = Math.round(c.genes[t] * 100);
      return `<div class="trait-bar-row">
        <div class="trait-bar-head"><span class="name">${EvoI18n.get(meta.labelKey)}</span><span class="val">${toLocaleDigits(val)}%</span></div>
        <div class="trait-bar-track"><div class="trait-bar-fill ${t}" style="width:${val}%"></div></div>
      </div>`;
    }).join('');
  }

  const populationTraitsEl = document.getElementById('populationTraits');
  function renderPopulationTraits() {
    populationTraitsEl.innerHTML = TRAITS.map(t => {
      const meta = TRAIT_META[t];
      const val = Math.round(sim.avgTrait(t) * 100);
      return `<div class="trait-bar-row">
        <div class="trait-bar-head"><span class="name">${EvoI18n.get(meta.labelKey)}</span><span class="val">${toLocaleDigits(val)}%</span></div>
        <div class="trait-bar-track"><div class="trait-bar-fill ${t}" style="width:${val}%"></div></div>
      </div>`;
    }).join('');
  }

  const eventLog = document.getElementById('eventLog');
  const EVENT_MESSAGES = {
    fa: {
      predator: '🦈 یک شکارچی وارد اکوسیستم شد.',
      ice_age: '❄️ عصر یخبندان آغاز شد؛ دما به‌شدت افت کرد.',
      heat_wave: '🔥 موج گرما دما را به‌شدت افزایش داد.',
      famine: '🥀 قحطی رخ داد؛ منابع غذایی کاهش یافت.',
      bloom: '🌱 شکوفایی غذا؛ منابع غذایی افزایش یافت.',
      meteor_manual: (d) => `☄️ برخورد شهابی! ${toLocaleDigits(d.killed)} موجود از بین رفت، ${toLocaleDigits(d.survived)} زنده ماند.`,
      mission_complete: (d) => `🏆 مأموریت «${d.title}» کامل شد! +${toLocaleDigits(d.xp)} امتیاز`,
      mission_failed: (d) => `💀 جمعیت در مأموریت «${d.title}» منقرض شد.`,
      generation: (d) => `🧬 نسل ${toLocaleDigits(d.gen)} آغاز شد.`,
    },
    en: {
      predator: '🦈 A predator entered the ecosystem.',
      ice_age: '❄️ Ice age triggered — temperature dropped sharply.',
      heat_wave: '🔥 Heat wave — temperature spiked sharply.',
      famine: '🥀 Famine — food resources dropped.',
      bloom: '🌱 Food bloom — resources increased.',
      meteor_manual: (d) => `☄️ Meteor impact! ${toLocaleDigits(d.killed)} died, ${toLocaleDigits(d.survived)} survived.`,
      mission_complete: (d) => `🏆 Mission "${d.title}" complete! +${toLocaleDigits(d.xp)} XP`,
      mission_failed: (d) => `💀 Population went extinct during "${d.title}".`,
      generation: (d) => `🧬 Generation ${toLocaleDigits(d.gen)} began.`,
    }
  };

  function logEvent(key, type = 'birth', data = null) {
    const empty = eventLog.querySelector('.event-empty');
    if (empty) empty.remove();
    const msgSrc = EVENT_MESSAGES[EvoI18n.currentLang][key];
    const msg = typeof msgSrc === 'function' ? msgSrc(data) : msgSrc;
    const div = document.createElement('div');
    div.className = `event-item type-${type}`;
    div.textContent = msg;
    eventLog.prepend(div);
    while (eventLog.children.length > 30) eventLog.removeChild(eventLog.lastChild);
  }

  let lastGenSeen = sim.generation;

  const missionsListEl = document.getElementById('missionsList');

  function applyMissionSetup(idx) {
    const m = MISSIONS[idx];
    if (m && m.setup) m.setup(sim);
    missionCtx = { generationsElapsed: 0, progress: 0 };
    syncSlidersFromEnv();
  }

  function renderMissions() {
    missionsListEl.innerHTML = MISSIONS.map((m, idx) => {
      const done = progress.completedMissions.includes(m.id);
      const isActive = idx === activeMissionIdx;
      const pct = isActive ? Math.round((missionCtx.progress || 0) * 100) : (done ? 100 : 0);
      return `<div class="mission-card ${isActive ? 'active' : ''} ${done ? 'done' : ''}" data-idx="${idx}">
        <div class="mission-card-head">
          <div class="mission-icon">${missionIconSvg(m.icon)}</div>
          <div>
            <div class="mission-title">${EvoI18n.get(m.titleKey)}</div>
          </div>
        </div>
        <div class="mission-desc">${EvoI18n.get(m.descKey)}</div>
        <div class="mission-progress-track"><div class="mission-progress-fill" style="width:${pct}%"></div></div>
        <div class="mission-xp">+${toLocaleDigits(m.xp)} XP</div>
      </div>`;
    }).join('');

    missionsListEl.querySelectorAll('.mission-card').forEach(card => {
      card.addEventListener('click', () => {
        const idx = parseInt(card.dataset.idx, 10);
        if (idx === activeMissionIdx) return;
        activeMissionIdx = idx;
        sim.seedPopulation(24);
        sim.removeAllPredators();
        applyMissionSetup(idx);
        missionResolved = false;
        renderMissions();
      });
    });
  }

  function missionIconSvg(name) {
    const icons = {
      snowflake: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 2v20M4.9 5.5l14.2 13M19.1 5.5 4.9 18.5M2 12h20"/></svg>',
      'eye-off': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7c1.6 0 3 .3 4.2.8M22 12s-1.2 2.8-3.6 4.8M9.9 9.9a3 3 0 1 0 4.2 4.2M3 3l18 18"/></svg>',
      'wheat-off': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 22V2M3 3l18 18"/></svg>',
      skull: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="11" r="8"/><path d="M9 21v-3M15 21v-3"/><circle cx="9" cy="10" r="1.4"/><circle cx="15" cy="10" r="1.4"/></svg>',
      meteor: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2 9 9l3 1-5 6 8-3-2-2 6-5-4-4Z"/></svg>',
    };
    return icons[name] || '';
  }

  function checkMissions() {
    if (missionResolved) return;
    const m = MISSIONS[activeMissionIdx];
    if (!m) return;
    const complete = m.check(sim, missionCtx);
    if (complete) {
      missionResolved = true;
      const leveledUp = Progression.completeMission(progress, m.id, m.xp);
      logEvent('mission_complete', 'mission', { title: EvoI18n.get(m.titleKey), xp: m.xp });
      showResultModal(true, m, leveledUp);
      return;
    }
    if (m.fail && m.fail(sim, missionCtx)) {
      missionResolved = true;
      logEvent('mission_failed', 'danger', { title: EvoI18n.get(m.titleKey) });
      showResultModal(false, m, false);
    }
  }

  const resultModal = document.getElementById('resultModal');
  const resultRing = document.getElementById('resultRing');
  const resultIcon = document.getElementById('resultIcon');
  const resultTitle = document.getElementById('resultTitle');
  const resultXpLine = document.getElementById('resultXpLine');
  const resultRetryBtn = document.getElementById('resultRetryBtn');
  const resultContinueBtn = document.getElementById('resultContinueBtn');

  function showResultModal(success, mission, leveledUp) {
    sim.paused = true;
    playIcon.style.display = 'block'; pauseIcon.style.display = 'none';
    resultRing.className = 'result-badge-ring ' + (success ? 'success' : 'fail');
    resultIcon.innerHTML = success
      ? '<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>'
      : '<circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/>';
    resultTitle.textContent = success ? EvoI18n.get('game.level_complete') : EvoI18n.get('game.level_failed');
    resultXpLine.textContent = success ? `+${toLocaleDigits(mission.xp)} ${EvoI18n.get('game.xp_gained')}` : '';
    resultXpLine.style.display = success ? 'block' : 'none';
    resultContinueBtn.style.display = success ? 'inline-flex' : 'none';
    resultRetryBtn.style.display = 'inline-flex';
    resultModal.classList.add('open');
    updateHud();
    renderMissions();

    if (leveledUp) {
      setTimeout(() => showXpToast(EvoI18n.get('game.level_up')), 700);
    }
  }

  resultRetryBtn.addEventListener('click', () => {
    resultModal.classList.remove('open');
    sim.seedPopulation(24);
    sim.removeAllPredators();
    applyMissionSetup(activeMissionIdx);
    missionResolved = false;
    renderMissions();
  });
  resultContinueBtn.addEventListener('click', () => {
    resultModal.classList.remove('open');
    activeMissionIdx = Math.min(activeMissionIdx + 1, MISSIONS.length - 1);
    sim.seedPopulation(24);
    sim.removeAllPredators();
    applyMissionSetup(activeMissionIdx);
    missionResolved = false;
    renderMissions();
  });
  document.querySelector('[data-action="close-result"]').addEventListener('click', () => {
    resultModal.classList.remove('open');
  });

  const xpToast = document.getElementById('xpToast');
  let xpToastTimer = null;
  function showXpToast(text) {
    xpToast.textContent = text;
    xpToast.classList.add('show');
    clearTimeout(xpToastTimer);
    xpToastTimer = setTimeout(() => xpToast.classList.remove('show'), 2200);
  }

  const onboardModal = document.getElementById('onboardModal');
  const onboardNextBtn = document.getElementById('onboardNextBtn');
  let onboardStep = 0;
  const onboardSteps = document.querySelectorAll('.onboard-step-dot');
  const onboardPs = document.querySelectorAll('.onboard-p');

  function openOnboard() {
    onboardStep = 0;
    updateOnboardStep();
    onboardModal.classList.add('open');
  }
  function updateOnboardStep() {
    onboardSteps.forEach((d, i) => d.classList.toggle('active', i === onboardStep));
    onboardPs.forEach((p, i) => p.style.display = i === onboardStep ? 'block' : 'none');
    onboardNextBtn.querySelector('span').textContent = onboardStep === 2
      ? EvoI18n.get('game.onboard_start') : (EvoI18n.currentLang === 'fa' ? 'بعدی' : 'Next');
  }
  onboardNextBtn.addEventListener('click', () => {
    if (onboardStep < 2) { onboardStep++; updateOnboardStep(); }
    else { onboardModal.classList.remove('open'); }
  });
  document.querySelector('[data-action="close-onboard"]').addEventListener('click', () => {
    onboardModal.classList.remove('open');
  });
  document.querySelector('[data-action="open-onboard"]').addEventListener('click', openOnboard);

  if (!localStorage.getItem('evo-genepool-seen-onboard')) {
    setTimeout(openOnboard, 500);
    localStorage.setItem('evo-genepool-seen-onboard', '1');
  }

  const codexModal = document.getElementById('codexModal');
  const codexListEl = document.getElementById('codexList');
  function renderCodex() {
    codexListEl.innerHTML = CODEX_DATA.map(item => {
      const meta = TRAIT_META[item.key];
      const pro = EvoI18n.currentLang === 'fa' ? item.fa_pro : item.en_pro;
      const con = EvoI18n.currentLang === 'fa' ? item.fa_con : item.en_con;
      return `<div class="codex-trait-item">
        <div class="codex-trait-head">
          <div class="codex-trait-dot" style="background:${meta.color}"></div>
          <div class="codex-trait-name">${EvoI18n.get(meta.labelKey)}</div>
        </div>
        <div class="codex-pro-con">
          <span class="codex-pro">✓ ${pro}</span>
          <span class="codex-con">✕ ${con}</span>
        </div>
      </div>`;
    }).join('');
  }
  document.querySelector('[data-action="open-codex"]').addEventListener('click', () => {
    renderCodex();
    codexModal.classList.add('open');
  });
  document.querySelector('[data-action="close-codex"]').addEventListener('click', () => {
    codexModal.classList.remove('open');
  });
  [onboardModal, codexModal, resultModal].forEach(modal => {
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('open'); });
  });

  const panelLeft = document.getElementById('panelLeft');
  const panelRight = document.getElementById('panelRight');
  const panelScrim = document.getElementById('panelScrim');
  function closePanels() {
    panelLeft.classList.remove('mobile-open');
    panelRight.classList.remove('mobile-open');
    panelScrim.classList.remove('show');
  }
  document.querySelector('[data-action="toggle-panel-left"]').addEventListener('click', () => {
    panelLeft.classList.toggle('mobile-open');
    panelRight.classList.remove('mobile-open');
    panelScrim.classList.toggle('show', panelLeft.classList.contains('mobile-open'));
  });
  document.querySelector('[data-action="toggle-panel-right"]').addEventListener('click', () => {
    panelRight.classList.toggle('mobile-open');
    panelLeft.classList.remove('mobile-open');
    panelScrim.classList.toggle('show', panelRight.classList.contains('mobile-open'));
  });
  panelScrim.addEventListener('click', closePanels);

  window.addEventListener('evo-lang-changed', () => {
    renderPopulationTraits();
    renderMissions();
    updateHud();
    if (renderer.selectedId) {
      const c = sim.creatures.find(cr => cr.id === renderer.selectedId);
      if (c) showSelectedCreature(c);
    }
  });

  let lastFrame = performance.now();
  let hudTimer = 0;
  function loop(now) {
    const dt = now - lastFrame;
    lastFrame = now;

    if (!sim.paused) {
      sim.step(dt);
      if (sim.generation !== lastGenSeen) {
        lastGenSeen = sim.generation;
        renderPopulationTraits();
      }
      checkMissions();
    }

    renderer.draw();

    hudTimer += dt;
    if (hudTimer > 180) {
      hudTimer = 0;
      updateHud();
      if (Math.random() < 0.5) renderPopulationTraits();
    }

    requestAnimationFrame(loop);
  }

  renderPopulationTraits();
  renderMissions();
  updateHud();
  requestAnimationFrame(loop);

  // Expose limited debug handles (useful for QA / automated testing)
  window.__evoDebug = { sim, renderer };
})();
