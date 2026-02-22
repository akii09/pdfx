/**
 * Shared sample data for invoice template previews.
 * Swap this out with your real data source.
 */
export const sampleInvoice = {
  company: {
    name: 'Acme Studio',
    tagline: 'Design & Development Agency',
    address: '123 Design Street, Suite 400',
    city: 'San Francisco, CA 94102',
    phone: '+1 (555) 123-4567',
    email: 'hello@acmestudio.com',
    website: 'acmestudio.com',
  },
  client: {
    name: 'TechCorp Inc.',
    contact: 'Sarah Johnson',
    address: '456 Business Avenue, Floor 12',
    city: 'New York, NY 10001',
    email: 'billing@techcorp.com',
  },
  invoice: {
    number: 'INV-2026-001',
    date: 'February 22, 2026',
    dueDate: 'March 22, 2026',
    terms: 'Net 30',
    status: 'Unpaid',
    reference: 'PROJECT-2024-TC',
  },
  items: [
    {
      description: 'Brand Identity Design',
      details: 'Logo, color palette, typography system',
      qty: 1,
      unit: 'project',
      rate: 2500,
      amount: 2500,
    },
    {
      description: 'UI/UX Design',
      details: '10 high-fidelity screens with interactive prototype',
      qty: 10,
      unit: 'screen',
      rate: 150,
      amount: 1500,
    },
    {
      description: 'Frontend Development',
      details: 'React implementation with responsive layouts',
      qty: 40,
      unit: 'hours',
      rate: 95,
      amount: 3800,
    },
    {
      description: 'Project Management',
      details: 'Coordination, reviews, and client communication',
      qty: 8,
      unit: 'hours',
      rate: 75,
      amount: 600,
    },
  ],
  subtotal: 8400,
  taxRate: 10,
  tax: 840,
  total: 9240,
  bankDetails: {
    bankName: 'First National Bank',
    accountName: 'Acme Studio LLC',
    accountNumber: '****4827',
    routingNumber: '021000021',
    reference: 'INV-2026-001',
  },
  notes:
    'Payment due within 30 days from invoice date. Please include invoice number in your payment reference.',
  thankYou: 'Thank you for your business!',
};

export type InvoiceData = typeof sampleInvoice;
