/* ==========================================================================
   EvoGames — Gene Pool: Simulation Engine
   A real (simplified) model of natural selection:
   - Each creature has 6 heritable traits (0..1)
   - Traits carry survival benefits AND energy costs (real trade-offs)
   - Environment (temperature, food, toxin, predators) applies selection
     pressure — creatures that survive & gather enough energy reproduce
   - Offspring inherit a blend of parent genes + random mutation
   - No designer: the player only shapes the environment
   ========================================================================== */

const TRAITS = ['speed', 'size', 'camo', 'insulation', 'toxinRes', 'fertility'];

function clamp01(v) { return Math.max(0, Math.min(1, v)); }
function rand(min, max) { return min + Math.random() * (max - min); }
function randInt(min, max) { return Math.floor(rand(min, max + 1)); }
function choice(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

/* ---------------------------------------------------------------------- */
/*  Creature                                                              */
/* ---------------------------------------------------------------------- */
class Creature {
  constructor(genes, x, y, generation, parentIds = []) {
    this.id = Creature._nextId++;
    this.genes = genes; // {speed, size, camo, insulation, toxinRes, fertility}
    this.x = x; this.y = y;
    this.vx = rand(-1, 1); this.vy = rand(-1, 1);
    this.generation = generation;
    this.parentIds = parentIds;
    this.age = 0;
    this.energy = 55 + rand(-10, 10);
    this.alive = true;
    this.targetFood = null;
    this.wobble = rand(0, Math.PI * 2);
    this.deathCause = null;
    this.childCount = 0;
  }

  static _nextId = 1;

  get radius() {
    return 5 + this.genes.size * 9; // 5..14 px
  }

  get maxSpeed() {
    // larger creatures are slower; speed gene raises top speed
    return (0.55 + this.genes.speed * 1.9) * (1 - this.genes.size * 0.28);
  }

  // Energy upkeep per tick — every trait that helps survival also costs energy.
  get upkeep() {
    let cost = 0.048; // base metabolism
    cost += this.genes.speed * 0.05;
    cost += this.genes.size * 0.045;
    cost += this.genes.insulation * 0.03;
    cost += this.genes.toxinRes * 0.026;
    cost += this.genes.fertility * 0.032;
    // camo is nearly free (low metabolic cost) — a deliberate balance choice
    cost += this.genes.camo * 0.008;
    return cost;
  }

  get reproductionThreshold() {
    // fertile creatures need less banked energy to reproduce
    return 100 - this.genes.fertility * 28;
  }

  fitnessScore(env) {
    // A rough composite score for UI/mission purposes (0..100)
    let s = 0;
    const cold = 1 - env.temperature;
    const coldFit = 1 - Math.max(0, cold - this.genes.insulation);
    s += coldFit * 22;
    s += this.genes.camo * (env.predatorActive ? 26 : 8);
    s += this.genes.toxinRes * (env.toxinLevel * 30);
    s += this.genes.speed * (env.predatorActive ? 14 : 6);
    s += (1 - Math.abs(0.5 - this.genes.size)) * 10;
    s += this.genes.fertility * 10;
    return clamp01(s / 100) * 100;
  }
}

/* ---------------------------------------------------------------------- */
/*  Food pellet                                                           */
/* ---------------------------------------------------------------------- */
class Food {
  constructor(x, y) { this.x = x; this.y = y; this.eaten = false; this.r = 3.4; }
}

/* ---------------------------------------------------------------------- */
/*  Predator                                                              */
/* ---------------------------------------------------------------------- */
class Predator {
  constructor(x, y) {
    this.x = x; this.y = y;
    this.vx = rand(-1, 1); this.vy = rand(-1, 1);
    this.target = null;
    this.cooldown = 0;
  }
}

/* ---------------------------------------------------------------------- */
/*  Simulation                                                            */
/* ---------------------------------------------------------------------- */
class Simulation {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.generation = 1;
    this.tick = 0;
    this.creatures = [];
    this.food = [];
    this.predators = [];
    this.events = [];
    this.env = {
      temperature: 0.5,     // 0 = cold, 1 = hot; creature.insulation should match
      foodAbundance: 0.65,  // 0..1 controls spawn rate
      toxinLevel: 0,        // 0..1
      predatorActive: false,
    };
    this.speedMultiplier = 1;
    this.paused = true;
    this.stats = { born: 0, died: 0, eaten: 0, starved: 0, cold: 0, toxin: 0, oldAge: 0 };
    this.onEvent = null;
    this.onGeneration = null;
    this.history = []; // per-generation snapshots for charts

    this._foodSpawnAcc = 0;
    this._genTimer = 0;
    this._genTickLength = 320; // ticks per generation "epoch" marker
  }

  log(key, data = {}) {
    const entry = { key, data, t: this.tick };
    this.events.unshift(entry);
    if (this.events.length > 60) this.events.pop();
    if (this.onEvent) this.onEvent(entry);
  }

  seedPopulation(n = 24) {
    this.creatures = [];
    Creature._nextId = 1;
    for (let i = 0; i < n; i++) {
      const genes = {};
      TRAITS.forEach(t => genes[t] = rand(0.15, 0.85));
      const c = new Creature(genes, rand(40, this.width - 40), rand(40, this.height - 40), 1);
      this.creatures.push(c);
    }
    this.generation = 1;
    this.tick = 0;
    this.food = [];
    this.predators = [];
    this.stats = { born: 0, died: 0, eaten: 0, starved: 0, cold: 0, toxin: 0, oldAge: 0 };
    this.history = [];
    this._recordHistory();
  }

  addPredator() {
    this.predators.push(new Predator(rand(40, this.width - 40), rand(40, this.height - 40)));
    this.env.predatorActive = true;
  }

  removeAllPredators() {
    this.predators = [];
    this.env.predatorActive = false;
  }

  _recordHistory() {
    const avg = (key) => this.creatures.length
      ? this.creatures.reduce((s, c) => s + c.genes[key], 0) / this.creatures.length
      : 0;
    const snap = { generation: this.generation, population: this.creatures.length };
    TRAITS.forEach(t => snap[t] = avg(t));
    this.history.push(snap);
    if (this.history.length > 200) this.history.shift();
  }

  avgTrait(key) {
    if (!this.creatures.length) return 0;
    return this.creatures.reduce((s, c) => s + c.genes[key], 0) / this.creatures.length;
  }

  avgFitness() {
    if (!this.creatures.length) return 0;
    return this.creatures.reduce((s, c) => s + c.fitnessScore(this.env), 0) / this.creatures.length;
  }

  step(dt = 1) {
    if (this.paused) return;
    for (let s = 0; s < this.speedMultiplier; s++) this._stepOnce();
  }

  _stepOnce() {
    this.tick++;
    this._spawnFood();
    this._updateCreatures();
    this._updatePredators();
    this._cullDead();
    this._checkGenerationAdvance();
  }

  _spawnFood() {
    const rate = 0.12 + this.env.foodAbundance * 0.55;
    this._foodSpawnAcc += rate;
    while (this._foodSpawnAcc >= 1 && this.food.length < 140) {
      this._foodSpawnAcc -= 1;
      this.food.push(new Food(rand(20, this.width - 20), rand(20, this.height - 20)));
    }
  }

  _nearestFood(c) {
    let best = null, bestD = Infinity;
    for (const f of this.food) {
      if (f.eaten) continue;
      const d = (f.x - c.x) ** 2 + (f.y - c.y) ** 2;
      if (d < bestD) { bestD = d; best = f; }
    }
    return best;
  }

  _nearestPredator(c) {
    let best = null, bestD = Infinity;
    for (const p of this.predators) {
      const d = (p.x - c.x) ** 2 + (p.y - c.y) ** 2;
      if (d < bestD) { bestD = d; best = p; }
    }
    return best;
  }

  _updateCreatures() {
    const list = this.creatures;
    for (const c of list) {
      if (!c.alive) continue;
      c.age++;
      c.wobble += 0.09;

      // --- seek food ---
      const f = this._nearestFood(c);
      let dirX = Math.cos(c.wobble) * 0.15, dirY = Math.sin(c.wobble * 0.7) * 0.15;
      if (f) {
        const dx = f.x - c.x, dy = f.y - c.y;
        const d = Math.hypot(dx, dy) || 1;
        dirX = dx / d; dirY = dy / d;
        if (d < c.radius + f.r + 2) {
          f.eaten = true;
          c.energy += 26;
        }
      }

      // --- flee predator (camo reduces detection range; speed helps flee) ---
      const pred = this._nearestPredator(c);
      if (pred) {
        const dx = pred.x - c.x, dy = pred.y - c.y;
        const d = Math.hypot(dx, dy) || 1;
        const detectRange = 140 * (1 - c.genes.camo * 0.72);
        if (d < detectRange) {
          dirX = -dx / d; dirY = -dy / d;
        }
      }

      const sp = c.maxSpeed;
      c.vx = c.vx * 0.82 + dirX * sp * 0.4;
      c.vy = c.vy * 0.82 + dirY * sp * 0.4;
      const vmag = Math.hypot(c.vx, c.vy) || 1;
      if (vmag > sp) { c.vx = (c.vx / vmag) * sp; c.vy = (c.vy / vmag) * sp; }

      c.x += c.vx;
      c.y += c.vy;
      if (c.x < c.radius) { c.x = c.radius; c.vx *= -1; }
      if (c.x > this.width - c.radius) { c.x = this.width - c.radius; c.vx *= -1; }
      if (c.y < c.radius) { c.y = c.radius; c.vy *= -1; }
      if (c.y > this.height - c.radius) { c.y = this.height - c.radius; c.vy *= -1; }

      // --- energy upkeep ---
      c.energy -= c.upkeep;

      // --- temperature mismatch penalty ---
      // insulation represents cold tolerance: high insulation protects against
      // cold environments (low temperature); it does nothing to help in heat,
      // and in very hot environments it becomes a mild liability (overheating).
      const cold = 1 - this.env.temperature; // 0 = hot, 1 = cold
      const coldPenalty = Math.max(0, cold - c.genes.insulation) * 1.05;
      const heatPenalty = this.env.temperature > 0.72 ? (this.env.temperature - 0.72) * (0.5 + c.genes.insulation * 0.8) * 2.2 : 0;
      c.energy -= coldPenalty + heatPenalty;

      // --- toxin risk ---
      if (this.env.toxinLevel > 0) {
        const risk = this.env.toxinLevel * (1 - c.genes.toxinRes) * 0.014;
        if (Math.random() < risk) {
          c.alive = false; c.deathCause = 'toxin';
        }
      }

      // --- death checks ---
      if (c.energy <= 0) { c.alive = false; c.deathCause = 'starved'; }
      if (c.age > 2600 && Math.random() < 0.004) { c.alive = false; c.deathCause = 'oldAge'; }

      // --- reproduction ---
      if (c.alive && c.energy >= c.reproductionThreshold && list.length < 160) {
        c.energy -= c.reproductionThreshold * 0.62;
        const mate = this._findMate(c);
        const child = this._reproduce(c, mate);
        list.push(child);
        c.childCount++;
        this.stats.born++;
      }
    }
  }

  _findMate(c) {
    // simple: nearest other creature within radius, else asexual w/ self-mutation
    let best = null, bestD = 5000 ** 2;
    for (const o of this.creatures) {
      if (o === c || !o.alive) continue;
      const d = (o.x - c.x) ** 2 + (o.y - c.y) ** 2;
      if (d < bestD) { bestD = d; best = o; }
    }
    return best;
  }

  _reproduce(a, b) {
    const genes = {};
    const MUT_RATE = 0.14, MUT_STRENGTH = 0.12;
    TRAITS.forEach(t => {
      const g1 = a.genes[t];
      const g2 = b ? b.genes[t] : a.genes[t];
      let v = (g1 + g2) / 2 + rand(-0.03, 0.03); // blend + micro noise
      if (Math.random() < MUT_RATE) {
        v += rand(-MUT_STRENGTH, MUT_STRENGTH) * (Math.random() < 0.08 ? 3 : 1); // rare big mutation
      }
      genes[t] = clamp01(v);
    });
    const child = new Creature(
      genes,
      clamp01((a.x + rand(-14, 14)) / this.width) * this.width,
      clamp01((a.y + rand(-14, 14)) / this.height) * this.height,
      this.generation + 1,
      b ? [a.id, b.id] : [a.id]
    );
    return child;
  }

  _updatePredators() {
    for (const p of this.predators) {
      let target = p.target;
      if (!target || !target.alive) {
        // pick nearest visible (low-camo) creature
        let best = null, bestScore = Infinity;
        for (const c of this.creatures) {
          if (!c.alive) continue;
          const d = Math.hypot(c.x - p.x, c.y - p.y);
          const visibility = 1 - c.genes.camo * 0.75;
          const score = d / Math.max(0.2, visibility);
          if (score < bestScore) { bestScore = score; best = c; }
        }
        target = best;
        p.target = target;
      }
      if (target && target.alive) {
        const dx = target.x - p.x, dy = target.y - p.y;
        const d = Math.hypot(dx, dy) || 1;
        const predSpeed = 1.55;
        p.vx = (dx / d) * predSpeed;
        p.vy = (dy / d) * predSpeed;
        p.x += p.vx; p.y += p.vy;
        if (d < target.radius + 9 && p.cooldown <= 0) {
          // catch chance depends on target speed & size (bigger = easier to catch, slower = easier)
          const catchChance = 0.55 + (1 - target.genes.speed) * 0.3 - target.genes.size * 0.08;
          if (Math.random() < catchChance) {
            target.alive = false;
            target.deathCause = 'eaten';
            p.target = null;
            p.cooldown = 40;
          }
        }
      } else {
        p.x += Math.cos(this.tick * 0.01 + p.x) * 0.6;
        p.y += Math.sin(this.tick * 0.013 + p.y) * 0.6;
      }
      p.x = Math.max(10, Math.min(this.width - 10, p.x));
      p.y = Math.max(10, Math.min(this.height - 10, p.y));
      if (p.cooldown > 0) p.cooldown--;
    }
  }

  _cullDead() {
    const before = this.creatures.length;
    for (const c of this.creatures) {
      if (!c.alive) {
        this.stats.died++;
        if (c.deathCause) this.stats[c.deathCause] = (this.stats[c.deathCause] || 0) + 1;
      }
    }
    this.creatures = this.creatures.filter(c => c.alive);
    this.food = this.food.filter(f => !f.eaten);
  }

  _checkGenerationAdvance() {
    this._genTimer++;
    if (this._genTimer >= this._genTickLength) {
      this._genTimer = 0;
      this.generation++;
      this._recordHistory();
      if (this.onGeneration) this.onGeneration(this.generation);
    }
  }

  triggerMeteor() {
    // extinction-level event: kill ~85% at random, biased slightly against low toxinRes/insulation
    const survivors = [];
    for (const c of this.creatures) {
      const resilience = (c.genes.toxinRes + c.genes.insulation) / 2;
      const surviveChance = 0.06 + resilience * 0.22;
      if (Math.random() < surviveChance) survivors.push(c);
    }
    const killed = this.creatures.length - survivors.length;
    this.creatures = survivors;
    this.log('meteor', { killed, survived: survivors.length });
    return { killed, survived: survivors.length };
  }
}
