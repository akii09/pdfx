import { describe, expect, it } from 'vitest';
import { PageFooter } from './page-footer';

describe('PageFooter', () => {
  it('renders without throwing', () => {
    expect(() => PageFooter({ leftText: 'My Company' })).not.toThrow();
  });
  it('accepts variant prop', () => {
    expect(() => PageFooter({ variant: 'centered', centerText: 'Page 1' })).not.toThrow();
  });
});
