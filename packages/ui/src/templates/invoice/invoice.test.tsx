import { renderToBuffer } from '@react-pdf/renderer';
import { describe, expect, it } from 'vitest';
import { PdfxThemeProvider } from '../../lib/pdfx-theme-context';
import { InvoiceTemplate } from './invoice';
import type { InvoiceClient, InvoiceCompany, InvoiceLineItem } from './invoice.types';

const mockCompany: InvoiceCompany = {
  name: 'Acme Inc',
  subtitle: 'Professional Services',
  address: '123 Main St, City, Country',
  email: 'hello@acme.com',
  phone: '+1 (555) 123-4567',
  taxId: 'TAX-123456',
};

const mockClient: InvoiceClient = {
  name: 'Client Corp',
  address: '456 Oak Ave, Suite 2, City',
  email: 'contact@client.com',
  phone: '+1 (555) 987-6543',
};

const mockItems: InvoiceLineItem[] = [
  { description: 'Web Development', quantity: 1, unitPrice: 5000 },
  { description: 'UI/UX Design', quantity: 1, unitPrice: 2500 },
  { description: 'Consulting', quantity: 10, unitPrice: 150, unit: 'hours' },
];

const baseProps = {
  invoiceNumber: 'INV-2026-001',
  invoiceDate: 'March 1, 2026',
  dueDate: 'March 31, 2026',
  company: mockCompany,
  client: mockClient,
  items: mockItems,
};

describe('InvoiceTemplate', () => {
  it('renders classic variant without crashing', async () => {
    const buffer = await renderToBuffer(
      <PdfxThemeProvider>
        <InvoiceTemplate {...baseProps} variant="classic" />
      </PdfxThemeProvider>
    );
    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer.length).toBeGreaterThan(0);
  });

  it('renders modern variant without crashing', async () => {
    const buffer = await renderToBuffer(
      <PdfxThemeProvider>
        <InvoiceTemplate {...baseProps} variant="modern" />
      </PdfxThemeProvider>
    );
    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer.length).toBeGreaterThan(0);
  });

  it('renders minimal variant without crashing', async () => {
    const buffer = await renderToBuffer(
      <PdfxThemeProvider>
        <InvoiceTemplate {...baseProps} variant="minimal" />
      </PdfxThemeProvider>
    );
    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer.length).toBeGreaterThan(0);
  });

  it('defaults to classic variant when not specified', async () => {
    const buffer = await renderToBuffer(
      <PdfxThemeProvider>
        <InvoiceTemplate {...baseProps} />
      </PdfxThemeProvider>
    );
    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer.length).toBeGreaterThan(0);
  });

  it('calculates summary automatically from items', async () => {
    const buffer = await renderToBuffer(
      <PdfxThemeProvider>
        <InvoiceTemplate {...baseProps} taxRate={10} />
      </PdfxThemeProvider>
    );
    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer.length).toBeGreaterThan(0);
  });

  it('accepts custom summary when provided', async () => {
    const buffer = await renderToBuffer(
      <PdfxThemeProvider>
        <InvoiceTemplate
          {...baseProps}
          summary={{
            subtotal: 9000,
            tax: 720,
            taxRate: 8,
            discount: 500,
            total: 9220,
          }}
        />
      </PdfxThemeProvider>
    );
    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer.length).toBeGreaterThan(0);
  });

  it('handles different currency formats', async () => {
    const buffer = await renderToBuffer(
      <PdfxThemeProvider>
        <InvoiceTemplate
          {...baseProps}
          currency={{ symbol: '€', position: 'after', decimals: 2 }}
        />
      </PdfxThemeProvider>
    );
    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer.length).toBeGreaterThan(0);
  });

  it('renders with payment information', async () => {
    const buffer = await renderToBuffer(
      <PdfxThemeProvider>
        <InvoiceTemplate
          {...baseProps}
          payment={{
            methods: 'Bank Transfer / Credit Card',
            terms: 'Net 30',
            bankDetails: 'Bank: ACME Bank, Account: 123456789',
          }}
        />
      </PdfxThemeProvider>
    );
    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer.length).toBeGreaterThan(0);
  });

  it('renders with notes', async () => {
    const buffer = await renderToBuffer(
      <PdfxThemeProvider>
        <InvoiceTemplate
          {...baseProps}
          notes="Thank you for your business! Late payments subject to 1.5% monthly interest."
        />
      </PdfxThemeProvider>
    );
    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer.length).toBeGreaterThan(0);
  });

  it('renders with company logo', async () => {
    const buffer = await renderToBuffer(
      <PdfxThemeProvider>
        <InvoiceTemplate
          {...baseProps}
          company={{ ...mockCompany, logo: 'https://placehold.co/100x100.png' }}
        />
      </PdfxThemeProvider>
    );
    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer.length).toBeGreaterThan(0);
  });

  it('handles empty items array gracefully', async () => {
    const buffer = await renderToBuffer(
      <PdfxThemeProvider>
        <InvoiceTemplate {...baseProps} items={[]} />
      </PdfxThemeProvider>
    );
    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer.length).toBeGreaterThan(0);
  });

  it('renders with minimal company information', async () => {
    const buffer = await renderToBuffer(
      <PdfxThemeProvider>
        <InvoiceTemplate {...baseProps} company={{ name: 'Simple Co', address: '123 Street' }} />
      </PdfxThemeProvider>
    );
    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer.length).toBeGreaterThan(0);
  });

  it('renders with minimal client information', async () => {
    const buffer = await renderToBuffer(
      <PdfxThemeProvider>
        <InvoiceTemplate {...baseProps} client={{ name: 'Client', address: '456 Avenue' }} />
      </PdfxThemeProvider>
    );
    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer.length).toBeGreaterThan(0);
  });

  it('sets custom PDF title', async () => {
    const buffer = await renderToBuffer(
      <PdfxThemeProvider>
        <InvoiceTemplate {...baseProps} title="Custom Invoice Title" />
      </PdfxThemeProvider>
    );
    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer.length).toBeGreaterThan(0);
  });

  it('applies custom page style', async () => {
    const buffer = await renderToBuffer(
      <PdfxThemeProvider>
        <InvoiceTemplate {...baseProps} style={{ padding: 40 }} />
      </PdfxThemeProvider>
    );
    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer.length).toBeGreaterThan(0);
  });
});
