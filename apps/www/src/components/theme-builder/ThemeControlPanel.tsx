import type { PdfxTheme } from '@pdfx/shared';
import {
  Check,
  ChevronDown,
  ChevronsRight,
  Link,
  Shuffle,
  SlidersHorizontal,
  Unlink,
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { FONT_CATEGORY_LABELS, FONT_OPTIONS, type FontOption } from '../../lib/pdf-fonts';
import type { PresetName } from '../../lib/theme-code-generator';
import { THEME_PRESETS } from '../../lib/theme-presets';
import { cn } from '../../lib/utils';
import { ColorInput } from './controls/ColorInput';
import { SegmentedControl } from './controls/SegmentedControl';
import { SliderInput } from './controls/SliderInput';
import type { ThemeBuilderActions } from './use-theme-builder';

// ─── Collapsible section ─────────────────────────────────────────────────────

interface SectionProps {
  title: string;
  icon: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

function Section({ title, icon, defaultOpen = true, children }: SectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border/50 last:border-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-muted/40 group"
      >
        <div className="flex items-center gap-2">
          <span className="text-base leading-none">{icon}</span>
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors group-hover:text-foreground">
            {title}
          </span>
        </div>
        <ChevronDown
          className={cn(
            'h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-200',
            open && 'rotate-180'
          )}
        />
      </button>
      {open && <div className="px-4 pb-4 pt-1">{children}</div>}
    </div>
  );
}

// ─── Font family picker ───────────────────────────────────────────────────────

const groupedFonts = FONT_OPTIONS.reduce<Record<string, FontOption[]>>((acc, font) => {
  const label = FONT_CATEGORY_LABELS[font.category];
  if (!acc[label]) acc[label] = [];
  acc[label].push(font);
  return acc;
}, {});

const FONT_GROUP_ORDER = [
  FONT_CATEGORY_LABELS.sans,
  FONT_CATEGORY_LABELS.serif,
  FONT_CATEGORY_LABELS.mono,
];

interface FontPickerDropdownProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

/**
 * Custom font picker that renders its dropdown as `position: fixed` so it
 * escapes the panel's `overflow-y: auto` scroll container and is never clipped.
 */
function FontPickerDropdown({ label, value, onChange }: FontPickerDropdownProps) {
  const [open, setOpen] = useState(false);
  const [dropRect, setDropRect] = useState<{ top: number; left: number; width: number } | null>(
    null
  );
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside (skip the trigger — it toggles itself)
  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      const target = e.target as Node;
      if (triggerRef.current?.contains(target)) return;
      if (dropdownRef.current?.contains(target)) return;
      setOpen(false);
    }
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  function handleToggle() {
    if (!open && triggerRef.current) {
      const r = triggerRef.current.getBoundingClientRect();
      setDropRect({ top: r.bottom + 4, left: r.left, width: r.width });
    }
    setOpen((o) => !o);
  }

  return (
    <div className="py-1.5">
      <p className="mb-2 text-sm font-medium leading-none text-foreground">{label}</p>

      {/* Trigger */}
      <button
        ref={triggerRef}
        type="button"
        onClick={handleToggle}
        className={cn(
          'flex w-full items-center justify-between gap-2 rounded-md border border-border bg-muted/50 px-3 py-1.5',
          'text-left text-sm transition-colors hover:bg-muted focus:outline-none focus-visible:ring-1 focus-visible:ring-ring',
          open && 'ring-1 ring-ring'
        )}
      >
        <span className="truncate font-medium text-foreground">{value}</span>
        <ChevronDown
          className={cn(
            'h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-200',
            open && 'rotate-180'
          )}
        />
      </button>

      {/* Dropdown — portalled to <body> so it escapes backdrop-filter/overflow
          containing blocks on the panel wrapper. */}
      {open &&
        dropRect &&
        createPortal(
          <div
            ref={dropdownRef}
            className="fixed z-[200] overflow-hidden rounded-md border border-border bg-background shadow-xl"
            style={{ top: dropRect.top, left: dropRect.left, width: dropRect.width }}
          >
            <div className="overflow-y-auto" style={{ maxHeight: 240 }}>
              {FONT_GROUP_ORDER.map((groupLabel) => {
                const fonts = groupedFonts[groupLabel];
                if (!fonts?.length) return null;
                return (
                  <div key={groupLabel}>
                    <div className="bg-muted/90 px-3 py-1 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {groupLabel}
                    </div>
                    {fonts.map((f) => (
                      <button
                        key={f.value}
                        type="button"
                        onClick={() => {
                          onChange(f.value);
                          setOpen(false);
                        }}
                        className={cn(
                          'flex w-full items-center justify-between px-3 py-2 text-left text-sm transition-colors',
                          f.value === value
                            ? 'bg-muted/80 text-foreground'
                            : 'text-foreground/80 hover:bg-muted/50 hover:text-foreground'
                        )}
                      >
                        <span>{f.label}</span>
                        {f.value === value && (
                          <Check className="h-3.5 w-3.5 shrink-0 text-foreground/60" />
                        )}
                      </button>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>,
          document.body
        )}

      {/* Meta line */}
      <p className="mt-1.5 text-[10px] text-muted-foreground">
        <>
          <span className="rounded border border-accent/20 bg-accent/10 px-1 py-0.5 text-[9px] font-medium text-accent">
            Google
          </span>{' '}
          Auto-registered in generated theme file
        </>
      </p>
    </div>
  );
}

// ─── Preset dropdown ──────────────────────────────────────────────────────────

interface PresetDropdownProps {
  value: PresetName;
  onChange: (preset: PresetName) => void;
}

function PresetDropdown({ value, onChange }: PresetDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const active = THEME_PRESETS.find((p) => p.name === value) ?? THEME_PRESETS[0];

  // Close when user clicks outside
  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, []);

  // Pick a random preset that isn't the current one
  const handleShuffle = useCallback(() => {
    const others = THEME_PRESETS.filter((p) => p.name !== value);
    const next = others[Math.floor(Math.random() * others.length)];
    onChange(next.name);
  }, [value, onChange]);

  return (
    <div className="flex items-center gap-1.5">
      {/* Dropdown trigger */}
      <div ref={ref} className="relative flex-1">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className={cn(
            'flex w-full items-center gap-2.5 rounded-md border border-border bg-muted/50 px-3 py-2',
            'text-left text-sm transition-colors hover:bg-muted focus:outline-none focus-visible:ring-1 focus-visible:ring-ring'
          )}
        >
          {/* Colour dots */}
          <SwatchDots accent={active.accent} dots={active.dots} />
          <div className="min-w-0 flex-1">
            <span className="block text-sm font-semibold leading-none text-foreground">
              {active.label}
            </span>
            <span className="mt-0.5 block text-[10px] leading-none text-muted-foreground">
              {active.description}
            </span>
          </div>
          <ChevronDown
            className={cn(
              'h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200',
              open && 'rotate-180'
            )}
          />
        </button>

        {/* Dropdown list */}
        {open && (
          <div className="absolute left-0 right-0 z-50 mt-1 overflow-hidden rounded-md border border-border bg-background shadow-xl">
            <div className="max-h-[320px] overflow-y-auto py-1">
              {THEME_PRESETS.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => {
                    onChange(p.name);
                    setOpen(false);
                  }}
                  className={cn(
                    'flex w-full items-center gap-2.5 px-3 py-2.5 text-left transition-colors',
                    p.name === value ? 'bg-muted/70' : 'hover:bg-muted/50'
                  )}
                >
                  <SwatchDots accent={p.accent} dots={p.dots} />
                  <div className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold leading-none">{p.label}</span>
                    <span className="mt-0.5 block text-[10px] leading-none text-muted-foreground">
                      {p.description}
                    </span>
                  </div>
                  {p.name === value && (
                    <Check className="h-3.5 w-3.5 shrink-0 text-foreground/60" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Shuffle button */}
      <button
        type="button"
        onClick={handleShuffle}
        title="Pick a random preset"
        className="shrink-0 rounded-md border border-border p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      >
        <Shuffle className="h-4 w-4" />
      </button>
    </div>
  );
}

/** Reusable colour-dot trio used in both trigger and list items. */
function SwatchDots({ accent, dots }: { accent: string; dots: [string, string] }) {
  return (
    <div className="flex shrink-0 gap-1">
      {[accent, ...dots].map((c) => (
        <div
          key={c}
          className="h-3 w-3 rounded-full border border-border/60"
          style={{ backgroundColor: c }}
        />
      ))}
    </div>
  );
}

// ─── Color tokens list ────────────────────────────────────────────────────────

const COLOR_TOKENS: { key: keyof PdfxTheme['colors']; label: string; description: string }[] = [
  { key: 'foreground', label: 'Foreground', description: 'Primary text' },
  { key: 'background', label: 'Background', description: 'Page background' },
  { key: 'muted', label: 'Muted', description: 'Secondary fill' },
  { key: 'mutedForeground', label: 'Muted Foreground', description: 'Captions, footnotes' },
  { key: 'primary', label: 'Primary', description: 'Brand emphasis' },
  { key: 'primaryForeground', label: 'Primary Foreground', description: 'Text on primary' },
  { key: 'border', label: 'Border', description: 'Dividers, table lines' },
  { key: 'accent', label: 'Accent', description: 'Links, highlights' },
  { key: 'destructive', label: 'Destructive', description: 'Errors' },
  { key: 'success', label: 'Success', description: 'Success states' },
  { key: 'warning', label: 'Warning', description: 'Warning states' },
  { key: 'info', label: 'Info', description: 'Info states' },
];

// ─── Main panel ───────────────────────────────────────────────────────────────

export interface ThemeControlPanelProps {
  theme: PdfxTheme;
  basePreset: PresetName;
  actions: ThemeBuilderActions;
  onClose?: () => void;
}

export function ThemeControlPanel({ theme, basePreset, actions, onClose }: ThemeControlPanelProps) {
  const [linkedMargins, setLinkedMargins] = useState(false);

  function handleMarginChange(
    edge: 'marginTop' | 'marginRight' | 'marginBottom' | 'marginLeft',
    value: number
  ) {
    if (linkedMargins) {
      for (const e of ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'] as const) {
        actions.setPageMargin(e, value);
      }
    } else {
      actions.setPageMargin(edge, value);
    }
  }

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* ── Panel header ─────────────────────────────────────────────────── */}
      <div className="flex shrink-0 items-center justify-between border-b border-border/60 bg-muted/30 px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <SlidersHorizontal className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          <div className="min-w-0">
            <span className="block text-[10px] font-semibold uppercase leading-none tracking-wider text-muted-foreground">
              Theme Customizer
            </span>
            {theme.name && (
              <span className="mt-0.5 block truncate text-xs font-medium leading-tight text-foreground/70">
                {theme.name}
              </span>
            )}
          </div>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            title="Hide panel"
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <ChevronsRight className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* ── Scrollable content ────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {/* Name + preset */}
        <div className="space-y-3.5 border-b border-border/60 px-4 pb-4 pt-4">
          <div>
            <label
              htmlFor="theme-name-input"
              className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Theme Name
            </label>
            <input
              id="theme-name-input"
              type="text"
              value={theme.name}
              onChange={(e) => actions.setName(e.target.value)}
              placeholder="my-theme"
              className={cn(
                'w-full rounded-md border border-border bg-muted/50 px-3 py-1.5 text-sm text-foreground',
                'transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-ring'
              )}
            />
          </div>

          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Preset
            </p>
            <PresetDropdown value={basePreset} onChange={actions.loadPreset} />
          </div>
        </div>

        {/* ── Colors ──────────────────────────────────────────────────────── */}
        <Section title="Colors" icon="🎨">
          <div className="divide-y divide-border/30">
            {COLOR_TOKENS.map(({ key, label, description }) => (
              <ColorInput
                key={key}
                label={label}
                description={description}
                value={theme.colors[key]}
                onChange={(v) => actions.setColor(key, v)}
              />
            ))}
          </div>
        </Section>

        {/* ── Typography ──────────────────────────────────────────────────── */}
        <Section title="Typography" icon="Aa">
          {/* Body text */}
          <div className="mb-4">
            <p className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
              Body Text
            </p>
            <FontPickerDropdown
              label="Font Family"
              value={theme.typography.body.fontFamily}
              onChange={actions.setBodyFontFamily}
            />
            <SliderInput
              label="Font Size"
              value={theme.typography.body.fontSize}
              min={8}
              max={16}
              step={0.5}
              unit="pt"
              onChange={actions.setBodyFontSize}
            />
            <SliderInput
              label="Line Height"
              value={theme.typography.body.lineHeight}
              min={1.0}
              max={2.0}
              step={0.05}
              unit="×"
              onChange={actions.setBodyLineHeight}
            />
          </div>

          <div className="mb-4 h-px bg-border/50" />

          {/* Headings */}
          <div className="mb-4">
            <p className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
              Headings
            </p>
            <FontPickerDropdown
              label="Font Family"
              value={theme.typography.heading.fontFamily}
              onChange={actions.setHeadingFontFamily}
            />
            <SegmentedControl
              label="Font Weight"
              options={[
                { value: '400', label: 'Regular' },
                { value: '500', label: 'Medium' },
                { value: '600', label: 'Semibold' },
                { value: '700', label: 'Bold' },
              ]}
              value={String(theme.typography.heading.fontWeight)}
              onChange={(v) => actions.setHeadingFontWeight(Number(v))}
            />
            <SliderInput
              label="Line Height"
              value={theme.typography.heading.lineHeight}
              min={1.0}
              max={1.8}
              step={0.05}
              unit="×"
              onChange={actions.setHeadingLineHeight}
            />
          </div>

          <div className="mb-4 h-px bg-border/50" />

          {/* Heading size scale */}
          <div>
            <p className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
              Heading Sizes
            </p>
            {(
              [
                ['h1', 'H1', 18, 56],
                ['h2', 'H2', 14, 44],
                ['h3', 'H3', 12, 36],
                ['h4', 'H4', 10, 28],
                ['h5', 'H5', 9, 22],
                ['h6', 'H6', 8, 18],
              ] as const
            ).map(([level, lbl, min, max]) => (
              <SliderInput
                key={level}
                label={lbl}
                value={theme.typography.heading.fontSize[level]}
                min={min}
                max={max}
                step={1}
                unit="pt"
                onChange={(v) => actions.setHeadingFontSize(level, v)}
              />
            ))}
          </div>
        </Section>

        {/* ── Page ────────────────────────────────────────────────────────── */}
        <Section title="Page" icon="📄">
          <SegmentedControl
            label="Size"
            options={[
              { value: 'A4', label: 'A4' },
              { value: 'LETTER', label: 'Letter' },
              { value: 'LEGAL', label: 'Legal' },
            ]}
            value={theme.page.size}
            onChange={actions.setPageSize}
          />
          <SegmentedControl
            label="Orientation"
            options={[
              { value: 'portrait', label: 'Portrait' },
              { value: 'landscape', label: 'Landscape' },
            ]}
            value={theme.page.orientation}
            onChange={actions.setPageOrientation}
          />
        </Section>

        {/* ── Spacing ─────────────────────────────────────────────────────── */}
        <Section title="Spacing" icon="↔">
          {/* Page margins */}
          <div className="mb-4">
            <div className="mb-2 flex items-center justify-between">
              <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
                Page Margins
              </p>
              <button
                type="button"
                onClick={() => setLinkedMargins((l) => !l)}
                title={linkedMargins ? 'Unlink margins' : 'Link all margins'}
                className={cn(
                  'flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium transition-colors',
                  linkedMargins
                    ? 'bg-foreground/10 text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {linkedMargins ? <Link className="h-3 w-3" /> : <Unlink className="h-3 w-3" />}
                {linkedMargins ? 'Linked' : 'Link'}
              </button>
            </div>
            {(
              [
                ['marginTop', 'Top'],
                ['marginRight', 'Right'],
                ['marginBottom', 'Bottom'],
                ['marginLeft', 'Left'],
              ] as const
            ).map(([edge, lbl]) => (
              <SliderInput
                key={edge}
                label={lbl}
                value={theme.spacing.page[edge]}
                min={16}
                max={96}
                step={2}
                unit="pt"
                onChange={(v) => handleMarginChange(edge, v)}
              />
            ))}
          </div>

          <div className="mb-4 h-px bg-border/50" />

          {/* Gaps */}
          <div>
            <p className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
              Gaps
            </p>
            <SliderInput
              label="Section Gap"
              description="Space before H2 headings"
              value={theme.spacing.sectionGap}
              min={0}
              max={60}
              step={2}
              unit="pt"
              onChange={(v) => actions.setSpacingGap('sectionGap', v)}
            />
            <SliderInput
              label="Paragraph Gap"
              description="Space after paragraphs"
              value={theme.spacing.paragraphGap}
              min={0}
              max={30}
              step={1}
              unit="pt"
              onChange={(v) => actions.setSpacingGap('paragraphGap', v)}
            />
            <SliderInput
              label="Component Gap"
              description="Space between components"
              value={theme.spacing.componentGap}
              min={0}
              max={30}
              step={1}
              unit="pt"
              onChange={(v) => actions.setSpacingGap('componentGap', v)}
            />
          </div>
        </Section>
      </div>
    </div>
  );
}
