import { ReportTemplateFrame, type ReportTemplateProps } from './report-layout';
import type { BaseReportData } from './report.types';

const sampleSecurityData: BaseReportData = {
  title: 'Security Posture Report',
  subtitle: 'Vulnerability trends, control maturity, and remediation health',
  generatedAt: 'February 23, 2026',
  period: 'Sprint 05, 2026',
  author: 'Security Engineering',
  summary: [
    { label: 'Critical Vulns', value: '2', trend: '-3 from last sprint', tone: 'success' },
    { label: 'Patch SLA', value: '92.0%', trend: '+5.3 pts', tone: 'success' },
    { label: 'Open Findings', value: '41', trend: '+4', tone: 'warning' },
    { label: 'Control Score', value: '84/100', trend: '+2 pts', tone: 'info' },
  ],
  rows: [
    {
      label: 'Identity Hardening',
      owner: 'E. Brown',
      status: 'On Track',
      progress: 87,
      risk: 'Low',
    },
    { label: 'Secrets Rotation', owner: 'P. Nair', status: 'At Risk', progress: 58, risk: 'High' },
    {
      label: 'Dependency Scanning',
      owner: 'I. Shah',
      status: 'On Track',
      progress: 81,
      risk: 'Medium',
    },
    { label: 'WAF Policy', owner: 'S. Reed', status: 'On Track', progress: 76, risk: 'Low' },
  ],
  series: [
    { label: 'W1', value: 61 },
    { label: 'W2', value: 63 },
    { label: 'W3', value: 64 },
    { label: 'W4', value: 66 },
    { label: 'W5', value: 67 },
    { label: 'W6', value: 68 },
    { label: 'W7', value: 69 },
    { label: 'W8', value: 71 },
    { label: 'W9', value: 72 },
    { label: 'W10', value: 74 },
    { label: 'W11', value: 76 },
    { label: 'W12', value: 78 },
  ],
  highlights: [
    'Critical vulnerabilities reduced through mandatory patch windows.',
    'Secrets rotation remains the highest-risk stream and needs additional staffing.',
    'External penetration test scheduled for next sprint to validate fixes.',
  ],
};

export function SecurityReportDocument({ theme, data = sampleSecurityData }: ReportTemplateProps) {
  return (
    <ReportTemplateFrame
      theme={theme}
      data={data}
      titlePrefix="Security Report"
      statusLabel="Security: Action Needed"
      statusTone="destructive"
      graphVariant="donut"
      graphTitle="Open risk distribution"
      graphSubtitle="High/Medium/Low workload share"
      graphLegend="right"
      graphShowValues
      graphColors={['#DC2626', '#F59E0B', '#16A34A', '#0EA5E9']}
      graphData={[
        { label: 'High Risk', value: 14 },
        { label: 'Medium Risk', value: 17 },
        { label: 'Low Risk', value: 8 },
        { label: 'Info', value: 4 },
      ]}
    />
  );
}
