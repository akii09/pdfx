import type { PdfxTheme } from '@pdfx/shared';
import {
  Badge,
  DataTable,
  Divider,
  KeyValue,
  PageFooter,
  PageHeader,
  PdfGraph,
  PdfList,
  PdfxThemeProvider,
  Section,
  Stack,
  Text,
  usePdfxTheme,
} from '@pdfx/ui';
import { Document, Page, StyleSheet, View } from '@react-pdf/renderer';
import type { BaseReportData } from './report.types';

export interface ReportTemplateProps {
  theme?: PdfxTheme;
  data?: BaseReportData;
}

type ReportGraphVariant = 'bar' | 'horizontal-bar' | 'line' | 'area' | 'pie' | 'donut';

interface ReportLayoutProps {
  data: BaseReportData;
  titlePrefix: string;
  statusLabel: string;
  statusTone: 'success' | 'warning' | 'destructive' | 'info';
  graphVariant: ReportGraphVariant;
  graphTitle: string;
  graphSubtitle: string;
  graphLegend?: 'bottom' | 'right' | 'none';
  graphShowValues?: boolean;
  graphColors?: string[];
  graphData?: Array<{ label: string; value: number }>;
}

function toneColor(theme: PdfxTheme, tone: 'success' | 'warning' | 'destructive' | 'info') {
  if (tone === 'success') return theme.colors.success;
  if (tone === 'warning') return theme.colors.warning;
  if (tone === 'destructive') return theme.colors.destructive;
  return theme.colors.info;
}

