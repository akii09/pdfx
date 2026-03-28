import { CodeBlock } from '@/components/code-block';
import { useDocumentTitle } from '../../hooks/use-document-title';

const renderToBufferExample = `import { renderToBuffer } from '@react-pdf/renderer';
import { Document, Page } from '@react-pdf/renderer';
import { Heading } from './src/components/pdfx/heading/pdfx-heading';
import { Text } from './src/components/pdfx/text/pdfx-text';
import fs from 'node:fs';

async function generatePdf() {
  const doc = (
    <Document>
      <Page size="A4" style={{ padding: 40 }}>
        <Heading level={1}>Hello from Node.js</Heading>
        <Text>Generated server-side with PDFx.</Text>
      </Page>
    </Document>
  );

  const buffer = await renderToBuffer(doc);
  fs.writeFileSync('./output.pdf', buffer);
  console.log('PDF saved to output.pdf');
}

generatePdf();`;

const renderToStreamExample = `import { renderToStream } from '@react-pdf/renderer';
import express from 'express';
import { Document, Page } from '@react-pdf/renderer';
import { Heading } from './src/components/pdfx/heading/pdfx-heading';

const app = express();

app.get('/download/invoice', async (req, res) => {
  const doc = (
    <Document>
      <Page size="A4" style={{ padding: 40 }}>
        <Heading level={1}>Invoice #1001</Heading>
      </Page>
    </Document>
  );

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="invoice.pdf"');

  const stream = await renderToStream(doc);
  stream.pipe(res);
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));`;

const nextjsRouteExample = `// app/api/pdf/route.ts
import { renderToBuffer } from '@react-pdf/renderer';
import { NextResponse } from 'next/server';
import { Document, Page } from '@react-pdf/renderer';
import { Heading } from '@/components/pdfx/heading/pdfx-heading';
import { Text } from '@/components/pdfx/text/pdfx-text';

export async function GET() {
  const doc = (
    <Document>
      <Page size="A4" style={{ padding: 40 }}>
        <Heading level={1}>Server-side PDF</Heading>
        <Text>Generated in a Next.js App Router API route.</Text>
      </Page>
    </Document>
  );

  const buffer = await renderToBuffer(doc);

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="document.pdf"',
    },
  });
}`;

const standaloneScriptExample = `// scripts/generate-report.ts
import { renderToFile } from '@react-pdf/renderer';
import { Document, Page } from '@react-pdf/renderer';
import { Heading } from '../src/components/pdfx/heading/pdfx-heading';
import { Table } from '../src/components/pdfx/table/pdfx-table';

const data = [
  { item: 'Widget A', qty: 10, price: '$9.99' },
  { item: 'Widget B', qty: 5,  price: '$19.99' },
];

const doc = (
  <Document>
    <Page size="A4" style={{ padding: 40 }}>
      <Heading level={1}>Monthly Report</Heading>
      <Table
        columns={[
          { header: 'Item',  accessor: 'item' },
          { header: 'Qty',   accessor: 'qty' },
          { header: 'Price', accessor: 'price' },
        ]}
        data={data}
      />
    </Page>
  </Document>
);

await renderToFile(doc, './reports/monthly.pdf');
console.log('Report generated at ./reports/monthly.pdf');`;

const fontLoadingExample = `import { Font } from '@react-pdf/renderer';
import path from 'node:path';

// Server-side: load fonts from the filesystem
Font.register({
  family: 'Inter',
  src: path.resolve('./public/fonts/Inter-Regular.ttf'),
});

// Browser-side: load fonts from a URL
Font.register({
  family: 'Inter',
  src: 'https://fonts.gstatic.com/s/inter/v13/Inter-Regular.ttf',
});`;

