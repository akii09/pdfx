import type { PdfxTheme } from '@pdfx/shared';
import { StyleSheet } from '@react-pdf/renderer';

export function createResumeStyles(theme: PdfxTheme, accentColor?: string) {
  const { colors, typography, spacing, primitives } = theme;
  const accent = accentColor || colors.primary;

  return StyleSheet.create({
    // ─── Page Layout ─────────────────────────────────────────────────────────
    page: {
      padding: spacing.page.marginTop,
      paddingBottom: spacing.page.marginBottom,
      backgroundColor: colors.background,
      fontFamily: typography.body.fontFamily,
      fontSize: primitives.typography.xs,
      color: colors.foreground,
    },

    // ─── Professional Variant ────────────────────────────────────────────────
    professionalHeader: {
      marginBottom: spacing.sectionGap,
      borderBottomWidth: 2,
      borderBottomColor: accent,
      paddingBottom: spacing.componentGap,
    },
    professionalName: {
      fontSize: primitives.typography['2xl'],
      fontWeight: primitives.fontWeights.bold,
      color: colors.foreground,
      marginBottom: 2,
    },
    professionalTitle: {
      fontSize: primitives.typography.sm,
      color: colors.mutedForeground,
      marginBottom: 6,
    },
    professionalContact: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
    },
    professionalContactItem: {
      fontSize: primitives.typography.xs,
      color: colors.mutedForeground,
    },

    // ─── Modern Variant (Two-Column) ─────────────────────────────────────────
    modernContainer: {
      flexDirection: 'row',
    },
    modernSidebar: {
      width: 180,
      backgroundColor: accent,
      padding: 16,
      marginLeft: -spacing.page.marginLeft,
      marginTop: -spacing.page.marginTop,
      marginBottom: -spacing.page.marginBottom,
      minHeight: '100%',
    },
    modernSidebarName: {
      fontSize: primitives.typography.lg,
      fontWeight: primitives.fontWeights.bold,
      color: colors.primaryForeground,
      marginBottom: 4,
    },
    modernSidebarTitle: {
      fontSize: primitives.typography.xs,
      color: colors.primaryForeground,
      opacity: 0.9,
      marginBottom: 16,
    },
    modernSidebarSection: {
      marginBottom: 16,
    },
    modernSidebarLabel: {
      fontSize: primitives.typography.xs,
      fontWeight: primitives.fontWeights.semibold,
      color: colors.primaryForeground,
      textTransform: 'uppercase',
      letterSpacing: primitives.letterSpacing.wide,
      marginBottom: 6,
      opacity: 0.8,
    },
    modernSidebarText: {
      fontSize: primitives.typography.xs,
      color: colors.primaryForeground,
      marginBottom: 3,
      lineHeight: 1.4,
    },
    modernMain: {
      flex: 1,
      paddingLeft: 20,
    },

    // ─── Minimal Variant ─────────────────────────────────────────────────────
    minimalHeader: {
      marginBottom: spacing.sectionGap,
      textAlign: 'center',
    },
    minimalName: {
      fontSize: primitives.typography.xl,
      fontWeight: primitives.fontWeights.bold,
      color: colors.foreground,
      marginBottom: 2,
    },
    minimalTitle: {
      fontSize: primitives.typography.sm,
      color: colors.mutedForeground,
      marginBottom: 8,
    },
    minimalContact: {
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: 8,
    },
    minimalContactItem: {
      fontSize: primitives.typography.xs,
      color: colors.mutedForeground,
    },
    minimalDivider: {
      color: colors.border,
    },

    // ─── Section Styles (Shared) ─────────────────────────────────────────────
    section: {
      marginBottom: spacing.componentGap,
    },
    sectionTitle: {
      fontSize: primitives.typography.sm,
      fontWeight: primitives.fontWeights.bold,
      color: accent,
      textTransform: 'uppercase',
      letterSpacing: primitives.letterSpacing.wide,
      marginBottom: 8,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      paddingBottom: 4,
    },

    // ─── Experience Entry ────────────────────────────────────────────────────
    experienceEntry: {
      marginBottom: 12,
    },
    experienceHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 4,
    },
    experienceRole: {
      fontSize: primitives.typography.sm,
      fontWeight: primitives.fontWeights.semibold,
      color: colors.foreground,
    },
    experienceCompany: {
      fontSize: primitives.typography.xs,
      color: colors.mutedForeground,
    },
    experienceDates: {
      fontSize: primitives.typography.xs,
      color: colors.mutedForeground,
      textAlign: 'right',
    },
    experienceLocation: {
      fontSize: primitives.typography.xs,
      color: colors.mutedForeground,
      textAlign: 'right',
    },
    experienceHighlight: {
      fontSize: primitives.typography.xs,
      color: colors.foreground,
      marginLeft: 8,
      marginBottom: 2,
      lineHeight: 1.4,
    },
    experienceDescription: {
      fontSize: primitives.typography.xs,
      color: colors.foreground,
      lineHeight: 1.5,
      marginTop: 4,
    },

    // ─── Education Entry ─────────────────────────────────────────────────────
    educationEntry: {
      marginBottom: 10,
    },
    educationHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 2,
    },
    educationDegree: {
      fontSize: primitives.typography.sm,
      fontWeight: primitives.fontWeights.semibold,
      color: colors.foreground,
    },
    educationInstitution: {
      fontSize: primitives.typography.xs,
      color: colors.mutedForeground,
    },
    educationDates: {
      fontSize: primitives.typography.xs,
      color: colors.mutedForeground,
      textAlign: 'right',
    },
    educationGpa: {
      fontSize: primitives.typography.xs,
      color: colors.mutedForeground,
      fontStyle: 'italic',
    },

    // ─── Skills ──────────────────────────────────────────────────────────────
    skillsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 4,
    },
    skillCategory: {
      marginBottom: 8,
    },
    skillCategoryLabel: {
      fontSize: primitives.typography.xs,
      fontWeight: primitives.fontWeights.semibold,
      color: colors.foreground,
      marginBottom: 4,
    },
    skillBadge: {
      backgroundColor: colors.muted,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: primitives.borderRadius.sm,
      fontSize: primitives.typography.xs,
      color: colors.foreground,
      marginRight: 4,
      marginBottom: 4,
    },
    skillText: {
      fontSize: primitives.typography.xs,
      color: colors.foreground,
    },

    // ─── Projects ────────────────────────────────────────────────────────────
    projectEntry: {
      marginBottom: 10,
    },
    projectName: {
      fontSize: primitives.typography.sm,
      fontWeight: primitives.fontWeights.semibold,
      color: colors.foreground,
    },
    projectDescription: {
      fontSize: primitives.typography.xs,
      color: colors.foreground,
      lineHeight: 1.4,
      marginTop: 2,
    },
    projectTech: {
      fontSize: primitives.typography.xs,
      color: colors.mutedForeground,
      fontStyle: 'italic',
      marginTop: 2,
    },

    // ─── Certifications ──────────────────────────────────────────────────────
    certEntry: {
      marginBottom: 6,
    },
    certName: {
      fontSize: primitives.typography.xs,
      fontWeight: primitives.fontWeights.semibold,
      color: colors.foreground,
    },
    certIssuer: {
      fontSize: primitives.typography.xs,
      color: colors.mutedForeground,
    },

    // ─── Languages ───────────────────────────────────────────────────────────
    languageEntry: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 4,
    },
    languageName: {
      fontSize: primitives.typography.xs,
      color: colors.foreground,
    },
    languageProficiency: {
      fontSize: primitives.typography.xs,
      color: colors.mutedForeground,
    },

    // ─── Summary ─────────────────────────────────────────────────────────────
    summaryText: {
      fontSize: primitives.typography.xs,
      color: colors.foreground,
      lineHeight: 1.6,
    },

    // ─── Bullet Point ────────────────────────────────────────────────────────
    bullet: {
      fontSize: primitives.typography.xs,
      color: accent,
      marginRight: 4,
    },
    bulletRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 2,
    },
  });
}
