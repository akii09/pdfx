import type { PdfxTheme } from '@pdfx/shared';
import { pdf } from '@react-pdf/renderer';
import { AlertCircle, Loader2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { ThemePreviewDocument } from './ThemePreviewDocument';

interface ThemePreviewPanelProps {
  theme: PdfxTheme;
  reservedRight?: number;
  onUrlChange?: (url: string | null) => void;
}

interface RenderState {
  url: string | null;
  loading: boolean;
  error: string | null;
}
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

  const prevUrlRef = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    setRenderState((s) => ({ url: s.url, loading: true, error: null }));

    pdf(<ThemePreviewDocument theme={theme} />)
      .toBlob()
      .then((blob) => {
        if (cancelled) return;

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

  useEffect(() => {
    onUrlChange?.(renderState.url);
  }, [renderState.url, onUrlChange]);

  useEffect(() => {
    return () => {
      if (prevUrlRef.current) URL.revokeObjectURL(prevUrlRef.current);
    };
  }, []);

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

  return (
    <div className="flex h-full flex-col" style={{ background: '#282828' }}>
      <div
        className="flex flex-1 justify-center overflow-auto pl-4 sm:pl-10 pr-4 sm:pr-10 py-4 sm:py-8 transition-[padding] duration-300 ease-in-out"
        style={reservedRight > 0 ? { paddingRight: `${40 + reservedRight}px` } : undefined}
      >
        {renderState.url ? (
          <div
            className="relative w-full max-w-full self-start"
            style={{
              minHeight: 'max(600px, calc(100vh - 10rem))',
            }}
          >
            <iframe
              key={renderState.url}
              src={`${renderState.url}#toolbar=0&zoom=page-width`}
              title="Theme Preview — PDF"
              className="block h-full w-full border-0"
              style={{ background: 'white', minHeight: 'max(600px, calc(100vh - 10rem))' }}
            />

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
