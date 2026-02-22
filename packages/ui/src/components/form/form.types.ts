import type { Style } from '@react-pdf/types';

/** Visual style variant for the fillable form. */
export type PdfFormVariant = 'underline' | 'box' | 'outlined' | 'ghost';

/** Column layout for a form section. */
export type FormLayout = 'single' | 'two-column' | 'three-column';

/** Label position relative to the field. */
export type FormLabelPosition = 'above' | 'left';

/** A single fillable field definition. */
export interface PdfFormField {
  /** Field label shown above or beside the blank area. */
  label: string;
  /**
   * Hint text shown inside the blank area (lighter, smaller).
   * Use this for format hints like "DD/MM/YYYY" or "e.g. John Smith".
   * If omitted, the field area is completely blank.
   */
  hint?: string;
  /**
   * Height of the blank field area in points.
   * @default 18 (single-line) — use larger values for multi-line fields
   */
  height?: number;
  /** Optional flex or fixed width. Useful in multi-column grids. */
  width?: number | string;
}

/** A logical group of fields with an optional section title. */
export interface PdfFormGroup {
  /** Optional group heading rendered above the fields. */
  title?: string;
  /** Fields in this group. */
  fields: PdfFormField[];
  /** Column layout for this group's fields. @default 'single' */
  layout?: FormLayout;
}

/** Props for the PdfForm component. */
export interface PdfFormProps {
  /** Form-level title (e.g. "Application Form", "Service Request"). */
  title?: string;
  /** Optional subtitle shown below the title. */
  subtitle?: string;
  /** Ordered list of field groups. */
  groups: PdfFormGroup[];
  /**
   * Visual style of the blank field areas.
   * - `underline` — classic bottom-border only (default, most print-friendly)
   * - `box`       — full rectangle outline (clearer for dense forms)
   * - `outlined`  — rounded rectangle outline
   * - `ghost`     — very light filled rectangle, no border
   */
  variant?: PdfFormVariant;
  /** Label position: above the field or to its left. @default 'above' */
  labelPosition?: FormLabelPosition;
  /** Prevent the form from splitting across pages. @default false */
  noWrap?: boolean;
  /** Custom @react-pdf/renderer styles applied to the root container. */
  style?: Style;
}
