/**
 * Name suggestion helpers for failed registry lookups.
 *
 * When a user asks for a name the registry does not have — `pdfx block add invoice`
 * when only `invoice-classic`, `invoice-modern`, … exist — a bare "not found" leaves
 * them guessing. These helpers turn the miss into a short "did you mean" list.
 *
 * Kept dependency-free on purpose: this only serves an error path, and the CLI does not
 * take on runtime dependencies for it.
 */

const MAX_SUGGESTIONS = 3;

/**
 * Shortest query eligible for substring matching. Below this almost every registry name
 * contains the query (`x` is in `text`), which produces noise rather than a suggestion.
 */
const MIN_SUBSTRING_QUERY = 3;

/**
 * Levenshtein edit distance, computed with a single rolling row.
 *
 * Only used against the registry index (tens of names), so the O(n*m) cost is
 * irrelevant here.
 */
function editDistance(a: string, b: string): number {
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);

  for (let i = 1; i <= a.length; i++) {
    const curr = [i];
    for (let j = 1; j <= b.length; j++) {
      curr[j] = Math.min(
        prev[j] + 1,
        curr[j - 1] + 1,
        prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
    prev = curr;
  }

  return prev[b.length];
}

/**
 * Returns up to three registry names close to what the user typed.
 *
 * Substring matches rank first so that a family prefix like `invoice` surfaces every
 * `invoice-*` entry ahead of any edit-distance neighbour. Remaining candidates qualify
 * on edit distance, with the threshold scaled to the query length so short names do not
 * match half the registry.
 */
export function findSimilarNames(name: string, candidates: string[]): string[] {
  const query = name.toLowerCase();

  const contains =
    query.length >= MIN_SUBSTRING_QUERY
      ? candidates
          .filter((candidate) => candidate.toLowerCase().includes(query))
          .sort((a, b) => a.localeCompare(b))
      : [];

  const threshold = Math.max(2, Math.floor(query.length / 3));
  const near = candidates
    .filter((candidate) => !contains.includes(candidate))
    .map((candidate) => ({
      name: candidate,
      distance: editDistance(query, candidate.toLowerCase()),
    }))
    .filter((candidate) => candidate.distance <= threshold)
    .sort((a, b) => a.distance - b.distance || a.name.localeCompare(b.name))
    .map((candidate) => candidate.name);

  return [...contains, ...near].slice(0, MAX_SUGGESTIONS);
}

/**
 * Builds the hint shown under a "not found" error.
 *
 * Falls back to just the list command when nothing looks similar — or when the registry
 * index could not be read, in which case `candidates` is empty.
 */
export function buildNotFoundSuggestion(
  name: string,
  candidates: string[],
  listCommand: string
): string {
  const matches = findSimilarNames(name, candidates);
  const listHint = `Run "${listCommand}" to see everything available`;

  return matches.length > 0 ? `Did you mean: ${matches.join(', ')}? ${listHint}` : listHint;
}
