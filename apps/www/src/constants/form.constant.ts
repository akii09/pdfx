export const formUsageCode = `import { Document, Page } from '@react-pdf/renderer';
import { PdfForm } from '@/components/pdfx/form/pdfx-form';

export function MyDocument() {
  return (
    <Document>
      <Page size="A4" style={{ padding: 40 }}>
        <PdfForm
          title="Job Application"
          subtitle="Please complete all fields clearly in block capitals."
          variant="underline"
          groups={[
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
              layout: 'two-column',
              fields: [
                { label: 'Street Address' },
                { label: 'City' },
                { label: 'State / Province' },
                { label: 'Zip / Postal Code' },
              ],
            },
            {
              title: 'Additional Information',
              fields: [
                { label: 'Cover Letter / Notes', height: 60 },
              ],
            },
          ]}
        />
      </Page>
    </Document>
  );
}`;

export const formProps = [
  {
    name: 'groups',
    type: 'PdfFormGroup[]',
    defaultValue: '-',
    required: true,
    description:
      'Ordered list of field groups. Each group has an optional title, a fields array, and an optional column layout.',
  },
  {
    name: 'title',
    type: 'string',
    defaultValue: '-',
    description: 'Form-level heading (e.g. "Application Form"). Rendered above a divider line.',
  },
  {
    name: 'subtitle',
    type: 'string',
    defaultValue: '-',
    description:
      'Optional subtitle shown below the title in muted text (e.g. fill-in instructions).',
  },
  {
    name: 'variant',
    type: "'underline' | 'box' | 'outlined' | 'ghost'",
    defaultValue: "'underline'",
    description:
      'Visual style of the blank field areas. underline = bottom border only (most print-friendly). box = full rectangle. outlined = rounded rectangle. ghost = light filled background.',
  },
  {
    name: 'labelPosition',
    type: "'above' | 'left'",
    defaultValue: "'above'",
    description:
      'Where to place field labels relative to the blank area. above = label on its own line (default). left = label and field on the same line.',
  },
  {
    name: 'noWrap',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Prevent the entire form from being split across PDF pages.',
  },
  {
    name: 'style',
    type: 'Style',
    defaultValue: '-',
    description: 'Custom @react-pdf/renderer styles applied to the root container.',
  },
  {
    name: 'PdfFormGroup.title',
    type: 'string',
    defaultValue: '-',
    description: 'Optional section heading rendered above the group fields.',
  },
  {
    name: 'PdfFormGroup.fields',
    type: 'PdfFormField[]',
    defaultValue: '-',
    required: true,
    description: 'Array of field definitions in this group.',
  },
  {
    name: 'PdfFormGroup.layout',
    type: "'single' | 'two-column' | 'three-column'",
    defaultValue: "'single'",
    description: 'Column layout for this group. Fields are distributed evenly across columns.',
  },
  {
    name: 'PdfFormField.label',
    type: 'string',
    defaultValue: '-',
    required: true,
    description: 'Field label shown above or beside the blank area.',
  },
  {
    name: 'PdfFormField.hint',
    type: 'string',
    defaultValue: '-',
    description:
      'Hint text shown inside the blank field area in light muted style (e.g. format hints like "DD/MM/YYYY"). Omit for a completely blank field.',
  },
  {
    name: 'PdfFormField.height',
    type: 'number',
    defaultValue: '18',
    description:
      'Height of the blank field area in points. Use larger values (e.g. 60) for multi-line text fields.',
  },
];
