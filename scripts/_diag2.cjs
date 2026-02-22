#!/usr/bin/env node
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..', 'apps/www/public/r');

// FIX 1: Find Style imported but not used in body
console.log('=== FIX 1: Style import audit ===');
const comps = fs.readdirSync(root).filter(f => f.endsWith('.json') && f !== 'index.json').map(f => f.replace('.json',''));
for (const c of comps) {
  const d = JSON.parse(fs.readFileSync(path.join(root, c + '.json'), 'utf8'));
  for (const f of d.files) {
    const lines = f.content.split('\n');
    const importLineIdx = lines.findIndex(l => /\bStyle\b/.test(l) && l.trim().startsWith('import'));
    if (importLineIdx === -1) continue;
    const bodyLines = lines.filter((l, i) => i !== importLineIdx);
    const usedInBody = bodyLines.some(l => /\bStyle\b/.test(l));
    if (!usedInBody) {
      console.log('UNUSED: ' + c + '/' + path.basename(f.path));
      console.log('  import line: ' + lines[importLineIdx]);
    }
  }
}

// FIX 2: pdfx-theme-context.tsx source
console.log('\n=== FIX 2: pdfx-theme-context.tsx eslint-disable lines ===');
const ctxSrc = fs.readFileSync(path.join(__dirname, '../packages/ui/src/lib/pdfx-theme-context.tsx'), 'utf8');
ctxSrc.split('\n').forEach((l, i) => {
  if (l.includes('eslint-disable')) console.log('  line ' + (i+1) + ': ' + l.trim());
});

// FIX 3: page-break source
console.log('\n=== FIX 3: page-break.tsx lines 1-15 ===');
const pbSrc = fs.readFileSync(path.join(__dirname, '../packages/ui/src/components/page-break/page-break.tsx'), 'utf8');
pbSrc.split('\n').slice(0, 15).forEach((l, i) => console.log((i+1) + ': ' + l));

// Also check distributed page-break
console.log('\n=== FIX 3: distributed pdfx-page-break.tsx lines 1-15 ===');
const pbDist = JSON.parse(fs.readFileSync(path.join(root, 'page-break.json'), 'utf8'));
pbDist.files[0].content.split('\n').slice(0, 15).forEach((l, i) => console.log((i+1) + ': ' + l));
