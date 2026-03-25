import type { PDFComponentProps, PdfxTheme } from '@pdfx/shared';
import { Text as PDFText, StyleSheet, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { usePdfxTheme, useSafeMemo } from '../../lib/pdfx-theme-context';
import { resolveColor } from '../../lib/resolve-color.js';

export type WatermarkPosition =
  | 'center'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export interface PdfWatermarkProps extends Omit<PDFComponentProps, 'children'> {
  text: string;
  opacity?: number;
  fontSize?: number;
  color?: string;
  angle?: number;
  position?: WatermarkPosition;
  fixed?: boolean;
  children?: never;
}

function createWatermarkStyles(t: PdfxTheme) {
  const { fontWeights } = t.primitives;
  // Use page margins as corner insets so watermark position adapts to the active theme.
  const { marginTop, marginBottom, marginLeft, marginRight } = t.spacing.page;
  return StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: -1,
      pointerEvents: 'none',
    },
    text: {
      fontFamily: t.typography.heading.fontFamily,
      fontWeight: fontWeights.bold,
      textTransform: 'uppercase',
      letterSpacing: 4,
    },
    positionCenter: { justifyContent: 'center', alignItems: 'center' },
    positionTopLeft: {
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      paddingTop: marginTop,
      paddingLeft: marginLeft,
    },
    positionTopRight: {
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      paddingTop: marginTop,
      paddingRight: marginRight,
    },
    positionBottomLeft: {
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
      paddingBottom: marginBottom,
      paddingLeft: marginLeft,
    },
    positionBottomRight: {
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      paddingBottom: marginBottom,
      paddingRight: marginRight,
    },
  });
}

export function PdfWatermark({
  text,
  opacity = 0.15,
  fontSize = 60,
  color = 'mutedForeground',
  angle = -45,
  position = 'center',
  fixed = true,
  style,
}: PdfWatermarkProps) {
  const theme = usePdfxTheme();
  const styles = useSafeMemo(() => createWatermarkStyles(theme), [theme]);
  const positionMap: Record<WatermarkPosition, Style> = {
    center: styles.positionCenter,
    'top-left': styles.positionTopLeft,
    'top-right': styles.positionTopRight,
    'bottom-left': styles.positionBottomLeft,
    'bottom-right': styles.positionBottomRight,
  };
  const containerStyles: Style[] = [styles.container, positionMap[position]];
  if (style) containerStyles.push(...[style].flat());
  const textStyles: Style[] = [
    styles.text,
    {
      fontSize,
      color: resolveColor(color, theme.colors),
      opacity,
      transform: `rotate(${angle}deg)`,
    },
  ];
  return (
    <View style={containerStyles} fixed={fixed}>
      <PDFText style={textStyles}>{text}</PDFText>
    </View>
  );
}
