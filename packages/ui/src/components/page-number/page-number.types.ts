import type { PDFComponentProps } from '@pdfx/shared';

/**
 * Text alignment for the page number.
 */
export type PageNumberAlign = 'left' | 'center' | 'right';

/**
 * Size preset for the page number text.
 */
export type PageNumberSize = 'xs' | 'sm' | 'md';

/**
 * Props for the PdfPageNumber component.
 */
export interface PdfPageNumberProps extends Omit<PDFComponentProps, 'children'> {
  /**
   * Format string for the page number.
   * Use `{page}` for current page and `{total}` for total pages.
   * @default "Page {page} of {total}"
   * @example "Page {page} of {total}"
   * @example "{page} / {total}"
   * @example "- {page} -"
   */
  format?: string;

  /**
   * Text alignment.
   * @default "center"
   */
  align?: PageNumberAlign;

  /**
   * Size preset for the text.
   * @default "sm"
   */
  size?: PageNumberSize;

  /**
   * Whether the page number should be fixed (appear on every page).
   * Use this when placing inside a Page component to repeat on all pages.
   * @default false
   */
  fixed?: boolean;

  /**
   * Use muted color (mutedForeground) instead of foreground.
   * @default true
   */
  muted?: boolean;

  /**
   * No children allowed.
   */
  children?: never;
}
