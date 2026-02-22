import { listProps, listUsageCode } from '@/constants';
import { PdfList } from '@pdfx/ui';
import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import { ComponentPage } from '../../components/component-page';
import { PDFPreview } from '../../components/pdf-preview';
import { useDocumentTitle } from '../../hooks/use-document-title';

const styles = StyleSheet.create({
  page: { padding: 40 },
});

type ListVariant = 'bullet' | 'numbered' | 'checklist' | 'icon' | 'multi-level' | 'descriptive';

const sampleItems = [
  { text: 'Design system alignment', description: 'Match all components to the design spec' },
  { text: 'Component implementation', description: 'Build PDF-native components' },
  { text: 'Write unit tests', description: 'Cover all variants and edge cases' },
];

const checkItems = [
  { text: 'Design system alignment', checked: true },
  { text: 'Component implementation', checked: true },
  { text: 'Write unit tests', checked: false },
];

const nestedItems = [
  {
    text: 'Frontend',
    children: [{ text: 'React components' }, { text: 'PDF renderer' }],
  },
  {
    text: 'Backend',
    children: [{ text: 'REST API' }, { text: 'Database' }],
  },
];

const renderPreviewDocument = (variant: ListVariant) => (
  <Document title="PDFx List Preview">
    <Page size="A4" style={styles.page}>
      <PdfList
        variant={variant}
        items={
          variant === 'checklist'
            ? checkItems
            : variant === 'multi-level'
              ? nestedItems
              : sampleItems
        }
      />
    </Page>
  </Document>
);

const variantOptions = [
  { value: 'bullet' as ListVariant, label: 'Bullet' },
  { value: 'numbered' as ListVariant, label: 'Numbered' },
  { value: 'checklist' as ListVariant, label: 'Checklist' },
  { value: 'icon' as ListVariant, label: 'Icon' },
  { value: 'multi-level' as ListVariant, label: 'Multi-Level' },
  { value: 'descriptive' as ListVariant, label: 'Descriptive' },
];

export default function ListComponentPage() {
  useDocumentTitle('List Component');

  return (
    <ComponentPage
      title="List"
      description="Flexible PDF list component with 6 visual variants: bullet, numbered, checklist, icon, multi-level, and descriptive."
      installCommand="npx @pdfx/cli add list"
      componentName="list"
      preview={
        <PDFPreview
          title="Preview"
          downloadFilename="list-preview.pdf"
          variants={{
            options: variantOptions,
            defaultValue: 'bullet' as ListVariant,
            label: 'Variant',
          }}
        >
          {/* biome-ignore lint/suspicious/noExplicitAny: Generic type workaround for React JSX components */}
          {renderPreviewDocument as any}
        </PDFPreview>
      }
      usageCode={listUsageCode}
      usageFilename="src/components/pdfx/list/pdfx-list.tsx"
      props={listProps}
      additionalInfo={
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/40 p-4">
            <h3 className="text-sm font-semibold mb-2">Variant Guide</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-foreground">•</span>
                <span>
                  <strong className="text-foreground">bullet</strong> — Classic bullet points using
                  •. Sub-items use ◦ (open circle).
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-foreground">•</span>
                <span>
                  <strong className="text-foreground">numbered</strong> — Sequential numbered items
                  (1. 2. 3.) for ordered content.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-foreground">•</span>
                <span>
                  <strong className="text-foreground">checklist</strong> — Checkbox squares with
                  optional check marks. Uses{' '}
                  <code className="text-xs bg-muted px-1 rounded">checked</code> prop per item.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-foreground">•</span>
                <span>
                  <strong className="text-foreground">icon</strong> — Star icon in a primary-color
                  box before each item.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-foreground">•</span>
                <span>
                  <strong className="text-foreground">multi-level</strong> — Nested hierarchical
                  list. Top-level items are bold; child items are indented with ◦.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-foreground">•</span>
                <span>
                  <strong className="text-foreground">descriptive</strong> — Each item has a bold
                  title and a muted description below, with a colored left accent bar.
                </span>
              </li>
            </ul>
          </div>
        </div>
      }
    />
  );
}
