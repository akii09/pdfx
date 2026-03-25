import { describe, expect, it } from 'vitest';
import { PdfSignatureBlock } from './signature';

describe('PdfSignatureBlock', () => {
  it('renders without throwing', () => {
    expect(() => PdfSignatureBlock({})).not.toThrow();
  });
  it('accepts variant prop', () => {
    expect(() => PdfSignatureBlock({ variant: 'double' })).not.toThrow();
  });
});
