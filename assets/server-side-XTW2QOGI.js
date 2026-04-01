import{j as e}from"./vendor-react-pdf-D5yotT0u.js";import{C as r}from"./code-block-BwEgw_WR.js";import{u as s}from"./use-document-title-OpN4jE9d.js";import"./vendor-router-CswRncel.js";import"./index-I6Bgo7YV.js";import"./copy-button-DpTwZmz3.js";import"./check-bUT-wbKf.js";const t=`import { renderToBuffer } from '@react-pdf/renderer';
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

generatePdf();`,a=`import { renderToStream } from '@react-pdf/renderer';
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

app.listen(3000, () => console.log('Server running on http://localhost:3000'));`,n=`// app/api/pdf/route.ts
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
}`,o=`// scripts/generate-report.ts
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
console.log('Report generated at ./reports/monthly.pdf');`,d=`import { Font } from '@react-pdf/renderer';
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
});`;function g(){return s("Server-side / Node.js"),e.jsxs("article",{className:"py-12 max-w-3xl","aria-label":"Server-side PDF generation guide",children:[e.jsxs("header",{className:"mb-12",children:[e.jsx("h1",{className:"text-3xl sm:text-4xl font-bold tracking-tight mb-3",children:"Server-side / Node.js"}),e.jsxs("p",{className:"text-base text-muted-foreground leading-relaxed",children:["PDFx components work in Node.js just as well as in the browser."," ",e.jsx("code",{className:"rounded bg-muted px-1.5 py-0.5 text-xs font-mono font-semibold",children:"@react-pdf/renderer"})," ","supports three server-side rendering methods that cover every use case — saving a file, streaming an HTTP response, or returning a buffer from an API route."]})]}),e.jsxs("section",{className:"mb-12","aria-labelledby":"when-to-use",children:[e.jsxs("h2",{id:"when-to-use",className:"text-xl font-semibold tracking-tight mb-3 flex items-center gap-2",children:[e.jsx("span",{className:"flex h-6 w-1 rounded-full bg-primary"}),"Browser vs. Server-side"]}),e.jsxs("div",{className:"grid sm:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"rounded-xl border bg-card p-5",children:[e.jsx("h3",{className:"font-semibold text-sm mb-2",children:"Browser rendering"}),e.jsxs("ul",{className:"space-y-1.5 text-sm text-muted-foreground",children:[e.jsxs("li",{className:"flex gap-2",children:[e.jsx("span",{className:"text-green-500 mt-0.5 shrink-0",children:"✓"}),"Preview before download"]}),e.jsxs("li",{className:"flex gap-2",children:[e.jsx("span",{className:"text-green-500 mt-0.5 shrink-0",children:"✓"}),"Interactive UI with live updates"]}),e.jsxs("li",{className:"flex gap-2",children:[e.jsx("span",{className:"text-green-500 mt-0.5 shrink-0",children:"✓"}),"No server required"]})]})]}),e.jsxs("div",{className:"rounded-xl border bg-card p-5",children:[e.jsx("h3",{className:"font-semibold text-sm mb-2",children:"Server-side rendering"}),e.jsxs("ul",{className:"space-y-1.5 text-sm text-muted-foreground",children:[e.jsxs("li",{className:"flex gap-2",children:[e.jsx("span",{className:"text-green-500 mt-0.5 shrink-0",children:"✓"}),"Scheduled or automated reports"]}),e.jsxs("li",{className:"flex gap-2",children:[e.jsx("span",{className:"text-green-500 mt-0.5 shrink-0",children:"✓"}),"Email attachments at scale"]}),e.jsxs("li",{className:"flex gap-2",children:[e.jsx("span",{className:"text-green-500 mt-0.5 shrink-0",children:"✓"}),"Serverless API routes (Next.js, etc.)"]})]})]})]})]}),e.jsxs("section",{className:"mb-12","aria-labelledby":"render-to-buffer",children:[e.jsxs("h2",{id:"render-to-buffer",className:"text-xl font-semibold tracking-tight mb-2 flex items-center gap-2",children:[e.jsx("span",{className:"flex h-6 w-1 rounded-full bg-primary"}),"renderToBuffer"]}),e.jsxs("p",{className:"text-sm text-muted-foreground mb-4",children:["Returns a"," ",e.jsx("code",{className:"rounded bg-muted px-1.5 py-0.5 text-xs font-mono font-semibold",children:"Buffer"})," ","containing the PDF bytes. Use this to save a file, return from an API, or attach to an email."]}),e.jsx(r,{code:t,language:"tsx",filename:"generate-pdf.tsx"})]}),e.jsxs("section",{className:"mb-12","aria-labelledby":"render-to-stream",children:[e.jsxs("h2",{id:"render-to-stream",className:"text-xl font-semibold tracking-tight mb-2 flex items-center gap-2",children:[e.jsx("span",{className:"flex h-6 w-1 rounded-full bg-primary"}),"renderToStream — Express.js"]}),e.jsx("p",{className:"text-sm text-muted-foreground mb-4",children:"Streams the PDF directly into an HTTP response without buffering the entire document in memory. Ideal for large documents or high-throughput APIs."}),e.jsx(r,{code:a,language:"tsx",filename:"server.tsx"})]}),e.jsxs("section",{className:"mb-12","aria-labelledby":"nextjs-route",children:[e.jsxs("h2",{id:"nextjs-route",className:"text-xl font-semibold tracking-tight mb-2 flex items-center gap-2",children:[e.jsx("span",{className:"flex h-6 w-1 rounded-full bg-primary"}),"Next.js App Router API route"]}),e.jsxs("p",{className:"text-sm text-muted-foreground mb-4",children:["Use"," ",e.jsx("code",{className:"rounded bg-muted px-1.5 py-0.5 text-xs font-mono font-semibold",children:"renderToBuffer"})," ","inside a Next.js"," ",e.jsx("code",{className:"rounded bg-muted px-1.5 py-0.5 text-xs font-mono font-semibold",children:"route.ts"})," ","handler to serve PDFs on demand."]}),e.jsx(r,{code:n,language:"tsx",filename:"app/api/pdf/route.ts"})]}),e.jsxs("section",{className:"mb-12","aria-labelledby":"standalone-script",children:[e.jsxs("h2",{id:"standalone-script",className:"text-xl font-semibold tracking-tight mb-2 flex items-center gap-2",children:[e.jsx("span",{className:"flex h-6 w-1 rounded-full bg-primary"}),"Standalone Node.js script"]}),e.jsxs("p",{className:"text-sm text-muted-foreground mb-4",children:[e.jsx("code",{className:"rounded bg-muted px-1.5 py-0.5 text-xs font-mono font-semibold",children:"renderToFile"})," ","is a convenience wrapper around"," ",e.jsx("code",{className:"rounded bg-muted px-1.5 py-0.5 text-xs font-mono font-semibold",children:"renderToBuffer"})," ","that writes directly to a file path. Great for build scripts and scheduled report generation."]}),e.jsx(r,{code:o,language:"tsx",filename:"scripts/generate-report.tsx"})]}),e.jsxs("section",{className:"mb-12","aria-labelledby":"env-notes",children:[e.jsxs("h2",{id:"env-notes",className:"text-xl font-semibold tracking-tight mb-3 flex items-center gap-2",children:[e.jsx("span",{className:"flex h-6 w-1 rounded-full bg-primary"}),"Environment notes"]}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"rounded-xl border border-amber-200 bg-amber-50 dark:border-amber-900/40 dark:bg-amber-950/20 p-4 text-sm",children:[e.jsx("p",{className:"font-semibold text-amber-900 dark:text-amber-400 mb-1",children:"No browser APIs available"}),e.jsxs("p",{className:"text-amber-800 dark:text-amber-500/80 leading-relaxed",children:["Server-side rendering runs in a pure Node.js environment."," ",e.jsx("code",{className:"rounded bg-amber-100 dark:bg-amber-900/40 px-1 py-0.5 text-xs font-mono",children:"window"}),","," ",e.jsx("code",{className:"rounded bg-amber-100 dark:bg-amber-900/40 px-1 py-0.5 text-xs font-mono",children:"document"}),", and other browser globals are not available. Avoid importing browser-only code paths inside components that will be rendered server-side."]})]}),e.jsxs("div",{className:"rounded-xl border bg-card p-4",children:[e.jsx("p",{className:"font-semibold text-sm mb-2",children:"Font loading differences"}),e.jsx("p",{className:"text-sm text-muted-foreground leading-relaxed mb-3",children:"On the server, load fonts from the filesystem using absolute paths. In the browser, load fonts from a URL."}),e.jsx(r,{code:d,language:"tsx",filename:"font-setup.ts"})]}),e.jsxs("div",{className:"rounded-xl border bg-card p-4 text-sm",children:[e.jsx("p",{className:"font-semibold mb-1",children:"TypeScript support"}),e.jsxs("p",{className:"text-muted-foreground leading-relaxed",children:["Add"," ",e.jsx("code",{className:"rounded bg-muted px-1.5 py-0.5 text-xs font-mono font-semibold",children:"@react-pdf/types"})," ","as a dev dependency for full type safety:"]}),e.jsx("pre",{className:"mt-3 bg-muted/60 px-3 py-2 rounded text-xs font-mono overflow-x-auto",children:e.jsx("code",{children:"npm install -D @react-pdf/types"})})]})]})]})]})}export{g as default};
