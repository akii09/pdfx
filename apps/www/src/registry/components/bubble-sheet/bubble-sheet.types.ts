import type { Style } from '@react-pdf/types';

/** Bubble circle size variant. */
export type BubbleSize = 'sm' | 'md' | 'lg';

/**
 * OMR-style bubble sheet component for exam and assessment answer sheets.
 * Props - `questions` | `choices` | `columns` | `title` | `studentInfoFields` | `bubbleSize` | `style`
 * @see {@link BubbleSheetProps}
 */
export interface BubbleSheetProps {
  /** Total number of questions to render. */
  questions: number;
  /**
   * Answer choice labels rendered as bubble column headers.
   * @default ["A", "B", "C", "D", "E"]
   */
  choices?: string[];
  /**
   * Number of question columns to split the grid into.
   * @default 2
   */
  columns?: number;
  /** Optional section title rendered above the sheet. */
  title?: string;
  /**
   * Labels for student info fill-in fields rendered at the top
   * (e.g. ["Name", "ID", "Date"]).
   */
  studentInfoFields?: string[];
  /**
   * Bubble circle size.
   * @default 'md'
   */
  bubbleSize?: BubbleSize;
  /** Custom root style. */
  style?: Style;
}
