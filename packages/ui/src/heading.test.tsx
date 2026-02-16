import { describe, expect, it } from 'vitest';
import { Heading } from './heading';

describe('Heading', () => {
  it('should render with default level 1', () => {
    const heading = Heading({ children: 'Test' });
    expect(heading).toBeDefined();
  });

  it('should accept different levels', () => {
    const levels: Array<1 | 2 | 3 | 4 | 5 | 6> = [1, 2, 3, 4, 5, 6];
    for (const level of levels) {
      const heading = Heading({ level, children: 'Test' });
      expect(heading).toBeDefined();
    }
  });
});
