import type { PdfxTheme } from '@pdfx/shared';
import { Text as PDFText, StyleSheet, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { usePdfxTheme, useSafeMemo } from '../../lib/pdfx-theme-context';

export type SignatureVariant = 'single' | 'double' | 'inline';

/**
 * Signature signer properties.
 * Props - `label` | `name` | `title` | `date`
 * @see {@link SignatureSigner}
 */
export interface SignatureSigner {
  label?: string;
  name?: string;
  title?: string;
  date?: string;
}

/** Signer details for the double layout: 2–4 entries. */
export type SignatureSigners =
  | [SignatureSigner, SignatureSigner]
  | [SignatureSigner, SignatureSigner, SignatureSigner]
  | [SignatureSigner, SignatureSigner, SignatureSigner, SignatureSigner];

/**
 * Signature block properties.
 * Props - `variant` | `label` | `name` | `title` | `date` | `count` | `signers` | `style`
 * @see {@link PdfSignatureBlockProps}
 */
export interface PdfSignatureBlockProps {
  /**
   * Layout variant: [single, double, inline]
   * @default 'single'
   */
  variant?: SignatureVariant;
  label?: string;
  name?: string;
  title?: string;
  date?: string;
  /** Number of signature places in the double layout (2–4). Defaults to signers.length or 2. */
  count?: 2 | 3 | 4;
  /** Signer details for the double layout. Provide 2–4 entries. */
  signers?: SignatureSigners;
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
    doubleRowContinuation: { marginTop: spacing[4] },
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
  styles: ReturnType<typeof createSignatureStyles>,
  key?: number
) {
  return (
    <View key={key} style={styles.block}>
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
  count,
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
    const signerCount = Math.min(4, Math.max(2, count ?? signers?.length ?? 2));
    const defaultLabels = ['Authorized by', 'Approved by', 'Signer 3', 'Signer 4'];
    const signerBlocks = Array.from({ length: signerCount }, (_, index) =>
      renderSignerBlock(
        signers?.[index] ?? { label: defaultLabels[index], name: '', title: '', date: '' },
        styles,
        index
      )
    );

    return (
      <View wrap={false} style={containerStyles}>
        <View style={styles.doubleRow}>
          {signerBlocks[0]}
          {signerBlocks[1]}
        </View>
        {signerCount > 2 ? (
          <View style={[styles.doubleRow, styles.doubleRowContinuation]}>
            {signerBlocks[2]}
            {signerBlocks[3] ?? <View style={styles.block} />}
          </View>
        ) : null}
      </View>
    );
  }

  return (
    <View wrap={false} style={containerStyles}>
      {renderSignerBlock({ label, name, title, date }, styles)}
    </View>
  );
}
