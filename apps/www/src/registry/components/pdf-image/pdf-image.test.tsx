import { describe, expect, it, vi } from 'vitest';
import { PdfImage } from './pdf-image';

describe('PdfImage', () => {
  const variants = [
    'default',
    'full-width',
    'thumbnail',
    'avatar',
    'cover',
    'bordered',
    'rounded',
  ] as const;

  it('renders with string src', () => {
    expect(() => PdfImage({ src: '/test.png' })).not.toThrow();
  });

  it('renders with object src (uri + method + headers + body)', () => {
    // pdf-image.tsx:11 — object src supports HTTP method/headers/body.
    expect(() =>
      PdfImage({
        src: {
          uri: 'https://example.com/image.png',
          method: 'GET',
          headers: { Authorization: 'Bearer x' },
        },
      })
    ).not.toThrow();
    expect(() =>
      PdfImage({
        src: { uri: 'https://example.com/upload', method: 'POST', body: '{}' },
      })
    ).not.toThrow();
  });

  it('renders all variants', () => {
    for (const variant of variants) {
      expect(() => PdfImage({ src: '/x.png', variant })).not.toThrow();
    }
  });

  it('renders all fit modes', () => {
    for (const fit of ['cover', 'contain', 'fill', 'none'] as const) {
      expect(() => PdfImage({ src: '/x.png', fit })).not.toThrow();
    }
  });

  it('resolves height from aspectRatio when height is omitted', () => {
    // pdf-image.tsx:125 — aspectRatio divides numeric width to compute height.
    expect(() => PdfImage({ src: '/x.png', width: 200, aspectRatio: 16 / 9 })).not.toThrow();
  });

  it('warns on unsupported image formats', () => {
    // pdf-image.tsx:78-85 — detectFormat + console.warn for webp/avif/etc.
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    try {
      PdfImage({ src: 'https://example.com/img.webp' });
      PdfImage({ src: 'data:image/avif;base64,AAAA' });
      expect(warnSpy).toHaveBeenCalled();
      expect(warnSpy.mock.calls.length).toBeGreaterThanOrEqual(2);
    } finally {
      warnSpy.mockRestore();
    }
  });

  it('accepts numeric and percentage width/height, borderRadius, noWrap, and style', () => {
    expect(() =>
      PdfImage({
        src: '/x.png',
        width: 300,
        height: 200,
        borderRadius: 12,
        noWrap: false,
        position: '0% 0%',
        caption: 'Figure 1',
        style: { marginTop: 8 },
      })
    ).not.toThrow();
    expect(() => PdfImage({ src: '/x.png', width: '50%', height: '100%' })).not.toThrow();
  });
});
