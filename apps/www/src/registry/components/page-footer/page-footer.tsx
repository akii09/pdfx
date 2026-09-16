import type { PDFComponentProps, PdfxTheme } from '@pdfx/shared';
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

/** Page context react-pdf resolves per rendered page. */
export interface PageFooterPageInfo {
  pageNumber: number;
  totalPages: number;
}

/**
 * Footer slot content. Pass a string for static text, or a function to resolve
 * it per page — the footer must be `fixed` or `sticky` for the function to run
 * on every page rather than only the one it lands on.
 */
export type PageFooterText = string | ((info: PageFooterPageInfo) => string);

/**
 * Footer row with layout variants, optional sticky or fixed positioning, and contact info support.
 * Props - `leftText` | `rightText` | `centerText` | `variant` | `background` | `textColor` | `marginTop` | `address` | `phone` | `email` | `website` | `fixed` | `sticky` | `pagePadding` | `noWrap` | `style`
 * @see {@link PageFooterProps}
 */
export interface PageFooterProps extends Omit<PDFComponentProps, 'children'> {
  leftText?: PageFooterText;
  rightText?: PageFooterText;
  centerText?: PageFooterText;
  /**
   * @default 'simple'
   */
  variant?: PageFooterVariant;
  background?: string;
  textColor?: string;
  marginTop?: number;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  /**
   * @default false
   */
  fixed?: boolean;
  /**
   * @default false
   */
  sticky?: boolean;
  /**
   * @default 0
   */
  pagePadding?: number;
  /**
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

    centeredContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: spacing[3],
      borderTopWidth: spacing[0.5],
      borderTopColor: c.border,
      borderTopStyle: 'solid',
    },

    minimalContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: spacing[1],
      paddingBottom: spacing[1],
    },

    brandedContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: c.primary,
      paddingHorizontal: spacing[4],
      paddingVertical: spacing[3],
    },

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

/**
 * react-pdf silently draws nothing for a <Text> that combines `lineHeight` with
 * a dynamic `render` callback — the callback still runs, but the glyphs never
 * reach the page, and a `sticky` footer collapses entirely. Drop `lineHeight`
 * on the dynamic path only; static slots keep the theme's line height. This is
 * why PdfPageNumber, which never sets one, has always rendered correctly.
 */
function withoutLineHeight(style: Style[]): Style[] {
  return style.map((entry) => {
    if (!entry || typeof entry !== 'object' || !('lineHeight' in entry)) return entry;
    const { lineHeight: _lineHeight, ...rest } = entry;
    return rest;
  });
}

/**
 * Render a footer slot. A function is handed to react-pdf's `render` prop so it
 * re-resolves on every page; a plain string renders as-is.
 */
function renderFooterText(value: PageFooterText | undefined, style: Style[]) {
  if (!value) return null;
  if (typeof value === 'function') {
    return (
      <PDFText
        style={withoutLineHeight(style)}
        render={({ pageNumber, totalPages }) => value({ pageNumber, totalPages })}
      />
    );
  }
  return <PDFText style={style}>{value}</PDFText>;
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
  const stickyStyle: Style = sticky
    ? { position: 'absolute', bottom: pagePadding, left: pagePadding, right: pagePadding }
    : {};

  function applyOverrides(base: Style[]): Style[] {
    if (background) base.push({ backgroundColor: resolveColor(background, theme.colors) });
    if (style) base.push(style);
    if (sticky) base.push(stickyStyle);
    return base;
  }

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
        {renderFooterText(leftText, lStyle)}
        {renderFooterText(rightText, rStyle)}
      </View>
    );
  }

  if (variant === 'centered') {
    const containerStyles = applyOverrides([styles.centeredContainer, { marginTop: mt }]);

    const tStyle: Style[] = [styles.textCenteredVariant];
    if (resolvedTextColor) tStyle.push({ color: resolvedTextColor });

    return (
      <View wrap={!noWrap} fixed={isFixed} style={containerStyles}>
        {renderFooterText(leftText, tStyle)}
        {renderFooterText(rightText, tStyle)}
      </View>
    );
  }

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
          {renderFooterText(leftText, leftStyle)}
          {address && <PDFText style={styles.textLeft}>{address}</PDFText>}
        </View>
        <View style={styles.threeColumnCenter}>
          {phone && <PDFText style={centerStyle}>{phone}</PDFText>}
          {email && <PDFText style={centerStyle}>{email}</PDFText>}
          {website && <PDFText style={centerStyle}>{website}</PDFText>}
        </View>
        <View style={styles.threeColumnRight}>{renderFooterText(rightText, rightStyle)}</View>
      </View>
    );
  }

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
            {renderFooterText(leftText, companyStyle)}
            {address && <PDFText style={addrStyle}>{address}</PDFText>}
          </View>
          <View style={styles.detailedRight}>
            {phone && <PDFText style={contactStyle}>{`Phone: ${phone}`}</PDFText>}
            {email && <PDFText style={contactStyle}>{`Email: ${email}`}</PDFText>}
            {website && <PDFText style={contactStyle}>{`Web: ${website}`}</PDFText>}
          </View>
        </View>
        {renderFooterText(rightText, pageNumStyle)}
      </View>
    );
  }

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
        {renderFooterText(leftText, lStyle)}
        {renderFooterText(rightText, rStyle)}
      </View>
    );
  }

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
      {renderFooterText(leftText, lStyle)}
      {renderFooterText(centerText, cStyle)}
      {renderFooterText(rightText, rStyle)}
    </View>
  );
}