export function ReportLayout({
  data,
  titlePrefix,
  statusLabel,
  statusTone,
  graphVariant,
  graphTitle,
  graphSubtitle,
  graphLegend = 'none',
  graphShowValues = false,
  graphColors,
  graphData,
}: ReportLayoutProps) {
  const theme = usePdfxTheme();
  const accent = toneColor(theme, statusTone);

  const styles = StyleSheet.create({
    page: {
      paddingTop: theme.spacing.page.marginTop,
      paddingLeft: theme.spacing.page.marginLeft,
      paddingRight: theme.spacing.page.marginRight,
      paddingBottom: theme.spacing.page.marginBottom,
      backgroundColor: theme.colors.background,
    },
    toolbar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    metricsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    metricCard: {
      width: '48.6%',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: theme.colors.border,
      borderRadius: theme.primitives.borderRadius.md,
      padding: 8,
      backgroundColor: theme.colors.background,
    },
    metricLabel: {
      fontSize: 8,
      textTransform: 'uppercase',
      color: theme.colors.mutedForeground,
      marginBottom: 2,
      letterSpacing: 0.5,
    },
    metricValue: {
      fontSize: 14,
      color: theme.colors.foreground,
      fontWeight: theme.primitives.fontWeights.bold,
      marginBottom: 2,
    },
    metricTrend: {
      fontSize: 9,
      color: theme.colors.mutedForeground,
    },
    graphShell: {
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: theme.colors.border,
      borderRadius: theme.primitives.borderRadius.md,
      padding: 12,
      backgroundColor: theme.colors.background,
    },
    twoColumn: {
      flexDirection: 'row',
      gap: 10,
      alignItems: 'flex-start',
    },
    col: {
      flex: 1,
    },
  });

  return (
    <Document title={`${titlePrefix} ${data.period}`}>
      <Page size="A4" style={styles.page}>
        <PageHeader
          variant="two-column"
          title={data.title}
          subtitle={`${titlePrefix} · ${data.subtitle}`}
          rightText={data.period}
          rightSubText={`Generated ${data.generatedAt}`}
          marginBottom={14}
        />

        <View style={styles.toolbar}>
          <Badge label={statusLabel} variant={statusTone} size="sm" />
          <Text variant="xs" color="mutedForeground" noMargin>
            Author: {data.author}
          </Text>
        </View>

        <Section variant="card" padding="md" noWrap>
          <Text variant="sm" transform="uppercase" color="mutedForeground">
            Executive Summary
          </Text>
          <View style={styles.metricsGrid}>
            {data.summary.map((metric) => (
              <View
                key={metric.label}
                style={[
                  styles.metricCard,
                  {
                    borderLeftWidth: 3,
                    borderLeftColor: metric.tone ? toneColor(theme, metric.tone) : accent,
                  },
                ]}
              >
                <Text style={styles.metricLabel} noMargin>
                  {metric.label}
                </Text>
                <Text style={styles.metricValue} noMargin>
                  {metric.value}
                </Text>
                {metric.trend ? (
                  <Badge label={metric.trend} size="sm" variant={metric.tone ?? 'info'} />
                ) : null}
              </View>
            ))}
          </View>
        </Section>

        <Section padding="md" noWrap>
          <Text variant="sm" transform="uppercase" color="mutedForeground">
            Performance Trend
          </Text>
          <View style={styles.graphShell}>
            <PdfGraph
              variant={graphVariant}
              data={graphData ?? data.series}
              title={graphTitle}
              subtitle={graphSubtitle}
              yLabel={undefined}
              xLabel={undefined}
              showGrid={graphVariant !== 'pie' && graphVariant !== 'donut'}
              showValues={graphShowValues}
              smooth={graphVariant === 'line' || graphVariant === 'area'}
              legend={graphLegend}
              height={200}
              colors={graphColors}
              fullWidth
              containerPadding={12}
              wrapperPadding={12}
              style={{ marginBottom: 0 }}
            />
          </View>
        </Section>

        <Section padding="md">
          <Text variant="sm" transform="uppercase" color="mutedForeground">
            Delivery Table
          </Text>
          <DataTable
            variant="compact"
            size="compact"
            stripe
            columns={[
              { key: 'label', header: 'Stream' },
              { key: 'owner', header: 'Owner' },
              { key: 'status', header: 'Status', align: 'center' },
              {
                key: 'progress',
                header: 'Progress',
                align: 'right',
                render: (value) => `${String(value)}%`,
              },
              { key: 'risk', header: 'Risk', align: 'right' },
            ]}
            data={data.rows}
            footer={{
              label: 'Totals',
              owner: '-',
              status: '-',
              progress: Math.round(
                data.rows.reduce((sum, row) => sum + row.progress, 0) /
                  Math.max(data.rows.length, 1)
              ),
              risk: '-',
            }}
          />
        </Section>

        <Section padding="md" variant="card" noWrap>
          <Text variant="sm" transform="uppercase" color="mutedForeground">
            Highlights & Risks
          </Text>
          <View style={styles.twoColumn}>
            <View style={styles.col}>
              <PdfList
                variant="checklist"
                items={data.highlights.map((item) => ({ text: item, checked: true }))}
                gap="sm"
              />
            </View>
            <View style={styles.col}>
              <KeyValue
                size="sm"
                divided
                items={[
                  {
                    key: 'Open Risks',
                    value: `${data.rows.filter((r) => r.risk !== 'Low').length}`,
                  },
                  {
                    key: 'On-Track Streams',
                    value: `${data.rows.filter((r) => r.status === 'On Track').length}/${data.rows.length}`,
                  },
                  {
                    key: 'Avg Progress',
                    value: `${Math.round(
                      data.rows.reduce((sum, row) => sum + row.progress, 0) /
                        Math.max(data.rows.length, 1)
                    )}%`,
                  },
                ]}
              />
            </View>
          </View>
        </Section>

        <PageFooter
          variant="three-column"
          leftText="Confidential — Internal Use"
          centerText="Generated with PDFx"
          rightText="Page 1 of 1"
          sticky
          pagePadding={theme.spacing.page.marginLeft}
        />
      </Page>
    </Document>
  );
}

export function ReportTemplateFrame({
  theme,
  data,
  titlePrefix,
  statusLabel,
  statusTone,
  graphVariant,
  graphTitle,
  graphSubtitle,
  graphLegend,
  graphShowValues,
  graphColors,
  graphData,
}: ReportTemplateProps & {
  titlePrefix: string;
  statusLabel: string;
  statusTone: 'success' | 'warning' | 'destructive' | 'info';
  graphVariant: ReportGraphVariant;
  graphTitle: string;
  graphSubtitle: string;
  graphLegend?: 'bottom' | 'right' | 'none';
  graphShowValues?: boolean;
  graphColors?: string[];
  graphData?: Array<{ label: string; value: number }>;
}) {
  if (!data) return null;

  return (
    <PdfxThemeProvider theme={theme}>
      <ReportLayout
        data={data}
        titlePrefix={titlePrefix}
        statusLabel={statusLabel}
        statusTone={statusTone}
        graphVariant={graphVariant}
        graphTitle={graphTitle}
        graphSubtitle={graphSubtitle}
        graphLegend={graphLegend}
        graphShowValues={graphShowValues}
        graphColors={graphColors}
        graphData={graphData}
      />
    </PdfxThemeProvider>
  );
}
