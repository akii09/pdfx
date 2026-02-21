import type { PDFComponentProps } from '@pdfx/shared';

/** Badge visual variant — controls background and border colors. */
export type BadgeVariant =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'destructive'
  | 'info'
  | 'outline';

/** Badge size — controls font size and padding. */
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends Omit<PDFComponentProps, 'children'> {
  /** Display text of the badge. */
  label: string;
  /** Visual variant. Controls colors. Defaults to 'default'. */
  variant?: BadgeVariant;
  /** Badge size. Defaults to 'md'. */
  size?: BadgeSize;
  /** Override the background color. Use theme token or any CSS color. */
  background?: string;
  /** Override the text color. Use theme token or any CSS color. */
  color?: string;
}
