import type { Style } from '@react-pdf/types';

/** Column layout for a form section. */
export type FormLayout = 'single' | 'two-column' | 'three-column';

/** A single form field row with a label and value. */
export interface FormRow {
  label: string;
  value: string;
}

export interface PdfFormSectionProps {
  title?: string;
  rows: FormRow[];
  layout?: FormLayout;
  /**
   * Prevent the form section from being split across PDF pages.
   * Useful for short single-page forms where a mid-section break looks broken.
   * @default false
   */
  noWrap?: boolean;
  style?: Style;
}
