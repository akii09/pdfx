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
      additionalInfo={
        <div className="space-y-4">
          <div className="rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/20 p-4">
            <div className="flex items-start gap-3">
              <svg
                className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-label="Information icon"
                role="img"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="space-y-2">
                <p className="text-sm font-medium text-blue-900 dark:text-blue-200">
                  This component depends on the Table component
                </p>
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  DataTable is a convenience wrapper around the composable Table components (Table,
                  TableHeader, TableBody, TableRow, TableCell). It provides a simpler data-driven
                  API.
                </p>
                <div className="mt-3 space-y-2">
                  <p className="text-xs font-semibold text-blue-900 dark:text-blue-200">
                    Using CLI (Recommended):
                  </p>
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    The{' '}
                    <code className="rounded bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 font-mono text-xs">
                      pdfx add data-table
                    </code>{' '}
                    command automatically installs the Table component dependency for you.
                  </p>
                  <p className="text-xs font-semibold text-blue-900 dark:text-blue-200 mt-3">
                    Manual Installation:
                  </p>
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    If copying files manually, you must install both components:
                  </p>
                  <ol className="list-decimal list-inside text-xs text-blue-700 dark:text-blue-300 space-y-1 ml-2">
                    <li>
                      First:{' '}
                      <code className="rounded bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 font-mono text-xs">
                        pdfx add table
                      </code>{' '}
                      (or copy pdfx-table.tsx manually)
                    </li>
                    <li>
                      Then:{' '}
                      <code className="rounded bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 font-mono text-xs">
                        pdfx add data-table
                      </code>{' '}
                      (or copy pdfx-data-table.tsx manually)
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-muted/40 p-4">
            <h3 className="text-sm font-semibold mb-2">When to use DataTable vs Table?</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div>
                <p className="font-medium text-foreground mb-1">Use DataTable when:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>You have array-based data (e.g., from API, database)</li>
                  <li>You want a simple columns + data API</li>
                  <li>You need compact mode for dense data tables</li>
                  <li>You want custom cell renderers via column.render</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">Use Table directly when:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>You need full control over table structure</li>
                  <li>You're building complex layouts with merged cells</li>
                  <li>You want semantic HTML-like JSX (TableHeader, TableBody, etc.)</li>
                  <li>You need maximum flexibility for custom table designs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
}
