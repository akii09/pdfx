import type { PDFComponentProps } from '@pdfx/shared';

/** Divider line style. */
export type DividerVariant = 'solid' | 'dashed' | 'dotted';

/** Divider line weight. */
export type DividerThickness = 'thin' | 'medium' | 'thick';

/** Vertical spacing around the divider. */
export type DividerSpacing = 'none' | 'sm' | 'md' | 'lg';

export interface DividerProps extends Omit<PDFComponentProps, 'children'> {
  spacing?: DividerSpacing;
  variant?: DividerVariant;
  color?: string;
  thickness?: DividerThickness;
  label?: string;
  width?: string | number;
}
