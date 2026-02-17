import { Link } from '@pdfx/ui';
import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import { ComponentPage } from '../../components/component-page';
import { PDFPreview } from '../../components/pdf-preview';
import { useDocumentTitle } from '../../hooks/use-document-title';

const styles = StyleSheet.create({
  page: { padding: 30 },
});

const usageCode = `import { Document, Page } from '@react-pdf/renderer';
import { Link } from '@/components/pdfx/pdfx-link';

export function MyDocument() {
  return (
    <Document>
      <Page size="A4" style={{ padding: 30 }}>
        <Link href="https://pdfx.akashpise.dev">Documentation</Link>
        <Link href="#section-1" color="primary">Internal link</Link>
      </Page>
    </Document>
  );
}`;

const previewDocument = (
  <Document title="PDFX Link Preview">
    <Page size="A4" style={styles.page}>
      <Link href="https://pdfx.akashpise.dev">Documentation</Link>
      <Link href="#section-1" color="primary">
        Internal link
      </Link>
    </Page>
  </Document>
);

const linkProps = [
  {
    name: 'href',
    type: 'string',
    description:
      'URL or anchor ID (prefix with # for internal links). Maps to @react-pdf Link src.',
    required: true,
  },
  {
    name: 'align',
    type: "'left' | 'center' | 'right'",
    description: 'Text alignment. Maps to textAlign.',
  },
  {
    name: 'color',
    type: 'string',
    description:
      "Text color. Use theme token ('primary', 'accent', etc.) or any CSS color. Defaults to primary.",
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'The link text content',
    required: true,
  },
  {
    name: 'style',
    type: 'Style',
    description: 'Custom @react-pdf/renderer styles to merge with defaults',
  },
];

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
      usageCode={usageCode}
      usageFilename="src/components/pdfx/pdfx-link.tsx"
      props={linkProps}
    />
  );
}
