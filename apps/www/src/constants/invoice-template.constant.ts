export const invoiceTemplateProps = [
  {
    name: 'variant',
    type: '"classic" | "modern" | "minimal"',
    defaultValue: '"classic"',
    description: 'Visual variant of the invoice',
  },
  {
    name: 'invoiceNumber',
    type: 'string',
    description: 'Invoice number/identifier',
    required: true,
  },
  {
    name: 'invoiceDate',
    type: 'string',
    description: 'Invoice issue date',
    required: true,
  },
  {
    name: 'dueDate',
    type: 'string',
    description: 'Payment due date',
    required: true,
  },
  {
    name: 'company',
    type: 'InvoiceCompany',
    description: 'Sender/company information (name, address, email, phone, taxId, logo)',
    required: true,
  },
  {
    name: 'client',
    type: 'InvoiceClient',
    description: 'Recipient/client information (name, address, email, phone)',
    required: true,
  },
  {
    name: 'items',
    type: 'InvoiceLineItem[]',
    defaultValue: '[]',
    description: 'Line items with description, quantity, unitPrice, and optional unit',
    required: true,
  },
  {
    name: 'summary',
    type: 'InvoiceSummary',
    defaultValue: 'auto-calculated',
    description: 'Invoice totals (subtotal, tax, discount, shipping, total)',
  },
  {
    name: 'taxRate',
    type: 'number',
    defaultValue: '0',
    description: 'Tax rate as percentage (used if summary not provided)',
  },
  {
    name: 'payment',
    type: 'InvoicePayment',
    description: 'Payment information (methods, bankDetails, terms)',
  },
  {
    name: 'currency',
    type: 'InvoiceCurrency',
    defaultValue: '{ symbol: "$", position: "before", decimals: 2 }',
    description: 'Currency formatting options',
  },
  {
    name: 'notes',
    type: 'string',
    description: 'Additional notes or terms (displayed at bottom)',
  },
  {
    name: 'title',
    type: 'string',
    defaultValue: '"Invoice {invoiceNumber}"',
    description: 'Document title for PDF metadata',
  },
  {
    name: 'style',
    type: 'Style',
    description: 'Custom styles for the page',
  },
];

export const invoiceTemplateUsage = `import { InvoiceTemplate, PdfxThemeProvider } from '@pdfx/ui';
import { PDFViewer } from '@react-pdf/renderer';

function MyInvoice() {
  return (
    <PDFViewer width="100%" height={600}>
      <PdfxThemeProvider>
        <InvoiceTemplate
          invoiceNumber="INV-2026-001"
          invoiceDate="March 1, 2026"
          dueDate="March 31, 2026"
          company={{
            name: 'Acme Inc',
            subtitle: 'Professional Services',
            address: '123 Main St, City, Country',
            email: 'hello@acme.com',
            phone: '+1 (555) 123-4567',
            taxId: 'TAX-123456',
          }}
          client={{
            name: 'Client Corp',
            address: '456 Oak Ave, Suite 2, City',
            email: 'contact@client.com',
          }}
          items={[
            { description: 'Web Development', quantity: 1, unitPrice: 5000 },
            { description: 'UI/UX Design', quantity: 1, unitPrice: 2500 },
            { description: 'Consulting', quantity: 10, unitPrice: 150, unit: 'hours' },
          ]}
          taxRate={8.5}
          payment={{
            methods: 'Bank Transfer / Credit Card',
            terms: 'Net 30',
          }}
          notes="Thank you for your business!"
        />
      </PdfxThemeProvider>
    </PDFViewer>
  );
}`;

export const invoiceModernUsage = `<InvoiceTemplate
  variant="modern"
  invoiceNumber="INV-2026-002"
  invoiceDate="March 1, 2026"
  dueDate="March 31, 2026"
  company={{
    name: 'TechCorp',
    subtitle: 'Digital Solutions',
    address: '789 Tech Blvd, Innovation City',
    email: 'sales@techcorp.io',
  }}
  client={{
    name: 'StartupXYZ',
    address: '321 Innovation Dr, Startup Town',
    email: 'founders@startupxyz.com',
  }}
  items={[
    { description: 'SaaS Platform Development', quantity: 1, unitPrice: 15000 },
    { description: 'API Integration', quantity: 1, unitPrice: 3000 },
  ]}
  taxRate={10}
/>`;

export const invoiceMinimalUsage = `<InvoiceTemplate
  variant="minimal"
  invoiceNumber="INV-2026-003"
  invoiceDate="March 1, 2026"
  dueDate="March 15, 2026"
  company={{
    name: 'Freelancer Co',
    address: 'Remote, Global',
    email: 'work@freelancer.co',
  }}
  client={{
    name: 'Small Biz LLC',
    address: '100 Simple St, Easy Town',
  }}
  items={[
    { description: 'Logo Design', quantity: 1, unitPrice: 500 },
    { description: 'Brand Guidelines', quantity: 1, unitPrice: 750 },
  ]}
  notes="Payment due upon receipt."
/>`;
