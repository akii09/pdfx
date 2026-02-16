import { minimalTheme, modernTheme, professionalTheme } from '@pdfx/shared';
import type { PdfxTheme } from '@pdfx/shared';
import { Heading, Text } from '@pdfx/ui';
import { Document, Text as PDFText, PDFViewer, Page, StyleSheet, View } from '@react-pdf/renderer';

/** Renders a theme showcase page using the given theme's tokens directly. */
function ThemeShowcasePage({ theme }: { theme: PdfxTheme }) {
  const s = StyleSheet.create({
    page: {
      paddingTop: theme.spacing.page.marginTop,
      paddingRight: theme.spacing.page.marginRight,
      paddingBottom: theme.spacing.page.marginBottom,
      paddingLeft: theme.spacing.page.marginLeft,
      backgroundColor: theme.colors.background,
    },
    badge: {
      backgroundColor: theme.colors.primary,
      color: theme.colors.primaryForeground,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
      fontSize: theme.primitives.typography.xs,
      fontFamily: theme.typography.body.fontFamily,
      alignSelf: 'flex-start',
      marginBottom: theme.spacing.componentGap,
    },
    divider: {
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      marginVertical: theme.spacing.sectionGap,
    },
    colorRow: {
      flexDirection: 'row',
      gap: 8,
      marginBottom: theme.spacing.paragraphGap,
    },
    colorSwatch: {
      width: 24,
      height: 24,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    colorLabel: {
      fontSize: theme.primitives.typography.xs,
      fontFamily: theme.typography.body.fontFamily,
      color: theme.colors.mutedForeground,
      marginTop: 2,
    },
    mutedText: {
      fontSize: theme.typography.body.fontSize,
      fontFamily: theme.typography.body.fontFamily,
      color: theme.colors.mutedForeground,
      lineHeight: theme.typography.body.lineHeight,
      marginBottom: theme.spacing.paragraphGap,
    },
  });

  return (
    <Page size={theme.page.size} style={s.page}>
      <PDFText style={s.badge}>{theme.name}</PDFText>

      <Heading level={1}>Theme Preview</Heading>
      <Text>{`This page demonstrates the ${theme.name} theme preset. All typography, colors, and spacing values come from the theme tokens.`}</Text>

      <View style={s.divider} />

      <Heading level={2}>Typography Scale</Heading>
      <Heading level={1}>Heading Level 1</Heading>
      <Heading level={2}>Heading Level 2</Heading>
      <Heading level={3}>Heading Level 3</Heading>
      <Heading level={4}>Heading Level 4</Heading>
      <Heading level={5}>Heading Level 5</Heading>
      <Heading level={6}>Heading Level 6</Heading>
      <Text>
        Body text using the theme's body font family, size, and line height. The spacing between
        paragraphs is controlled by the paragraphGap token.
      </Text>
      <PDFText style={s.mutedText}>
        Muted text for secondary information, using mutedForeground color.
      </PDFText>

      <View style={s.divider} />

      <Heading level={2}>Color Palette</Heading>
      <View style={s.colorRow}>
        <View>
          <View style={[s.colorSwatch, { backgroundColor: theme.colors.primary }]} />
          <PDFText style={s.colorLabel}>primary</PDFText>
        </View>
        <View>
          <View style={[s.colorSwatch, { backgroundColor: theme.colors.foreground }]} />
          <PDFText style={s.colorLabel}>foreground</PDFText>
        </View>
        <View>
          <View style={[s.colorSwatch, { backgroundColor: theme.colors.accent }]} />
          <PDFText style={s.colorLabel}>accent</PDFText>
        </View>
        <View>
          <View style={[s.colorSwatch, { backgroundColor: theme.colors.muted }]} />
          <PDFText style={s.colorLabel}>muted</PDFText>
        </View>
        <View>
          <View style={[s.colorSwatch, { backgroundColor: theme.colors.destructive }]} />
          <PDFText style={s.colorLabel}>destructive</PDFText>
        </View>
      </View>

      <View style={s.divider} />

      <Heading level={2}>Theme Details</Heading>
      <Text>{`Heading font: ${theme.typography.heading.fontFamily} | Body font: ${theme.typography.body.fontFamily}`}</Text>
      <Text>{`Page: ${theme.page.size} ${theme.page.orientation} | Margins: ${theme.spacing.page.marginTop}pt`}</Text>
    </Page>
  );
}

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <PDFViewer style={{ width: '100%', height: '100%' }} showToolbar={false}>
        <Document>
          <ThemeShowcasePage theme={professionalTheme} />
          <ThemeShowcasePage theme={modernTheme} />
          <ThemeShowcasePage theme={minimalTheme} />
        </Document>
      </PDFViewer>
    </div>
  );
}
