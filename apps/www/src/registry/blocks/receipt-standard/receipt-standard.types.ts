export interface ReceiptStandardData {
  receiptNumber: string;
  issuedAt: string;
  merchantName: string;
  merchantAddress: string;
  merchantEmail: string;
  cashier: string;
  paymentStatus: 'Paid' | 'Pending' | 'Refunded';
  paymentMethod: string;
  currency: string;
  customerName: string;
  items: {
    name: string;
    quantity: number;
    unitPrice: number;
  }[];
  summary: {
    subtotal: number;
    tax: number;
    total: number;
  };
  notes?: string;
}
