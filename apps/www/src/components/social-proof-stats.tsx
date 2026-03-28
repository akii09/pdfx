import { useEffect, useState } from 'react';

const GITHUB_API = 'https://api.github.com/repos/akii09/pdfx';
const NPM_API = 'https://api.npmjs.org/downloads/point/last-week/pdfx-cli';

interface Stats {
  stars: number | null;
  downloads: number | null;
}

export function SocialProofStats() {
  const [stats, setStats] = useState<Stats>({ stars: null, downloads: null });

  useEffect(() => {
    const controller = new AbortController();

    Promise.all([
      fetch(GITHUB_API, { signal: controller.signal })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => data?.stargazers_count ?? null)
        .catch(() => null),
      fetch(NPM_API, { signal: controller.signal })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => data?.downloads ?? null)
        .catch(() => null),
    ])
      .then(([stars, downloads]) => {
        setStats({ stars, downloads });
      })
      .catch(() => {});

    return () => controller.abort();
  }, []);

  if (stats.stars === null && stats.downloads === null) {
    return null;
  }

  return (
    <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
      {/* Social proof stats temporarily disabled */}
    </div>
  );
}
