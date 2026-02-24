import { ReportTemplateFrame, type ReportTemplateProps } from './report-layout';
import type { BaseReportData } from './report.types';

const sampleFinancialData: BaseReportData = {
  title: 'Quarterly Financial Report',
  subtitle: 'Revenue, margin, and expense control overview',
  generatedAt: 'February 23, 2026',
  period: 'Q1 2026',
  author: 'Finance Ops',
  summary: [
    { label: 'Revenue', value: '$2.48M', trend: '+14.2% QoQ', tone: 'success' },
    { label: 'Gross Margin', value: '61.8%', trend: '+2.1 pts', tone: 'success' },
    { label: 'Opex', value: '$0.93M', trend: '-3.4% QoQ', tone: 'success' },
    { label: 'Runway', value: '22 months', trend: 'Stable', tone: 'info' },
  ],
  rows: [
    { label: 'Enterprise Sales', owner: 'A. Patel', status: 'On Track', progress: 88, risk: 'Low' },
    { label: 'SMB Sales', owner: 'L. Khan', status: 'On Track', progress: 79, risk: 'Medium' },
    { label: 'Collections', owner: 'J. Reyes', status: 'At Risk', progress: 63, risk: 'High' },
    {
      label: 'Cost Optimization',
      owner: 'K. Singh',
      status: 'On Track',
      progress: 82,
      risk: 'Low',
    },
  ],
  series: [
    { label: 'W1', value: 72 },
    { label: 'W2', value: 74 },
    { label: 'W3', value: 76 },
    { label: 'W4', value: 77 },
    { label: 'W5', value: 79 },
    { label: 'W6', value: 80 },
    { label: 'W7', value: 81 },
    { label: 'W8', value: 83 },
    { label: 'W9', value: 82 },
    { label: 'W10', value: 84 },
    { label: 'W11', value: 86 },
    { label: 'W12', value: 88 },
  ],
  highlights: [
    'Revenue accelerated after enterprise expansion campaign launch.',
    'Gross margin improved due to infrastructure cost renegotiation.',
    'Collections requires executive follow-up on two overdue accounts.',
  ],
};

export function FinancialReportDocument({
  theme,
  data = sampleFinancialData,
}: ReportTemplateProps) {
  return (
    <ReportTemplateFrame
      theme={theme}
      data={data}
      titlePrefix="Financial Report"
      statusLabel="Finance: Healthy"
      statusTone="success"
      graphVariant="line"
      graphTitle="Revenue trajectory"
      graphSubtitle="Quarterly weighted revenue index"
      graphLegend="none"
      graphColors={['#0F172A']}
    />
  );
}
