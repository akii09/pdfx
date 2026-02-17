import { describe, expect, it } from 'vitest';
import { PageBreak } from './page-break';

describe('PageBreak', () => {
  it('renders View with break prop', () => {
    const result = PageBreak({});
    expect(result).toBeDefined();
    expect(result.type).toBeDefined();
    expect(result.props.break).toBe(true);
  });
});
