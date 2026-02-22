import { pageHeaderProps, pageHeaderUsageCode } from '@/constants';
import { type PageHeaderVariant, Text } from '@pdfx/ui';
import { PageHeader } from '@pdfx/ui';
import { Document, Page, StyleSheet, View } from '@react-pdf/renderer';
import { ComponentPage } from '../../components/component-page';
import { PDFPreview } from '../../components/pdf-preview';
import { useDocumentTitle } from '../../hooks/use-document-title';

const styles = StyleSheet.create({
  page: { padding: 30 },
});

const renderPreviewDocument = (variant: PageHeaderVariant) => (
  <Document title="PDFx PageHeader Preview">
    <Page size="A4" style={styles.page}>
      <PageHeader
        title="Invoice #1042"
        subtitle="Acme Corp"
        rightText="March 2026"
        rightSubText="Due: 2026-03-31"
        variant={variant}
        logo={
          variant === 'logo-left' || variant === 'logo-right' ? (
            <View style={{ width: 48, height: 48, backgroundColor: '#e4e4e7', borderRadius: 4 }} />
          ) : undefined
        }
        address={variant === 'two-column' ? '123 Main St, City, ST 12345' : undefined}
        phone={variant === 'two-column' ? '+1 (555) 000-0000' : undefined}
        email={variant === 'two-column' ? 'hello@acme.com' : undefined}
      />
      <Text>Document body content continues below the header.</Text>
    </Page>
  </Document>
);

const variantOptions = [
  { value: 'simple' as PageHeaderVariant, label: 'Simple' },
  { value: 'centered' as PageHeaderVariant, label: 'Centered' },
  { value: 'minimal' as PageHeaderVariant, label: 'Minimal' },
  { value: 'branded' as PageHeaderVariant, label: 'Branded' },
  { value: 'logo-left' as PageHeaderVariant, label: 'Logo Left' },
  { value: 'logo-right' as PageHeaderVariant, label: 'Logo Right' },
  { value: 'two-column' as PageHeaderVariant, label: 'Two Column' },
];

export default function PageHeaderComponentPage() {
  useDocumentTitle('PageHeader Component');

  return (
    <ComponentPage
      title="PageHeader"
      description="Document header band with title, subtitle, and optional right metadata. Supports seven layout variants: simple, centered, minimal, branded, logo-left, logo-right, and two-column."
      installCommand="npx @pdfx/cli add page-header"
      componentName="page-header"
      preview={
        <PDFPreview
          title="Preview"
          downloadFilename="page-header-preview.pdf"
          variants={{
            options: variantOptions,
            defaultValue: 'simple' as PageHeaderVariant,
            label: 'Variant',
          }}
        >
          {/* biome-ignore lint/suspicious/noExplicitAny: Generic type workaround for React JSX components */}
          {renderPreviewDocument as any}
        </PDFPreview>
      }
      usageCode={pageHeaderUsageCode}
      usageFilename="src/components/pdfx/page-header/pdfx-page-header.tsx"
      props={pageHeaderProps}
    />
  );
}
