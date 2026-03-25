import { AnimatePresence, motion } from 'framer-motion';
import { Github, Star, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

const BANNER_DISMISSED_KEY = 'pdfx-star-banner-dismissed';
const STAR_COUNT_CACHE_KEY = 'pdfx-github-stars';
const STAR_COUNT_CACHE_TTL_MS = 1000 * 60 * 60; // 1 hour
const GITHUB_API = 'https://api.github.com/repos/akii09/pdfx';
const REPO_URL = 'https://github.com/akii09/pdfx';
const SHOW_DELAY_MS = 8000;

// Fallback star count if API fails (update manually during releases)
const FALLBACK_STAR_COUNT = 160;

interface CachedStarCount {
  count: number;
  timestamp: number;
}

function getCachedStarCount(): number | null {
  try {
    const cached = localStorage.getItem(STAR_COUNT_CACHE_KEY);
    if (!cached) return null;
    const { count, timestamp } = JSON.parse(cached) as CachedStarCount;
    if (Date.now() - timestamp < STAR_COUNT_CACHE_TTL_MS) {
      return count;
    }
    return null;
  } catch {
    return null;
  }
}

function setCachedStarCount(count: number): void {
  try {
    localStorage.setItem(
      STAR_COUNT_CACHE_KEY,
      JSON.stringify({ count, timestamp: Date.now() } as CachedStarCount)
    );
  } catch {
    // localStorage not available
  }
}

export function GitHubStarBanner() {
  const [dismissed, setDismissed] = useState(() => {
    try {
      return localStorage.getItem(BANNER_DISMISSED_KEY) === '1';
    } catch {
      return false;
    }
  });
  const [visible, setVisible] = useState(false);
  const [starCount, setStarCount] = useState<number | null>(() => getCachedStarCount());
  const fetchedRef = useRef(false);

  useEffect(() => {
    // Skip if dismissed, already fetched, or have cached value
    if (dismissed || fetchedRef.current || starCount !== null) return;
    fetchedRef.current = true;

    const controller = new AbortController();

    fetch(GITHUB_API, {
      signal: controller.signal,
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub API returned ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data?.stargazers_count != null) {
          const count = data.stargazers_count as number;
          setStarCount(count);
          setCachedStarCount(count);
        }
      })
      .catch((error) => {
        // Only use fallback for non-abort errors
        if (error.name !== 'AbortError') {
          setStarCount(FALLBACK_STAR_COUNT);
        }
      });

    return () => controller.abort();
  }, [dismissed, starCount]);

  useEffect(() => {
    if (dismissed) return;

    const timer = setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, [dismissed]);

  const handleDismiss = useCallback(() => {
    setVisible(false);
    setDismissed(true);
    try {
      localStorage.setItem(BANNER_DISMISSED_KEY, '1');
    } catch {
      // localStorage not available
    }
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
