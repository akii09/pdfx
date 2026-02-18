import type { PDFComponentProps } from '@pdfx/shared';
import type { PdfxTheme } from '@pdfx/shared';
import { Text as PDFText, StyleSheet, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { theme } from '../../lib/pdfx-theme';
import { resolveColor } from '../../lib/resolve-color.js';

/**
 * PageFooter layout variant.
 *
 * - `simple`   — Left: copyright/company text. Right: page number or custom text.
 * - `centered` — All content centered (good for certificates, formal docs).
 * - `branded`  — Solid primary-color band with white text.
 * - `minimal`  — Just a top border with subtle muted text.
 */
export type PageFooterVariant = 'simple' | 'centered' | 'branded' | 'minimal';

export interface PageFooterProps extends Omit<PDFComponentProps, 'children'> {
  /**
   * Left-aligned footer text (or center text in `centered` variant).
   * Common use: company name, copyright notice, confidentiality disclaimer.
   */
  leftText?: string;
  /**
   * Right-aligned footer text.
   * Common use: page numbers, document reference, date.
   * Ignored in `centered` variant.
   */
  rightText?: string;
  /**
   * Optional center text that appears between left and right columns.
   * Only shown in `simple` and `minimal` variants.
   */
  centerText?: string;
  /**
   * Visual layout variant. Defaults to 'simple'.
   */
  variant?: PageFooterVariant;
  /**
   * Custom background color for the footer band.
   * Use theme token (e.g. 'primary', 'muted') or a CSS color.
   * Applies to all variants. For branded, defaults to 'primary'.
   */
  background?: string;
  /**
   * Custom text color override for all footer text.
   * Use theme token or CSS color.
   */
  textColor?: string;
  /**
   * Top margin above the footer (space between content and footer).
   * Defaults to theme.spacing.sectionGap.
   */
  marginTop?: number;
}

function createPageFooterStyles(t: PdfxTheme) {
  const { spacing, fontWeights } = t.primitives;
  const c = t.colors;
  const { body } = t.typography;

  const textBase = {
    fontFamily: body.fontFamily,
    fontSize: t.primitives.typography.xs,
    color: c.mutedForeground,
    lineHeight: body.lineHeight,
  };

  return StyleSheet.create({
    // ── Simple variant ──────────────────────────────────────────────────
    simpleContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: spacing[3],
      borderTopWidth: spacing[0.5],
      borderTopColor: c.border,
      borderTopStyle: 'solid',
    },

    // ── Centered variant ────────────────────────────────────────────────
    centeredContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: spacing[3],
      borderTopWidth: spacing[0.5],
      borderTopColor: c.border,
      borderTopStyle: 'solid',
    },

    // ── Minimal variant ─────────────────────────────────────────────────
    minimalContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: spacing[2],
      borderTopWidth: spacing[0.5],
      borderTopColor: c.border,
      borderTopStyle: 'solid',
    },

    // ── Branded variant ─────────────────────────────────────────────────
    brandedContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: c.primary,
      paddingHorizontal: spacing[4],
      paddingVertical: spacing[3],
    },

    // ── Text styles ─────────────────────────────────────────────────────
    textLeft: {
      ...textBase,
      flex: 1,
    },
    textCenter: {
      ...textBase,
      textAlign: 'center',
      flex: 1,
    },
    textRight: {
      ...textBase,
      textAlign: 'right',
    },
    textCenteredVariant: {
      ...textBase,
      textAlign: 'center',
      marginBottom: spacing[1],
    },
    textBranded: {
      ...textBase,
      color: c.primaryForeground,
      fontWeight: fontWeights.medium,
    },
    textBrandedRight: {
      ...textBase,
      color: c.primaryForeground,
      textAlign: 'right',
    },
  });
}

const styles = createPageFooterStyles(theme);

export function PageFooter({
  leftText,
  rightText,
  centerText,
  variant = 'simple',
  background,
  textColor,
  marginTop,
  style,
}: PageFooterProps) {
  const mt = marginTop ?? theme.spacing.sectionGap;
  const resolvedTextColor = textColor ? resolveColor(textColor, theme.colors) : undefined;

  // ── Branded ──────────────────────────────────────────────────────────
  if (variant === 'branded') {
    const containerStyles: Style[] = [styles.brandedContainer, { marginTop: mt }];
    if (background) {
      containerStyles.push({ backgroundColor: resolveColor(background, theme.colors) });
    }
    if (style) containerStyles.push(style);

    const lStyle: Style[] = [styles.textBranded];
    const rStyle: Style[] = [styles.textBrandedRight];
    if (resolvedTextColor) {
      lStyle.push({ color: resolvedTextColor });
      rStyle.push({ color: resolvedTextColor });
    }

    return (
      <View style={containerStyles}>
        {leftText && <PDFText style={lStyle}>{leftText}</PDFText>}
        {rightText && <PDFText style={rStyle}>{rightText}</PDFText>}
      </View>
    );
  }

  // ── Centered ─────────────────────────────────────────────────────────
  if (variant === 'centered') {
    const containerStyles: Style[] = [styles.centeredContainer, { marginTop: mt }];
    if (background) {
      containerStyles.push({ backgroundColor: resolveColor(background, theme.colors) });
    }
    if (style) containerStyles.push(style);

    const tStyle: Style[] = [styles.textCenteredVariant];
    if (resolvedTextColor) tStyle.push({ color: resolvedTextColor });

    return (
      <View style={containerStyles}>
        {leftText && <PDFText style={tStyle}>{leftText}</PDFText>}
        {rightText && <PDFText style={tStyle}>{rightText}</PDFText>}
      </View>
    );
  }

  // ── Minimal ──────────────────────────────────────────────────────────
  if (variant === 'minimal') {
    const containerStyles: Style[] = [styles.minimalContainer, { marginTop: mt }];
    if (background) {
      containerStyles.push({ backgroundColor: resolveColor(background, theme.colors) });
    }
    if (style) containerStyles.push(style);

    const lStyle: Style[] = [styles.textLeft];
    const cStyle: Style[] = [styles.textCenter];
    const rStyle: Style[] = [styles.textRight];
    if (resolvedTextColor) {
      lStyle.push({ color: resolvedTextColor });
      cStyle.push({ color: resolvedTextColor });
      rStyle.push({ color: resolvedTextColor });
    }

    return (
      <View style={containerStyles}>
        {leftText && <PDFText style={lStyle}>{leftText}</PDFText>}
        {centerText && <PDFText style={cStyle}>{centerText}</PDFText>}
        {rightText && <PDFText style={rStyle}>{rightText}</PDFText>}
      </View>
    );
  }

  // ── Simple (default) ─────────────────────────────────────────────────
  const containerStyles: Style[] = [styles.simpleContainer, { marginTop: mt }];
  if (background) {
    containerStyles.push({ backgroundColor: resolveColor(background, theme.colors) });
  }
  if (style) containerStyles.push(style);

  const lStyle: Style[] = [styles.textLeft];
  const cStyle: Style[] = [styles.textCenter];
  const rStyle: Style[] = [styles.textRight];
  if (resolvedTextColor) {
    lStyle.push({ color: resolvedTextColor });
    cStyle.push({ color: resolvedTextColor });
    rStyle.push({ color: resolvedTextColor });
  }

  return (
    <View style={containerStyles}>
      {leftText && <PDFText style={lStyle}>{leftText}</PDFText>}
      {centerText && <PDFText style={cStyle}>{centerText}</PDFText>}
      {rightText && <PDFText style={rStyle}>{rightText}</PDFText>}
    </View>
  );
}
