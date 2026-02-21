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
  style?: Style;
}
