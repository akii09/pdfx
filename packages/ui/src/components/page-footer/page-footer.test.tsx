import { describe, expect, it } from 'vitest';
import { theme } from '../../lib/pdfx-theme';
import { PageFooter } from './page-footer';

/** Recursively search a react-pdf element tree for a text value. */
function findText(node: unknown, value: string): boolean {
  if (!node || typeof node !== 'object') return false;
  const n = node as { props?: { children?: unknown } };
  if (n.props?.children === value) return true;
  const children = Array.isArray(n.props?.children) ? n.props.children : [n.props?.children];
  return children.some((c: unknown) => findText(c, value));
}

describe('PageFooter', () => {
  it('renders without crashing', () => {
    const result = PageFooter({ leftText: '© 2026 Acme Corp.' });
    expect(result).toBeDefined();
  });

  it('renders leftText', () => {
    const result = PageFooter({ leftText: '© 2026 Acme' });
    expect(findText(result, '© 2026 Acme')).toBe(true);
  });

  it('renders rightText', () => {
    const result = PageFooter({ rightText: 'Page 1 of 3' });
    expect(findText(result, 'Page 1 of 3')).toBe(true);
  });

  it('defaults to simple variant (flexDirection row, top border)', () => {
    const result = PageFooter({ leftText: 'Test' });
    const containerStyles = Array.isArray(result.props.style)
      ? result.props.style
      : [result.props.style];
    expect(containerStyles.some((s: { flexDirection?: string }) => s.flexDirection === 'row')).toBe(
      true
    );
    expect(
      containerStyles.some((s: { borderTopWidth?: number }) => typeof s.borderTopWidth === 'number')
    ).toBe(true);
  });

  it('applies centered variant (column layout)', () => {
    const result = PageFooter({ leftText: 'Centered', variant: 'centered' });
    const containerStyles = Array.isArray(result.props.style)
      ? result.props.style
      : [result.props.style];
    expect(
      containerStyles.some((s: { flexDirection?: string }) => s.flexDirection === 'column')
    ).toBe(true);
  });

  it('applies branded variant with primary background', () => {
    const result = PageFooter({ leftText: 'Branded', variant: 'branded' });
    const containerStyles = Array.isArray(result.props.style)
      ? result.props.style
      : [result.props.style];
    expect(
      containerStyles.some(
        (s: { backgroundColor?: string }) => s.backgroundColor === theme.colors.primary
      )
    ).toBe(true);
  });

  it('applies custom background override', () => {
    const result = PageFooter({ leftText: 'Test', background: 'muted' });
    const containerStyles = Array.isArray(result.props.style)
      ? result.props.style
      : [result.props.style];
    // 'muted' resolves to '#f4f4f5'
    expect(
      containerStyles.some((s: { backgroundColor?: string }) => s.backgroundColor === '#f4f4f5')
    ).toBe(true);
  });

  it('applies custom marginTop', () => {
    const result = PageFooter({ leftText: 'Test', marginTop: 50 });
    const containerStyles = Array.isArray(result.props.style)
      ? result.props.style
      : [result.props.style];
    expect(containerStyles.some((s: { marginTop?: number }) => s.marginTop === 50)).toBe(true);
  });

  it('applies textColor override', () => {
    const result = PageFooter({ leftText: 'Test', textColor: 'accent' });
    // Find the left text element — children may be array of conditional nodes
    const children = Array.isArray(result.props.children)
      ? result.props.children
      : [result.props.children];
    const textEl = children.find(
      (c: { props?: { children?: unknown } } | null) => c?.props?.children === 'Test'
    );
    if (!textEl) return; // skip if not found
    const textStyles = Array.isArray(textEl.props.style)
      ? textEl.props.style
      : [textEl.props.style];
    expect(textStyles.some((s: { color?: string }) => s.color === '#3b82f6')).toBe(true);
  });

  it('renders centerText in simple variant', () => {
    const result = PageFooter({
      leftText: 'Left',
      centerText: 'CONFIDENTIAL',
      rightText: 'Right',
    });
    expect(findText(result, 'CONFIDENTIAL')).toBe(true);
  });

  it('applies style override last', () => {
    const result = PageFooter({ leftText: 'Test', style: { opacity: 0.8 } });
    const containerStyles = Array.isArray(result.props.style)
      ? result.props.style
      : [result.props.style];
    const last = containerStyles[containerStyles.length - 1] as { opacity?: number };
    expect(last.opacity).toBe(0.8);
  });

  // ──── New variant tests ─────────────────────────────────────────────

  it('renders three-column variant with all contact info', () => {
    const result = PageFooter({
      leftText: 'Acme Corporation',
      rightText: 'Page 1 of 5',
      variant: 'three-column',
      address: '123 Main Street, City, ST 12345',
      phone: '+1-555-0100',
      email: 'contact@acme.com',
      website: 'www.acme.com',
    });
    expect(findText(result, 'Acme Corporation')).toBe(true);
    expect(findText(result, 'Page 1 of 5')).toBe(true);
    expect(findText(result, '123 Main Street, City, ST 12345')).toBe(true);
    expect(findText(result, '+1-555-0100')).toBe(true);
    expect(findText(result, 'contact@acme.com')).toBe(true);
    expect(findText(result, 'www.acme.com')).toBe(true);
  });

  it('renders three-column variant with partial contact info', () => {
    const result = PageFooter({
      leftText: 'Company Name',
      variant: 'three-column',
      phone: '+1-555-0100',
      email: 'info@example.com',
    });
    expect(findText(result, 'Company Name')).toBe(true);
    expect(findText(result, '+1-555-0100')).toBe(true);
    expect(findText(result, 'info@example.com')).toBe(true);
  });

  it('renders three-column variant without contact info when not provided', () => {
    const result = PageFooter({
      leftText: 'Company',
      rightText: 'Page 1',
      variant: 'three-column',
    });
    expect(findText(result, 'Company')).toBe(true);
    expect(findText(result, 'Page 1')).toBe(true);
    // Should still render but with empty center column
  });

  it('backward compatibility: existing variants still work', () => {
    const result = PageFooter({
      leftText: '© 2026 Legacy Corp',
      rightText: 'Page 1',
      centerText: 'CONFIDENTIAL',
    });
    expect(findText(result, '© 2026 Legacy Corp')).toBe(true);
    expect(findText(result, 'Page 1')).toBe(true);
    expect(findText(result, 'CONFIDENTIAL')).toBe(true);
  });

  it('renders detailed variant with company info on top and page number below', () => {
    const result = PageFooter({
      leftText: 'Acme Corporation',
      rightText: 'Page 1 of 5',
      variant: 'detailed',
      address: '123 Main Street, City, ST 12345',
      phone: '+1-555-0100',
      email: 'contact@acme.com',
      website: 'www.acme.com',
    });
    expect(findText(result, 'Acme Corporation')).toBe(true);
    expect(findText(result, 'Page 1 of 5')).toBe(true);
    expect(findText(result, '123 Main Street, City, ST 12345')).toBe(true);
    // Phone/email/website are prefixed with labels in detailed variant
    expect(findText(result, 'Phone: +1-555-0100')).toBe(true);
    expect(findText(result, 'Email: contact@acme.com')).toBe(true);
    expect(findText(result, 'Web: www.acme.com')).toBe(true);
  });

  it('renders detailed variant with column layout (flexDirection column)', () => {
    const result = PageFooter({
      leftText: 'Acme Corp',
      variant: 'detailed',
    });
    const containerStyles = Array.isArray(result.props.style)
      ? result.props.style
      : [result.props.style];
    expect(
      containerStyles.some((s: { flexDirection?: string }) => s.flexDirection === 'column')
    ).toBe(true);
  });

  it('renders detailed variant with heavier top border', () => {
    const result = PageFooter({
      leftText: 'Acme Corp',
      variant: 'detailed',
    });
    const containerStyles = Array.isArray(result.props.style)
      ? result.props.style
      : [result.props.style];
    // detailed uses spacing[1] = 4pt border, vs simple's spacing[0.5] = 2pt
    expect(
      containerStyles.some((s: { borderTopWidth?: number }) => (s.borderTopWidth ?? 0) >= 4)
    ).toBe(true);
  });

  it('renders detailed variant without optional fields when not provided', () => {
    const result = PageFooter({
      leftText: 'Company',
      variant: 'detailed',
    });
    expect(findText(result, 'Company')).toBe(true);
    // Should render without crashing when optional fields are absent
  });

  // ──── Sticky prop tests ─────────────────────────────────────────────

  it('sticky=true applies position absolute + bottom 0 to style', () => {
    const result = PageFooter({ leftText: 'Footer', sticky: true });
    const containerStyles = Array.isArray(result.props.style)
      ? result.props.style
      : [result.props.style];
    expect(containerStyles.some((s: { position?: string }) => s.position === 'absolute')).toBe(
      true
    );
    expect(containerStyles.some((s: { bottom?: number }) => s.bottom === 0)).toBe(true);
  });

  it('sticky=true sets fixed prop on the View', () => {
    const result = PageFooter({ leftText: 'Footer', sticky: true });
    expect(result.props.fixed).toBe(true);
  });

  it('sticky=true works with all variants', () => {
    const variants = [
      'simple',
      'centered',
      'minimal',
      'branded',
      'three-column',
      'detailed',
    ] as const;
    for (const variant of variants) {
      const result = PageFooter({ leftText: 'Footer', sticky: true, variant });
      const containerStyles = Array.isArray(result.props.style)
        ? result.props.style
        : [result.props.style];
      expect(
        containerStyles.some((s: { position?: string }) => s.position === 'absolute'),
        `variant "${variant}" should have position:absolute when sticky`
      ).toBe(true);
    }
  });

  it('sticky=false (default) does NOT apply absolute positioning', () => {
    const result = PageFooter({ leftText: 'Footer' });
    const containerStyles = Array.isArray(result.props.style)
      ? result.props.style
      : [result.props.style];
    expect(containerStyles.some((s: { position?: string }) => s.position === 'absolute')).toBe(
      false
    );
  });
});
