import { View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { usePdfxTheme, useSafeMemo } from '../../lib/pdfx-theme-context';
import { createStackStyles } from './stack.styles';
import type { StackProps } from './stack.types';

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

  return (
    <View wrap={noWrap ? false : undefined} style={styleArray}>
      {children}
    </View>
  );
}
