/**
 * Pure validators for the optional, remotely-toggled header promo slot.
 *
 * Kept in a separate file so the validation logic can be unit-tested under the
 * vitest `node` environment without pulling in React or posthog-js.
 */

export type PromoVariant = 'shimmer';

export interface PromoPayload {
  label: string;
  href: string;
  badge?: string;
  variant?: PromoVariant;
  tooltip?: string;
}

const ALLOWED_VARIANTS: ReadonlySet<PromoVariant> = new Set(['shimmer']);
const MAX_LABEL_LEN = 24;
const MAX_BADGE_LEN = 8;
const MAX_TOOLTIP_LEN = 80;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isShortString(value: unknown, maxLen: number): value is string {
  return typeof value === 'string' && value.length > 0 && value.length <= maxLen;
}

/**
 * Returns a sanitized PromoPayload when the input is shaped correctly and
 * passes every safety check, or `null` otherwise. Never throws — callers
 * should treat `null` as "render nothing."
 */
export function parsePromoPayload(input: unknown): PromoPayload | null {
  if (!isPlainObject(input)) return null;

  const { label, href, badge, variant, tooltip } = input;

  if (!isShortString(label, MAX_LABEL_LEN)) return null;
  if (typeof href !== 'string' || !isSafeHref(href)) return null;

  if (badge !== undefined && !isShortString(badge, MAX_BADGE_LEN)) return null;
  if (variant !== undefined && !isAllowedVariant(variant)) return null;
  if (tooltip !== undefined && !isShortString(tooltip, MAX_TOOLTIP_LEN)) return null;

  const result: PromoPayload = { label, href };
  if (typeof badge === 'string') result.badge = badge;
  if (isAllowedVariant(variant)) result.variant = variant;
  if (typeof tooltip === 'string') result.tooltip = tooltip;
  return result;
}

/**
 * Conservative href allow-list:
 *   - Must parse as a URL
 *   - Must use https:// (no http, no data:, no javascript:, no relative)
 *   - Hostname must be non-empty
 *
 * The hostname allow-list is intentionally *not* enforced here so the
 * destination can be changed remotely without a code deploy. Schema
 * enforcement is the security boundary — keep it strict.
 */
export function isSafeHref(value: string): boolean {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return false;
  }
  if (url.protocol !== 'https:') return false;
  if (!url.hostname) return false;
  return true;
}

function isAllowedVariant(value: unknown): value is PromoVariant {
  return typeof value === 'string' && ALLOWED_VARIANTS.has(value as PromoVariant);
}
