import type { PdfxTheme } from '@pdfx/shared';
import { Text as PDFText, StyleSheet, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { usePdfxTheme, useSafeMemo } from '../../lib/pdfx-theme-context';

export type FormLayout = 'single' | 'two-column' | 'three-column';

export interface FormRow {
  label: string;
  value: string;
}

export interface PdfFormSectionProps {
  title?: string;
  rows: FormRow[];
  layout?: FormLayout;
  style?: Style;
}

function createFormStyles(t: PdfxTheme) {
  const { spacing, fontWeights, typography } = t.primitives;
  const borderColor = t.colors.border;
  return StyleSheet.create({
    section: {
      marginBottom: t.spacing.componentGap,
    },
    title: {
      fontFamily: t.typography.heading.fontFamily,
      fontSize: typography.sm,
      lineHeight: t.typography.heading.lineHeight,
      color: t.colors.foreground,
      fontWeight: fontWeights.semibold,
      marginBottom: spacing[2],
    },
    columnsRow: {
      flexDirection: 'row',
      gap: spacing[4],
    },
    column: {
      flex: 1,
    },
    formRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      paddingVertical: spacing[1] + 2,
      borderBottomWidth: 1,
      borderBottomColor: borderColor,
      borderBottomStyle: 'solid',
    },
    label: {
      width: 80,
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.typography.body.fontSize,
      lineHeight: t.typography.body.lineHeight,
      color: t.colors.mutedForeground,
      fontWeight: fontWeights.medium,
    },
    value: {
      flex: 1,
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.typography.body.fontSize,
      lineHeight: t.typography.body.lineHeight,
      color: t.colors.foreground,
    },
  });
}

export function PdfFormSection({ title, rows, layout = 'single', style }: PdfFormSectionProps) {
  const theme = usePdfxTheme();
  const styles = useSafeMemo(() => createFormStyles(theme), [theme]);
  const cols = layout === 'three-column' ? 3 : layout === 'two-column' ? 2 : 1;
  const sectionStyles: Style[] = [styles.section];
  const styleArray = style ? [...sectionStyles, style] : sectionStyles;

  if (cols === 1) {
    return (
      <View style={styleArray}>
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
    <View style={styleArray}>
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
