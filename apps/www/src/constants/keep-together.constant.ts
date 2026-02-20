export const keepTogetherUsageCode = `import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import { Heading } from '@/components/pdfx/pdfx-heading';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '@/components/pdfx/pdfx-table';
import { KeepTogether } from '@/components/pdfx/pdfx-keep-together';

const styles = StyleSheet.create({ page: { padding: 40 } });

export function MyDocument() {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Heading + Table will never be separated by a page break */}
        <KeepTogether>
          <Heading level={2}>Quarterly Financials</Heading>
          <Table variant="line">
            <TableHeader>
              <TableRow header>
                <TableCell header>Quarter</TableCell>
                <TableCell header align="right">Revenue</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Q1</TableCell>
                <TableCell align="right">$42,000</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </KeepTogether>

        {/* Softer version: only moves to next page if < 100pt remain */}
        <KeepTogether minPresenceAhead={100}>
          <Heading level={3}>Notes</Heading>
        </KeepTogether>
      </Page>
    </Document>
  );
}`;

export const keepTogetherProps = [
  {
    name: 'children',
    type: 'ReactNode',
    description: 'Content to keep on one page. Treated as atomic by the layout engine.',
  },
  {
    name: 'minPresenceAhead',
    type: 'number',
    description:
      'Move the block to the next page if fewer than this many PDF points remain. Use as a softer alternative to wrap={false}.',
  },
  {
    name: 'style',
    type: 'Style',
    description: 'Custom @react-pdf/renderer style applied to the wrapping View.',
  },
];
