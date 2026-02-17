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

/**
 * Props for the Section component.
 *
 * @example
 * ```tsx
 * <Section spacing="lg">
 *   <Heading level={2}>Chapter 1</Heading>
 *   <Text>Content...</Text>
 * </Section>
 * <Section background="muted" padding="md" border>
 *   <Text>Highlighted content</Text>
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

/**
 * PDF layout component — logical section with theme-based vertical spacing.
 * Supports background colors, padding, and borders for highlighted content areas.
 *
 * @example
 * ```tsx
 * <Section spacing="lg">
 *   <Heading level={2}>Introduction</Heading>
 *   <Text>This is the intro...</Text>
 * </Section>
 * <Section spacing="md" background="muted" padding="md">
 *   <Heading level={3}>Note</Heading>
 *   <Text>Important information...</Text>
 * </Section>
 * <Section border padding="md">
 *   <Text>Bordered content box</Text>
 * </Section>
 * ```
 */
export function Section({
  spacing = 'md',
  padding,
  background,
  border,
  children,
  style,
}: SectionProps) {
  const spacingStyle = spacingMap[spacing];
  const styleArray: Style[] = [styles.base, spacingStyle];

  // Apply padding
  if (padding && padding in paddingMap) {
    styleArray.push(paddingMap[padding]);
  }

  // Apply border
  if (border) {
    styleArray.push(styles.border);
  }

  // Apply background color
  if (background) {
    styleArray.push({ backgroundColor: resolveColor(background, theme.colors) });
  }

  // Apply custom style last
  if (style) {
    styleArray.push(style);
  }

  return <View style={styleArray}>{children}</View>;
}
