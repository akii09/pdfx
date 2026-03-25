import { ReportTemplateFrame, type ReportTemplateProps } from './report-layout';
import type { BaseReportData } from './report.types';

const sampleOperationsData: BaseReportData = {
  title: 'Monthly Operations Report',
  subtitle: 'Delivery throughput, SLA adherence, and backlog visibility',
  generatedAt: 'February 23, 2026',
  period: 'February 2026',
  author: 'Delivery Office',
  summary: [
    { label: 'Tickets Closed', value: '1,284', trend: '+9.8% MoM', tone: 'success' },
    { label: 'SLA Hit Rate', value: '96.1%', trend: '+1.4 pts', tone: 'success' },
    { label: 'Backlog', value: '214', trend: '+6.0%', tone: 'warning' },
    { label: 'Escalations', value: '17', trend: '-18.5%', tone: 'success' },
  ],
  rows: [
    { label: 'L1 Support', owner: 'N. Mehta', status: 'On Track', progress: 91, risk: 'Low' },
    { label: 'L2 Support', owner: 'D. Chen', status: 'On Track', progress: 85, risk: 'Low' },
    { label: 'Incident Queue', owner: 'R. Walker', status: 'At Risk', progress: 66, risk: 'High' },
    {
      label: 'Automation Rollout',
      owner: 'M. Roy',
      status: 'On Track',
      progress: 77,
      risk: 'Medium',
    },
  ],
  series: [
    { label: 'W1', value: 69 },
    { label: 'W2', value: 71 },
    { label: 'W3', value: 73 },
    { label: 'W4', value: 74 },
    { label: 'W5', value: 75 },
    { label: 'W6', value: 76 },
    { label: 'W7', value: 78 },
    { label: 'W8', value: 79 },
    { label: 'W9', value: 78 },
    { label: 'W10', value: 80 },
    { label: 'W11', value: 81 },
    { label: 'W12', value: 83 },
  ],
  highlights: [
    'SLA improved after shift rebalancing and incident triage changes.',
    'Backlog grew in week 4 due to release-related ticket surge.',
    'Incident queue remediation plan has executive sponsorship and budget.',
  ],
};

export function OperationsReportDocument({
  theme,
  data = sampleOperationsData,
}: ReportTemplateProps) {
  return (
    <ReportTemplateFrame
      theme={theme}
      data={data}
      titlePrefix="Operations Report"
      statusLabel="Ops: Watch"
      statusTone="warning"
      graphVariant="horizontal-bar"
      graphTitle="Throughput by week"
      graphSubtitle="Resolved workload distribution"
      graphLegend="none"
      graphShowValues
      graphColors={['#2563EB']}
      graphData={[
        { label: 'Incident', value: 66 },
        { label: 'Automation', value: 77 },
        { label: 'L2 Support', value: 85 },
        { label: 'L1 Support', value: 91 },
      ]}
    />
  );
}
