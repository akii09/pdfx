export const tableUsageCode = `import { Document, Page } from '@react-pdf/renderer';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableCell
} from '@/components/pdfx/table/pdfx-table';

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

export const tableProps = [
  // Table props
  {
    name: 'variant',
    type: "'line' | 'grid' | 'minimal' | 'striped' | 'compact' | 'bordered' | 'primary-header'",
    defaultValue: "'line'",
    description:
      'Visual style. line = horizontal dividers. grid = full borders. minimal = no borders. striped = alternating row backgrounds. compact = dense rows with small font. bordered = thick outer border with cell dividers. primary-header = colored header row using primary theme color.',
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
  // DataTable props
  {
    name: 'DataTable.columns',
    type: "Array<{ key: string; label: string; align?: 'left' | 'center' | 'right'; width?: string | number }>",
    required: true,
    description:
      'Column schema. Each column needs a key (maps to data field) and a label (header text). Optionally set alignment and fixed width.',
  },
  {
    name: 'DataTable.data',
    type: 'Array<Record<string, string | number | undefined>>',
    required: true,
    description:
      'Array of row objects. Each key maps to a column key. Missing values render as empty string.',
  },
  {
    name: 'DataTable.variant',
    type: "'line' | 'grid' | 'minimal' | 'striped' | 'compact' | 'bordered' | 'primary-header'",
    defaultValue: "'line'",
    description:
      'Same visual variants as Table. DataTable forwards this to the underlying Table component.',
  },
  {
    name: 'DataTable.size',
    type: "'default' | 'compact'",
    defaultValue: "'default'",
    description:
      "Row density. compact reduces padding and uses smaller font. Equivalent to using variant='compact' but composable with other variants.",
  },
  {
    name: 'DataTable.footerRow',
    type: 'Record<string, string | number | undefined>',
    description:
      'Optional summary/total row shown in a TableFooter with bold text and a top border. Keys match column keys.',
  },
];
