import { View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import type { ReactNode } from 'react';

/**
 * Layout wrapper that prevents its children from splitting across PDF pages.
 * Props - `children` | `minPresenceAhead` | `style`
 * @see {@link KeepTogetherProps}
 */
export interface KeepTogetherProps {
  children?: ReactNode;
  minPresenceAhead?: number;
  style?: Style;
}

export function KeepTogether({ children, minPresenceAhead, style }: KeepTogetherProps) {
  return (
    <View wrap={false} minPresenceAhead={minPresenceAhead} style={style}>
      {children}
    </View>
  );
}
