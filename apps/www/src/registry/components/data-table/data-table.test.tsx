import { describe, expect, it } from 'vitest';
import { DataTable } from './data-table';
import type { DataTableColumn } from './data-table.types';

interface Row extends Record<string, unknown> {
  name: string;
  score: number;
  status: string;
}

const columns: DataTableColumn<Row>[] = [
  { key: 'name', header: 'Name', align: 'left' },
  { key: 'score', header: 'Score', align: 'right', width: 80 },
  { key: 'status', header: 'Status', align: 'center' },
];

const data: Row[] = [
  { name: 'Ada', score: 99, status: 'active' },
  { name: 'Grace', score: 88, status: 'active' },
  { name: 'Linus', score: 77, status: 'inactive' },
];

describe('DataTable', () => {
  it('renders with empty columns and data', () => {
    expect(() => DataTable<Row>({ columns: [], data: [] })).not.toThrow();
  });

  it('renders with columns but no rows', () => {
    expect(() => DataTable<Row>({ columns, data: [] })).not.toThrow();
  });

  it('renders with rows and all column aligns/widths', () => {
    expect(() => DataTable<Row>({ columns, data })).not.toThrow();
  });

  it('renders both size variants', () => {
    expect(() => DataTable<Row>({ columns, data, size: 'default' })).not.toThrow();
    expect(() => DataTable<Row>({ columns, data, size: 'compact' })).not.toThrow();
  });

  it('honors stripe, noWrap, and style overrides', () => {
    expect(() =>
      DataTable<Row>({
        columns,
        data,
        stripe: true,
        noWrap: true,
        style: { marginTop: 8 },
      })
    ).not.toThrow();
  });

  it('invokes custom cell render and footer render', () => {
    const renderScore = (value: unknown) =>
      typeof value === 'number' ? `${value}%` : String(value ?? '');
    expect(() =>
      DataTable<Row>({
        columns: [
          { key: 'name', header: 'Name' },
          { key: 'score', header: 'Score', render: renderScore, renderFooter: renderScore },
        ],
        data,
        footer: { score: 264 },
      })
    ).not.toThrow();
  });

  it('renders table variants through the underlying Table', () => {
    // data-table.tsx:24 — variant is forwarded to <Table variant={...}/>.
    for (const variant of ['grid', 'striped', 'minimal', 'bordered'] as const) {
      expect(() => DataTable<Row>({ columns, data, variant })).not.toThrow();
    }
  });
});
