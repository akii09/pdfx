export interface InvoiceConsultantData {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  companyName: string;
  subtitle: string;
  companyAddress: string;
  consultant: {
    name: string;
    title: string;
    email: string;
  };
  client: {
    name: string;
    company: string;
    address: string;
    email: string;
  };
  services: {
    description: string;
    hours: number;
    rate: number;
  }[];
  summary: {
    totalHours: number;
    subtotal: number;
    tax: number;
    total: number;
  };
  paymentTerms: {
    dueDate: string;
    method: string;
  };
  projectRef?: string;
  notes?: string;
}
