import type { PDFComponentProps } from '@pdfx/shared';

/** Typography scale variant. Maps to primitives.typography. */
export type TextVariant = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';

/** Font weight override. */
export type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold';

/** Text decoration style. */
export type TextDecoration = 'underline' | 'line-through' | 'none';

export interface TextProps extends PDFComponentProps {
  /** Typography scale variant. Maps to primitives.typography. Default (undefined) uses typography.body. */
  variant?: TextVariant;
  /** Text alignment. Maps to textAlign. */
  align?: 'left' | 'center' | 'right' | 'justify';
  /** Text color. Use theme token (e.g. 'primary', 'muted') or any CSS color. */
  color?: string;
  /** Font weight override. */
  weight?: TextWeight;
  /** Render text in italic style. */
  italic?: boolean;
  /** Text decoration. 'line-through' is useful for strikethrough pricing. */
  decoration?: TextDecoration;
  /** Text transform (uppercase, lowercase, capitalize). */
  transform?: 'uppercase' | 'lowercase' | 'capitalize';
  /** Remove paragraph gap margin. Useful inside Stack or tight layouts. */
  noMargin?: boolean;
}
