import type { PDFComponentProps, PdfxTheme } from '@pdfx/shared';
import { Text as PDFText, StyleSheet, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { usePdfxTheme, useSafeMemo } from '../../lib/pdfx-theme-context';

export type PageNumberAlign = 'left' | 'center' | 'right';
export type PageNumberSize = 'xs' | 'sm' | 'md';

export interface PdfPageNumberProps extends Omit<PDFComponentProps, 'children'> {
  format?: string;
  align?: PageNumberAlign;
  size?: PageNumberSize;
  fixed?: boolean;
  muted?: boolean;
  children?: never;
}

function createPageNumberStyles(t: PdfxTheme) {
  const { typography, colors, primitives } = t;
  return StyleSheet.create({
    container: { width: '100%' },
    text: { fontFamily: typography.body.fontFamily },
    alignLeft: { textAlign: 'left' },
    alignCenter: { textAlign: 'center' },
    alignRight: { textAlign: 'right' },
    sizeXs: { fontSize: primitives.typography.xs },
    sizeSm: { fontSize: primitives.typography.sm },
    sizeMd: { fontSize: primitives.typography.base },
    colorForeground: { color: colors.foreground },
    colorMuted: { color: colors.mutedForeground },
  });
}

function formatPageNumber(format: string, pageNumber: number, totalPages: number): string {
  return format.replace('{page}', String(pageNumber)).replace('{total}', String(totalPages));
}

export function PdfPageNumber({
  format = 'Page {page} of {total}',
  align = 'center',
  size = 'sm',
  fixed = false,
  muted = true,
  style,
}: PdfPageNumberProps) {
  const theme = usePdfxTheme();
  const styles = useSafeMemo(() => createPageNumberStyles(theme), [theme]);
  const alignMap = {
    left: styles.alignLeft,
    center: styles.alignCenter,
    right: styles.alignRight,
  } as Record<PageNumberAlign, Style>;
  const sizeMap = { xs: styles.sizeXs, sm: styles.sizeSm, md: styles.sizeMd } as Record<
    PageNumberSize,
    Style
  >;
  const textStyles: Style[] = [
    styles.text,
    alignMap[align],
    sizeMap[size],
    muted ? styles.colorMuted : styles.colorForeground,
  ];
  if (style) textStyles.push(...[style].flat());
  return (
    <View style={styles.container} fixed={fixed}>
      <PDFText
        style={textStyles}
        render={({ pageNumber, totalPages }) => formatPageNumber(format, pageNumber, totalPages)}
      />
    </View>
  );
}
