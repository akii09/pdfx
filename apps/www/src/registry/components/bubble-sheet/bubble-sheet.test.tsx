import { describe, expect, it } from 'vitest';
import { BubbleSheet } from './bubble-sheet';

describe('BubbleSheet', () => {
  it('renders without throwing', () => {
    expect(() => BubbleSheet({ questions: 10 })).not.toThrow();
  });

  it('accepts custom choices', () => {
    expect(() => BubbleSheet({ questions: 5, choices: ['T', 'F'] })).not.toThrow();
  });

  it('accepts multiple columns', () => {
    expect(() => BubbleSheet({ questions: 40, columns: 2 })).not.toThrow();
  });

  it('accepts student info fields', () => {
    expect(() =>
      BubbleSheet({ questions: 20, studentInfoFields: ['Name', 'ID', 'Date'] })
    ).not.toThrow();
  });

  it('accepts a title', () => {
    expect(() => BubbleSheet({ questions: 10, title: 'Final Exam' })).not.toThrow();
  });

  it('accepts bubble size variants', () => {
    expect(() => BubbleSheet({ questions: 10, bubbleSize: 'sm' })).not.toThrow();
    expect(() => BubbleSheet({ questions: 10, bubbleSize: 'lg' })).not.toThrow();
  });
});
