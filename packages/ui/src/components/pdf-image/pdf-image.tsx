import type { PdfxTheme } from '@pdfx/shared';
import { Image, Text as PDFText, StyleSheet, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { usePdfxTheme, useSafeMemo } from '../../lib/pdfx-theme-context';

// ─── Types ────────────────────────────────────────────────────────────────────

/**
 * Image source accepted by react-pdf's Image component.
 * - string: URL, absolute file path, or base64 data URI (`data:image/png;base64,...`)
 * - object: authenticated URL with custom headers
 */
export type PdfImageSrc =
  | string
  | { uri: string; method?: string; headers?: Record<string, string>; body?: string };

/**
 * Controls how the image fills its container (mirrors CSS object-fit).
 * - cover: fill, crop excess
 * - contain: fit inside, preserve aspect ratio, may letterbox
 * - fill: stretch to exactly fill (distorts aspect ratio)
 * - none: render at intrinsic size
 */
export type PdfImageFit = 'cover' | 'contain' | 'fill' | 'none';

/**
 * Visual layout variant.
 *
 * | Variant      | Width      | Height        | fit     | Notes                    |
 * |-------------|------------|---------------|---------|--------------------------|
 * | default     | prop/auto  | prop/auto     | contain | Standard inline image    |
 * | full-width  | 100%       | prop required | cover   | Banner / hero image      |
 * | thumbnail   | 80pt       | 80pt          | cover   | Small square preview     |
 * | avatar      | 48pt       | 48pt          | cover   | Circle-clipped portrait  |
 * | cover       | 100%       | 160pt         | cover   | Wide cover image         |
 * | bordered    | 100%/prop  | prop          | contain | Framed with border       |
 * | rounded     | prop/200pt | prop          | contain | Rounded corners          |
 */
export type PdfImageVariant =
  | 'default'
  | 'full-width'
  | 'thumbnail'
  | 'avatar'
  | 'cover'
  | 'bordered'
  | 'rounded';

export interface PdfImageProps {
  /** Image source: URL, base64 data URI, file path, or authenticated object. */
  src: PdfImageSrc;
  /** Display variant controlling size and appearance. @default 'default' */
  variant?: PdfImageVariant;
  /** Width in PDF points. Required unless variant provides a default. */
  width?: number | string;
  /** Height in PDF points. Required unless variant provides a default. */
  height?: number | string;
  /** How the image fills its container. @default variant-dependent */
  fit?: PdfImageFit;
  /** Focal point for objectFit crop, e.g. '50% 50%' or 'top left'. @default '50% 50%' */
  position?: string;
  /** Optional caption text rendered below the image in muted style. */
  caption?: string;
  /**
   * Aspect ratio helper: if width is provided but height is not,
   * height = width / aspectRatio. E.g. 16/9 for widescreen images.
   */
  aspectRatio?: number;
  /**
   * Border radius override in PDF points.
   * Defaults: avatar = 999 (circle), rounded = 8, others = 0.
   */
  borderRadius?: number;
  /**
   * Prevent the image (+ optional caption) from being split across page boundaries.
   * @default true — images should never be clipped at the page edge.
   */
  noWrap?: boolean;
  /** Custom style override applied to the image element. */
  style?: Style;
}

// ─── Format validation ────────────────────────────────────────────────────────

const UNSUPPORTED_FORMATS = ['webp', 'avif', 'heic', 'heif', 'ico'];

/**
 * Detect image format from a string src (URL, data URI, or file path).
 * Returns null if unknown.
 */
function detectFormat(src: PdfImageSrc): string | null {
  if (typeof src !== 'string') return null;
  // data URI: data:image/webp;base64,...
  const dataMatch = src.match(/^data:image\/([a-zA-Z0-9+.-]+)/);
  if (dataMatch) return dataMatch[1].toLowerCase();
  // URL / path: strip query string then get extension
  const ext = src.split('?')[0].split('.').pop()?.toLowerCase();
  return ext ?? null;
}

function warnIfUnsupported(src: PdfImageSrc): void {
  const fmt = detectFormat(src);
  if (fmt && UNSUPPORTED_FORMATS.includes(fmt)) {
    console.warn(
      `[PdfImage] Unsupported format "${fmt}" detected. react-pdf supports: JPEG, PNG, GIF (first frame), BMP, SVG. Convert to PNG or JPEG before use (e.g. sharp().toFormat('png')).`
    );
  }
}

// ─── Variant dimension defaults ───────────────────────────────────────────────

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

// ─── Styles ───────────────────────────────────────────────────────────────────

let cachedTheme: PdfxTheme | null = null;
let cachedStyles: ReturnType<typeof createImageStyles> | null = null;

function getStyles(t: PdfxTheme) {
  if (cachedTheme !== t || !cachedStyles) {
    cachedStyles = createImageStyles(t);
    cachedTheme = t;
  }
  return cachedStyles;
}

function createImageStyles(t: PdfxTheme) {
  const { spacing } = t.primitives;
  return StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
    },
    image: {
      // Base — dimensions are applied dynamically
    },
    imageBordered: {
      borderWidth: 1,
      borderColor: t.colors.border,
      borderStyle: 'solid',
    },
    caption: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.primitives.typography.xs,
      color: t.colors.mutedForeground,
      marginTop: spacing[1],
      textAlign: 'center',
    },
  });
}

