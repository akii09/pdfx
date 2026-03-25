import type { PdfxTheme } from '@pdfx/shared';
import { Text as PDFText, StyleSheet, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { usePdfxTheme, useSafeMemo } from '../../lib/pdfx-theme-context';

export type SignatureVariant = 'single' | 'double' | 'inline';

/** A single signer definition used in the `double` and `inline` variants. */
export interface SignatureSigner {
  /** Label above the signature line (e.g. "Authorized By"). */
  label?: string;
  /** Pre-filled name below the signature line. */
  name?: string;
  /** Job title or role displayed below the name. */
  title?: string;
  /** Date string displayed below the title. */
  date?: string;
}

export interface PdfSignatureBlockProps {
  /**
   * Layout variant.
   * - `single` — one signature block (uses top-level label/name/title/date)
   * - `double` — two blocks side by side (uses the `signers` tuple)
   * - `inline` — two blocks in a compact horizontal row (uses the `signers` tuple)
   * @default 'single'
   */
  variant?: SignatureVariant;
  /** Label above the signature line. Used by the `single` variant. */
  label?: string;
  /** Pre-filled name below the signature line. Used by the `single` variant. */
  name?: string;
  /** Job title or role. Used by the `single` variant. */
  title?: string;
  /** Date string. Used by the `single` variant. */
  date?: string;
  /** Two signer definitions for the `double` and `inline` variants. */
  signers?: [SignatureSigner, SignatureSigner];
  /** Custom @react-pdf/renderer styles applied to the outer container. */
  style?: Style;
}

function createSignatureStyles(t: PdfxTheme) {
  const { spacing, fontWeights, typography } = t.primitives;
  return StyleSheet.create({
    container: { marginTop: t.spacing.sectionGap, marginBottom: t.spacing.componentGap },
    block: { flex: 1, minWidth: 140 },
    label: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: typography.sm,
      color: t.colors.mutedForeground,
      marginBottom: spacing[1],
    },
    line: {
      borderBottomWidth: 1,
      borderBottomColor: t.colors.foreground,
      borderBottomStyle: 'solid',
      minHeight: spacing[6],
      marginBottom: spacing[1],
    },
    name: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.typography.body.fontSize,
      color: t.colors.foreground,
      fontWeight: fontWeights.semibold,
    },
    titleText: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: typography.sm,
      color: t.colors.mutedForeground,
    },
    dateText: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: typography.xs,
      color: t.colors.mutedForeground,
      marginTop: 1,
    },
    doubleRow: { flexDirection: 'row', justifyContent: 'space-between', gap: spacing[8] },
    inlineRow: { flexDirection: 'row', alignItems: 'center', gap: spacing[3], flexWrap: 'wrap' },
    inlineLabel: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: typography.sm,
      color: t.colors.mutedForeground,
    },
    inlineLine: {
      borderBottomWidth: 1,
      borderBottomColor: t.colors.foreground,
      borderBottomStyle: 'solid',
      minWidth: 120,
      height: spacing[5],
      paddingHorizontal: spacing[2],
    },
    inlineName: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.typography.body.fontSize,
      color: t.colors.foreground,
    },
  });
}

function renderSignerBlock(
  signer: SignatureSigner,
  styles: ReturnType<typeof createSignatureStyles>
) {
  return (
    <View style={styles.block}>
      {signer.label ? <PDFText style={styles.label}>{signer.label}</PDFText> : null}
      <View style={styles.line} />
      {signer.name ? <PDFText style={styles.name}>{signer.name}</PDFText> : null}
      {signer.title ? <PDFText style={styles.titleText}>{signer.title}</PDFText> : null}
      {signer.date ? <PDFText style={styles.dateText}>{signer.date}</PDFText> : null}
    </View>
  );
}

export function PdfSignatureBlock({
  variant = 'single',
  label = 'Signature',
  name,
  title,
  date,
  signers,
  style,
}: PdfSignatureBlockProps) {
  const theme = usePdfxTheme();
  const styles = useSafeMemo(() => createSignatureStyles(theme), [theme]);
  const containerStyles: Style[] = [styles.container];
  if (style) containerStyles.push(style);

  if (variant === 'inline') {
    return (
      <View wrap={false} style={containerStyles}>
        <View style={styles.inlineRow}>
          <PDFText style={styles.inlineLabel}>{`${label}:`}</PDFText>
          <View style={styles.inlineLine} />
          {name ? <PDFText style={styles.inlineName}>{name}</PDFText> : null}
        </View>
      </View>
    );
  }

  if (variant === 'double') {
    const [first, second] = signers ?? [
      { label: 'Authorized by', name: '', title: '', date: '' },
      { label: 'Approved by', name: '', title: '', date: '' },
    ];
    return (
      <View wrap={false} style={containerStyles}>
        <View style={styles.doubleRow}>
          {renderSignerBlock(first, styles)}
          {renderSignerBlock(second, styles)}
        </View>
      </View>
    );
  }

  return (
    <View wrap={false} style={containerStyles}>
      {renderSignerBlock({ label, name, title, date }, styles)}
    </View>
  );
}
