import { cardProps, cardUsageCode } from '@/constants';
import { PdfCard, Text } from '@pdfx/ui';
import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import { ComponentPage } from '../../components/component-page';
import { PDFPreview } from '../../components/pdf-preview';
import { useDocumentTitle } from '../../hooks/use-document-title';

const styles = StyleSheet.create({
  page: { padding: 40 },
});

type CardVariant = 'default' | 'bordered' | 'muted';

const renderPreviewDocument = (variant: CardVariant) => (
  <Document title="PDFx Card Preview">
    <Page size="A4" style={styles.page}>
      <PdfCard title="Project Summary" variant={variant} padding="md">
        <Text noMargin>
          This card groups related content with a title and body area. Use cards to visually
          separate sections of your PDF document.
        </Text>
      </PdfCard>
    </Page>
  </Document>
);

const variantOptions = [
  { value: 'default' as CardVariant, label: 'Default' },
  { value: 'bordered' as CardVariant, label: 'Bordered' },
  { value: 'muted' as CardVariant, label: 'Muted' },
];

export default function CardComponentPage() {
  useDocumentTitle('Card Component');

  return (
    <ComponentPage
      title="Card"
      description="A content container for PDF documents with an optional title and three visual variants: default, bordered, and muted."
      installCommand="npx @pdfx/cli add card"
      componentName="card"
      preview={
        <PDFPreview
          title="Preview"
          downloadFilename="card-preview.pdf"
          variants={{
            options: variantOptions,
            defaultValue: 'default' as CardVariant,
            label: 'Variant',
          }}
        >
          {/* biome-ignore lint/suspicious/noExplicitAny: Generic type workaround for React JSX components */}
          {renderPreviewDocument as any}
        </PDFPreview>
      }
      usageCode={cardUsageCode}
      usageFilename="src/components/pdfx/card/pdfx-card.tsx"
      props={cardProps}
      additionalInfo={
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/40 p-4">
            <h3 className="text-sm font-semibold mb-2">Variant Guide</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-foreground">•</span>
                <span>
                  <strong className="text-foreground">default</strong> — Subtle 1px border with
                  transparent background. Use for standard content grouping.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-foreground">•</span>
                <span>
                  <strong className="text-foreground">bordered</strong> — 2px emphasized border. Use
                  to draw attention to important content.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-foreground">•</span>
                <span>
                  <strong className="text-foreground">muted</strong> — Muted background fill with no
                  border. Use for secondary or supplemental content.
                </span>
              </li>
            </ul>
          </div>
          <div className="rounded-lg border bg-muted/40 p-4">
            <h3 className="text-sm font-semibold mb-2">Padding Sizes</h3>
            <div className="grid gap-2 text-sm">
              <div className="flex gap-3">
                <code className="rounded bg-muted px-2 py-1 text-xs font-mono font-semibold text-foreground shrink-0">
                  sm
                </code>
                <span className="text-muted-foreground">8pt padding — compact content</span>
              </div>
              <div className="flex gap-3">
                <code className="rounded bg-muted px-2 py-1 text-xs font-mono font-semibold text-foreground shrink-0">
                  md
                </code>
                <span className="text-muted-foreground">
                  12pt padding — standard content (default)
                </span>
              </div>
              <div className="flex gap-3">
                <code className="rounded bg-muted px-2 py-1 text-xs font-mono font-semibold text-foreground shrink-0">
                  lg
                </code>
                <span className="text-muted-foreground">16pt padding — spacious content</span>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
}
