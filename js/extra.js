// Robotaxi value-of-time grids and the upkeep cost range.
// Grid values: models/door_to_door/robotaxi_breakpoint.py, table (b), robotaxi at Waymo LV card, air at $5/pax-mi.
// null = air taxi slower door to door. Columns: pad 0.5, 2, 5 miles from each end.
const MILES = [5, 10, 15, 20, 25, 30, 40, 50, 60];
export const VOT = {
  us: [[null, null, null], [null, null, null], [329, null, null], [163, 324, null], [121, 185, 798],
       [102, 140, 320], [83, 104, 168], [75, 88, 126], [70, 80, 106]],
  nyc: [[null, null, null], [464, null, null], [97, null, null], [63, 270, null], [50, 125, null],
        [43, 86, null], [36, 59, 223], [32, 47, 115], [30, 41, 82]],
};
const cls = v => v == null ? 'k-slow' : v > 86 ? 'k-hi' : v >= 53.5 ? 'k-bus' : 'k-ok';

export function grid(el, rows) {
  const t = document.createElement('div'); t.className = 'vg';
  t.innerHTML = '<span class="h"></span>' + ['0.5 mi', '2 mi', '5 mi'].map(h => `<span class="h">${h}</span>`).join('');
  rows.forEach((r, i) => {
    t.insertAdjacentHTML('beforeend', `<span class="rl">${MILES[i]} mi</span>`);
    r.forEach((v, j) => t.insertAdjacentHTML('beforeend',
      `<span class="c ${cls(v)}" style="transition-delay:${(i * 3 + j) * 35}ms">${v == null ? 'slower' : '$' + v}</span>`));
  });
  el.append(t);
}

// Cost per passenger-mile cases from models/unit_econ.py (evidence/unit_cost/maintenance_battery.md)
const CASES = [
  [5.42, "Joby's maintenance and battery assumptions"],
  [6.74, 'Our sourced case', 'main'],
  [7.18, 'Maintenance at $200 an hour'],
  [8.28, 'Two battery packs a year'],
  [8.77, 'Maintenance at $545 an hour'],
  [10.30, 'Both at once'],
];
export function range(el) {
  el.innerHTML = CASES.map(([v, lbl, k], i) =>
    `<div class="rr ${k || ''}"><span class="rl">${lbl}</span><span class="rb"><i style="width:${(v / 10.5 * 100).toFixed(1)}%;transition-delay:${i * 110}ms"></i><b>$${v.toFixed(2)}</b></span></div>`).join('');
}

export function extras() {
  document.querySelectorAll('.vot-grid').forEach(g => grid(g, VOT[g.dataset.set]));
  const r = document.getElementById('costRange'); if (r) range(r);
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .25 });
  document.querySelectorAll('.vot, .range').forEach(n => io.observe(n));
}
