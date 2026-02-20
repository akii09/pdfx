import { tableProps, tableUsageCode } from '@/constants';
import { Table, TableBody, TableCell, TableFooter, TableHeader, TableRow } from '@pdfx/ui';
import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import { ComponentPage } from '../../components/component-page';
import { PDFPreview } from '../../components/pdf-preview';
import { useDocumentTitle } from '../../hooks/use-document-title';

const styles = StyleSheet.create({
  page: { padding: 40 },
});

type TableVariant =
  | 'line'
  | 'grid'
  | 'minimal'
  | 'striped'
  | 'compact'
  | 'bordered'
  | 'primary-header';

const renderPreviewDocument = (variant: TableVariant) => (
  <Document title="PDFx Table Preview">
    <Page size="A4" style={styles.page}>
      <Table variant={variant} zebraStripe={variant === 'striped'}>
        <TableHeader>
          <TableRow header>
            <TableCell>Item</TableCell>
            <TableCell align="center">Qty</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Design</TableCell>
            <TableCell align="center">1</TableCell>
            <TableCell align="right">$150</TableCell>
            <TableCell align="right">$150</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Development</TableCell>
            <TableCell align="center">1</TableCell>
            <TableCell align="right">$2,500</TableCell>
            <TableCell align="right">$2,500</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Testing</TableCell>
            <TableCell align="center">1</TableCell>
            <TableCell align="right">$800</TableCell>
            <TableCell align="right">$800</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow footer>
            <TableCell>Total</TableCell>
            <TableCell>{''}</TableCell>
            <TableCell>{''}</TableCell>
            <TableCell align="right">$3,450</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Page>
  </Document>
);

const variantOptions = [
  { value: 'line' as TableVariant, label: 'Line' },
  { value: 'grid' as TableVariant, label: 'Grid' },
  { value: 'minimal' as TableVariant, label: 'Minimal' },
  { value: 'striped' as TableVariant, label: 'Striped' },
  { value: 'compact' as TableVariant, label: 'Compact' },
  { value: 'bordered' as TableVariant, label: 'Bordered' },
  { value: 'primary-header' as TableVariant, label: 'Primary Header' },
];

export default function TableComponentPage() {
  useDocumentTitle('Table Component');

  return (
    <ComponentPage
      title="Table"
      description="Composable Table with TableHeader, TableBody, TableFooter, TableRow, and TableCell. Supports 7 visual variants, zebra striping, and alignment."
      installCommand="npx @pdfx/cli add table"
      componentName="table"
      preview={
        <PDFPreview
          title="Preview"
          downloadFilename="table-preview.pdf"
          variants={{
            options: variantOptions,
            defaultValue: 'line' as TableVariant,
            label: 'Variant',
          }}
        >
          {/* biome-ignore lint/suspicious/noExplicitAny: Generic type workaround for React JSX components */}
          {renderPreviewDocument as any}
        </PDFPreview>
      }
      usageCode={tableUsageCode}
      usageFilename="src/components/pdfx/pdfx-table.tsx"
      props={tableProps}
      additionalInfo={
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/40 p-4">
            <h3 className="text-sm font-semibold mb-3">Component Family</h3>
            <p className="text-sm text-muted-foreground mb-3">
              The Table component is actually a family of 6 composable components that work
              together:
            </p>
            <div className="grid gap-2">
              <div className="flex gap-3">
                <code className="rounded bg-muted px-2 py-1 text-xs font-mono font-semibold text-foreground shrink-0">
                  Table
                </code>
                <span className="text-sm text-muted-foreground">
                  Main container with variant styling and zebra stripe support
                </span>
              </div>
              <div className="flex gap-3">
                <code className="rounded bg-muted px-2 py-1 text-xs font-mono font-semibold text-foreground shrink-0">
                  TableHeader
                </code>
                <span className="text-sm text-muted-foreground">
                  Semantic wrapper for header rows
                </span>
              </div>
              <div className="flex gap-3">
                <code className="rounded bg-muted px-2 py-1 text-xs font-mono font-semibold text-foreground shrink-0">
                  TableBody
                </code>
                <span className="text-sm text-muted-foreground">
                  Semantic wrapper for data rows (handles zebra striping)
                </span>
              </div>
              <div className="flex gap-3">
                <code className="rounded bg-muted px-2 py-1 text-xs font-mono font-semibold text-foreground shrink-0">
                  TableFooter
                </code>
                <span className="text-sm text-muted-foreground">
                  Semantic wrapper for footer/summary rows
                </span>
              </div>
              <div className="flex gap-3">
                <code className="rounded bg-muted px-2 py-1 text-xs font-mono font-semibold text-foreground shrink-0">
                  TableRow
                </code>
                <span className="text-sm text-muted-foreground">
                  Individual row with header/footer emphasis
                </span>
              </div>
              <div className="flex gap-3">
                <code className="rounded bg-muted px-2 py-1 text-xs font-mono font-semibold text-foreground shrink-0">
                  TableCell
                </code>
                <span className="text-sm text-muted-foreground">
                  Individual cell with alignment, width, and auto-styling
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/20 p-4">
            <div className="flex items-start gap-3">
              <svg
                className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-label="Success icon"
                role="img"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="space-y-2">
                <p className="text-sm font-medium text-green-900 dark:text-green-200">
                  Single file installation
                </p>
                <p className="text-sm text-green-800 dark:text-green-300">
                  All 6 components are bundled in a single file (pdfx-table.tsx). One install gets
                  you everything you need. No additional dependencies required.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-muted/40 p-4">
            <h3 className="text-sm font-semibold mb-2">Key Features</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-foreground">•</span>
                <span>
                  <strong className="text-foreground">Seven visual variants:</strong> line
                  (horizontal dividers), grid (full borders), minimal (borderless), striped
                  (alternating backgrounds), compact (dense rows), bordered (thick borders),
                  primary-header (colored header)
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-foreground">•</span>
                <span>
                  <strong className="text-foreground">Automatic zebra striping:</strong> Enable with
                  zebraStripe prop for alternating row backgrounds
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-foreground">•</span>
                <span>
                  <strong className="text-foreground">Flexible column widths:</strong> Use fixed
                  widths or let columns flex automatically
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-foreground">•</span>
                <span>
                  <strong className="text-foreground">Cell alignment:</strong> left, center, or
                  right alignment for any cell
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-foreground">•</span>
                <span>
                  <strong className="text-foreground">Theme-driven:</strong> All styling derived
                  from theme tokens, zero hardcoded values
                </span>
              </li>
            </ul>
          </div>
        </div>
      }
    />
  );
}
