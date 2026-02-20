import type { Style } from '@react-pdf/types';
import type { ReactNode } from 'react';

/**
 * Base props shared by all PDFx PDF components.
 * Every component in the library should extend this interface.
 */
export interface PDFComponentProps {
  /** Custom styles to merge with component defaults */
  style?: Style;
  /** Content to render — string or nested React PDF elements */
  children: ReactNode;
}
