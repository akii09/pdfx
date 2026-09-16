import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import {
  type PdfxRegistryItem,
  type ShadcnRegistryItem,
  assertShadcnRegistry,
  buildShadcnCatalog,
  buildShadcnRegistry,
  createShadcnThemeItem,
  rewriteThemeImportsForShadcn,
  toShadcnBlockItem,
  toShadcnComponentItem,
  toShadcnRegistryDependency,
} from '../shadcn-registry.js';

const heading: PdfxRegistryItem = {
  name: 'heading',
  type: 'registry:ui',
  title: 'Heading',
  description: 'PDF heading',
  files: [
    {
      path: 'components/pdfx/heading/pdfx-heading.tsx',
      type: 'registry:component',
      content:
        "import { usePdfxTheme } from '../lib/pdfx-theme-context';\nexport function Heading() { return null; }\n",
    },
  ],
  dependencies: ['@react-pdf/renderer'],
  registryDependencies: ['theme'],
};

const dataTable: PdfxRegistryItem = {
  name: 'data-table',
  type: 'registry:ui',
  title: 'DataTable',
  description: 'Table helper',
  files: [
    {
      path: 'components/pdfx/data-table/pdfx-data-table.tsx',
      type: 'registry:component',
      content:
        "import { Table } from '../table/pdfx-table';\nexport function DataTable() { return null; }\n",
    },
  ],
  dependencies: ['@react-pdf/renderer'],
  registryDependencies: ['theme', 'table'],
};

function stubComponent(name: string): PdfxRegistryItem {
  return {
    name,
    type: 'registry:ui',
    title: name,
    description: name,
    files: [
      {
        path: `components/pdfx/${name}/pdfx-${name}.tsx`,
        type: 'registry:component',
        content: `export function ${name}() { return null; }\n`,
      },
    ],
    dependencies: ['@react-pdf/renderer'],
    registryDependencies: ['theme'],
  };
}

const invoice: PdfxRegistryItem = {
  name: 'invoice-modern',
  type: 'registry:block',
  title: 'Invoice Modern',
  description: 'Modern invoice',
  files: [
    {
      path: 'templates/pdfx/invoice-modern/invoice-modern.tsx',
      type: 'registry:file',
      content:
        "import { usePdfxTheme } from '../../lib/pdfx-theme-context';\nimport { Text } from '../../components/pdfx/text/pdfx-text';\nexport function Invoice() { return null; }\n",
    },
  ],
  dependencies: ['@react-pdf/renderer'],
  peerComponents: ['text', 'table'],
};

describe('rewriteThemeImportsForShadcn', () => {
  it('rewrites the pdfx-cli theme placeholder to src/lib', () => {
    const result = rewriteThemeImportsForShadcn(
      "import { theme } from '../lib/pdfx-theme';\nimport { usePdfxTheme } from '../lib/pdfx-theme-context';"
    );
    expect(result).toContain("from '../../../lib/pdfx-theme'");
    expect(result).toContain("from '../../../lib/pdfx-theme-context'");
    expect(result).not.toContain("from '../lib/pdfx-theme'");
  });

  it('leaves already-correct block imports unchanged', () => {
    const input = "import { theme } from '../../lib/pdfx-theme';";
    expect(rewriteThemeImportsForShadcn(input)).toBe(input);
  });
});

describe('toShadcnRegistryDependency', () => {
  it('maps the virtual theme dep onto @pdfx/theme', () => {
    expect(toShadcnRegistryDependency('theme')).toBe('@pdfx/theme');
  });

  it('maps a component name onto the @pdfx namespace', () => {
    expect(toShadcnRegistryDependency('table')).toBe('@pdfx/table');
  });

  it('leaves namespaced and URL deps unchanged', () => {
    expect(toShadcnRegistryDependency('@pdfx/table')).toBe('@pdfx/table');
    expect(toShadcnRegistryDependency('https://example.com/r/x.json')).toBe(
      'https://example.com/r/x.json'
    );
  });
});

describe('toShadcnComponentItem', () => {
  it('adds src/ targets and rewrites theme imports', () => {
    const item = toShadcnComponentItem(heading);
    expect(item.files[0]?.target).toBe('src/components/pdfx/heading/pdfx-heading.tsx');
    expect(item.files[0]?.content).toContain("from '../../../lib/pdfx-theme-context'");
    expect(item.registryDependencies).toEqual(['@pdfx/theme']);
    expect(item.$schema).toBe('https://ui.shadcn.com/schema/registry-item.json');
  });

  it('maps component-to-component deps', () => {
    const item = toShadcnComponentItem(dataTable);
    expect(item.registryDependencies).toEqual(['@pdfx/theme', '@pdfx/table']);
  });

  it('adds @react-pdf/types when generated files import it', () => {
    const item = toShadcnComponentItem({
      ...heading,
      files: [
        {
          ...heading.files[0],
          content: "import type { Style } from '@react-pdf/types';\nexport function Heading() {}\n",
        },
      ],
    });
    expect(item.devDependencies).toEqual(['@react-pdf/types']);
  });
});

