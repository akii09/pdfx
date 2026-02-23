import type { PDFComponentProps } from '@pdfx/shared';
import type { PdfxTheme } from '@pdfx/shared';
import { Text as PDFText, StyleSheet, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { usePdfxTheme, useSafeMemo } from '../../lib/pdfx-theme-context';
import { resolveColor } from '../../lib/resolve-color.js';

export type PageFooterVariant =
  | 'simple'
  | 'centered'
  | 'branded'
  | 'minimal'
  | 'three-column'
  | 'detailed';

export interface PageFooterProps extends Omit<PDFComponentProps, 'children'> {
  leftText?: string;
  rightText?: string;
  centerText?: string;
  variant?: PageFooterVariant;
  background?: string;
  textColor?: string;
  marginTop?: number;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  
  /**
   *  Fix this footer to the bottom of the page, so it will always be visible regardless of content length. This is achieved using `position: 'fixed'` in the PDF layout.
   * @default false
   */
  fixed?: boolean;

  /**
   * Render this footer at the bottom of the page, but allow it to scroll with the content if the page is long enough. This is achieved using absolute positioning with `position: 'absolute'` and `bottom: 0`.
   * @default false
   */
  sticky?: boolean;

  /**
   * When using `sticky`, this value sets the `left` and `right` offsets to match the page's horizontal padding, ensuring the footer content is aligned with the rest of the page content.
   * @default 0
   */
  pagePadding?: number;

  /**
   * Prevent the footer from being split across PDF pages when placed inline.
   * @default true
   */
  noWrap?: boolean;
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
      paddingTop: spacing[1],
      paddingBottom: spacing[1],
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
  fixed = false,
  sticky = false,
  pagePadding = 0,
  noWrap = true,
  style,
}: PageFooterProps) {
  const theme = usePdfxTheme();
  const styles = useSafeMemo(() => createPageFooterStyles(theme), [theme]);
  // sticky implies fixed; marginTop is irrelevant with absolute positioning
  const isFixed = fixed || sticky;
  const mt = sticky ? 0 : (marginTop ?? theme.spacing.sectionGap);
  const resolvedTextColor = textColor ? resolveColor(textColor, theme.colors) : undefined;
  /**
   * The sticky style is built dynamically so `pagePadding` is reflected in
   * `left`/`right`, matching the page's horizontal padding exactly.
   */
  const stickyStyle: Style = sticky
    ? { position: 'absolute', bottom: pagePadding, left: pagePadding, right: pagePadding }
    : {};

  /**
   * Appends background + custom style + sticky overrides to a container style array.
   * sticky style is always last so it wins over all other overrides.
   */
  function applyOverrides(base: Style[]): Style[] {
    if (background) base.push({ backgroundColor: resolveColor(background, theme.colors) });
    if (style) base.push(style);
    if (sticky) base.push(stickyStyle);
    return base;
  }

  // ── Branded ──────────────────────────────────────────────────────────
  if (variant === 'branded') {
    const containerStyles = applyOverrides([styles.brandedContainer, { marginTop: mt }]);

    const lStyle: Style[] = [styles.textBranded];
    const rStyle: Style[] = [styles.textBrandedRight];
    if (resolvedTextColor) {
      lStyle.push({ color: resolvedTextColor });
      rStyle.push({ color: resolvedTextColor });
    }

    return (
      <View wrap={!noWrap} fixed={isFixed} style={containerStyles}>
        {leftText && <PDFText style={lStyle}>{leftText}</PDFText>}
        {rightText && <PDFText style={rStyle}>{rightText}</PDFText>}
      </View>
    );
  }

  // ── Centered ─────────────────────────────────────────────────────────
  if (variant === 'centered') {
    const containerStyles = applyOverrides([styles.centeredContainer, { marginTop: mt }]);

    const tStyle: Style[] = [styles.textCenteredVariant];
    if (resolvedTextColor) tStyle.push({ color: resolvedTextColor });

    return (
      <View wrap={!noWrap} fixed={isFixed} style={containerStyles}>
        {leftText && <PDFText style={tStyle}>{leftText}</PDFText>}
        {rightText && <PDFText style={tStyle}>{rightText}</PDFText>}
      </View>
    );
  }

  // ── Three-column ────────────────────────────────────────────────────
  if (variant === 'three-column') {
    const containerStyles = applyOverrides([styles.threeColumnContainer, { marginTop: mt }]);

    const leftStyle: Style[] = [styles.companyName];
    const centerStyle: Style[] = [styles.contactInfoCenter];
    const rightStyle: Style[] = [styles.textRight];
    if (resolvedTextColor) {
      leftStyle.push({ color: resolvedTextColor });
      centerStyle.push({ color: resolvedTextColor });
      rightStyle.push({ color: resolvedTextColor });
    }

    return (
      <View wrap={!noWrap} fixed={isFixed} style={containerStyles}>
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
    const containerStyles = applyOverrides([styles.detailedContainer, { marginTop: mt }]);

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
      <View wrap={!noWrap} fixed={isFixed} style={containerStyles}>
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
    const containerStyles = applyOverrides([styles.minimalContainer, { marginTop: mt }]);

    const lStyle: Style[] = [styles.textLeft];
    const rStyle: Style[] = [styles.textRight];
    if (resolvedTextColor) {
      lStyle.push({ color: resolvedTextColor });
      rStyle.push({ color: resolvedTextColor });
    }

    return (
      <View wrap={!noWrap} fixed={isFixed} style={containerStyles}>
        {leftText && <PDFText style={lStyle}>{leftText}</PDFText>}
        {rightText && <PDFText style={rStyle}>{rightText}</PDFText>}
      </View>
    );
  }

  // ── Simple (default) ─────────────────────────────────────────────────
  const containerStyles = applyOverrides([styles.simpleContainer, { marginTop: mt }]);

  const lStyle: Style[] = [styles.textLeft];
  const cStyle: Style[] = [styles.textCenter];
  const rStyle: Style[] = [styles.textRight];
  if (resolvedTextColor) {
    lStyle.push({ color: resolvedTextColor });
    cStyle.push({ color: resolvedTextColor });
    rStyle.push({ color: resolvedTextColor });
  }

  return (
    <View wrap={!noWrap} fixed={isFixed} style={containerStyles}>
      {leftText && <PDFText style={lStyle}>{leftText}</PDFText>}
      {centerText && <PDFText style={cStyle}>{centerText}</PDFText>}
      {rightText && <PDFText style={rStyle}>{rightText}</PDFText>}
    </View>
  );
}
