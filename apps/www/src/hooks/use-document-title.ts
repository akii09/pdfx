import { useEffect } from 'react';

const SITE_NAME = 'PDFx';

/** Sets document.title on mount and restores the default on unmount. */
export function useDocumentTitle(title: string) {
  useEffect(() => {
    const previous = document.title;
    document.title = title ? `${title} - ${SITE_NAME}` : SITE_NAME;
    return () => {
      document.title = previous;
    };
  }, [title]);
}
