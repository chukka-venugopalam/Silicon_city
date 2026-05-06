const fs = require('fs');
const path = require('path');
const root = process.cwd();
const dir = path.join(root, 'components', 'act-2');
const bad = 'import Act2Simulator, type { SimulatorAction, SimulatorNode } from "@/components/ui/Act2Simulator";';
const good = 'import Act2Simulator from "@/components/ui/Act2Simulator";\nimport type { SimulatorAction, SimulatorNode } from "@/components/ui/Act2Simulator";';
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.tsx'));
let changed = 0;
for (const file of files) {
  const p = path.join(dir, file);
  let text = fs.readFileSync(p, 'utf8');
  if (text.includes(bad)) {
    text = text.replace(bad, good);
    fs.writeFileSync(p, text, 'utf8');
    console.log('fixed', file);
    changed++;
  }
}
const genPath = path.join(root, 'tmp_generate_act2.js');
let gen = fs.readFileSync(genPath, 'utf8');
if (gen.includes(bad)) {
  gen = gen.replace(bad, good);
  fs.writeFileSync(genPath, gen, 'utf8');
  console.log('fixed generator');
  changed++;
}
console.log('changed', changed);
