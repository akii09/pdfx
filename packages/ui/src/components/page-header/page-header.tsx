import type { PDFComponentProps } from '@pdfx/shared';
import type { PdfxTheme } from '@pdfx/shared';
import { Text as PDFText, StyleSheet, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { theme } from '../../lib/pdfx-theme';
import { resolveColor } from '../../lib/resolve-color.js';

/**
 * PageHeader layout variant.
 *
 * - `simple`     — Left: title/subtitle. Right: optional logo area or metadata.
 * - `centered`   — All content centered (good for formal documents, certificates).
 * - `minimal`    — Just a bottom border with title. No background.
 * - `branded`    — Solid primary-color background with white text (strong brand presence).
 * - `logo-left`  — Logo on left, title/subtitle on right. Professional layout.
 * - `two-column` — Left: title/subtitle. Right: contact info (address, phone, email).
 */
export type PageHeaderVariant =
  | 'simple'
  | 'centered'
  | 'minimal'
  | 'branded'
  | 'logo-left'
  | 'logo-right'
  | 'two-column';

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
  /**
   * Logo element for logo-left variant.
   * Accepts any valid React PDF element (Image, View with custom content).
   * @example <Image src="/logo.png" style={{ width: 48, height: 48 }} />
   */
  logo?: React.ReactNode;
  /**
   * Company address for two-column variant.
   * Displayed in right column with phone and email.
   */
  address?: string;
  /**
   * Phone number for two-column variant.
   * Displayed in right column with address and email.
   */
  phone?: string;
  /**
   * Email address for two-column variant.
   * Displayed in right column with address and phone.
   */
  email?: string;
  /**
   * Render this header on every page of the document.
   * Uses react-pdf's built-in `fixed` prop on the outer View.
   * When true, ensure the page content has enough top padding to avoid overlapping with the fixed header.
   * @default false
   */
  fixed?: boolean;
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
  logo,
  address,
  phone,
  email,
  fixed = false,
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
      <View fixed={fixed} style={containerStyles}>
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
      <View fixed={fixed} style={containerStyles}>
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
      <View fixed={fixed} style={containerStyles}>
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
      <View fixed={fixed} style={containerStyles}>
        {logo && <View style={styles.logoContainer}>{logo}</View>}
        <View style={styles.logoContent}>
          <PDFText style={titleStyles}>{title}</PDFText>
          {subtitle && <PDFText style={styles.subtitle}>{subtitle}</PDFText>}
        </View>
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
      <View fixed={fixed} style={containerStyles}>
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
      <View fixed={fixed} style={containerStyles}>
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
    <View fixed={fixed} style={containerStyles}>
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
