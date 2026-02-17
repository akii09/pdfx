import type { PDFComponentProps } from '@pdfx/shared';
import type { PdfxTheme } from '@pdfx/shared';
import { StyleSheet, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { theme } from '../../lib/pdfx-theme';
import { resolveColor } from '../../lib/resolve-color.js';

/** Vertical spacing for Section. Maps to theme spacing tokens. */
export type SectionSpacing = 'none' | 'sm' | 'md' | 'lg' | 'xl';

/** Padding size for Section. */
export type SectionPadding = 'none' | 'sm' | 'md' | 'lg';

/** Section visual variant. */
export type SectionVariant = 'default' | 'callout' | 'highlight' | 'card';

/**
 * Props for the Section component.
 *
 * @example
 * ```tsx
 * <Section spacing="lg">
 *   <Heading level={2}>Chapter 1</Heading>
 *   <Text>Content...</Text>
 * </Section>
 * <Section variant="callout" accentColor="info">
 *   <Text weight="semibold">Note</Text>
 *   <Text>Important information...</Text>
 * </Section>
 * <Section variant="card">
 *   <Text>Card-style content box</Text>
 * </Section>
 * <Section variant="highlight" accentColor="warning">
 *   <Text>Warning highlight</Text>
 * </Section>
 * ```
 */
export interface SectionProps extends PDFComponentProps {
  /** Vertical spacing (margin) around the section. Maps to theme spacing. */
  spacing?: SectionSpacing;
  /** Inner padding. Maps to theme spacing. */
  padding?: SectionPadding;
  /** Background color. Use theme token (e.g. 'muted', 'primary') or any CSS color. */
  background?: string;
  /** Add a border around the section. */
  border?: boolean;
  /** Section visual variant. 'callout' adds left accent border. 'highlight' adds muted bg. 'card' adds border + rounded. */
  variant?: SectionVariant;
  /** Accent color for callout/highlight left border. Use theme token or CSS color. Defaults to 'primary'. */
  accentColor?: string;
}

/** Creates section styles from theme tokens. Zero hardcoded values. */
function createSectionStyles(t: PdfxTheme) {
  const { spacing, borderRadius } = t.primitives;
  return StyleSheet.create({
    base: {
      display: 'flex',
      flexDirection: 'column',
    },
    // Spacing (margin)
    spacingNone: { marginVertical: spacing[0] },
    spacingSm: { marginVertical: spacing[4] },
    spacingMd: { marginVertical: t.spacing.sectionGap },
    spacingLg: { marginVertical: spacing[8] },
    spacingXl: { marginVertical: spacing[12] },
    // Padding
    paddingNone: { padding: spacing[0] },
    paddingSm: { padding: spacing[3] },
    paddingMd: { padding: spacing[4] },
    paddingLg: { padding: spacing[6] },
    // Border
    border: {
      borderWidth: spacing[0.5],
      borderColor: t.colors.border,
      borderStyle: 'solid',
      borderRadius: borderRadius.md,
    },
    // ─── Variant: Callout ──────────────────────────────────────────────
    // Left accent border with padding — like a blockquote or note callout
    callout: {
      borderLeftWidth: spacing[1],
      borderLeftColor: t.colors.primary,
      borderLeftStyle: 'solid',
      paddingLeft: spacing[4],
      paddingVertical: spacing[2],
    },
    // ─── Variant: Highlight ────────────────────────────────────────────
    // Muted background with left accent — attention-drawing panel
    highlight: {
      backgroundColor: t.colors.muted,
      borderLeftWidth: spacing[1],
      borderLeftColor: t.colors.primary,
      borderLeftStyle: 'solid',
      padding: spacing[4],
      borderRadius: borderRadius.sm,
    },
    // ─── Variant: Card ─────────────────────────────────────────────────
    // Bordered rounded box — clean card-like container
    card: {
      borderWidth: spacing[0.5],
      borderColor: t.colors.border,
      borderStyle: 'solid',
      borderRadius: borderRadius.md,
      padding: spacing[4],
    },
  });
}

const styles = createSectionStyles(theme);

const spacingMap = {
  none: styles.spacingNone,
  sm: styles.spacingSm,
  md: styles.spacingMd,
  lg: styles.spacingLg,
  xl: styles.spacingXl,
} as const;

const paddingMap = {
  none: styles.paddingNone,
  sm: styles.paddingSm,
  md: styles.paddingMd,
  lg: styles.paddingLg,
} as const;

const variantMap = {
  default: null,
  callout: styles.callout,
  highlight: styles.highlight,
  card: styles.card,
} as const;

/**
 * PDF layout component — logical section with theme-based vertical spacing.
 * Supports background colors, padding, borders, and semantic variants
 * for highlighted content areas, callouts, and cards.
 *
 * @example
 * ```tsx
 * <Section spacing="lg">
 *   <Heading level={2}>Introduction</Heading>
 *   <Text>This is the intro...</Text>
 * </Section>
 * <Section variant="callout" accentColor="info">
 *   <Text weight="semibold">Note</Text>
 *   <Text>This is an informational callout.</Text>
 * </Section>
 * <Section variant="highlight" accentColor="warning">
 *   <Text weight="semibold">Warning</Text>
 *   <Text>Please review before proceeding.</Text>
 * </Section>
 * <Section variant="card">
 *   <Heading level={3} noMargin>Summary</Heading>
 *   <Text>A clean bordered card container.</Text>
 * </Section>
 * <Section background="muted" padding="md" border>
 *   <Text>Custom styled section</Text>
 * </Section>
 * ```
 */
export function Section({
  spacing = 'md',
  padding,
  background,
  border,
  variant = 'default',
  accentColor,
  children,
  style,
}: SectionProps) {
  const spacingStyle = spacingMap[spacing];
  const styleArray: Style[] = [styles.base, spacingStyle];

  // Apply variant styles
  const variantStyle = variantMap[variant];
  if (variantStyle) {
    styleArray.push(variantStyle);
  }

  // Apply accent color override for callout/highlight variants
  if (accentColor && (variant === 'callout' || variant === 'highlight')) {
    styleArray.push({
      borderLeftColor: resolveColor(accentColor, theme.colors),
    });
  }

  // Apply padding (overrides variant padding if set)
  if (padding && padding in paddingMap) {
    styleArray.push(paddingMap[padding]);
  }

  // Apply border (for default variant or as an override)
  if (border && variant === 'default') {
    styleArray.push(styles.border);
  }

  // Apply background color (overrides variant background if set)
  if (background) {
    styleArray.push({ backgroundColor: resolveColor(background, theme.colors) });
  }

  // Apply custom style last
  if (style) {
    styleArray.push(style);
  }

  return <View style={styleArray}>{children}</View>;
}
