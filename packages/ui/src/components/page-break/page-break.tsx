import type { PDFComponentProps } from '@pdfx/shared';
import { View } from '@react-pdf/renderer';

/**
 * Props for the PageBreak component.
 *
 * @example
 * ```tsx
 * <PageBreak />
 * ```
 */
export interface PageBreakProps extends Omit<PDFComponentProps, 'children'> {
  /** Optional children (page break typically has none) */
  children?: never;
}

/**
 * PDF page break component — forces content after it to start on a new page.
 * Wraps @react-pdf/renderer's View with the break prop.
 *
 * @example
 * ```tsx
 * <Heading level={1}>Section 1</Heading>
 * <Text>Content...</Text>
 * <PageBreak />
 * <Heading level={1}>Section 2</Heading>
 * ```
 */
export function PageBreak(_props: PageBreakProps) {
  return <View break />;
}
