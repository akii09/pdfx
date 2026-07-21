import { describe, expect, it } from 'vitest';
import { type NotFoundContext, buildNotFoundSuggestion, findSimilarNames } from './suggest.js';

/**
 * Unit tests for registry name suggestions.
 *
 * The motivating case is `pdfx block add invoice`: no block is named plain `invoice`,
 * but six `invoice-*` blocks exist. Before suggestions this produced a bare "not found"
 * and users retried the same wrong name repeatedly.
 */

const BLOCKS = [
  'invoice-classic',
  'invoice-consultant',
  'invoice-corporate',
  'invoice-creative',
  'invoice-minimal',
  'invoice-modern',
  'report-financial',
  'report-marketing',
  'report-operations',
  'report-security',
];

const COMPONENTS = ['alert', 'badge', 'card', 'data-table', 'divider', 'heading', 'table', 'text'];

describe('findSimilarNames: family prefixes', () => {
  it('surfaces the invoice family when the user types the bare prefix', () => {
    const result = findSimilarNames('invoice', BLOCKS);
    expect(result).toEqual(['invoice-classic', 'invoice-consultant', 'invoice-corporate']);
  });

  it('caps suggestions at three even when many candidates match', () => {
    expect(findSimilarNames('report', BLOCKS)).toHaveLength(3);
  });

  it('matches case-insensitively', () => {
    expect(findSimilarNames('INVOICE', BLOCKS)).toContain('invoice-classic');
  });
});

describe('findSimilarNames: typos', () => {
  it('catches a single-character typo', () => {
    expect(findSimilarNames('tabel', COMPONENTS)).toContain('table');
  });

  it('catches a missing character', () => {
    expect(findSimilarNames('divder', COMPONENTS)).toContain('divider');
  });

  it('ignores a name too far from anything real', () => {
    // "diner" is 3 edits from "divider" — past the threshold, and guessing here would
    // be worse than saying nothing.
    expect(findSimilarNames('diner', COMPONENTS)).toEqual([]);
  });

  it('ranks substring matches ahead of edit-distance matches', () => {
    // "tabl" is a substring of both "table" and "data-table"; "text" is only a
    // distance neighbour, so it must not outrank either.
    const result = findSimilarNames('tabl', COMPONENTS);
    expect(result.slice(0, 2)).toEqual(['data-table', 'table']);
  });
});

describe('findSimilarNames: no match', () => {
  it('returns nothing for a name unlike anything in the registry', () => {
    expect(findSimilarNames('spreadsheet', BLOCKS)).toEqual([]);
  });

  it('returns nothing when the candidate list is empty', () => {
    expect(findSimilarNames('invoice', [])).toEqual([]);
  });

  it('does not substring-match on a query too short to be meaningful', () => {
    // "x" appears inside "text", but suggesting it would be noise, not help.
    expect(findSimilarNames('x', COMPONENTS)).toEqual([]);
  });
});

/** Context for a failed `pdfx block add`. */
function blockContext(overrides: Partial<NotFoundContext> = {}): NotFoundContext {
  return {
    kind: 'block',
    sameKind: BLOCKS,
    otherKind: 'component',
    otherKindNames: COMPONENTS,
    otherKindCommand: 'npx pdfx-cli@latest add',
    listCommand: 'npx pdfx-cli@latest block list',
    ...overrides,
  };
}

/** Context for a failed `pdfx add`. */
function componentContext(overrides: Partial<NotFoundContext> = {}): NotFoundContext {
  return {
    kind: 'component',
    sameKind: COMPONENTS,
    otherKind: 'block',
    otherKindNames: BLOCKS,
    otherKindCommand: 'npx pdfx-cli@latest block add',
    listCommand: 'npx pdfx-cli@latest list',
    ...overrides,
  };
}

describe('buildNotFoundSuggestion: same-kind matches', () => {
  it('includes both the suggestions and the list command when matches exist', () => {
    const hint = buildNotFoundSuggestion('invoice', blockContext());
    expect(hint).toContain('Did you mean: invoice-classic, invoice-consultant, invoice-corporate?');
    expect(hint).toContain('npx pdfx-cli@latest block list');
  });

  it('prefers a same-kind match over any cross-kind match', () => {
    // "table" is a component; nothing in BLOCKS is close to it.
    const hint = buildNotFoundSuggestion('tabel', componentContext());
    expect(hint).toContain('Did you mean: table?');
    expect(hint).not.toContain('block add');
  });
});

describe('buildNotFoundSuggestion: cross-kind matches', () => {
  it('points at the block command when a component lookup matches blocks', () => {
    // The reported failure: users ran `pdfx add invoice` / `block add invoice`.
    const hint = buildNotFoundSuggestion('invoice', componentContext());
    expect(hint).toBe(
      'No component matches "invoice", but these blocks do: ' +
        'invoice-classic, invoice-consultant, invoice-corporate. ' +
        'Run "npx pdfx-cli@latest block add <name>"'
    );
  });

  it('points at the component command when a block lookup matches components', () => {
    const hint = buildNotFoundSuggestion('heading', blockContext());
    expect(hint).toContain('No block matches "heading", but these components do: heading');
    expect(hint).toContain('Run "npx pdfx-cli@latest add <name>"');
  });
});

describe('buildNotFoundSuggestion: no matches', () => {
  it('falls back to only the list command when nothing is similar in either kind', () => {
    const hint = buildNotFoundSuggestion('spreadsheet', blockContext());
    expect(hint).not.toContain('Did you mean');
    expect(hint).toBe('Run "npx pdfx-cli@latest block list" to see everything available');
  });

  it('falls back to only the list command when the registry index was unreachable', () => {
    // fetchRegistryNames yields empty lists rather than throwing when the index fails.
    const hint = buildNotFoundSuggestion(
      'invoice',
      blockContext({ sameKind: [], otherKindNames: [] })
    );
    expect(hint).toBe('Run "npx pdfx-cli@latest block list" to see everything available');
  });
});
