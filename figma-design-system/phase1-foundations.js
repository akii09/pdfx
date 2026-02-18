// ============================================================
// PDFX Design System - Phase 1: Pages + Foundations
// Run in Figma Scripter (figma.com/community/plugin/1190360112680668241)
// ============================================================

async function main() {

// ---- FONT LOADER ----
await figma.loadFontAsync({family:'Inter',style:'Bold'});
await figma.loadFontAsync({family:'Inter',style:'SemiBold'});
await figma.loadFontAsync({family:'Inter',style:'Medium'});
await figma.loadFontAsync({family:'Inter',style:'Regular'});

// ---- HELPERS ----
function hex(h) {
  h = h.replace('#','');
  if(h.length===3) h=h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
  const n=parseInt(h,16);
  return {r:((n>>16)&255)/255, g:((n>>8)&255)/255, b:(n&255)/255};
}
function solid(h) { return [{type:'SOLID',color:hex(h)}]; }
function txt(content, size, style, color, x, y) {
  const t = figma.createText();
  t.fontName = {family:'Inter', style};
  t.fontSize = size;
  t.characters = content;
  t.fills = solid(color);
  t.x = x; t.y = y;
  return t;
}

// ---- PAGES SETUP ----
const pg1 = figma.currentPage;
pg1.name = '🎨 Foundations';
const pg2 = figma.createPage();
pg2.name = '🧱 Components';
const pg3 = figma.createPage();
pg3.name = '📄 Templates';
figma.currentPage = pg1;

// ============================================================
// SECTION: PAGE HEADER
// ============================================================
const header = figma.createFrame();
header.name = '_Header';
header.resize(1440, 100);
header.x = 0; header.y = 0;
header.fills = solid('#0F172A');
header.cornerRadius = 16;
header.appendChild(txt('PDFX Design System', 32, 'Bold', '#FFFFFF', 48, 22));
header.appendChild(txt('🎨 Foundations  ·  Design Tokens  ·  Color Palettes  ·  Typography  ·  Spacing  ·  Page Sizes', 14, 'Regular', '#94A3B8', 48, 64));
pg1.appendChild(header);

// ============================================================
// SECTION: COLOR PALETTES (Y = 160)
// ============================================================
pg1.appendChild(txt('COLOR TOKENS', 20, 'Bold', '#0F172A', 0, 160));
pg1.appendChild(txt('Semantic color tokens for all 3 themes — maps directly to your TypeScript theme files', 13, 'Regular', '#6B7280', 0, 188));

const themes = [
  {
    name:'Professional', tag:'Times-Roman · Zinc · Business Docs', accent:'#1E3A5F',
    colors:[
      {token:'foreground',      hex:'#18181B'}, {token:'background',    hex:'#FFFFFF'},
      {token:'muted',           hex:'#F4F4F5'}, {token:'mutedForeground',hex:'#71717A'},
      {token:'primary',         hex:'#18181B'}, {token:'primaryForeground',hex:'#FAFAFA'},
      {token:'border',          hex:'#E4E4E7'}, {token:'accent',        hex:'#3B82F6'},
      {token:'destructive',     hex:'#EF4444'}, {token:'success',       hex:'#22C55E'},
      {token:'warning',         hex:'#F59E0B'}, {token:'info',          hex:'#3B82F6'},
    ]
  },
  {
    name:'Modern', tag:'Helvetica · Slate · Tech Startups', accent:'#4F46E5',
    colors:[
      {token:'foreground',      hex:'#0F172A'}, {token:'background',    hex:'#FFFFFF'},
      {token:'muted',           hex:'#F1F5F9'}, {token:'mutedForeground',hex:'#64748B'},
      {token:'primary',         hex:'#334155'}, {token:'primaryForeground',hex:'#F8FAFC'},
      {token:'border',          hex:'#E2E8F0'}, {token:'accent',        hex:'#6366F1'},
      {token:'destructive',     hex:'#EF4444'}, {token:'success',       hex:'#10B981'},
      {token:'warning',         hex:'#F59E0B'}, {token:'info',          hex:'#0EA5E9'},
    ]
  },
  {
    name:'Minimal', tag:'Courier · Zinc · Editorial / Literary', accent:'#3F3F46',
    colors:[
      {token:'foreground',      hex:'#18181B'}, {token:'background',    hex:'#FFFFFF'},
      {token:'muted',           hex:'#F4F4F5'}, {token:'mutedForeground',hex:'#A1A1AA'},
      {token:'primary',         hex:'#18181B'}, {token:'primaryForeground',hex:'#FAFAFA'},
      {token:'border',          hex:'#D4D4D8'}, {token:'accent',        hex:'#71717A'},
      {token:'destructive',     hex:'#DC2626'}, {token:'success',       hex:'#16A34A'},
      {token:'warning',         hex:'#D97706'}, {token:'info',          hex:'#2563EB'},
    ]
  }
];

themes.forEach((theme, ti) => {
  const baseX = ti * 500;
  const baseY = 220;

  const card = figma.createFrame();
  card.name = 'Colors/' + theme.name;
  card.resize(480, 540);
  card.x = baseX; card.y = baseY;
  card.fills = solid('#FFFFFF');
  card.cornerRadius = 12;
  card.strokes = solid('#E5E7EB');
  card.strokeWeight = 1;
  card.effects = [{type:'DROP_SHADOW',color:{r:0,g:0,b:0,a:0.06},offset:{x:0,y:2},radius:8,spread:0,visible:true,blendMode:'NORMAL'}];

  // Theme header bar
  const thdr = figma.createFrame();
  thdr.name = 'Header';
  thdr.resize(480, 60);
  thdr.x=0; thdr.y=0;
  thdr.fills = solid(theme.accent);
  thdr.topLeftRadius = 12; thdr.topRightRadius = 12;
  thdr.appendChild(txt(theme.name, 18, 'Bold', '#FFFFFF', 20, 12));
  thdr.appendChild(txt(theme.tag, 11, 'Regular', '#FFFFFF', 20, 38));
  card.appendChild(thdr);

  theme.colors.forEach((c, ci) => {
    const col = ci % 3;
    const row = Math.floor(ci / 3);
    const sx = 16 + col * 148;
    const sy = 76 + row * 114;

    const swatch = figma.createFrame();
    swatch.name = c.token;
    swatch.resize(136, 104);
    swatch.x = sx; swatch.y = sy;
    swatch.fills = solid('#FAFAFA');
    swatch.cornerRadius = 8;
    swatch.strokes = solid('#E5E7EB');
    swatch.strokeWeight = 1;

    const colorRect = figma.createRectangle();
    colorRect.resize(136, 60);
    colorRect.x=0; colorRect.y=0;
    colorRect.fills = solid(c.hex);
    colorRect.topLeftRadius = 8; colorRect.topRightRadius = 8;
    swatch.appendChild(colorRect);

    swatch.appendChild(txt(c.token, 9, 'SemiBold', '#111827', 8, 66));
    swatch.appendChild(txt(c.hex.toUpperCase(), 9, 'Regular', '#6B7280', 8, 80));
    card.appendChild(swatch);
  });

  pg1.appendChild(card);
});

// ============================================================
// SECTION: TYPOGRAPHY (Y = 820)
// ============================================================
const typoY = 820;
pg1.appendChild(txt('TYPOGRAPHY SCALE', 20, 'Bold', '#0F172A', 0, typoY));
pg1.appendChild(txt('Font sizes, weights, and line heights — all values in points (pt)', 13, 'Regular', '#6B7280', 0, typoY + 28));

const typoCard = figma.createFrame();
typoCard.name = 'Typography/Scale';
typoCard.resize(1440, 520);
typoCard.x = 0; typoCard.y = typoY + 64;
typoCard.fills = solid('#FFFFFF');
typoCard.cornerRadius = 12;
typoCard.strokes = solid('#E5E7EB');
typoCard.strokeWeight = 1;

// Column headers
const colHeaders = ['Token', 'Size (pt)', 'Line Height', 'Weight', 'Usage', 'Example'];
const colX = [24, 140, 240, 340, 440, 640];
colHeaders.forEach((h, i) => {
  typoCard.appendChild(txt(h, 11, 'SemiBold', '#6B7280', colX[i], 16));
});

// Divider
const divLine = figma.createRectangle();
divLine.resize(1392, 1);
divLine.x = 24; divLine.y = 38;
divLine.fills = solid('#E5E7EB');
typoCard.appendChild(divLine);

const typeScale = [
  {token:'3xl', size:36, lh:1.2, weight:'Bold',    usage:'Document Title / H1',    example:'Document Title'},
  {token:'2xl', size:28, lh:1.25,weight:'Bold',    usage:'Section Header / H2',    example:'Section Header'},
  {token:'xl',  size:22, lh:1.3, weight:'SemiBold',usage:'Subsection / H3',        example:'Subsection Title'},
  {token:'lg',  size:18, lh:1.35,weight:'SemiBold',usage:'Sub-subsection / H4',    example:'Sub-subsection'},
  {token:'md',  size:14, lh:1.4, weight:'Medium',  usage:'Label / H5',             example:'Section Label'},
  {token:'sm',  size:12, lh:1.4, weight:'Medium',  usage:'H6 / Small Header',      example:'Small Header'},
  {token:'base',size:11, lh:1.6, weight:'Regular', usage:'Body Text (sweet spot)',  example:'Body text — the standard for professional PDF documents.'},
  {token:'xs',  size:10, lh:1.5, weight:'Regular', usage:'Caption / Footnote',     example:'Caption, footnote, or fine print text'},
  {token:'2xs', size:8,  lh:1.4, weight:'Regular', usage:'Legal Fine Print',       example:'Legal fine print, disclaimers, terms'},
];

typeScale.forEach((row, ri) => {
  const ry = 50 + ri * 52;
  const bg = ri % 2 === 0 ? '#FAFAFA' : '#FFFFFF';
  const rowBg = figma.createRectangle();
  rowBg.resize(1392, 50);
  rowBg.x = 24; rowBg.y = ry - 8;
  rowBg.fills = solid(bg);
  rowBg.cornerRadius = 4;
  typoCard.appendChild(rowBg);

  typoCard.appendChild(txt(row.token, 11, 'SemiBold', '#0F172A', colX[0], ry + 4));

  // Size pill
  const pill = figma.createFrame();
  pill.name = 'pill';
  pill.resize(56, 24);
  pill.x = colX[1]; pill.y = ry;
  pill.fills = solid('#EEF2FF');
  pill.cornerRadius = 6;
  pill.appendChild(txt(row.size + 'pt', 10, 'SemiBold', '#4F46E5', 8, 5));
  typoCard.appendChild(pill);

  typoCard.appendChild(txt(row.lh + 'x', 11, 'Regular', '#374151', colX[2], ry + 4));
  typoCard.appendChild(txt(row.weight, 11, 'Regular', '#374151', colX[3], ry + 4));
  typoCard.appendChild(txt(row.usage, 11, 'Regular', '#374151', colX[4], ry + 4));
  typoCard.appendChild(txt(row.example, Math.min(row.size, 14), row.weight, '#111827', colX[5], ry - 2));
});

pg1.appendChild(typoCard);

// ============================================================
// SECTION: SPACING SCALE (Y = 1420)
// ============================================================
const spacingY = 1420;
pg1.appendChild(txt('SPACING SCALE', 20, 'Bold', '#0F172A', 0, spacingY));
pg1.appendChild(txt('4pt base grid — consistent across all components and layouts', 13, 'Regular', '#6B7280', 0, spacingY + 28));

const spacingCard = figma.createFrame();
spacingCard.name = 'Spacing/Scale';
spacingCard.resize(1440, 200);
spacingCard.x = 0; spacingCard.y = spacingY + 64;
spacingCard.fills = solid('#FFFFFF');
spacingCard.cornerRadius = 12;
spacingCard.strokes = solid('#E5E7EB');
spacingCard.strokeWeight = 1;

const spacings = [
  {token:'0',  val:0},  {token:'0.5',val:2},  {token:'1', val:4},
  {token:'2',  val:8},  {token:'3',  val:12}, {token:'4', val:16},
  {token:'5',  val:20}, {token:'6',  val:24}, {token:'8', val:32},
  {token:'10', val:40}, {token:'12', val:48}, {token:'16',val:64},
];

spacings.forEach((s, si) => {
  const sx = 24 + si * 116;
  spacingCard.appendChild(txt(s.token, 10, 'SemiBold', '#374151', sx, 16));
  spacingCard.appendChild(txt(s.val + 'pt', 10, 'Regular', '#6B7280', sx, 32));

  if(s.val > 0) {
    const bar = figma.createRectangle();
    bar.resize(Math.min(s.val * 1.5, 100), 16);
    bar.x = sx; bar.y = 54;
    bar.fills = solid('#C7D2FE');
    bar.cornerRadius = 3;
    spacingCard.appendChild(bar);
  }

  const box = figma.createRectangle();
  box.resize(Math.max(s.val, 4), Math.max(s.val, 4));
  box.x = sx; box.y = 90;
  box.fills = solid('#6366F1');
  box.opacity = 0.15;
  spacingCard.appendChild(box);
});

pg1.appendChild(spacingCard);

// ============================================================
// SECTION: BORDER RADIUS (Y = 1700)
// ============================================================
const radY = 1700;
pg1.appendChild(txt('BORDER RADIUS', 20, 'Bold', '#0F172A', 0, radY));
pg1.appendChild(txt('PDF-compatible radius values — used for cards, badges, callouts', 13, 'Regular', '#6B7280', 0, radY + 28));

const radCard = figma.createFrame();
radCard.name = 'Radius/Scale';
radCard.resize(860, 160);
radCard.x = 0; radCard.y = radY + 64;
radCard.fills = solid('#FFFFFF');
radCard.cornerRadius = 12;
radCard.strokes = solid('#E5E7EB');
radCard.strokeWeight = 1;

const radii = [
  {name:'none',val:0}, {name:'sm',val:2}, {name:'md',val:4},
  {name:'lg',val:8},   {name:'xl',val:12},{name:'full',val:9999}
];

radii.forEach((r, ri) => {
  const rx = 24 + ri * 136;
  const box = figma.createRectangle();
  box.resize(80, 80);
  box.x = rx; box.y = 20;
  box.fills = solid('#EEF2FF');
  box.strokes = solid('#6366F1');
  box.strokeWeight = 1.5;
  box.cornerRadius = Math.min(r.val, 40);
  radCard.appendChild(box);
  radCard.appendChild(txt(r.name, 11, 'SemiBold', '#374151', rx, 110));
  radCard.appendChild(txt(r.val === 9999 ? '9999' : r.val + 'pt', 10, 'Regular', '#6B7280', rx, 126));
});

pg1.appendChild(radCard);

// ============================================================
// SECTION: PAGE SIZES (Y = 1940)
// ============================================================
const pagesY = 1940;
pg1.appendChild(txt('PDF PAGE SIZES', 20, 'Bold', '#0F172A', 0, pagesY));
pg1.appendChild(txt('Standard paper sizes in points (pt) — 1pt = 1/72 inch. Portrait and landscape variants shown at 25% scale.', 13, 'Regular', '#6B7280', 0, pagesY + 28));

const pageSizes = [
  {name:'A4',      w:595, h:842,  common:true},
  {name:'A4 Land', w:842, h:595,  common:false},
  {name:'A3',      w:841, h:1191, common:false},
  {name:'A5',      w:420, h:595,  common:false},
  {name:'Letter',  w:612, h:792,  common:true},
  {name:'Letter L',w:792, h:612,  common:false},
  {name:'Legal',   w:612, h:1008, common:false},
  {name:'Tabloid', w:792, h:1224, common:false},
  {name:'B5',      w:501, h:709,  common:false},
  {name:'Executive',w:522,h:756,  common:false},
];

const SCALE = 0.22;
let pageX = 0;

pageSizes.forEach((ps, pi) => {
  const pw = Math.round(ps.w * SCALE);
  const ph = Math.round(ps.h * SCALE);
  const frame = figma.createFrame();
  frame.name = 'PageSize/' + ps.name;
  frame.resize(pw, ph);
  frame.x = pageX; frame.y = pagesY + 64;
  frame.fills = solid('#FFFFFF');
  frame.strokes = solid(ps.common ? '#6366F1' : '#CBD5E1');
  frame.strokeWeight = ps.common ? 2 : 1;
  frame.effects = [{type:'DROP_SHADOW',color:{r:0,g:0,b:0,a:0.08},offset:{x:0,y:2},radius:6,spread:0,visible:true,blendMode:'NORMAL'}];

  // Page name
  const nameT = figma.createText();
  nameT.fontName = {family:'Inter',style:'Bold'};
  nameT.fontSize = 9;
  nameT.characters = ps.name;
  nameT.fills = solid(ps.common ? '#4F46E5' : '#374151');
  nameT.x = 6; nameT.y = 6;
  frame.appendChild(nameT);

  // Dimensions
  const dimT = figma.createText();
  dimT.fontName = {family:'Inter',style:'Regular'};
  dimT.fontSize = 8;
  dimT.characters = ps.w + '×' + ps.h + 'pt';
  dimT.fills = solid('#9CA3AF');
  dimT.x = 6; dimT.y = ph - 18;
  frame.appendChild(dimT);

  // Margin guide (simulated 40pt margin)
  const marg = Math.round(40 * SCALE);
  const marginRect = figma.createRectangle();
  marginRect.resize(pw - marg*2, ph - marg*2);
  marginRect.x = marg; marginRect.y = marg;
  marginRect.fills = [];
  marginRect.strokes = solid('#E0E7FF');
  marginRect.strokeWeight = 1;
  marginRect.dashPattern = [3, 3];
  frame.appendChild(marginRect);

  pg1.appendChild(frame);
  pageX += pw + 24;
});

print('✅ Phase 1 complete! Pages, Colors, Typography, Spacing, Radius, Page Sizes all done.');
print('👉 Next: Run phase2-components.js');

} // end main

main().catch(e => print('❌ Error: ' + e.message));
