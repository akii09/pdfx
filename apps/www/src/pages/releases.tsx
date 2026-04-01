import { ExternalLink } from 'lucide-react';
import { useDocumentTitle } from '../hooks/use-document-title';

const releasePrinciples = [
  'Use Changesets as the source of truth for package versioning.',
  'Keep package changelogs precise and user-focused.',
  'Publish GitHub Releases for higher-level announcements and upgrade context.',
  'Maintain a stable releases page so users can quickly understand what changed.',
];

const releaseChannels = [
  {
    title: 'CLI Changelog',
    description:
      'Authoritative version-by-version history for pdfx-cli, generated through Changesets.',
    href: 'https://github.com/akii09/pdfx/blob/main/packages/cli/CHANGELOG.md',
  },
  {
    title: 'GitHub Releases',
    description:
      'High-level release announcements, upgrade highlights, and publish history for the repository.',
    href: 'https://github.com/akii09/pdfx/releases',
  },
  {
    title: 'Changesets Workflow',
    description:
      'Maintainer-facing workflow for versioning, release PRs, and package changelog generation.',
    href: 'https://github.com/changesets/changesets',
  },
];

export default function ReleasesPage() {
  useDocumentTitle('Releases');

  return (
    <div className="py-12 max-w-3xl">
      <div className="rounded-2xl border border-border bg-card/60 p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Releases</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
          Keep up with PDFx releases
        </h1>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          PDFx follows an OSS-friendly release workflow: Changesets for package versioning,
          package-level changelogs for exact history, and GitHub Releases for announcement-style
          notes. If you just want to know what changed, start with the CLI changelog or GitHub
          Releases.
        </p>
      </div>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-foreground">Where to check updates</h2>
        <div className="mt-4 grid gap-4">
          {releaseChannels.map((item) => (
            <a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-muted/30"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.description}</p>
                </div>
                <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-border bg-muted/20 p-6">
        <h2 className="text-lg font-semibold text-foreground">How PDFx handles changelogs</h2>
        <ul className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground">
          {releasePrinciples.map((principle) => (
            <li key={principle}>{principle}</li>
          ))}
        </ul>
      </section>

      <section className="mt-10 rounded-2xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold text-foreground">Best practice for maintainers</h2>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          Use package changelogs for exact semver history, GitHub Releases for curated summaries,
          and this page as the stable place users can bookmark. That combination gives you a
          professional OSS release surface without duplicating too much maintenance work.
        </p>
      </section>
    </div>
  );
}
