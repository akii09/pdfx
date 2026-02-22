import { View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import type { ReactNode } from 'react';

export interface KeepTogetherProps {
  /**
   * Content to keep on the same page.
   * The outer View is rendered with wrap={false} so the engine treats this subtree as atomic.
   * If the content is taller than one full page it will overflow (not split), so only use
   * this for content that is guaranteed to fit on a single page.
   */
  children?: ReactNode;
  /**
   * If provided, moves the entire block to the next page when fewer than
   * this many PDF points remain on the current page.
   * Useful as a softer alternative to wrap={false} for headings/labels with following content.
   */
  minPresenceAhead?: number;
  /** Custom style override applied to the wrapping View. */
  style?: Style;
}

/**
 * KeepTogether — prevents its children from being split across page boundaries.
 *
 * Wraps children in a `<View wrap={false}>` which tells react-pdf's layout engine
 * to treat the entire subtree as atomic: either the whole block fits on the current
 * page, or the whole block moves to the next page.
 *
 * @example
 * // Prevent a heading + table from being separated
 * <KeepTogether>
 *   <Heading level={2}>Quarterly Financials</Heading>
 *   <Table>...</Table>
 * </KeepTogether>
 *
 * @example
 * // Softer version: move to next page only if < 100pt remain
 * <KeepTogether minPresenceAhead={100}>
 *   <Heading level={3}>Summary</Heading>
 *   <Text>Short paragraph that should stay with its heading.</Text>
 * </KeepTogether>
 */
export function KeepTogether({ children, minPresenceAhead, style }: KeepTogetherProps) {
  return (
    <View wrap={false} minPresenceAhead={minPresenceAhead} style={style}>
      {children}
    </View>
  );
}
