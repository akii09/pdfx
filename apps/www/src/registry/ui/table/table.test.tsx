import { describe, expect, it } from 'vitest';
import { Table, TableBody, TableCell, TableHeader, TableRow } from './table';

describe('Table', () => {
  it('renders without throwing', () => {
    expect(() => Table({ children: null })).not.toThrow();
  });
  it('accepts variant prop', () => {
    expect(() => Table({ variant: 'bordered', children: null })).not.toThrow();
  });
});

describe('TableRow / TableCell', () => {
  it('TableRow renders without throwing', () => {
    expect(() => TableRow({ children: null })).not.toThrow();
  });
  it('TableCell renders without throwing', () => {
    expect(() => TableCell({ children: 'Value' })).not.toThrow();
  });
});

describe('TableHeader / TableBody', () => {
  it('TableHeader renders without throwing', () => {
    expect(() => TableHeader({ children: null })).not.toThrow();
  });
  it('TableBody renders without throwing', () => {
    expect(() => TableBody({ children: null })).not.toThrow();
  });
});
