// v2 public explainer: collage bands, HTML charts that animate in, robotaxi grid toggle. No 3D.
import { build, newsprint, setImgBase } from './collage.js?v=3';
import { LAYOUT, HEADS } from './layout.js?v=3';
import { LAYOUT2 } from './layout2.js?v=3';
import { VOT, grid, range } from './extra.js?v=3';

setImgBase('img/');
newsprint(document.querySelector('.news'), HEADS);
build({ ...LAYOUT, ...LAYOUT2 });

// waterfall bars take their start and length from data attributes
document.querySelectorAll('.wf').forEach(r => { r.style.setProperty('--s', r.dataset.s); r.style.setProperty('--v', r.dataset.v); });
document.querySelectorAll('.wf i').forEach((i, k) => { i.style.transitionDelay = `${k * 250}ms`; });
document.querySelectorAll('.tb i').forEach((i, k) => { i.style.transitionDelay = `${(k % 5) * 180}ms`; });

// robotaxi grid with a US / New York toggle
const vg = document.getElementById('votGrid');
const show = set => { vg.innerHTML = ''; grid(vg, VOT[set]); document.querySelectorAll('.toggle button').forEach(b => b.setAttribute('aria-pressed', b.dataset.set === set)); };
document.querySelectorAll('.toggle button').forEach(b => b.addEventListener('click', () => show(b.dataset.set)));
show('us');
range(document.getElementById('costRange'));

// reveal charts, dated lists and timelines as they scroll in
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .3 });
document.querySelectorAll('.wfall, .cmp, .trip, .vot, .range, .slip, .dots li').forEach(n => io.observe(n));
document.querySelectorAll('.slip li, .dots li').forEach((li, i) => { li.style.transitionDelay = `${(i % 5) * 150}ms`; });

// reading progress
const bar = document.querySelector('.progress i');
const prog = () => { bar.style.transform = `scaleX(${scrollY / (document.documentElement.scrollHeight - innerHeight)})`; };
addEventListener('scroll', prog, { passive: true }); prog();

// ?at=id jumps to a section (used to render preview stills)
const at = new URLSearchParams(location.search).get('at');
if (at) document.getElementById(at)?.scrollIntoView({ behavior: 'instant' });
