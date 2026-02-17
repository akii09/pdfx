export const dataTableUsageCode = `import { Document, Page } from '@react-pdf/renderer';
import { DataTable } from '@/components/pdfx/pdfx-data-table';
import { Heading } from '@/components/pdfx/pdfx-heading';

const users = [
  { id: 1, name: 'Alice Johnson', dept: 'Engineering', status: 'Active' },
  { id: 2, name: 'Bob Smith', dept: 'Marketing', status: 'Active' },
  { id: 3, name: 'Carol Lee', dept: 'Design', status: 'Inactive' },
];

export function MyDocument() {
  return (
    <Document>
      <Page size="A4" style={{ padding: 40 }}>
        <Heading level={3}>Team Directory</Heading>
        <DataTable
          size="compact"
          variant="striped"
          columns={[
            { key: 'id', header: 'ID', align: 'center' },
            { key: 'name', header: 'Name' },
            { key: 'dept', header: 'Department' },
            { key: 'status', header: 'Status', align: 'center' },
          ]}
          data={users}
        />
      </Page>
    </Document>
  );
}`;
export const users = [
  { id: 1, name: 'Alice Johnson', dept: 'Engineering', status: 'Active' },
  { id: 2, name: 'Bob Smith', dept: 'Marketing', status: 'Active' },
  { id: 3, name: 'Carol Lee', dept: 'Design', status: 'Inactive' },
  { id: 4, name: 'Dan Wilson', dept: 'Engineering', status: 'Active' },
  { id: 5, name: 'Eve Brown', dept: 'Sales', status: 'Active' },
  { id: 6, name: 'Frank Chen', dept: 'Support', status: 'Active' },
  { id: 7, name: 'Grace Kim', dept: 'Product', status: 'Active' },
  { id: 8, name: 'Hank Davis', dept: 'Marketing', status: 'Inactive' },
];

export const dataTableProps = [
  {
    name: 'columns',
    type: 'DataTableColumn[]',
    required: true,
    description: 'Column definitions with key, header, align, width, and optional render function.',
  },
  {
    name: 'data',
    type: 'T[]',
    required: true,
    description: 'Array of row objects. Keys should match column keys.',
  },
  {
    name: 'size',
    type: "'default' | 'compact'",
    defaultValue: "'default'",
    description: 'Table density. "compact" reduces padding and font size for data-dense views.',
  },
  {
    name: 'variant',
    type: "'line' | 'grid' | 'minimal' | 'striped'",
    defaultValue: "'line'",
    description: 'Visual style. Same as Table component.',
  },
  {
    name: 'stripe',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Alternating row background colors (auto-enabled for "striped" variant).',
  },
  {
    name: 'footer',
    type: 'Partial<Record<string, string | number>>',
    defaultValue: '-',
    description: 'Footer row data. Keys match column keys.',
  },
  {
    name: 'Column.key',
    type: 'string',
    required: true,
    description: 'Property key in data objects.',
  },
  {
    name: 'Column.header',
    type: 'string',
    required: true,
    description: 'Header text for this column.',
  },
  {
    name: 'Column.align',
    type: "'left' | 'center' | 'right'",
    defaultValue: "'left'",
    description: 'Column text alignment.',
  },
  {
    name: 'Column.width',
    type: 'string | number',
    defaultValue: '-',
    description: 'Column width. Use % for proportional (e.g. "25%") or number for fixed pts.',
  },
  {
    name: 'Column.render',
    type: '(value, row) => ReactNode',
    defaultValue: '-',
    description: 'Custom cell renderer. Receives value and full row.',
  },
];