export default function ServerSidePage() {
  useDocumentTitle('Server-side / Node.js');

  return (
    <article className="py-12 max-w-3xl" aria-label="Server-side PDF generation guide">
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          Server-side / Node.js
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          PDFx components work in Node.js just as well as in the browser.{' '}
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono font-semibold">
            @react-pdf/renderer
          </code>{' '}
          supports three server-side rendering methods that cover every use case — saving a file,
          streaming an HTTP response, or returning a buffer from an API route.
        </p>
      </header>

      {/* When to use server-side vs browser */}
      <section className="mb-12" aria-labelledby="when-to-use">
        <h2
          id="when-to-use"
          className="text-xl font-semibold tracking-tight mb-3 flex items-center gap-2"
        >
          <span className="flex h-6 w-1 rounded-full bg-primary" />
          Browser vs. Server-side
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl border bg-card p-5">
            <h3 className="font-semibold text-sm mb-2">Browser rendering</h3>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                Preview before download
              </li>
              <li className="flex gap-2">
                <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                Interactive UI with live updates
              </li>
              <li className="flex gap-2">
                <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                No server required
              </li>
            </ul>
          </div>
          <div className="rounded-xl border bg-card p-5">
            <h3 className="font-semibold text-sm mb-2">Server-side rendering</h3>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                Scheduled or automated reports
              </li>
              <li className="flex gap-2">
                <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                Email attachments at scale
              </li>
              <li className="flex gap-2">
                <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                Serverless API routes (Next.js, etc.)
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* renderToBuffer */}
      <section className="mb-12" aria-labelledby="render-to-buffer">
        <h2
          id="render-to-buffer"
          className="text-xl font-semibold tracking-tight mb-2 flex items-center gap-2"
        >
          <span className="flex h-6 w-1 rounded-full bg-primary" />
          renderToBuffer
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Returns a{' '}
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono font-semibold">
            Buffer
          </code>{' '}
          containing the PDF bytes. Use this to save a file, return from an API, or attach to an
          email.
        </p>
        <CodeBlock code={renderToBufferExample} language="tsx" filename="generate-pdf.tsx" />
      </section>

      {/* renderToStream (Express) */}
      <section className="mb-12" aria-labelledby="render-to-stream">
        <h2
          id="render-to-stream"
          className="text-xl font-semibold tracking-tight mb-2 flex items-center gap-2"
        >
          <span className="flex h-6 w-1 rounded-full bg-primary" />
          renderToStream — Express.js
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Streams the PDF directly into an HTTP response without buffering the entire document in
          memory. Ideal for large documents or high-throughput APIs.
        </p>
        <CodeBlock code={renderToStreamExample} language="tsx" filename="server.tsx" />
      </section>

      {/* Next.js App Router */}
      <section className="mb-12" aria-labelledby="nextjs-route">
        <h2
          id="nextjs-route"
          className="text-xl font-semibold tracking-tight mb-2 flex items-center gap-2"
        >
          <span className="flex h-6 w-1 rounded-full bg-primary" />
          Next.js App Router API route
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Use{' '}
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono font-semibold">
            renderToBuffer
          </code>{' '}
          inside a Next.js{' '}
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono font-semibold">
            route.ts
          </code>{' '}
          handler to serve PDFs on demand.
        </p>
        <CodeBlock code={nextjsRouteExample} language="tsx" filename="app/api/pdf/route.ts" />
      </section>

      {/* Standalone script */}
      <section className="mb-12" aria-labelledby="standalone-script">
        <h2
          id="standalone-script"
          className="text-xl font-semibold tracking-tight mb-2 flex items-center gap-2"
        >
          <span className="flex h-6 w-1 rounded-full bg-primary" />
          Standalone Node.js script
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono font-semibold">
            renderToFile
          </code>{' '}
          is a convenience wrapper around{' '}
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono font-semibold">
            renderToBuffer
          </code>{' '}
          that writes directly to a file path. Great for build scripts and scheduled report
          generation.
        </p>
        <CodeBlock
          code={standaloneScriptExample}
          language="tsx"
          filename="scripts/generate-report.tsx"
        />
      </section>

      {/* Environment notes */}
      <section className="mb-12" aria-labelledby="env-notes">
        <h2
          id="env-notes"
          className="text-xl font-semibold tracking-tight mb-3 flex items-center gap-2"
        >
          <span className="flex h-6 w-1 rounded-full bg-primary" />
          Environment notes
        </h2>
        <div className="space-y-4">
          <div className="rounded-xl border border-amber-200 bg-amber-50 dark:border-amber-900/40 dark:bg-amber-950/20 p-4 text-sm">
            <p className="font-semibold text-amber-900 dark:text-amber-400 mb-1">
              No browser APIs available
            </p>
            <p className="text-amber-800 dark:text-amber-500/80 leading-relaxed">
              Server-side rendering runs in a pure Node.js environment.{' '}
              <code className="rounded bg-amber-100 dark:bg-amber-900/40 px-1 py-0.5 text-xs font-mono">
                window
              </code>
              ,{' '}
              <code className="rounded bg-amber-100 dark:bg-amber-900/40 px-1 py-0.5 text-xs font-mono">
                document
              </code>
              , and other browser globals are not available. Avoid importing browser-only code paths
              inside components that will be rendered server-side.
            </p>
          </div>

          <div className="rounded-xl border bg-card p-4">
            <p className="font-semibold text-sm mb-2">Font loading differences</p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              On the server, load fonts from the filesystem using absolute paths. In the browser,
              load fonts from a URL.
            </p>
            <CodeBlock code={fontLoadingExample} language="tsx" filename="font-setup.ts" />
          </div>

          <div className="rounded-xl border bg-card p-4 text-sm">
            <p className="font-semibold mb-1">TypeScript support</p>
            <p className="text-muted-foreground leading-relaxed">
              Add{' '}
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono font-semibold">
                @react-pdf/types
              </code>{' '}
              as a dev dependency for full type safety:
            </p>
            <pre className="mt-3 bg-muted/60 px-3 py-2 rounded text-xs font-mono overflow-x-auto">
              <code>npm install -D @react-pdf/types</code>
            </pre>
          </div>
        </div>
      </section>
    </article>
  );
}
