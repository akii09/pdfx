import { Text as PDFText, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { usePdfxTheme, useSafeMemo } from '../../lib/pdfx-theme-context';
import { createCardStyles } from './card.styles';
import type { PdfCardProps } from './card.types';

// ─── PdfCard ──────────────────────────────────────────────────────────────────

export function PdfCard({
  title,
  children,
  variant = 'default',
  padding = 'md',
  wrap = false,
  style,
}: PdfCardProps) {
  const theme = usePdfxTheme();
  const styles = useSafeMemo(() => createCardStyles(theme), [theme]);

  const cardStyles: Style[] = [styles.card];
  if (variant === 'bordered') cardStyles.push(styles.cardBordered);
  if (variant === 'muted') cardStyles.push(styles.cardMuted);

  const paddingStyle =
    padding === 'sm' ? styles.paddingSm : padding === 'lg' ? styles.paddingLg : styles.paddingMd;
  cardStyles.push(paddingStyle);

  const styleArray = style ? [...cardStyles, style] : cardStyles;

  const bodyContent =
    typeof children === 'string' ? <PDFText style={styles.body}>{children}</PDFText> : children;

  return (
    <View wrap={wrap} style={styleArray}>
      {title ? <PDFText style={styles.title}>{title}</PDFText> : null}
      {bodyContent}
    </View>
  );
}
