import type { ReactNode } from 'react';
import { CodeBlock } from './code-block';
import { InstallationTabs } from './installation-tabs';
import type { PropDefinition } from './props-table';
import { PropsTable } from './props-table';

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
}: ComponentPageProps) {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-3">{title}</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">{description}</p>
      </div>

      <section className="mb-10">
        <h2 className="text-lg font-semibold tracking-tight mb-3">Installation</h2>
        <InstallationTabs
          installCommand={installCommand}
          componentName={componentName}
          usageFilename={usageFilename}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-semibold tracking-tight mb-3">Usage</h2>
        <p className="text-muted-foreground mb-4">
          Copy the code below and use it in your PDF document.
        </p>
        <CodeBlock code={usageCode} language="tsx" filename={usageFilename} />
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-semibold tracking-tight mb-3">Preview</h2>
        <p className="text-muted-foreground mb-4">See how it renders in a PDF:</p>
        {preview}
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-semibold tracking-tight mb-3">Props</h2>
        <PropsTable props={props} />
      </section>
    </div>
  );
}
