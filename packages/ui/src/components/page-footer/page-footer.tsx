import type { PDFComponentProps } from '@pdfx/shared';
import type { PdfxTheme } from '@pdfx/shared';
import { Text as PDFText, StyleSheet, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { theme } from '../../lib/pdfx-theme';
import { resolveColor } from '../../lib/resolve-color.js';

/**
 * PageFooter layout variant.
 *
 * - `simple`       — Left: copyright/company text. Right: page number or custom text.
 * - `centered`     — All content centered (good for certificates, formal docs).
 * - `branded`      — Solid primary-color band with white text.
 * - `minimal`      — Just a top border with subtle muted text.
 * - `three-column` — Left: company name. Center: contact info. Right: page number.
 */
export type PageFooterVariant =
  | 'simple'
  | 'centered'
  | 'branded'
  | 'minimal'
  | 'three-column'
  | 'detailed';

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
  /**
   * Company address for three-column variant.
   * Displayed in center column with phone and email.
   */
  address?: string;
  /**
   * Phone number for three-column variant.
   * Displayed in center column with address and email.
   */
  phone?: string;
  /**
   * Email address for three-column variant.
   * Displayed in center column with address and phone.
   */
  email?: string;
  /**
   * Website URL for three-column variant.
   * Displayed in center column with other contact info.
   */
  website?: string;
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

    // ── Three-column variant ──────────────────────────────────────────
    threeColumnContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      paddingTop: spacing[3],
      borderTopWidth: spacing[0.5],
      borderTopColor: c.border,
      borderTopStyle: 'solid',
    },
    threeColumnLeft: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
    },
    threeColumnCenter: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flex: 1,
    },
    threeColumnRight: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      flex: 1,
    },
    companyName: {
      ...textBase,
      fontWeight: fontWeights.medium,
      color: c.foreground,
    },
    contactInfoCenter: {
      ...textBase,
      textAlign: 'center',
      fontSize: t.primitives.typography.xs - 1,
      marginTop: spacing[0.5],
    },

    // ── Detailed variant ──────────────────────────────────────────────
    detailedContainer: {
      display: 'flex',
      flexDirection: 'column',
      paddingTop: spacing[3],
      borderTopWidth: spacing[1],
      borderTopColor: c.border,
      borderTopStyle: 'solid',
    },
    detailedTopRow: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: spacing[2],
    },
    detailedLeft: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
    },
    detailedRight: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
    companyBold: {
      ...textBase,
      fontWeight: fontWeights.bold,
      color: c.foreground,
    },
    detailedPageNumber: {
      ...textBase,
      textAlign: 'center',
      paddingTop: spacing[2],
      borderTopWidth: spacing[0.5],
      borderTopColor: c.border,
      borderTopStyle: 'solid',
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
  address,
  phone,
  email,
  website,
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

  // ── Three-column ────────────────────────────────────────────────────
  if (variant === 'three-column') {
    const containerStyles: Style[] = [styles.threeColumnContainer, { marginTop: mt }];
    if (background) {
      containerStyles.push({ backgroundColor: resolveColor(background, theme.colors) });
    }
    if (style) containerStyles.push(style);

    const leftStyle: Style[] = [styles.companyName];
    const centerStyle: Style[] = [styles.contactInfoCenter];
    const rightStyle: Style[] = [styles.textRight];
    if (resolvedTextColor) {
      leftStyle.push({ color: resolvedTextColor });
      centerStyle.push({ color: resolvedTextColor });
      rightStyle.push({ color: resolvedTextColor });
    }

    return (
      <View style={containerStyles}>
        <View style={styles.threeColumnLeft}>
          {leftText && <PDFText style={leftStyle}>{leftText}</PDFText>}
          {address && <PDFText style={styles.textLeft}>{address}</PDFText>}
        </View>
        <View style={styles.threeColumnCenter}>
          {phone && <PDFText style={centerStyle}>{phone}</PDFText>}
          {email && <PDFText style={centerStyle}>{email}</PDFText>}
          {website && <PDFText style={centerStyle}>{website}</PDFText>}
        </View>
        <View style={styles.threeColumnRight}>
          {rightText && <PDFText style={rightStyle}>{rightText}</PDFText>}
        </View>
      </View>
    );
  }

  // ── Detailed ─────────────────────────────────────────────────────────
  if (variant === 'detailed') {
    const containerStyles: Style[] = [styles.detailedContainer, { marginTop: mt }];
    if (background) {
      containerStyles.push({ backgroundColor: resolveColor(background, theme.colors) });
    }
    if (style) containerStyles.push(style);

    const companyStyle: Style[] = [styles.companyBold];
    const addrStyle: Style[] = [styles.textLeft];
    const contactStyle: Style[] = [styles.textRight];
    const pageNumStyle: Style[] = [styles.detailedPageNumber];
    if (resolvedTextColor) {
      companyStyle.push({ color: resolvedTextColor });
      addrStyle.push({ color: resolvedTextColor });
      contactStyle.push({ color: resolvedTextColor });
      pageNumStyle.push({ color: resolvedTextColor });
    }

    return (
      <View style={containerStyles}>
        <View style={styles.detailedTopRow}>
          <View style={styles.detailedLeft}>
            {leftText && <PDFText style={companyStyle}>{leftText}</PDFText>}
            {address && <PDFText style={addrStyle}>{address}</PDFText>}
          </View>
          <View style={styles.detailedRight}>
            {phone && <PDFText style={contactStyle}>{`Phone: ${phone}`}</PDFText>}
            {email && <PDFText style={contactStyle}>{`Email: ${email}`}</PDFText>}
            {website && <PDFText style={contactStyle}>{`Web: ${website}`}</PDFText>}
          </View>
        </View>
        {rightText && <PDFText style={pageNumStyle}>{rightText}</PDFText>}
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
