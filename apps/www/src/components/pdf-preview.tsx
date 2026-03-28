import { usePDF } from '@react-pdf/renderer';
import { AlertCircle, Download, ExternalLink, Minus, Plus } from 'lucide-react';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { cn } from '../lib/utils';
import DropDown, { type DropDownOption } from './drop-down';

const ZOOM_STORAGE_KEY = 'pdfx-preview-zoom';

function getStoredZoom(): number {
  if (typeof window === 'undefined') return 100;
  const stored = localStorage.getItem(ZOOM_STORAGE_KEY);
  return stored ? Number.parseInt(stored, 10) : 100;
}

interface PDFPreviewProps<T = string> {
  children: React.ReactElement | ((variant: T) => React.ReactElement);
  /** Label shown in the preview header (e.g. "Preview") */
  title?: string;
  /** Filename when downloading (e.g. "heading-preview.pdf") */
  downloadFilename?: string;
  height?: string;
  showDownload?: boolean;
  className?: string;
  /** Optional variants configuration */
  variants?: {
    options: DropDownOption<T>[];
    defaultValue: T;
    label?: string;
  };
}

export const PDFPreview = memo(function PDFPreview<T = string>({
  children,
  title = 'Preview',
  downloadFilename = 'preview.pdf',
  height = 'h-[600px]',
  showDownload = true,
  className,
  variants,
}: PDFPreviewProps<T>) {
  const [selectedVariant, setSelectedVariant] = useState<T>(variants?.defaultValue as T);
  const [zoom, setZoom] = useState(getStoredZoom);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Persist zoom preference
  useEffect(() => {
    localStorage.setItem(ZOOM_STORAGE_KEY, String(zoom));
  }, [zoom]);

  const document = useMemo(
    () => (typeof children === 'function' ? children(selectedVariant) : children),
    [children, selectedVariant]
  );

  const [instance, updateInstance] = usePDF({
    document: document as React.ReactElement<import('@react-pdf/renderer').DocumentProps>,
  });
  const [key, setKey] = useState(0);

  useEffect(() => {
    updateInstance(document as React.ReactElement<import('@react-pdf/renderer').DocumentProps>);
    setKey((k) => k + 1);
  }, [document, updateInstance]);

  const handleZoomIn = useCallback(() => {
    setZoom((z) => Math.min(z + 25, 150));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((z) => Math.max(z - 25, 50));
  }, []);

  if (instance.loading) {
    return (
      <div
        className={cn('rounded-lg border border-border overflow-hidden', className)}
        aria-busy="true"
      >
        <div className="border-b border-border bg-muted/50 px-4 py-2.5 flex items-center justify-between">
          <div className="h-3.5 w-14 bg-muted animate-pulse rounded" />
          <div className="h-6 w-24 bg-muted animate-pulse rounded" />
        </div>
        <div className={cn('w-full bg-muted/10 p-8 flex flex-col gap-4', height)}>
          <div className="h-5 w-2/5 bg-muted animate-pulse rounded" />
          <div className="h-3 w-full bg-muted animate-pulse rounded" />
          <div className="h-3 w-4/5 bg-muted animate-pulse rounded" />
          <div className="h-3 w-3/5 bg-muted animate-pulse rounded" />
          <div className="h-24 w-full bg-muted animate-pulse rounded mt-2" />
          <div className="h-3 w-full bg-muted animate-pulse rounded mt-2" />
          <div className="h-3 w-11/12 bg-muted animate-pulse rounded" />
          <div className="h-3 w-4/6 bg-muted animate-pulse rounded" />
        </div>
        <div className="p-3.5 bg-muted/30 flex justify-between items-center border-t border-border">
          <div className="h-3 w-40 bg-muted animate-pulse rounded" />
          <div className="h-7 w-28 bg-muted animate-pulse rounded" />
        </div>
        <span className="sr-only" aria-live="polite">
          Loading PDF preview...
        </span>
      </div>
    );
  }

  if (instance.error) {
    return (
      <div className={cn('rounded-lg border border-destructive/30 overflow-hidden', className)}>
        <div className="border-b border-destructive/20 bg-muted/50 px-4 py-2.5">
          <span className="text-sm text-muted-foreground font-medium">{title}</span>
        </div>
        <div
          className={cn(
            'w-full flex flex-col items-center justify-center gap-3 bg-destructive/5',
            height
          )}
        >
          <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertCircle className="h-5 w-5 text-destructive" />
          </div>
          <div className="text-center px-6">
            <p className="text-sm font-medium text-destructive">Failed to render PDF</p>
            <p className="text-xs text-muted-foreground mt-1 max-w-xs">{String(instance.error)}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!instance.url) {
    return (
      <div className={cn('rounded-lg border border-border p-8 text-center bg-muted/30', className)}>
        <p className="text-muted-foreground text-sm">No PDF to display</p>
      </div>
    );
  }

  // Mobile: Show download button instead of iframe
  if (isMobile) {
    return (
      <div className={cn('rounded-lg border border-border overflow-hidden', className)}>
        <div className="border-b border-border bg-muted/50 px-4 py-2.5 flex items-center justify-between">
          <span className="text-sm text-muted-foreground font-medium">{title}</span>
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-4 bg-muted/10 p-6 md:p-8">
          <p className="text-sm text-muted-foreground text-center">
            PDF preview is optimized for larger screens.
          </p>
          {showDownload && (
            <a
              href={instance.url}
              download={downloadFilename}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cn('rounded-lg border border-border overflow-hidden', className)}>
      <div className="border-b border-border bg-muted/50 px-4 py-2.5 flex items-center justify-between flex-wrap gap-2">
        <span className="text-sm text-muted-foreground font-medium">{title}</span>
        <div className="flex items-center gap-3 flex-wrap">
          {/* Variants dropdown */}
          {variants && (
            <div className="flex items-center gap-2">
              {variants.label && (
                <span className="text-xs text-muted-foreground">{variants.label}:</span>
              )}
              <DropDown
                options={variants.options}
                value={selectedVariant}
                onChange={(value) => setSelectedVariant(value as T)}
              />
            </div>
          )}

          {/* Zoom controls */}
          <div className="flex items-center gap-1 border-l border-border pl-3">
            <button
              type="button"
              onClick={handleZoomOut}
              disabled={zoom <= 50}
              className="p-1 rounded hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="Zoom out"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="text-xs font-mono text-muted-foreground w-12 text-center">
              {zoom}%
            </span>
            <button
              type="button"
              onClick={handleZoomIn}
              disabled={zoom >= 150}
              className="p-1 rounded hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="Zoom in"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          {/* Open in new tab */}
          <a
            href={instance.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            title="Open in new tab"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className={cn('w-full overflow-auto bg-muted/10', height)}>
        <iframe
          key={key}
          src={instance.url}
          className="border-0 mx-auto"
          style={{
            width: `${zoom}%`,
            height: height === 'h-[600px]' ? 600 : height === 'h-[78vh]' ? '78vh' : 600,
            minHeight: 400,
          }}
          title={`${title} — PDF Preview`}
        />
      </div>

      <div className="p-3.5 bg-muted/30 flex justify-between items-center border-t border-border">
        <span className="text-xs text-muted-foreground">Rendered with @react-pdf/renderer</span>
        {showDownload && (
          <a
            href={instance.url}
            download={downloadFilename}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </a>
        )}
      </div>
    </div>
  );
});
