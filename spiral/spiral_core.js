/**
 * Auric Labyrinth — Spiral Core
 * Golden-ratio growth and mutation tracking.
 */
const fs = require('fs');
const path = require('path');
const CONFIG = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'auric.config'), 'utf8'));
const PAT_DIR = path.join(__dirname, 'growth_patterns');

function loadPatterns() {
  return fs.readdirSync(PAT_DIR).filter(f => f.endsWith('.sp')).map(f => {
    const txt = fs.readFileSync(path.join(PAT_DIR, f), 'utf8');
    const amp = parseFloat((txt.match(/amplitude:\s*([\d.]+)/) || [])[1] || 0.5);
    const turns = parseInt((txt.match(/turns:\s*(\d+)/) || [])[1] || 3);
    return { file: f, amp, turns };
  });
}

function grow(tick = 0) {
  const patterns = loadPatterns();
  const phi = CONFIG.spiral.phi;
  const radius = Math.pow(phi, tick * 0.1) * 0.3;
  const avgAmp = patterns.reduce((s, p) => s + p.amp, 0) / patterns.length;
  const stability = Math.max(0, 1 - CONFIG.spiral.mutation_rate * tick * 0.05);
  console.log(`[spiral] tick=${String(tick).padStart(2)}  radius=${radius.toFixed(3)}  amp=${avgAmp.toFixed(3)}  stability=${stability.toFixed(3)}`);
  return { radius: +radius.toFixed(3), avgAmp: +avgAmp.toFixed(3), stability: +stability.toFixed(3), patterns: patterns.length };
}

module.exports = { grow, loadPatterns };
if (require.main === module) {
  console.log('AURIC SPIRAL online…\n');
  for (let t = 0; t < 12; t++) grow(t);
}
