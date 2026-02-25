import { formProps, formUsageCode } from '@/constants';
import { PdfForm } from '@pdfx/ui';
import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import { ComponentPage } from '../../components/component-page';
import { PDFPreview } from '../../components/pdf-preview';
import { useDocumentTitle } from '../../hooks/use-document-title';

const styles = StyleSheet.create({
  page: { padding: 40 },
});

type FormVariant = 'underline' | 'box' | 'outlined' | 'ghost';

const jobApplicationGroups = [
  {
    title: 'Personal Information',
    fields: [
      { label: 'Full Name', hint: 'First and last name' },
      { label: 'Date of Birth', hint: 'DD / MM / YYYY' },
      { label: 'Email Address' },
      { label: 'Phone Number', hint: '+1 (555) 000-0000' },
    ],
  },
  {
    title: 'Address',
    layout: 'two-column' as const,
    fields: [
      { label: 'Street Address' },
      { label: 'City' },
      { label: 'State / Province' },
      { label: 'Zip / Postal Code' },
    ],
  },
  {
    title: 'Additional Information',
    fields: [{ label: 'Cover Letter / Notes', height: 60 }],
  },
];

const renderPreviewDocument = (variant: FormVariant) => (
  <Document title="PDFx Form Preview">
    <Page size="A4" style={styles.page}>
      <PdfForm
        title="Job Application"
        subtitle="Please complete all fields clearly in block capitals."
        variant={variant}
        groups={jobApplicationGroups}
      />
    </Page>
  </Document>
);

const variantOptions = [
  { value: 'underline' as FormVariant, label: 'Underline' },
  { value: 'box' as FormVariant, label: 'Box' },
  { value: 'outlined' as FormVariant, label: 'Outlined' },
  { value: 'ghost' as FormVariant, label: 'Ghost' },
];

export default function FormComponentPage() {
  useDocumentTitle('Form Component');

  return (
    <ComponentPage
      title="Form"
      description="A printable fillable-form component for PDFs. Renders blank field areas with labels — users fill in the fields after printing."
      installCommand="npx @akii09/pdfx-cli add form"
      componentName="form"
      preview={
        <PDFPreview
          title="Preview"
          downloadFilename="form-preview.pdf"
          variants={{
            options: variantOptions,
            defaultValue: 'underline' as FormVariant,
            label: 'Variant',
          }}
        >
          {/* biome-ignore lint/suspicious/noExplicitAny: Generic type workaround for React JSX components */}
          {renderPreviewDocument as any}
        </PDFPreview>
      }
      usageCode={formUsageCode}
      usageFilename="src/components/pdfx/form/pdfx-form.tsx"
      props={formProps}
      additionalInfo={
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/40 p-4">
            <h3 className="text-sm font-semibold mb-2">Field Variants</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-foreground">•</span>
                <span>
                  <strong className="text-foreground">underline</strong> — Bottom border only. The
                  most print-friendly style, similar to classic paper forms.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-foreground">•</span>
                <span>
                  <strong className="text-foreground">box</strong> — Full rectangle outline. Clear
                  boundaries for dense or formal forms.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-foreground">•</span>
                <span>
                  <strong className="text-foreground">outlined</strong> — Rounded rectangle. A
                  softer look for modern documents.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-foreground">•</span>
                <span>
                  <strong className="text-foreground">ghost</strong> — Light filled background, no
                  border. Works well with colored paper or branded PDFs.
                </span>
              </li>
            </ul>
          </div>
          <div className="rounded-lg border bg-muted/40 p-4">
            <h3 className="text-sm font-semibold mb-2">Column Layouts</h3>
            <p className="text-sm text-muted-foreground">
              Each group independently supports{' '}
              <code className="text-xs bg-muted px-1 rounded">single</code>,{' '}
              <code className="text-xs bg-muted px-1 rounded">two-column</code>, or{' '}
              <code className="text-xs bg-muted px-1 rounded">three-column</code> layouts. Mix
              layouts within one form — use single columns for long fields and multi-columns for
              compact metadata like dates or city/state/zip.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/40 p-4">
            <h3 className="text-sm font-semibold mb-2">Multi-line Fields</h3>
            <p className="text-sm text-muted-foreground">
              Set <code className="text-xs bg-muted px-1 rounded">height</code> on a field to create
              taller areas for longer answers (e.g.{' '}
              <code className="text-xs bg-muted px-1 rounded">height: 60</code> for notes or
              comments). Default height is 18pt (single line).
            </p>
          </div>
        </div>
      }
    />
  );
}
