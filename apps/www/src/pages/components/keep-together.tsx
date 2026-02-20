import { keepTogetherProps, keepTogetherUsageCode } from '@/constants';
import { Heading, KeepTogether, Section, Text } from '@pdfx/ui';
import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import { ComponentPage } from '../../components/component-page';
import { PDFPreview } from '../../components/pdf-preview';
import { useDocumentTitle } from '../../hooks/use-document-title';

const styles = StyleSheet.create({
  page: { padding: 40 },
});

const renderPreviewDocument = () => (
  <Document title="PDFx KeepTogether Preview">
    <Page size="A4" style={styles.page}>
      {/* Basic usage: keep heading + section together */}
      <KeepTogether>
        <Heading level={2}>Section Title</Heading>
        <Section variant="callout" padding="sm">
          <Text>
            This heading and callout section are wrapped in KeepTogether — they will never be
            separated by a page break. The layout engine treats them as a single atomic block.
          </Text>
        </Section>
      </KeepTogether>

      {/* minPresenceAhead: softer guard */}
      <KeepTogether minPresenceAhead={80}>
        <Heading level={3}>Subsection Heading</Heading>
        <Text>
          This heading uses minPresenceAhead={80}. If fewer than 80pt remain on the current page,
          the heading moves to the next page — but it does not prevent the content below from
          wrapping normally.
        </Text>
      </KeepTogether>

      {/* Plain usage */}
      <KeepTogether>
        <Heading level={4}>Signature Block</Heading>
        <Section variant="card" padding="sm">
          <Text>Content that must always stay with its heading.</Text>
        </Section>
      </KeepTogether>
    </Page>
  </Document>
);

export default function KeepTogetherComponentPage() {
  useDocumentTitle('KeepTogether Component');

  return (
    <ComponentPage
      title="KeepTogether"
      description="Utility wrapper that prevents its children from being split across page boundaries. Wraps content in a react-pdf wrap={false} View — treating the subtree as an atomic block that either fits on the current page or moves entirely to the next."
      installCommand="npx @pdfx/cli add keep-together"
      componentName="keep-together"
      preview={
        <PDFPreview title="Preview" downloadFilename="keep-together-preview.pdf">
          {/* biome-ignore lint/suspicious/noExplicitAny: Generic type workaround for React JSX components */}
          {renderPreviewDocument as any}
        </PDFPreview>
      }
      usageCode={keepTogetherUsageCode}
      usageFilename="src/components/pdfx/pdfx-keep-together.tsx"
      props={keepTogetherProps}
      additionalInfo={
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/40 p-4">
            <h3 className="text-sm font-semibold mb-2">When to use KeepTogether</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-foreground">•</span>
                <span>
                  <strong className="text-foreground">Heading + first paragraph</strong> — Prevents
                  an orphaned heading at the bottom of a page.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-foreground">•</span>
                <span>
                  <strong className="text-foreground">Heading + small table</strong> — Keeps a
                  section title together with its data table.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-foreground">•</span>
                <span>
                  <strong className="text-foreground">Callout / highlight sections</strong> — Keeps
                  visually bordered blocks from splitting across pages.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-foreground">•</span>
                <span>
                  <strong className="text-foreground">Signature blocks</strong> — Ensures signers
                  are never split across pages.
                </span>
              </li>
            </ul>
          </div>
          <div className="rounded-lg border bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 p-4">
            <h3 className="text-sm font-semibold mb-1 text-amber-900 dark:text-amber-200">
              ⚠️ Content larger than one page
            </h3>
            <p className="text-sm text-amber-800 dark:text-amber-300">
              If the wrapped content is taller than a full page, it will overflow rather than split.
              Only use KeepTogether for content that is guaranteed to fit on a single page.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/40 p-4">
            <h3 className="text-sm font-semibold mb-2">wrap={'{false}'} vs minPresenceAhead</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>
                <strong className="text-foreground">wrap={'{false}'}</strong> (KeepTogether default)
                — Block is fully atomic. Moves entirely to next page if it doesn't fit.
              </li>
              <li>
                <strong className="text-foreground">minPresenceAhead</strong> — Softer guard. Moves
                to next page only when fewer than N points remain. Content inside can still wrap.
              </li>
            </ul>
          </div>
        </div>
      }
    />
  );
}
