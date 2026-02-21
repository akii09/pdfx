import type { PDFComponentProps } from '@pdfx/shared';

/** Link visual variant — controls default color. */
export type LinkVariant = 'default' | 'muted' | 'primary';

/** Link underline style. */
export type LinkUnderline = 'always' | 'none';

export interface LinkProps extends PDFComponentProps {
  /** URL or anchor ID (prefix with # for internal links). Maps to @react-pdf Link src. */
  href: string;
  /** Text alignment. Maps to textAlign. */
  align?: 'left' | 'center' | 'right';
  /** Text color. Use theme token (e.g. 'primary', 'accent') or any CSS color. Defaults to accent. */
  color?: string;
  /** Link visual variant. */
  variant?: LinkVariant;
  /** Underline style. always = underlined, none = no underline. */
  underline?: LinkUnderline;
}
