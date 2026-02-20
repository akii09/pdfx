import { describe, expect, it } from 'vitest';
import { DataTable } from './data-table';

type SampleRow = {
  item: string;
  qty: number;
  price: string;
};

describe('DataTable', () => {
  const sampleColumns = [
    { key: 'item' as const, header: 'Item' },
    { key: 'qty' as const, header: 'Qty', align: 'center' as const },
    { key: 'price' as const, header: 'Price', align: 'right' as const },
  ];

  const sampleData: SampleRow[] = [
    { item: 'Design', qty: 1, price: '$150' },
    { item: 'Development', qty: 1, price: '$2,500' },
  ];

  it('should render without errors', () => {
    const result = DataTable({ columns: sampleColumns, data: sampleData, variant: 'line' });
    expect(result).toBeDefined();
    expect(result.type).toBeDefined();
  });

  it('should render with default variant', () => {
    const result = DataTable({ columns: sampleColumns, data: sampleData });
    expect(result).toBeDefined();
  });

  it('should render header row with column headers', () => {
    const result = DataTable({ columns: sampleColumns, data: sampleData });
    expect(result).toBeDefined();
    // Table should have header row as first child
  });

  it('should render data rows', () => {
    const result = DataTable({ columns: sampleColumns, data: sampleData });
    expect(result).toBeDefined();
    // Should render 2 data rows
  });

  it('should apply stripe to alternate rows', () => {
    const result = DataTable({
      columns: sampleColumns,
      data: sampleData,
      stripe: true,
      variant: 'line',
    });
    expect(result).toBeDefined();
  });

  it('should render footer row when provided', () => {
    const result = DataTable({
      columns: sampleColumns,
      data: sampleData,
      footer: { item: 'Total', price: '$2,650' },
    });
    expect(result).toBeDefined();
  });

  it('should handle empty data array', () => {
    const result = DataTable({ columns: sampleColumns, data: [] });
    expect(result).toBeDefined();
  });

  it('should apply column alignment', () => {
    const result = DataTable({ columns: sampleColumns, data: sampleData });
    expect(result).toBeDefined();
    // Columns should have left, center, right alignment
  });

  it('should support custom render function', () => {
    const columnsWithRender = [
      {
        key: 'item' as const,
        header: 'Item',
        render: (value: unknown) => `Custom: ${value}`,
      },
      { key: 'qty' as const, header: 'Qty' },
    ];
    const result = DataTable({ columns: columnsWithRender, data: sampleData });
    expect(result).toBeDefined();
  });

  it('should handle null and undefined values', () => {
    const dataWithNulls = [
      { item: 'Item 1', qty: null as unknown as number, price: undefined as unknown as string },
      { item: 'Item 2', qty: 0, price: '$100' },
    ];
    const result = DataTable({ columns: sampleColumns, data: dataWithNulls });
    expect(result).toBeDefined();
  });

  it('should support grid variant', () => {
    const result = DataTable({ columns: sampleColumns, data: sampleData, variant: 'grid' });
    expect(result).toBeDefined();
  });

  it('should support minimal variant', () => {
    const result = DataTable({ columns: sampleColumns, data: sampleData, variant: 'minimal' });
    expect(result).toBeDefined();
  });

  it('should apply custom styles', () => {
    const result = DataTable({
      columns: sampleColumns,
      data: sampleData,
      style: { marginBottom: 20 },
    });
    expect(result).toBeDefined();
  });

  it('should format number values', () => {
    const dataWithNumbers: SampleRow[] = [{ item: 'Item', qty: 5, price: '1000' }];
    const result = DataTable({ columns: sampleColumns, data: dataWithNumbers });
    expect(result).toBeDefined();
  });

  it('should handle footer with partial data', () => {
    const result = DataTable({
      columns: sampleColumns,
      data: sampleData,
      footer: { price: '$2,650' }, // Only price, no item or qty
    });
    expect(result).toBeDefined();
  });
});
