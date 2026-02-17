import { Table, TableBody, TableCell, TableFooter, TableHeader, TableRow } from '@pdfx/ui';
import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import { ComponentPage } from '../../components/component-page';
import { PDFPreview } from '../../components/pdf-preview';
import { useDocumentTitle } from '../../hooks/use-document-title';

const styles = StyleSheet.create({
  page: { padding: 40 },
});

const usageCode = `import { Document, Page } from '@react-pdf/renderer';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableFooter, 
  TableRow, 
  TableCell 
} from '@/components/pdfx/pdfx-table';

export function MyDocument() {
  return (
    <Document>
      <Page size="A4" style={{ padding: 40 }}>
        <Table variant="line" zebraStripe>
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
          </TableBody>
          <TableFooter>
            <TableRow footer>
              <TableCell>Total</TableCell>
              <TableCell />
              <TableCell />
              <TableCell align="right">$2,650</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Page>
    </Document>
  );
}`;

const previewDocument = (
  <Document title="PDFX Table Preview">
    <Page size="A4" style={styles.page}>
      <Table variant="line" zebraStripe>
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
        </TableBody>
        <TableFooter>
          <TableRow footer>
            <TableCell>Total</TableCell>
            <TableCell>{''}</TableCell>
            <TableCell>{''}</TableCell>
            <TableCell align="right">$2,650</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Page>
  </Document>
);

const tableProps = [
  // Table props
  {
    name: 'variant',
    type: "'line' | 'grid' | 'minimal'",
    defaultValue: "'line'",
    description:
      'Visual style. line = horizontal dividers. grid = full borders. minimal = no borders.',
  },
  {
    name: 'zebraStripe',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Auto-alternate row backgrounds in TableBody.',
  },
  // TableRow props
  {
    name: 'TableRow.header',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Header row styling (uppercase, muted text).',
  },
  {
    name: 'TableRow.footer',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Footer row styling (top border, bold text).',
  },
  {
    name: 'TableRow.stripe',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Manual stripe background for this row.',
  },
  // TableCell props
  {
    name: 'TableCell.align',
    type: "'left' | 'center' | 'right'",
    defaultValue: "'left'",
    description: "Text alignment. Use 'right' for numbers.",
  },
  {
    name: 'TableCell.width',
    type: 'string | number',
    defaultValue: '-',
    description: "Column width ('50%' or 200). Omit for equal flex.",
  },
];

export default function TableComponentPage() {
  useDocumentTitle('Table Component');

  return (
    <ComponentPage
      title="Table"
      description="Composable Table with TableHeader, TableBody, TableFooter, TableRow, and TableCell. Supports line/grid/minimal variants, zebra striping, and alignment."
      installCommand="npx @pdfx/cli add table"
      componentName="table"
      preview={
        <PDFPreview title="Preview" downloadFilename="table-preview.pdf">
          {previewDocument}
        </PDFPreview>
      }
      usageCode={usageCode}
      usageFilename="src/components/pdfx/pdfx-table.tsx"
      props={tableProps}
    />
  );
}
