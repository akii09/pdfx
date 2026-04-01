import type { PdfxTheme } from '@pdfx/shared';
import {
  Circle,
  Document,
  Line,
  Page,
  Path,
  StyleSheet,
  Svg,
  Text,
  View,
} from '@react-pdf/renderer';
import { useMemo } from 'react';
import '../../lib/pdf-fonts';

function createStyles(t: PdfxTheme) {
  const {
    foreground,
    background,
    muted,
    mutedForeground,
    border,
    accent,
    primary,
    primaryForeground,
  } = t.colors;
  const { body, heading } = t.typography;
  const { primitives, spacing } = t;

  return StyleSheet.create({
    page: {
      fontFamily: body.fontFamily,
      fontSize: body.fontSize,
      lineHeight: body.lineHeight,
      color: foreground,
      backgroundColor: background,
      paddingTop: t.spacing.page.marginTop,
      paddingRight: t.spacing.page.marginRight,
      paddingBottom: t.spacing.page.marginBottom,
      paddingLeft: t.spacing.page.marginLeft,
    },

    h1: {
      fontFamily: heading.fontFamily,
      fontWeight: heading.fontWeight,
      fontSize: heading.fontSize.h1,
      lineHeight: heading.lineHeight,
      color: foreground,
      marginBottom: t.spacing.paragraphGap,
      marginTop: 0,
    },
    h2: {
      fontFamily: heading.fontFamily,
      fontWeight: heading.fontWeight,
      fontSize: heading.fontSize.h2,
      lineHeight: heading.lineHeight,
      color: foreground,
      marginBottom: t.spacing.paragraphGap,
      marginTop: t.spacing.sectionGap,
    },
    h3: {
      fontFamily: heading.fontFamily,
      fontWeight: heading.fontWeight,
      fontSize: heading.fontSize.h3,
      lineHeight: heading.lineHeight,
      color: foreground,
      marginBottom: t.spacing.paragraphGap,
      marginTop: t.spacing.componentGap,
    },
    h4: {
      fontFamily: heading.fontFamily,
      fontWeight: heading.fontWeight,
      fontSize: heading.fontSize.h4,
      lineHeight: heading.lineHeight,
      color: foreground,
      marginBottom: spacing.paragraphGap,
      marginTop: spacing.paragraphGap,
    },

    bodyText: {
      fontFamily: body.fontFamily,
      fontSize: body.fontSize,
      lineHeight: body.lineHeight,
      color: foreground,
      marginBottom: t.spacing.paragraphGap,
    },
    mutedText: {
      fontFamily: body.fontFamily,
      fontSize: primitives.typography.xs,
      lineHeight: body.lineHeight,
      color: mutedForeground,
      marginBottom: t.spacing.paragraphGap,
    },

    divider: {
      borderBottomWidth: 1,
      borderBottomColor: border,
      borderBottomStyle: 'solid',
      marginVertical: t.spacing.componentGap,
    },

    badgeRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: primitives.spacing[2],
      marginBottom: t.spacing.componentGap,
    },
    badge: {
      borderRadius: primitives.borderRadius.full,
      paddingHorizontal: primitives.spacing[3],
      paddingVertical: primitives.spacing[1],
      borderWidth: 1,
      borderStyle: 'solid',
      alignSelf: 'center',
    },
    badgeText: {
      fontFamily: body.fontFamily,
      fontWeight: primitives.fontWeights.bold,
      fontSize: primitives.typography.xs,
      lineHeight: 1,
      letterSpacing: 0.3,
    },
    badgeDefault: { borderColor: border, backgroundColor: muted },
    badgeDefaultText: { color: mutedForeground },
    badgeSuccess: { borderColor: t.colors.success, backgroundColor: background },
    badgeSuccessText: { color: t.colors.success },
    badgeWarning: { borderColor: t.colors.warning, backgroundColor: background },
    badgeWarningText: { color: t.colors.warning },
    badgeDestructive: { borderColor: t.colors.destructive, backgroundColor: background },
    badgeDestructiveText: { color: t.colors.destructive },
    badgeInfo: { borderColor: t.colors.info, backgroundColor: background },
    badgeInfoText: { color: t.colors.info },
    badgePrimary: { borderColor: primary, backgroundColor: primary },
    badgePrimaryText: { color: primaryForeground },
    badgeAccent: { borderColor: accent, backgroundColor: accent },
    badgeAccentText: { color: background },

    alert: {
      flexDirection: 'row',
      padding: 12,
      borderRadius: primitives.borderRadius.md,
      marginBottom: t.spacing.componentGap,
      backgroundColor: muted,
    },
    alertBorderInfo: { borderLeftColor: t.colors.info, borderLeftWidth: 4 },
    alertBorderSuccess: { borderLeftColor: t.colors.success, borderLeftWidth: 4 },
    alertBorderWarning: { borderLeftColor: t.colors.warning, borderLeftWidth: 4 },
    alertBorderError: { borderLeftColor: t.colors.destructive, borderLeftWidth: 4 },
    alertContent: { flex: 1 },
    alertTitle: {
      fontFamily: heading.fontFamily,
      fontSize: primitives.typography.sm,
      fontWeight: primitives.fontWeights.bold,
      lineHeight: 1.2,
      color: foreground,
      marginBottom: 3,
    },
    alertBody: {
      fontFamily: body.fontFamily,
      fontSize: primitives.typography.sm - 1,
      lineHeight: body.lineHeight,
      color: mutedForeground,
    },
    alertIconWrap: {
      width: 20,
      marginRight: 10,
      paddingTop: 2,
      alignItems: 'center',
    },

    table: { marginBottom: t.spacing.componentGap },
    tableHeader: {
      flexDirection: 'row',
      backgroundColor: muted,
      borderBottomWidth: 1,
      borderBottomColor: border,
      borderBottomStyle: 'solid',
      paddingVertical: primitives.spacing[2],
      paddingHorizontal: primitives.spacing[3],
    },
    tableHeaderCell: {
      fontFamily: heading.fontFamily,
      fontWeight: primitives.fontWeights.bold,
      fontSize: primitives.typography.xs,
      color: mutedForeground,
      textTransform: 'uppercase',
      letterSpacing: 0.4,
      flex: 1,
    },
    tableRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: border,
      borderBottomStyle: 'solid',
      paddingVertical: primitives.spacing[2],
      paddingHorizontal: primitives.spacing[3],
    },
    tableRowEven: { backgroundColor: muted },
    tableCell: {
      fontFamily: body.fontFamily,
      fontSize: body.fontSize,
      color: foreground,
      flex: 1,
    },
    tableCellMuted: {
      fontFamily: body.fontFamily,
      fontSize: body.fontSize,
      color: mutedForeground,
      flex: 1,
    },
    tableCellSuccess: {
      fontFamily: body.fontFamily,
      fontSize: body.fontSize,
      color: t.colors.success,
      flex: 1,
    },
    tableCellWarning: {
      fontFamily: body.fontFamily,
      fontSize: body.fontSize,
      color: t.colors.warning,
      flex: 1,
    },

    kvRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: primitives.spacing[1],
      borderBottomWidth: 1,
      borderBottomColor: border,
      borderBottomStyle: 'solid',
    },
    kvKey: {
      fontFamily: body.fontFamily,
      fontSize: body.fontSize,
      color: mutedForeground,
    },
    kvValue: {
      fontFamily: body.fontFamily,
      fontSize: body.fontSize,
      color: foreground,
      fontWeight: primitives.fontWeights.bold,
    },

    card: {
      borderWidth: 1,
      borderColor: border,
      borderStyle: 'solid',
      borderRadius: primitives.borderRadius.md,
      padding: primitives.spacing[4],
      marginBottom: t.spacing.componentGap,
      backgroundColor: background,
    },
    cardHeader: {
      borderBottomWidth: 1,
      borderBottomColor: border,
      borderBottomStyle: 'solid',
      paddingBottom: primitives.spacing[2],
      marginBottom: primitives.spacing[3],
    },
    cardTitle: {
      fontFamily: heading.fontFamily,
      fontWeight: primitives.fontWeights.bold,
      fontSize: heading.fontSize.h4,
      color: foreground,
    },

    highlightBox: {
      borderRadius: primitives.borderRadius.md,
      padding: primitives.spacing[4],
      marginBottom: t.spacing.componentGap,
      borderLeftWidth: 4,
      borderLeftColor: accent,
      backgroundColor: muted,
    },
    highlightTitle: {
      fontFamily: heading.fontFamily,
      fontWeight: primitives.fontWeights.bold,
      fontSize: heading.fontSize.h4,
      color: foreground,
      marginBottom: 4,
    },
    highlightBody: {
      fontFamily: body.fontFamily,
      fontSize: body.fontSize,
      lineHeight: body.lineHeight,
      color: mutedForeground,
    },

    swatchRow: {
      flexDirection: 'row',
      gap: primitives.spacing[2],
      marginBottom: t.spacing.componentGap,
      flexWrap: 'wrap',
    },
    swatch: {
      width: 36,
      height: 36,
      borderRadius: primitives.borderRadius.md,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: border,
    },
    swatchLabel: {
      fontFamily: body.fontFamily,
      fontSize: primitives.typography.xs - 1,
      color: mutedForeground,
      marginTop: 2,
      textAlign: 'center',
    },
    swatchItem: { alignItems: 'center' },

    statsRow: {
      flexDirection: 'row',
      gap: primitives.spacing[3],
      marginBottom: t.spacing.componentGap,
    },
    statBox: {
      flex: 1,
      borderWidth: 1,
      borderColor: border,
      borderStyle: 'solid',
      borderRadius: primitives.borderRadius.md,
      padding: primitives.spacing[3],
      backgroundColor: muted,
    },
    statValue: {
      fontFamily: heading.fontFamily,
      fontWeight: primitives.fontWeights.bold,
      fontSize: heading.fontSize.h3,
      color: accent,
      marginBottom: 2,
    },
    statLabel: {
      fontFamily: body.fontFamily,
      fontSize: primitives.typography.xs,
      color: mutedForeground,
    },

    pageHeaderStrip: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: border,
      borderBottomStyle: 'solid',
      paddingBottom: primitives.spacing[3],
      marginBottom: t.spacing.sectionGap,
    },
    pageHeaderTitle: {
      fontFamily: heading.fontFamily,
      fontWeight: primitives.fontWeights.bold,
      fontSize: heading.fontSize.h3,
      color: foreground,
    },
    pageHeaderMeta: {
      fontFamily: body.fontFamily,
      fontSize: primitives.typography.xs,
      color: mutedForeground,
    },

    accentBar: {
      height: 3,
      backgroundColor: accent,
      borderRadius: primitives.borderRadius.full,
      marginBottom: primitives.spacing[4],
    },

    pageFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderTopWidth: 1,
      borderTopColor: border,
      borderTopStyle: 'solid',
      paddingTop: primitives.spacing[2],
      marginTop: t.spacing.sectionGap,
    },
    pageFooterText: {
      fontFamily: body.fontFamily,
      fontSize: primitives.typography.xs,
      color: mutedForeground,
    },
  });
}

