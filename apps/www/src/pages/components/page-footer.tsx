import { pageFooterProps, pageFooterUsageCode } from '@/constants';
import { type PageFooterVariant, Text } from '@pdfx/ui';
import { PageFooter } from '@pdfx/ui';
import { Document, Page, StyleSheet, View } from '@react-pdf/renderer';
import { ComponentPage } from '../../components/component-page';
import { PDFPreview } from '../../components/pdf-preview';
import { useDocumentTitle } from '../../hooks/use-document-title';

const styles = StyleSheet.create({
  // Compact demo page: narrow height so the full page (with footer) is visible in the iframe
  page: { padding: 30, display: 'flex', flexDirection: 'column' },
  // Spacer pushes the footer to the bottom of the page
  spacer: { flex: 1 },
  bodyText: {
    fontSize: 10,
    color: '#555',
    lineHeight: 1.6,
    marginBottom: 6,
  },
});

const renderPreviewDocument = (variant: PageFooterVariant) => (
  <Document title="PDFx PageFooter Preview">
    {/* Custom compact page so the footer is visible without scrolling in the preview */}
    <Page size={{ width: 595, height: 300 }} style={styles.page}>
      <Text style={styles.bodyText}>Invoice #1042 · Acme Corp · March 2026</Text>
      <Text style={styles.bodyText}>
        This document demonstrates the PageFooter component. The footer is anchored at the bottom of
        the page using a flex spacer between the body content and the footer band.
      </Text>
      {/* Flex spacer pushes footer to the page bottom */}
      <View style={styles.spacer} />
      <PageFooter
        leftText="© 2026 Acme Corp. All rights reserved."
        centerText="Confidential"
        rightText="Page 1 of 1"
        variant={variant}
        address={
          variant === 'three-column' || variant === 'detailed'
            ? '123 Main St, City, ST 12345'
            : undefined
        }
        phone={
          variant === 'three-column' || variant === 'detailed' ? '+1 (555) 000-0000' : undefined
        }
        email={variant === 'three-column' || variant === 'detailed' ? 'hello@acme.com' : undefined}
        website={variant === 'detailed' ? 'www.acme.com' : undefined}
      />
    </Page>
  </Document>
);

const variantOptions = [
  { value: 'simple' as PageFooterVariant, label: 'Simple' },
  { value: 'centered' as PageFooterVariant, label: 'Centered' },
  { value: 'minimal' as PageFooterVariant, label: 'Minimal' },
  { value: 'branded' as PageFooterVariant, label: 'Branded' },
  { value: 'three-column' as PageFooterVariant, label: 'Three Column' },
  { value: 'detailed' as PageFooterVariant, label: 'Detailed' },
];

export default function PageFooterComponentPage() {
  useDocumentTitle('PageFooter Component');

  return (
    <ComponentPage
      title="PageFooter"
      description="Document footer band with left, center, and right text slots. Supports six layout variants: simple, centered, minimal, branded, three-column, and detailed."
      installCommand="npx @akii09/pdfx-cli add page-footer"
      componentName="page-footer"
      preview={
        <PDFPreview
          title="Preview"
          downloadFilename="page-footer-preview.pdf"
          variants={{
            options: variantOptions,
            defaultValue: 'simple' as PageFooterVariant,
            label: 'Variant',
          }}
        >
          {/* biome-ignore lint/suspicious/noExplicitAny: Generic type workaround for React JSX components */}
          {renderPreviewDocument as any}
        </PDFPreview>
      }
      usageCode={pageFooterUsageCode}
      usageFilename="src/components/pdfx/page-footer/pdfx-page-footer.tsx"
      props={pageFooterProps}
    />
  );
}
