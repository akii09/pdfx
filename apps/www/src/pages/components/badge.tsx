import { badgeProps, badgeUsageCode } from '@/constants';
import { Badge } from '@pdfx/ui';
import { Document, Page, StyleSheet, View } from '@react-pdf/renderer';
import { ComponentPage } from '../../components/component-page';
import { PDFPreview } from '../../components/pdf-preview';
import { useDocumentTitle } from '../../hooks/use-document-title';

type BadgeVariant =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'destructive'
  | 'info'
  | 'outline';

const styles = StyleSheet.create({
  page: { padding: 40 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 12 },
});

const renderPreviewDocument = (variant: BadgeVariant) => (
  <Document title="PDFx Badge Preview">
    <Page size="A4" style={styles.page}>
      <View style={styles.row}>
        <Badge label="Small" variant={variant} size="sm" />
        <Badge label="Medium" variant={variant} size="md" />
        <Badge label="Large" variant={variant} size="lg" />
      </View>
      <View style={styles.row}>
        <Badge label="Default" variant="default" />
        <Badge label="Primary" variant="primary" />
        <Badge label="Success" variant="success" />
        <Badge label="Warning" variant="warning" />
        <Badge label="Destructive" variant="destructive" />
        <Badge label="Info" variant="info" />
        <Badge label="Outline" variant="outline" />
      </View>
    </Page>
  </Document>
);

const variantOptions = [
  { value: 'default' as BadgeVariant, label: 'Default' },
  { value: 'primary' as BadgeVariant, label: 'Primary' },
  { value: 'success' as BadgeVariant, label: 'Success' },
  { value: 'warning' as BadgeVariant, label: 'Warning' },
  { value: 'destructive' as BadgeVariant, label: 'Destructive' },
  { value: 'info' as BadgeVariant, label: 'Info' },
  { value: 'outline' as BadgeVariant, label: 'Outline' },
];

export default function BadgeComponentPage() {
  useDocumentTitle('Badge Component');

  return (
    <ComponentPage
      title="Badge"
      description="Compact status label with seven semantic color variants and three sizes. Use badges to indicate status, categories, or metadata inline within PDF documents."
      installCommand="npx @pdfx/cli add badge"
      componentName="badge"
      preview={
        <PDFPreview
          title="Preview"
          downloadFilename="badge-preview.pdf"
          variants={{
            options: variantOptions,
            defaultValue: 'default' as BadgeVariant,
            label: 'Variant',
          }}
        >
          {/* biome-ignore lint/suspicious/noExplicitAny: Generic type workaround for React JSX components */}
          {renderPreviewDocument as any}
        </PDFPreview>
      }
      usageCode={badgeUsageCode}
      usageFilename="src/components/pdfx/pdfx-badge.tsx"
      props={badgeProps}
      additionalInfo={
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/40 p-4">
            <h3 className="text-sm font-semibold mb-2">Variant Guide</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-foreground">•</span>
                <span>
                  <strong className="text-foreground">default</strong> — Neutral muted background
                  with border. Use for general labels and categories.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-foreground">•</span>
                <span>
                  <strong className="text-foreground">primary</strong> — Brand-colored fill. Use for
                  highlighted or featured items.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-foreground">•</span>
                <span>
                  <strong className="text-foreground">
                    success / warning / destructive / info
                  </strong>{' '}
                  — Semantic status colors. Use for Paid / Pending / Overdue / Notice states.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-foreground">•</span>
                <span>
                  <strong className="text-foreground">outline</strong> — Transparent fill with
                  border. Minimal visual weight.
                </span>
              </li>
            </ul>
          </div>
        </div>
      }
    />
  );
}
