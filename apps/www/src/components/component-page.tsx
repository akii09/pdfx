import type { ReactNode } from 'react';
import { CodeBlock } from './code-block';
import { PackageManagerTabs } from './package-manager-tabs';
import type { PropDefinition } from './props-table';
import { PropsTable } from './props-table';

interface ComponentPageProps {
  title: string;
  description: string;
  installCommand: string;
  preview: ReactNode;
  usageCode: string;
  props: PropDefinition[];
}

export function ComponentPage({
  title,
  description,
  installCommand,
  preview,
  usageCode,
  props,
}: ComponentPageProps) {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">{title}</h1>
        <p className="text-lg text-muted-foreground">{description}</p>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold tracking-tight mb-4">Installation</h2>
        <PackageManagerTabs command={installCommand} />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold tracking-tight mb-4">Preview</h2>
        {preview}
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold tracking-tight mb-4">Usage</h2>
        <CodeBlock code={usageCode} language="tsx" filename="example.tsx" />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold tracking-tight mb-4">Props</h2>
        <PropsTable props={props} />
      </section>
    </div>
  );
}
