import { signatureProps, signatureUsageCode } from '@/constants';
import { PdfSignatureBlock } from '@pdfx/ui';
import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import { ComponentPage } from '../../components/component-page';
import { PDFPreview } from '../../components/pdf-preview';
import { useDocumentTitle } from '../../hooks/use-document-title';

const styles = StyleSheet.create({
  page: { padding: 40 },
});

type SignatureVariant = 'single' | 'double' | 'inline';

const renderPreviewDocument = (variant: SignatureVariant) => (
  <Document title="PDFx Signature Preview">
    <Page size="A4" style={styles.page}>
      {variant === 'double' ? (
        <PdfSignatureBlock
          variant="double"
          signers={[
            { label: 'Authorized By', name: 'John Doe', title: 'CEO, Acme Corp' },
            { label: 'Approved By', name: 'Jane Smith', title: 'CFO, Acme Corp' },
          ]}
        />
      ) : (
        <PdfSignatureBlock
          variant={variant}
          label={variant === 'inline' ? 'Signed by' : 'Authorized By'}
          name="John Doe"
          title="CEO, Acme Corp"
          date="15 February 2026"
        />
      )}
    </Page>
  </Document>
);

const variantOptions = [
  { value: 'single' as SignatureVariant, label: 'Single' },
  { value: 'double' as SignatureVariant, label: 'Double' },
  { value: 'inline' as SignatureVariant, label: 'Inline' },
];

export default function SignatureComponentPage() {
  useDocumentTitle('Signature Component');

  return (
    <ComponentPage
      title="Signature"
      description="A PDF signature block component with three layout variants: single, double (side-by-side), and inline."
      installCommand="npx @akii09/pdfx-cli add signature"
      componentName="signature"
      preview={
        <PDFPreview
          title="Preview"
          downloadFilename="signature-preview.pdf"
          variants={{
            options: variantOptions,
            defaultValue: 'single' as SignatureVariant,
            label: 'Variant',
          }}
        >
          {/* biome-ignore lint/suspicious/noExplicitAny: Generic type workaround for React JSX components */}
          {renderPreviewDocument as any}
        </PDFPreview>
      }
      usageCode={signatureUsageCode}
      usageFilename="src/components/pdfx/signature/pdfx-signature.tsx"
      props={signatureProps}
      additionalInfo={
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/40 p-4">
            <h3 className="text-sm font-semibold mb-2">Variant Guide</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-foreground">•</span>
                <span>
                  <strong className="text-foreground">single</strong> — One signature block with a
                  label, dotted signature line, name, title, and date. Standard for contracts and
                  authorizations.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-foreground">•</span>
                <span>
                  <strong className="text-foreground">double</strong> — Two signature blocks placed
                  side by side. Use the{' '}
                  <code className="text-xs bg-muted px-1 rounded">signers</code> prop with exactly 2
                  signer objects. Ideal for approval workflows.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-foreground">•</span>
                <span>
                  <strong className="text-foreground">inline</strong> — Compact horizontal signature
                  row with a label, signature line, and optional name. Use at the bottom of short
                  documents.
                </span>
              </li>
            </ul>
          </div>
        </div>
      }
    />
  );
}
