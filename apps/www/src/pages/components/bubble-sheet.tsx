import { bubbleSheetProps, bubbleSheetUsageCode } from '@/constants';
import { BubbleSheet } from '@pdfx/components';
import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import { ComponentPage } from '../../components/component-page';
import { PDFPreview } from '../../components/pdf-preview';
import { useDocumentTitle } from '../../hooks/use-document-title';

const styles = StyleSheet.create({
  page: { padding: 40 },
});

type BubbleSizeVariant = 'sm' | 'md' | 'lg';

const renderPreviewDocument = (bubbleSize: BubbleSizeVariant) => (
  <Document title="PDFx BubbleSheet Preview">
    <Page size="A4" style={styles.page}>
      <BubbleSheet
        title="Final Exam — Answer Sheet"
        studentInfoFields={['Name', 'Student ID', 'Date', 'Class']}
        questions={40}
        choices={['A', 'B', 'C', 'D', 'E']}
        columns={2}
        bubbleSize={bubbleSize}
      />
    </Page>
  </Document>
);

const sizeOptions = [
  { value: 'sm' as BubbleSizeVariant, label: 'Small' },
  { value: 'md' as BubbleSizeVariant, label: 'Medium' },
  { value: 'lg' as BubbleSizeVariant, label: 'Large' },
];

export default function BubbleSheetComponentPage() {
  useDocumentTitle('BubbleSheet Component');

  return (
    <ComponentPage
      title="BubbleSheet"
      description="An OMR-style answer sheet for exams and assessments. Renders a numbered bubble grid with choice headers and an optional student info section — fully themeable."
      installCommand="npx pdfx-cli add bubble-sheet"
      componentName="bubble-sheet"
      preview={
        <PDFPreview
          title="Preview"
          downloadFilename="bubble-sheet-preview.pdf"
          variants={{
            options: sizeOptions,
            defaultValue: 'md' as BubbleSizeVariant,
            label: 'Bubble Size',
          }}
        >
          {/* biome-ignore lint/suspicious/noExplicitAny: Generic type workaround for React JSX components */}
          {renderPreviewDocument as any}
        </PDFPreview>
      }
      usageCode={bubbleSheetUsageCode}
      usageFilename="src/components/pdfx/bubble-sheet/bubble-sheet.tsx"
      props={bubbleSheetProps}
      additionalInfo={
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/40 p-4">
            <h3 className="text-sm font-semibold mb-2">Bubble Size Guide</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-foreground">•</span>
                <span>
                  <strong className="text-foreground">sm (8pt)</strong> — Dense sheets with 60+
                  questions. Fits more rows per page.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-foreground">•</span>
                <span>
                  <strong className="text-foreground">md (10pt)</strong> — Standard exam sheets.
                  Good balance of readability and density.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-foreground">•</span>
                <span>
                  <strong className="text-foreground">lg (13pt)</strong> — Large-print or
                  accessibility-focused sheets.
                </span>
              </li>
            </ul>
          </div>
          <div className="rounded-lg border bg-muted/40 p-4">
            <h3 className="text-sm font-semibold mb-2">Custom Choices</h3>
            <p className="text-sm text-muted-foreground">
              The{' '}
              <code className="text-xs bg-muted px-1 rounded">choices</code> prop accepts any
              string array. Use{' '}
              <code className="text-xs bg-muted px-1 rounded">['T', 'F']</code> for true/false
              quizzes, or{' '}
              <code className="text-xs bg-muted px-1 rounded">['A', 'B', 'C', 'D']</code> for
              4-option multiple choice.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/40 p-4">
            <h3 className="text-sm font-semibold mb-2">Column Layout</h3>
            <p className="text-sm text-muted-foreground">
              Questions are split evenly across{' '}
              <code className="text-xs bg-muted px-1 rounded">columns</code>. A 40-question sheet
              with <code className="text-xs bg-muted px-1 rounded">columns={2}</code> renders
              Q1–20 on the left and Q21–40 on the right, saving vertical space.
            </p>
          </div>
        </div>
      }
    />
  );
}
