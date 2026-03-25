#!/usr/bin/env tsx
/**
 * generate-seo-html.ts
 *
 * Run AFTER `vite build`. For each known SPA route:
 *  1. Reads dist/index.html
 *  2. Swaps in route-specific <title>, <meta name="description">,
 *     <link rel="canonical">, and OG/Twitter tags
 *  3. Writes dist/<route>/index.html
 *
 * Vercel serves static files before applying rewrites, so crawlers
 * that can't execute JS will receive real per-page metadata.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');
const BASE_URL = 'https://pdfx.akashpise.dev';

interface RouteMeta {
  title: string;
  description: string;
}

const COMPONENT_BASE =
  'Copy-paste into your project — no package lock-in. Built on @react-pdf/renderer.';

const routes: Record<string, RouteMeta> = {
  // ── Top-level pages ──────────────────────────────────────────────────────
  '/docs': {
    title: 'Documentation — PDFx',
    description:
      'Get started with PDFx. Learn how to install, configure themes, and add PDF components to your React project using the CLI.',
  },
  '/docs/server-side': {
    title: 'Server-side / Node.js — PDFx',
    description:
      'Generate PDFs in Node.js with PDFx. Full guide covering renderToBuffer, renderToStream, Express.js, Next.js App Router, and standalone scripts.',
  },
  '/installation': {
    title: 'Installation — PDFx',
    description:
      'Install PDFx in seconds. Run `npx @akii09/pdfx-cli init` to scaffold your PDF component library and pick your first theme.',
  },

  // ── Components hub ───────────────────────────────────────────────────────
  '/components': {
    title: 'Components — PDFx',
    description:
      '24 copy-paste React PDF components built on @react-pdf/renderer. Heading, Table, Badge, Graph, QR Code, Watermark and more.',
  },

  // ── Individual components ─────────────────────────────────────────────────
  '/components/heading': {
    title: 'Heading — PDFx',
    description: `PDFx Heading component: render styled H1–H6 headings inside React PDF documents. ${COMPONENT_BASE}`,
  },
  '/components/text': {
    title: 'Text — PDFx',
    description: `PDFx Text component: flexible inline & block text with theme-aware typography for @react-pdf/renderer. ${COMPONENT_BASE}`,
  },
  '/components/link': {
    title: 'Link — PDFx',
    description: `PDFx Link component: clickable hyperlinks inside PDF documents with consistent styling. ${COMPONENT_BASE}`,
  },
  '/components/divider': {
    title: 'Divider — PDFx',
    description: `PDFx Divider component: horizontal rule for separating PDF sections with configurable width and color. ${COMPONENT_BASE}`,
  },
  '/components/page-break': {
    title: 'Page Break — PDFx',
    description: `PDFx PageBreak component: force a new page inside a React PDF document at any point in your layout. ${COMPONENT_BASE}`,
  },
  '/components/stack': {
    title: 'Stack — PDFx',
    description: `PDFx Stack component: flex-based vertical or horizontal layout container for PDF documents. ${COMPONENT_BASE}`,
  },
  '/components/section': {
    title: 'Section — PDFx',
    description: `PDFx Section component: top-level content section with optional title and spacing for PDF layouts. ${COMPONENT_BASE}`,
  },
  '/components/table': {
    title: 'Table — PDFx',
    description: `PDFx Table component: render HTML-like tables in PDF with headers, rows, alternating stripes, and theme colors. ${COMPONENT_BASE}`,
  },
  '/components/data-table': {
    title: 'Data Table — PDFx',
    description: `PDFx DataTable component: data-driven PDF table from an array of objects with automatic column inference. ${COMPONENT_BASE}`,
  },
  '/components/list': {
    title: 'List — PDFx',
    description: `PDFx List component: ordered and unordered lists with custom bullet styles inside React PDF documents. ${COMPONENT_BASE}`,
  },
  '/components/card': {
    title: 'Card — PDFx',
    description: `PDFx Card component: bordered content card with optional header and body padding for PDF layouts. ${COMPONENT_BASE}`,
  },
  '/components/form': {
    title: 'Form — PDFx',
    description: `PDFx Form component: render labeled field groups inside PDF documents — great for invoices and documents. ${COMPONENT_BASE}`,
  },
  '/components/signature': {
    title: 'Signature — PDFx',
    description: `PDFx Signature component: signature block with name, role, date, and underline for PDF contracts and agreements. ${COMPONENT_BASE}`,
  },
  '/components/page-header': {
    title: 'Page Header — PDFx',
    description: `PDFx PageHeader component: fixed page header with logo, title, and subtitle printed on every PDF page. ${COMPONENT_BASE}`,
  },
  '/components/page-footer': {
    title: 'Page Footer — PDFx',
    description: `PDFx PageFooter component: fixed page footer with contact info and page numbers for every PDF page. ${COMPONENT_BASE}`,
  },
  '/components/badge': {
    title: 'Badge — PDFx',
    description: `PDFx Badge component: small inline label for status, categories, and tags inside PDF documents. ${COMPONENT_BASE}`,
  },
  '/components/key-value': {
    title: 'Key Value — PDFx',
    description: `PDFx KeyValue component: two-column label/value pairs for metadata, invoices, and summaries in PDFs. ${COMPONENT_BASE}`,
  },
  '/components/keep-together': {
    title: 'Keep Together — PDFx',
    description: `PDFx KeepTogether component: prevent a group of elements from splitting across PDF pages. ${COMPONENT_BASE}`,
  },
  '/components/pdf-image': {
    title: 'PDF Image — PDFx',
    description: `PDFx PdfImage component: embed images in PDF documents with sizing, aspect-ratio, and theme border support. ${COMPONENT_BASE}`,
  },
  '/components/graph': {
    title: 'Graph — PDFx',
    description: `PDFx Graph component: embed SVG bar, line, or pie charts as native vector graphics inside PDF documents. ${COMPONENT_BASE}`,
  },
  '/components/page-number': {
    title: 'Page Number — PDFx',
    description: `PDFx PageNumber component: dynamic current/total page counter for PDF headers and footers. ${COMPONENT_BASE}`,
  },
  '/components/watermark': {
    title: 'Watermark — PDFx',
    description: `PDFx Watermark component: diagonal or centered text watermark overlaid on every PDF page. ${COMPONENT_BASE}`,
  },
  '/components/qrcode': {
    title: 'QR Code — PDFx',
    description: `PDFx QRCode component: render scannable QR codes as native PDF vector inside a React PDF document. ${COMPONENT_BASE}`,
  },
  '/components/alert': {
    title: 'Alert — PDFx',
    description: `PDFx Alert component: info, warning, error, and success callout boxes for React PDF documents. ${COMPONENT_BASE}`,
  },

  // ── Blocks ────────────────────────────────────────────────────────────────
  '/blocks': {
    title: 'Blocks — PDFx',
    description:
      'Pre-built PDF document blocks. Add a complete invoice or report layout in one CLI command: `pdfx block add invoice-modern`.',
  },
  '/blocks/invoices': {
    title: 'Invoice Blocks — PDFx',
    description:
      'Six professional invoice PDF templates — classic, modern, minimal, corporate, creative, and consultant styles. Add with the PDFx CLI.',
  },
  '/blocks/reports': {
    title: 'Report Blocks — PDFx',
    description:
      'Pre-built report PDF blocks for analytics, financial, and business reports. Add with `pdfx block add` and fully customize.',
  },
};

function injectMeta(html: string, route: string, meta: RouteMeta): string {
  const canonical = `${BASE_URL}${route}`;
  const { title, description } = meta;

  // Replace <title>
  let out = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${title}</title>`,
  );

  // Replace <meta name="description">
  out = out.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${description}"`,
  );

  // Replace canonical href
  out = out.replace(
    /<link rel="canonical" href="[^"]*"/,
    `<link rel="canonical" href="${canonical}"`,
  );

  // Replace OG url
  out = out.replace(
    /<meta property="og:url" content="[^"]*"/,
    `<meta property="og:url" content="${canonical}"`,
  );

  // Replace OG title
  out = out.replace(
    /<meta property="og:title" content="[^"]*"/,
    `<meta property="og:title" content="${title}"`,
  );

  // Replace OG description
  out = out.replace(
    /<meta property="og:description" content="[^"]*"/,
    `<meta property="og:description" content="${description}"`,
  );

  // Replace Twitter title
  out = out.replace(
    /<meta name="twitter:title" content="[^"]*"/,
    `<meta name="twitter:title" content="${title}"`,
  );

  // Replace Twitter description
  out = out.replace(
    /<meta name="twitter:description" content="[^"]*"/,
    `<meta name="twitter:description" content="${description}"`,
  );

  return out;
}

async function main() {
  const indexHtml = await fs.readFile(path.join(distDir, 'index.html'), 'utf-8');

  let generated = 0;
  let failed = 0;

  for (const [route, meta] of Object.entries(routes)) {
    const routeDir = path.join(distDir, route);
    const outFile = path.join(routeDir, 'index.html');

    try {
      await fs.mkdir(routeDir, { recursive: true });
      const html = injectMeta(indexHtml, route, meta);
      await fs.writeFile(outFile, html, 'utf-8');
      generated++;
      console.log(`  ✓ ${route}`);
    } catch (err) {
      failed++;
      console.error(`  ✗ ${route}: ${(err as Error).message}`);
    }
  }

  console.log(`\nGenerated ${generated} route HTML files (${failed} failed).`);
  if (failed > 0) process.exit(1);
}

main();
