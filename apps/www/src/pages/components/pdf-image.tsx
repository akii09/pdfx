import { pdfImageProps, pdfImageUsageCode } from '@/constants';
import { PdfImage } from '@pdfx/ui';
import { Document, Page, StyleSheet, View } from '@react-pdf/renderer';
import { ComponentPage } from '../../components/component-page';
import { PDFPreview } from '../../components/pdf-preview';
import { useDocumentTitle } from '../../hooks/use-document-title';

type PdfImageVariant =
  | 'default'
  | 'full-width'
  | 'thumbnail'
  | 'avatar'
  | 'cover'
  | 'bordered'
  | 'rounded';

const styles = StyleSheet.create({
  page: { padding: 40 },
  row: { flexDirection: 'row', gap: 8, marginBottom: 12, alignItems: 'flex-start' },
  label: { fontSize: 8, color: '#888', marginBottom: 4 },
});

// PDFx logo & favicon URLs
const PDFX_LOGO = '/pdfx.png';
const FAVICON = '/favicon.png';
const PDFX_JPEG = '/pdfx.jpeg';

const renderPreviewDocument = (variant: PdfImageVariant) => (
  <Document title="PDFx PdfImage Preview">
    <Page size="A4" style={styles.page}>
      {/* Active variant */}
      <PdfImage
        src={variant === 'avatar' ? FAVICON : PDFX_LOGO}
        variant={variant}
        height={variant === 'default' ? 120 : undefined}
        width={variant === 'default' ? 200 : undefined}
        caption={`Variant: ${variant}`}
      />

      {/* Row of different variants */}
      <View style={styles.row}>
        <PdfImage src={PDFX_JPEG} variant="thumbnail" caption="thumbnail" />
        <PdfImage src={FAVICON} variant="avatar" caption="avatar" />
        <PdfImage src={PDFX_LOGO} variant="rounded" width={80} height={80} caption="rounded" />
        <PdfImage src={FAVICON} variant="bordered" width={80} height={80} caption="bordered" />
      </View>
    </Page>
  </Document>
);

const variantOptions = [
  { value: 'default' as PdfImageVariant, label: 'Default' },
  { value: 'full-width' as PdfImageVariant, label: 'Full Width' },
  { value: 'cover' as PdfImageVariant, label: 'Cover' },
  { value: 'thumbnail' as PdfImageVariant, label: 'Thumbnail' },
  { value: 'avatar' as PdfImageVariant, label: 'Avatar' },
  { value: 'bordered' as PdfImageVariant, label: 'Bordered' },
  { value: 'rounded' as PdfImageVariant, label: 'Rounded' },
];

export default function PdfImageComponentPage() {
  useDocumentTitle('PdfImage Component');

  return (
    <ComponentPage
      title="PdfImage"
      description="A validated, theme-aware image component for react-pdf documents. Supports JPEG, PNG, GIF, BMP, and SVG formats with seven layout variants. Emits a warning for unsupported formats (WebP, AVIF, HEIC) and prevents images from being clipped at page boundaries by default."
      installCommand="npx @pdfx/cli add pdf-image"
      componentName="pdf-image"
      preview={
        <PDFPreview
          title="Preview"
          downloadFilename="pdf-image-preview.pdf"
          variants={{
            options: variantOptions,
            defaultValue: 'default' as PdfImageVariant,
            label: 'Variant',
          }}
        >
          {/* biome-ignore lint/suspicious/noExplicitAny: Generic type workaround for React JSX components */}
          {renderPreviewDocument as any}
        </PDFPreview>
      }
      usageCode={pdfImageUsageCode}
      usageFilename="src/components/pdfx/pdf-image/pdfx-pdf-image.tsx"
      props={pdfImageProps}
      additionalInfo={
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/40 p-4">
            <h3 className="text-sm font-semibold mb-2">Supported Formats</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="font-medium text-green-600 dark:text-green-400 mb-1">✓ Supported</p>
                <ul className="space-y-0.5 text-muted-foreground">
                  <li>JPEG / JPG — best performance</li>
                  <li>PNG — supports transparency</li>
                  <li>SVG — vector, limited subset</li>
                  <li>GIF — first frame only</li>
                  <li>BMP</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-red-600 dark:text-red-400 mb-1">✗ Not supported</p>
                <ul className="space-y-0.5 text-muted-foreground">
                  <li>WebP → convert to PNG</li>
                  <li>AVIF → convert to JPEG</li>
                  <li>HEIC / HEIF</li>
                  <li>ICO</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-muted/40 p-4">
            <h3 className="text-sm font-semibold mb-2">Source Recommendations</h3>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>
                <strong className="text-foreground">Base64 data URI</strong> — Most reliable. Works
                in both browser (PDFViewer) and server (renderToBuffer). No CORS issues.
              </li>
              <li>
                <strong className="text-foreground">HTTPS URL</strong> — Works in browser rendering.
                Requires CORS headers. Subject to network latency.
              </li>
              <li>
                <strong className="text-foreground">Local file path</strong> — Node.js server-side
                only (renderToBuffer / Route Handlers).
              </li>
            </ul>
          </div>
          <div className="rounded-lg border bg-muted/40 p-4">
            <h3 className="text-sm font-semibold mb-2">Print Resolution</h3>
            <p className="text-sm text-muted-foreground">
              For print PDFs, source images should be ≥ 300 DPI at the rendered size. For a
              200pt-wide image (≈ 2.78 inches), the source image should be at least{' '}
              <code className="font-mono text-xs">200 × (300/72) ≈ 834px</code> wide.
            </p>
          </div>
        </div>
      }
    />
  );
}
