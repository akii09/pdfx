import type { Style } from '@react-pdf/types';
import type { ReactNode } from 'react';

/** Card visual variant. */
export type CardVariant = 'default' | 'bordered' | 'muted';

export interface PdfCardProps {
  /** Optional title displayed at the top of the card with a separator line. */
  title?: string;
  /** Card body content. */
  children?: ReactNode;
  /** Visual style of the card. @default 'default' */
  variant?: CardVariant;
  /** Internal padding size. @default 'md' */
  padding?: 'sm' | 'md' | 'lg';
  /**
   * Allow the card to split across page boundaries.
   * @default false — cards are kept on one page by default.
   * Set wrap={true} only for tall cards whose content must span pages.
   */
  wrap?: boolean;
  /** Custom style override. */
  style?: Style;
}
