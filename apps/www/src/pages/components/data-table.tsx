import { DataTable } from '@pdfx/ui';
import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import { ComponentPage } from '../../components/component-page';
import { PDFPreview } from '../../components/pdf-preview';
import { useDocumentTitle } from '../../hooks/use-document-title';

const styles = StyleSheet.create({
  page: { padding: 40 },
});

const usageCode = `import { Document, Page } from '@react-pdf/renderer';
import { DataTable } from '@/components/pdfx/pdfx-data-table';

const lineItems = [
  { item: 'Design', qty: 1, price: '$150', total: '$150' },
  { item: 'Development', qty: 1, price: '$2,500', total: '$2,500' },
];

export function MyDocument() {
  return (
    <Document>
      <Page size="A4" style={{ padding: 40 }}>
        <DataTable
          columns={[
            { key: 'item', header: 'Item' },
            { key: 'qty', header: 'Qty', align: 'center' },
            { key: 'price', header: 'Price', align: 'right' },
            { key: 'total', header: 'Total', align: 'right' },
          ]}
          data={lineItems}
          footer={{ item: 'Total', total: '$2,650' }}
          variant="line"
          stripe
        />
      </Page>
    </Document>
  );
}`;

const lineItems = [
  { item: 'Design', qty: 1, price: '$150', total: '$150' },
  { item: 'Development', qty: 1, price: '$2,500', total: '$2,500' },
];

const previewDocument = (
  <Document title="PDFX DataTable Preview">
    <Page size="A4" style={styles.page}>
      <DataTable
        columns={[
          { key: 'item', header: 'Item' },
          { key: 'qty', header: 'Qty', align: 'center' },
          { key: 'price', header: 'Price', align: 'right' },
          { key: 'total', header: 'Total', align: 'right' },
        ]}
        data={lineItems}
        footer={{ item: 'Total', total: '$2,650' }}
        variant="line"
        stripe
      />
    </Page>
  </Document>
);

const dataTableProps = [
  {
    name: 'columns',
    type: 'DataTableColumn[]',
    required: true,
    description: 'Column definitions with key, header, align, and optional render function.',
  },
  {
    name: 'data',
    type: 'T[]',
    required: true,
    description: 'Array of row objects. Keys should match column keys.',
  },
  {
    name: 'variant',
    type: "'line' | 'grid' | 'minimal'",
    defaultValue: "'line'",
    description: 'Visual style. Same as Table component.',
  },
  {
    name: 'stripe',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Alternating row background colors.',
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
    name: 'Column.render',
    type: '(value, row) => ReactNode',
    defaultValue: '-',
    description: 'Custom cell renderer. Receives value and full row.',
  },
];

export default function DataTableComponentPage() {
  useDocumentTitle('DataTable Component');

  return (
    <ComponentPage
      title="DataTable"
      description="Data-driven table API. Pass columns definition and data array for automatic rendering. Built on Table primitives."
      installCommand="npx @pdfx/cli add data-table"
      componentName="data-table"
      preview={
        <PDFPreview title="Preview" downloadFilename="data-table-preview.pdf">
          {previewDocument}
        </PDFPreview>
      }
      usageCode={usageCode}
      usageFilename="src/components/pdfx/pdfx-data-table.tsx"
      props={dataTableProps}
    />
  );
}
