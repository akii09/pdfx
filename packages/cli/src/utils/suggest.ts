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

export interface NotFoundContext {
  /** What the user was installing: `component` for `add`, `block` for `block add`. */
  kind: string;
  /** Registry names of that kind. */
  sameKind: string[];
  /** The other kind's label, used when the match lives on the other command. */
  otherKind: string;
  /** Registry names of the other kind. */
  otherKindNames: string[];
  /** Command that installs from the other kind, e.g. `npx pdfx-cli@latest block add`. */
  otherKindCommand: string;
  /** Command that lists what the user was already looking for. */
  listCommand: string;
}

/**
 * Builds the hint shown under a "not found" error.
 *
 * Prefers matches of the kind the user asked for. Failing that it looks across kinds:
 * `pdfx add invoice` finds nothing under components, but six `invoice-*` blocks exist,
 * and pointing at `block add` is more useful than a generic "run list".
 *
 * Falls back to the list command alone when nothing looks similar — including when the
 * registry index could not be read, in which case both name lists are empty.
 */
export function buildNotFoundSuggestion(name: string, ctx: NotFoundContext): string {
  const listHint = `Run "${ctx.listCommand}" to see everything available`;

  const matches = findSimilarNames(name, ctx.sameKind);
  if (matches.length > 0) {
    return `Did you mean: ${matches.join(', ')}? ${listHint}`;
  }

  const crossMatches = findSimilarNames(name, ctx.otherKindNames);
  if (crossMatches.length > 0) {
    return (
      `No ${ctx.kind} matches "${name}", but these ${ctx.otherKind}s do: ` +
      `${crossMatches.join(', ')}. Run "${ctx.otherKindCommand} <name>"`
    );
  }

  return listHint;
}