// ─── PdfImage ─────────────────────────────────────────────────────────────────

/**
 * PdfImage — a validated, theme-aware wrapper around react-pdf's `<Image>`.
 *
 * @example Basic usage
 * ```tsx
 * <PdfImage src="https://example.com/photo.jpg" width={200} height={150} />
 * ```
 *
 * @example Base64 (recommended for reliability)
 * ```tsx
 * <PdfImage src="data:image/png;base64,iVBORw0KGgo..." variant="avatar" />
 * ```
 *
 * @example Full-width banner with caption
 * ```tsx
 * <PdfImage src={bannerUrl} variant="cover" height={120} caption="Q1 2025 Team Photo" />
 * ```
 *
 * @example Aspect ratio helper
 * ```tsx
 * <PdfImage src={chartPng} width={400} aspectRatio={16 / 9} />
 * ```
 *
 * Supported formats: JPEG, PNG, GIF (first frame only), BMP, SVG.
 * Unsupported: WebP, AVIF, HEIC — a console warning is emitted if detected.
 */
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
  const styles = useSafeMemo(() => getStyles(theme), [theme]);
  const defaults = VARIANT_DEFAULTS[variant];

  // ── Resolve dimensions ─────────────────────────────────────────────
  const resolvedWidth = width ?? defaults.width;
  const resolvedHeight: number | string | undefined = (() => {
    if (height !== undefined) return height;
    if (defaults.height !== undefined) return defaults.height;
    if (aspectRatio !== undefined && typeof resolvedWidth === 'number') {
      return resolvedWidth / aspectRatio;
    }
    return undefined;
  })();

  const resolvedFit = fit ?? defaults.fit;
  const resolvedRadius = borderRadius ?? defaults.borderRadius;

  // ── Build image style array ────────────────────────────────────────
  const imageStyles: Style[] = [styles.image];

  if (resolvedWidth !== undefined) imageStyles.push({ width: resolvedWidth } as Style);
  if (resolvedHeight !== undefined) imageStyles.push({ height: resolvedHeight } as Style);

  imageStyles.push({
    objectFit: resolvedFit,
    objectPosition: position,
  } as Style);

  if (resolvedRadius !== undefined) {
    imageStyles.push({ borderRadius: resolvedRadius } as Style);
  }

  if (variant === 'bordered') {
    imageStyles.push(styles.imageBordered);
  }

  if (style) imageStyles.push(style);

  // ── Render ─────────────────────────────────────────────────────────
  const content = (
    <View style={styles.container}>
      <Image src={src} style={imageStyles} />
      {caption ? <PDFText style={styles.caption}>{caption}</PDFText> : null}
    </View>
  );

  return noWrap ? <View wrap={false}>{content}</View> : content;
}
