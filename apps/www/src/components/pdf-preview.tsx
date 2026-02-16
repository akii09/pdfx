import { usePDF } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';

interface PDFPreviewProps {
  children: React.ReactElement;
}

export function PDFPreview({ children }: PDFPreviewProps) {
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
      <div className="border rounded-lg p-8 text-center">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto" />
        <p className="mt-4 text-gray-600">Rendering PDF...</p>
      </div>
    );
  }

  if (instance.error) {
    return (
      <div className="border rounded-lg p-8 bg-red-50">
        <p className="text-red-600">Error: {String(instance.error)}</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <iframe key={key} src={instance.url || ''} className="w-full h-[600px]" title="PDF Preview" />
      <div className="p-4 bg-gray-50 flex justify-between items-center">
        <span className="text-sm text-gray-600">Live PDF Preview</span>
        <a
          href={instance.url || ''}
          download="preview.pdf"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Download PDF
        </a>
      </div>
    </div>
  );
}
