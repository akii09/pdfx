import { dataTableProps, dataTableUsageCode, users } from '@/constants/data-table.constant';
import { DataTable, Heading } from '@pdfx/ui';
import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import { ComponentPage } from '../../components/component-page';
import { PDFPreview } from '../../components/pdf-preview';
import { useDocumentTitle } from '../../hooks/use-document-title';

const styles = StyleSheet.create({
  page: { padding: 40 },
});

type DataTableVariant = 'line' | 'grid' | 'minimal' | 'striped';

const renderPreviewDocument = (variant: DataTableVariant) => (
  <Document title="PDFX DataTable Preview">
    <Page size="A4" style={styles.page}>
      <Heading level={3}>Team Directory</Heading>
      <DataTable
        size="compact"
        variant={variant}
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

const variantOptions = [
  { value: 'line' as DataTableVariant, label: 'Line' },
  { value: 'grid' as DataTableVariant, label: 'Grid' },
  { value: 'minimal' as DataTableVariant, label: 'Minimal' },
  { value: 'striped' as DataTableVariant, label: 'Striped' },
];

export default function DataTableComponentPage() {
  useDocumentTitle('DataTable Component');

  return (
    <ComponentPage
      title="DataTable"
      description="Data-driven table API for displaying large datasets. Pass columns + data array for automatic rendering. Use compact mode for data-dense views with many columns and rows."
      installCommand="npx @pdfx/cli add data-table"
      componentName="data-table"
      preview={
        <PDFPreview
          title="Preview"
          downloadFilename="data-table-preview.pdf"
          variants={{
            options: variantOptions,
            defaultValue: 'striped' as DataTableVariant,
            label: 'Variant',
          }}
        >
          {/* biome-ignore lint/suspicious/noExplicitAny: Generic type workaround for React JSX components */}
          {renderPreviewDocument as any}
        </PDFPreview>
      }
      usageCode={dataTableUsageCode}
      usageFilename="src/components/pdfx/pdfx-data-table.tsx"
      props={dataTableProps}
    />
  );
}
