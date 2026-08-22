/**
 * Auric Labyrinth — Prism Split
 */
const fs = require('fs');
const path = require('path');
const CONFIG = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'auric.config'), 'utf8'));
const REF_DIR = path.join(__dirname, 'refractions');

function loadBranches() {
  return fs.readdirSync(REF_DIR).filter(f => f.endsWith('.pr')).map(f => {
    const txt = fs.readFileSync(path.join(REF_DIR, f), 'utf8');
    const angle = parseFloat((txt.match(/angle:\s*([\d.]+)/) || [])[1] || 0);
    const intensity = parseFloat((txt.match(/intensity:\s*([\d.]+)/) || [])[1] || 0.5);
    return { file: f, angle, intensity };
  });
}

function split(tick = 0) {
  const branches = loadBranches();
  const avgInt = branches.reduce((s, b) => s + b.intensity, 0) / branches.length;
  const spread = branches.length * CONFIG.prism.angle_step;
  console.log(`[prism] tick=${String(tick).padStart(2)}  intensity=${avgInt.toFixed(3)}  branches=${branches.length}  spread=${spread.toFixed(1)}°`);
  return { avgInt: +avgInt.toFixed(3), branches: branches.length, spread: +spread.toFixed(1) };
}

module.exports = { split, loadBranches };
if (require.main === module) {
  console.log('PRISM split online…\n');
  for (let t = 0; t < 6; t++) split(t);
}
