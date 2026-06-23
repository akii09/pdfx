import { describe, expect, it } from 'vitest';
import { PdfSignatureBlock } from './signature';

describe('PdfSignatureBlock', () => {
  const variants = ['single', 'double', 'inline'] as const;

  it('renders with no props (uses default label)', () => {
    // signature.tsx:114 — label defaults to 'Signature'.
    expect(() => PdfSignatureBlock({})).not.toThrow();
  });

  it('renders all variants with base props', () => {
    for (const variant of variants) {
      expect(() => PdfSignatureBlock({ variant })).not.toThrow();
    }
  });

  it('renders single with full signer details', () => {
    expect(() =>
      PdfSignatureBlock({
        variant: 'single',
        label: 'Signed by',
        name: 'Ada Lovelace',
        title: 'CTO',
        date: '2026-01-15',
      })
    ).not.toThrow();
  });

  it('renders double with signers tuple', () => {
    expect(() =>
      PdfSignatureBlock({
        variant: 'double',
        signers: [
          { label: 'Prepared by', name: 'A', title: 'Analyst', date: '2026-01-15' },
          { label: 'Approved by', name: 'B', title: 'Director', date: '2026-01-20' },
        ],
      })
    ).not.toThrow();
  });

  it('renders double without explicit signers (uses defaults)', () => {
    // signature.tsx:139 — default signers used when prop omitted.
    expect(() => PdfSignatureBlock({ variant: 'double' })).not.toThrow();
  });

  it('renders inline with and without name', () => {
    expect(() =>
      PdfSignatureBlock({ variant: 'inline', label: 'Signature', name: 'Ada' })
    ).not.toThrow();
    expect(() => PdfSignatureBlock({ variant: 'inline', label: 'X' })).not.toThrow();
  });

  it('accepts a style override on every variant', () => {
    for (const variant of variants) {
      expect(() => PdfSignatureBlock({ variant, style: { marginTop: 20 } })).not.toThrow();
    }
  });
});
