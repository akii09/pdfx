import type { PdfxTheme } from '@pdfx/shared';
import { StyleSheet } from '@react-pdf/renderer';

export function createInvoiceStyles(theme: PdfxTheme) {
  const { colors, typography, spacing, primitives } = theme;

  return StyleSheet.create({
    // Page styles
    page: {
      padding: spacing.page.marginTop,
      paddingBottom: spacing.page.marginBottom + 20,
      backgroundColor: colors.background,
      fontFamily: typography.body.fontFamily,
      fontSize: typography.body.fontSize,
      color: colors.foreground,
    },

    // ─── Billing Section ─────────────────────────────────────────────────────
    billingSection: {
      flexDirection: 'row',
      marginBottom: spacing.sectionGap,
    },
    billingColumn: {
      flex: 1,
      paddingRight: 15,
    },
    billingLabel: {
      fontSize: primitives.typography.xs,
      fontWeight: primitives.fontWeights.semibold,
      color: colors.mutedForeground,
      textTransform: 'uppercase',
      marginBottom: 4,
      letterSpacing: primitives.letterSpacing.wide,
    },
    billingText: {
      fontSize: primitives.typography.xs,
      lineHeight: 1.4,
      marginBottom: 2,
    },

    // ─── Invoice Meta (Modern variant) ───────────────────────────────────────
    invoiceMeta: {
      flexDirection: 'row',
      backgroundColor: colors.muted,
      padding: 12,
      marginBottom: spacing.sectionGap,
      borderRadius: primitives.borderRadius.sm,
    },
    invoiceMetaItem: {
      flex: 1,
      alignItems: 'center',
    },
    invoiceMetaLabel: {
      fontSize: primitives.typography.xs,
      color: colors.mutedForeground,
      marginBottom: 2,
    },
    invoiceMetaValue: {
      fontSize: primitives.typography.sm,
      fontWeight: primitives.fontWeights.semibold,
    },

    // ─── Summary Section ─────────────────────────────────────────────────────
    summaryContainer: {
      flexDirection: 'row',
      marginTop: spacing.componentGap,
    },
    summaryBox: {
      marginLeft: 'auto',
      width: 220,
    },

    // ─── Notes Section ───────────────────────────────────────────────────────
    notesSection: {
      marginTop: spacing.sectionGap,
      paddingTop: spacing.componentGap,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    notesLabel: {
      fontSize: primitives.typography.xs,
      fontWeight: primitives.fontWeights.semibold,
      color: colors.mutedForeground,
      marginBottom: 4,
    },
    notesText: {
      fontSize: primitives.typography.xs,
      color: colors.mutedForeground,
      lineHeight: 1.5,
    },

    // ─── Modern Variant Header ───────────────────────────────────────────────
    modernHeader: {
      backgroundColor: colors.primary,
      padding: 24,
      marginBottom: spacing.sectionGap,
      marginLeft: -spacing.page.marginLeft,
      marginRight: -spacing.page.marginRight,
      marginTop: -spacing.page.marginTop,
    },
    modernHeaderTitle: {
      fontSize: primitives.typography['2xl'],
      fontWeight: primitives.fontWeights.bold,
      color: colors.primaryForeground,
      marginBottom: 4,
    },
    modernHeaderSubtitle: {
      fontSize: primitives.typography.sm,
      color: colors.primaryForeground,
      opacity: 0.8,
    },

    // ─── Minimal Variant ─────────────────────────────────────────────────────
    minimalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: spacing.sectionGap,
      paddingBottom: spacing.componentGap,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    minimalInvoiceStamp: {
      textAlign: 'right',
    },
    minimalInvoiceNumber: {
      fontSize: primitives.typography.xl,
      fontWeight: primitives.fontWeights.bold,
      color: colors.foreground,
    },
    minimalInvoiceLabel: {
      fontSize: primitives.typography.xs,
      color: colors.mutedForeground,
      textTransform: 'uppercase',
      letterSpacing: primitives.letterSpacing.wide,
    },
  });
}
