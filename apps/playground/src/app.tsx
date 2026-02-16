import { Heading, Text } from '@pdfx/ui';
import { Document, PDFViewer, Page, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#ffffff',
  },
  section: {
    marginBottom: 10,
  },
});

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <PDFViewer style={{ width: '100%', height: '100%' }} showToolbar={false}>
        <Document>
          <Page size="A4" style={styles.page}>
            <Heading level={1}>PDFX Playground</Heading>
            <Text>Testing components with live preview!</Text>

            <Heading level={2} style={{ marginTop: 20 }}>
              All Heading Levels
            </Heading>
            <Heading level={1}>Heading 1</Heading>
            <Heading level={2}>Heading 2</Heading>
            <Heading level={3}>Heading 3</Heading>
            <Heading level={4}>Heading 4</Heading>
            <Heading level={5}>Heading 5</Heading>
            <Heading level={6}>Heading 6</Heading>

            <Heading level={2} style={{ marginTop: 20 }}>
              Text Component
            </Heading>
            <Text>This is a paragraph of text using the Text component.</Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </Text>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
}
