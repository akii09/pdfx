// import type { PDFComponentProps } from '@pdfx/shared';

export type invoiceDetailsType = {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  companyName: string;
  companyAddress: string;
  subtitle: string;
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
};

// export interface Invoice01Props extends PDFComponentProps {
//   invoiceNumber: string,
//   invoiceDate: string,
//   dueDate: string,
//   billTo: {
//     name: string,
//     address: string,
//     email: string,
//     phone: string,
//   },
//   items: {
//     description: string,
//     quantity: number,
//     price: number,
//   }[],
//   summary: {
//     subtotal: number,
//     tax: number,
//     total: number,
//   },
//   notes?: string,
// }
