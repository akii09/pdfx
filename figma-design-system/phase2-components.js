// ============================================================
// PDFX Design System - Phase 2: All Components
// Run AFTER phase1. Run in Figma Scripter.
// ============================================================

async function main() {

await figma.loadFontAsync({family:'Inter',style:'Bold'});
await figma.loadFontAsync({family:'Inter',style:'SemiBold'});
await figma.loadFontAsync({family:'Inter',style:'Medium'});
await figma.loadFontAsync({family:'Inter',style:'Regular'});

function hex(h) {
  h = h.replace('#','');
  if(h.length===3) h=h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
  const n=parseInt(h,16);
  return {r:((n>>16)&255)/255,g:((n>>8)&255)/255,b:(n&255)/255};
}
function solid(h) { return [{type:'SOLID',color:hex(h)}]; }
function txt(content, size, style, color, x, y, maxW) {
  const t = figma.createText();
  t.fontName = {family:'Inter',style};
  t.fontSize = size;
  t.characters = content;
  t.fills = solid(color);
  t.x = x; t.y = y;
  if(maxW) { t.textAutoResize = 'HEIGHT'; t.resize(maxW, t.height); }
  return t;
}
function sectionLabel(title, sub, x, y, page) {
  page.appendChild(txt(title, 20, 'Bold', '#0F172A', x, y));
  page.appendChild(txt(sub, 12, 'Regular', '#6B7280', x, y + 28));
}
function divider(x, y, w, page) {
  const r = figma.createRectangle();
  r.resize(w, 1); r.x=x; r.y=y;
  r.fills = solid('#E5E7EB');
  page.appendChild(r);
}

// Get components page
const pg = figma.root.children.find(p => p.name === '🧱 Components');
if(!pg) { print('❌ Run Phase 1 first!'); return; }
figma.currentPage = pg;

// Page header
const header = figma.createFrame();
header.name = '_Header';
header.resize(1440, 100);
header.x = 0; header.y = 0;
header.fills = solid('#0F172A');
header.cornerRadius = 16;
header.appendChild(txt('PDFX Components', 32, 'Bold', '#FFFFFF', 48, 22));
header.appendChild(txt('All UI components with variants — Typography · Layout · Data · Form · Media · Status · Document Structure', 14, 'Regular', '#94A3B8', 48, 64));
pg.appendChild(header);

let Y = 160; // current Y cursor
const GAP = 80; // gap between sections
const COMP_GAP = 24; // gap between component frames

// ============================================================
// HELPER: Component frame wrapper
// ============================================================
function compFrame(name, w, h, x, y) {
  const f = figma.createFrame();
  f.name = name;
  f.resize(w, h);
  f.x = x; f.y = y;
  f.fills = solid('#FFFFFF');
  f.cornerRadius = 8;
  f.strokes = solid('#E2E8F0');
  f.strokeWeight = 1;
  return f;
}

// ============================================================
// 1. TYPOGRAPHY COMPONENTS
// ============================================================
sectionLabel('01  TYPOGRAPHY', 'Text · Heading · Link · Label · Blockquote · List', 0, Y, pg);
Y += 56;

// --- Heading H1–H6 ---
const headingCard = compFrame('Component/Heading', 680, 360, 0, Y);
headingCard.appendChild(txt('Heading', 11, 'SemiBold', '#6366F1', 16, 12));
headingCard.appendChild(txt('H1-H6 hierarchy with theme-matched font sizes', 10, 'Regular', '#9CA3AF', 16, 28));

const hSizes = [
  {level:'H1', size:32, weight:'Bold',    color:'#0F172A'},
  {level:'H2', size:24, weight:'Bold',    color:'#0F172A'},
  {level:'H3', size:20, weight:'SemiBold',color:'#0F172A'},
  {level:'H4', size:16, weight:'SemiBold',color:'#1E293B'},
  {level:'H5', size:14, weight:'Medium',  color:'#334155'},
  {level:'H6', size:12, weight:'Medium',  color:'#475569'},
];
hSizes.forEach((h, i) => {
  const badge = figma.createFrame();
  badge.resize(28, 18); badge.x=16; badge.y=48+i*44;
  badge.fills = solid('#EEF2FF'); badge.cornerRadius=4;
  badge.appendChild(txt(h.level, 8, 'Bold', '#4F46E5', 4, 3));
  headingCard.appendChild(badge);
  headingCard.appendChild(txt('The quick brown fox jumps over the lazy dog', h.size, h.weight, h.color, 52, 44+i*44));
  headingCard.appendChild(txt(h.size+'pt · '+h.weight, 9, 'Regular', '#9CA3AF', 52, 44+i*44+h.size+2));
});
pg.appendChild(headingCard);

// --- Text Variants ---
const textCard = compFrame('Component/Text', 680, 360, 704, Y);
textCard.appendChild(txt('Text', 11, 'SemiBold', '#6366F1', 16, 12));
textCard.appendChild(txt('Body text variants with size, weight, and decoration options', 10, 'Regular', '#9CA3AF', 16, 28));

const textVariants = [
  {label:'base / Regular',    size:11, weight:'Regular',   deco:'none',         color:'#111827', text:'The standard body text for professional PDF documents. Clear and readable.'},
  {label:'base / Bold',       size:11, weight:'Bold',      deco:'none',         color:'#111827', text:'Bold body text for emphasis within a paragraph or key terms.'},
  {label:'sm / Regular',      size:10, weight:'Regular',   deco:'none',         color:'#374151', text:'Small text for captions, footnotes, and supplementary information.'},
  {label:'xs / Muted',        size:9,  weight:'Regular',   deco:'none',         color:'#9CA3AF', text:'Extra small muted text for fine print, legal disclaimers, page numbers.'},
  {label:'base / Underline',  size:11, weight:'Regular',   deco:'UNDERLINE',    color:'#2563EB', text:'Underlined text used for links and references in PDF documents.'},
  {label:'base / Strike',     size:11, weight:'Regular',   deco:'STRIKETHROUGH',color:'#6B7280', text:'Strikethrough text for deleted or cancelled content in documents.'},
];
textVariants.forEach((v, i) => {
  const ty = 48 + i * 48;
  textCard.appendChild(txt(v.label, 9, 'SemiBold', '#6B7280', 16, ty));
  const t = txt(v.text, v.size, v.weight, v.color, 16, ty + 14, 640);
  if(v.deco !== 'none') t.textDecoration = v.deco;
  textCard.appendChild(t);
});
pg.appendChild(textCard);

// --- Link ---
const linkCard = compFrame('Component/Link', 440, 180, 0, Y + 384);
linkCard.appendChild(txt('Link', 11, 'SemiBold', '#6366F1', 16, 12));
linkCard.appendChild(txt('Clickable URL, email, anchor reference', 10, 'Regular', '#9CA3AF', 16, 28));
const links = [
  {label:'Default',  color:'#2563EB', text:'https://pdfx.akashpise.dev', underline:true},
  {label:'Muted',    color:'#6B7280', text:'View full documentation →',  underline:false},
  {label:'Primary',  color:'#0F172A', text:'Download PDF report',        underline:true},
];
links.forEach((l, i) => {
  linkCard.appendChild(txt(l.label, 9, 'SemiBold', '#9CA3AF', 16, 52 + i*38));
  const lt = txt(l.text, 11, 'Regular', l.color, 80, 52+i*38);
  if(l.underline) lt.textDecoration = 'UNDERLINE';
  linkCard.appendChild(lt);
});
pg.appendChild(linkCard);

// --- List ---
const listCard = compFrame('Component/List', 440, 260, 464, Y + 384);
listCard.appendChild(txt('List', 11, 'SemiBold', '#6366F1', 16, 12));
listCard.appendChild(txt('Ordered and unordered list items', 10, 'Regular', '#9CA3AF', 16, 28));
listCard.appendChild(txt('Unordered List', 10, 'Bold', '#374151', 16, 52));
['Professional PDF components', 'Copy. Paste. Customize.', 'Three built-in themes', 'CLI for easy installation'].forEach((item, i) => {
  const dot = figma.createEllipse();
  dot.resize(5,5); dot.x=22; dot.y=70+i*22+6;
  dot.fills = solid('#6366F1');
  listCard.appendChild(dot);
  listCard.appendChild(txt(item, 11, 'Regular', '#374151', 34, 70+i*22));
});
listCard.appendChild(txt('Ordered List', 10, 'Bold', '#374151', 16, 162));
['Set up your project with CLI', 'Choose a theme preset', 'Add components as needed'].forEach((item, i) => {
  listCard.appendChild(txt((i+1)+'.', 11, 'Bold', '#6366F1', 22, 180+i*22));
  listCard.appendChild(txt(item, 11, 'Regular', '#374151', 36, 180+i*22));
});
pg.appendChild(listCard);

// --- Blockquote ---
const bqCard = compFrame('Component/Blockquote', 440, 180, 0, Y + 388 + 264);
bqCard.appendChild(txt('Blockquote', 11, 'SemiBold', '#6366F1', 16, 12));
bqCard.appendChild(txt('Pull quote or important callout text', 10, 'Regular', '#9CA3AF', 16, 28));
const bqAccent = figma.createRectangle();
bqAccent.resize(4, 80); bqAccent.x=16; bqAccent.y=52;
bqAccent.fills = solid('#6366F1'); bqAccent.cornerRadius=2;
bqCard.appendChild(bqAccent);
bqCard.appendChild(txt('"Copy. Paste. Customize. Build beautiful PDFs\nwith React components."', 13, 'SemiBold', '#0F172A', 28, 56));
bqCard.appendChild(txt('— PDFX Design System', 11, 'Regular', '#6B7280', 28, 116));
pg.appendChild(bqCard);

Y += 384 + 264 + 200 + GAP;
divider(0, Y-20, 1440, pg);

// ============================================================
// 2. LAYOUT COMPONENTS
// ============================================================
sectionLabel('02  LAYOUT', 'Stack · Section · Divider · Spacer · Grid · Box', 0, Y, pg);
Y += 56;

// --- Divider variants ---
const divCard = compFrame('Component/Divider', 680, 260, 0, Y);
divCard.appendChild(txt('Divider', 11, 'SemiBold', '#6366F1', 16, 12));
divCard.appendChild(txt('Horizontal separator — solid, dashed, dotted variants × thin, medium, thick', 10, 'Regular', '#9CA3AF', 16, 28));

const divStyles = [
  {label:'Solid / Thin',    dash:[], h:1, color:'#E5E7EB'},
  {label:'Solid / Medium',  dash:[], h:2, color:'#CBD5E1'},
  {label:'Solid / Thick',   dash:[], h:3, color:'#94A3B8'},
  {label:'Dashed / Medium', dash:[8,4], h:1.5, color:'#CBD5E1'},
  {label:'Dotted / Medium', dash:[2,4], h:1.5, color:'#CBD5E1'},
  {label:'With Label',      dash:[], h:1, color:'#E5E7EB', label:'Section Break'},
];
divStyles.forEach((d, i) => {
  const dy = 52 + i * 32;
  divCard.appendChild(txt(d.label, 9, 'Regular', '#9CA3AF', 16, dy - 2));
  const line = figma.createRectangle();
  line.resize(500, d.h); line.x = 140; line.y = dy + 4;
  line.fills = solid(d.color);
  if(d.dash.length) line.dashPattern = d.dash;
  divCard.appendChild(line);
  if(d.label) {
    const lt = txt(d.label, 9, 'Regular', '#9CA3AF', 330, dy - 4);
    const lbg = figma.createFrame();
    lbg.resize(80, 18); lbg.x=328; lbg.y=dy-2;
    lbg.fills = solid('#FFFFFF');
    divCard.appendChild(lbg);
    divCard.appendChild(lt);
  }
});
pg.appendChild(divCard);

// --- Section variants ---
const secCard = compFrame('Component/Section', 680, 300, 704, Y);
secCard.appendChild(txt('Section', 11, 'SemiBold', '#6366F1', 16, 12));
secCard.appendChild(txt('Content grouping with 4 visual variants', 10, 'Regular', '#9CA3AF', 16, 28));

const sections = [
  {label:'default',   bg:'#FFFFFF',  border:'#E5E7EB', accent:null,    text:'Default section — clean white background, subtle border'},
  {label:'callout',   bg:'#EFF6FF',  border:'#BFDBFE', accent:'#3B82F6',text:'Callout — highlighted with left accent border for important info'},
  {label:'highlight', bg:'#F9FAFB',  border:'#E5E7EB', accent:null,    text:'Highlight — muted background for secondary content areas'},
  {label:'card',      bg:'#FFFFFF',  border:'#E5E7EB', accent:null,    text:'Card — elevated style with shadow for standalone content blocks'},
];
sections.forEach((s, si) => {
  const sf = figma.createFrame();
  sf.resize(628, 52); sf.x=16; sf.y=52+si*60;
  sf.fills = solid(s.bg);
  sf.cornerRadius = 6;
  sf.strokes = solid(s.border);
  sf.strokeWeight = 1;
  if(s.label==='card') sf.effects=[{type:'DROP_SHADOW',color:{r:0,g:0,b:0,a:0.06},offset:{x:0,y:1},radius:4,spread:0,visible:true,blendMode:'NORMAL'}];
  if(s.accent) {
    const acc = figma.createRectangle();
    acc.resize(3,52); acc.x=0; acc.y=0;
    acc.fills=solid(s.accent); acc.topLeftRadius=6; acc.bottomLeftRadius=6;
    sf.appendChild(acc);
  }
  sf.appendChild(txt('['+s.label+']', 9, 'Bold', '#6B7280', s.accent?10:8, 8));
  sf.appendChild(txt(s.text, 10, 'Regular', '#374151', s.accent?10:8, 22));
  secCard.appendChild(sf);
});
pg.appendChild(secCard);

// --- Stack ---
const stackCard = compFrame('Component/Stack', 440, 280, 0, Y + 316);
stackCard.appendChild(txt('Stack', 11, 'SemiBold', '#6366F1', 16, 12));
stackCard.appendChild(txt('Flexbox layout — vertical and horizontal, gap variants', 10, 'Regular', '#9CA3AF', 16, 28));

// Vertical stack example
stackCard.appendChild(txt('Vertical Stack (gap: md)', 9, 'Bold', '#374151', 16, 52));
const vstack = figma.createFrame();
vstack.resize(120, 112); vstack.x=16; vstack.y=68;
vstack.fills=solid('#F8FAFC'); vstack.cornerRadius=6;
vstack.layoutMode='VERTICAL'; vstack.itemSpacing=12; vstack.paddingTop=12; vstack.paddingLeft=12; vstack.paddingRight=12; vstack.paddingBottom=12;
['Item 1','Item 2','Item 3'].forEach(item => {
  const box = figma.createFrame();
  box.resize(96,24); box.fills=solid('#E0E7FF'); box.cornerRadius=4;
  box.appendChild(txt(item,10,'Regular','#4F46E5',8,5));
  vstack.appendChild(box);
});
stackCard.appendChild(vstack);

// Horizontal stack example
stackCard.appendChild(txt('Horizontal Stack (gap: md)', 9, 'Bold', '#374151', 160, 52));
const hstack = figma.createFrame();
hstack.resize(264, 44); hstack.x=160; hstack.y=68;
hstack.fills=solid('#F8FAFC'); hstack.cornerRadius=6;
hstack.layoutMode='HORIZONTAL'; hstack.itemSpacing=12; hstack.paddingTop=10; hstack.paddingLeft=12; hstack.paddingRight=12; hstack.paddingBottom=10;
['Alpha','Beta','Gamma'].forEach(item => {
  const box = figma.createFrame();
  box.resize(60,24); box.fills=solid('#E0E7FF'); box.cornerRadius=4;
  box.appendChild(txt(item,10,'Regular','#4F46E5',8,5));
  hstack.appendChild(box);
});
stackCard.appendChild(hstack);

// Gap scale visual
stackCard.appendChild(txt('Gap Scale', 9, 'Bold', '#374151', 16, 200));
[{name:'none',gap:0},{name:'sm',gap:4},{name:'md',gap:8},{name:'lg',gap:16},{name:'xl',gap:24}].forEach((g,i)=>{
  const gx = 16 + i*84;
  stackCard.appendChild(txt(g.name, 9,'Regular','#6B7280',gx,218));
  const gb = figma.createRectangle();
  gb.resize(g.gap||2, 8); gb.x=gx; gb.y=234;
  gb.fills=solid('#6366F1'); gb.opacity=0.6;
  stackCard.appendChild(gb);
});
pg.appendChild(stackCard);

Y += 316 + 300 + GAP;
divider(0, Y-20, 1440, pg);

// ============================================================
// 3. DATA DISPLAY COMPONENTS
// ============================================================
sectionLabel('03  DATA DISPLAY', 'Table · DataTable · Badge · KeyValue · Stats', 0, Y, pg);
Y += 56;

// --- Table variants ---
const tableCard = compFrame('Component/Table', 680, 420, 0, Y);
tableCard.appendChild(txt('Table', 11, 'SemiBold', '#6366F1', 16, 12));
tableCard.appendChild(txt('4 variants: line, grid, minimal, striped', 10, 'Regular', '#9CA3AF', 16, 28));

// Grid table
tableCard.appendChild(txt('Variant: grid', 9, 'Bold', '#374151', 16, 48));
const cols = ['Item', 'Qty', 'Unit Price', 'Total'];
const colWidths = [200, 60, 120, 100];
const rows = [['Web Design Services', '1', '$2,400.00', '$2,400.00'], ['React Development', '40h', '$120.00', '$4,800.00'], ['PDF Template Design', '1', '$800.00', '$800.00']];
let tx = 16;
const tableStartY = 64;
cols.forEach((c, ci) => {
  const th = figma.createFrame();
  th.resize(colWidths[ci], 28); th.x=tx; th.y=tableStartY;
  th.fills=solid('#F1F5F9'); th.strokes=solid('#CBD5E1'); th.strokeWeight=1;
  th.appendChild(txt(c,10,'SemiBold','#374151',8,8));
  tableCard.appendChild(th);
  tx += colWidths[ci];
});
rows.forEach((row, ri) => {
  let cx = 16;
  row.forEach((cell, ci) => {
    const td = figma.createFrame();
    td.resize(colWidths[ci], 28); td.x=cx; td.y=tableStartY+28+ri*28;
    td.fills=solid(ri%2===0?'#FFFFFF':'#F9FAFB'); td.strokes=solid('#E5E7EB'); td.strokeWeight=1;
    td.appendChild(txt(cell,10,'Regular','#111827',8,8));
    tableCard.appendChild(td);
    cx += colWidths[ci];
  });
});

// Striped table
tableCard.appendChild(txt('Variant: striped', 9, 'Bold', '#374151', 16, 175));
let tx2 = 16;
cols.forEach((c, ci) => {
  const th = figma.createFrame();
  th.resize(colWidths[ci], 28); th.x=tx2; th.y=192;
  th.fills=solid('#0F172A');
  th.appendChild(txt(c,10,'SemiBold','#FFFFFF',8,8));
  tableCard.appendChild(th);
  tx2 += colWidths[ci];
});
rows.forEach((row, ri) => {
  let cx = 16;
  row.forEach((cell, ci) => {
    const td = figma.createFrame();
    td.resize(colWidths[ci], 28); td.x=cx; td.y=192+28+ri*28;
    td.fills=solid(ri%2===0?'#FFFFFF':'#F1F5F9');
    td.appendChild(txt(cell,10,'Regular','#111827',8,8));
    tableCard.appendChild(td);
    cx += colWidths[ci];
  });
});

// Line table
tableCard.appendChild(txt('Variant: line', 9, 'Bold', '#374151', 16, 300));
let tx3=16;
cols.forEach((c,ci) => {
  const th=figma.createFrame();
  th.resize(colWidths[ci],28); th.x=tx3; th.y=316;
  th.fills=solid('#FFFFFF');
  const bl=figma.createRectangle();
  bl.resize(colWidths[ci],2); bl.x=0; bl.y=26; bl.fills=solid('#0F172A');
  th.appendChild(bl);
  th.appendChild(txt(c,10,'SemiBold','#0F172A',8,8));
  tableCard.appendChild(th);
  tx3+=colWidths[ci];
});
rows.forEach((row,ri)=>{
  let cx=16;
  row.forEach((cell,ci)=>{
    const td=figma.createFrame();
    td.resize(colWidths[ci],28); td.x=cx; td.y=316+28+ri*28;
    td.fills=solid('#FFFFFF');
    const bl=figma.createRectangle();
    bl.resize(colWidths[ci],1); bl.x=0; bl.y=27; bl.fills=solid('#E5E7EB');
    td.appendChild(bl);
    td.appendChild(txt(cell,10,'Regular','#374151',8,8));
    tableCard.appendChild(td);
    cx+=colWidths[ci];
  });
});
pg.appendChild(tableCard);

// --- Badge ---
const badgeCard = compFrame('Component/Badge', 680, 280, 704, Y);
badgeCard.appendChild(txt('Badge', 11, 'SemiBold', '#6366F1', 16, 12));
badgeCard.appendChild(txt('Status indicators, tags, labels — 5 semantic variants', 10, 'Regular', '#9CA3AF', 16, 28));

const badges = [
  {variant:'Default',     bg:'#F1F5F9', text:'#475569', label:'Draft'},
  {variant:'Primary',     bg:'#EEF2FF', text:'#4338CA', label:'Active'},
  {variant:'Success',     bg:'#DCFCE7', text:'#15803D', label:'Paid'},
  {variant:'Warning',     bg:'#FEF3C7', text:'#B45309', label:'Pending'},
  {variant:'Destructive', bg:'#FEE2E2', text:'#B91C1C', label:'Overdue'},
  {variant:'Info',        bg:'#DBEAFE', text:'#1D4ED8', label:'Review'},
];
// Small
badgeCard.appendChild(txt('Size: sm', 9, 'Bold', '#374151', 16, 52));
badges.forEach((b, i) => {
  const bf = figma.createFrame();
  bf.resize(64, 20); bf.x=16+i*72; bf.y=68;
  bf.fills=solid(b.bg); bf.cornerRadius=4;
  bf.appendChild(txt(b.label,9,'SemiBold',b.text,8,4));
  badgeCard.appendChild(bf);
  badgeCard.appendChild(txt(b.variant,8,'Regular','#9CA3AF',16+i*72,92));
});
// Medium
badgeCard.appendChild(txt('Size: md (default)', 9, 'Bold', '#374151', 16, 116));
badges.forEach((b, i) => {
  const bf = figma.createFrame();
  bf.resize(72, 24); bf.x=16+i*80; bf.y=132;
  bf.fills=solid(b.bg); bf.cornerRadius=6;
  bf.appendChild(txt(b.label,10,'SemiBold',b.text,10,6));
  badgeCard.appendChild(bf);
});
// Pill shape
badgeCard.appendChild(txt('Shape: pill', 9, 'Bold', '#374151', 16, 172));
badges.forEach((b, i) => {
  const bf = figma.createFrame();
  bf.resize(72, 24); bf.x=16+i*80; bf.y=188;
  bf.fills=solid(b.bg); bf.cornerRadius=9999;
  bf.appendChild(txt(b.label,10,'SemiBold',b.text,10,6));
  badgeCard.appendChild(bf);
});
// Outlined
badgeCard.appendChild(txt('Style: outline', 9, 'Bold', '#374151', 16, 228));
badges.forEach((b, i) => {
  const bf = figma.createFrame();
  bf.resize(72, 24); bf.x=16+i*80; bf.y=244;
  bf.fills=[]; bf.cornerRadius=6;
  bf.strokes=solid(b.text); bf.strokeWeight=1;
  bf.appendChild(txt(b.label,10,'SemiBold',b.text,10,6));
  badgeCard.appendChild(bf);
});
pg.appendChild(badgeCard);

// --- KeyValue Pair ---
const kvCard = compFrame('Component/KeyValue', 440, 200, 0, Y + 436);
kvCard.appendChild(txt('Key-Value', 11, 'SemiBold', '#6366F1', 16, 12));
kvCard.appendChild(txt('Structured info display for invoices, profiles, specs', 10, 'Regular', '#9CA3AF', 16, 28));
const kvPairs = [
  {k:'Invoice No.', v:'INV-2024-001'},
  {k:'Date',        v:'February 18, 2026'},
  {k:'Due Date',    v:'March 18, 2026'},
  {k:'Status',      v:'PAID'},
];
kvPairs.forEach((kv, i) => {
  kvCard.appendChild(txt(kv.k, 10, 'Regular', '#6B7280', 16, 52+i*32));
  kvCard.appendChild(txt(kv.v, 10, 'SemiBold', '#111827', 160, 52+i*32));
  if(i<kvPairs.length-1){
    const l=figma.createRectangle(); l.resize(408,1); l.x=16; l.y=68+i*32; l.fills=solid('#F1F5F9');
    kvCard.appendChild(l);
  }
});
pg.appendChild(kvCard);

Y += 436 + 220 + GAP;
divider(0, Y-20, 1440, pg);

// ============================================================
// 4. FORM DISPLAY COMPONENTS
// ============================================================
sectionLabel('04  FORM COMPONENTS', 'Input · Checkbox · Radio · Signature · Select', 0, Y, pg);
Y += 56;

const formCard = compFrame('Component/Forms', 680, 420, 0, Y);
formCard.appendChild(txt('Form Components (Visual/Print)', 11, 'SemiBold', '#6366F1', 16, 12));
formCard.appendChild(txt('PDF forms are visual-only — these show the print representation', 10, 'Regular', '#9CA3AF', 16, 28));

// Input field
formCard.appendChild(txt('Input Field', 10, 'Bold', '#374151', 16, 52));
const inputEmpty = figma.createFrame();
inputEmpty.resize(300, 32); inputEmpty.x=16; inputEmpty.y=68;
inputEmpty.fills=solid('#FFFFFF'); inputEmpty.cornerRadius=6;
inputEmpty.strokes=solid('#D1D5DB'); inputEmpty.strokeWeight=1;
inputEmpty.appendChild(txt('Full name', 10, 'Regular', '#9CA3AF', 10, 9));
formCard.appendChild(inputEmpty);

// Filled input
const inputFilled = figma.createFrame();
inputFilled.resize(300, 32); inputFilled.x=330; inputFilled.y=68;
inputFilled.fills=solid('#F9FAFB'); inputFilled.cornerRadius=6;
inputFilled.strokes=solid('#6366F1'); inputFilled.strokeWeight=1.5;
inputFilled.appendChild(txt('Akash Pise', 10, 'Regular', '#111827', 10, 9));
formCard.appendChild(inputFilled);
formCard.appendChild(txt('Empty', 8,'Regular','#9CA3AF',16,104));
formCard.appendChild(txt('Filled/Active', 8,'Regular','#9CA3AF',330,104));

// Checkbox
formCard.appendChild(txt('Checkbox', 10, 'Bold', '#374151', 16, 124));
const checkStates = [
  {label:'Unchecked', checked:false, x:16},
  {label:'Checked',   checked:true,  x:120},
  {label:'Required',  checked:false, x:224, required:true},
];
checkStates.forEach(cs => {
  const box = figma.createFrame();
  box.resize(14,14); box.x=cs.x; box.y=144;
  box.fills=solid(cs.checked?'#6366F1':'#FFFFFF');
  box.cornerRadius=3; box.strokes=solid(cs.checked?'#6366F1':'#D1D5DB'); box.strokeWeight=1.5;
  if(cs.checked) {
    const check = figma.createText();
    check.fontName={family:'Inter',style:'Bold'};
    check.fontSize=9; check.characters='✓'; check.fills=solid('#FFFFFF');
    check.x=2; check.y=1;
    box.appendChild(check);
  }
  formCard.appendChild(box);
  formCard.appendChild(txt(cs.label+(cs.required?' *':''), 10,'Regular','#374151',cs.x+18,144));
});

// Radio
formCard.appendChild(txt('Radio Button', 10, 'Bold', '#374151', 16, 176));
[{label:'Option A',sel:true,x:16},{label:'Option B',sel:false,x:120},{label:'Option C',sel:false,x:224}].forEach(r=>{
  const circle=figma.createEllipse();
  circle.resize(14,14); circle.x=r.x; circle.y=196;
  circle.fills=solid(r.sel?'#FFFFFF':'#FFFFFF');
  circle.strokes=solid(r.sel?'#6366F1':'#D1D5DB'); circle.strokeWeight=1.5;
  formCard.appendChild(circle);
  if(r.sel){
    const inner=figma.createEllipse();
    inner.resize(6,6); inner.x=r.x+4; inner.y=200;
    inner.fills=solid('#6366F1');
    formCard.appendChild(inner);
  }
  formCard.appendChild(txt(r.label,10,'Regular','#374151',r.x+18,196));
});

// Signature line
formCard.appendChild(txt('Signature Block', 10, 'Bold', '#374151', 16, 232));
const sigBlock = figma.createFrame();
sigBlock.resize(300, 80); sigBlock.x=16; sigBlock.y=250;
sigBlock.fills=solid('#F9FAFB'); sigBlock.cornerRadius=6; sigBlock.strokes=solid('#E5E7EB'); sigBlock.strokeWeight=1;
const sigLine=figma.createRectangle(); sigLine.resize(260,1); sigLine.x=20; sigLine.y=54; sigLine.fills=solid('#9CA3AF');
sigBlock.appendChild(sigLine);
sigBlock.appendChild(txt('Authorized Signature',9,'Regular','#9CA3AF',20,60));
sigBlock.appendChild(txt('Date: _______________',9,'Regular','#9CA3AF',20,72));
formCard.appendChild(sigBlock);

// Select / Dropdown
formCard.appendChild(txt('Select / Dropdown', 10, 'Bold', '#374151', 350, 232));
const selFrame = figma.createFrame();
selFrame.resize(240, 32); selFrame.x=350; selFrame.y=250;
selFrame.fills=solid('#FFFFFF'); selFrame.cornerRadius=6; selFrame.strokes=solid('#D1D5DB'); selFrame.strokeWeight=1;
selFrame.appendChild(txt('Select payment method...', 10,'Regular','#9CA3AF',10,9));
selFrame.appendChild(txt('▼', 10,'Regular','#6B7280',218,9));
formCard.appendChild(selFrame);

// MultiLine textarea
formCard.appendChild(txt('Textarea', 10, 'Bold', '#374151', 16, 344));
const ta=figma.createFrame();
ta.resize(628,60); ta.x=16; ta.y=360;
ta.fills=solid('#FFFFFF'); ta.cornerRadius=6; ta.strokes=solid('#D1D5DB'); ta.strokeWeight=1;
ta.appendChild(txt('Additional notes or comments...',10,'Regular','#9CA3AF',10,10));
formCard.appendChild(ta);

pg.appendChild(formCard);

Y += 440 + GAP;
divider(0, Y-20, 1440, pg);

// ============================================================
// 5. MEDIA COMPONENTS
// ============================================================
sectionLabel('05  MEDIA', 'Image · Logo · QR Code · Barcode · Watermark', 0, Y, pg);
Y += 56;

const mediaCard = compFrame('Component/Media', 1200, 300, 0, Y);
mediaCard.appendChild(txt('Media Components', 11, 'SemiBold', '#6366F1', 16, 12));
mediaCard.appendChild(txt('Image placeholders, QR codes, barcodes, watermarks for PDF documents', 10, 'Regular', '#9CA3AF', 16, 28));

// Image placeholder
const imgPH = figma.createFrame();
imgPH.resize(200,160); imgPH.x=16; imgPH.y=52;
imgPH.fills=solid('#F1F5F9'); imgPH.cornerRadius=8; imgPH.strokes=solid('#CBD5E1'); imgPH.strokeWeight=1;
const imgIcon=figma.createText();
imgIcon.fontName={family:'Inter',style:'Regular'}; imgIcon.fontSize=28;
imgIcon.characters='🖼'; imgIcon.x=72; imgIcon.y=46;
imgPH.appendChild(imgIcon);
imgPH.appendChild(txt('Image', 11,'Medium','#6B7280',70,82));
imgPH.appendChild(txt('200 × 160 pt', 9,'Regular','#9CA3AF',58,100));
imgPH.appendChild(txt('fit: cover', 9,'Regular','#9CA3AF',70,116));
mediaCard.appendChild(imgPH);
mediaCard.appendChild(txt('Image', 10,'Bold','#374151',16,224));

// Logo
const logoPH = figma.createFrame();
logoPH.resize(120,80); logoPH.x=240; logoPH.y=52;
logoPH.fills=solid('#0F172A'); logoPH.cornerRadius=8;
logoPH.appendChild(txt('LOGO', 18,'Bold','#FFFFFF',22,22));
logoPH.appendChild(txt('Company', 9,'Regular','#94A3B8',22,52));
mediaCard.appendChild(logoPH);
mediaCard.appendChild(txt('Logo', 10,'Bold','#374151',240,144));

// QR Code placeholder
const qrFrame = figma.createFrame();
qrFrame.resize(100,100); qrFrame.x=400; qrFrame.y=52;
qrFrame.fills=solid('#FFFFFF'); qrFrame.cornerRadius=8; qrFrame.strokes=solid('#111827'); qrFrame.strokeWeight=2;
// QR corner marks
[[4,4],[76,4],[4,76]].forEach(([qx,qy])=>{
  const qbox=figma.createFrame();
  qbox.resize(20,20); qbox.x=qx; qbox.y=qy;
  qbox.fills=[]; qbox.strokes=solid('#111827'); qbox.strokeWeight=3;
  qFrame.appendChild?null:null;
  qrFrame.appendChild(qbox);
  const inner=figma.createFrame();
  inner.resize(10,10); inner.x=qx+5; inner.y=qy+5;
  inner.fills=solid('#111827');
  qrFrame.appendChild(inner);
});
qrFrame.appendChild(txt('QR', 10,'Bold','#374151',36,42));
qrFrame.appendChild(txt('CODE', 8,'Regular','#9CA3AF',30,56));
mediaCard.appendChild(qrFrame);
mediaCard.appendChild(txt('QR Code', 10,'Bold','#374151',400,164));
mediaCard.appendChild(txt('URL / Text / Payment', 9,'Regular','#9CA3AF',400,178));

// Barcode
const bcFrame = figma.createFrame();
bcFrame.resize(180,80); bcFrame.x=530; bcFrame.y=52;
bcFrame.fills=solid('#FFFFFF'); bcFrame.cornerRadius=6; bcFrame.strokes=solid('#E5E7EB'); bcFrame.strokeWeight=1;
for(let bi=0;bi<30;bi++){
  const bar=figma.createRectangle();
  bar.resize(Math.random()>0.5?3:2,50);
  bar.x=16+bi*5; bar.y=8;
  bar.fills=solid('#111827');
  bcFrame.appendChild(bar);
}
bcFrame.appendChild(txt('1234567890', 8,'Regular','#111827',38,64));
mediaCard.appendChild(bcFrame);
mediaCard.appendChild(txt('Barcode', 10,'Bold','#374151',530,144));
mediaCard.appendChild(txt('CODE128 · EAN13 · UPC', 9,'Regular','#9CA3AF',530,158));

// Watermark
const wmFrame = figma.createFrame();
wmFrame.resize(240,160); wmFrame.x=740; wmFrame.y=52;
wmFrame.fills=solid('#F9FAFB'); wmFrame.cornerRadius=8; wmFrame.strokes=solid('#E5E7EB'); wmFrame.strokeWeight=1;
const wmt=figma.createText();
wmt.fontName={family:'Inter',style:'Bold'}; wmt.fontSize=28;
wmt.characters='DRAFT';
wmt.fills=[{type:'SOLID',color:hex('#DC2626')}];
wmt.opacity=0.15;
wmt.rotation=-30;
wmt.x=38; wmt.y=80;
wmFrame.appendChild(wmt);
wmFrame.appendChild(txt('Content underneath\nwatermark text', 10,'Regular','#374151',20,20));
mediaCard.appendChild(wmFrame);
mediaCard.appendChild(txt('Watermark', 10,'Bold','#374151',740,224));
mediaCard.appendChild(txt('opacity · rotation · text/image', 9,'Regular','#9CA3AF',740,238));

pg.appendChild(mediaCard);
Y += 320 + GAP;
divider(0, Y-20, 1440, pg);

// ============================================================
// 6. DOCUMENT STRUCTURE COMPONENTS
// ============================================================
sectionLabel('06  DOCUMENT STRUCTURE', 'Page Header · Page Footer · Page Number · Cover Page · TOC', 0, Y, pg);
Y += 56;

// Page Header
const phCard = compFrame('Component/PageHeader', 680, 180, 0, Y);
phCard.appendChild(txt('Page Header (fixed)', 11, 'SemiBold', '#6366F1', 16, 12));
phCard.appendChild(txt('Repeats on every page — company logo, document title, date', 10, 'Regular', '#9CA3AF', 16, 28));
const phInner = figma.createFrame();
phInner.resize(644, 100); phInner.x=16; phInner.y=52;
phInner.fills=solid('#FFFFFF'); phInner.cornerRadius=6;
phInner.strokes=solid('#E5E7EB'); phInner.strokeWeight=1;
const phBottom=figma.createRectangle(); phBottom.resize(644,2); phBottom.x=0; phBottom.y=98; phBottom.fills=solid('#0F172A');
phInner.appendChild(phBottom);
phInner.appendChild(txt('ACME Corporation', 14,'Bold','#0F172A',16,20));
phInner.appendChild(txt('acme.com', 10,'Regular','#6B7280',16,40));
phInner.appendChild(txt('Annual Report 2025', 12,'SemiBold','#0F172A',350,20));
phInner.appendChild(txt('Confidential · Internal Use Only', 9,'Regular','#9CA3AF',350,40));
phInner.appendChild(txt('Feb 2026', 10,'Regular','#6B7280',560,26));
phCard.appendChild(phInner);
pg.appendChild(phCard);

// Page Footer
const pfCard = compFrame('Component/PageFooter', 680, 180, 704, Y);
pfCard.appendChild(txt('Page Footer (fixed)', 11, 'SemiBold', '#6366F1', 16, 12));
pfCard.appendChild(txt('Page numbers, legal text, document info — repeats every page', 10, 'Regular', '#9CA3AF', 16, 28));
const pfInner = figma.createFrame();
pfInner.resize(644, 80); pfInner.x=16; pfInner.y=52;
pfInner.fills=solid('#FFFFFF'); pfInner.cornerRadius=6;
pfInner.strokes=solid('#E5E7EB'); pfInner.strokeWeight=1;
const pfTop=figma.createRectangle(); pfTop.resize(644,1); pfTop.x=0; pfTop.y=0; pfTop.fills=solid('#E5E7EB');
pfInner.appendChild(pfTop);
pfInner.appendChild(txt('© 2026 ACME Corporation. All rights reserved. Confidential.', 8,'Regular','#9CA3AF',16,12));
pfInner.appendChild(txt('Page 1 of 12', 9,'SemiBold','#374151',270,26));
pfInner.appendChild(txt('Generated by PDFX · pdfx.akashpise.dev', 8,'Regular','#9CA3AF',16,42));
pfInner.appendChild(txt('ACME-RPT-2025-001', 9,'Regular','#6B7280',524,26));
pfCard.appendChild(pfInner);
pg.appendChild(pfCard);

Y += 200 + GAP;
divider(0, Y-20, 1440, pg);

// ============================================================
// 7. STATUS & ALERT COMPONENTS
// ============================================================
sectionLabel('07  STATUS & ALERTS', 'Alert · StatusDot · Progress · InvoiceTotal', 0, Y, pg);
Y += 56;

const alertCard = compFrame('Component/Alert', 680, 320, 0, Y);
alertCard.appendChild(txt('Alert / Callout', 11, 'SemiBold', '#6366F1', 16, 12));
alertCard.appendChild(txt('Info, success, warning, error variants for important notices', 10, 'Regular', '#9CA3AF', 16, 28));

const alerts = [
  {type:'Info',    bg:'#EFF6FF', border:'#BFDBFE', accent:'#2563EB', icon:'ℹ', title:'Information', msg:'This invoice is due in 14 days. Payment via bank transfer accepted.'},
  {type:'Success', bg:'#F0FDF4', border:'#BBF7D0', accent:'#16A34A', icon:'✓', title:'Payment Confirmed', msg:'Your payment of $8,000.00 has been received and confirmed.'},
  {type:'Warning', bg:'#FFFBEB', border:'#FDE68A', accent:'#D97706', icon:'⚠', title:'Approaching Deadline', msg:'This certificate expires in 30 days. Renewal is required.'},
  {type:'Error',   bg:'#FEF2F2', border:'#FECACA', accent:'#DC2626', icon:'✕', title:'Action Required', msg:'Missing required fields: billing address, tax ID. Please update.'},
];
alerts.forEach((a, i) => {
  const af = figma.createFrame();
  af.resize(648, 60); af.x=16; af.y=52+i*66;
  af.fills=solid(a.bg); af.cornerRadius=8; af.strokes=solid(a.border); af.strokeWeight=1;
  const accent=figma.createRectangle(); accent.resize(3,60); accent.x=0; accent.y=0;
  accent.fills=solid(a.accent); accent.topLeftRadius=8; accent.bottomLeftRadius=8;
  af.appendChild(accent);
  af.appendChild(txt(a.icon, 13,'Bold',a.accent,12,22));
  af.appendChild(txt(a.title, 11,'SemiBold','#111827',32,12));
  af.appendChild(txt(a.msg, 10,'Regular','#374151',32,30, 600));
  alertCard.appendChild(af);
});
pg.appendChild(alertCard);

// Invoice Total
const totCard = compFrame('Component/InvoiceTotal', 440, 220, 704, Y);
totCard.appendChild(txt('Invoice Total', 11, 'SemiBold', '#6366F1', 16, 12));
totCard.appendChild(txt('Subtotal, discount, tax, total breakdown', 10, 'Regular', '#9CA3AF', 16, 28));
const totRows = [
  {label:'Subtotal',  val:'$8,000.00', bold:false, border:false},
  {label:'Discount (10%)',val:'−$800.00',bold:false,border:false,color:'#16A34A'},
  {label:'Tax (GST 18%)', val:'$1,296.00',bold:false,border:false},
  {label:'TOTAL DUE', val:'$8,496.00', bold:true,  border:true},
];
totRows.forEach((r, i) => {
  if(r.border){
    const bl=figma.createRectangle(); bl.resize(408,1); bl.x=16; bl.y=52+i*36-4; bl.fills=solid('#E5E7EB');
    totCard.appendChild(bl);
  }
  totCard.appendChild(txt(r.label, r.bold?12:10, r.bold?'Bold':'Regular', r.bold?'#0F172A':'#374151', 16, 52+i*36));
  totCard.appendChild(txt(r.val, r.bold?14:10, r.bold?'Bold':'SemiBold', r.color||( r.bold?'#0F172A':'#374151'), 340, 52+i*36));
});
pg.appendChild(totCard);

Y += 340 + GAP;
divider(0, Y-20, 1440, pg);

// ============================================================
// 8. PAGE BREAK INDICATOR
// ============================================================
sectionLabel('08  PAGE BREAK', 'Visual indicator for forced page breaks', 0, Y, pg);
Y += 56;
const pbCard = compFrame('Component/PageBreak', 680, 80, 0, Y);
pbCard.appendChild(txt('PageBreak', 11, 'SemiBold', '#6366F1', 16, 12));
const pbLine = figma.createRectangle();
pbLine.resize(616, 1); pbLine.x=16; pbLine.y=44;
pbLine.fills=[]; pbLine.strokes=solid('#94A3B8'); pbLine.strokeWeight=1.5; pbLine.dashPattern=[8,6];
pbCard.appendChild(pbLine);
const pblabel = figma.createFrame();
pblabel.resize(100,20); pblabel.x=274; pblabel.y=34;
pblabel.fills=solid('#F1F5F9'); pblabel.cornerRadius=4;
pblabel.appendChild(txt('Page Break', 9,'Regular','#94A3B8',10,4));
pbCard.appendChild(pblabel);
pg.appendChild(pbCard);

print('✅ Phase 2 complete! All components added to 🧱 Components page.');
print('👉 Next: Run phase3-templates.js');

} // end main

main().catch(e => print('❌ Error: ' + e.message));
