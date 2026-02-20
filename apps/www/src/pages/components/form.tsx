import { formProps, formUsageCode } from '@/constants';
import { PdfFormSection } from '@pdfx/ui';
import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import { ComponentPage } from '../../components/component-page';
import { PDFPreview } from '../../components/pdf-preview';
import { useDocumentTitle } from '../../hooks/use-document-title';

const styles = StyleSheet.create({
  page: { padding: 40 },
});

type FormLayout = 'single' | 'two-column' | 'three-column';

const renderPreviewDocument = (layout: FormLayout) => (
  <Document title="PDFx Form Preview">
    <Page size="A4" style={styles.page}>
      <PdfFormSection
        title={
          layout === 'single'
            ? 'Client Details'
            : layout === 'two-column'
              ? 'Invoice Details'
              : 'Project Overview'
        }
        layout={layout}
        rows={
          layout === 'single'
            ? [
                { label: 'Name', value: 'Jane Smith' },
                { label: 'Company', value: 'Acme Corp' },
                { label: 'Email', value: 'jane@acme.com' },
                { label: 'Phone', value: '+1 555 0100' },
              ]
            : layout === 'two-column'
              ? [
                  { label: 'Invoice #', value: 'INV-2026-0042' },
                  { label: 'Issue Date', value: '15 Feb 2026' },
                  { label: 'Due Date', value: '15 Mar 2026' },
                  { label: 'Status', value: 'Paid' },
                ]
              : [
                  { label: 'Project', value: 'Website Redesign' },
                  { label: 'Team', value: 'Engineering' },
                  { label: 'Budget', value: '$24,000' },
                  { label: 'Start', value: 'Jan 2026' },
                  { label: 'End', value: 'Mar 2026' },
                  { label: 'Status', value: 'Active' },
                ]
        }
      />
    </Page>
  </Document>
);

const variantOptions = [
  { value: 'single' as FormLayout, label: 'Single Column' },
  { value: 'two-column' as FormLayout, label: 'Two Column' },
  { value: 'three-column' as FormLayout, label: 'Three Column' },
];

export default function FormComponentPage() {
  useDocumentTitle('Form Component');

  return (
    <ComponentPage
      title="Form"
      description="A PDF form section component for displaying label-value pairs in single, two-column, or three-column layouts."
      installCommand="npx @pdfx/cli add form"
      componentName="form"
      preview={
        <PDFPreview
          title="Preview"
          downloadFilename="form-preview.pdf"
          variants={{
            options: variantOptions,
            defaultValue: 'single' as FormLayout,
            label: 'Layout',
          }}
        >
          {/* biome-ignore lint/suspicious/noExplicitAny: Generic type workaround for React JSX components */}
          {renderPreviewDocument as any}
        </PDFPreview>
      }
      usageCode={formUsageCode}
      usageFilename="src/components/pdfx/pdfx-form.tsx"
      props={formProps}
      additionalInfo={
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/40 p-4">
            <h3 className="text-sm font-semibold mb-2">Layout Guide</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-foreground">•</span>
                <span>
                  <strong className="text-foreground">single</strong> — All rows stacked vertically
                  in a single column. Best for detailed forms with long values.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-foreground">•</span>
                <span>
                  <strong className="text-foreground">two-column</strong> — Rows distributed evenly
                  across two side-by-side columns. Ideal for invoice metadata.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-foreground">•</span>
                <span>
                  <strong className="text-foreground">three-column</strong> — Rows distributed
                  across three columns. Best for compact project or report summaries.
                </span>
              </li>
            </ul>
          </div>
          <div className="rounded-lg border bg-muted/40 p-4">
            <h3 className="text-sm font-semibold mb-2">Column Distribution</h3>
            <p className="text-sm text-muted-foreground">
              Rows are distributed evenly across columns using{' '}
              <code className="text-xs bg-muted px-1 rounded">Math.ceil(rows.length / cols)</code>.
              If rows don't divide evenly, later columns may have fewer items. Empty columns are
              still rendered to maintain equal spacing.
            </p>
          </div>
        </div>
      }
    />
  );
}
