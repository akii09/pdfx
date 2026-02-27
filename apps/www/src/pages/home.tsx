import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Copy, Github } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/use-document-title';

// ─── PDF Mock Cards ───────────────────────────────────────────────────────────

function InvoiceCard() {
  return (
    <div className="w-full h-full bg-white text-[#18181b] px-6 py-5 flex flex-col gap-3.5 font-sans overflow-hidden select-none">
      <div className="flex justify-between items-start">
        <div>
          <div className="w-16 h-2.5 bg-[#18181b] rounded-sm mb-1.5" />
          <div className="w-10 h-1.5 bg-[#d4d4d8] rounded-sm" />
        </div>
        <div className="text-right">
          <div className="text-[9px] font-bold text-[#18181b] tracking-widest uppercase">
            Invoice
          </div>
          <div className="text-[7.5px] text-[#71717a] mt-0.5">#INV-2024-0892</div>
        </div>
      </div>
      <div className="h-px bg-[#e4e4e7]" />
      <div className="flex justify-between gap-3">
        <div>
          <div className="text-[6.5px] text-[#71717a] uppercase tracking-widest mb-1">Bill To</div>
          <div className="text-[8.5px] font-semibold text-[#18181b]">Acme Corporation</div>
          <div className="text-[7.5px] text-[#71717a] mt-0.5">hello@acme.com</div>
          <div className="text-[7.5px] text-[#71717a]">San Francisco, CA</div>
        </div>
        <div className="text-right">
          <div className="text-[6.5px] text-[#71717a] uppercase tracking-widest mb-1">Date</div>
          <div className="text-[8px] text-[#18181b]">Dec 12, 2024</div>
          <div className="text-[6.5px] text-[#71717a] mt-1.5 uppercase tracking-widest">Due</div>
          <div className="text-[8px] text-[#18181b] mt-0.5">Jan 12, 2025</div>
        </div>
      </div>
      <div className="flex-1">
        <div className="grid grid-cols-[1fr_auto_auto] gap-x-3 mb-1.5">
          <div className="text-[6.5px] text-[#71717a] uppercase tracking-widest">Description</div>
          <div className="text-[6.5px] text-[#71717a] uppercase tracking-widest text-right">
            Qty
          </div>
          <div className="text-[6.5px] text-[#71717a] uppercase tracking-widest text-right">
            Amt
          </div>
        </div>
        <div className="h-px bg-[#e4e4e7] mb-1.5" />
        {[
          ['UI Design System', '1', '$4,800'],
          ['Frontend Dev', '3', '$9,600'],
          ['QA & Testing', '1', '$2,400'],
        ].map(([desc, qty, amt]) => (
          <div
            key={desc}
            className="grid grid-cols-[1fr_auto_auto] gap-x-3 py-1.5 border-b border-[#f4f4f5]"
          >
            <div className="text-[8px] text-[#18181b]">{desc}</div>
            <div className="text-[8px] text-[#52525b] text-right">{qty}</div>
            <div className="text-[8px] font-medium text-[#18181b] text-right">{amt}</div>
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <div className="text-right min-w-[110px]">
          <div className="flex justify-between gap-6 text-[7.5px] text-[#71717a] mb-1">
            <span>Subtotal</span>
            <span>$16,800.00</span>
          </div>
          <div className="flex justify-between gap-6 text-[7.5px] text-[#71717a] mb-1.5">
            <span>Tax (8%)</span>
            <span>$1,344.00</span>
          </div>
          <div className="h-px bg-[#e4e4e7] mb-1.5" />
          <div className="flex justify-between gap-6 text-[10px] font-bold text-[#18181b]">
            <span>Total</span>
            <span>$18,144.00</span>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center pt-1 border-t border-[#f4f4f5]">
        <div className="text-[6.5px] text-[#a1a1aa]">Thank you for your business.</div>
        <div className="rounded-full bg-[#dcfce7] px-2 py-0.5 text-[6.5px] font-bold text-[#16a34a]">
          PAID
        </div>
      </div>
    </div>
  );
}

function ReportCard() {
  const bars = [
    { h: 55, label: 'Jan' },
    { h: 70, label: 'Feb' },
    { h: 45, label: 'Mar' },
    { h: 85, label: 'Apr' },
    { h: 65, label: 'May' },
    { h: 92, label: 'Jun' },
    { h: 75, label: 'Jul' },
  ];
  return (
    <div className="w-full h-full bg-white text-[#18181b] px-6 py-5 flex flex-col gap-3 font-sans overflow-hidden select-none">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[10px] font-bold text-[#18181b] tracking-tight leading-tight">
            Q3 Performance Report
          </div>
          <div className="text-[7.5px] text-[#71717a] mt-0.5">July — September 2024</div>
        </div>
        <div className="rounded bg-[#f4f4f5] px-1.5 py-0.5 text-[6.5px] font-medium text-[#52525b]">
          Confidential
        </div>
      </div>
      <div className="h-px bg-[#e4e4e7]" />
      <div className="grid grid-cols-3 gap-1.5">
        {[
          { label: 'Revenue', value: '$2.4M', delta: '+18%' },
          { label: 'Users', value: '48.3K', delta: '+31%' },
          { label: 'Churn', value: '2.1%', delta: '-0.4%' },
        ].map((kpi) => (
          <div key={kpi.label} className="rounded-md border border-[#e4e4e7] p-2">
            <div className="text-[6px] text-[#71717a] uppercase tracking-widest mb-0.5">
              {kpi.label}
            </div>
            <div className="text-[11px] font-bold text-[#18181b] leading-none">{kpi.value}</div>
            <div className="text-[6.5px] font-semibold text-[#16a34a] mt-0.5">{kpi.delta}</div>
          </div>
        ))}
      </div>
      <div className="flex-1 flex flex-col min-h-0">
        <div className="text-[7.5px] font-semibold text-[#18181b] mb-1.5">Monthly Revenue ($K)</div>
        <div className="flex-1 flex items-end gap-1.5 px-0.5">
          {bars.map((bar) => (
            <div key={bar.label} className="flex-1 flex flex-col items-center gap-0.5">
              <div
                className="w-full rounded-sm"
                style={{
                  height: `${bar.h}%`,
                  background: '#18181b',
                  opacity: bar.label === 'Jun' ? 1 : 0.1 + (bar.h / 100) * 0.5,
                }}
              />
              <div className="text-[5.5px] text-[#a1a1aa]">{bar.label.slice(0, 1)}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="h-px bg-[#e4e4e7]" />
      <div className="flex justify-between items-center">
        <div>
          <div className="text-[6px] text-[#a1a1aa] mb-0.5">Prepared by</div>
          <div
            className="text-[10px] text-[#52525b]"
            style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}
          >
            Sarah Chen
          </div>
          <div className="h-px w-12 bg-[#d4d4d8] mt-0.5" />
        </div>
        <div className="text-[6px] text-[#a1a1aa]">Page 1 of 4</div>
      </div>
    </div>
  );
}

function ContractCard() {
  return (
    <div className="w-full h-full bg-white text-[#18181b] px-6 py-5 flex flex-col gap-3 font-sans overflow-hidden select-none">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[10px] font-bold text-[#18181b] tracking-tight">
            Service Agreement
          </div>
          <div className="text-[7.5px] text-[#71717a] mt-0.5">Contract #SA-2024-118</div>
        </div>
        <div className="rounded border border-[#e4e4e7] px-2 py-0.5 text-[6.5px] font-semibold text-[#52525b] uppercase tracking-widest">
          Draft
        </div>
      </div>
      <div className="h-px bg-[#e4e4e7]" />
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-md border border-[#e4e4e7] p-2">
          <div className="text-[5.5px] text-[#71717a] uppercase tracking-widest mb-1">Provider</div>
          <div className="text-[8.5px] font-semibold text-[#18181b]">Studio Labs Inc.</div>
          <div className="text-[7px] text-[#71717a] mt-0.5">123 Design St, NY</div>
        </div>
        <div className="rounded-md border border-[#e4e4e7] p-2">
          <div className="text-[5.5px] text-[#71717a] uppercase tracking-widest mb-1">Client</div>
          <div className="text-[8.5px] font-semibold text-[#18181b]">Acme Corp</div>
          <div className="text-[7px] text-[#71717a] mt-0.5">456 Tech Ave, SF</div>
        </div>
      </div>
      <div className="flex-1 space-y-1.5">
        <div className="text-[8px] font-semibold text-[#18181b]">1. Scope of Work</div>
        <div className="space-y-0.5">
          <div className="h-1.5 bg-[#f4f4f5] rounded-sm w-full" />
          <div className="h-1.5 bg-[#f4f4f5] rounded-sm w-11/12" />
          <div className="h-1.5 bg-[#f4f4f5] rounded-sm w-10/12" />
        </div>
        <div className="text-[8px] font-semibold text-[#18181b] pt-0.5">2. Payment Terms</div>
        <div className="space-y-0.5">
          <div className="h-1.5 bg-[#f4f4f5] rounded-sm w-full" />
          <div className="h-1.5 bg-[#f4f4f5] rounded-sm w-9/12" />
        </div>
        <div className="text-[8px] font-semibold text-[#18181b] pt-0.5">3. Confidentiality</div>
        <div className="space-y-0.5">
          <div className="h-1.5 bg-[#f4f4f5] rounded-sm w-full" />
          <div className="h-1.5 bg-[#f4f4f5] rounded-sm w-8/12" />
        </div>
      </div>
      <div className="h-px bg-[#e4e4e7]" />
      <div className="grid grid-cols-2 gap-3">
        {['Service Provider', 'Client'].map((party) => (
          <div key={party}>
            <div className="text-[6px] text-[#a1a1aa] mb-1">{party}</div>
            <div
              className="text-[10px] text-[#52525b] mb-0.5"
              style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}
            >
              {party === 'Service Provider' ? 'Alex Morgan' : '___________'}
            </div>
            <div className="h-px bg-[#d4d4d8]" />
            <div className="text-[5.5px] text-[#a1a1aa] mt-0.5">Dec 12, 2024</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Floating card wrapper ────────────────────────────────────────────────────

interface FloatingCardProps {
  children: React.ReactNode;
  motionStyle?: Record<string, unknown>;
  rotate: number;
  zIndex: number;
  opacity?: number;
  delay?: number;
  left: string;
  top: string;
  width: string;
  height: string;
}

function FloatingCard({
  children,
  motionStyle = {},
  rotate,
  zIndex,
  opacity = 1,
  delay = 0,
  left,
  top,
  width,
  height,
}: FloatingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      animate={{ opacity, y: 0, scale: 1 }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        ...(motionStyle as Record<string, number | string>),
        position: 'absolute',
        left,
        top,
        width,
        height,
        rotate: `${rotate}deg`,
        zIndex,
      }}
      className="rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15),0_4px_16px_rgba(0,0,0,0.08)] border border-black/[0.06] bg-white"
    >
      {children}
    </motion.div>
  );
}

// ─── Desktop parallax hero ────────────────────────────────────────────────────

function HeroCardsDesktop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 48, damping: 18 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const x1 = useTransform(smoothX, [-1, 1], [-12, 12]);
  const y1 = useTransform(smoothY, [-1, 1], [-8, 8]);
  const x2 = useTransform(smoothX, [-1, 1], [8, -8]);
  const y2 = useTransform(smoothY, [-1, 1], [6, -6]);
  const x3 = useTransform(smoothX, [-1, 1], [-5, 12]);
  const y3 = useTransform(smoothY, [-1, 1], [10, -10]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX.set((e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2));
      mouseY.set((e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2));
    };
    const handleLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };
    container.addEventListener('mousemove', handleMove);
    container.addEventListener('mouseleave', handleLeave);
    return () => {
      container.removeEventListener('mousemove', handleMove);
      container.removeEventListener('mouseleave', handleLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="relative w-full h-[500px]" aria-hidden="true">
      {/* Contract — back left */}
      <FloatingCard
        motionStyle={{ x: x3, y: y3 }}
        left="0%"
        top="16%"
        width="44%"
        height="70%"
        rotate={-6}
        zIndex={10}
        opacity={0.8}
        delay={0.3}
      >
        <ContractCard />
      </FloatingCard>
      {/* Report — back right */}
      <FloatingCard
        motionStyle={{ x: x2, y: y2 }}
        left="56%"
        top="6%"
        width="44%"
        height="68%"
        rotate={5}
        zIndex={20}
        opacity={0.88}
        delay={0.2}
      >
        <ReportCard />
      </FloatingCard>
      {/* Invoice — front center */}
      <FloatingCard
        motionStyle={{ x: x1, y: y1 }}
        left="20%"
        top="2%"
        width="60%"
        height="88%"
        rotate={-2}
        zIndex={30}
        delay={0.1}
      >
        <InvoiceCard />
      </FloatingCard>
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 45% at 50% 65%, rgba(255,255,255,0.07) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}

// ─── Mobile stacked cards preview ────────────────────────────────────────────

function HeroCardsMobile() {
  return (
    <div
      className="relative w-full mx-auto"
      style={{ maxWidth: '340px', height: '240px' }}
      aria-hidden="true"
    >
      {/* Contract — back */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 0.7, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute rounded-xl overflow-hidden border border-black/[0.06] bg-white shadow-lg"
        style={{ left: '2%', top: '18%', width: '48%', height: '68%', rotate: '-5deg', zIndex: 10 }}
      >
        <ContractCard />
      </motion.div>
      {/* Report — back right */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute rounded-xl overflow-hidden border border-black/[0.06] bg-white shadow-lg"
        style={{ right: '2%', top: '10%', width: '48%', height: '66%', rotate: '4deg', zIndex: 20 }}
      >
        <ReportCard />
      </motion.div>
      {/* Invoice — front */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute rounded-xl overflow-hidden border border-black/[0.06] bg-white shadow-xl"
        style={{
          left: '50%',
          transform: 'translateX(-50%)',
          top: '0%',
          width: '60%',
          height: '85%',
          zIndex: 30,
        }}
      >
        <InvoiceCard />
      </motion.div>
    </div>
  );
}

// ─── Quick install ────────────────────────────────────────────────────────────

function QuickInstall() {
  const [copied, setCopied] = useState(false);
  const cmd = 'npx @akii09/pdfx-cli init';
  const copy = () => {
    navigator.clipboard.writeText(cmd).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 sm:gap-2.5 rounded-lg border border-border bg-muted/40 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-mono text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-150 group max-w-full overflow-hidden"
    >
      <span className="text-muted-foreground/40 group-hover:text-muted-foreground/60 transition-colors shrink-0">
        $
      </span>
      <span className="truncate">{cmd}</span>
      <Copy
        className={`h-3.5 w-3.5 shrink-0 transition-all ${copied ? 'text-foreground scale-110' : 'text-muted-foreground/40 group-hover:text-muted-foreground'}`}
      />
    </button>
  );
}

// ─── Component preview strip ──────────────────────────────────────────────────

const componentPreviews = [
  {
    name: 'Table',
    slug: 'table',
    snippet: (
      <div className="p-3 h-full flex flex-col">
        <div className="text-[8px] font-semibold text-foreground mb-2">Line Items</div>
        <div className="flex-1 flex flex-col gap-px">
          <div className="grid grid-cols-3 gap-1 bg-foreground/[0.06] rounded px-1.5 py-1.5">
            {['Item', 'Qty', 'Total'].map((h) => (
              <div
                key={h}
                className="text-[6px] font-bold text-muted-foreground uppercase tracking-wide"
              >
                {h}
              </div>
            ))}
          </div>
          {[
            ['Design', '1', '$4,200'],
            ['Dev', '3', '$9,600'],
            ['QA', '1', '$2,400'],
          ].map(([a, b, c]) => (
            <div key={a} className="grid grid-cols-3 gap-1 border-b border-border/30 px-1.5 py-1.5">
              <div className="text-[7px] text-foreground">{a}</div>
              <div className="text-[7px] text-muted-foreground">{b}</div>
              <div className="text-[7px] font-semibold text-foreground">{c}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    name: 'Graph',
    slug: 'graph',
    snippet: (
      <div className="p-3 h-full flex flex-col">
        <div className="text-[8px] font-semibold text-foreground mb-1">Revenue Q3</div>
        {/* Mini line chart using SVG */}
        <div className="flex-1 flex flex-col min-h-0">
          <svg
            viewBox="0 0 100 52"
            className="w-full flex-1"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            {/* Grid lines */}
            {[13, 26, 39].map((y) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="100"
                y2={y}
                stroke="currentColor"
                strokeOpacity="0.08"
                strokeWidth="0.8"
              />
            ))}
            {/* Bars */}
            {[
              { x: 4, h: 28, w: 10 },
              { x: 18, h: 36, w: 10 },
              { x: 32, h: 22, w: 10 },
              { x: 46, h: 44, w: 10 },
              { x: 60, h: 32, w: 10 },
              { x: 74, h: 48, w: 10 },
              { x: 88, h: 38, w: 10 },
            ].map((bar, idx) => (
              <rect
                key={bar.x}
                x={bar.x}
                y={52 - bar.h}
                width={bar.w}
                height={bar.h}
                rx="1.5"
                className="text-foreground"
                fill={idx === 5 ? 'currentColor' : 'currentColor'}
                fillOpacity={idx === 5 ? 0.85 : 0.18 + idx * 0.05}
              />
            ))}
          </svg>
          <div className="flex justify-between px-0.5 mt-0.5">
            {['J', 'F', 'M', 'A', 'M', 'J', 'J'].map((l) => (
              <div key={l} className="text-[5px] text-muted-foreground">
                {l}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    name: 'Badge',
    slug: 'badge',
    snippet: (
      <div className="p-3 h-full flex flex-col justify-center gap-2.5">
        <div className="text-[8px] font-semibold text-foreground">Status Labels</div>
        <div className="flex flex-wrap gap-1.5">
          {[
            { label: 'Active', bg: 'bg-green-100', text: 'text-green-700' },
            { label: 'Pending', bg: 'bg-amber-100', text: 'text-amber-700' },
            { label: 'Draft', bg: 'bg-foreground/10', text: 'text-muted-foreground' },
            { label: 'Paid', bg: 'bg-foreground', text: 'text-background' },
            { label: 'Overdue', bg: 'bg-red-100', text: 'text-red-700' },
          ].map(({ label, bg, text }) => (
            <span
              key={label}
              className={`rounded-full px-2 py-0.5 text-[6.5px] font-bold ${bg} ${text}`}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    ),
  },
  {
    name: 'PageHeader',
    slug: 'page-header',
    snippet: (
      <div className="h-full flex flex-col">
        <div className="bg-foreground px-3 py-2.5 flex justify-between items-center flex-shrink-0">
          <div>
            <div className="text-[8px] font-bold text-background leading-tight">
              Quarterly Report
            </div>
            <div className="text-[6px] text-background/50 mt-0.5">Fiscal Year 2024</div>
          </div>
          <div className="text-right">
            <div className="text-[6px] text-background/60">Acme Corp</div>
            <div className="text-[5px] text-background/30 mt-0.5">Confidential</div>
          </div>
        </div>
        <div className="flex-1 p-2.5 space-y-1.5">
          <div className="h-1.5 bg-muted rounded w-full" />
          <div className="h-1.5 bg-muted rounded w-10/12" />
          <div className="h-1.5 bg-muted/60 rounded w-7/12" />
        </div>
      </div>
    ),
  },
  {
    name: 'Signature',
    slug: 'signature',
    snippet: (
      <div className="p-3 h-full flex flex-col justify-center gap-3">
        <div className="text-[8px] font-semibold text-foreground">Authorization</div>
        <div className="grid grid-cols-2 gap-3">
          {['Approver', 'Witness'].map((role) => (
            <div key={role}>
              <div className="text-[5.5px] text-muted-foreground mb-1.5">{role}</div>
              <div
                className="text-[11px] text-muted-foreground/70 leading-none"
                style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}
              >
                {role === 'Approver' ? 'Alex M.' : '__________'}
              </div>
              <div className="h-px bg-border mt-1" />
              <div className="text-[5px] text-muted-foreground/40 mt-0.5">Dec 12, 2024</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    name: 'KeyValue',
    slug: 'key-value',
    snippet: (
      <div className="p-3 h-full flex flex-col justify-center gap-2">
        <div className="text-[8px] font-semibold text-foreground">Client Details</div>
        {[
          ['Company', 'Acme Corp'],
          ['Contact', 'Jane Doe'],
          ['Email', 'jane@acme.com'],
          ['Plan', 'Enterprise'],
        ].map(([k, v]) => (
          <div
            key={k}
            className="flex items-baseline justify-between border-b border-border/30 pb-1"
          >
            <div className="text-[6px] text-muted-foreground">{k}</div>
            <div className="text-[6.5px] font-semibold text-foreground">{v}</div>
          </div>
        ))}
      </div>
    ),
  },
];

// ─── Features ─────────────────────────────────────────────────────────────────

const features = [
  {
    title: 'Copy & own',
    description:
      'Components land in your project — not node_modules. Edit them freely without forking or patching anything.',
  },
  {
    title: 'Theme-driven',
    description:
      'One theme file, every component. Change your brand once and every PDF updates instantly.',
  },
  {
    title: 'Type safe',
    description:
      'Full TypeScript, strict types, IntelliSense on every prop. Errors surface at compile time, not in production.',
  },
  {
    title: 'PDF native',
    description:
      'Built directly on @react-pdf/renderer. No wrappers, no shims — pixel-perfect output in every viewer.',
  },
  {
    title: '20 components',
    description:
      'Tables, charts, headers, footers, signatures, images and more. Everything real-world PDFs actually need.',
  },
  {
    title: 'Open source',
    description:
      'MIT licensed. Free for personal and commercial projects. Contributions always welcome.',
  },
];

// ─── Main Home Page ───────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative flex flex-col justify-center overflow-hidden min-h-[auto] lg:min-h-screen">
        {/* Grid — light */}
        <div
          className="absolute inset-0 pointer-events-none dark:hidden"
          style={{
            backgroundImage:
              'linear-gradient(to right, oklch(0.86 0.005 285 / 0.5) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.86 0.005 285 / 0.5) 1px, transparent 1px)',
            backgroundSize: '52px 52px',
            maskImage: 'radial-gradient(ellipse 95% 80% at 50% 0%, black 15%, transparent 100%)',
          }}
          aria-hidden="true"
        />
        {/* Grid — dark */}
        <div
          className="absolute inset-0 pointer-events-none hidden dark:block"
          style={{
            backgroundImage:
              'linear-gradient(to right, oklch(0.26 0.008 285 / 0.45) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.26 0.008 285 / 0.45) 1px, transparent 1px)',
            backgroundSize: '52px 52px',
            maskImage: 'radial-gradient(ellipse 95% 80% at 50% 0%, black 15%, transparent 100%)',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 xl:px-8 pt-20 sm:pt-24 pb-8 sm:pb-16">
          {/* ── Desktop: side-by-side ── */}
          <div className="hidden lg:flex lg:items-center lg:gap-16 xl:gap-20">
            {/* Text */}
            <div className="flex-none w-[440px] xl:w-[500px]">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 backdrop-blur-sm px-3.5 py-1 text-xs text-muted-foreground mb-8">
                  <span className="h-1.5 w-1.5 rounded-full bg-foreground/50 animate-pulse" />
                  Open source · MIT · 20 components
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.06 }}
                className="text-[3.25rem] xl:text-[3.75rem] font-bold tracking-[-0.025em] text-foreground leading-[1.04] mb-6"
              >
                PDF components
                <br />
                <span className="text-muted-foreground/50">for React.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.12 }}
                className="text-base xl:text-lg text-muted-foreground mb-8 leading-relaxed"
              >
                Copy, paste, customize. Professional PDFs with a component library you fully own —
                built on @react-pdf/renderer.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.18 }}
                className="flex items-center gap-3 mb-5"
              >
                <Link
                  to="/docs"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-foreground text-background font-medium text-sm hover:opacity-90 active:scale-[0.98] transition-all"
                >
                  Get started <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/components"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-foreground font-medium text-sm hover:bg-muted active:scale-[0.98] transition-all"
                >
                  Browse components
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.28 }}
                className="mb-5"
              >
                <QuickInstall />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.38 }}
              >
                <a
                  href="https://github.com/akii09/pdfx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="h-4 w-4" /> View on GitHub
                </a>
              </motion.div>
            </div>

            {/* Cards */}
            <div className="flex-1 min-w-0">
              <HeroCardsDesktop />
            </div>
          </div>

          {/* ── Mobile: stacked ── */}
          <div className="lg:hidden flex flex-col items-center text-center">
            <div className="w-full max-w-sm sm:max-w-md mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-border/70 bg-background/70 backdrop-blur-sm px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs text-muted-foreground mb-4 sm:mb-6">
                  <span className="h-1.5 w-1.5 rounded-full bg-foreground/50 animate-pulse" />
                  Open source · MIT · 20 components
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.06 }}
                className="text-[1.75rem] sm:text-[2.5rem] font-bold tracking-[-0.025em] text-foreground leading-[1.1] mb-3 sm:mb-5"
              >
                PDF components
                <br />
                <span className="text-muted-foreground/50">for React.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.12 }}
                className="text-sm sm:text-base text-muted-foreground mb-5 sm:mb-7 leading-relaxed"
              >
                Copy, paste, customize. Professional PDFs with a component library you fully own.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.18 }}
                className="flex flex-col gap-2.5 mb-4 sm:mb-5"
              >
                <Link
                  to="/docs"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 rounded-lg bg-foreground text-background font-medium text-sm hover:opacity-90 active:scale-[0.98] transition-all"
                >
                  Get started <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/components"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 rounded-lg border border-border text-foreground font-medium text-sm hover:bg-muted active:scale-[0.98] transition-all"
                >
                  Browse components
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.26 }}
                className="flex justify-center mb-4 sm:mb-5"
              >
                <QuickInstall />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.34 }}
                className="flex justify-center"
              >
                <a
                  href="https://github.com/akii09/pdfx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="h-4 w-4" /> View on GitHub
                </a>
              </motion.div>
            </div>

            {/* Mobile cards preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="w-full mt-6 sm:mt-10 overflow-hidden"
            >
              <HeroCardsMobile />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── COMPONENT PREVIEW ─────────────────────────────────────────────── */}
      <section
        className="py-20 sm:py-28 px-4 sm:px-6 border-t border-border/60"
        aria-label="Component library overview"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="mb-12 sm:mb-16"
          >
            {/* Label */}
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
              Component Library
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight max-w-md">
                Everything for professional PDFs
              </h2>
              <Link
                to="/components"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium flex-shrink-0"
              >
                View all 20 components <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {componentPreviews.map((comp, i) => (
              <motion.div
                key={comp.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.38, delay: i * 0.05 }}
              >
                <Link
                  to={`/components/${comp.slug}`}
                  className="group flex flex-col rounded-xl border border-border/60 bg-card hover:border-foreground/25 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 overflow-hidden h-full"
                >
                  <div className="h-[155px] sm:h-[165px] overflow-hidden bg-muted/10">
                    {comp.snippet}
                  </div>
                  <div className="px-3 py-2.5 border-t border-border/40 flex items-center justify-between bg-card">
                    <span className="text-xs font-semibold text-foreground">{comp.name}</span>
                    <ArrowRight className="h-3 w-3 text-muted-foreground/30 group-hover:text-muted-foreground group-hover:translate-x-0.5 transition-all" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────────────────── */}
      <section
        className="py-20 sm:py-28 px-4 sm:px-6 border-t border-border/60 bg-muted/[0.12]"
        aria-label="Key features"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="mb-12 sm:mb-16"
          >
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
              Why PDFx
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight max-w-md">
              Designed to stay out of your way
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.38, delay: i * 0.06 }}
                className="rounded-xl border border-border/60 bg-card p-6 hover:border-foreground/15 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200"
              >
                <h3 className="text-sm font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ───────────────────────────────────────────────────── */}
      <section
        className="py-24 sm:py-32 px-4 sm:px-6 border-t border-border/60"
        aria-label="Get started"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Ready to build?</h2>
          <p className="text-muted-foreground mb-10 leading-relaxed text-sm sm:text-base">
            Initialize PDFx, pick your theme, add the components you need. Everything lives in your
            project — nothing to host, nothing to subscribe to.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/docs"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-foreground text-background font-medium text-sm hover:opacity-90 active:scale-[0.98] transition-all"
            >
              Read the docs <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="https://github.com/akii09/pdfx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-medium text-sm hover:bg-muted active:scale-[0.98] transition-all"
            >
              <Github className="h-4 w-4" /> Star on GitHub
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
