import type { PDFComponentProps } from '@pdfx/shared';
import type { PdfxTheme } from '@pdfx/shared';
import { StyleSheet, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { theme } from '../../lib/pdfx-theme';

/** Gap size for Stack children. Maps to theme spacing scale. */
export type StackGap = 'none' | 'sm' | 'md' | 'lg' | 'xl';

/** Direction for Stack layout. */
export type StackDirection = 'vertical' | 'horizontal';

/** Alignment for Stack cross-axis. */
export type StackAlign = 'start' | 'center' | 'end' | 'stretch';

/** Justify content for Stack main-axis. */
export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around';

/**
 * Props for the Stack component.
 *
 * @example
 * ```tsx
 * <Stack gap="md">
 *   <Text>First</Text>
 *   <Text>Second</Text>
 * </Stack>
 * <Stack direction="horizontal" gap="lg" align="center">
 *   <Text>Left</Text>
 *   <Text>Right</Text>
 * </Stack>
 * ```
 */
export interface StackProps extends PDFComponentProps {
  /** Gap between children. Maps to theme spacing scale. */
  gap?: StackGap;
  /** Layout direction. vertical = column, horizontal = row. */
  direction?: StackDirection;
  /** Cross-axis alignment (alignItems). */
  align?: StackAlign;
  /** Main-axis distribution (justifyContent). */
  justify?: StackJustify;
  /** Enable flex wrap. */
  wrap?: boolean;
}

/** Creates stack styles from theme tokens. Zero hardcoded values. */
function createStackStyles(t: PdfxTheme) {
  const { spacing } = t.primitives;
  return StyleSheet.create({
    // Direction
    vertical: { flexDirection: 'column', display: 'flex' },
    horizontal: { flexDirection: 'row', display: 'flex' },
    // Gap sizes
    gapNone: { gap: spacing[0] },
    gapSm: { gap: spacing[2] },
    gapMd: { gap: spacing[4] },
    gapLg: { gap: spacing[6] },
    gapXl: { gap: spacing[8] },
    // Alignment (cross-axis)
    alignStart: { alignItems: 'flex-start' },
    alignCenter: { alignItems: 'center' },
    alignEnd: { alignItems: 'flex-end' },
    alignStretch: { alignItems: 'stretch' },
    // Justify (main-axis)
    justifyStart: { justifyContent: 'flex-start' },
    justifyCenter: { justifyContent: 'center' },
    justifyEnd: { justifyContent: 'flex-end' },
    justifyBetween: { justifyContent: 'space-between' },
    justifyAround: { justifyContent: 'space-around' },
    // Wrap
    wrap: { flexWrap: 'wrap' },
  });
}

const styles = createStackStyles(theme);

const gapMap = {
  none: styles.gapNone,
  sm: styles.gapSm,
  md: styles.gapMd,
  lg: styles.gapLg,
  xl: styles.gapXl,
} as const;

const alignMap = {
  start: styles.alignStart,
  center: styles.alignCenter,
  end: styles.alignEnd,
  stretch: styles.alignStretch,
} as const;

const justifyMap = {
  start: styles.justifyStart,
  center: styles.justifyCenter,
  end: styles.justifyEnd,
  between: styles.justifyBetween,
  around: styles.justifyAround,
} as const;

/**
 * PDF layout component — flexible stack of children with theme-based gap.
 * Supports both vertical (column) and horizontal (row) layouts.
 *
 * @example
 * ```tsx
 * <Stack gap="md">
 *   <Heading level={2}>Section</Heading>
 *   <Text>Content</Text>
 * </Stack>
 * <Stack direction="horizontal" gap="lg" align="center" justify="between">
 *   <Text>Left</Text>
 *   <Text>Right</Text>
 * </Stack>
 * <Stack direction="horizontal" gap="sm" wrap>
 *   {items.map((i) => <Text key={i}>{i}</Text>)}
 * </Stack>
 * ```
 */
export function Stack({
  gap = 'md',
  direction = 'vertical',
  align,
  justify,
  wrap,
  children,
  style,
}: StackProps) {
  const directionStyle = direction === 'horizontal' ? styles.horizontal : styles.vertical;
  const gapStyle = gapMap[gap];
  const styleArray: Style[] = [directionStyle, gapStyle];

  // Apply alignment
  if (align && align in alignMap) {
    styleArray.push(alignMap[align]);
  }

  // Apply justify
  if (justify && justify in justifyMap) {
    styleArray.push(justifyMap[justify]);
  }

  // Apply wrap
  if (wrap) {
    styleArray.push(styles.wrap);
  }

  // Apply custom style last
  if (style) {
    styleArray.push(style);
  }

  return <View style={styleArray}>{children}</View>;
}
