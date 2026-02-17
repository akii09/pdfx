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
  /** Path where the usage file lives after install (e.g. src/components/pdfx/pdfx-heading.tsx) */
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
      { id: 'installation', title: 'Installation', level: 2 },
      ...(additionalInfo ? [{ id: 'requirements', title: 'Requirements', level: 2 }] : []),
      { id: 'usage', title: 'Usage', level: 2 },
      { id: 'preview', title: 'Preview', level: 2 },
      { id: 'props', title: 'Props', level: 2 },
    ],
    [additionalInfo]
  );

  return (
    <div className="flex gap-6">
      <div className="flex-1 min-w-0 py-12 max-w-4xl">
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight mb-3">{title}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">{description}</p>
        </div>

        <section id="installation" className="mb-10 scroll-mt-20">
          <h2 className="text-lg font-semibold tracking-tight mb-3">Installation</h2>
          <InstallationTabs
            installCommand={installCommand}
            componentName={componentName}
            usageFilename={usageFilename}
          />
        </section>

        {additionalInfo && (
          <section id="requirements" className="mb-10 scroll-mt-20">
            <h2 className="text-lg font-semibold tracking-tight mb-3">Requirements</h2>
            {additionalInfo}
          </section>
        )}

        <section id="usage" className="mb-10 scroll-mt-20">
          <h2 className="text-lg font-semibold tracking-tight mb-3">Usage</h2>
          <p className="text-muted-foreground mb-4">
            Copy the code below and use it in your PDF document.
          </p>
          <CodeBlock code={usageCode} language="tsx" filename={usageFilename} />
        </section>

        <section id="preview" className="mb-10 scroll-mt-20">
          <h2 className="text-lg font-semibold tracking-tight mb-3">Preview</h2>
          <p className="text-muted-foreground mb-4">See how it renders in a PDF:</p>
          {preview}
        </section>

        <section id="props" className="mb-10 scroll-mt-20">
          <h2 className="text-lg font-semibold tracking-tight mb-3">Props</h2>
          <PropsTable props={props} />
        </section>
      </div>

      <TableOfContents items={tocItems} />
    </div>
  );
}