interface ThemePreviewDocumentProps {
  theme: PdfxTheme;
}

export function ThemePreviewDocument({ theme }: ThemePreviewDocumentProps) {
  const s = useMemo(() => createStyles(theme), [theme]);
  const t = theme;

  const sampleRows = [
    { item: 'Project Setup', status: 'Complete', date: 'Jan 12', owner: 'Alice' },
    { item: 'Design System', status: 'In Progress', date: 'Jan 18', owner: 'Bob' },
    { item: 'Component Library', status: 'Pending', date: 'Feb 2', owner: 'Carol' },
    { item: 'Documentation', status: 'Pending', date: 'Feb 10', owner: 'Dave' },
    { item: 'QA Review', status: 'Blocked', date: 'Feb 15', owner: 'Eve' },
  ];

  const kvPairs = [
    { key: 'Client', value: 'Acme Corporation' },
    { key: 'Project', value: 'Annual Report 2024' },
    { key: 'Author', value: 'Design Team' },
    { key: 'Version', value: '1.0.0' },
    { key: 'Theme', value: t.name },
  ];

  const swatches = [
    { color: t.colors.foreground, label: 'fg' },
    { color: t.colors.primary, label: 'primary' },
    { color: t.colors.accent, label: 'accent' },
    { color: t.colors.muted, label: 'muted' },
    { color: t.colors.border, label: 'border' },
    { color: t.colors.success, label: 'success' },
    { color: t.colors.warning, label: 'warning' },
    { color: t.colors.destructive, label: 'error' },
    { color: t.colors.info, label: 'info' },
  ];

  const stats = [
    { value: '98%', label: 'Coverage' },
    { value: '42', label: 'Components' },
    { value: '12ms', label: 'Render' },
    { value: '4.9★', label: 'Rating' },
  ];

  return (
    <Document>
      <Page size={t.page.size} orientation={t.page.orientation} style={s.page}>
        <View style={s.accentBar} />

        <View style={s.pageHeaderStrip}>
          <Text style={s.pageHeaderTitle}>Theme Preview</Text>
          <Text style={s.pageHeaderMeta}>
            {t.name} · {t.page.size} {t.page.orientation}
          </Text>
        </View>

        <Text style={s.h1}>Document Title (H1)</Text>
        <Text style={s.bodyText}>
          This preview exercises every token in your PDFx theme. Adjust colors, typography, spacing,
          and page settings in the control panel to see how your documents will look in real time.
        </Text>

        <View style={s.divider} />

        <Text style={s.h2}>Typography Scale (H2)</Text>
        <Text style={s.h3}>Section Heading (H3)</Text>
        <Text style={s.h4}>Sub-section Heading (H4)</Text>
        <Text style={s.bodyText}>
          Body text rendered in{' '}
          <Text style={{ fontWeight: 700 }}>{t.typography.body.fontFamily}</Text> at{' '}
          {t.typography.body.fontSize}pt with a {t.typography.body.lineHeight} line-height ratio.
          Headings use <Text style={{ fontWeight: 700 }}>{t.typography.heading.fontFamily}</Text>.
        </Text>

        <View style={s.highlightBox} wrap={false}>
          <Text style={s.highlightTitle}>Key Insight</Text>
          <Text style={s.highlightBody}>
            Consistent typography and spacing are the foundation of professional PDF documents. PDFx
            theme tokens ensure every component follows the same visual language.
          </Text>
        </View>

        <Text style={s.h3}>Status Badges (H3)</Text>
        <View style={s.badgeRow} wrap={false}>
          <View style={[s.badge, s.badgeDefault]}>
            <Text style={[s.badgeText, s.badgeDefaultText]}>Default</Text>
          </View>
          <View style={[s.badge, s.badgePrimary]}>
            <Text style={[s.badgeText, s.badgePrimaryText]}>Primary</Text>
          </View>
          <View style={[s.badge, s.badgeAccent]}>
            <Text style={[s.badgeText, s.badgeAccentText]}>Accent</Text>
          </View>
          <View style={[s.badge, s.badgeSuccess]}>
            <Text style={[s.badgeText, s.badgeSuccessText]}>Success</Text>
          </View>
          <View style={[s.badge, s.badgeWarning]}>
            <Text style={[s.badgeText, s.badgeWarningText]}>Warning</Text>
          </View>
          <View style={[s.badge, s.badgeDestructive]}>
            <Text style={[s.badgeText, s.badgeDestructiveText]}>Error</Text>
          </View>
          <View style={[s.badge, s.badgeInfo]}>
            <Text style={[s.badgeText, s.badgeInfoText]}>Info</Text>
          </View>
        </View>

        <View style={s.pageFooter} fixed>
          <Text style={s.pageFooterText}>PDFx Theme Builder · pdfx.akashpise.dev</Text>
          <Text style={s.pageFooterText}>Page 1 of 3</Text>
        </View>
      </Page>

      <Page size={t.page.size} orientation={t.page.orientation} style={s.page}>
        <View style={s.accentBar} />

        <View style={s.pageHeaderStrip}>
          <Text style={s.pageHeaderTitle}>Alerts & Colors</Text>
          <Text style={s.pageHeaderMeta}>Page 2 of 3</Text>
        </View>

        <Text style={s.h2}>Alert Components (H2)</Text>

        <View style={[s.alert, s.alertBorderInfo]} wrap={false}>
          <View style={s.alertIconWrap}>
            <Svg width={14} height={14} viewBox="0 0 16 16">
              <Circle cx={8} cy={8} r={7} fill="none" stroke={t.colors.info} strokeWidth={1.5} />
              <Circle cx={8} cy={4.5} r={1} fill={t.colors.info} />
              <Line
                x1={8}
                y1={7}
                x2={8}
                y2={11.5}
                stroke={t.colors.info}
                strokeWidth={1.5}
                strokeLinecap="round"
              />
            </Svg>
          </View>
          <View style={s.alertContent}>
            <Text style={s.alertTitle}>Information</Text>
            <Text style={s.alertBody}>
              Your theme tokens are applied to all PDF components consistently.
            </Text>
          </View>
        </View>

        <View style={[s.alert, s.alertBorderSuccess]} wrap={false}>
          <View style={s.alertIconWrap}>
            <Svg width={14} height={14} viewBox="0 0 16 16">
              <Circle cx={8} cy={8} r={7} fill="none" stroke={t.colors.success} strokeWidth={1.5} />
              <Path
                d="M5 8 L7 10 L11 6"
                fill="none"
                stroke={t.colors.success}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </View>
          <View style={s.alertContent}>
            <Text style={s.alertTitle}>Build Successful</Text>
            <Text style={s.alertBody}>All 42 components rendered without errors or warnings.</Text>
          </View>
        </View>

        <View style={[s.alert, s.alertBorderWarning]} wrap={false}>
          <View style={s.alertIconWrap}>
            <Svg width={14} height={14} viewBox="0 0 16 16">
              <Path
                d="M8 2 L14 13 L2 13 Z"
                fill="none"
                stroke={t.colors.warning}
                strokeWidth={1.5}
                strokeLinejoin="round"
              />
              <Line
                x1={8}
                y1={7}
                x2={8}
                y2={10}
                stroke={t.colors.warning}
                strokeWidth={1.5}
                strokeLinecap="round"
              />
              <Circle cx={8} cy={11.5} r={0.75} fill={t.colors.warning} />
            </Svg>
          </View>
          <View style={s.alertContent}>
            <Text style={s.alertTitle}>Heads Up</Text>
            <Text style={s.alertBody}>
              Low contrast on muted foreground detected — consider checking WCAG AA accessibility
              guidelines.
            </Text>
          </View>
        </View>

        <View style={[s.alert, s.alertBorderError]} wrap={false}>
          <View style={s.alertIconWrap}>
            <Svg width={14} height={14} viewBox="0 0 16 16">
              <Circle
                cx={8}
                cy={8}
                r={7}
                fill="none"
                stroke={t.colors.destructive}
                strokeWidth={1.5}
              />
              <Line
                x1={5.5}
                y1={5.5}
                x2={10.5}
                y2={10.5}
                stroke={t.colors.destructive}
                strokeWidth={1.5}
                strokeLinecap="round"
              />
              <Line
                x1={10.5}
                y1={5.5}
                x2={5.5}
                y2={10.5}
                stroke={t.colors.destructive}
                strokeWidth={1.5}
                strokeLinecap="round"
              />
            </Svg>
          </View>
          <View style={s.alertContent}>
            <Text style={s.alertTitle}>Validation Failed</Text>
            <Text style={s.alertBody}>One or more required fields are missing or invalid.</Text>
          </View>
        </View>

        <Text style={s.h2}>Color Palette (H2)</Text>
        <Text style={s.bodyText}>
          All twelve semantic color tokens that drive component styling across your PDF documents.
        </Text>
        <View style={s.swatchRow} wrap={false}>
          {swatches.map(({ color, label }) => (
            <View key={label} style={s.swatchItem}>
              <View style={[s.swatch, { backgroundColor: color }]} />
              <Text style={s.swatchLabel}>{label}</Text>
            </View>
          ))}
        </View>

        <Text style={s.mutedText}>
          Body: {t.typography.body.fontFamily} {t.typography.body.fontSize}pt · Heading:{' '}
          {t.typography.heading.fontFamily} · Accent: {t.colors.accent}
        </Text>

        <View style={s.pageFooter} fixed>
          <Text style={s.pageFooterText}>PDFx Theme Builder · pdfx.akashpise.dev</Text>
          <Text style={s.pageFooterText}>Page 2 of 3</Text>
        </View>
      </Page>

      <Page size={t.page.size} orientation={t.page.orientation} style={s.page}>
        <View style={s.accentBar} />

        <View style={s.pageHeaderStrip}>
          <Text style={s.pageHeaderTitle}>Data Components</Text>
          <Text style={s.pageHeaderMeta}>Page 3 of 3</Text>
        </View>

        <View style={s.statsRow} wrap={false}>
          {stats.map((stat) => (
            <View key={stat.label} style={s.statBox}>
              <Text style={s.statValue}>{stat.value}</Text>
              <Text style={s.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <Text style={s.h2}>Data Table (H2)</Text>
        <View style={s.table} wrap={false}>
          <View style={s.tableHeader}>
            <Text style={s.tableHeaderCell}>Task</Text>
            <Text style={s.tableHeaderCell}>Status</Text>
            <Text style={s.tableHeaderCell}>Due</Text>
            <Text style={s.tableHeaderCell}>Owner</Text>
          </View>
          {sampleRows.map((row, i) => (
            <View key={row.item} style={[s.tableRow, i % 2 !== 0 ? s.tableRowEven : {}]}>
              <Text style={s.tableCell}>{row.item}</Text>
              <Text
                style={
                  row.status === 'Complete'
                    ? s.tableCellSuccess
                    : row.status === 'Blocked'
                      ? { ...s.tableCellMuted, color: t.colors.destructive, flex: 1 }
                      : s.tableCellMuted
                }
              >
                {row.status}
              </Text>
              <Text style={s.tableCellMuted}>{row.date}</Text>
              <Text style={s.tableCellMuted}>{row.owner}</Text>
            </View>
          ))}
        </View>

        <Text style={s.h3}>Card Component (H3)</Text>
        <View style={s.card} wrap={false}>
          <View style={s.cardHeader}>
            <Text style={s.cardTitle}>Project Details</Text>
          </View>
          {kvPairs.map((pair) => (
            <View key={pair.key} style={s.kvRow}>
              <Text style={s.kvKey}>{pair.key}</Text>
              <Text style={s.kvValue}>{pair.value}</Text>
            </View>
          ))}
        </View>

        <View style={s.divider} />

        <Text style={s.h3}>Spacing Tokens (H3)</Text>
        <Text style={s.bodyText}>
          Page margins: {t.spacing.page.marginTop}pt top · {t.spacing.page.marginRight}pt right ·{' '}
          {t.spacing.page.marginBottom}pt bottom · {t.spacing.page.marginLeft}pt left
        </Text>
        <Text style={s.bodyText}>
          Section gap: {t.spacing.sectionGap}pt · Paragraph gap: {t.spacing.paragraphGap}pt ·
          Component gap: {t.spacing.componentGap}pt
        </Text>

        <View style={s.pageFooter} fixed>
          <Text style={s.pageFooterText}>PDFx Theme Builder · pdfx.akashpise.dev</Text>
          <Text style={s.pageFooterText}>Page 3 of 3</Text>
        </View>
      </Page>
    </Document>
  );
}
