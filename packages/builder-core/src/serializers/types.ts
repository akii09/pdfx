/**
 * A component instance placed on the canvas
 */
export interface PlacedComponent {
  id: string;
  schemaId: string;
  props: Record<string, unknown>;
}

/**
 * A page in the document
 */
export interface Page {
  id: string;
  components: PlacedComponent[];
}

/**
 * Paper size presets
 */
export type PaperSize = 'A4' | 'A3' | 'LETTER' | 'LEGAL' | 'TABLOID' | 'CUSTOM';

/**
 * Document configuration
 */
export interface DocumentConfig {
  paperSize: PaperSize;
  paperWidthMm?: number;
  paperHeightMm?: number;
  orientation: 'portrait' | 'landscape';
  margins: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  name?: string;
}

/**
 * Complete builder state (serializable)
 */
export interface BuilderState {
  version: string;
  config: DocumentConfig;
  pages: Page[];
  theme: ThemeState;
}

/**
 * Theme configuration state
 */
export interface ThemeState {
  preset: 'professional' | 'modern' | 'minimal' | 'custom';
  colors: Record<string, string>;
  fonts: FontConfig;
  spacingScale: number;
}

/**
 * Font configuration
 */
export interface FontConfig {
  heading: {
    family: string;
    src?: string;
  };
  body: {
    family: string;
    src?: string;
  };
  mono?: {
    family: string;
    src?: string;
  };
  baseFontSize: number;
  lineHeight: number;
}