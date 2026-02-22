import { linkProps, linkUsageCode } from '@/constants';
import { Link } from '@pdfx/ui';
import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import { ComponentPage } from '../../components/component-page';
import { PDFPreview } from '../../components/pdf-preview';
import { useDocumentTitle } from '../../hooks/use-document-title';

const styles = StyleSheet.create({
  page: { padding: 30 },
});

const previewDocument = (
  <Document title="PDFx Link Preview">
    <Page size="A4" style={styles.page}>
      <Link href="https://pdfx.akashpise.dev">Documentation</Link>
      <Link href="#section-1" color="primary">
        Internal link
      </Link>
    </Page>
  </Document>
);

export default function LinkComponentPage() {
  useDocumentTitle('Link Component');

  return (
    <ComponentPage
      title="Link"
      description="PDF link component for hyperlinks. Renders as clickable link in PDF viewers."
      installCommand="npx @pdfx/cli add link"
      componentName="link"
      preview={
        <PDFPreview title="Preview" downloadFilename="link-preview.pdf">
          {previewDocument}
        </PDFPreview>
      }
      usageCode={linkUsageCode}
      usageFilename="src/components/pdfx/link/pdfx-link.tsx"
      props={linkProps}
    />
  );
}
