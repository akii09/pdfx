export const bubbleSheetUsageCode = `import { Document, Page } from '@react-pdf/renderer';
import { BubbleSheet } from '@/components/pdfx/bubble-sheet/bubble-sheet';

export function ExamAnswerSheet() {
  return (
    <Document>
      <Page size="A4" style={{ padding: 40 }}>
        <BubbleSheet
          title="Final Exam — Answer Sheet"
          studentInfoFields={['Name', 'Student ID', 'Date', 'Class']}
          questions={40}
          choices={['A', 'B', 'C', 'D', 'E']}
          columns={2}
        />
      </Page>
    </Document>
  );
}`;

export const bubbleSheetProps = [
  {
    name: 'questions',
    type: 'number',
    defaultValue: '-',
    required: true,
    description: 'Total number of questions to render in the bubble grid.',
  },
  {
    name: 'choices',
    type: 'string[]',
    defaultValue: "['A','B','C','D','E']",
    description:
      'Answer choice labels rendered as column headers above the bubble grid. Use any single-character labels (e.g. T/F for true/false).',
  },
  {
    name: 'columns',
    type: 'number',
    defaultValue: '2',
    description:
      'Number of side-by-side question columns. Questions are distributed evenly. Use 1 for a single tall column or 3+ for compact sheets.',
  },
  {
    name: 'title',
    type: 'string',
    defaultValue: '-',
    description: 'Optional heading rendered centred above the sheet (e.g. "Answer Sheet").',
  },
  {
    name: 'studentInfoFields',
    type: 'string[]',
    defaultValue: '-',
    description:
      'Labels for fill-in fields rendered as underlined lines at the top of the sheet (e.g. ["Name", "ID", "Date"]).',
  },
  {
    name: 'bubbleSize',
    type: "'sm' | 'md' | 'lg'",
    defaultValue: "'md'",
    description:
      'Diameter of each bubble circle. sm = 8pt, md = 10pt, lg = 13pt. Use sm for dense sheets (60+ questions) and lg for large-print exams.',
  },
  {
    name: 'style',
    type: 'Style',
    defaultValue: '-',
    description: 'Custom @react-pdf/renderer styles applied to the root container.',
  },
];
