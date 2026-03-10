export const alertUsageCode = `import { Document, Page } from '@react-pdf/renderer';
import { PdfAlert } from '@/components/pdfx/alert/pdfx-alert';
import { Heading } from '@/components/pdfx/heading/pdfx-heading';
import { Text } from '@/components/pdfx/text/pdfx-text';

export function MyDocument() {
  return (
    <Document>
      <Page size="A4" style={{ padding: 40 }}>
        <Heading level={1}>Contract Agreement</Heading>

        {/* Info callout */}
        <PdfAlert variant="info" title="Important Notice">
          This document requires a signature before proceeding.
        </PdfAlert>

        {/* Success confirmation */}
        <PdfAlert variant="success" title="Payment Confirmed">
          Your payment of $500.00 has been received.
        </PdfAlert>

        {/* Warning callout */}
        <PdfAlert variant="warning" title="Deadline Approaching">
          Please submit your documents by March 15, 2026.
        </PdfAlert>

        {/* Error alert */}
        <PdfAlert variant="error" title="Action Required">
          Missing required information. Please review and resubmit.
        </PdfAlert>
      </Page>
    </Document>
  );
}`;

export const alertExamples = {
  info: `<PdfAlert variant="info" title="Note">
  This document is for review purposes only.
</PdfAlert>`,
  success: `<PdfAlert variant="success" title="Approved">
  Your application has been approved.
</PdfAlert>`,
  warning: `<PdfAlert variant="warning" title="Caution" showIcon={false}>
  This action cannot be undone.
</PdfAlert>`,
  error: `<PdfAlert variant="error" title="Error">
  Please correct the highlighted fields.
</PdfAlert>`,
};

export const alertProps = [
  {
    name: 'variant',
    type: "'info' | 'success' | 'warning' | 'error'",
    defaultValue: "'info'",
    description:
      'Alert variant determining color scheme and icon. info = blue, success = green, warning = amber, error = red.',
  },
  {
    name: 'title',
    type: 'string',
    description: 'Optional title displayed prominently at the top.',
  },
  {
    name: 'children',
    type: 'ReactNode',
    description: 'Description text or content. Can be a string or React nodes.',
  },
  {
    name: 'showIcon',
    type: 'boolean',
    defaultValue: 'true',
    description: 'Whether to show the variant icon.',
  },
  {
    name: 'showBorder',
    type: 'boolean',
    defaultValue: 'true',
    description: 'Whether to show the left accent border.',
  },
  {
    name: 'style',
    type: 'Style',
    description: 'Custom @react-pdf/renderer styles applied to the alert container.',
  },
];
