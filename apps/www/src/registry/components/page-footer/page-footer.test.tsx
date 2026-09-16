import { describe, expect, it } from 'vitest';
import { PageFooter } from './page-footer';

/** Walk the returned element tree looking for a Text carrying a `render` prop. */
function findRenderProp(node: unknown): ((info: unknown) => string) | undefined {
  if (!node || typeof node !== 'object') return undefined;
  const el = node as { props?: Record<string, unknown> };
  const render = el.props?.render;
  if (typeof render === 'function') return render as (info: unknown) => string;
  const children = el.props?.children;
  for (const child of Array.isArray(children) ? children : [children]) {
    const found = findRenderProp(child);
    if (found) return found;
  }
  return undefined;
}

/** Find the first Text node whose props satisfy `match`. */
function findTextNode(
  node: unknown,
  match: (props: Record<string, unknown>) => boolean
): { style?: unknown } | undefined {
  if (!node || typeof node !== 'object') return undefined;
  const el = node as { props?: Record<string, unknown> };
  if (el.props && match(el.props)) return el.props as { style?: unknown };
  const children = el.props?.children;
  for (const child of Array.isArray(children) ? children : [children]) {
    const found = findTextNode(child, match);
    if (found) return found;
  }
  return undefined;
}

describe('PageFooter', () => {
  it('renders without throwing', () => {
    expect(() => PageFooter({ leftText: 'My Company' })).not.toThrow();
  });
  it('accepts variant prop', () => {
    expect(() => PageFooter({ variant: 'centered', centerText: 'Page 1' })).not.toThrow();
  });

  it('resolves a function slot per page via react-pdf render', () => {
    const el = PageFooter({
      rightText: ({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`,
      sticky: true,
    });
    const render = findRenderProp(el);
    expect(render).toBeTypeOf('function');
    expect(render?.({ pageNumber: 2, totalPages: 7 })).toBe('Page 2 of 7');
  });

  it('still renders a plain string slot as static text', () => {
    const el = PageFooter({ rightText: 'Static footer' });
    expect(findRenderProp(el)).toBeUndefined();
  });

  // react-pdf draws nothing for a <Text> that has both `lineHeight` and a
  // dynamic `render` callback, which silently emptied the whole footer.
  it('drops lineHeight from a dynamic slot but keeps it on a static one', () => {
    const dynamic = PageFooter({ rightText: () => 'x', sticky: true });
    const dynamicText = findTextNode(dynamic, (props) => typeof props.render === 'function');
    for (const entry of [dynamicText?.style ?? []].flat()) {
      expect(entry).not.toHaveProperty('lineHeight');
    }

    const staticFooter = PageFooter({ rightText: 'x', sticky: true });
    const staticText = findTextNode(staticFooter, (props) => props.children === 'x');
    const hasLineHeight = [staticText?.style ?? []]
      .flat()
      .some((entry) => entry && typeof entry === 'object' && 'lineHeight' in entry);
    expect(hasLineHeight).toBe(true);
  });

  it('supports function slots in every text position', () => {
    const el = PageFooter({
      variant: 'three-column',
      leftText: () => 'L',
      centerText: () => 'C',
      rightText: ({ pageNumber }) => `R${pageNumber}`,
    });
    expect(findRenderProp(el)).toBeTypeOf('function');
  });
});
