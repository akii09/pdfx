/**
 * This file contains constants used across the documentation pages.
 * It includes table of contents items, code snippets for examples, and CLI commands.
 * Keeping these in a separate file helps maintain consistency and makes it easier to update content in one place.
 */
export const tocItems = [
  { id: 'installation', title: 'Installation', level: 2 },
  { id: 'usage', title: 'Usage', level: 2 },
  { id: 'cli-commands', title: 'CLI Commands', level: 2 },
  { id: 'theming', title: 'Theming', level: 2 },
  { id: 'theme-cli', title: 'Theme CLI', level: 3 },
  { id: 'customizing', title: 'Customizing', level: 3 },
  { id: 'how-it-works', title: 'How It Works', level: 2 },
];

export const themeCommands = `# Initialize or replace your theme
npx @pdfx/cli theme init

# Switch to a different preset
npx @pdfx/cli theme switch modern

# Validate your theme file
npx @pdfx/cli theme validate`;

export const themeCustomization = `// src/lib/pdfx-theme.ts — this file is yours to customize
import type { PdfxTheme } from './pdfx-theme'; // type is inlined

export const theme: PdfxTheme = {
  name: 'my-custom-theme',
  colors: {
    primary: '#2563eb',        // your brand color
    foreground: '#1a1a1a',
    background: '#ffffff',
    // ... other color tokens
  },
  typography: {
    heading: {
      fontFamily: 'Helvetica',
      fontWeight: 700,
      lineHeight: 1.2,
      fontSize: { h1: 36, h2: 28, h3: 22, h4: 18, h5: 15, h6: 12 },
    },
    body: {
      fontFamily: 'Helvetica',
      fontSize: 12,
      lineHeight: 1.4,
    },
  },
  // ... spacing, page tokens
};`;

export const usageExample = `import { Document, Page } from '@react-pdf/renderer';
import { Heading } from '@/components/pdfx/pdfx-heading';
import { Text } from '@/components/pdfx/pdfx-text';

export function MyDocument() {
  return (
    <Document>
      <Page size="A4" style={{ padding: 30 }}>
        <Heading level={1}>Hello World</Heading>
        <Text>This is a paragraph of body text.</Text>
      </Page>
    </Document>
  );
}`;

export const cliCommands = `# Initialize PDFx in your project (includes theme setup)
npx @pdfx/cli init

# Add components
npx @pdfx/cli add heading text

# List available components
npx @pdfx/cli list

# Compare local vs registry
npx @pdfx/cli diff heading`;

export const manualStep1Deps = 'npm install @react-pdf/renderer';

export const manualStep2Pdfxjson = `{
  "registryUrl": "https://pdfx.akashpise.dev/r",
  "componentDir": "src/components/pdfx",
  "theme": "professional"
}`;

export const manualStep3Theme = `// src/lib/pdfx-theme.ts
// This is the theme file all PDFx components import from.
// You own this file — customize colors, fonts, spacing to match your brand.

export const theme = {
  name: "professional",
  primitives: {
    typography: { xs: 10, sm: 12, base: 15, lg: 18, xl: 22, "2xl": 28, "3xl": 36 },
    spacing: { 0: 0, 0.5: 2, 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 8: 32, 10: 40, 12: 48, 16: 64 },
    fontWeights: { regular: 400, medium: 500, semibold: 600, bold: 700 },
    lineHeights: { tight: 1.2, normal: 1.4, relaxed: 1.6 },
    borderRadius: { none: 0, sm: 2, md: 4, lg: 8, full: 9999 },
    letterSpacing: { tight: -0.025, normal: 0, wide: 0.025, wider: 0.05 },
  },
  colors: {
    foreground: "#18181b",
    background: "#ffffff",
    muted: "#f4f4f5",
    mutedForeground: "#71717a",
    primary: "#18181b",
    primaryForeground: "#ffffff",
    border: "#e4e4e7",
    accent: "#3b82f6",
    destructive: "#dc2626",
    success: "#16a34a",
    warning: "#d97706",
    info: "#0ea5e9",
  },
  typography: {
    body: { fontFamily: "Helvetica", fontSize: 11, lineHeight: 1.6 },
    heading: {
      fontFamily: "Times-Roman",
      fontWeight: 700,
      lineHeight: 1.25,
      fontSize: { h1: 32, h2: 24, h3: 20, h4: 16, h5: 14, h6: 12 },
    },
  },
  spacing: {
    page: { marginTop: 56, marginRight: 48, marginBottom: 56, marginLeft: 48 },
    sectionGap: 28,
    paragraphGap: 10,
    componentGap: 14,
  },
  page: { size: "A4", orientation: "portrait" },
};`;

export const manualStep4Structure = `your-project/
  src/
    lib/
      pdfx-theme.ts        # Theme file (Step 3)
    components/
      pdfx/
        pdfx-heading.tsx    # Components go here
        pdfx-text.tsx
        ...
  pdfx.json                # Project config (Step 2)`;

export const manualStep5AddComponent = `# Now you can copy components from each component's Manual tab.
# Or use the CLI to add them:
npx @pdfx/cli add heading text table`;
