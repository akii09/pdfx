import type { PDFComponentProps, PdfxTheme } from '@pdfx/shared';
import { Circle, Line, Text as PDFText, Path, StyleSheet, Svg, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import type { ReactNode } from 'react';
import { usePdfxTheme, useSafeMemo } from '../../lib/pdfx-theme-context';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

/**
 * Props for the PdfAlert component.
 */
export interface PdfAlertProps extends Omit<PDFComponentProps, 'children'> {
  /** Alert severity — controls the left border color and icon. @default 'info' */
  variant?: AlertVariant;
  /** Bold heading text rendered above the description. */
  title?: string;
  /** Body content. A plain string is auto-wrapped in a Text node; a ReactNode is rendered as-is. */
  children?: ReactNode;
  /** Show the semantic icon on the left side. @default true */
  showIcon?: boolean;
  /** Show the left accent border. @default true */
  showBorder?: boolean;
}

/** Stroke width for all alert SVG icons (SVG user units). */
const ICON_STROKE_WIDTH = 1.5;

const SvgWrap = ({ children }: { children: ReactNode }) => (
  <Svg width={16} height={16} viewBox="0 0 16 16">
    {children}
  </Svg>
);

const ICON_MAP = {
  info: ({ color }: { color: string }) => (
    <SvgWrap>
      <Circle cx={8} cy={8} r={7} fill="none" stroke={color} strokeWidth={ICON_STROKE_WIDTH} />
      <Circle cx={8} cy={4.5} r={1} fill={color} />
      <Line
        x1={8}
        y1={7}
        x2={8}
        y2={11.5}
        stroke={color}
        strokeWidth={ICON_STROKE_WIDTH}
        strokeLinecap="round"
      />
    </SvgWrap>
  ),
  success: ({ color }: { color: string }) => (
    <SvgWrap>
      <Circle cx={8} cy={8} r={7} fill="none" stroke={color} strokeWidth={ICON_STROKE_WIDTH} />
      <Path
        d="M5 8 L7 10 L11 6"
        fill="none"
        stroke={color}
        strokeWidth={ICON_STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgWrap>
  ),
  warning: ({ color }: { color: string }) => (
    <SvgWrap>
      <Path
        d="M8 1.5 L15 14.5 L1 14.5 Z"
        fill="none"
        stroke={color}
        strokeWidth={ICON_STROKE_WIDTH}
        strokeLinejoin="round"
      />
      <Line
        x1={8}
        y1={6}
        x2={8}
        y2={10}
        stroke={color}
        strokeWidth={ICON_STROKE_WIDTH}
        strokeLinecap="round"
      />
      <Circle cx={8} cy={12.5} r={0.75} fill={color} />
    </SvgWrap>
  ),
  error: ({ color }: { color: string }) => (
    <SvgWrap>
      <Circle cx={8} cy={8} r={7} fill="none" stroke={color} strokeWidth={ICON_STROKE_WIDTH} />
      <Line
        x1={5.5}
        y1={5.5}
        x2={10.5}
        y2={10.5}
        stroke={color}
        strokeWidth={ICON_STROKE_WIDTH}
        strokeLinecap="round"
      />
      <Line
        x1={10.5}
        y1={5.5}
        x2={5.5}
        y2={10.5}
        stroke={color}
        strokeWidth={ICON_STROKE_WIDTH}
        strokeLinecap="round"
      />
    </SvgWrap>
  ),
};

function AlertIcon({ variant, color }: { variant: AlertVariant; color: string }) {
  const Icon = ICON_MAP[variant];
  return <Icon color={color} />;
}

function createAlertStyles(theme: PdfxTheme) {
  const { typography, colors, primitives } = theme;

  // Semantic border/icon colors resolved from theme tokens, with fallbacks for
  // themes that do not define all semantic color keys.
  const variantColors = {
    info: colors.info ?? '#3B82F6',
    success: colors.success ?? '#22C55E',
    warning: colors.warning ?? '#F59E0B',
    error: colors.destructive ?? '#EF4444',
  } satisfies Record<AlertVariant, string>;

  const bl = (color: string) => ({ borderLeftColor: color, borderLeftWidth: 4 });

  const sheet = StyleSheet.create({
    container: {
      flexDirection: 'row',
      padding: 12,
      borderRadius: 4,
      marginBottom: theme.spacing.componentGap,
    },
    bg: {
      backgroundColor: colors.muted,
    },
    borderInfo: bl(variantColors.info),
    borderSuccess: bl(variantColors.success),
    borderWarning: bl(variantColors.warning),
    borderError: bl(variantColors.error),
    iconContainer: {
      width: 20,
      marginRight: 10,
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 2,
    },
    contentContainer: { flex: 1 },
    title: {
      fontFamily: typography.heading.fontFamily,
      fontSize: primitives.typography.sm,
      fontWeight: primitives.fontWeights.semibold,
      color: colors.foreground,
      marginBottom: 4,
    },
    description: {
      fontFamily: typography.body.fontFamily,
      fontSize: primitives.typography.sm,
      lineHeight: typography.body.lineHeight,
      color: colors.mutedForeground,
    },
  });

  return {
    ...sheet,
    borderMap: {
      info: sheet.borderInfo,
      success: sheet.borderSuccess,
      warning: sheet.borderWarning,
      error: sheet.borderError,
    } as Record<AlertVariant, Style>,
    /** Resolved hex colors for each variant — used to tint the SVG icons. */
    variantColors,
  };
}

export function PdfAlert({
  variant = 'info',
  title,
  children,
  showIcon = true,
  showBorder = true,
  style,
}: PdfAlertProps) {
  const theme = usePdfxTheme();
  const styles = useSafeMemo(() => createAlertStyles(theme), [theme]);

  if (!title && !children) return null;

  const containerStyles: Style[] = [
    styles.container,
    styles.bg,
    ...(showBorder ? [styles.borderMap[variant]] : []),
    ...(style ? [style].flat() : []),
  ];

  return (
    <View wrap={false} style={containerStyles}>
      {showIcon && (
        <View style={styles.iconContainer}>
          <AlertIcon variant={variant} color={styles.variantColors[variant]} />
        </View>
      )}
      <View style={styles.contentContainer}>
        {title && <PDFText style={styles.title}>{title}</PDFText>}
        {typeof children === 'string' ? (
          <PDFText style={styles.description}>{children}</PDFText>
        ) : (
          children
        )}
      </View>
    </View>
  );
}
