export interface SummaryMetric {
  label: string;
  value: string;
  trend?: string;
  tone?: 'success' | 'warning' | 'destructive' | 'info';
}

export type ReportRow = Record<string, unknown> & {
  label: string;
  owner: string;
  status: string;
  progress: number;
  risk?: string;
};

export interface ReportSeriesPoint {
  label: string;
  value: number;
}

export interface BaseReportData {
  title: string;
  subtitle: string;
  generatedAt: string;
  period: string;
  author: string;
  summary: SummaryMetric[];
  rows: ReportRow[];
  series: ReportSeriesPoint[];
  highlights: string[];
}
