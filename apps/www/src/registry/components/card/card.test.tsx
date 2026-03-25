import { describe, expect, it } from 'vitest';
import { PdfCard } from './card';

describe('PdfCard', () => {
  it('renders without throwing', () => {
    expect(() => PdfCard({ children: 'Content' })).not.toThrow();
  });
  it('accepts variant prop', () => {
    expect(() =>
      PdfCard({ title: 'Test', variant: 'bordered', children: 'Content' })
    ).not.toThrow();
  });
});
