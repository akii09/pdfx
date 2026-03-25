import { describe, expect, it } from 'vitest';
import { PdfAlert } from './alert';

describe('PdfAlert', () => {
  it('renders without throwing', () => {
    expect(() => PdfAlert({ title: 'Test' })).not.toThrow();
  });
  it('accepts variant prop', () => {
    expect(() => PdfAlert({ title: 'Test', variant: 'success' })).not.toThrow();
  });
});
