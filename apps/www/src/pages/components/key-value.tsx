import { keyValueEntryProps, keyValueProps, keyValueUsageCode } from '@/constants';
import { KeyValue } from '@pdfx/ui';
import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import { ComponentPage } from '../../components/component-page';
import { PDFPreview } from '../../components/pdf-preview';
import { useDocumentTitle } from '../../hooks/use-document-title';

type KeyValueDirection = 'horizontal' | 'vertical';

const styles = StyleSheet.create({
  page: { padding: 40 },
});

const renderPreviewDocument = (direction: KeyValueDirection) => (
  <Document title="PDFX KeyValue Preview">
    <Page size="A4" style={styles.page}>
      <KeyValue
        direction={direction}
        divided={direction === 'horizontal'}
        items={[
          { key: 'Invoice Number', value: '#INV-1042' },
          { key: 'Issue Date', value: 'March 1, 2026' },
          { key: 'Due Date', value: 'March 31, 2026' },
          { key: 'Status', value: 'Unpaid', valueColor: 'destructive' },
          { key: 'Total Amount', value: '$4,200.00', valueColor: 'primary' },
        ]}
      />
    </Page>
  </Document>
);

const directionOptions = [
  { value: 'horizontal' as KeyValueDirection, label: 'Horizontal' },
  { value: 'vertical' as KeyValueDirection, label: 'Vertical' },
];

export default function KeyValueComponentPage() {
  useDocumentTitle('KeyValue Component');

  return (
    <ComponentPage
      title="KeyValue"
      description="A labeled data display component for presenting key-value pairs in PDF documents. Supports horizontal (side-by-side) and vertical (stacked) layouts with optional dividers, size scaling, and per-item color overrides."
      installCommand="npx @pdfx/cli add key-value"
      componentName="key-value"
      preview={
        <PDFPreview
          title="Preview"
          downloadFilename="key-value-preview.pdf"
          variants={{
            options: directionOptions,
            defaultValue: 'horizontal' as KeyValueDirection,
            label: 'Direction',
          }}
        >
          {/* biome-ignore lint/suspicious/noExplicitAny: Generic type workaround for React JSX components */}
          {renderPreviewDocument as any}
        </PDFPreview>
      }
      usageCode={keyValueUsageCode}
      usageFilename="src/components/pdfx/pdfx-key-value.tsx"
      props={keyValueProps}
      additionalInfo={
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/40 p-4">
            <h3 className="text-sm font-semibold mb-2">Direction Guide</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-foreground">•</span>
                <span>
                  <strong className="text-foreground">horizontal</strong> — Key and value appear on
                  the same row. Ideal for invoice headers, summary metadata, and compact data
                  displays. Use with <code className="text-xs bg-muted px-1 rounded">divided</code>{' '}
                  to add separator lines between rows.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-foreground">•</span>
                <span>
                  <strong className="text-foreground">vertical</strong> — Key is stacked above the
                  value. Ideal for form field displays, address blocks, and when values are long.
                </span>
              </li>
            </ul>
          </div>
          <div className="rounded-lg border bg-muted/40 p-4">
            <h3 className="text-sm font-semibold mb-2">KeyValueEntry fields</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left font-semibold pb-2 pr-4">Prop</th>
                    <th className="text-left font-semibold pb-2 pr-4">Type</th>
                    <th className="text-left font-semibold pb-2">Description</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  {keyValueEntryProps.map((p) => (
                    <tr key={p.name} className="border-b border-border/50">
                      <td className="py-1.5 pr-4 font-mono text-foreground">{p.name}</td>
                      <td className="py-1.5 pr-4 font-mono">{p.type}</td>
                      <td className="py-1.5">{p.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      }
    />
  );
}
