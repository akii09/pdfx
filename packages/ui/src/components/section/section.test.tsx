import { describe, expect, it } from 'vitest';
import { Section } from './section';

describe('Section', () => {
  it('renders children', () => {
    const result = Section({ children: 'Content' });
    expect(result).toBeDefined();
    expect(result.props.children).toBe('Content');
  });

  it('uses default spacing md (sectionGap)', () => {
    const result = Section({ children: null });
    const styles = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    expect(styles.some((s: { marginVertical?: number }) => s.marginVertical === 28)).toBe(true);
  });

  it('applies spacing none', () => {
    const result = Section({ spacing: 'none', children: null });
    const styles = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    expect(styles.some((s: { marginVertical?: number }) => s.marginVertical === 0)).toBe(true);
  });

  it('applies spacing sm', () => {
    const result = Section({ spacing: 'sm', children: null });
    const styles = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    expect(styles.some((s: { marginVertical?: number }) => s.marginVertical === 16)).toBe(true);
  });

  it('applies spacing lg', () => {
    const result = Section({ spacing: 'lg', children: null });
    const styles = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    expect(styles.some((s: { marginVertical?: number }) => s.marginVertical === 32)).toBe(true);
  });

  // New tests for padding prop
  it('applies padding none', () => {
    const result = Section({ padding: 'none', children: null });
    const styles = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    expect(styles.some((s: { padding?: number }) => s.padding === 0)).toBe(true);
  });

  it('applies padding sm', () => {
    const result = Section({ padding: 'sm', children: null });
    const styles = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    expect(styles.some((s: { padding?: number }) => s.padding === 12)).toBe(true); // spacing[3]
  });

  it('applies padding md', () => {
    const result = Section({ padding: 'md', children: null });
    const styles = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    expect(styles.some((s: { padding?: number }) => s.padding === 16)).toBe(true); // spacing[4]
  });

  it('applies padding lg', () => {
    const result = Section({ padding: 'lg', children: null });
    const styles = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    expect(styles.some((s: { padding?: number }) => s.padding === 24)).toBe(true); // spacing[6]
  });

  // New tests for background prop
  it('applies background with theme token', () => {
    const result = Section({ background: 'muted', children: null });
    const styles = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    expect(styles.some((s: { backgroundColor?: string }) => s.backgroundColor === '#f4f4f5')).toBe(
      true
    );
  });

  it('applies background with CSS color', () => {
    const result = Section({ background: '#ff0000', children: null });
    const styles = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    expect(styles.some((s: { backgroundColor?: string }) => s.backgroundColor === '#ff0000')).toBe(
      true
    );
  });

  // New tests for border prop
  it('applies border', () => {
    const result = Section({ border: true, children: null });
    const styles = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    expect(styles.some((s: { borderWidth?: number }) => typeof s.borderWidth === 'number')).toBe(
      true
    );
    expect(styles.some((s: { borderColor?: string }) => s.borderColor === '#e4e4e7')).toBe(true); // theme border
  });

  it('does not apply border by default', () => {
    const result = Section({ children: null });
    const styles = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    expect(styles.some((s: { borderWidth?: number }) => typeof s.borderWidth === 'number')).toBe(
      false
    );
  });

  // Combined tests
  it('applies padding, background, and border together', () => {
    const result = Section({ padding: 'md', background: 'muted', border: true, children: null });
    const styles = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    expect(styles.some((s: { padding?: number }) => s.padding === 16)).toBe(true);
    expect(styles.some((s: { backgroundColor?: string }) => s.backgroundColor === '#f4f4f5')).toBe(
      true
    );
    expect(styles.some((s: { borderWidth?: number }) => typeof s.borderWidth === 'number')).toBe(
      true
    );
  });

  it('applies style override', () => {
    const result = Section({ children: null, style: { backgroundColor: 'navy' } });
    const styles = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    const userStyle = styles[styles.length - 1] as { backgroundColor: string };
    expect(userStyle.backgroundColor).toBe('navy');
  });
});
