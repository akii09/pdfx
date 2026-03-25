import { alertProps, alertUsageCode } from '@/constants';
import { Heading, PdfAlert, Section, Text } from '@pdfx/components';
import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import { ComponentPage } from '../../components/component-page';
import { PDFPreview } from '../../components/pdf-preview';
import { useDocumentTitle } from '../../hooks/use-document-title';

const styles = StyleSheet.create({
  page: { padding: 40 },
});

const previewDocument = (
  <Document title="PDFx Alert Preview">
    <Page size="A4" style={styles.page}>
      <Heading level={1}>Document Alerts</Heading>
      <Text>The PdfAlert component displays callout boxes with different severity levels.</Text>

      <Section>
        <PdfAlert variant="info" title="Information">
          This document contains important information about your account.
        </PdfAlert>

        <PdfAlert variant="success" title="Success">
          Your payment has been processed successfully.
        </PdfAlert>

        <PdfAlert variant="warning" title="Warning">
          Please review the terms and conditions before proceeding.
        </PdfAlert>

        <PdfAlert variant="error" title="Error">
          Missing required fields. Please complete all sections.
        </PdfAlert>
      </Section>
    </Page>
  </Document>
);

export default function AlertComponentPage() {
  useDocumentTitle('Alert Component');

  return (
    <ComponentPage
      title="PdfAlert"
      description="Displays info, success, warning, or error callout boxes. Use for important notices, confirmations, cautions, or critical alerts in reports, contracts, and documents. Each variant has a distinct color scheme and icon."
      installCommand="npx @akii09/pdfx-cli add alert"
      componentName="alert"
      preview={
        <PDFPreview title="Preview" downloadFilename="alert-preview.pdf">
          {previewDocument}
        </PDFPreview>
      }
      usageCode={alertUsageCode}
      usageFilename="src/components/pdfx/alert/pdfx-alert.tsx"
      props={alertProps}
    />
  );
}
