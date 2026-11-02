import { signatureProps, signatureUsageCode } from '@/constants';
import { PdfSignatureBlock, type SignatureSigners } from '@pdfx/components';
import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import { useCallback, useState } from 'react';
import { ComponentPage } from '../../components/component-page';
import DropDown from '../../components/drop-down';
import { PDFPreview } from '../../components/pdf-preview';
import { useDocumentTitle } from '../../hooks/use-document-title';

const styles = StyleSheet.create({
  page: { padding: 40 },
});

type SignatureVariant = 'single' | 'double' | 'inline';
type SignerCount = 2 | 3 | 4;
const DEFAULT_VARIANT: SignatureVariant = 'single';

const signers: SignatureSigners = [
  { label: 'Authorized By', name: 'John Doe', title: 'CEO, Acme Corp' },
  { label: 'Approved By', name: 'Jane Smith', title: 'CFO, Acme Corp' },
  { label: 'Witness', name: 'Alex Lee', title: 'Witness' },
  { label: 'Additional Signer', name: 'Sam Taylor', title: 'Legal Counsel' },
];

const renderPreviewDocument = (variant: SignatureVariant, count: SignerCount) => {
  return (
    <Document title="PDFx Signature Preview">
      <Page size="A4" style={styles.page}>
        {variant === 'inline' ? (
          <PdfSignatureBlock
            variant="inline"
            label="Signed by"
            name="John Doe"
            date="15 February 2026"
          />
        ) : variant === 'single' ? (
          <PdfSignatureBlock
            variant="single"
            label="Authorized By"
            name="John Doe"
            title="CEO, Acme Corp"
            date="15 February 2026"
          />
        ) : (
          <PdfSignatureBlock variant="double" count={count} signers={signers} />
        )}
      </Page>
    </Document>
  );
};

const variantOptions: { value: SignatureVariant; label: string }[] = [
  { value: 'single', label: 'Single' },
  { value: 'double', label: 'Double' },
  { value: 'inline', label: 'Inline' },
];

const countOptions = [
  { value: 2 as SignerCount, label: '2' },
  { value: 3 as SignerCount, label: '3' },
  { value: 4 as SignerCount, label: '4' },
];

export default function SignatureComponentPage() {
  useDocumentTitle('Signature Component');
  const [variant, setVariant] = useState<SignatureVariant>(DEFAULT_VARIANT);
  const [count, setCount] = useState<SignerCount>(2);
  const renderPreview = useCallback(
    (selectedVariant: SignatureVariant) => renderPreviewDocument(selectedVariant, count),
    [count]
  );

  return (
    <ComponentPage
      title="Signature"
      description="A PDF signature block component with three layout variants: single, double (2–4 signers, up to two per row), and inline."
      installCommand="npx pdfx-cli add signature"
      componentName="signature"
      preview={
        <PDFPreview
          title="Preview"
          downloadFilename="signature-preview.pdf"
          variants={{
            options: variantOptions,
            defaultValue: DEFAULT_VARIANT,
            label: 'Variant',
            onChange: setVariant,
          }}
          toolbarContent={
            variant === 'double' && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Count:</span>
                <DropDown options={countOptions} value={count} onChange={setCount} />
              </div>
            )
          }
        >
          {renderPreview}
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
                  <strong className="text-foreground">double</strong> — Two to four signature
                  blocks, arranged in rows of up to two. Set the{' '}
                  <code className="text-xs bg-muted px-1 rounded">count</code> prop for the number
                  of places, and optionally pass matching signer details with{' '}
                  <code className="text-xs bg-muted px-1 rounded">signers</code>. Ideal for approval
                  workflows with multiple approvers.
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
