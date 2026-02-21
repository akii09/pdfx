import { Text } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { usePdfxTheme, useSafeMemo } from '../../lib/pdfx-theme-context';
import { resolveColor } from '../../lib/resolve-color.js';
import { createHeadingStyles } from './heading.styles';
import type { HeadingProps } from './heading.types';

export function Heading({
  level = 1,
  align,
  color,
  transform,
  weight,
  tracking,
  noMargin,
  keepWithNext = true,
  children,
  style,
}: HeadingProps) {
  const theme = usePdfxTheme();
  const styles = useSafeMemo(() => createHeadingStyles(theme), [theme]);
  const weightMap = {
    normal: styles.weightNormal,
    medium: styles.weightMedium,
    semibold: styles.weightSemibold,
    bold: styles.weightBold,
  };
  const trackingMap = {
    tighter: styles.trackingTighter,
    tight: styles.trackingTight,
    normal: styles.trackingNormal,
    wide: styles.trackingWide,
    wider: styles.trackingWider,
  };
  const headingStyle = styles[`h${level}` as keyof typeof styles];
  const styleArray: Style[] = [headingStyle as Style];

  if (weight && weight in weightMap) {
    styleArray.push(weightMap[weight]);
  }

  if (tracking && tracking in trackingMap) {
    styleArray.push(trackingMap[tracking]);
  }

  if (transform) {
    if (transform === 'uppercase') {
      styleArray.push(styles.uppercase);
    } else if (transform === 'lowercase') {
      styleArray.push(styles.lowercase);
    } else if (transform === 'capitalize') {
      styleArray.push(styles.capitalize);
    }
  }

  if (noMargin) {
    styleArray.push(styles.noMargin);
  }

  const semanticStyle = {} as Style;
  if (align) semanticStyle.textAlign = align;
  if (color) semanticStyle.color = resolveColor(color, theme.colors);
  if (Object.keys(semanticStyle).length > 0) {
    styleArray.push(semanticStyle);
  }

  if (style) {
    styleArray.push(style);
  }

  // minPresenceAhead keeps the heading from being stranded at the bottom of a page
  return (
    <Text style={styleArray} minPresenceAhead={keepWithNext ? 80 : undefined}>
      {children}
    </Text>
  );
}
