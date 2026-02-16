import { Heading } from '@pdfx/ui';
import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import { PDFPreview } from '../../components/pdf-preview';

const styles = StyleSheet.create({
  page: { padding: 30 },
});

export default function HeadingComponentPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-2">Heading</h1>
      <p className="text-gray-600 mb-8">PDF heading component with 6 levels</p>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Installation</h2>
        <p className="text-gray-600 mb-2">
          Installs to <code>src/components/pdfx/pdfx-heading.tsx</code> (default path from pdfx init).
        </p>
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg">
          <code>npx @pdfx/cli add heading</code>
        </pre>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Preview</h2>
        <PDFPreview>
          <Document>
            <Page size="A4" style={styles.page}>
              <Heading level={1}>Heading 1</Heading>
              <Heading level={2}>Heading 2</Heading>
              <Heading level={3}>Heading 3</Heading>
              <Heading level={4}>Heading 4</Heading>
              <Heading level={5}>Heading 5</Heading>
              <Heading level={6}>Heading 6</Heading>
            </Page>
          </Document>
        </PDFPreview>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Usage</h2>
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
          <code>{`import { Heading } from '@/components/pdfx/pdfx-heading';

<Heading level={1}>Main Title</Heading>
<Heading level={2}>Subtitle</Heading>`}</code>
        </pre>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Props</h2>
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-50">
              <th className="border p-2 text-left">Prop</th>
              <th className="border p-2 text-left">Type</th>
              <th className="border p-2 text-left">Default</th>
              <th className="border p-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">
                <code>level</code>
              </td>
              <td className="border p-2">
                <code>1 | 2 | 3 | 4 | 5 | 6</code>
              </td>
              <td className="border p-2">
                <code>1</code>
              </td>
              <td className="border p-2">Heading level</td>
            </tr>
            <tr>
              <td className="border p-2">
                <code>children</code>
              </td>
              <td className="border p-2">
                <code>string</code>
              </td>
              <td className="border p-2">-</td>
              <td className="border p-2">Heading text</td>
            </tr>
            <tr>
              <td className="border p-2">
                <code>style</code>
              </td>
              <td className="border p-2">
                <code>Style</code>
              </td>
              <td className="border p-2">-</td>
              <td className="border p-2">Custom styles</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
