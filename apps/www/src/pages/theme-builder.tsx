import {
  Code2,
  Download,
  ExternalLink,
  Redo2,
  RotateCcw,
  Share2,
  SlidersHorizontal,
  Undo2,
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ThemeCodeModal } from '../components/theme-builder/ThemeCodeModal';
import { ThemeControlPanel } from '../components/theme-builder/ThemeControlPanel';
import { ThemePreviewPanel } from '../components/theme-builder/ThemePreviewPanel';
import { useThemeBuilder } from '../components/theme-builder/use-theme-builder';
import { PRESET_ACCENT_MAP } from '../lib/theme-presets';
import { readThemeFromHash, writeThemeToHash } from '../lib/theme-serializer';
import { cn } from '../lib/utils';

const SHARE_TOAST_DURATION = 2_000; // ms
const DEBOUNCE_MS = 350;
const PANEL_WIDTH = 360; // must match the w-[360px] on the floating panel

function useDocumentTitle(title: string) {
  useEffect(() => {
    const prev = document.title;
    document.title = title;
    return () => {
      document.title = prev;
    };
  }, [title]);
}

export default function ThemeBuilderPage() {
  useDocumentTitle('Theme Builder — PDFx');

  const initialTheme = readThemeFromHash();
  const { theme, basePreset, canUndo, canRedo, actions } = useThemeBuilder(
    initialTheme ?? undefined
  );

  const [loadedFromUrl] = useState(() => initialTheme !== null);
  const [shareToast, setShareToast] = useState(false);
  const [codeModalOpen, setCodeModalOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(true);

  // Blob URL lifted from ThemePreviewPanel → feeds Download + Open in new tab
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const handleUrlChange = useCallback((url: string | null) => setPdfUrl(url), []);

  // Debounced preview theme — avoids re-rendering the PDF on every keystroke
  const [previewTheme, setPreviewTheme] = useState(theme);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setPreviewTheme(theme);
      writeThemeToHash(theme);
    }, DEBOUNCE_MS);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [theme]);

  // ⌘Z / ⌘⇧Z keyboard shortcuts
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const meta = e.metaKey || e.ctrlKey;
      if (meta && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        actions.undo();
      }
      if (meta && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        actions.redo();
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [actions]);

  const handleShare = useCallback(() => {
    writeThemeToHash(theme);
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        setShareToast(true);
        setTimeout(() => setShareToast(false), SHARE_TOAST_DURATION);
      })
      .catch(() => {
        setShareToast(true);
        setTimeout(() => setShareToast(false), SHARE_TOAST_DURATION);
      });
  }, [theme]);

  const fileName = `${theme.name || 'theme'}-preview.pdf`;

  return (
    <div className="flex w-full flex-col" style={{ height: 'calc(100vh - 3.5rem)' }}>
      {/* ── Top bar ─────────────────────────────────────────────────────── */}
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-border bg-background px-5 py-2">
        {/* Left: title · preset badge · shared-link badge */}
        <div className="flex min-w-0 items-center gap-2">
          <h1 className="whitespace-nowrap text-sm font-semibold text-foreground">Theme Builder</h1>

          <span className="hidden sm:inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-border/60 bg-muted/60 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: PRESET_ACCENT_MAP[basePreset] }}
            />
            <span className="capitalize">{basePreset}</span>
          </span>

          {loadedFromUrl && (
            <span className="hidden md:inline-flex whitespace-nowrap rounded-full border border-accent/20 bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent">
              From shared link
            </span>
          )}
        </div>

        {/* Right: history · reset · get code · download · open · share */}
        <div className="flex items-center gap-1">
          {/* Undo / Redo */}
          <button
            type="button"
            onClick={actions.undo}
            disabled={!canUndo}
            title="Undo (⌘Z)"
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
          >
            <Undo2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={actions.redo}
            disabled={!canRedo}
            title="Redo (⌘⇧Z)"
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
          >
            <Redo2 className="h-4 w-4" />
          </button>

          <div className="mx-1 h-4 w-px bg-border" />

          {/* Reset to preset defaults */}
          <button
            type="button"
            onClick={() => actions.loadPreset(basePreset)}
            title={`Reset to ${basePreset} defaults`}
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <div className="mx-1 h-4 w-px bg-border" />

          {/* Get code */}
          <button
            type="button"
            onClick={() => setCodeModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Code2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Get Code</span>
          </button>

          {/* Download PDF */}
          <a
            href={pdfUrl ?? '#'}
            download={fileName}
            title="Download PDF"
            aria-disabled={!pdfUrl}
            onClick={(e) => !pdfUrl && e.preventDefault()}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium transition-colors',
              pdfUrl
                ? 'text-muted-foreground hover:bg-muted hover:text-foreground'
                : 'cursor-not-allowed border-border/30 text-muted-foreground/30'
            )}
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Download</span>
          </a>

          {/* Open in new tab */}
          <a
            href={pdfUrl ?? '#'}
            target="_blank"
            rel="noopener noreferrer"
            title="Open PDF in new tab"
            aria-disabled={!pdfUrl}
            onClick={(e) => !pdfUrl && e.preventDefault()}
            className={cn(
              'rounded-md p-1.5 transition-colors',
              pdfUrl
                ? 'text-muted-foreground hover:bg-muted hover:text-foreground'
                : 'cursor-not-allowed text-muted-foreground/30'
            )}
          >
            <ExternalLink className="h-4 w-4" />
          </a>

          <div className="mx-1 h-4 w-px bg-border" />

          {/* Share */}
          <button
            type="button"
            onClick={handleShare}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-all',
              shareToast
                ? 'border border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400'
                : 'bg-primary text-primary-foreground hover:bg-primary/90'
            )}
          >
            <Share2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{shareToast ? 'Copied!' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* ── Canvas ──────────────────────────────────────────────────────── */}
      <div className="relative min-h-0 flex-1 overflow-hidden">
        {/*
         * The PDF preview fills the full canvas. `reservedRight` tells it how
         * much of its right edge is obscured by the floating panel so it can
         * shift the centering calculation accordingly.
         */}
        <ThemePreviewPanel
          theme={previewTheme}
          reservedRight={panelOpen ? PANEL_WIDTH : 0}
          onUrlChange={handleUrlChange}
        />

        {/* Floating customizer panel (slides in from the right) */}
        <div
          className={cn(
            'absolute inset-y-0 right-0 z-20',
            'flex flex-col',
            'border-l border-border bg-background/[0.98] shadow-2xl backdrop-blur-md',
            'transition-transform duration-300 ease-in-out will-change-transform'
          )}
          style={{
            width: PANEL_WIDTH,
            transform: panelOpen ? 'translateX(0)' : `translateX(${PANEL_WIDTH}px)`,
          }}
          aria-label="Theme customizer"
        >
          <ThemeControlPanel
            theme={theme}
            basePreset={basePreset}
            actions={actions}
            onClose={() => setPanelOpen(false)}
          />
        </div>

        {/* FAB — visible only when the panel is hidden */}
        <button
          type="button"
          onClick={() => setPanelOpen(true)}
          aria-label="Open theme customizer"
          className={cn(
            'absolute bottom-5 right-5 z-10',
            'flex items-center gap-2.5 rounded-full',
            'bg-foreground px-5 py-3 text-sm font-semibold text-background',
            'shadow-xl ring-1 ring-foreground/10',
            'transition-all duration-300 ease-in-out',
            panelOpen
              ? 'pointer-events-none translate-x-3 scale-95 opacity-0'
              : 'translate-x-0 scale-100 opacity-100'
          )}
        >
          <SlidersHorizontal className="h-4 w-4 shrink-0" />
          Customize
        </button>
      </div>

      {/* Code export modal */}
      <ThemeCodeModal
        theme={theme}
        basePreset={basePreset}
        open={codeModalOpen}
        onClose={() => setCodeModalOpen(false)}
      />
    </div>
  );
}
