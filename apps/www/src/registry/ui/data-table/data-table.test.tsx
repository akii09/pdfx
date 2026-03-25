import { describe, expect, it } from 'vitest';
import { DataTable } from './data-table';

describe('DataTable', () => {
  it('renders without throwing', () => {
    expect(() => DataTable({ columns: [], data: [] })).not.toThrow();
  });
  it('accepts size prop', () => {
    expect(() => DataTable({ columns: [], data: [], size: 'compact' })).not.toThrow();
  });
});
