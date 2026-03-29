import dedent from 'dedent';
import { textResponse } from '../utils.js';

export async function getAuditChecklist(): Promise<ReturnType<typeof textResponse>> {
  return textResponse(dedent`
    # PDFx Setup Audit Checklist

    Work through this after adding components or generating PDF document code.

    ## Configuration
    - [ ] \`pdfx.json\` exists in the project root
    - [ ] \`componentDir\` path in \`pdfx.json\` is correct (default: \`./src/components/pdfx\`)
    - [ ] Theme file exists at the path set in \`pdfx.json\` (default: \`./src/lib/pdfx-theme.ts\`)

    ## Dependencies
    - [ ] \`@react-pdf/renderer\` is installed — run \`npm ls @react-pdf/renderer\` to confirm
    - [ ] Version is ≥ 3.0.0 (PDFx requires react-pdf v3+)

    ## Imports
    - [ ] PDFx components use **named exports**: \`import { Table, Heading } from '@/components/pdfx/...'\`
    - [ ] \`Document\` and \`Page\` are imported from \`@react-pdf/renderer\`, not from PDFx
    - [ ] No Tailwind classes, CSS variables, or DOM APIs are used inside PDF components
    - [ ] All styles use \`StyleSheet.create({})\` from \`@react-pdf/renderer\`

    ## Rendering
    - [ ] The root PDF component is **not** inside a React Server Component
    - [ ] Using \`renderToBuffer\`, \`PDFViewer\`, or \`PDFDownloadLink\` to render the document
    - [ ] Root component returns \`<Document><Page>...</Page></Document>\`
    - [ ] No console errors about missing fonts

    ## TypeScript
    - [ ] No TypeScript errors in component files
    - [ ] Theme is typed as \`PdfxTheme\` (imported as a type from \`@pdfx/shared\`)

    ---

    ## Common Issues & Fixes

    ### "Cannot find module @/components/pdfx/..."
    The component hasn't been added yet. Run:
    \`\`\`bash
    npx pdfx-cli add <component-name>
    \`\`\`

    ### "Invalid hook call"
    \`@react-pdf/renderer\` renders synchronously. Hooks that depend on browser APIs or
    async side effects do not work in the PDF render path.

    **Do NOT use inside a PDFx component:**
    - \`useEffect\` / \`useLayoutEffect\` — no browser lifecycle in PDF rendering
    - \`useRef\` for DOM nodes — no DOM exists in the PDF render tree
    - Any hook that calls browser globals (\`window\`, \`document\`, \`navigator\`)

    **These ARE valid inside PDFx components:**
    - PDFx framework hooks: \`usePdfxTheme()\`, \`useSafeMemo()\`
    - Custom hooks that are pure functions with no browser-API dependencies
    - Data passed down as props from a parent client component

    If you see this error in a wrapper component you wrote, move the browser hook
    to the nearest client component and pass the result down as a prop.

    ### "Text strings must be rendered inside \`<Text>\` component"
    Wrap all string literals in \`<Text>\` from \`@react-pdf/renderer\`:
    \`\`\`tsx
    import { Text } from '@react-pdf/renderer';
    // ✗ Wrong: <View>Hello</View>
    // ✓ Correct: <View><Text>Hello</Text></View>
    \`\`\`

    ### Fonts not loading / rendering as a fallback
    Register custom fonts in your theme file:
    \`\`\`tsx
    import { Font } from '@react-pdf/renderer';

    Font.register({
      family: 'Inter',
      src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2',
    });
    \`\`\`

    ### PDF renders blank or empty
    Ensure your root component returns a \`<Document>\` with at least one \`<Page>\` inside:
    \`\`\`tsx
    import { Document, Page } from '@react-pdf/renderer';

    export function MyDocument() {
      return (
        <Document>
          <Page size="A4">
            {/* content here */}
          </Page>
        </Document>
      );
    }
    \`\`\`

    ### @react-pdf/renderer TypeScript errors
    Install the types package:
    \`\`\`bash
    npm install --save-dev @react-pdf/types
    \`\`\`

    ---

    ## @react-pdf/renderer Layout Constraints

    These are **fundamental PDF rendering limitations** — they cannot be fixed with CSS-like
    style tweaks. Understanding them will save hours of debugging.

    ### ⚠️ CRITICAL: Do NOT mix \`<View>\` and \`<Text>\` in the same flex row

    In HTML, inline elements (spans, badges) can sit next to block text freely.
    In \`@react-pdf/renderer\`, \`View\` and \`Text\` are fundamentally different node types.
    Placing a \`View\`-based component (e.g. \`<Badge>\`, \`<PdfAlert>\`) **inline** alongside
    a \`<Text>\` node in the same flex row causes irrecoverable misalignment, overlap, and
    overflow that no amount of padding, margin, or \`alignItems\` can fix.

    **Wrong — will cause layout corruption:**
    \`\`\`tsx
    {/* Badge is a View; Text is a Text node — they CANNOT share a flex row */}
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
      <Text>INV-2026-001</Text>
      <Badge label="PAID" variant="success" />
    </View>
    \`\`\`

    **Correct — place View-based components on their own line:**
    \`\`\`tsx
    <View style={{ flexDirection: 'column', gap: 2 }}>
      <Text>INV-2026-001</Text>
      <Badge label="PAID" variant="success" />
    </View>
    \`\`\`

    PDFx components that are \`View\`-based (cannot be mixed inline with \`<Text>\`):
    \`Badge\`, \`PdfAlert\`, \`Card\`, \`Divider\`, \`KeyValue\`, \`Section\`, \`Table\`, \`DataTable\`,
    \`PdfGraph\`, \`PdfImage\`, \`PdfSignatureBlock\`, \`PdfList\`

    ### No \`position: absolute\` stacking inside \`<Text>\` nodes
    Absolute positioning works on \`View\` elements but not inside \`Text\` runs.

    ### \`gap\` only works between \`View\` siblings
    Use \`gap\` on a \`View\` container whose children are all \`View\` elements.
    If any child is a raw \`Text\` node, use \`marginBottom\` on siblings instead.

    ### No percentage-based font sizes
    \`@react-pdf/renderer\` requires numeric pt/px values for \`fontSize\`. Do not use strings like \`"1rem"\` or \`"120%"\`.
  `);
}
