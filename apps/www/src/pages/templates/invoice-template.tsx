import {
  invoiceMinimalUsage,
  invoiceModernUsage,
  invoiceTemplateProps,
  invoiceTemplateUsage,
} from '@/constants';
import { InvoiceTemplate, PdfxThemeProvider } from '@pdfx/ui';
import type { InvoiceVariant } from '@pdfx/ui';
import { ComponentPage } from '../../components/component-page';
import { PDFPreview } from '../../components/pdf-preview';
import { useDocumentTitle } from '../../hooks/use-document-title';

const mockCompany = {
  name: 'Acme Inc',
  subtitle: 'Professional Services',
  address: '123 Main St, City, Country',
  email: 'hello@acme.com',
  phone: '+1 (555) 123-4567',
  taxId: 'TAX-123456',
};

const mockClient = {
  name: 'Client Corp',
  address: '456 Oak Ave, Suite 2, City',
  email: 'contact@client.com',
};

const mockItems = [
  { description: 'Web Development', quantity: 1, unitPrice: 5000 },
  { description: 'UI/UX Design', quantity: 1, unitPrice: 2500 },
  { description: 'Consulting', quantity: 10, unitPrice: 150, unit: 'hours' },
];

const mockPayment = {
  methods: 'Bank Transfer / Credit Card',
  terms: 'Net 30',
};

const renderPreviewDocument = (variant: InvoiceVariant) => (
  <PdfxThemeProvider>
    <InvoiceTemplate
      variant={variant}
      invoiceNumber="INV-2026-001"
      invoiceDate="March 1, 2026"
      dueDate="March 31, 2026"
      company={mockCompany}
      client={mockClient}
      items={mockItems}
      taxRate={8.5}
      payment={mockPayment}
      notes="Thank you for your business!"
    />
  </PdfxThemeProvider>
);

const variantOptions = [
  { value: 'classic' as InvoiceVariant, label: 'Classic' },
  { value: 'modern' as InvoiceVariant, label: 'Modern' },
  { value: 'minimal' as InvoiceVariant, label: 'Minimal' },
];

export default function InvoiceTemplatePage() {
  useDocumentTitle('Invoice Template');

  return (
    <ComponentPage
      title="InvoiceTemplate"
      description={`Data-driven invoice generator with three visual variants. Pass structured data 
(company, client, line items) and get a professional, theme-aware invoice PDF. 
Automatically calculates totals and supports custom currency formatting.`}
      installCommand="npx @akii09/pdfx-cli add invoice-template"
      componentName="invoice-template"
      preview={
        <PDFPreview
          title="Preview"
          downloadFilename="invoice-preview.pdf"
          variants={{
            options: variantOptions,
            defaultValue: 'classic' as InvoiceVariant,
            label: 'Variant',
          }}
        >
          {/* biome-ignore lint/suspicious/noExplicitAny: Generic type workaround */}
          {renderPreviewDocument as any}
        </PDFPreview>
      }
      usageCode={invoiceTemplateUsage}
      usageFilename="src/templates/my-invoice.tsx"
      props={invoiceTemplateProps}
      additionalInfo={
        <div className="space-y-6">
          <div className="rounded-lg border bg-muted/40 p-4">
            <h3 className="text-sm font-semibold mb-3">Variant Guide</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-foreground">•</span>
                <span>
                  <strong className="text-foreground">classic</strong> — Traditional professional
                  layout with logo-left header, three-column billing section, and grid table with
                  zebra stripes. Best for formal business invoices.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-foreground">•</span>
                <span>
                  <strong className="text-foreground">modern</strong> — Full-width branded header
                  with horizontal invoice meta strip. Primary-colored header for brand emphasis.
                  Great for tech companies and agencies.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-foreground">•</span>
                <span>
                  <strong className="text-foreground">minimal</strong> — Clean, minimal design with
                  inline invoice stamp and simplified table. Ideal for freelancers and small
                  businesses.
                </span>
              </li>
            </ul>
          </div>

          <div className="rounded-lg border bg-muted/40 p-4">
            <h3 className="text-sm font-semibold mb-3">Data Types</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div>
                <code className="text-xs bg-background px-1.5 py-0.5 rounded border">
                  InvoiceCompany
                </code>
                <p className="mt-1">name, subtitle?, address, email?, phone?, taxId?, logo?</p>
              </div>
              <div>
                <code className="text-xs bg-background px-1.5 py-0.5 rounded border">
                  InvoiceClient
                </code>
                <p className="mt-1">name, address, email?, phone?</p>
              </div>
              <div>
                <code className="text-xs bg-background px-1.5 py-0.5 rounded border">
                  InvoiceLineItem
                </code>
                <p className="mt-1">description, quantity, unitPrice, unit?</p>
              </div>
              <div>
                <code className="text-xs bg-background px-1.5 py-0.5 rounded border">
                  InvoiceSummary
                </code>
                <p className="mt-1">subtotal, tax?, taxRate?, discount?, shipping?, total</p>
              </div>
              <div>
                <code className="text-xs bg-background px-1.5 py-0.5 rounded border">
                  InvoiceCurrency
                </code>
                <p className="mt-1">code?, symbol?, decimals?, position? ('before' | 'after')</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Modern Variant Example</h3>
            <pre className="p-4 rounded-lg bg-muted text-xs overflow-x-auto">
              <code>{invoiceModernUsage}</code>
            </pre>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Minimal Variant Example</h3>
            <pre className="p-4 rounded-lg bg-muted text-xs overflow-x-auto">
              <code>{invoiceMinimalUsage}</code>
            </pre>
          </div>
        </div>
      }
    />
  );
}
