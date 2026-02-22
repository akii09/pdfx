import { describe, expect, it } from 'vitest';
import { PdfForm } from './form';

/** Recursively search a react-pdf element tree for a text value. */
function findText(node: unknown, value: string): boolean {
  if (!node || typeof node !== 'object') return false;
  if (Array.isArray(node)) return node.some((c: unknown) => findText(c, value));
  const n = node as { props?: { children?: unknown } };
  if (n.props?.children === value) return true;
  const children = Array.isArray(n.props?.children) ? n.props.children : [n.props?.children];
  return children.some((c: unknown) => findText(c, value));
}

const sampleGroups = [
  {
    title: 'Personal Details',
    fields: [
      { label: 'Full Name', hint: 'First and last name' },
      { label: 'Email Address' },
      { label: 'Phone Number', hint: '+1 (555) 000-0000' },
      { label: 'Date of Birth', hint: 'DD/MM/YYYY' },
    ],
  },
];

describe('PdfForm', () => {
  it('renders without crashing', () => {
    const result = PdfForm({ groups: sampleGroups });
    expect(result).toBeDefined();
  });

  it('renders form title', () => {
    const result = PdfForm({ groups: sampleGroups, title: 'Application Form' });
    expect(findText(result, 'Application Form')).toBe(true);
  });

  it('renders form subtitle', () => {
    const result = PdfForm({ groups: sampleGroups, subtitle: 'Please fill in all fields.' });
    expect(findText(result, 'Please fill in all fields.')).toBe(true);
  });

  it('renders group title', () => {
    const result = PdfForm({ groups: sampleGroups });
    expect(findText(result, 'Personal Details')).toBe(true);
  });

  it('renders all field labels', () => {
    const result = PdfForm({ groups: sampleGroups });
    for (const field of sampleGroups[0].fields) {
      expect(findText(result, field.label)).toBe(true);
    }
  });

  it('renders field hints', () => {
    const result = PdfForm({ groups: sampleGroups });
    expect(findText(result, 'DD/MM/YYYY')).toBe(true);
    expect(findText(result, 'First and last name')).toBe(true);
  });

  it('renders without title', () => {
    const result = PdfForm({ groups: sampleGroups });
    expect(findText(result, 'Application Form')).toBe(false);
  });

  it('renders multiple groups', () => {
    const groups = [
      { title: 'Section A', fields: [{ label: 'Field A' }] },
      { title: 'Section B', fields: [{ label: 'Field B' }] },
    ];
    const result = PdfForm({ groups });
    expect(findText(result, 'Section A')).toBe(true);
    expect(findText(result, 'Section B')).toBe(true);
    expect(findText(result, 'Field A')).toBe(true);
    expect(findText(result, 'Field B')).toBe(true);
  });

  it('renders two-column layout', () => {
    const groups = [
      {
        layout: 'two-column' as const,
        fields: [
          { label: 'First Name' },
          { label: 'Last Name' },
          { label: 'City' },
          { label: 'Zip Code' },
        ],
      },
    ];
    const result = PdfForm({ groups });
    expect(findText(result, 'First Name')).toBe(true);
    expect(findText(result, 'Last Name')).toBe(true);
  });

  it('renders three-column layout', () => {
    const groups = [
      {
        layout: 'three-column' as const,
        fields: [{ label: 'Day' }, { label: 'Month' }, { label: 'Year' }],
      },
    ];
    const result = PdfForm({ groups });
    expect(findText(result, 'Day')).toBe(true);
    expect(findText(result, 'Month')).toBe(true);
    expect(findText(result, 'Year')).toBe(true);
  });

  it('renders with labelPosition left', () => {
    const result = PdfForm({ groups: sampleGroups, labelPosition: 'left' });
    expect(findText(result, 'Full Name')).toBe(true);
  });

  it('applies box variant without crashing', () => {
    const result = PdfForm({ groups: sampleGroups, variant: 'box' });
    expect(result).toBeDefined();
  });

  it('applies outlined variant without crashing', () => {
    const result = PdfForm({ groups: sampleGroups, variant: 'outlined' });
    expect(result).toBeDefined();
  });

  it('applies ghost variant without crashing', () => {
    const result = PdfForm({ groups: sampleGroups, variant: 'ghost' });
    expect(result).toBeDefined();
  });

  it('applies style override', () => {
    const result = PdfForm({ groups: sampleGroups, style: { opacity: 0.8 } });
    const styleArr = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    const last = styleArr[styleArr.length - 1] as { opacity?: number };
    expect(last.opacity).toBe(0.8);
  });
});
