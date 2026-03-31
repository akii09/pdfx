import type { PdfxTheme } from '@pdfx/shared';
import { usePDF } from '@react-pdf/renderer';
import { AlertCircle, FileText, Loader2 } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ThemePreviewDocument } from './ThemePreviewDocument';

interface ThemePreviewPanelProps {
  theme: PdfxTheme;
  /**
   * Width (px) of UI chrome that visually covers the right edge of this panel.
   * The PDF canvas adjusts its right-padding by this amount so the document
   * appears centred in the *visible* area, not the full container width.
   *
   * Matches the slide-in/out CSS transition duration (300 ms) via a CSS
   * transition on padding, so the document re-centres smoothly.
   */
  reservedRight?: number;
  /** Called whenever the rendered PDF blob URL changes (or becomes null). */
  onUrlChange?: (url: string | null) => void;
}

/**
 * Full-bleed PDF preview with a professional dark-canvas aesthetic.
 *
 * Design notes:
 * - Background (#525659) matches Chrome/Acrobat's PDF viewer canvas.
 * - `#toolbar=0` on the blob URL hides the browser's native PDF chrome.
 * - `reservedRight` compensates for the floating customizer panel so the
 *   document is always centred in the user-visible area.
 * - A blur overlay appears when the theme changes mid-session (e.g. font
 *   switch) so the user gets feedback without a jarring flash.
 */
export function ThemePreviewPanel({
  theme,
  reservedRight = 0,
  onUrlChange,
}: ThemePreviewPanelProps) {
  const [iframeKey, setIframeKey] = useState(0);
  const isFirstRender = useRef(true);
  const [showOverlay, setShowOverlay] = useState(false);

  const documentElement = useMemo(() => <ThemePreviewDocument theme={theme} />, [theme]);
  const [instance, updateInstance] = usePDF({ document: documentElement });

  // Re-render whenever the document changes (skip initial mount — usePDF
  // already renders it once; re-triggering causes a double flash).
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setShowOverlay(true);
    updateInstance(documentElement);
    setIframeKey((k) => k + 1);
  }, [documentElement, updateInstance]);

  // Clear overlay once the new render finishes
  useEffect(() => {
    if (!instance.loading && showOverlay) setShowOverlay(false);
  }, [instance.loading, showOverlay]);

  // Bubble URL to parent (Download / Open in new tab buttons live in the header)
  useEffect(() => {
    onUrlChange?.(instance.url ?? null);
  }, [instance.url, onUrlChange]);

  const fileName = `${theme.name || 'theme'}-preview.pdf`;

  // ── Initial loading skeleton ─────────────────────────────────────────────
  if (instance.loading && !showOverlay) {
    return (
      <div className="h-full flex items-center justify-center" style={{ background: '#525659' }}>
        <div className="flex flex-col items-center gap-4">
          <div className="flex w-52 flex-col gap-2.5">
            <div className="h-4 w-2/5 animate-pulse rounded bg-white/15" />
            <div className="h-2.5 w-full animate-pulse rounded bg-white/15" />
            <div className="h-2.5 w-4/5 animate-pulse rounded bg-white/15" />
            <div className="h-2.5 w-3/5 animate-pulse rounded bg-white/15" />
            <div className="mt-3 h-20 w-full animate-pulse rounded bg-white/15" />
            <div className="mt-2 h-2.5 w-full animate-pulse rounded bg-white/15" />
            <div className="h-2.5 w-11/12 animate-pulse rounded bg-white/15" />
          </div>
          <p className="mt-1 text-xs text-white/40">Rendering preview…</p>
        </div>
        <span className="sr-only" aria-live="polite">
          Rendering PDF preview…
        </span>
      </div>
    );
  }

  // ── Error state ──────────────────────────────────────────────────────────
  if (instance.error) {
    return (
      <div
        className="h-full flex flex-col items-center justify-center gap-3 p-8"
        style={{ background: '#525659' }}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/20">
          <AlertCircle className="h-5 w-5 text-red-400" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-red-300">Failed to render preview</p>
          <p className="mt-1 max-w-xs text-xs text-white/50">{String(instance.error)}</p>
        </div>
      </div>
    );
  }

  // ── Viewer ───────────────────────────────────────────────────────────────
  return (
    <div className="flex h-full flex-col" style={{ background: '#525659' }}>
      {/* ── Slim document bar ─────────────────────────────────────────────── */}
      <div
        className="flex shrink-0 items-center gap-2 px-5 py-2"
        style={{ background: 'rgba(0,0,0,0.22)', borderBottom: '1px solid rgba(0,0,0,0.3)' }}
      >
        <FileText className="h-3.5 w-3.5 shrink-0 text-white/40" />
        <span className="truncate text-xs font-medium text-white/55">{fileName}</span>
      </div>

      {/* ── PDF canvas ────────────────────────────────────────────────────── */}
      {/*
       * paddingRight grows by `reservedRight` so justify-center aligns the
       * document to the centre of the *visible* area (left of the side panel).
       * The CSS transition matches the panel slide duration (300 ms).
       */}
      <div
        className="flex flex-1 justify-center overflow-auto pl-10 py-8 transition-[padding] duration-300 ease-in-out"
        style={{ paddingRight: `${40 + reservedRight}px` }}
      >
        {instance.url ? (
          <div
            className="relative w-full max-w-[780px] self-start"
            style={{
              minHeight: 'max(600px, calc(100vh - 10rem))',
              boxShadow:
                '0 2px 4px rgba(0,0,0,0.3), 0 8px 16px rgba(0,0,0,0.35), 0 20px 48px rgba(0,0,0,0.4)',
            }}
          >
            <iframe
              key={iframeKey}
              src={`${instance.url}#toolbar=0`}
              title="Theme Preview — PDF"
              className="block h-full w-full border-0"
              style={{ background: 'white', minHeight: 'max(600px, calc(100vh - 10rem))' }}
            />

            {/* Re-render overlay — shown while re-rendering a live preview */}
            {showOverlay && (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ background: 'rgba(82,86,89,0.75)', backdropFilter: 'blur(2px)' }}
              >
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="h-7 w-7 animate-spin text-white/80" />
                  <p className="text-xs text-white/60">Updating preview…</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <p className="text-sm text-white/40">No preview available</p>
          </div>
        )}
      </div>
    </div>
  );
}
