import { tableProps, tableUsageCode } from '@/constants';
import { Table, TableBody, TableCell, TableFooter, TableHeader, TableRow } from '@pdfx/ui';
import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import { ComponentPage } from '../../components/component-page';
import { PDFPreview } from '../../components/pdf-preview';
import { useDocumentTitle } from '../../hooks/use-document-title';

const styles = StyleSheet.create({
  page: { padding: 40 },
});

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
      usageCode={tableUsageCode}
      usageFilename="src/components/pdfx/pdfx-table.tsx"
      props={tableProps}
    />
  );
}
