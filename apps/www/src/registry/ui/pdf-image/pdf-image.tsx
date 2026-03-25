import type { PdfxTheme } from '@pdfx/shared';
import { Image, Text as PDFText, StyleSheet, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { usePdfxTheme, useSafeMemo } from '../../lib/pdfx-theme-context';

/** HTTP method used when fetching the image from a URL. */
export type PdfImageHTTPMethod = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export type PdfImageSrc =
  | string
  | { uri: string; method?: PdfImageHTTPMethod; headers?: Record<string, string>; body?: string };

export type PdfImageFit = 'cover' | 'contain' | 'fill' | 'none';

export type PdfImageVariant =
  | 'default'
  | 'full-width'
  | 'thumbnail'
  | 'avatar'
  | 'cover'
  | 'bordered'
  | 'rounded';

export interface PdfImageProps {
  /** Image source — a URL string, file path, base64 data URI, or a request object with HTTP method/headers. */
  src: PdfImageSrc;
  /** Layout and sizing preset. @default 'default' */
  variant?: PdfImageVariant;
  /** Override the variant's default width. Accepts PDF points or CSS-like string (e.g. '100%'). */
  width?: number | string;
  /** Override the variant's default height in PDF points. */
  height?: number | string;
  /** Object-fit mode for how the image fills its container. Defaults to the variant's preset. */
  fit?: PdfImageFit;
  /** Object-position for the image within its container (e.g. '50% 50%', 'top left'). @default '50% 50%' */
  position?: string;
  /** Optional caption text rendered below the image. */
  caption?: string;
  /** Derive height from width using this ratio (width / aspectRatio). Ignored when `height` is set. */
  aspectRatio?: number;
  /** Border radius in PDF points. Overrides the variant's default radius. */
  borderRadius?: number;
  /** Prevent the image and its caption from splitting across pages. @default true */
  noWrap?: boolean;
  /** Custom @react-pdf/renderer styles applied to the image element. */
  style?: Style;
}

interface VariantDefaults {
  width?: number | string;
  height?: number | string;
  fit: PdfImageFit;
  borderRadius?: number;
}

const VARIANT_DEFAULTS: Record<PdfImageVariant, VariantDefaults> = {
  default: { fit: 'contain' },
  'full-width': { width: '100%', fit: 'cover' },
  thumbnail: { width: 80, height: 80, fit: 'cover' },
  avatar: { width: 48, height: 48, fit: 'cover', borderRadius: 999 },
  cover: { width: '100%', height: 160, fit: 'cover' },
  bordered: { width: '100%', fit: 'contain' },
  rounded: { width: 200, fit: 'contain', borderRadius: 8 },
};

const UNSUPPORTED_FORMATS = ['webp', 'avif', 'heic', 'heif', 'ico'];

function detectFormat(src: PdfImageSrc): string | null {
  if (typeof src !== 'string') return null;
  const dataMatch = src.match(/^data:image\/([a-zA-Z0-9+.-]+)/);
  if (dataMatch) return dataMatch[1].toLowerCase();
  return src.split('?')[0].split('.').pop()?.toLowerCase() ?? null;
}

function warnIfUnsupported(src: PdfImageSrc): void {
  const fmt = detectFormat(src);
  if (fmt && UNSUPPORTED_FORMATS.includes(fmt)) {
    console.warn(
      `[PdfImage] Unsupported format "${fmt}" detected. react-pdf supports: JPEG, PNG, GIF (first frame), BMP, SVG. Convert to PNG or JPEG before use.`
    );
  }
}

function createImageStyles(t: PdfxTheme) {
  const { spacing } = t.primitives;
  return StyleSheet.create({
    container: { flexDirection: 'column' },
    image: {},
    imageBordered: { borderWidth: 1, borderColor: t.colors.border, borderStyle: 'solid' },
    caption: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.primitives.typography.xs,
      color: t.colors.mutedForeground,
      marginTop: spacing[1],
      textAlign: 'center',
    },
  });
}

export function PdfImage({
  src,
  variant = 'default',
  width,
  height,
  fit,
  position = '50% 50%',
  caption,
  aspectRatio,
  borderRadius,
  noWrap = true,
  style,
}: PdfImageProps) {
  warnIfUnsupported(src);
  const theme = usePdfxTheme();
  const styles = useSafeMemo(() => createImageStyles(theme), [theme]);
  const defaults = VARIANT_DEFAULTS[variant];

  const resolvedWidth = width ?? defaults.width;
  const resolvedHeight: number | string | undefined = (() => {
    if (height !== undefined) return height;
    if (defaults.height !== undefined) return defaults.height;
    if (aspectRatio !== undefined && typeof resolvedWidth === 'number')
      return resolvedWidth / aspectRatio;
    return undefined;
  })();

  const resolvedFit = fit ?? defaults.fit;
  const resolvedRadius = borderRadius ?? defaults.borderRadius;

  const imageStyles: Style[] = [styles.image];
  if (resolvedWidth !== undefined) imageStyles.push({ width: resolvedWidth } as Style);
  if (resolvedHeight !== undefined) imageStyles.push({ height: resolvedHeight } as Style);
  imageStyles.push({ objectFit: resolvedFit, objectPosition: position } as Style);
  if (resolvedRadius !== undefined) imageStyles.push({ borderRadius: resolvedRadius } as Style);
  if (variant === 'bordered') imageStyles.push(styles.imageBordered);
  if (style) imageStyles.push(style);

  const content = (
    <View style={styles.container}>
      <Image src={src} style={imageStyles} />
      {caption ? <PDFText style={styles.caption}>{caption}</PDFText> : null}
    </View>
  );

  return noWrap ? <View wrap={false}>{content}</View> : content;
}
