import type { PDFComponentProps } from '@pdfx/shared';
import type { PdfxTheme } from '@pdfx/shared';
import { StyleSheet, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { theme } from '../../lib/pdfx-theme';

export type StackGap = 'none' | 'sm' | 'md' | 'lg' | 'xl';

export type StackDirection = 'vertical' | 'horizontal';

export type StackAlign = 'start' | 'center' | 'end' | 'stretch';

export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around';

export interface StackProps extends PDFComponentProps {
  /** Gap between children. Maps to theme spacing scale. */
  gap?: StackGap;
  /** Layout direction. vertical = column, horizontal = row. */
  direction?: StackDirection;
  /** Cross-axis alignment (alignItems). */
  align?: StackAlign;
  /** Main-axis distribution (justifyContent). */
  justify?: StackJustify;
  /** Enable flex wrap. */
  wrap?: boolean;
}

function createStackStyles(t: PdfxTheme) {
  const { spacing } = t.primitives;
  return StyleSheet.create({
    vertical: { flexDirection: 'column', display: 'flex' },
    horizontal: { flexDirection: 'row', display: 'flex' },
    gapNone: { gap: spacing[0] },
    gapSm: { gap: spacing[2] },
    gapMd: { gap: spacing[4] },
    gapLg: { gap: spacing[6] },
    gapXl: { gap: spacing[8] },
    alignStart: { alignItems: 'flex-start' },
    alignCenter: { alignItems: 'center' },
    alignEnd: { alignItems: 'flex-end' },
    alignStretch: { alignItems: 'stretch' },
    justifyStart: { justifyContent: 'flex-start' },
    justifyCenter: { justifyContent: 'center' },
    justifyEnd: { justifyContent: 'flex-end' },
    justifyBetween: { justifyContent: 'space-between' },
    justifyAround: { justifyContent: 'space-around' },
    wrap: { flexWrap: 'wrap' },
  });
}

const styles = createStackStyles(theme);

const gapMap = {
  none: styles.gapNone,
  sm: styles.gapSm,
  md: styles.gapMd,
  lg: styles.gapLg,
  xl: styles.gapXl,
} as const;

const alignMap = {
  start: styles.alignStart,
  center: styles.alignCenter,
  end: styles.alignEnd,
  stretch: styles.alignStretch,
} as const;

const justifyMap = {
  start: styles.justifyStart,
  center: styles.justifyCenter,
  end: styles.justifyEnd,
  between: styles.justifyBetween,
  around: styles.justifyAround,
} as const;

export function Stack({
  gap = 'md',
  direction = 'vertical',
  align,
  justify,
  wrap,
  children,
  style,
}: StackProps) {
  const directionStyle = direction === 'horizontal' ? styles.horizontal : styles.vertical;
  const gapStyle = gapMap[gap];
  const styleArray: Style[] = [directionStyle, gapStyle];

  if (align && align in alignMap) {
    styleArray.push(alignMap[align]);
  }

  if (justify && justify in justifyMap) {
    styleArray.push(justifyMap[justify]);
  }

  if (wrap) {
    styleArray.push(styles.wrap);
  }

  if (style) {
    styleArray.push(style);
  }

  return <View style={styleArray}>{children}</View>;
}
