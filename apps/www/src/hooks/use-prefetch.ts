import { useCallback } from 'react';

const prefetched = new Set<string>();

export function usePrefetch() {
  const prefetch = useCallback((href: string) => {
    if (prefetched.has(href)) return;
    prefetched.add(href);

    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    link.as = 'document';
    document.head.appendChild(link);
  }, []);

  return { prefetch };
}
