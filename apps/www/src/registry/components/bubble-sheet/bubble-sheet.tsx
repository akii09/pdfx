import { Text as PDFText, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { usePdfxTheme, useSafeMemo } from '../../lib/pdfx-theme-context';
import { createBubbleSheetStyles } from './bubble-sheet.styles';
import type { BubbleSheetProps } from './bubble-sheet.types';

const DEFAULT_CHOICES = ['A', 'B', 'C', 'D', 'E'];

/**
 * OMR-style answer sheet with a bubble grid, choice headers, and an optional
 * student info section. Fully themeable via the PDFx theme system.
 *
 * @example
 * ```tsx
 * <BubbleSheet
 *   questions={40}
 *   choices={["A","B","C","D","E"]}
 *   columns={2}
 *   title="Answer Sheet"
 *   studentInfoFields={["Name", "ID", "Date"]}
 * />
 * ```
 */
export function BubbleSheet({
  questions,
  choices = DEFAULT_CHOICES,
  columns = 2,
  title,
  studentInfoFields,
  bubbleSize = 'md',
  style,
}: BubbleSheetProps) {
  const theme = usePdfxTheme();
  const styles = useSafeMemo(
    () => createBubbleSheetStyles(theme, bubbleSize),
    [theme, bubbleSize]
  );

  const rootStyles: Style[] = [styles.root];
  if (style) rootStyles.push(style);

  // Split questions evenly across columns
  const perColumn = Math.ceil(questions / columns);
  const columnRanges: Array<[number, number]> = [];
  for (let c = 0; c < columns; c++) {
    const start = c * perColumn + 1;
    const end = Math.min((c + 1) * perColumn, questions);
    if (start <= questions) columnRanges.push([start, end]);
  }

  return (
    <View style={rootStyles}>
      {title ? <PDFText style={styles.title}>{title}</PDFText> : null}

      {studentInfoFields && studentInfoFields.length > 0 ? (
        <>
          <View style={styles.studentInfoRow}>
            {studentInfoFields.map((label) => (
              <View key={label} style={styles.studentField}>
                <PDFText style={styles.studentFieldLabel}>{`${label}:`}</PDFText>
                <View style={styles.studentFieldLine} />
              </View>
            ))}
          </View>
          <View style={styles.headerDivider} />
        </>
      ) : null}

      <View style={styles.columnsRow}>
        {columnRanges.map(([start, end], ci) => (
          <View key={`col-${ci}`} style={styles.column}>
            {/* Choice header row */}
            <View style={styles.choiceHeader}>
              {choices.map((choice) => (
                <PDFText key={choice} style={styles.choiceLabel}>
                  {choice}
                </PDFText>
              ))}
            </View>

            {/* Question rows */}
            {Array.from({ length: end - start + 1 }, (_, i) => start + i).map((qNum) => (
              <View key={qNum} style={styles.questionRow}>
                <PDFText style={styles.questionNumber}>{`${qNum}.`}</PDFText>
                <View style={styles.bubblesRow}>
                  {choices.map((choice) => (
                    <View key={choice} style={styles.bubble} />
                  ))}
                </View>
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}
