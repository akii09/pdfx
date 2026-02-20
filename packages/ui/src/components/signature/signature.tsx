import type { PdfxTheme } from '@pdfx/shared';
import { Text as PDFText, StyleSheet, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { theme as defaultTheme } from '../../lib/pdfx-theme';

export type SignatureVariant = 'single' | 'double' | 'inline';

export interface SignatureSigner {
  label?: string;
  name?: string;
  title?: string;
  date?: string;
}

export interface PdfSignatureBlockProps {
  variant?: SignatureVariant;
  label?: string;
  name?: string;
  title?: string;
  date?: string;
  signers?: [SignatureSigner, SignatureSigner];
  style?: Style;
}

let cachedTheme: PdfxTheme | null = null;
let cachedStyles: ReturnType<typeof createSignatureStyles> | null = null;

function getStyles(t: PdfxTheme) {
  if (cachedTheme !== t || !cachedStyles) {
    cachedStyles = createSignatureStyles(t);
    cachedTheme = t;
  }
  return cachedStyles;
}

function createSignatureStyles(t: PdfxTheme) {
  const { spacing, fontWeights, typography } = t.primitives;
  return StyleSheet.create({
    container: {
      marginTop: t.spacing.sectionGap,
      marginBottom: t.spacing.componentGap,
    },
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
    doubleRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: spacing[8],
    },
    inlineRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing[3],
      flexWrap: 'wrap',
    },
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

const DEFAULT_SIGNERS: [SignatureSigner, SignatureSigner] = [
  { label: 'Authorized by', name: '', title: '', date: '' },
  { label: 'Approved by', name: '', title: '', date: '' },
];

export function PdfSignatureBlock({
  variant = 'single',
  label = 'Signature',
  name,
  title,
  date,
  signers,
  style,
}: PdfSignatureBlockProps) {
  const styles = getStyles(defaultTheme);
  const containerStyles: Style[] = [styles.container];
  const styleArray = style ? [...containerStyles, style] : containerStyles;

  if (variant === 'inline') {
    return (
      // wrap={false}: inline signature lines must never be split across pages
      <View wrap={false} style={styleArray}>
        <View style={styles.inlineRow}>
          <PDFText style={styles.inlineLabel}>{`${label}:`}</PDFText>
          <View style={styles.inlineLine} />
          {name ? <PDFText style={styles.inlineName}>{name}</PDFText> : null}
        </View>
      </View>
    );
  }

  if (variant === 'double') {
    const [first, second] = signers ?? DEFAULT_SIGNERS;
    return (
      // wrap={false}: double-signer block must never be split across pages
      <View wrap={false} style={styleArray}>
        <View style={styles.doubleRow}>
          {renderSignerBlock(first, styles)}
          {renderSignerBlock(second, styles)}
        </View>
      </View>
    );
  }

  // wrap={false}: single signer block must never be split across pages
  return (
    <View wrap={false} style={styleArray}>
      {renderSignerBlock({ label, name, title, date }, styles)}
    </View>
  );
}
