export const keyValueUsageCode = `import { Document, Page } from '@react-pdf/renderer';
import { KeyValue } from '@/components/pdfx/key-value/pdfx-key-value';

export function MyDocument() {
  return (
    <Document>
      <Page size="A4" style={{ padding: 40 }}>
        {/* Horizontal layout (default) — great for invoice metadata */}
        <KeyValue
          items={[
            { key: 'Invoice Number', value: '#INV-1042' },
            { key: 'Date', value: 'March 1, 2026' },
            { key: 'Due Date', value: 'March 31, 2026' },
            { key: 'Total', value: '$4,200.00', valueColor: 'primary' },
          ]}
          divided
        />

        {/* Vertical layout — great for form-like displays */}
        <KeyValue
          direction="vertical"
          items={[
            { key: 'Client', value: 'Acme Corporation' },
            { key: 'Project', value: 'Website Redesign' },
          ]}
        />
      </Page>
    </Document>
  );
}`;

export const keyValueProps = [
  {
    name: 'items',
    type: 'KeyValueEntry[]',
    required: true,
    description:
      'Array of key-value pairs. Each entry has a key (label) and value (data). Optional valueColor per item.',
  },
  {
    name: 'direction',
    type: "'horizontal' | 'vertical'",
    defaultValue: "'horizontal'",
    description:
      'Layout direction. horizontal = key and value side-by-side on one row. vertical = key stacked above value.',
  },
  {
    name: 'divided',
    type: 'boolean',
    defaultValue: 'false',
    description:
      'Show a horizontal divider line between each row. Most useful with horizontal direction.',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    defaultValue: "'md'",
    description: 'Font size scale applied to both keys and values together.',
  },
  {
    name: 'labelFlex',
    type: 'number',
    defaultValue: '1',
    description:
      'In horizontal layout, controls the label column width as a flex ratio. Value column takes remaining space. Use 0.5 for a narrower label, 2 for a wider label.',
  },
  {
    name: 'labelColor',
    type: 'string',
    description: 'Color override for all key/label text. Use a theme token or CSS color.',
  },
  {
    name: 'valueColor',
    type: 'string',
    description:
      'Color override for all value text. Individual item valueColor takes priority when set.',
  },
  {
    name: 'boldValue',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Render all value text in bold weight.',
  },
  {
    name: 'style',
    type: 'Style',
    description: 'Custom @react-pdf/renderer styles applied to the outer container.',
  },
];

export const keyValueEntryProps = [
  {
    name: 'key',
    type: 'string',
    required: true,
    description: 'The label / field name. Rendered in muted style.',
  },
  {
    name: 'value',
    type: 'string',
    required: true,
    description: 'The data value to display.',
  },
  {
    name: 'valueColor',
    type: 'string',
    description:
      'Per-item value color override. Takes priority over the component-level valueColor prop.',
  },
];
