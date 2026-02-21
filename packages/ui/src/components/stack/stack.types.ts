import type { PDFComponentProps } from '@pdfx/shared';

/** Gap scale between Stack children. */
export type StackGap = 'none' | 'sm' | 'md' | 'lg' | 'xl';

/** Stack layout direction. */
export type StackDirection = 'vertical' | 'horizontal';

/** Cross-axis alignment (alignItems). */
export type StackAlign = 'start' | 'center' | 'end' | 'stretch';

/** Main-axis distribution (justifyContent). */
export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around';

export interface StackProps extends PDFComponentProps {
  /** Gap between children. Maps to theme spacing scale. */
  gap?: StackGap;
  /** Layout direction. vertical = column, horizontal = row. */
  direction?: StackDirection;
  /** Cross-axis alignment (alignItems). */
  align?: StackAlign;
  /** Main-axis distribution (justifyContent). */
  justify?: StackJustify;
  /** Enable flex wrap. */
  wrap?: boolean;
}
