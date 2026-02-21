import { Text as PDFText, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { usePdfxTheme, useSafeMemo } from '../../lib/pdfx-theme-context';
import { createSignatureStyles } from './signature.styles';
import type { PdfSignatureBlockProps, SignatureSigner } from './signature.types';

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
  const theme = usePdfxTheme();
  const styles = useSafeMemo(() => createSignatureStyles(theme), [theme]);
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
