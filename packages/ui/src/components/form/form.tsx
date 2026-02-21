import { Text as PDFText, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { usePdfxTheme, useSafeMemo } from '../../lib/pdfx-theme-context';
import { createFormStyles } from './form.styles';
import type { FormRow, PdfFormSectionProps } from './form.types';

export function PdfFormSection({
  title,
  rows,
  layout = 'single',
  noWrap = false,
  style,
}: PdfFormSectionProps) {
  const theme = usePdfxTheme();
  const styles = useSafeMemo(() => createFormStyles(theme), [theme]);
  const cols = layout === 'three-column' ? 3 : layout === 'two-column' ? 2 : 1;
  const sectionStyles: Style[] = [styles.section];
  const styleArray = style ? [...sectionStyles, style] : sectionStyles;

  if (cols === 1) {
    return (
      <View wrap={!noWrap} style={styleArray}>
        {title ? <PDFText style={styles.title}>{title}</PDFText> : null}
        {rows.map((row) => (
          <View key={row.label} style={styles.formRow}>
            <PDFText style={styles.label}>{row.label}</PDFText>
            <PDFText style={styles.value}>{row.value}</PDFText>
          </View>
        ))}
      </View>
    );
  }

  const chunkSize = Math.ceil(rows.length / cols);
  const chunks: FormRow[][] = [];
  for (let i = 0; i < rows.length; i += chunkSize) {
    chunks.push(rows.slice(i, i + chunkSize));
  }
  while (chunks.length < cols) {
    chunks.push([]);
  }

  return (
    <View wrap={!noWrap} style={styleArray}>
      {title ? <PDFText style={styles.title}>{title}</PDFText> : null}
      <View style={styles.columnsRow}>
        {chunks.map((chunk) => (
          <View key={chunk[0]?.label ?? 'empty'} style={styles.column}>
            {chunk.map((row) => (
              <View key={row.label} style={styles.formRow}>
                <PDFText style={styles.label}>{row.label}</PDFText>
                <PDFText style={styles.value}>{row.value}</PDFText>
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}
