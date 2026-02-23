export interface InvoiceData {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  companyName: string;
  companyAddress: string;
  companyEmail: string;
  subtitle: string;
  /** Optional logo URL or base64 data URI shown in the classic template header. */
  logo?: string;
  billTo: {
    name: string;
    address: string;
    email: string;
    phone: string;
  };
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
  }[];
  summary: {
    subtotal: number;
    tax: number;
    total: number;
  };
  paymentTerms: {
    dueDate: string;
    method: string;
    gst: string;
  };
  notes?: string;
}
