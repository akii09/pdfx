import { Children, type ReactNode, isValidElement } from 'react';
import { describe, expect, it } from 'vitest';
import { PdfSignatureBlock } from './signature';

function collectText(node: ReactNode): string[] {
  return Children.toArray(node).flatMap((child) => {
    if (typeof child === 'string' || typeof child === 'number') return [String(child)];
    if (!isValidElement<{ children?: ReactNode }>(child)) return [];
    return collectText(child.props.children);
  });
}

describe('PdfSignatureBlock', () => {
  it('renders without throwing', () => {
    expect(() => PdfSignatureBlock({})).not.toThrow();
  });

  it('keeps two signer places by default', () => {
    const output = collectText(PdfSignatureBlock({ variant: 'double' }));

    expect(output).toContain('Authorized by');
    expect(output).toContain('Approved by');
  });

  it('infers signer count from signers when count is omitted', () => {
    const output = collectText(
      PdfSignatureBlock({
        variant: 'double',
        signers: [{ name: 'Person 1' }, { name: 'Person 2' }, { name: 'Person 3' }],
      })
    );

    expect(output).toContain('Person 3');
  });

  it('uses explicit count instead of the number of provided signers', () => {
    const output = collectText(
      PdfSignatureBlock({
        variant: 'double',
        count: 2,
        signers: [
          { name: 'Person 1' },
          { name: 'Person 2' },
          { name: 'Person 3' },
          { name: 'Person 4' },
        ],
      })
    );

    expect(output).toEqual(['Person 1', 'Person 2']);
  });

  it('renders three signer places when count is 3', () => {
    const output = collectText(
      PdfSignatureBlock({
        variant: 'double',
        count: 3,
        signers: [{ name: 'Person 1' }, { name: 'Person 2' }, { name: 'Person 3' }],
      })
    );

    expect(output).toContain('Person 3');
  });

  it('fills missing signer entries with default labels when count is 4', () => {
    const output = collectText(
      PdfSignatureBlock({
        variant: 'double',
        count: 4,
        signers: [{ name: 'Person 1' }, { name: 'Person 2' }],
      })
    );

    expect(output).toEqual(['Person 1', 'Person 2', 'Signer 3', 'Signer 4']);
  });

  it('renders four signer places when count exceeds 4', () => {
    const output = collectText(PdfSignatureBlock({ variant: 'double', count: 5 as never }));

    expect(output).toEqual(['Authorized by', 'Approved by', 'Signer 3', 'Signer 4']);
  });

  it('keeps a lone third signer half-width and separated from first row', () => {
    const tree = PdfSignatureBlock({ variant: 'double', count: 3 });
    const rows = Children.toArray(tree.props.children);
    const continuation = rows[1];

    expect(isValidElement<{ children?: ReactNode; style?: unknown }>(continuation)).toBe(true);
    if (!isValidElement<{ children?: ReactNode; style?: unknown }>(continuation)) return;

    const [thirdSigner, emptyPlaceholder] = Children.toArray(continuation.props.children);
    expect(continuation.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ marginTop: expect.any(Number) })])
    );
    expect(isValidElement<{ children?: ReactNode; style?: unknown }>(thirdSigner)).toBe(true);
    expect(isValidElement<{ children?: ReactNode; style?: unknown }>(emptyPlaceholder)).toBe(true);
    if (!isValidElement<{ children?: ReactNode; style?: unknown }>(thirdSigner)) return;
    if (!isValidElement<{ children?: ReactNode; style?: unknown }>(emptyPlaceholder)) return;

    expect(emptyPlaceholder.props.children).toBeUndefined();
    expect(emptyPlaceholder.props.style).toBe(thirdSigner.props.style);
  });
});
