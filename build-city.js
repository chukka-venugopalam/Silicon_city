const fs = require('fs');
const path = require('path');

console.log(`\n🧹 Sweeping the components directory...\n`);

for (let i = 1; i <= 7; i++) {
  const compActDir = path.join(__dirname, 'components', `act-${i}`);

  if (fs.existsSync(compActDir)) {
    fs.rmSync(compActDir, { recursive: true, force: true });
    console.log(`🗑️ Nuked clutter: /components/act-${i}`);
  }
}

console.log(`\n✅ Workspace clean! Your app routes and UI components were untouched.\n`);