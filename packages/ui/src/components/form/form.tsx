import { Text as PDFText, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { usePdfxTheme, useSafeMemo } from '../../lib/pdfx-theme-context';
import { createFormStyles } from './form.styles';
import type { FormLayout, PdfFormField, PdfFormGroup, PdfFormProps } from './form.types';

// ─── Helpers (plain functions, not React components) ──────────────────────────
// Using plain functions ensures the rendered tree is fully resolved when
// components are called directly in unit tests (findText traversal works).

function renderFieldAbove(
  field: PdfFormField,
  idx: number,
  styles: ReturnType<typeof createFormStyles>
) {
  const areaHeight = field.height ?? 18;
  const areaStyle: Style[] = [styles.fieldArea, { minHeight: areaHeight }];

  return (
    <View key={`${field.label}-${idx}`} style={styles.fieldAbove}>
      <PDFText style={styles.labelAbove}>{field.label}</PDFText>
      <View style={areaStyle}>
        {field.hint ? <PDFText style={styles.hint}>{field.hint}</PDFText> : null}
      </View>
    </View>
  );
}

function renderFieldLeft(
  field: PdfFormField,
  idx: number,
  styles: ReturnType<typeof createFormStyles>
) {
  const areaHeight = field.height ?? 16;
  const areaStyle: Style[] = [styles.fieldArea, styles.fieldLeftArea, { minHeight: areaHeight }];

  return (
    <View key={`${field.label}-${idx}`} style={styles.fieldLeft}>
      <PDFText style={styles.labelLeft}>{field.label}</PDFText>
      <View style={areaStyle}>
        {field.hint ? <PDFText style={styles.hint}>{field.hint}</PDFText> : null}
      </View>
    </View>
  );
}

function renderGroup(
  group: PdfFormGroup,
  gi: number,
  styles: ReturnType<typeof createFormStyles>,
  labelPosition: 'above' | 'left'
) {
  const layout: FormLayout = group.layout ?? 'single';
  const cols = layout === 'three-column' ? 3 : layout === 'two-column' ? 2 : 1;

  const renderField = (field: PdfFormField, idx: number) =>
    labelPosition === 'left'
      ? renderFieldLeft(field, idx, styles)
      : renderFieldAbove(field, idx, styles);

  if (cols === 1) {
    return (
      <View key={`group-${gi}`} style={styles.group}>
        {group.title ? <PDFText style={styles.groupTitle}>{group.title}</PDFText> : null}
        {group.fields.map(renderField)}
      </View>
    );
  }

  // Split fields evenly across columns
  const chunkSize = Math.ceil(group.fields.length / cols);
  const chunks: PdfFormField[][] = [];
  for (let i = 0; i < group.fields.length; i += chunkSize) {
    chunks.push(group.fields.slice(i, i + chunkSize));
  }
  while (chunks.length < cols) {
    chunks.push([]);
  }

  return (
    <View key={`group-${gi}`} style={styles.group}>
      {group.title ? <PDFText style={styles.groupTitle}>{group.title}</PDFText> : null}
      <View style={styles.columnsRow}>
        {chunks.map((chunk, ci) => (
          <View key={`col-${gi}-${chunk[0]?.label ?? ci}`} style={styles.column}>
            {chunk.map(renderField)}
          </View>
        ))}
      </View>
    </View>
  );
}

// ─── PdfForm ──────────────────────────────────────────────────────────────────

export function PdfForm({
  title,
  subtitle,
  groups,
  variant = 'underline',
  labelPosition = 'above',
  noWrap = false,
  style,
}: PdfFormProps) {
  const theme = usePdfxTheme();
  const styles = useSafeMemo(() => createFormStyles(theme, variant), [theme, variant]);

  const rootStyles: Style[] = [styles.root];
  if (style) rootStyles.push(style);

  const inner = (
    <View style={rootStyles}>
      {title ? <PDFText style={styles.formTitle}>{title}</PDFText> : null}
      {subtitle ? <PDFText style={styles.formSubtitle}>{subtitle}</PDFText> : null}
      {title || subtitle ? <View style={styles.formDivider} /> : null}
      {groups.map((group, gi) => renderGroup(group, gi, styles, labelPosition))}
    </View>
  );

  return noWrap ? <View wrap={false}>{inner}</View> : inner;
}
