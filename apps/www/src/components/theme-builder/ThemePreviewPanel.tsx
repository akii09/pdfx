import type { PdfxTheme } from '@pdfx/shared';
import { pdf } from '@react-pdf/renderer';
import { AlertCircle, FileText, Loader2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { ThemePreviewDocument } from './ThemePreviewDocument';

interface ThemePreviewPanelProps {
  theme: PdfxTheme;
  /**
   * Width (px) of UI chrome that visually covers the right edge of this panel.
   * The PDF canvas adjusts its right-padding by this amount so the document
   * appears centred in the *visible* area, not the full container width.
   */
  reservedRight?: number;
  /** Called whenever the rendered PDF blob URL changes (or becomes null). */
  onUrlChange?: (url: string | null) => void;
}

interface RenderState {
  /** Current blob URL (null on first render before PDF is ready). */
  url: string | null;
  /** True while a PDF render is in progress. */
  loading: boolean;
  /** Non-null when the last render failed. */
  error: string | null;
}

/**
 * Full-bleed PDF preview with a professional dark-canvas aesthetic.
 *
 * Uses the imperative `pdf().toBlob()` API (not `usePDF`) so that a fresh
 * react-pdf renderer instance is created on every theme change. This is
 * critical for font-family updates: react-pdf's internal reconciler does not
 * reliably detect font changes when the document tree structure is identical,
 * causing stale renders. A fresh instance has no such caching.
 */
export function ThemePreviewPanel({
  theme,
  reservedRight = 0,
  onUrlChange,
}: ThemePreviewPanelProps) {
  const [renderState, setRenderState] = useState<RenderState>({
    url: null,
    loading: true,
    error: null,
  });

  // Tracks the current blob URL so we can revoke it when a new one is ready.
  const prevUrlRef = useRef<string | null>(null);

  // Re-generate the PDF every time the theme changes.
  useEffect(() => {
    let cancelled = false;

    // Keep the old URL visible (overlay) while re-rendering; clear it on first load.
    setRenderState((s) => ({ url: s.url, loading: true, error: null }));

    pdf(<ThemePreviewDocument theme={theme} />)
      .toBlob()
      .then((blob) => {
        if (cancelled) return;

        // Revoke the previous blob URL to free memory.
        if (prevUrlRef.current) URL.revokeObjectURL(prevUrlRef.current);

        const url = URL.createObjectURL(blob);
        prevUrlRef.current = url;
        setRenderState({ url, loading: false, error: null });
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setRenderState((s) => ({ ...s, loading: false, error: String(err) }));
      });

    return () => {
      cancelled = true;
    };
  }, [theme]);

  // Bubble URL up to the page header (Download / Open in new tab).
  useEffect(() => {
    onUrlChange?.(renderState.url);
  }, [renderState.url, onUrlChange]);

  // Revoke the last blob URL when the component unmounts.
  useEffect(() => {
    return () => {
      if (prevUrlRef.current) URL.revokeObjectURL(prevUrlRef.current);
    };
  }, []);

  const fileName = `${theme.name || 'theme'}-preview.pdf`;

  // ── Initial loading skeleton ─────────────────────────────────────────────
  if (renderState.loading && !renderState.url) {
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
  if (renderState.error && !renderState.url) {
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
          <p className="mt-1 max-w-xs text-xs text-white/50">{renderState.error}</p>
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
      <div
        className="flex flex-1 justify-center overflow-auto pl-4 sm:pl-10 pr-4 sm:pr-10 py-4 sm:py-8 transition-[padding] duration-300 ease-in-out"
        style={reservedRight > 0 ? { paddingRight: `${40 + reservedRight}px` } : undefined}
      >
        {renderState.url ? (
          <div
            className="relative w-full max-w-[780px] self-start"
            style={{
              minHeight: 'max(600px, calc(100vh - 10rem))',
              boxShadow:
                '0 2px 4px rgba(0,0,0,0.3), 0 8px 16px rgba(0,0,0,0.35), 0 20px 48px rgba(0,0,0,0.4)',
            }}
          >
            {/*
             * key={renderState.url} forces the iframe to fully remount when
             * the blob URL changes, preventing the browser from showing stale
             * cached content from the previous render.
             */}
            <iframe
              key={renderState.url}
              src={`${renderState.url}#toolbar=0&zoom=page-width`}
              title="Theme Preview — PDF"
              className="block h-full w-full border-0"
              style={{ background: 'white', minHeight: 'max(600px, calc(100vh - 10rem))' }}
            />

            {/* Re-render overlay — shown while a new PDF is being generated */}
            {renderState.loading && (
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
