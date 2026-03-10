import type { PdfxTheme } from '@pdfx/shared';
import { StyleSheet } from '@react-pdf/renderer';

export function createAlertStyles(theme: PdfxTheme) {
  const { typography, colors, primitives } = theme;

  return StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      padding: 12,
      borderRadius: 4,
      marginBottom: theme.spacing.componentGap,
    },
    // Border variants (left accent stripe)
    borderInfo: {
      borderLeftWidth: 4,
      borderLeftColor: colors.info ?? '#3B82F6',
    },
    borderSuccess: {
      borderLeftWidth: 4,
      borderLeftColor: colors.success ?? '#22C55E',
    },
    borderWarning: {
      borderLeftWidth: 4,
      borderLeftColor: colors.warning ?? '#F59E0B',
    },
    borderError: {
      borderLeftWidth: 4,
      borderLeftColor: colors.destructive ?? '#EF4444',
    },
    // Background variants
    bgInfo: {
      backgroundColor: '#EFF6FF', // Light blue
    },
    bgSuccess: {
      backgroundColor: '#F0FDF4', // Light green
    },
    bgWarning: {
      backgroundColor: '#FFFBEB', // Light amber
    },
    bgError: {
      backgroundColor: '#FEF2F2', // Light red
    },
    // Icon container
    iconContainer: {
      width: 20,
      marginRight: 10,
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 2,
    },
    // Content container
    contentContainer: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    // Title
    title: {
      fontFamily: typography.heading.fontFamily,
      fontSize: primitives.typography.sm,
      fontWeight: 600,
      marginBottom: 4,
    },
    titleInfo: {
      color: '#1E40AF', // Dark blue
    },
    titleSuccess: {
      color: '#166534', // Dark green
    },
    titleWarning: {
      color: '#92400E', // Dark amber
    },
    titleError: {
      color: '#991B1B', // Dark red
    },
    // Description / content text
    description: {
      fontFamily: typography.body.fontFamily,
      fontSize: primitives.typography.sm,
      lineHeight: typography.body.lineHeight,
    },
    descriptionInfo: {
      color: '#1E3A8A', // Blue text
    },
    descriptionSuccess: {
      color: '#14532D', // Green text
    },
    descriptionWarning: {
      color: '#78350F', // Amber text
    },
    descriptionError: {
      color: '#7F1D1D', // Red text
    },
  });
}
