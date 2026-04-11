import { describe, expect, it } from 'vitest';
import { PdfForm } from './form';
import type { PdfFormGroup } from './form.types';

describe('PdfForm', () => {
  const variants = ['underline', 'box', 'outlined', 'ghost'] as const;
  const layouts = ['single', 'two-column', 'three-column'] as const;

  const baseGroup: PdfFormGroup = {
    title: 'Contact',
    fields: [
      { label: 'Name' },
      { label: 'Email', hint: 'you@example.com' },
      { label: 'Phone', height: 24 },
    ],
  };

  it('renders with empty groups array', () => {
    expect(() => PdfForm({ groups: [] })).not.toThrow();
  });

  it('renders all variants', () => {
    for (const variant of variants) {
      expect(() => PdfForm({ groups: [baseGroup], variant })).not.toThrow();
    }
  });

  it('renders all column layouts', () => {
    for (const layout of layouts) {
      expect(() => PdfForm({ groups: [{ ...baseGroup, layout }] })).not.toThrow();
    }
  });

  it('renders both labelPositions', () => {
    for (const labelPosition of ['above', 'left'] as const) {
      expect(() => PdfForm({ groups: [baseGroup], labelPosition })).not.toThrow();
    }
  });

  it('renders with title/subtitle (adds form divider)', () => {
    // form.tsx:108 — title or subtitle triggers the formDivider row.
    expect(() =>
      PdfForm({ title: 'Application', subtitle: 'Fill every field', groups: [baseGroup] })
    ).not.toThrow();
    expect(() => PdfForm({ title: 'Application', groups: [baseGroup] })).not.toThrow();
    expect(() => PdfForm({ subtitle: 'Only', groups: [baseGroup] })).not.toThrow();
  });

  it('renders groups with no title, empty fields, and uneven column chunks', () => {
    expect(() => PdfForm({ groups: [{ fields: [] }] })).not.toThrow();
    expect(() =>
      PdfForm({
        groups: [
          { fields: [{ label: 'A' }], layout: 'three-column' },
          { fields: [{ label: 'A' }, { label: 'B' }], layout: 'three-column' },
          {
            fields: [
              { label: 'A' },
              { label: 'B' },
              { label: 'C' },
              { label: 'D' },
              { label: 'E' },
            ],
            layout: 'two-column',
          },
        ],
      })
    ).not.toThrow();
  });

  it('accepts noWrap and a style override', () => {
    expect(() =>
      PdfForm({ groups: [baseGroup], noWrap: true, style: { padding: 12 } })
    ).not.toThrow();
  });
});
