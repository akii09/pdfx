import type { PDFComponentProps } from '@pdfx/shared';
import { View } from '@react-pdf/renderer';

export interface PageBreakProps extends Omit<PDFComponentProps, 'children'> {
  children?: never;
}

export function PageBreak() {
  return <View break />;
}
