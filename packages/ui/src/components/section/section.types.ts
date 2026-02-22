import type { PDFComponentProps } from '@pdfx/shared';

/** Vertical spacing (margin) scale around a section. */
export type SectionSpacing = 'none' | 'sm' | 'md' | 'lg' | 'xl';

/** Inner padding scale of a section. */
export type SectionPadding = 'none' | 'sm' | 'md' | 'lg';

/** Section visual style variant. */
export type SectionVariant = 'default' | 'callout' | 'highlight' | 'card';

export interface SectionProps extends PDFComponentProps {
  /** Vertical spacing (margin) around the section. Maps to theme spacing. */
  spacing?: SectionSpacing;
  /** Inner padding. Maps to theme spacing. */
  padding?: SectionPadding;
  /** Background color. Use theme token (e.g. 'muted', 'primary') or any CSS color. */
  background?: string;
  /** Add a border around the section. */
  border?: boolean;
  /** Section visual variant. 'callout' adds left accent border. 'highlight' adds muted bg. 'card' adds border + rounded. */
  variant?: SectionVariant;
  /** Accent color for callout/highlight left border. Use theme token or CSS color. Defaults to 'primary'. */
  accentColor?: string;
  /**
   * Prevent the section from splitting across page boundaries.
   * @default false — opt in for callout/highlight/card sections you want kept together.
   */
  noWrap?: boolean;
}
