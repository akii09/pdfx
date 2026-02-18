export const formUsageCode = `import { Document, Page } from '@react-pdf/renderer';
import { PdfFormSection } from '@/components/pdfx/pdfx-form';

export function MyDocument() {
  return (
    <Document>
      <Page size="A4" style={{ padding: 40 }}>
        {/* Single column layout */}
        <PdfFormSection
          title="Client Details"
          layout="single"
          rows={[
            { label: 'Name', value: 'Jane Smith' },
            { label: 'Company', value: 'Acme Corp' },
            { label: 'Email', value: 'jane@acme.com' },
            { label: 'Phone', value: '+1 555 0100' },
          ]}
        />

        {/* Two column layout */}
        <PdfFormSection
          title="Invoice Details"
          layout="two-column"
          rows={[
            { label: 'Invoice #', value: 'INV-2026-0042' },
            { label: 'Issue Date', value: '15 Feb 2026' },
            { label: 'Due Date', value: '15 Mar 2026' },
            { label: 'Status', value: 'Paid' },
          ]}
        />

        {/* Three column layout */}
        <PdfFormSection
          title="Project Overview"
          layout="three-column"
          rows={[
            { label: 'Project', value: 'Redesign' },
            { label: 'Team', value: 'Engineering' },
            { label: 'Budget', value: '$24,000' },
            { label: 'Start', value: 'Jan 2026' },
            { label: 'End', value: 'Mar 2026' },
            { label: 'Status', value: 'Active' },
          ]}
        />
      </Page>
    </Document>
  );
}`;

export const formProps = [
  {
    name: 'rows',
    type: 'FormRow[]',
    defaultValue: '-',
    description: 'Array of form rows. Each row has a label and value string.',
  },
  {
    name: 'layout',
    type: "'single' | 'two-column' | 'three-column'",
    defaultValue: "'single'",
    description:
      'Column layout. single = full-width rows, two-column = rows split into 2 columns, three-column = rows split into 3 columns.',
  },
  {
    name: 'title',
    type: 'string',
    defaultValue: '-',
    description: 'Optional section title rendered above the form rows.',
  },
  {
    name: 'style',
    type: 'Style',
    defaultValue: '-',
    description: 'Custom @react-pdf/renderer styles applied to the section container.',
  },
  {
    name: 'FormRow.label',
    type: 'string',
    defaultValue: '-',
    description: 'Field label displayed in muted foreground color.',
  },
  {
    name: 'FormRow.value',
    type: 'string',
    defaultValue: '-',
    description: 'Field value displayed in foreground color.',
  },
];
