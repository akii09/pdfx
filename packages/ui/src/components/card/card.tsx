import type { PdfxTheme } from '@pdfx/shared';
import { Text as PDFText, StyleSheet, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import type { ReactNode } from 'react';
import { usePdfxTheme, useSafeMemo } from '../../lib/pdfx-theme-context';

export type CardVariant = 'default' | 'bordered' | 'muted';

export interface PdfCardProps {
  title?: string;
  children?: ReactNode;
  variant?: CardVariant;
  padding?: 'sm' | 'md' | 'lg';
  wrap?: boolean;
  style?: Style;
}

function createCardStyles(t: PdfxTheme) {
  const { spacing, borderRadius, fontWeights } = t.primitives;
  return StyleSheet.create({
    card: {
      borderWidth: 1,
      borderColor: t.colors.border,
      borderStyle: 'solid',
      borderRadius: borderRadius.sm,
      backgroundColor: t.colors.background,
      marginBottom: t.spacing.componentGap,
    },
    cardBordered: { borderWidth: 2 },
    cardMuted: { backgroundColor: t.colors.muted },
    paddingSm: { padding: spacing[2] },
    paddingMd: { padding: spacing[3] },
    paddingLg: { padding: spacing[4] },
    title: {
      fontFamily: t.typography.heading.fontFamily,
      fontSize: t.primitives.typography.base,
      lineHeight: t.typography.heading.lineHeight,
      color: t.colors.foreground,
      fontWeight: fontWeights.semibold,
      marginBottom: spacing[2],
      paddingBottom: spacing[1] + 2,
      borderBottomWidth: 1,
      borderBottomColor: t.colors.border,
      borderBottomStyle: 'solid',
    },
    body: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.typography.body.fontSize,
      lineHeight: t.typography.body.lineHeight,
      color: t.colors.foreground,
    },
  });
}

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
  const paddingMap = { sm: styles.paddingSm, md: styles.paddingMd, lg: styles.paddingLg };
  const cardStyles: Style[] = [styles.card];
  if (variant === 'bordered') cardStyles.push(styles.cardBordered);
  if (variant === 'muted') cardStyles.push(styles.cardMuted);
  cardStyles.push(paddingMap[padding]);
  if (style) cardStyles.push(style);
  return (
    <View wrap={wrap} style={cardStyles}>
      {title ? <PDFText style={styles.title}>{title}</PDFText> : null}
      {typeof children === 'string' ? <PDFText style={styles.body}>{children}</PDFText> : children}
    </View>
  );
}
