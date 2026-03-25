import type { PDFComponentProps, PdfxTheme } from '@pdfx/shared';
import { StyleSheet, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { usePdfxTheme, useSafeMemo } from '../../lib/pdfx-theme-context';

export type StackGap = 'none' | 'sm' | 'md' | 'lg' | 'xl';
export type StackDirection = 'vertical' | 'horizontal';
export type StackAlign = 'start' | 'center' | 'end' | 'stretch';
export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around';

export interface StackProps extends PDFComponentProps {
  /** Space between child elements. @default 'md' */
  gap?: StackGap;
  /** Layout direction. @default 'vertical' */
  direction?: StackDirection;
  /** Cross-axis alignment (align-items). @default 'start' */
  align?: StackAlign;
  /** Main-axis distribution (justify-content). @default 'start' */
  justify?: StackJustify;
  /** Allow children to wrap onto multiple lines when the container is full. @default false */
  wrap?: boolean;
  /**
   * Prevent the stack from splitting across PDF pages.
   * Use for short groups that should always stay on one page.
   * @default false
   */
  noWrap?: boolean;
}

function createStackStyles(t: PdfxTheme) {
  const { spacing } = t.primitives;
  return StyleSheet.create({
    vertical: { flexDirection: 'column' },
    horizontal: { flexDirection: 'row' },
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

export function Stack({
  gap = 'md',
  direction = 'vertical',
  align,
  justify,
  wrap,
  noWrap,
  children,
  style,
}: StackProps) {
  const theme = usePdfxTheme();
  const styles = useSafeMemo(() => createStackStyles(theme), [theme]);
  const gapMap = {
    none: styles.gapNone,
    sm: styles.gapSm,
    md: styles.gapMd,
    lg: styles.gapLg,
    xl: styles.gapXl,
  };
  const alignMap = {
    start: styles.alignStart,
    center: styles.alignCenter,
    end: styles.alignEnd,
    stretch: styles.alignStretch,
  };
  const justifyMap = {
    start: styles.justifyStart,
    center: styles.justifyCenter,
    end: styles.justifyEnd,
    between: styles.justifyBetween,
    around: styles.justifyAround,
  };
  const styleArray: Style[] = [
    direction === 'horizontal' ? styles.horizontal : styles.vertical,
    gapMap[gap],
  ];
  if (align && align in alignMap) styleArray.push(alignMap[align]);
  if (justify && justify in justifyMap) styleArray.push(justifyMap[justify]);
  if (wrap) styleArray.push(styles.wrap);
  if (style) styleArray.push(...[style].flat());
  return (
    <View wrap={noWrap ? false : undefined} style={styleArray}>
      {children}
    </View>
  );
}
