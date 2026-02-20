export const pdfImageUsageCode = `import { Document, Page, StyleSheet, View } from '@react-pdf/renderer';
import { PdfImage } from '@/components/pdfx/pdfx-pdf-image';

const styles = StyleSheet.create({ page: { padding: 40 } });

// Logo as base64 data URI (best for reliability)
const LOGO_BASE64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

// Avatar as base64 data URI
const AVATAR_BASE64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAA...';

export function MyDocument() {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Full-width banner - base64 encoded PNG */}
        <PdfImage
          src={LOGO_BASE64}
          variant="cover"
          caption="PDFx Logo Banner"
        />

        {/* Avatar (circle-clipped) - base64 for profiles */}
        <PdfImage
          src={AVATAR_BASE64}
          variant="avatar"
          caption="Team Avatar"
        />

        {/* Thumbnail - compact image preview */}
        <PdfImage
          src={LOGO_BASE64}
          variant="thumbnail"
          caption="Project Thumbnail"
        />

        {/* Multiple avatars in a row */}
        <View style={{ flexDirection: 'row', gap: 12, marginTop: 12 }}>
          <PdfImage
            src={AVATAR_BASE64}
            variant="avatar"
            caption="User 1"
          />
          <PdfImage
            src={AVATAR_BASE64}
            variant="avatar"
            caption="User 2"
          />
          <PdfImage
            src={AVATAR_BASE64}
            variant="avatar"
            caption="User 3"
          />
        </View>

        {/* Custom sized image with aspect ratio */}
        <PdfImage
          src={LOGO_BASE64}
          width={300}
          aspectRatio={16 / 9}
          caption="Custom sized image"
        />
      </Page>
    </Document>
  );
}`;

export const pdfImageProps = [
  {
    name: 'src',
    type: 'string | { uri: string; method?: string; headers?: Record<string, string> }',
    required: true,
    description:
      'Image source. Use a base64 data URI for best reliability, or an HTTPS URL. Supported formats: JPEG, PNG, GIF (first frame), BMP, SVG. Unsupported: WebP, AVIF, HEIC.',
  },
  {
    name: 'variant',
    type: "'default' | 'full-width' | 'thumbnail' | 'avatar' | 'cover' | 'bordered' | 'rounded'",
    defaultValue: "'default'",
    description:
      'Display variant. default = manual sizing, full-width = 100% width, thumbnail = 80×80, avatar = 48×48 circle, cover = full-width banner, bordered = framed, rounded = rounded corners.',
  },
  {
    name: 'width',
    type: 'number | string',
    description:
      'Width in PDF points. Required for default/bordered/rounded unless using variant defaults.',
  },
  {
    name: 'height',
    type: 'number | string',
    description:
      'Height in PDF points. Calculated from aspectRatio if omitted (when width is set).',
  },
  {
    name: 'fit',
    type: "'cover' | 'contain' | 'fill' | 'none'",
    description: 'How the image fills its container (CSS object-fit). Default depends on variant.',
  },
  {
    name: 'position',
    type: 'string',
    defaultValue: "'50% 50%'",
    description: "Focal point for fit crops. E.g. 'top left', '50% 25%'.",
  },
  {
    name: 'caption',
    type: 'string',
    description: 'Optional caption text rendered below the image in muted style.',
  },
  {
    name: 'aspectRatio',
    type: 'number',
    description: 'If width is set and height is not, height = width / aspectRatio. E.g. 16/9.',
  },
  {
    name: 'borderRadius',
    type: 'number',
    description: 'Border radius in PDF points. Defaults: avatar = 999 (circle), rounded = 8.',
  },
  {
    name: 'noWrap',
    type: 'boolean',
    defaultValue: 'true',
    description: 'Keep image + caption on one page. Prevents image clipping at page boundaries.',
  },
  {
    name: 'style',
    type: 'Style',
    description: 'Custom @react-pdf/renderer style applied to the Image element.',
  },
];
