import { useMemo } from 'react';
import type { ReactNode } from 'react';
import { CodeBlock } from './code-block';
import { InstallationTabs } from './installation-tabs';
import type { PropDefinition } from './props-table';
import { PropsTable } from './props-table';
import { TableOfContents, type TocItem } from './table-of-contents';

interface ComponentPageProps {
  title: string;
  description: string;
  installCommand: string;
  /** Component name for registry fetch (e.g. "heading") */
  componentName: string;
  preview: ReactNode;
  usageCode: string;
  /** Path where the usage file lives after install (e.g. src/components/pdfx/heading/pdfx-heading.tsx) */
  usageFilename: string;
  props: PropDefinition[];
  /** Optional additional information section (requirements, notes, etc.) */
  additionalInfo?: ReactNode;
}

export function ComponentPage({
  title,
  description,
  installCommand,
  componentName,
  preview,
  usageCode,
  usageFilename,
  props,
  additionalInfo,
}: ComponentPageProps) {
  const tocItems = useMemo<TocItem[]>(
    () => [
      { id: 'preview', title: 'Preview', level: 2 },
      { id: 'installation', title: 'Installation', level: 2 },
      ...(additionalInfo ? [{ id: 'requirements', title: 'Requirements', level: 2 }] : []),
      { id: 'usage', title: 'Usage', level: 2 },
      { id: 'props', title: 'Props', level: 2 },
    ],
    [additionalInfo]
  );

  return (
    <div className="flex gap-6">
      <div className="flex-1 min-w-0 py-10 lg:py-12 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 text-foreground">
            {title}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-[85%]">
            {description}
          </p>
        </div>

        <section id="preview" className="mb-14 scroll-mt-24">
          <h2 className="text-xl font-semibold tracking-tight mb-4 text-foreground">Preview</h2>
          {preview}
        </section>

        <section id="installation" className="mb-14 scroll-mt-24">
          <h2 className="text-xl font-semibold tracking-tight mb-4 text-foreground">
            Installation
          </h2>
          <InstallationTabs
            installCommand={installCommand}
            componentName={componentName}
            usageFilename={usageFilename}
          />
        </section>

        {additionalInfo && (
          <section id="requirements" className="mb-14 scroll-mt-24">
            <h2 className="text-xl font-semibold tracking-tight mb-4 text-foreground">
              Requirements
            </h2>
            <div className="text-muted-foreground">{additionalInfo}</div>
          </section>
        )}

        <section id="usage" className="mb-14 scroll-mt-24">
          <h2 className="text-xl font-semibold tracking-tight mb-4 text-foreground">Usage</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Copy the code below to use the component in your document.
          </p>
          <CodeBlock code={usageCode} language="tsx" filename={usageFilename} />
        </section>

        <section id="props" className="mb-14 scroll-mt-24">
          <h2 className="text-xl font-semibold tracking-tight mb-4 text-foreground">Props</h2>
          <PropsTable props={props} />
        </section>
      </div>

      <TableOfContents items={tocItems} />
    </div>
  );
}
