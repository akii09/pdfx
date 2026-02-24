import type { PDFComponentProps } from '@pdfx/shared';
import type { PdfxTheme } from '@pdfx/shared';
import { Text as PDFText, StyleSheet, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { usePdfxTheme, useSafeMemo } from '../../lib/pdfx-theme-context';
import { resolveColor } from '../../lib/resolve-color.js';

export type PageHeaderVariant =
  | 'simple'
  | 'centered'
  | 'minimal'
  | 'branded'
  | 'logo-left'
  | 'logo-right'
  | 'two-column';

export interface PageHeaderProps extends Omit<PDFComponentProps, 'children'> {
  title: string;
  subtitle?: string;
  rightText?: string;
  rightSubText?: string;
  variant?: PageHeaderVariant;
  background?: string;
  titleColor?: string;
  marginBottom?: number;
  address?: string;
  phone?: string;
  email?: string;
  /**
   * @example <Image src="/logo.png" style={{ width: 48, height: 48 }} />
   */
  logo?: React.ReactNode;

  /**
   * Fix this header to the top of the page, so it will always be visible regardless of content length. This is achieved using `position: 'fixed'` in the PDF layout.
   * @default false
   */
  fixed?: boolean;

  /**
   * Prevent the header from being split across PDF pages when placed inline. A partially-rendered header is always visually broken, so this defaults to true. Set to false only for decorative banners that can tolerate splitting.
   * @default true
   */
  noWrap?: boolean;
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
      fontSize: heading.fontSize.h3,
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

    // ── Logo-left variant ───────────────────────────────────────────────
    logoLeftContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      paddingBottom: spacing[4],
      borderBottomWidth: spacing[0.5],
      borderBottomColor: c.border,
      borderBottomStyle: 'solid',
    },
    logoContainer: {
      marginRight: spacing[4],
      width: 48,
      height: 48,
    },
    logoContent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    },

    // ── Logo-right variant ──────────────────────────────────────────────
    logoRightContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingBottom: spacing[4],
      borderBottomWidth: spacing[0.5],
      borderBottomColor: c.border,
      borderBottomStyle: 'solid',
    },
    logoRightContent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    logoRightLogoContainer: {
      marginLeft: spacing[4],
      width: 48,
      height: 48,
    },

    // ── Two-column variant ──────────────────────────────────────────────
    twoColumnContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      paddingBottom: spacing[4],
      borderBottomWidth: spacing[0.5],
      borderBottomColor: c.border,
      borderBottomStyle: 'solid',
    },
    twoColumnLeft: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
    },
    twoColumnRight: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
    contactInfo: {
      fontFamily: body.fontFamily,
      fontSize: t.primitives.typography.xs,
      color: c.mutedForeground,
      textAlign: 'right',
      marginTop: spacing[0.5],
    },
  });
}

export function PageHeader({
  title,
  subtitle,
  rightText,
  rightSubText,
  variant = 'simple',
  background,
  titleColor,
  marginBottom,
  logo,
  address,
  phone,
  email,
  fixed = false,
  noWrap = true,
  style,
}: PageHeaderProps) {
  const theme = usePdfxTheme();
  const styles = useSafeMemo(() => createPageHeaderStyles(theme), [theme]);
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
      <View wrap={!noWrap} fixed={fixed} style={containerStyles}>
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
      <View wrap={!noWrap} fixed={fixed} style={containerStyles}>
        <PDFText style={titleStyles}>{title}</PDFText>
        {subtitle && (
          <PDFText style={[styles.subtitle, styles.subtitleCentered]}>{subtitle}</PDFText>
        )}
      </View>
    );
  }

  // ── Logo-right ──────────────────────────────────────────────────────
  if (variant === 'logo-right') {
    const containerStyles: Style[] = [styles.logoRightContainer, { marginBottom: mb }];
    if (background) {
      containerStyles.push({ backgroundColor: resolveColor(background, theme.colors) });
    }
    if (style) containerStyles.push(style);

    const titleStyles: Style[] = [styles.title];
    if (titleColor) titleStyles.push({ color: resolveColor(titleColor, theme.colors) });

    return (
      <View wrap={!noWrap} fixed={fixed} style={containerStyles}>
        <View style={styles.logoRightContent}>
          <PDFText style={titleStyles}>{title}</PDFText>
          {subtitle && <PDFText style={styles.subtitle}>{subtitle}</PDFText>}
        </View>
        {logo && <View style={styles.logoRightLogoContainer}>{logo}</View>}
      </View>
    );
  }

  // ── Logo-left ───────────────────────────────────────────────────────
  if (variant === 'logo-left') {
    const containerStyles: Style[] = [styles.logoLeftContainer, { marginBottom: mb }];
    if (background) {
      containerStyles.push({ backgroundColor: resolveColor(background, theme.colors) });
    }
    if (style) containerStyles.push(style);

    const titleStyles: Style[] = [styles.title];
    if (titleColor) titleStyles.push({ color: resolveColor(titleColor, theme.colors) });

    return (
      <View wrap={!noWrap} fixed={fixed} style={containerStyles}>
        {logo && <View style={styles.logoContainer}>{logo}</View>}
        <View style={styles.logoContent}>
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

  // ── Two-column ──────────────────────────────────────────────────────
  if (variant === 'two-column') {
    const containerStyles: Style[] = [styles.twoColumnContainer, { marginBottom: mb }];
    if (background) {
      containerStyles.push({ backgroundColor: resolveColor(background, theme.colors) });
    }
    if (style) containerStyles.push(style);

    const titleStyles: Style[] = [styles.title];
    if (titleColor) titleStyles.push({ color: resolveColor(titleColor, theme.colors) });

    return (
      <View wrap={!noWrap} fixed={fixed} style={containerStyles}>
        <View style={styles.twoColumnLeft}>
          <PDFText style={titleStyles}>{title}</PDFText>
          {subtitle && <PDFText style={styles.subtitle}>{subtitle}</PDFText>}
        </View>
        {(address || phone || email) && (
          <View style={styles.twoColumnRight}>
            {address && <PDFText style={styles.contactInfo}>{address}</PDFText>}
            {phone && <PDFText style={styles.contactInfo}>{phone}</PDFText>}
            {email && <PDFText style={styles.contactInfo}>{email}</PDFText>}
          </View>
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
      <View wrap={!noWrap} fixed={fixed} style={containerStyles}>
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
    <View wrap={!noWrap} fixed={fixed} style={containerStyles}>
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
