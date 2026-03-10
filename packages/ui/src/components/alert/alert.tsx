import { Circle, G, Line, Text as PDFText, Path, Svg, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { usePdfxTheme, useSafeMemo } from '../../lib/pdfx-theme-context';
import { createAlertStyles } from './alert.styles';
import type { AlertVariant, PdfAlertProps } from './alert.types';

// ─── Icon Colors ───────────────────────────────────────────────────────────────

const ICON_COLORS: Record<AlertVariant, string> = {
  info: '#3B82F6',
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
};

// ─── SVG Icons ─────────────────────────────────────────────────────────────────

function InfoIcon({ color }: { color: string }) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16">
      <Circle cx={8} cy={8} r={7} fill="none" stroke={color} strokeWidth={1.5} />
      <Circle cx={8} cy={4.5} r={1} fill={color} />
      <Line x1={8} y1={7} x2={8} y2={11.5} stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

function SuccessIcon({ color }: { color: string }) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16">
      <Circle cx={8} cy={8} r={7} fill="none" stroke={color} strokeWidth={1.5} />
      <Path
        d="M5 8 L7 10 L11 6"
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function WarningIcon({ color }: { color: string }) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16">
      <Path
        d="M8 1.5 L15 14.5 L1 14.5 Z"
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <G>
        <Line x1={8} y1={6} x2={8} y2={10} stroke={color} strokeWidth={1.5} strokeLinecap="round" />
        <Circle cx={8} cy={12.5} r={0.75} fill={color} />
      </G>
    </Svg>
  );
}

function ErrorIcon({ color }: { color: string }) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16">
      <Circle cx={8} cy={8} r={7} fill="none" stroke={color} strokeWidth={1.5} />
      <G>
        <Line
          x1={5.5}
          y1={5.5}
          x2={10.5}
          y2={10.5}
          stroke={color}
          strokeWidth={1.5}
          strokeLinecap="round"
        />
        <Line
          x1={10.5}
          y1={5.5}
          x2={5.5}
          y2={10.5}
          stroke={color}
          strokeWidth={1.5}
          strokeLinecap="round"
        />
      </G>
    </Svg>
  );
}

function AlertIcon({ variant }: { variant: AlertVariant }) {
  const color = ICON_COLORS[variant];

  switch (variant) {
    case 'info':
      return <InfoIcon color={color} />;
    case 'success':
      return <SuccessIcon color={color} />;
    case 'warning':
      return <WarningIcon color={color} />;
    case 'error':
      return <ErrorIcon color={color} />;
  }
}

// ─── PdfAlert Component ────────────────────────────────────────────────────────

/**
 * PdfAlert — Displays info, success, warning, or error callout boxes.
 *
 * Use for important notices, confirmations, cautions, or critical alerts
 * in reports, contracts, and documents.
 *
 * @example Basic info alert
 * ```tsx
 * <PdfAlert variant="info" title="Note">
 *   This document requires a signature before proceeding.
 * </PdfAlert>
 * ```
 *
 * @example Success confirmation
 * ```tsx
 * <PdfAlert variant="success" title="Payment Confirmed">
 *   Your payment of $500.00 has been received.
 * </PdfAlert>
 * ```
 *
 * @example Warning without icon
 * ```tsx
 * <PdfAlert variant="warning" title="Deadline Approaching" showIcon={false}>
 *   Please submit your documents by March 15, 2026.
 * </PdfAlert>
 * ```
 *
 * @example Error alert
 * ```tsx
 * <PdfAlert variant="error" title="Action Required">
 *   Missing required information. Please review and resubmit.
 * </PdfAlert>
 * ```
 */
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

  const borderMap: Record<AlertVariant, Style> = {
    info: styles.borderInfo,
    success: styles.borderSuccess,
    warning: styles.borderWarning,
    error: styles.borderError,
  };

  const bgMap: Record<AlertVariant, Style> = {
    info: styles.bgInfo,
    success: styles.bgSuccess,
    warning: styles.bgWarning,
    error: styles.bgError,
  };

  const titleColorMap: Record<AlertVariant, Style> = {
    info: styles.titleInfo,
    success: styles.titleSuccess,
    warning: styles.titleWarning,
    error: styles.titleError,
  };

  const descriptionColorMap: Record<AlertVariant, Style> = {
    info: styles.descriptionInfo,
    success: styles.descriptionSuccess,
    warning: styles.descriptionWarning,
    error: styles.descriptionError,
  };

  const containerStyles: Style[] = [styles.container, bgMap[variant]];

  if (showBorder) {
    containerStyles.push(borderMap[variant]);
  }

  if (style) {
    containerStyles.push(style);
  }

  const titleStyles: Style[] = [styles.title, titleColorMap[variant]];
  const descriptionStyles: Style[] = [styles.description, descriptionColorMap[variant]];

  const hasContent = title || children;

  if (!hasContent) {
    return null;
  }

  return (
    <View wrap={false} style={containerStyles}>
      {showIcon && (
        <View style={styles.iconContainer}>
          <AlertIcon variant={variant} />
        </View>
      )}
      <View style={styles.contentContainer}>
        {title && <PDFText style={titleStyles}>{title}</PDFText>}
        {typeof children === 'string' ? (
          <PDFText style={descriptionStyles}>{children}</PDFText>
        ) : (
          children
        )}
      </View>
    </View>
  );
}
