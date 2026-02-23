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
   * Render this footer on every page of the document.
   * Uses react-pdf's built-in `fixed` prop on the outer View.
   * When true, ensure the page content has enough bottom padding to avoid overlapping with the fixed footer.
   * @default false
   */
  fixed?: boolean;
  /**
   * Anchors the footer to the absolute bottom of every PDF page.
   *
   * When `sticky` is true the footer is rendered with `position: 'absolute'`,
   * `bottom: 0`, and `fixed` is automatically enabled so it repeats on every page.
   *
   * **Important:** set `pagePadding` to match your `<Page>` horizontal padding so
   * the footer lines up with the rest of the content. Also add a matching
   * `paddingBottom` to your `<Page>` so body content does not slide under the footer.
   *
   * ```tsx
   * // ✅ Correct usage
   * <Page style={{ padding: 40, paddingBottom: 60 }}>
   *   {content}
   *   <PageFooter sticky pagePadding={40} leftText="© 2026 Acme" rightText="Page 1" />
   * </Page>
   * ```
   *
   * @default false
   */
  sticky?: boolean;
  /**
   * Horizontal inset (in points) applied to the sticky footer so it aligns with
   * the page's left/right padding.
   *
   * When `sticky` is true, this value is used as `left` and `right` offsets so
   * the footer respects the page padding instead of stretching to the raw page edges.
   * Pass the same value you use for `padding` (or `paddingHorizontal`) on `<Page>`.
   *
   * Only used when `sticky` is true. Ignored otherwise.
   *
   * @default 0
   */
  pagePadding?: number;
  /**
   * Prevent the footer from being split across PDF pages when placed inline.
   * A partially-rendered footer is always visually broken, so this defaults to true.
   * Set to false only for decorative banners that can tolerate splitting.
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
