const { grow } = require('../spiral/spiral_core.js');
const { split } = require('../prism/prism_split.js');
async function run() {
  console.log('Labyrinth Terminal online…\n');
  console.log('Spiral:', grow(0));
  console.log('Prism:', split(0));
}
if (require.main === module) run();
