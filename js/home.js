/* ==========================================================================
   EvoGames — Home Page Interactions
   Signature element: an animated phylogenetic "tree of life" that grows
   and pulses, built from organic branching SVG paths + particle nodes.
   ========================================================================== */

(function buildHeroVisual() {
  const el = document.getElementById('heroVisual');
  if (!el) return;

  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '0 0 460 460');
  svg.setAttribute('fill', 'none');

  // Branching tree-of-life generator: a root that splits recursively,
  // mimicking a phylogenetic tree, colored by lineage.
  const colors = ['var(--green-glow)', 'var(--ocean)', 'var(--amber)', 'var(--violet-mut)', 'var(--coral)'];
  let branchId = 0;
  const branches = [];
  const nodes = [];

  function grow(x, y, angle, len, depth, colorIdx) {
    if (depth > 6 || len < 14) {
      nodes.push({ x, y, depth, colorIdx });
      return;
    }
    const x2 = x + Math.cos(angle) * len;
    const y2 = y + Math.sin(angle) * len;
    branches.push({ x1: x, y1: y, x2, y2, depth, colorIdx, id: branchId++ });

    const splits = depth < 2 ? 2 : (Math.random() < 0.72 ? 2 : 1);
    for (let i = 0; i < splits; i++) {
      const spread = 0.32 + depth * 0.06;
      const newAngle = angle + (i === 0 ? -1 : 1) * (spread * (0.6 + Math.random() * 0.8));
      const newLen = len * (0.72 + Math.random() * 0.14);
      const newColor = depth >= 1 && splits === 2 ? (i === 0 ? colorIdx : (colorIdx + 1) % colors.length) : colorIdx;
      grow(x2, y2, newAngle, newLen, depth + 1, depth === 0 ? i % colors.length : newColor);
    }
  }

  grow(230, 430, -Math.PI / 2, 90, 0, 0);

  // Draw branches
  const branchGroup = document.createElementNS(NS, 'g');
  branches.forEach((b, i) => {
    const path = document.createElementNS(NS, 'line');
    path.setAttribute('x1', b.x1); path.setAttribute('y1', b.y1);
    path.setAttribute('x2', b.x2); path.setAttribute('y2', b.y2);
    path.setAttribute('stroke', colors[b.colorIdx % colors.length]);
    path.setAttribute('stroke-width', Math.max(1, 4.2 - b.depth * 0.6));
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('opacity', 0.75 - b.depth * 0.06);
    const len = Math.hypot(b.x2 - b.x1, b.y2 - b.y1);
    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;
    path.style.animation = `evoGrow 1.1s ${(b.depth * 0.13).toFixed(2)}s var(--ease-out) forwards`;
    branchGroup.appendChild(path);
  });
  svg.appendChild(branchGroup);

  // Draw leaf nodes (species endpoints)
  const nodeGroup = document.createElementNS(NS, 'g');
  nodes.forEach((n, i) => {
    const c = document.createElementNS(NS, 'circle');
    c.setAttribute('cx', n.x); c.setAttribute('cy', n.y);
    c.setAttribute('r', 5.5);
    c.setAttribute('fill', colors[n.colorIdx % colors.length]);
    c.setAttribute('opacity', 0);
    c.style.animation = `evoNodeIn 0.5s ${(0.9 + i * 0.05).toFixed(2)}s var(--ease-spring) forwards, float-y ${3 + (i % 3)}s ${(1.4 + i*0.1)}s ease-in-out infinite`;
    c.style.filter = `drop-shadow(0 0 6px ${colors[n.colorIdx % colors.length]})`;
    nodeGroup.appendChild(c);
  });
  svg.appendChild(nodeGroup);

  // inject keyframes once
  if (!document.getElementById('evoHeroKeyframes')) {
    const style = document.createElement('style');
    style.id = 'evoHeroKeyframes';
    style.textContent = `
      @keyframes evoGrow { to { stroke-dashoffset: 0; } }
      @keyframes evoNodeIn { to { opacity: 1; } }
    `;
    document.head.appendChild(style);
  }

  el.appendChild(svg);
})();

/* Mini timeline dots in the "learn teaser" card */
(function buildTeaserDots() {
  const g = document.getElementById('teaserDots');
  if (!g) return;
  const NS = 'http://www.w3.org/2000/svg';
  const colors = ['#e8b86d', '#5fb8d9', '#b18ce8', '#7fe0a8', '#e8735c', '#7fe0a8'];
  const xs = [30, 75, 120, 165, 210, 258];
  xs.forEach((x, i) => {
    const c = document.createElementNS(NS, 'circle');
    c.setAttribute('cx', x); c.setAttribute('cy', 110); c.setAttribute('r', i === xs.length - 1 ? 7 : 5);
    c.setAttribute('fill', colors[i]);
    c.style.filter = `drop-shadow(0 0 5px ${colors[i]})`;
    c.style.animation = `float-y ${2.4 + i * 0.3}s ${i * 0.15}s ease-in-out infinite`;
    g.appendChild(c);
  });
})();

/* Navbar active link on scroll for in-page anchors */
window.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.nav-link[href^="index.html#"], .nav-link[href^="#"]');
  const sections = ['games', 'about'].map(id => document.getElementById(id)).filter(Boolean);
  if (!sections.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const match = [...links].find(l => l.getAttribute('href').includes('#' + entry.target.id));
        if (match) match.classList.add('active');
      }
    });
  }, { threshold: 0.5 });
  sections.forEach(s => io.observe(s));
});
