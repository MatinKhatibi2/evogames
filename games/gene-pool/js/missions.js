/* ==========================================================================
   EvoGames — Gene Pool: Missions & Progression
   ========================================================================== */

const MISSIONS = [
  {
    id: 'cold_survival',
    titleKey: 'game.mission_1_title',
    descKey: 'game.mission_1_desc',
    icon: 'snowflake',
    setup: (sim) => { sim.env.temperature = 0.12; sim.env.foodAbundance = 0.6; },
    goalGenerations: 15,
    xp: 220,
    check: (sim, ctx) => {
      const insulation = sim.avgTrait('insulation');
      ctx.progress = clamp01(insulation / 0.70);
      return insulation >= 0.70 && ctx.generationsElapsed >= 15;
    },
    fail: (sim, ctx) => sim.creatures.length === 0,
  },
  {
    id: 'camo_master',
    titleKey: 'game.mission_2_title',
    descKey: 'game.mission_2_desc',
    icon: 'eye-off',
    setup: (sim) => {
      sim.env.temperature = 0.5; sim.env.foodAbundance = 0.7;
      sim.addPredator();
    },
    xp: 260,
    check: (sim, ctx) => {
      const camo = sim.avgTrait('camo');
      ctx.progress = clamp01(Math.min(camo / 0.6, sim.creatures.length / 40));
      return camo >= 0.6 && sim.creatures.length >= 40;
    },
    fail: (sim, ctx) => sim.creatures.length === 0,
  },
  {
    id: 'famine_survivor',
    titleKey: 'game.mission_3_title',
    descKey: 'game.mission_3_desc',
    icon: 'wheat-off',
    setup: (sim) => { sim.env.foodAbundance = 0.14; sim.env.temperature = 0.5; },
    goalGenerations: 20,
    xp: 300,
    check: (sim, ctx) => {
      ctx.progress = clamp01(ctx.generationsElapsed / 20) * (sim.creatures.length >= 10 ? 1 : 0.5);
      return ctx.generationsElapsed >= 20 && sim.creatures.length >= 10;
    },
    fail: (sim, ctx) => sim.creatures.length === 0,
  },
  {
    id: 'toxin_hunter',
    titleKey: 'game.mission_4_title',
    descKey: 'game.mission_4_desc',
    icon: 'skull',
    setup: (sim) => { sim.env.toxinLevel = 0.55; sim.env.foodAbundance = 0.55; sim.env.temperature = 0.5; },
    xp: 280,
    check: (sim, ctx) => {
      const tox = sim.avgTrait('toxinRes'), spd = sim.avgTrait('speed');
      ctx.progress = clamp01((tox + spd) / 1.3);
      return tox >= 0.65 && spd >= 0.65;
    },
    fail: (sim, ctx) => sim.creatures.length === 0,
  },
  {
    id: 'extinction_survivor',
    titleKey: 'game.mission_5_title',
    descKey: 'game.mission_5_desc',
    icon: 'meteor',
    setup: (sim) => { sim.env.foodAbundance = 0.6; sim.env.temperature = 0.5; },
    xp: 350,
    special: 'meteor', // triggers a meteor event automatically after ~8 generations
    check: (sim, ctx) => {
      if (!ctx.meteorFired && ctx.generationsElapsed >= 8) {
        const res = sim.triggerMeteor();
        ctx.meteorFired = true;
        ctx.meteorResult = res;
      }
      if (ctx.meteorFired) {
        ctx.progress = clamp01(sim.creatures.length / 5);
        return sim.creatures.length >= 5 && ctx.generationsElapsed >= 10;
      }
      ctx.progress = clamp01(ctx.generationsElapsed / 8) * 0.5;
      return false;
    },
    fail: (sim, ctx) => ctx.meteorFired && sim.creatures.length === 0,
  },
];

function clamp01(v) { return Math.max(0, Math.min(1, v)); }

const Progression = (() => {
  const STORAGE_KEY = 'evo-genepool-progress';

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return { xp: 0, level: 1, completedMissions: [], badges: [] };
  }

  function save(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function xpForLevel(level) {
    return 200 + (level - 1) * 150;
  }

  function addXp(state, amount) {
    state.xp += amount;
    let leveledUp = false;
    while (state.xp >= xpForLevel(state.level)) {
      state.xp -= xpForLevel(state.level);
      state.level++;
      leveledUp = true;
    }
    save(state);
    return leveledUp;
  }

  function completeMission(state, missionId, xp) {
    if (!state.completedMissions.includes(missionId)) {
      state.completedMissions.push(missionId);
    }
    const leveledUp = addXp(state, xp);
    save(state);
    return leveledUp;
  }

  return { load, save, xpForLevel, addXp, completeMission };
})();
