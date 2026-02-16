import { usePDF } from '@react-pdf/renderer';
import { Download } from 'lucide-react';
import { memo, useEffect, useState } from 'react';
import { cn } from '../lib/utils';

interface PDFPreviewProps {
  children: React.ReactElement;
  title?: string;
  height?: string;
  showDownload?: boolean;
  className?: string;
}

export const PDFPreview = memo(function PDFPreview({
  children,
  title = 'Live PDF Preview',
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
      <div className={cn('rounded-lg border p-8 text-center', className)}>
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
        <p className="mt-4 text-muted-foreground">Rendering PDF...</p>
      </div>
    );
  }

  if (instance.error) {
    return (
      <div className={cn('rounded-lg border p-8 bg-destructive/10', className)}>
        <p className="text-destructive">Error: {String(instance.error)}</p>
      </div>
    );
  }

  if (!instance.url) {
    return (
      <div className={cn('rounded-lg border p-8 text-center', className)}>
        <p className="text-muted-foreground">No PDF to display</p>
      </div>
    );
  }

  return (
    <div className={cn('rounded-lg border overflow-hidden', className)}>
      <iframe key={key} src={instance.url} className={cn('w-full', height)} title="PDF Preview" />
      <div className="p-4 bg-muted/50 flex justify-between items-center">
        <span className="text-sm text-muted-foreground">{title}</span>
        {showDownload && (
          <a
            href={instance.url}
            download="preview.pdf"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </a>
        )}
      </div>
    </div>
  );
});
