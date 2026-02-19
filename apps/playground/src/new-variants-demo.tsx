import { minimalTheme } from '@pdfx/shared';
import { Heading, PageFooter, PageHeader, Section, Text } from '@pdfx/ui';
import { Document, PDFViewer, Page, StyleSheet } from '@react-pdf/renderer';

/**
 * Demo showcasing the new PageHeader and PageFooter variants added in Phase 1 Week 3
 * - PageHeader: logo-left, two-column variants
 * - PageFooter: three-column variant
 */

const styles = StyleSheet.create({
  page: {
    paddingTop: minimalTheme.spacing.page.marginTop,
    paddingRight: minimalTheme.spacing.page.marginRight,
    paddingBottom: minimalTheme.spacing.page.marginBottom,
    paddingLeft: minimalTheme.spacing.page.marginLeft,
    backgroundColor: minimalTheme.colors.background,
  },
  demoSection: {
    marginBottom: minimalTheme.spacing.sectionGap,
  },
  logoPlaceholder: {
    width: 48,
    height: 48,
    backgroundColor: minimalTheme.colors.primary,
    borderRadius: 4,
  },
});

// Demo Document with new variants
function NewVariantsDemo() {
  return (
    <Document>
      {/* ═══════════════════════════════════════════════════════════════════
          Page 1: PageHeader new variants
          ═══════════════════════════════════════════════════════════════════ */}
      <Page size="A4" style={styles.page}>
        <PageHeader
          title="PageHeader Variants Demo"
          subtitle="New variants added in Phase 1 Week 3"
          variant="simple"
        />

        <Section>
          <Heading level={3}>1. Logo-Left Variant</Heading>
          <Text>
            The logo-left variant displays a logo on the left side with the title and subtitle on
            the right. Perfect for professional business documents.
          </Text>
        </Section>

        <PageFooter leftText="© 2026 PDFX" rightText="Page 1 of 3" variant="simple" />
      </Page>

      {/* ═══════════════════════════════════════════════════════════════════
          Page 2: Logo-Left Variant Example
          ═══════════════════════════════════════════════════════════════════ */}
      <Page size="A4" style={styles.page}>
        <PageHeader
          title="Acme Corporation"
          subtitle="Professional Business Solutions"
          variant="logo-left"
          logo={<div style={styles.logoPlaceholder} />}
        />

        <Section>
          <Heading level={3}>Logo-Left Variant Features</Heading>
          <Text>✓ Logo element displayed on the left side</Text>
          <Text>✓ Title and subtitle aligned to the right of logo</Text>
          <Text>✓ Professional, branded appearance</Text>
          <Text>✓ Suitable for invoices, reports, and business documents</Text>
        </Section>

        <Heading level={3}>Usage Example</Heading>
        <Text
          style={{ fontFamily: 'Courier', fontSize: 9, color: minimalTheme.colors.mutedForeground }}
        >
          {`<PageHeader
  title="Acme Corporation"
  subtitle="Professional Business Solutions"
  variant="logo-left"
  logo={<Image src="/logo.png" style={{ width: 48, height: 48 }} />}
/>`}
        </Text>

        <PageFooter leftText="© 2026 PDFX" rightText="Page 2 of 3" variant="simple" />
      </Page>

      {/* ═══════════════════════════════════════════════════════════════════
          Page 3: Two-Column Variant Example
          ═══════════════════════════════════════════════════════════════════ */}
      <Page size="A4" style={styles.page}>
        <PageHeader
          title="Invoice #INV-2026-001"
          subtitle="Acme Corporation"
          variant="two-column"
          address="123 Main Street, San Francisco, CA 94102"
          phone="+1 (555) 123-4567"
          email="billing@acme.com"
        />

        <Section>
          <Heading level={3}>Two-Column Variant Features</Heading>
          <Text>✓ Left column: title and subtitle</Text>
          <Text>✓ Right column: contact information (address, phone, email)</Text>
          <Text>✓ Clean, organized layout for business correspondence</Text>
          <Text>✓ Perfect for invoices, estimates, and formal letters</Text>
        </Section>

        <Heading level={3}>Usage Example</Heading>
        <Text
          style={{ fontFamily: 'Courier', fontSize: 9, color: minimalTheme.colors.mutedForeground }}
        >
          {`<PageHeader
  title="Invoice #INV-2026-001"
  subtitle="Acme Corporation"
  variant="two-column"
  address="123 Main Street, City, ST 12345"
  phone="+1 (555) 123-4567"
  email="billing@acme.com"
/>`}
        </Text>

        <PageFooter
          leftText="Acme Corporation"
          rightText="Page 3 of 3"
          variant="three-column"
          phone="+1 (555) 123-4567"
          email="billing@acme.com"
          website="www.acme.com"
        />
      </Page>

      {/* ═══════════════════════════════════════════════════════════════════
          Page 4: Three-Column Footer Variant
          ═══════════════════════════════════════════════════════════════════ */}
      <Page size="A4" style={styles.page}>
        <PageHeader
          title="PageFooter: Three-Column Variant"
          subtitle="Comprehensive footer with contact information"
          variant="simple"
        />

        <Section>
          <Heading level={3}>Three-Column Footer Features</Heading>
          <Text>✓ Left column: company name and optional address</Text>
          <Text>✓ Center column: contact details (phone, email, website)</Text>
          <Text>✓ Right column: page numbers or reference info</Text>
          <Text>✓ Professional appearance for multi-page documents</Text>
          <Text>✓ All contact information in one organized footer</Text>
        </Section>

        <Heading level={3}>Usage Example</Heading>
        <Text
          style={{ fontFamily: 'Courier', fontSize: 9, color: minimalTheme.colors.mutedForeground }}
        >
          {`<PageFooter
  leftText="Acme Corporation"
  rightText="Page 1 of 5"
  variant="three-column"
  address="123 Main Street, City, ST 12345"
  phone="+1 (555) 123-4567"
  email="contact@acme.com"
  website="www.acme.com"
/>`}
        </Text>

        <Section style={{ marginTop: minimalTheme.spacing.sectionGap * 2 }}>
          <Heading level={3}>Backward Compatibility</Heading>
          <Text>
            ✅ All existing PageHeader and PageFooter usages continue to work without any changes.
          </Text>
          <Text>
            ✅ New variant props (logo, address, phone, email, website) are completely optional.
          </Text>
          <Text>
            ✅ Default behavior remains unchanged - existing code requires zero modifications.
          </Text>
        </Section>

        <PageFooter
          leftText="Acme Corporation"
          rightText="Page 4 of 4"
          variant="three-column"
          address="123 Main Street, San Francisco, CA 94102"
          phone="+1 (555) 123-4567"
          email="contact@acme.com"
          website="www.acme.com"
        />
      </Page>
    </Document>
  );
}

// App component for development preview
export default function App() {
  return (
    <PDFViewer style={{ width: '100%', height: '100vh' }}>
      <NewVariantsDemo />
    </PDFViewer>
  );
}
