import type { PDFComponentProps } from '@pdfx/shared';
import type { PdfxTheme } from '@pdfx/shared';
import { Text as PDFText, StyleSheet, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { theme } from '../../lib/pdfx-theme';
import { resolveColor } from '../../lib/resolve-color.js';

/**
 * PageHeader layout variant.
 *
 * - `simple`   — Left: title/subtitle. Right: optional logo area or metadata.
 * - `centered` — All content centered (good for formal documents, certificates).
 * - `minimal`  — Just a bottom border with title. No background.
 * - `branded`  — Solid primary-color background with white text (strong brand presence).
 */
export type PageHeaderVariant = 'simple' | 'centered' | 'minimal' | 'branded';

export interface PageHeaderProps extends Omit<PDFComponentProps, 'children'> {
  /**
   * Main heading / document title displayed in the header.
   */
  title: string;
  /**
   * Optional subtitle or organization name below the title.
   */
  subtitle?: string;
  /**
   * Text displayed on the right side of the header (e.g., date, invoice number, reference).
   * Ignored in `centered` and `branded` variants (single-column layout).
   */
  rightText?: string;
  /**
   * Secondary right text shown below rightText (e.g., "Due: 2026-02-28").
   */
  rightSubText?: string;
  /**
   * Visual layout variant. Defaults to 'simple'.
   */
  variant?: PageHeaderVariant;
  /**
   * Custom background color for the header band.
   * Use theme token (e.g. 'primary', 'muted') or a CSS color.
   * Only applies to 'simple' and 'centered' variants (branded uses primary by default).
   */
  background?: string;
  /**
   * Custom text color for the title.
   * Use theme token or CSS color. Overrides the variant default.
   */
  titleColor?: string;
  /**
   * Bottom margin below the header before document content begins.
   * Defaults to theme.spacing.sectionGap.
   */
  marginBottom?: number;
}

function createPageHeaderStyles(t: PdfxTheme) {
  const { spacing, borderRadius, fontWeights } = t.primitives;
  const c = t.colors;
  const { heading, body } = t.typography;

  return StyleSheet.create({
    // ── Simple variant ──────────────────────────────────────────────────
    simpleContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      paddingBottom: spacing[4],
      borderBottomWidth: spacing[0.5],
      borderBottomColor: c.border,
      borderBottomStyle: 'solid',
    },
    simpleLeft: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
    },
    simpleRight: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
    },

    // ── Centered variant ────────────────────────────────────────────────
    centeredContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingBottom: spacing[4],
      borderBottomWidth: spacing[0.5],
      borderBottomColor: c.border,
      borderBottomStyle: 'solid',
    },

    // ── Minimal variant ─────────────────────────────────────────────────
    minimalContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomWidth: spacing[1],
      borderBottomColor: c.primary,
      borderBottomStyle: 'solid',
      paddingBottom: spacing[3],
    },
    minimalLeft: {
      flex: 1,
    },
    minimalRight: {
      alignItems: 'flex-end',
    },

    // ── Branded variant ─────────────────────────────────────────────────
    brandedContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: c.primary,
      padding: spacing[6],
      borderRadius: borderRadius.sm,
    },

    // ── Typography ──────────────────────────────────────────────────────
    title: {
      fontFamily: heading.fontFamily,
      fontSize: heading.fontSize.h2,
      fontWeight: fontWeights.bold,
      color: c.foreground,
      lineHeight: heading.lineHeight,
      marginBottom: 0,
    },
    titleCentered: {
      textAlign: 'center',
    },
    titleBranded: {
      color: c.primaryForeground,
    },
    titleMinimal: {
      fontSize: heading.fontSize.h3,
      fontWeight: fontWeights.bold,
    },

    subtitle: {
      fontFamily: body.fontFamily,
      fontSize: body.fontSize,
      color: c.mutedForeground,
      marginTop: spacing[1],
      lineHeight: body.lineHeight,
    },
    subtitleCentered: {
      textAlign: 'center',
    },
    subtitleBranded: {
      color: c.primaryForeground,
      marginTop: spacing[1],
    },

    rightText: {
      fontFamily: body.fontFamily,
      fontSize: body.fontSize,
      color: c.foreground,
      fontWeight: fontWeights.medium,
      textAlign: 'right',
    },
    rightSubText: {
      fontFamily: body.fontFamily,
      fontSize: t.primitives.typography.xs,
      color: c.mutedForeground,
      textAlign: 'right',
      marginTop: spacing[1],
    },
  });
}

