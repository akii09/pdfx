import type { PDFComponentProps } from '@pdfx/shared';
import type { ReactNode } from 'react';

/**
 * Alert variant determining color scheme and icon.
 * - info: Blue theme, information icon (for general notices)
 * - success: Green theme, checkmark icon (for confirmations)
 * - warning: Yellow/amber theme, warning icon (for cautions)
 * - error: Red theme, error icon (for critical alerts)
 */
export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

/**
 * Props for the PdfAlert component.
 */
export interface PdfAlertProps extends Omit<PDFComponentProps, 'children'> {
  /**
   * Alert variant determining color scheme and icon.
   * @default "info"
   */
  variant?: AlertVariant;

  /**
   * Optional title displayed prominently at the top.
   */
  title?: string;

  /**
   * Description text or content.
   * Can be a string or React nodes for more complex content.
   */
  children?: ReactNode;

  /**
   * Whether to show the icon.
   * @default true
   */
  showIcon?: boolean;

  /**
   * Whether to show the left accent border.
   * @default true
   */
  showBorder?: boolean;
}
