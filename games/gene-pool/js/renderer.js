/* ==========================================================================
   EvoGames — Gene Pool: Canvas Renderer
   Renders creatures as soft organic blobs colored by trait genetics,
   food as glowing spores, predators as sharp angular shapes.
   ========================================================================== */

class Renderer {
  constructor(canvas, sim) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.sim = sim;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.selectedId = null;
    this.hoveredId = null;
    this._resizeObserver = new ResizeObserver(() => this.resize());
    this._resizeObserver.observe(canvas.parentElement);
    this.resize();
    this._particles = []; // ephemeral effects: birth sparkle, death puff
  }

  resize() {
    const wrap = this.canvas.parentElement;
    const w = wrap.clientWidth, h = wrap.clientHeight;
    this.canvas.width = w * this.dpr;
    this.canvas.height = h * this.dpr;
    this.canvas.style.width = w + 'px';
    this.canvas.style.height = h + 'px';
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    this.sim.width = w;
    this.sim.height = h;
  }

  isLight() {
    return document.documentElement.getAttribute('data-theme') === 'light';
  }

  traitColor(genes) {
    const r = 60 + genes.toxinRes * 170 + genes.insulation * 40;
    const g = 140 + genes.camo * 100 - genes.toxinRes * 40;
    const b = 90 + genes.speed * 120 + genes.insulation * 60;
    return `rgb(${Math.min(255,r)|0}, ${Math.min(255,g)|0}, ${Math.min(255,b)|0})`;
  }

  addBirthEffect(x, y, color) {
    this._particles.push({ type: 'birth', x, y, life: 1, color });
  }
  addDeathEffect(x, y, cause) {
    const color = cause === 'eaten' ? '#e8735c' : cause === 'toxin' ? '#b18ce8' : '#5a6d5f';
    this._particles.push({ type: 'death', x, y, life: 1, color, n: 6 + Math.random()*4 });
  }

  draw() {
    const { ctx, sim } = this;
    const w = this.canvas.clientWidth, h = this.canvas.clientHeight;
    ctx.clearRect(0, 0, w, h);

    for (const f of sim.food) this._drawFood(f);
    for (const c of sim.creatures) this._drawCreature(c);
    for (const p of sim.predators) this._drawPredator(p);
    this._drawParticles();
  }

  _drawFood(f) {
    const { ctx } = this;
    const light = this.isLight();
    ctx.save();
    ctx.globalAlpha = 0.85;
    const grad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r * 2.4);
    grad.addColorStop(0, light ? 'rgba(45,138,95,0.9)' : 'rgba(127,224,168,0.95)');
    grad.addColorStop(1, 'rgba(127,224,168,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(f.x, f.y, f.r * 2.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = light ? '#2d8a5f' : '#c8f5da';
    ctx.beginPath();
    ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  _drawCreature(c) {
    const { ctx, sim } = this;
    const isSelected = c.id === this.selectedId;
    const isHovered = c.id === this.hoveredId;
    const color = this.traitColor(c.genes);
    const r = c.radius;

    ctx.save();
    ctx.translate(c.x, c.y);
    const angle = Math.atan2(c.vy, c.vx);
    ctx.rotate(angle);

    let alpha = 1;
    if (sim.env.predatorActive) {
      alpha = 0.45 + (1 - c.genes.camo) * 0.55;
    }
    ctx.globalAlpha = alpha;

    if (isSelected || isHovered) {
      ctx.shadowColor = color;
      ctx.shadowBlur = isSelected ? 22 : 12;
    }

    const stretch = 1 + c.genes.speed * 0.35;
    ctx.beginPath();
    ctx.ellipse(0, 0, r * stretch, r * (1 - c.genes.speed * 0.12), 0, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();

    if (c.genes.insulation > 0.4) {
      ctx.globalAlpha = alpha * 0.5;
      ctx.strokeStyle = color;
      ctx.lineWidth = 2 + c.genes.insulation * 3;
      ctx.beginPath();
      ctx.ellipse(0, 0, r * stretch + 2, r * 0.9 + 2, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = alpha;
    }

    if (c.genes.toxinRes > 0.5) {
      ctx.fillStyle = 'rgba(255,255,255,0.55)';
      for (let i = 0; i < 3; i++) {
        const a = (i - 1) * 0.7;
        ctx.beginPath();
        ctx.arc(Math.cos(a) * r * 0.4, Math.sin(a) * r * 0.4, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.fillStyle = 'rgba(10,15,12,0.75)';
    ctx.beginPath();
    ctx.arc(r * stretch * 0.42, -r * 0.18, Math.max(1.4, r * 0.16), 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    if (isSelected) {
      ctx.save();
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.6;
      ctx.setLineDash([3, 4]);
      ctx.beginPath();
      ctx.arc(c.x, c.y, r + 9, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
  }

  _drawPredator(p) {
    const { ctx } = this;
    ctx.save();
    ctx.translate(p.x, p.y);
    const angle = Math.atan2(p.vy, p.vx);
    ctx.rotate(angle);
    ctx.shadowColor = '#e8735c';
    ctx.shadowBlur = 14;
    ctx.fillStyle = '#c1462f';
    ctx.beginPath();
    ctx.moveTo(16, 0);
    ctx.lineTo(-10, -9);
    ctx.lineTo(-4, 0);
    ctx.lineTo(-10, 9);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = 'rgba(255,220,210,0.9)';
    ctx.beginPath();
    ctx.arc(6, -2, 1.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  _drawParticles() {
    const { ctx } = this;
    for (let i = this._particles.length - 1; i >= 0; i--) {
      const p = this._particles[i];
      p.life -= 0.045;
      if (p.life <= 0) { this._particles.splice(i, 1); continue; }
      ctx.save();
      if (p.type === 'birth') {
        ctx.globalAlpha = p.life;
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, (1 - p.life) * 22, 0, Math.PI * 2);
        ctx.stroke();
      } else if (p.type === 'death') {
        ctx.globalAlpha = p.life * 0.8;
        ctx.fillStyle = p.color;
        const n = p.n || 8;
        for (let k = 0; k < n; k++) {
          const a = (k / n) * Math.PI * 2;
          const dist = (1 - p.life) * 26;
          ctx.beginPath();
          ctx.arc(p.x + Math.cos(a) * dist, p.y + Math.sin(a) * dist, 2.2 * p.life, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();
    }
  }

  pickCreatureAt(x, y) {
    let best = null, bestD = Infinity;
    for (const c of this.sim.creatures) {
      const d = Math.hypot(c.x - x, c.y - y);
      if (d < c.radius + 6 && d < bestD) { bestD = d; best = c; }
    }
    return best;
  }
}
