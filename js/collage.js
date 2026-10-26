// Collage layer: B&W photo pieces with torn edges, tape, scraps, hand-drawn circles.
// Layout lives in COLLAGE below; image credits are in img/CREDITS.md.
let BASE = 'img/';
export const setImgBase = b => { BASE = b; };
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const rnd = (() => { let a = 11; return () => { a = (a * 16807) % 2147483647; return a / 2147483647; }; })();

// torn paper: jagged polygon along chosen edges
export function tear(el, edges = 'tb', amp = 2.2) {
  const pts = [], n = 26, j = () => (rnd() * amp).toFixed(2);
  for (let i = 0; i <= n; i++) pts.push(`${(i / n * 100).toFixed(2)}% ${edges.includes('t') ? j() : 0}%`);
  for (let i = 0; i <= n; i++) pts.push(`${edges.includes('r') ? (100 - j()) : 100}% ${(i / n * 100).toFixed(2)}%`);
  for (let i = n; i >= 0; i--) pts.push(`${(i / n * 100).toFixed(2)}% ${edges.includes('b') ? (100 - j()) : 100}%`);
  for (let i = n; i >= 0; i--) pts.push(`${edges.includes('l') ? j() : 0}% ${(i / n * 100).toFixed(2)}%`);
  el.style.clipPath = `polygon(${pts.join(',')})`;
}

// hand-drawn ellipse that draws itself in
export function circle(w, h) {
  const NS = 'http://www.w3.org/2000/svg', s = document.createElementNS(NS, 'svg');
  s.setAttribute('class', 'circ'); s.setAttribute('viewBox', `0 0 ${w} ${h}`); s.style.width = w + 'px'; s.style.height = h + 'px';
  const cx = w / 2, cy = h / 2, rx = w / 2 - 4, ry = h / 2 - 4; let d = '';
  for (let i = 0; i <= 48; i++) {
    const a = -1.9 + i / 48 * Math.PI * 2.15, wob = 1 + (rnd() - .5) * .05;
    d += `${i ? 'L' : 'M'}${(cx + Math.cos(a) * rx * wob).toFixed(1)} ${(cy + Math.sin(a) * ry * wob).toFixed(1)}`;
  }
  const p = document.createElementNS(NS, 'path'); p.setAttribute('d', d); s.append(p);
  s.style.setProperty('--len', Math.ceil(Math.PI * (rx + ry) * 1.1));
  return s;
}

// piece = { img, x, y, w, h, rot, cls, cap, capTop, edges, speed, z } (x, y, w, h in % of container)
function place(host, items) {
  items.forEach((it, i) => {
    let el;
    if (it.img) {
      el = document.createElement('figure'); el.className = `ph pre ${it.cls || ''}`;
      const im = new Image(); im.src = `${BASE}${it.img}.jpg`; im.alt = ''; el.append(im);
      if (it.zoom) im.style.transform = `scale(${it.zoom})`;
      if (it.pos) im.style.objectPosition = it.pos;
      if (it.cap) { const c = document.createElement('figcaption'); c.textContent = it.cap; if (it.capTop) Object.assign(c.style, { top: '14px', bottom: 'auto' }); el.append(c); }
      if (it.edges !== '') tear(el, it.edges || 'tb', it.amp || 2.2);
    } else if (it.scrap) { el = document.createElement('div'); el.className = 'scrap ph pre'; el.textContent = it.scrap; }
    else if (it.label) { el = document.createElement('div'); el.className = 'boxlabel ph pre'; el.innerHTML = it.label; }
    else if (it.tape) { el = document.createElement('div'); el.className = `tape ph pre ${it.tape === 'c' ? 'c' : ''}`; }
    else if (it.patch) { el = document.createElement('div'); el.className = `patch ph pre ${it.patch}`; }
    else if (it.circle) { el = circle(it.circle[0], it.circle[1]); el.classList.add('ph', 'pre'); }
    else return;
    Object.assign(el.style, { left: it.x + '%', top: it.y + '%', zIndex: it.z ?? (2 + i) });
    if (it.w != null) el.style.width = it.w + '%';
    if (it.h != null) el.style.height = it.h + '%';
    el.dataset.rot = it.rot || 0; el.dataset.speed = it.speed ?? (rnd() * .16 - .08).toFixed(3);
    el.style.transform = `translateY(40px) rotate(${(it.rot || 0) * 2}deg)`;
    el.style.transitionDelay = `${i * 70}ms`;
    host.append(el);
  });
}

export function build(layout) {
  for (const [id, items] of Object.entries(layout)) {
    const host = document.getElementById(id); if (!host) continue;
    place(host, items);
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      host.querySelectorAll('.ph.pre').forEach(p => p.classList.remove('pre'));
      host.classList.add('in'); io.disconnect(); parallax();
    }), { threshold: .15 });
    io.observe(host);
  }
  addEventListener('scroll', parallax, { passive: true }); parallax();
}

function parallax() {
  document.querySelectorAll('.ph:not(.pre)').forEach(p => {
    const host = p.parentElement, r = host.getBoundingClientRect();
    const off = reduce ? 0 : (r.top + r.height / 2 - innerHeight / 2) * +p.dataset.speed;
    p.style.transform = `translateY(${off.toFixed(1)}px) rotate(${p.dataset.rot}deg)`;
  });
}

// faint newsprint behind the cover, set from the page's own sourced lines
export function newsprint(el, heads) {
  const body = [...document.querySelectorAll('.step p, .prose p, .dots p')].map(p => p.textContent.trim()).filter(Boolean);
  let html = '';
  for (let k = 0; k < 18; k++) html += `<h4>${heads[k % heads.length]}</h4><p>${body.slice(k % body.length).concat(body).slice(0, 4).join(' ')}</p>`;
  el.innerHTML = html;
}
