import { Text as PDFText, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { usePdfxTheme, useSafeMemo } from '../../lib/pdfx-theme-context';
import { createPageNumberStyles } from './page-number.styles';
import type { PageNumberAlign, PageNumberSize, PdfPageNumberProps } from './page-number.types';

/**
 * Formats the page number string by replacing placeholders.
 * @param format - Format string with {page} and {total} placeholders
 * @param pageNumber - Current page number
 * @param totalPages - Total number of pages
 */
function formatPageNumber(format: string, pageNumber: number, totalPages: number): string {
  return format.replace('{page}', String(pageNumber)).replace('{total}', String(totalPages));
}

/**
 * PdfPageNumber — Displays page numbers with "Page X of Y" format.
 *
 * Uses react-pdf's render prop to access pageNumber and totalPages dynamically.
 * Can be placed inside PageFooter or anywhere in a Page, and supports the `fixed`
 * prop to repeat on every page.
 *
 * @example Basic usage (centered, on every page)
 * ```tsx
 * <Page>
 *   <View style={{ position: 'absolute', bottom: 20, left: 0, right: 0 }}>
 *     <PdfPageNumber fixed />
 *   </View>
 *   {content}
 * </Page>
 * ```
 *
 * @example Custom format
 * ```tsx
 * <PdfPageNumber format="{page} / {total}" align="right" />
 * ```
 *
 * @example Inside a PageFooter (recommended pattern)
 * ```tsx
 * <PageFooter variant="centered">
 *   <PdfPageNumber format="- {page} -" />
 * </PageFooter>
 * ```
 */
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

  const alignMap: Record<PageNumberAlign, Style> = {
    left: styles.alignLeft,
    center: styles.alignCenter,
    right: styles.alignRight,
  };

  const sizeMap: Record<PageNumberSize, Style> = {
    xs: styles.sizeXs,
    sm: styles.sizeSm,
    md: styles.sizeMd,
  };

  const textStyles: Style[] = [
    styles.text,
    alignMap[align],
    sizeMap[size],
    muted ? styles.colorMuted : styles.colorForeground,
  ];

  if (style) {
    textStyles.push(style);
  }

  return (
    <View style={styles.container} fixed={fixed}>
      <PDFText
        style={textStyles}
        render={({ pageNumber, totalPages }) => formatPageNumber(format, pageNumber, totalPages)}
      />
    </View>
  );
}
