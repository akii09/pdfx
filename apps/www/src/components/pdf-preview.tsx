import { usePDF } from '@react-pdf/renderer';
import { Download } from 'lucide-react';
import { memo, useEffect, useMemo, useState } from 'react';
import { cn } from '../lib/utils';
import DropDown, { type DropDownOption } from './drop-down';

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

  // Memoize the document to prevent infinite loops
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

  if (instance.loading) {
    return (
      <div
        className={cn('rounded-lg border border-border p-12 text-center bg-muted/30', className)}
      >
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
        <p className="mt-4 text-muted-foreground text-sm">Rendering PDF...</p>
      </div>
    );
  }

  if (instance.error) {
    return (
      <div
        className={cn('rounded-lg border border-destructive/40 p-8 bg-destructive/5', className)}
      >
        <p className="text-destructive text-sm">Error: {String(instance.error)}</p>
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

  return (
    <div className={cn('rounded-lg border border-border overflow-hidden', className)}>
      <div className="border-b border-border bg-muted/50 px-4 py-2.5 flex items-center justify-between">
        <span className="text-sm text-muted-foreground font-medium">{title}</span>
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
      </div>
      <iframe
        key={key}
        src={instance.url}
        className={cn('w-full border-0', height)}
        title="PDF Preview"
      />
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
