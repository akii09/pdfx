import { usePDF } from '@react-pdf/renderer';
import { Download } from 'lucide-react';
import { memo, useEffect, useState } from 'react';
import { cn } from '../lib/utils';

interface PDFPreviewProps {
  children: React.ReactElement;
  /** Label shown in the preview header (e.g. "Preview") */
  title?: string;
  /** Filename when downloading (e.g. "heading-preview.pdf") */
  downloadFilename?: string;
  height?: string;
  showDownload?: boolean;
  className?: string;
}

export const PDFPreview = memo(function PDFPreview({
  children,
  title = 'Preview',
  downloadFilename = 'preview.pdf',
  height = 'h-[600px]',
  showDownload = true,
  className,
}: PDFPreviewProps) {
  const [instance, updateInstance] = usePDF({
    document: children as React.ReactElement<import('@react-pdf/renderer').DocumentProps>,
  });
  const [key, setKey] = useState(0);

  useEffect(() => {
    updateInstance(children as React.ReactElement<import('@react-pdf/renderer').DocumentProps>);
    setKey((k) => k + 1);
  }, [children, updateInstance]);

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
      <div className="border-b border-border bg-muted/50 px-4 py-2.5">
        <span className="text-sm text-muted-foreground font-medium">{title}</span>
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
