import type { PDFComponentProps } from '@pdfx/shared';
import { Text as PDFText, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { usePdfxTheme, useSafeMemo } from '../../lib/pdfx-theme-context';
import { resolveColor } from '../../lib/resolve-color.js';
import { createPageHeaderStyles } from './page-header.styles';

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
