import type { PDFComponentProps } from '@pdfx/shared';
import { View } from '@react-pdf/renderer';

/**
 * Forces a page break at the current position in the PDF document.
 * Props - `style`
 * @see {@link PageBreakProps}
 */
export interface PageBreakProps extends Omit<PDFComponentProps, 'children'> {
  children?: never;
}

export function PageBreak({ style }: PageBreakProps) {
  return <View break style={style} />;
}
