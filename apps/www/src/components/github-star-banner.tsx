import { AnimatePresence, motion } from 'framer-motion';
import { Github, Star, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'pdfx-star-banner-dismissed';
const GITHUB_API = 'https://api.github.com/repos/akii09/pdfx';
const REPO_URL = 'https://github.com/akii09/pdfx';
const SHOW_DELAY_MS = 8000;

export function GitHubStarBanner() {
  const [dismissed, setDismissed] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === '1';
    } catch {
      return false;
    }
  });
  const [visible, setVisible] = useState(false);
  const [starCount, setStarCount] = useState<number | null>(null);

  useEffect(() => {
    if (dismissed) return;

    const controller = new AbortController();
    fetch(GITHUB_API, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.stargazers_count != null) {
          setStarCount(data.stargazers_count);
        }
      })
      .catch(() => {});

    return () => controller.abort();
  }, [dismissed]);

  useEffect(() => {
    if (dismissed) return;

    const timer = setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, [dismissed]);

  const handleDismiss = useCallback(() => {
    setVisible(false);
    setDismissed(true);
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {}
  }, []);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="sticky top-0 z-[60] flex h-10 items-center justify-center bg-primary text-primary-foreground text-xs sm:text-sm"
        >
          <div className="flex items-center gap-2 px-4">
            <Star className="h-3.5 w-3.5 shrink-0 fill-current" />
            <span className="truncate">
              PDFX is open source
              {starCount != null && (
                <>
                  {' '}
                  — <strong>{starCount.toLocaleString()}</strong>{' '}
                  <span className="hidden sm:inline">stars and growing. </span>
                </>
              )}
              <span className="hidden sm:inline">If it saves you time, star us on GitHub.</span>
            </span>
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 inline-flex shrink-0 items-center gap-1.5 rounded-md bg-primary-foreground/15 px-2.5 py-1 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/25"
            >
              <Github className="h-3.5 w-3.5" />
              Star on GitHub
            </a>
          </div>

          <button
            type="button"
            onClick={handleDismiss}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-primary-foreground/70 transition-colors hover:bg-primary-foreground/15 hover:text-primary-foreground"
            aria-label="Dismiss banner"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
