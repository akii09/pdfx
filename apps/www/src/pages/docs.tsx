export default function DocsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Documentation</h1>

      <div className="prose max-w-none">
        <h2>Installation</h2>
        <p className="text-gray-600 mb-2">
          Components are installed to <code>./src/components/pdfx/</code> by default (configurable via pdfx init).
        </p>
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg">
          <code>{`npx @pdfx/cli init
npx @pdfx/cli add heading`}</code>
        </pre>

        <h2>Usage</h2>
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg">
          <code>{`import { Document, Page } from '@react-pdf/renderer';
import { Heading } from '@/components/pdfx/pdfx-heading';

export function MyDocument() {
  return (
    <Document>
      <Page>
        <Heading level={1}>Hello World</Heading>
      </Page>
    </Document>
  );
}`}</code>
        </pre>
      </div>
    </div>
  );
}
