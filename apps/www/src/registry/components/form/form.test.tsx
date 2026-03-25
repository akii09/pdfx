import { describe, expect, it } from 'vitest';
import { PdfForm } from './form';

describe('PdfForm', () => {
  it('renders without throwing', () => {
    expect(() => PdfForm({ groups: [] })).not.toThrow();
  });
  it('accepts layout prop', () => {
    expect(() => PdfForm({ groups: [], variant: 'box' })).not.toThrow();
  });
});