describe('toShadcnBlockItem', () => {
  it('flattens blocks into src/blocks/pdfx and pulls peer components', () => {
    const item = toShadcnBlockItem(invoice);
    expect(item.type).toBe('registry:block');
    expect(item.files[0]?.target).toBe('src/blocks/pdfx/invoice-modern/invoice-modern.tsx');
    expect(item.files[0]?.type).toBe('registry:file');
    expect(item.files[0]?.content).toContain("from '../../../lib/pdfx-theme-context'");
    expect(item.files[0]?.content).not.toContain("from '../../lib/pdfx-theme-context'");
    expect(item.registryDependencies).toEqual(['@pdfx/text', '@pdfx/table', '@pdfx/theme']);
  });

  it('adds imported peers even when peerComponents omitted them', () => {
    const item = toShadcnBlockItem({
      ...invoice,
      peerComponents: ['text'],
      files: [
        {
          path: 'templates/pdfx/invoice-corporate/invoice-corporate.tsx',
          type: 'registry:file',
          content:
            "import { PdfImage } from '../../components/pdfx/pdf-image/pdfx-pdf-image';\nimport { Text } from '../../components/pdfx/text/pdfx-text';\n",
        },
      ],
    });
    expect(item.registryDependencies).toEqual(['@pdfx/text', '@pdfx/pdf-image']);
    expect(item.files[0]?.content).toContain(
      "from '../../../components/pdfx/pdf-image/pdfx-pdf-image'"
    );
  });
});

describe('buildShadcnRegistry', () => {
  it('emits a catalog without file content and a theme lib item', () => {
    const { catalog, items } = buildShadcnRegistry({
      components: [heading, stubComponent('table'), stubComponent('text')],
      blocks: [invoice],
      themeFile: 'export const theme = {};\n',
      themeContextFile: 'export function usePdfxTheme() {}\n',
    });

    expect(catalog.name).toBe('pdfx');
    expect(catalog.homepage).toBe('https://getpdfx.dev');
    expect(catalog.items.every((item) => item.files.every((file) => !('content' in file)))).toBe(
      true
    );

    const names = items.map((item) => item.name);
    expect(names).toContain('theme');
    expect(names).toContain('heading');
    expect(names).toContain('invoice-modern');

    const theme = items.find((item) => item.name === 'theme');
    expect(theme?.type).toBe('registry:lib');
    expect(theme?.files.map((file) => file.target)).toEqual([
      'src/lib/pdfx-theme.ts',
      'src/lib/pdfx-theme-context.tsx',
    ]);
  });

  it('rejects a missing registry dependency', () => {
    expect(() =>
      buildShadcnRegistry({
        components: [heading],
        blocks: [],
        themeFile: 'theme',
        themeContextFile: 'context',
      })
    ).not.toThrow();

    expect(() =>
      buildShadcnRegistry({
        components: [dataTable],
        blocks: [],
        themeFile: 'theme',
        themeContextFile: 'context',
      })
    ).toThrow(/@pdfx\/table/);
  });
});

describe('assertShadcnRegistry', () => {
  it('rejects duplicate names', () => {
    const theme = createShadcnThemeItem('a', 'b');
    const dup: ShadcnRegistryItem = { ...theme, name: 'heading' };
    const headingItem = toShadcnComponentItem(heading);
    expect(() => assertShadcnRegistry([theme, headingItem, dup])).toThrow(/duplicate/);
  });
});

describe('buildShadcnCatalog', () => {
  it('strips content from every file entry', () => {
    const item = toShadcnComponentItem(heading);
    const catalogItem = buildShadcnCatalog([item]).items[0];
    expect(catalogItem?.files[0]).toEqual({
      path: 'components/pdfx/heading/pdfx-heading.tsx',
      type: 'registry:component',
      target: 'src/components/pdfx/heading/pdfx-heading.tsx',
    });
  });
});

describe('generated registry contract', () => {
  const publicR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../public/r');

  it('does not change pdfx-cli heading.json theme dep', () => {
    const item = JSON.parse(fs.readFileSync(path.join(publicR, 'heading.json'), 'utf-8')) as {
      registryDependencies?: string[];
    };
    expect(item.registryDependencies).toContain('theme');
    expect(item.registryDependencies).not.toContain('@pdfx/theme');
  });

  it('rewrites graph companion imports and inlines PdfxTheme in utils', () => {
    const item = JSON.parse(fs.readFileSync(path.join(publicR, 'shadcn/graph.json'), 'utf-8')) as {
      files: Array<{ path: string; content: string }>;
    };
    const tsx = item.files.find((file) => file.path.endsWith('pdfx-graph.tsx'));
    const utils = item.files.find((file) => file.path.endsWith('pdfx-graph.utils.ts'));
    expect(tsx?.content).toContain("from './pdfx-graph.utils'");
    expect(tsx?.content).not.toContain("from './graph.utils'");
    expect(utils?.content).toContain('type PdfxTheme = ReturnType<typeof usePdfxTheme>');
    expect(utils?.content).not.toContain("'@pdfx/shared'");
  });
});
