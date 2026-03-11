import { ReportTemplateFrame, type ReportTemplateProps } from './report-layout';
import type { BaseReportData } from './report.types';

const sampleMarketingData: BaseReportData = {
  title: 'Growth & Marketing Report',
  subtitle: 'Pipeline, conversion efficiency, and channel performance',
  generatedAt: 'February 23, 2026',
  period: 'Campaign Cycle 2026-02',
  author: 'Growth Team',
  summary: [
    { label: 'MQLs', value: '3,940', trend: '+22.1% cycle', tone: 'success' },
    { label: 'CAC', value: '$118', trend: '-7.4%', tone: 'success' },
    { label: 'Win Rate', value: '28.6%', trend: '+1.1 pts', tone: 'info' },
    { label: 'Churn Risk', value: '6.2%', trend: '+0.8 pts', tone: 'warning' },
  ],
  rows: [
    { label: 'SEO', owner: 'H. Evans', status: 'On Track', progress: 84, risk: 'Low' },
    { label: 'Paid Search', owner: 'K. Martin', status: 'On Track', progress: 80, risk: 'Low' },
    { label: 'Lifecycle Email', owner: 'V. Lee', status: 'At Risk', progress: 64, risk: 'Medium' },
    {
      label: 'Partner Referrals',
      owner: 'J. Gomez',
      status: 'On Track',
      progress: 75,
      risk: 'Medium',
    },
  ],
  series: [
    { label: 'W1', value: 55 },
    { label: 'W2', value: 57 },
    { label: 'W3', value: 59 },
    { label: 'W4', value: 60 },
    { label: 'W5', value: 62 },
    { label: 'W6', value: 63 },
    { label: 'W7', value: 65 },
    { label: 'W8', value: 67 },
    { label: 'W9', value: 66 },
    { label: 'W10', value: 68 },
    { label: 'W11', value: 70 },
    { label: 'W12', value: 72 },
  ],
  highlights: [
    'Channel mix improved CAC while maintaining lead quality.',
    'Lifecycle email workflow has deliverability issues under investigation.',
    'Referral program is producing higher-intent pipeline with lower cost.',
  ],
};

export function MarketingReportDocument({
  theme,
  data = sampleMarketingData,
}: ReportTemplateProps) {
  return (
    <ReportTemplateFrame
      theme={theme}
      data={data}
      titlePrefix="Growth Report"
      statusLabel="Growth: Strong"
      statusTone="success"
      graphVariant="bar"
      graphTitle="Pipeline build by week"
      graphSubtitle="Demand creation output trend"
      graphLegend="none"
      graphShowValues
      graphColors={['#0EA5E9']}
    />
  );
}
