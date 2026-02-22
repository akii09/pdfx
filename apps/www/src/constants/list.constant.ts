export const listUsageCode = `import { Document, Page } from '@react-pdf/renderer';
import { PdfList } from '@/components/pdfx/list/pdfx-list';

export function MyDocument() {
  return (
    <Document>
      <Page size="A4" style={{ padding: 40 }}>
        {/* Bullet list */}
        <PdfList
          variant="bullet"
          items={[
            { text: 'Design system alignment' },
            { text: 'Component implementation' },
            { text: 'Write unit tests' },
          ]}
        />

        {/* Checklist with checked state */}
        <PdfList
          variant="checklist"
          items={[
            { text: 'Task complete', checked: true },
            { text: 'Task pending', checked: false },
          ]}
        />

        {/* Multi-level with nesting */}
        <PdfList
          variant="multi-level"
          items={[
            {
              text: 'Frontend',
              children: [
                { text: 'React components' },
                { text: 'PDF renderer' },
              ],
            },
          ]}
        />
      </Page>
    </Document>
  );
}`;

export const listProps = [
  {
    name: 'items',
    type: 'ListItem[]',
    defaultValue: '-',
    description:
      'Array of list items. Each item has text, optional description, checked, and children.',
  },
  {
    name: 'variant',
    type: "'bullet' | 'numbered' | 'checklist' | 'icon' | 'multi-level' | 'descriptive'",
    defaultValue: "'bullet'",
    description:
      'Visual style of the list. bullet = •, numbered = 1. 2. 3., checklist = checkbox, icon = star icon, multi-level = nested bullets, descriptive = title + description with accent bar.',
  },
  {
    name: 'gap',
    type: "'xs' | 'sm' | 'md'",
    defaultValue: "'sm'",
    description: 'Spacing between list items.',
  },
  {
    name: 'style',
    type: 'Style',
    defaultValue: '-',
    description: 'Custom @react-pdf/renderer styles applied to the outer container.',
  },
  {
    name: 'ListItem.text',
    type: 'string',
    defaultValue: '-',
    description: 'Primary text or title of the item.',
  },
  {
    name: 'ListItem.description',
    type: 'string',
    defaultValue: '-',
    description: 'Optional secondary description (used by descriptive variant).',
  },
  {
    name: 'ListItem.checked',
    type: 'boolean',
    defaultValue: 'true',
    description: 'Checked state for checklist variant. Defaults to true.',
  },
  {
    name: 'ListItem.children',
    type: 'ListItem[]',
    defaultValue: '-',
    description: 'Nested child items for bullet and multi-level variants.',
  },
];
