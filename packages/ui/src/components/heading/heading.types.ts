import type { PDFComponentProps } from '@pdfx/shared';

/** Heading font weight override. */
export type HeadingWeight = 'normal' | 'medium' | 'semibold' | 'bold';

/** Heading letter-spacing scale. */
export type HeadingTracking = 'tighter' | 'tight' | 'normal' | 'wide' | 'wider';

export interface HeadingProps extends PDFComponentProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  align?: 'left' | 'center' | 'right';
  color?: string;
  transform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none';
  weight?: HeadingWeight;
  tracking?: HeadingTracking;
  noMargin?: boolean;
  /**
   * Ensure the heading has enough space below it before a page break occurs.
   * Uses `minPresenceAhead` to prevent orphaned headings at the bottom of a page.
   * When true, at least 80pt of space must remain on the page or the heading moves to the next page.
   * Defaults to **true** — headings never strand alone at the bottom of a page.
   * Set to false only when you explicitly want a heading to be allowed at the bottom of a page.
   * @default true
   */
  keepWithNext?: boolean;
}
