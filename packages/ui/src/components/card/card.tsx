import type { PdfxTheme } from '@pdfx/shared';
import { Text as PDFText, StyleSheet, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import type { ReactNode } from 'react';
import { theme as defaultTheme } from '../../lib/pdfx-theme';

export type CardVariant = 'default' | 'bordered' | 'muted';

export interface PdfCardProps {
  /** Optional title displayed at the top of the card with a separator line. */
  title?: string;
  /** Card body content. */
  children?: ReactNode;
  /** Visual style of the card. @default 'default' */
  variant?: CardVariant;
  /** Internal padding size. @default 'md' */
  padding?: 'sm' | 'md' | 'lg';
  /** Custom style override. */
  style?: Style;
}

// ─── Style cache ──────────────────────────────────────────────────────────────

let cachedTheme: PdfxTheme | null = null;
let cachedStyles: ReturnType<typeof createCardStyles> | null = null;

function getStyles(t: PdfxTheme) {
  if (cachedTheme !== t || !cachedStyles) {
    cachedStyles = createCardStyles(t);
    cachedTheme = t;
  }
  return cachedStyles;
}

function createCardStyles(t: PdfxTheme) {
  const { spacing, borderRadius, fontWeights } = t.primitives;
  const borderColor = t.colors.border;

  return StyleSheet.create({
    card: {
      borderWidth: 1,
      borderColor: borderColor,
      borderStyle: 'solid',
      borderRadius: borderRadius.sm,
      backgroundColor: t.colors.background,
      marginBottom: t.spacing.componentGap,
    },
    cardBordered: {
      borderWidth: 2,
    },
    cardMuted: {
      backgroundColor: t.colors.muted,
    },
    paddingSm: {
      padding: spacing[2],
    },
    paddingMd: {
      padding: spacing[3],
    },
    paddingLg: {
      padding: spacing[4],
    },
    title: {
      fontFamily: t.typography.heading.fontFamily,
      fontSize: t.primitives.typography.base,
      lineHeight: t.typography.heading.lineHeight,
      color: t.colors.foreground,
      fontWeight: fontWeights.semibold,
      marginBottom: spacing[2],
      paddingBottom: spacing[1] + 2,
      borderBottomWidth: 1,
      borderBottomColor: borderColor,
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

// ─── PdfCard ──────────────────────────────────────────────────────────────────

export function PdfCard({
  title,
  children,
  variant = 'default',
  padding = 'md',
  style,
}: PdfCardProps) {
  const styles = getStyles(defaultTheme);

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
    <View style={styleArray}>
      {title ? <PDFText style={styles.title}>{title}</PDFText> : null}
      {bodyContent}
    </View>
  );
}
