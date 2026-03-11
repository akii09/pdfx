export const watermarkUsageCode = `import { Document, Page } from '@react-pdf/renderer';
import { PdfWatermark } from '@/components/pdfx/watermark/pdfx-watermark';
import { Heading } from '@/components/pdfx/heading/pdfx-heading';
import { Text } from '@/components/pdfx/text/pdfx-text';

export function MyDocument() {
  return (
    <Document>
      <Page size="A4" style={{ padding: 40 }}>
        {/* Diagonal DRAFT watermark - appears on every page */}
        <PdfWatermark text="DRAFT" />

        <Heading level={1}>Draft Document</Heading>
        <Text>This document is not yet finalized...</Text>
      </Page>
    </Document>
  );
}`;

export const watermarkExamples = {
  confidential: `<PdfWatermark text="CONFIDENTIAL" color="destructive" opacity={0.1} />`,
  paid: `<PdfWatermark text="PAID" angle={0} color="success" fontSize={80} />`,
  corner: `<PdfWatermark text="COPY" position="top-right" angle={0} fontSize={24} />`,
};

export const watermarkProps = [
  {
    name: 'text',
    type: 'string',
    required: true,
    description:
      'The text to display as a watermark. Common values: "DRAFT", "CONFIDENTIAL", "PAID", "VOID", "COPY", "SAMPLE".',
  },
  {
    name: 'opacity',
    type: 'number',
    defaultValue: '0.15',
    description: 'Opacity of the watermark (0 to 1).',
  },
  {
    name: 'fontSize',
    type: 'number',
    defaultValue: '60',
    description: 'Font size in PDF points.',
  },
  {
    name: 'color',
    type: 'string',
    defaultValue: "'mutedForeground'",
    description:
      'Color of the watermark text. Can be a hex color or theme color key (e.g., "primary", "destructive").',
  },
  {
    name: 'angle',
    type: 'number',
    defaultValue: '-45',
    description: 'Rotation angle in degrees. Use negative values for counter-clockwise rotation.',
  },
  {
    name: 'position',
    type: "'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'",
    defaultValue: "'center'",
    description: 'Position of the watermark on the page.',
  },
  {
    name: 'fixed',
    type: 'boolean',
    defaultValue: 'true',
    description: 'Whether the watermark should be fixed (appear on every page).',
  },
  {
    name: 'style',
    type: 'Style',
    description: 'Custom @react-pdf/renderer styles to merge with defaults.',
  },
];
