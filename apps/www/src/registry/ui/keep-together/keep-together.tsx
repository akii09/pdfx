import { View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import type { ReactNode } from 'react';

/** Props for the KeepTogether layout wrapper. */
export interface KeepTogetherProps {
  /** Content to keep together on the same PDF page. */
  children?: ReactNode;
  /**
   * Minimum space in points that must be available on the current page before
   * the group is placed. If insufficient space remains, the group moves to the next page.
   */
  minPresenceAhead?: number;
  /** Custom @react-pdf/renderer styles applied to the container view. */
  style?: Style;
}

export function KeepTogether({ children, minPresenceAhead, style }: KeepTogetherProps) {
  return (
    <View wrap={false} minPresenceAhead={minPresenceAhead} style={style}>
      {children}
    </View>
  );
}
