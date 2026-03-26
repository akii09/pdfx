import type { PdfxTheme } from '@pdfx/shared';
import { StyleSheet } from '@react-pdf/renderer';
import type { PdfFormVariant } from './form.types';

/** Style factory for fillable form layouts, derived from the active theme. */
export function createFormStyles(t: PdfxTheme, variant: PdfFormVariant = 'underline') {
  const { spacing, borderRadius, fontWeights, typography } = t.primitives;
  const borderColor = t.colors.border;
  const hairline = 0.75; // lighter than spacing[0.5]=2pt — more refined
  const rule = 1; // group title rule

  const fieldAreaByVariant: Record<PdfFormVariant, object> = {
    underline: {
      borderBottomWidth: 1,
      borderBottomColor: borderColor,
      borderBottomStyle: 'solid',
    },
    box: {
      borderWidth: hairline,
      borderColor: borderColor,
      borderStyle: 'solid',
      borderRadius: borderRadius.sm,
    },
    outlined: {
      borderWidth: hairline,
      borderColor: t.colors.foreground,
      borderStyle: 'solid',
      borderRadius: borderRadius.md,
    },
    ghost: {
      backgroundColor: t.colors.muted,
      borderRadius: borderRadius.sm,
    },
  };

  const hasPadding = variant === 'box' || variant === 'outlined' || variant === 'ghost';

  return StyleSheet.create({
    root: {
      width: '100%',
      marginBottom: t.spacing.componentGap,
    },

    formTitle: {
      fontFamily: t.typography.heading.fontFamily,
      fontSize: typography.xl,
      lineHeight: t.typography.heading.lineHeight,
      color: t.colors.foreground,
      fontWeight: fontWeights.bold,
      marginBottom: spacing[1],
    },
    formSubtitle: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: typography.sm,
      lineHeight: t.typography.body.lineHeight,
      color: t.colors.mutedForeground,
      marginBottom: spacing[3],
    },
    formDivider: {
      borderBottomWidth: rule,
      borderBottomColor: borderColor,
      borderBottomStyle: 'solid',
      marginBottom: spacing[4],
    },

    group: {
      marginBottom: spacing[5],
    },
    groupTitle: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: typography.xs,
      lineHeight: 1.2,
      color: t.colors.mutedForeground,
      fontWeight: fontWeights.semibold,
      textTransform: 'uppercase',
      letterSpacing: 0.8,
      marginBottom: spacing[3],
    },

    columnsRow: {
      flexDirection: 'row',
      gap: spacing[4],
    },
    column: {
      flex: 1,
    },

    fieldAbove: {
      marginBottom: spacing[3],
      width: '100%',
    },
    labelAbove: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: typography.xs,
      lineHeight: 1.2,
      color: t.colors.mutedForeground,
      fontWeight: fontWeights.medium,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginBottom: spacing[1],
    },

    fieldLeft: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      marginBottom: spacing[3],
      gap: spacing[2],
    },
    labelLeft: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.typography.body.fontSize,
      lineHeight: t.typography.body.lineHeight,
      color: t.colors.mutedForeground,
      fontWeight: fontWeights.medium,
      width: 80,
      paddingBottom: hasPadding ? spacing[1] : 0,
    },
    fieldLeftArea: {
      flex: 1,
    },

    fieldArea: {
      width: '100%' as const,
      ...fieldAreaByVariant[variant],
    },

    hint: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: typography.xs,
      color: t.colors.mutedForeground,
      opacity: 0.14,
      paddingTop: hasPadding ? spacing[1] : spacing[0.5],
      paddingBottom: hasPadding ? spacing[1] : 0,
      paddingHorizontal: hasPadding ? spacing[2] : 0,
    },
  });
}