const styles = createPageHeaderStyles(theme);

export function PageHeader({
  title,
  subtitle,
  rightText,
  rightSubText,
  variant = 'simple',
  background,
  titleColor,
  marginBottom,
  style,
}: PageHeaderProps) {
  const mb = marginBottom ?? theme.spacing.sectionGap;

  // ── Branded ─────────────────────────────────────────────────────────
  if (variant === 'branded') {
    const containerStyles: Style[] = [styles.brandedContainer, { marginBottom: mb }];
    if (background) {
      containerStyles.push({ backgroundColor: resolveColor(background, theme.colors) });
    }
    if (style) containerStyles.push(style);

    const titleStyles: Style[] = [styles.title, styles.titleBranded, styles.titleCentered];
    if (titleColor) titleStyles.push({ color: resolveColor(titleColor, theme.colors) });

    return (
      <View style={containerStyles}>
        <PDFText style={titleStyles}>{title}</PDFText>
        {subtitle && (
          <PDFText style={[styles.subtitle, styles.subtitleBranded]}>{subtitle}</PDFText>
        )}
      </View>
    );
  }

  // ── Centered ────────────────────────────────────────────────────────
  if (variant === 'centered') {
    const containerStyles: Style[] = [styles.centeredContainer, { marginBottom: mb }];
    if (background) {
      containerStyles.push({ backgroundColor: resolveColor(background, theme.colors) });
    }
    if (style) containerStyles.push(style);

    const titleStyles: Style[] = [styles.title, styles.titleCentered];
    if (titleColor) titleStyles.push({ color: resolveColor(titleColor, theme.colors) });

    return (
      <View style={containerStyles}>
        <PDFText style={titleStyles}>{title}</PDFText>
        {subtitle && (
          <PDFText style={[styles.subtitle, styles.subtitleCentered]}>{subtitle}</PDFText>
        )}
      </View>
    );
  }

  // ── Minimal ─────────────────────────────────────────────────────────
  if (variant === 'minimal') {
    const containerStyles: Style[] = [styles.minimalContainer, { marginBottom: mb }];
    if (background) {
      containerStyles.push({ backgroundColor: resolveColor(background, theme.colors) });
    }
    if (style) containerStyles.push(style);

    const titleStyles: Style[] = [styles.title, styles.titleMinimal];
    if (titleColor) titleStyles.push({ color: resolveColor(titleColor, theme.colors) });

    return (
      <View style={containerStyles}>
        <View style={styles.minimalLeft}>
          <PDFText style={titleStyles}>{title}</PDFText>
          {subtitle && <PDFText style={styles.subtitle}>{subtitle}</PDFText>}
        </View>
        {(rightText || rightSubText) && (
          <View style={styles.minimalRight}>
            {rightText && <PDFText style={styles.rightText}>{rightText}</PDFText>}
            {rightSubText && <PDFText style={styles.rightSubText}>{rightSubText}</PDFText>}
          </View>
        )}
      </View>
    );
  }

  // ── Simple (default) ────────────────────────────────────────────────
  const containerStyles: Style[] = [styles.simpleContainer, { marginBottom: mb }];
  if (background) {
    containerStyles.push({ backgroundColor: resolveColor(background, theme.colors) });
  }
  if (style) containerStyles.push(style);

  const titleStyles: Style[] = [styles.title];
  if (titleColor) titleStyles.push({ color: resolveColor(titleColor, theme.colors) });

  return (
    <View style={containerStyles}>
      <View style={styles.simpleLeft}>
        <PDFText style={titleStyles}>{title}</PDFText>
        {subtitle && <PDFText style={styles.subtitle}>{subtitle}</PDFText>}
      </View>
      {(rightText || rightSubText) && (
        <View style={styles.simpleRight}>
          {rightText && <PDFText style={styles.rightText}>{rightText}</PDFText>}
          {rightSubText && <PDFText style={styles.rightSubText}>{rightSubText}</PDFText>}
        </View>
      )}
    </View>
  );
}
