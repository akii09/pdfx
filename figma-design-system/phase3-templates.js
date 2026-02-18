// ============================================================
// PDFX Design System - Phase 3: Document Templates
// Run AFTER phase1 + phase2. Run in Figma Scripter.
// ============================================================

async function main() {

await figma.loadFontAsync({family:'Inter',style:'Bold'});
await figma.loadFontAsync({family:'Inter',style:'SemiBold'});
await figma.loadFontAsync({family:'Inter',style:'Medium'});
await figma.loadFontAsync({family:'Inter',style:'Regular'});

function hex(h) {
  h=h.replace('#','');
  if(h.length===3)h=h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
  const n=parseInt(h,16);
  return {r:((n>>16)&255)/255,g:((n>>8)&255)/255,b:(n&255)/255};
}
function solid(h){return [{type:'SOLID',color:hex(h)}];}
function txt(content,size,style,color,x,y,maxW){
  const t=figma.createText();
  t.fontName={family:'Inter',style};
  t.fontSize=size; t.characters=content; t.fills=solid(color);
  t.x=x; t.y=y;
  if(maxW){t.textAutoResize='HEIGHT'; t.resize(maxW,t.height);}
  return t;
}

const pg = figma.root.children.find(p => p.name === '📄 Templates');
if(!pg){print('❌ Run Phase 1 first!'); return;}
figma.currentPage = pg;

// Page header
const header = figma.createFrame();
header.name='_Header'; header.resize(1440,100);
header.x=0; header.y=0; header.fills=solid('#0F172A'); header.cornerRadius=16;
header.appendChild(txt('PDFX Templates',32,'Bold','#FFFFFF',48,22));
header.appendChild(txt('Production-ready templates built with PDFX components — Invoice · Resume · Certificate · Report · Letter · Form',14,'Regular','#94A3B8',48,64));
pg.appendChild(header);

// A4 dimensions at 0.9 scale for display (595 × 842 pt → ~536 × 758)
const A4W = 536, A4H = 758;
const LAND_W = 758, LAND_H = 536;
const MARGIN = 16;

// Helper: A4 page frame
function a4Frame(name, x, y, landscape) {
  const w = landscape ? LAND_W : A4W;
  const h = landscape ? LAND_H : A4H;
  const f = figma.createFrame();
  f.name = name;
  f.resize(w, h); f.x=x; f.y=y;
  f.fills=solid('#FFFFFF');
  f.effects=[{type:'DROP_SHADOW',color:{r:0,g:0,b:0,a:0.12},offset:{x:0,y:4},radius:16,spread:0,visible:true,blendMode:'NORMAL'}];
  return f;
}
function line(w,h,x,y,color){
  const r=figma.createRectangle(); r.resize(w,h); r.x=x; r.y=y; r.fills=solid(color); return r;
}

// ============================================================
// TEMPLATE 1: INVOICE (Professional)
// ============================================================
const invFrame = a4Frame('Template/Invoice', 0, 160);
pg.appendChild(invFrame);

// Header band
const invHdr = figma.createFrame();
invHdr.resize(A4W, 90); invHdr.x=0; invHdr.y=0;
invHdr.fills=solid('#0F172A');
invHdr.appendChild(txt('INVOICE',22,'Bold','#FFFFFF',MARGIN,16));
invHdr.appendChild(txt('INV-2026-0042',11,'Regular','#94A3B8',MARGIN,44));
invHdr.appendChild(txt('ACME Corporation',14,'Bold','#FFFFFF',350,16));
invHdr.appendChild(txt('hello@acme.com  ·  acme.com',10,'Regular','#94A3B8',350,38));
invHdr.appendChild(txt('San Francisco, CA 94102',10,'Regular','#94A3B8',350,54));
invFrame.appendChild(invHdr);

// Meta info grid
const metaY = 108;
const metaFields = [
  ['Bill To', 'Beta Startup Inc.\n123 Market Street\nNew York, NY 10001'],
  ['Invoice Date', 'February 18, 2026'],
  ['Due Date',     'March 18, 2026'],
  ['Status',       'UNPAID'],
];
metaFields.forEach((m, mi) => {
  const mx = MARGIN + mi * 126;
  invFrame.appendChild(txt(m[0], 8,'SemiBold','#6B7280', mx, metaY));
  const vt = txt(m[1], 10, mi===3?'Bold':'Regular', mi===3?'#DC2626':'#111827', mx, metaY+14, 120);
  invFrame.appendChild(vt);
});

invFrame.appendChild(line(A4W-MARGIN*2, 1, MARGIN, 165, '#E5E7EB'));

// Table header
const tblY = 174;
const tCols = [{h:'DESCRIPTION',w:220},{h:'QTY',w:50},{h:'RATE',w:100},{h:'AMOUNT',w:100}];
let tblX = MARGIN;
const tblHdr = figma.createFrame();
tblHdr.resize(A4W-MARGIN*2, 24); tblHdr.x=MARGIN; tblHdr.y=tblY;
tblHdr.fills=solid('#F1F5F9');
let thx = 0;
tCols.forEach(c => {
  tblHdr.appendChild(txt(c.h, 8,'SemiBold','#6B7280', thx+6, 7));
  thx += c.w;
});
invFrame.appendChild(tblHdr);

// Table rows
const invItems = [
  ['Brand Identity Design',        '1',    '$3,200.00', '$3,200.00'],
  ['React PDF Component Library',  '40h',  '$120.00',   '$4,800.00'],
  ['PDFX Template Bundle (5)',      '1',    '$800.00',   '$800.00'],
  ['Design System Consultation',    '8h',   '$200.00',   '$1,600.00'],
];
invItems.forEach((row, ri) => {
  let rx = MARGIN;
  tCols.forEach((col, ci) => {
    const td = figma.createFrame();
    td.resize(col.w, 24); td.x=rx; td.y=tblY+24+ri*24;
    td.fills=solid(ri%2===0?'#FFFFFF':'#F9FAFB');
    td.appendChild(txt(row[ci], 9, ci===3?'SemiBold':'Regular', '#111827', 6, 7));
    invFrame.appendChild(td);
    rx += col.w;
  });
});

// Totals
const totY = tblY + 24 + invItems.length*24 + 20;
invFrame.appendChild(line(A4W-MARGIN*2, 1, MARGIN, totY-4, '#E5E7EB'));
[
  ['Subtotal', '$10,400.00', false],
  ['Discount (5%)', '−$520.00', false],
  ['Tax (GST 18%)', '$1,778.40', false],
  ['TOTAL DUE', '$11,658.40', true],
].forEach((r, i) => {
  invFrame.appendChild(txt(r[0], r[2]?11:9, r[2]?'Bold':'Regular', r[2]?'#0F172A':'#6B7280', MARGIN, totY+i*20));
  invFrame.appendChild(txt(r[1], r[2]?13:10, r[2]?'Bold':'SemiBold', r[2]?'#0F172A':'#374151', A4W-MARGIN-100, totY+i*20));
});
if(true){
  invFrame.appendChild(line(200,2,A4W-MARGIN-200, totY+3*20-4,'#0F172A'));
}

// Payment + Notes
const payY = totY + 100;
invFrame.appendChild(line(A4W-MARGIN*2, 1, MARGIN, payY-8, '#E5E7EB'));
invFrame.appendChild(txt('Payment Instructions', 9,'SemiBold','#374151', MARGIN, payY));
invFrame.appendChild(txt('Bank: First National Bank  ·  Account: 1234 5678 9012  ·  Routing: 021000021', 8,'Regular','#6B7280', MARGIN, payY+14, 500));
invFrame.appendChild(txt('Notes: Thank you for your business! Please include invoice number with payment.', 8,'Regular','#6B7280', MARGIN, payY+28, 500));

// Footer
invFrame.appendChild(line(A4W-MARGIN*2, 1, MARGIN, A4H-40, '#E5E7EB'));
invFrame.appendChild(txt('ACME Corporation  ·  hello@acme.com  ·  +1 (555) 000-1234  ·  acme.com', 7,'Regular','#9CA3AF', MARGIN, A4H-28));
invFrame.appendChild(txt('Page 1 of 1', 7,'Regular','#9CA3AF', A4W-70, A4H-28));

// Template label
pg.appendChild(txt('📄  Invoice Template', 14,'Bold','#0F172A', 0, 140));
pg.appendChild(txt('Professional · A4 Portrait · react-pdf', 11,'Regular','#6B7280', 0, 920));

// ============================================================
// TEMPLATE 2: RESUME / CV
// ============================================================
const cvX = A4W + 48;
const cvFrame = a4Frame('Template/Resume-CV', cvX, 160);
pg.appendChild(cvFrame);
pg.appendChild(txt('📄  Resume / CV Template', 14,'Bold','#0F172A', cvX, 140));

// Sidebar
const sidebar = figma.createFrame();
sidebar.resize(160, A4H); sidebar.x=0; sidebar.y=0;
sidebar.fills=solid('#0F172A');
cvFrame.appendChild(sidebar);

// Avatar circle
const avatar = figma.createEllipse();
avatar.resize(72,72); avatar.x=44; avatar.y=24;
avatar.fills=solid('#334155');
sidebar.appendChild(avatar);
sidebar.appendChild(txt('AK', 22,'Bold','#FFFFFF',58,42));

// Sidebar content
sidebar.appendChild(txt('CONTACT', 8,'SemiBold','#94A3B8', 16, 112));
[['✉','akash@email.com'],['📱','+1 555 000 1234'],['🌐','akashpise.dev'],['📍','Mumbai, India']].forEach(([icon,val],i)=>{
  sidebar.appendChild(txt(icon+' '+val, 7,'Regular','#D1D5DB', 12, 132+i*18, 140));
});
sidebar.appendChild(txt('SKILLS', 8,'SemiBold','#94A3B8', 16, 212));
['React / Next.js','TypeScript','Node.js','PDF Design','Figma','TailwindCSS'].forEach((s,i)=>{
  const skillBg=figma.createRectangle(); skillBg.resize(128,16); skillBg.x=16; skillBg.y=228+i*22;
  skillBg.fills=solid('#1E293B'); skillBg.cornerRadius=3;
  sidebar.appendChild(skillBg);
  sidebar.appendChild(txt(s,7,'Regular','#CBD5E1',22,230+i*22));
});
sidebar.appendChild(txt('EDUCATION', 8,'SemiBold','#94A3B8', 16, 372));
sidebar.appendChild(txt('B.Tech Computer Sci.', 7,'SemiBold','#FFFFFF', 16, 388));
sidebar.appendChild(txt('IIT Bombay · 2020', 7,'Regular','#94A3B8', 16, 402));

// Main content
const mainX = 172;
cvFrame.appendChild(txt('Akash Pise', 22,'Bold','#0F172A', mainX, 20));
cvFrame.appendChild(txt('Senior Frontend Engineer & PDF Systems Architect', 10,'Medium','#6366F1', mainX, 48));
cvFrame.appendChild(line(A4W-mainX-MARGIN, 1, mainX, 66, '#E5E7EB'));

cvFrame.appendChild(txt('EXPERIENCE', 8,'SemiBold','#6B7280', mainX, 76));
const expItems = [
  {title:'Lead Engineer, PDFX', company:'Open Source · 2024–Present', desc:'Built a complete React PDF component library inspired by shadcn/ui. 500+ GitHub stars in first month.'},
  {title:'Senior Frontend Dev', company:'TechCorp · 2022–2024', desc:'Led PDF reporting system serving 10k+ enterprise clients. Reduced generation time by 60%.'},
  {title:'Frontend Engineer', company:'StartupXYZ · 2020–2022', desc:'Built React component library from scratch. Introduced design token system adopted company-wide.'},
];
expItems.forEach((e,i)=>{
  const ey = 94+i*80;
  const dot=figma.createEllipse(); dot.resize(6,6); dot.x=mainX; dot.y=ey+4;
  dot.fills=solid('#6366F1');
  cvFrame.appendChild(dot);
  cvFrame.appendChild(txt(e.title, 10,'Bold','#0F172A', mainX+14, ey));
  cvFrame.appendChild(txt(e.company, 8,'Regular','#6B7280', mainX+14, ey+14));
  cvFrame.appendChild(txt(e.desc, 8,'Regular','#374151', mainX+14, ey+28, 340));
});

cvFrame.appendChild(txt('PROJECTS', 8,'SemiBold','#6B7280', mainX, 340));
['PDFX — React PDF Component Library (OSS)','Invoice AI — AI-powered invoice generation','PDF-Kit — Node.js PDF utilities package'].forEach((p,i)=>{
  cvFrame.appendChild(txt('▶ '+p, 8,'Regular','#374151', mainX+8, 356+i*18));
});
pg.appendChild(txt('Professional · A4 Portrait · react-pdf', 11,'Regular','#6B7280', cvX, 920));

// ============================================================
// TEMPLATE 3: CERTIFICATE (Landscape)
// ============================================================
const certX = 0;
const certY = 1000;
const certFrame = a4Frame('Template/Certificate', certX, certY, true);
pg.appendChild(certFrame);
pg.appendChild(txt('📄  Certificate Template', 14,'Bold','#0F172A', certX, certY-20));

// Border
const certBorder=figma.createRectangle();
certBorder.resize(LAND_W-16,LAND_H-16); certBorder.x=8; certBorder.y=8;
certBorder.fills=[]; certBorder.strokes=solid('#C9A84C'); certBorder.strokeWeight=2.5;
certFrame.appendChild(certBorder);
const certBorder2=figma.createRectangle();
certBorder2.resize(LAND_W-28,LAND_H-28); certBorder2.x=14; certBorder2.y=14;
certBorder2.fills=[]; certBorder2.strokes=solid('#E8D5A0'); certBorder2.strokeWeight=1;
certFrame.appendChild(certBorder2);

// Decorative header band
const certHdr=figma.createFrame();
certHdr.resize(LAND_W, 80); certHdr.x=0; certHdr.y=0;
certHdr.fills=solid('#0F172A');
certFrame.appendChild(certHdr);

certFrame.appendChild(txt('🏆', 28,'Regular','#C9A84C', LAND_W/2-20, 90));
certFrame.appendChild(txt('CERTIFICATE OF ACHIEVEMENT', 18,'Bold','#0F172A', LAND_W/2-145, 132));
certFrame.appendChild(txt('This is to certify that', 12,'Regular','#6B7280', LAND_W/2-75, 168));
certFrame.appendChild(txt('Akash Pise', 28,'Bold','#0F172A', LAND_W/2-80, 192));
certFrame.appendChild(line(300,2,LAND_W/2-150,234,'#C9A84C'));
certFrame.appendChild(txt('has successfully completed the course', 11,'Regular','#6B7280', LAND_W/2-120, 244));
certFrame.appendChild(txt('Advanced React PDF Development with PDFX', 14,'SemiBold','#1E3A5F', LAND_W/2-195, 266));
certFrame.appendChild(txt('February 18, 2026  ·  Score: 98/100  ·  Grade: Distinction', 10,'Regular','#6B7280', LAND_W/2-175, 290));

// Signature lines
certFrame.appendChild(line(160,1,80,LAND_H-70,'#374151'));
certFrame.appendChild(txt('Program Director', 9,'Regular','#6B7280', 80, LAND_H-56));
certFrame.appendChild(line(160,1,LAND_W/2-80,LAND_H-70,'#374151'));
certFrame.appendChild(txt('Academic Registrar', 9,'Regular','#6B7280', LAND_W/2-80, LAND_H-56));
certFrame.appendChild(line(160,1,LAND_W-240,LAND_H-70,'#374151'));
certFrame.appendChild(txt('Certificate No: PDFX-2026-0042', 8,'Regular','#9CA3AF', LAND_W-240, LAND_H-56));

// Seal placeholder
const seal=figma.createEllipse();
seal.resize(70,70); seal.x=LAND_W/2-35; seal.y=LAND_H-90;
seal.fills=solid('#FEF3C7'); seal.strokes=solid('#C9A84C'); seal.strokeWeight=2;
certFrame.appendChild(seal);
certFrame.appendChild(txt('SEAL', 9,'Bold','#92400E', LAND_W/2-16, LAND_H-68));
pg.appendChild(txt('Professional · A4 Landscape · react-pdf', 11,'Regular','#6B7280', certX, certY + LAND_H + 12));

// ============================================================
// TEMPLATE 4: BUSINESS LETTER
// ============================================================
const letX = LAND_W + 48;
const letFrame = a4Frame('Template/BusinessLetter', letX, certY);
pg.appendChild(letFrame);
pg.appendChild(txt('📄  Business Letter Template', 14,'Bold','#0F172A', letX, certY-20));

// Letterhead
letFrame.appendChild(txt('ACME Corporation', 18,'Bold','#0F172A', MARGIN, MARGIN));
letFrame.appendChild(txt('Innovation for Tomorrow', 9,'Regular','#6366F1', MARGIN, MARGIN+24));
letFrame.appendChild(line(A4W-MARGIN*2,3,MARGIN,52,'#0F172A'));
letFrame.appendChild(txt('123 Tech Street, San Francisco, CA 94102  |  +1 (555) 000-1234  |  hello@acme.com', 8,'Regular','#6B7280', MARGIN, 62));

letFrame.appendChild(txt('February 18, 2026', 10,'Regular','#374151', MARGIN, 96));
letFrame.appendChild(txt('Mr. John Smith\nDirector, Partnerships\nBeta Startup Inc.\n456 Market Street, New York, NY 10001', 10,'Regular','#374151', MARGIN, 120, 300));
letFrame.appendChild(txt('Dear Mr. Smith,', 10,'SemiBold','#0F172A', MARGIN, 196));
const body1='Re: Partnership Proposal — PDFX Integration Program';
letFrame.appendChild(txt(body1, 10,'SemiBold','#374151', MARGIN, 216));

const bodyText = 'We are delighted to present this proposal for a strategic partnership between ACME Corporation and Beta Startup Inc. regarding the integration of our PDFX component library into your document generation platform.\n\nAfter reviewing your technical requirements, we believe our solution provides the ideal foundation. PDFX offers a comprehensive set of React PDF components that can be seamlessly integrated into your existing workflow.\n\nWe would welcome the opportunity to discuss this proposal at your earliest convenience. Please find the detailed technical specification and pricing attached to this letter.\n\nWe look forward to building a successful partnership with your organization.';

letFrame.appendChild(txt(bodyText, 9,'Regular','#374151', MARGIN, 236, A4W-MARGIN*2));

letFrame.appendChild(txt('Yours sincerely,', 10,'Regular','#374151', MARGIN, 500));
letFrame.appendChild(line(120,1,MARGIN,550,'#374151'));
letFrame.appendChild(txt('Akash Pise', 10,'SemiBold','#0F172A', MARGIN, 556));
letFrame.appendChild(txt('Founder & CEO, ACME Corporation', 9,'Regular','#6B7280', MARGIN, 570));

letFrame.appendChild(line(A4W-MARGIN*2,1,MARGIN,A4H-48,'#E5E7EB'));
letFrame.appendChild(txt('ACME Corporation · Registered in California · CIN: US123456789', 7,'Regular','#9CA3AF', MARGIN, A4H-36));
pg.appendChild(txt('Professional · A4 Portrait · react-pdf', 11,'Regular','#6B7280', letX, certY + A4H + 12));

// ============================================================
// TEMPLATE 5: REPORT (Cover Page)
// ============================================================
const repX = letX + A4W + 48;
const repFrame = a4Frame('Template/Report-Cover', repX, certY);
pg.appendChild(repFrame);
pg.appendChild(txt('📄  Report / Cover Page Template', 14,'Bold','#0F172A', repX, certY-20));

// Full bleed top section
const repTop=figma.createFrame();
repTop.resize(A4W,360); repTop.x=0; repTop.y=0;
repTop.fills=solid('#0F172A');
repFrame.appendChild(repTop);

// Decorative lines
for(let di=0;di<6;di++){
  const dl=figma.createRectangle();
  dl.resize(A4W,1); dl.x=0; dl.y=di*12+280;
  dl.fills=solid('#6366F1'); dl.opacity=0.3-di*0.04;
  repTop.appendChild(dl);
}

repTop.appendChild(txt('ANNUAL REPORT', 11,'SemiBold','#6366F1', MARGIN, 60));
repTop.appendChild(txt('2025', 72,'Bold','#FFFFFF', MARGIN, 80));
repTop.appendChild(txt('ACME Corporation', 22,'Regular','#94A3B8', MARGIN, 168));
repTop.appendChild(txt('Innovation for Tomorrow', 11,'Regular','#6366F1', MARGIN, 200));

// Report info section
const repInfo=figma.createFrame();
repInfo.resize(A4W-MARGIN*2, 180); repInfo.x=MARGIN; repInfo.y=380;
repInfo.fills=solid('#F8FAFC'); repInfo.cornerRadius=8;
repInfo.strokes=solid('#E2E8F0'); repInfo.strokeWeight=1;
repFrame.appendChild(repInfo);

repInfo.appendChild(txt('REPORT OVERVIEW', 9,'SemiBold','#6B7280', 16, 16));
[
  ['Fiscal Year', '2025 (Jan – Dec)'],
  ['Revenue', '$48.2M (+18% YoY)'],
  ['Employees', '342 FTE'],
  ['Markets', '12 Countries'],
].forEach(([k,v],i)=>{
  repInfo.appendChild(txt(k, 9,'Regular','#6B7280', 16, 36+i*28));
  repInfo.appendChild(txt(v, 10,'SemiBold','#0F172A', 160, 36+i*28));
});

// Table of contents preview
repFrame.appendChild(txt('TABLE OF CONTENTS', 9,'SemiBold','#6B7280', MARGIN, 580));
[
  ['01', 'Executive Summary', '3'],
  ['02', 'Financial Highlights', '8'],
  ['03', 'Business Operations', '15'],
  ['04', 'Market Expansion', '22'],
  ['05', 'Sustainability Report', '28'],
  ['06', 'Financial Statements', '34'],
].forEach(([n,t,p],i)=>{
  const ty=598+i*22;
  repFrame.appendChild(txt(n, 9,'Bold','#6366F1', MARGIN, ty));
  repFrame.appendChild(txt(t, 9,'Regular','#374151', MARGIN+28, ty));
  // Dot leader
  repFrame.appendChild(txt('.'.repeat(40), 8,'Regular','#D1D5DB', MARGIN+180, ty+1));
  repFrame.appendChild(txt(p, 9,'SemiBold','#374151', A4W-MARGIN-16, ty));
});

repFrame.appendChild(line(A4W-MARGIN*2,1,MARGIN,A4H-48,'#E5E7EB'));
repFrame.appendChild(txt('ACME Corporation  ·  Confidential & Proprietary  ·  2025', 7,'Regular','#9CA3AF', MARGIN, A4H-34));
pg.appendChild(txt('Modern · A4 Portrait · react-pdf', 11,'Regular','#6B7280', repX, certY + A4H + 12));

// ============================================================
// TEMPLATE 6: FORM
// ============================================================
const formX = 0;
const formY = certY + A4H + 64;
const formFrame = a4Frame('Template/Form', formX, formY);
pg.appendChild(formFrame);
pg.appendChild(txt('📄  Form Template', 14,'Bold','#0F172A', formX, formY-20));

// Form header
const fHdr=figma.createFrame();
fHdr.resize(A4W,60); fHdr.x=0; fHdr.y=0;
fHdr.fills=solid('#0F172A');
fHdr.appendChild(txt('CLIENT ONBOARDING FORM',14,'Bold','#FFFFFF',MARGIN,14));
fHdr.appendChild(txt('Please complete all fields. Fields marked * are required.',9,'Regular','#94A3B8',MARGIN,38));
formFrame.appendChild(fHdr);

// Form sections
const fields = [
  {section:'PERSONAL INFORMATION', fields:[
    {label:'Full Name *', type:'input', w:240},
    {label:'Email Address *', type:'input', w:240},
    {label:'Phone Number', type:'input', w:180},
    {label:'Date of Birth', type:'input', w:180},
  ]},
  {section:'COMPANY DETAILS', fields:[
    {label:'Company Name *', type:'input', w:300},
    {label:'Industry', type:'select', w:200},
    {label:'Company Size', type:'radio', options:['1-10','11-50','51-200','200+']},
  ]},
  {section:'SERVICE REQUIREMENTS', fields:[
    {label:'Services Required', type:'checkbox', options:['PDF Generation','Template Design','API Integration','Support & Training']},
    {label:'Additional Notes', type:'textarea'},
  ]},
];

let fy=76;
fields.forEach(sec=>{
  // Section label
  const secBg=figma.createFrame(); secBg.resize(A4W-MARGIN*2,20); secBg.x=MARGIN; secBg.y=fy;
  secBg.fills=solid('#F1F5F9'); secBg.cornerRadius=4;
  secBg.appendChild(txt(sec.section, 8,'SemiBold','#374151',8,5));
  formFrame.appendChild(secBg);
  fy += 26;

  sec.fields.forEach(field=>{
    formFrame.appendChild(txt(field.label, 8,'SemiBold','#374151', MARGIN, fy));
    fy += 14;
    if(field.type==='input'){
      const inp=figma.createFrame(); inp.resize(field.w||280,24); inp.x=MARGIN; inp.y=fy;
      inp.fills=solid('#FFFFFF'); inp.cornerRadius=4; inp.strokes=solid('#D1D5DB'); inp.strokeWeight=1;
      formFrame.appendChild(inp);
      fy += 32;
    } else if(field.type==='select'){
      const sel=figma.createFrame(); sel.resize(field.w||200,24); sel.x=MARGIN; sel.y=fy;
      sel.fills=solid('#FFFFFF'); sel.cornerRadius=4; sel.strokes=solid('#D1D5DB'); sel.strokeWeight=1;
      sel.appendChild(txt('Select...',9,'Regular','#9CA3AF',8,6));
      sel.appendChild(txt('▼',9,'Regular','#6B7280',field.w?field.w-18:182,6));
      formFrame.appendChild(sel);
      fy += 32;
    } else if(field.type==='radio'){
      let rx=MARGIN;
      field.options.forEach((opt,oi)=>{
        const c=figma.createEllipse(); c.resize(12,12); c.x=rx; c.y=fy+2;
        c.fills=solid('#FFFFFF'); c.strokes=solid(oi===0?'#6366F1':'#D1D5DB'); c.strokeWeight=1.5;
        formFrame.appendChild(c);
        if(oi===0){const ci=figma.createEllipse(); ci.resize(6,6); ci.x=rx+3; ci.y=fy+5; ci.fills=solid('#6366F1'); formFrame.appendChild(ci);}
        formFrame.appendChild(txt(opt,9,'Regular','#374151',rx+16,fy+2));
        rx += 70;
      });
      fy += 28;
    } else if(field.type==='checkbox'){
      field.options.forEach((opt,oi)=>{
        const cb=figma.createFrame(); cb.resize(12,12); cb.x=MARGIN; cb.y=fy+oi*20;
        cb.fills=solid('#FFFFFF'); cb.cornerRadius=2; cb.strokes=solid('#D1D5DB'); cb.strokeWeight=1.5;
        formFrame.appendChild(cb);
        formFrame.appendChild(txt(opt,9,'Regular','#374151',MARGIN+16,fy+oi*20));
      });
      fy += field.options.length*20 + 4;
    } else if(field.type==='textarea'){
      const ta=figma.createFrame(); ta.resize(A4W-MARGIN*2,56); ta.x=MARGIN; ta.y=fy;
      ta.fills=solid('#FFFFFF'); ta.cornerRadius=4; ta.strokes=solid('#D1D5DB'); ta.strokeWeight=1;
      formFrame.appendChild(ta);
      fy += 64;
    }
  });
  fy += 8;
});

// Submit area
const sigArea=figma.createFrame(); sigArea.resize(180,48); sigArea.x=MARGIN; sigArea.y=fy+8;
sigArea.fills=solid('#F9FAFB'); sigArea.cornerRadius=6; sigArea.strokes=solid('#E5E7EB'); sigArea.strokeWeight=1;
const sl=figma.createRectangle(); sl.resize(140,1); sl.x=20; sl.y=32; sl.fills=solid('#9CA3AF');
sigArea.appendChild(sl);
sigArea.appendChild(txt('Signature',8,'Regular','#9CA3AF',20,36));
formFrame.appendChild(sigArea);
formFrame.appendChild(txt('Date: _______________',9,'Regular','#9CA3AF',MARGIN+200,fy+30));

formFrame.appendChild(line(A4W-MARGIN*2,1,MARGIN,A4H-40,'#E5E7EB'));
formFrame.appendChild(txt('ACME Corporation  ·  Form F-001  ·  Version 2.0  ·  February 2026', 7,'Regular','#9CA3AF', MARGIN, A4H-28));
pg.appendChild(txt('Professional · A4 Portrait · react-pdf', 11,'Regular','#6B7280', formX, formY + A4H + 12));

print('✅ Phase 3 complete! All templates added to 📄 Templates page.');
print('🎉 PDFX Design System is DONE! All 3 pages populated.');

} // end main

main().catch(e => print('❌ Error: ' + e.message));
