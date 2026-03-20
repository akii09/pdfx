import type { PDFComponentProps, PdfxTheme } from '@pdfx/shared';
import { Circle, Line, Text as PDFText, Path, StyleSheet, Svg, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import type { ReactNode } from 'react';
import { usePdfxTheme, useSafeMemo } from '../../lib/pdfx-theme-context';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface PdfAlertProps extends Omit<PDFComponentProps, 'children'> {
  variant?: AlertVariant;
  title?: string;
  children?: ReactNode;
  showIcon?: boolean;
  showBorder?: boolean;
}

const COLORS = {
  info: { border: '#3B82F6', bg: '#EFF6FF', title: '#1E40AF', desc: '#1E3A8A' },
  success: { border: '#22C55E', bg: '#F0FDF4', title: '#166534', desc: '#14532D' },
  warning: { border: '#F59E0B', bg: '#FFFBEB', title: '#92400E', desc: '#78350F' },
  error: { border: '#EF4444', bg: '#FEF2F2', title: '#991B1B', desc: '#7F1D1D' },
} as const;

const SW = 1.5;

const SvgWrap = ({ children }: { children: ReactNode }) => (
  <Svg width={16} height={16} viewBox="0 0 16 16">
    {children}
  </Svg>
);

const ICON_MAP = {
  info: ({ color: c }: { color: string }) => (
    <SvgWrap>
      <Circle cx={8} cy={8} r={7} fill="none" stroke={c} strokeWidth={SW} />
      <Circle cx={8} cy={4.5} r={1} fill={c} />
      <Line x1={8} y1={7} x2={8} y2={11.5} stroke={c} strokeWidth={SW} strokeLinecap="round" />
    </SvgWrap>
  ),
  success: ({ color: c }: { color: string }) => (
    <SvgWrap>
      <Circle cx={8} cy={8} r={7} fill="none" stroke={c} strokeWidth={SW} />
      <Path
        d="M5 8 L7 10 L11 6"
        fill="none"
        stroke={c}
        strokeWidth={SW}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgWrap>
  ),
  warning: ({ color: c }: { color: string }) => (
    <SvgWrap>
      <Path
        d="M8 1.5 L15 14.5 L1 14.5 Z"
        fill="none"
        stroke={c}
        strokeWidth={SW}
        strokeLinejoin="round"
      />
      <Line x1={8} y1={6} x2={8} y2={10} stroke={c} strokeWidth={SW} strokeLinecap="round" />
      <Circle cx={8} cy={12.5} r={0.75} fill={c} />
    </SvgWrap>
  ),
  error: ({ color: c }: { color: string }) => (
    <SvgWrap>
      <Circle cx={8} cy={8} r={7} fill="none" stroke={c} strokeWidth={SW} />
      <Line
        x1={5.5}
        y1={5.5}
        x2={10.5}
        y2={10.5}
        stroke={c}
        strokeWidth={SW}
        strokeLinecap="round"
      />
      <Line
        x1={10.5}
        y1={5.5}
        x2={5.5}
        y2={10.5}
        stroke={c}
        strokeWidth={SW}
        strokeLinecap="round"
      />
    </SvgWrap>
  ),
};

function AlertIcon({ variant }: { variant: AlertVariant }) {
  const Icon = ICON_MAP[variant];
  return <Icon color={COLORS[variant].border} />;
}

function createAlertStyles(theme: PdfxTheme) {
  const { typography, colors, primitives } = theme;
  const bl = (color: string) => ({ borderLeftColor: color, borderLeftWidth: 4 });
  const sheet = StyleSheet.create({
    container: {
      flexDirection: 'row',
      padding: 12,
      borderRadius: 4,
      marginBottom: theme.spacing.componentGap,
    },
    borderInfo: bl(colors.info ?? COLORS.info.border),
    borderSuccess: bl(colors.success ?? COLORS.success.border),
    borderWarning: bl(colors.warning ?? COLORS.warning.border),
    borderError: bl(colors.destructive ?? COLORS.error.border),
    bgInfo: { backgroundColor: COLORS.info.bg },
    bgSuccess: { backgroundColor: COLORS.success.bg },
    bgWarning: { backgroundColor: COLORS.warning.bg },
    bgError: { backgroundColor: COLORS.error.bg },
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
      marginBottom: 4,
    },
    titleInfo: { color: COLORS.info.title },
    titleSuccess: { color: COLORS.success.title },
    titleWarning: { color: COLORS.warning.title },
    titleError: { color: COLORS.error.title },
    description: {
      fontFamily: typography.body.fontFamily,
      fontSize: primitives.typography.sm,
      lineHeight: typography.body.lineHeight,
    },
    descriptionInfo: { color: COLORS.info.desc },
    descriptionSuccess: { color: COLORS.success.desc },
    descriptionWarning: { color: COLORS.warning.desc },
    descriptionError: { color: COLORS.error.desc },
  });
  return {
    ...sheet,
    borderMap: {
      info: sheet.borderInfo,
      success: sheet.borderSuccess,
      warning: sheet.borderWarning,
      error: sheet.borderError,
    } as Record<AlertVariant, Style>,
    bgMap: {
      info: sheet.bgInfo,
      success: sheet.bgSuccess,
      warning: sheet.bgWarning,
      error: sheet.bgError,
    } as Record<AlertVariant, Style>,
    titleMap: {
      info: sheet.titleInfo,
      success: sheet.titleSuccess,
      warning: sheet.titleWarning,
      error: sheet.titleError,
    } as Record<AlertVariant, Style>,
    descMap: {
      info: sheet.descriptionInfo,
      success: sheet.descriptionSuccess,
      warning: sheet.descriptionWarning,
      error: sheet.descriptionError,
    } as Record<AlertVariant, Style>,
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
    styles.bgMap[variant],
    ...(showBorder ? [styles.borderMap[variant]] : []),
    ...(style ? [style].flat() : []),
  ];

  return (
    <View wrap={false} style={containerStyles}>
      {showIcon && (
        <View style={styles.iconContainer}>
          <AlertIcon variant={variant} />
        </View>
      )}
      <View style={styles.contentContainer}>
        {title && <PDFText style={[styles.title, styles.titleMap[variant]]}>{title}</PDFText>}
        {typeof children === 'string' ? (
          <PDFText style={[styles.description, styles.descMap[variant]]}>{children}</PDFText>
        ) : (
          children
        )}
      </View>
    </View>
  );
}
