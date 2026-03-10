import type { Style } from '@react-pdf/types';

/**
 * Invoice template variants.
 * - classic: Traditional professional look with logo-left header and grid table
 * - modern: Full-width banner header with horizontal invoice strip
 * - minimal: Clean minimalist design with inline invoice stamp
 */
export type InvoiceVariant = 'classic' | 'modern' | 'minimal';

/**
 * Company/sender information.
 */
export interface InvoiceCompany {
  /** Company or business name */
  name: string;
  /** Optional tagline or subtitle */
  subtitle?: string;
  /** Full address (can include city, state, country) */
  address: string;
  /** Contact email */
  email?: string;
  /** Contact phone */
  phone?: string;
  /** Tax ID, VAT, or GST number */
  taxId?: string;
  /** Logo image source (URL or base64) */
  logo?: string;
}

/**
 * Client/recipient information.
 */
export interface InvoiceClient {
  /** Client name or company */
  name: string;
  /** Full address */
  address: string;
  /** Contact email */
  email?: string;
  /** Contact phone */
  phone?: string;
}

/**
 * Single line item on the invoice.
 */
export interface InvoiceLineItem {
  /** Description of the product or service */
  description: string;
  /** Quantity */
  quantity: number;
  /** Unit price */
  unitPrice: number;
  /** Optional unit label (e.g., "hours", "units") */
  unit?: string;
}

/**
 * Invoice summary/totals section.
 */
export interface InvoiceSummary {
  /** Subtotal before tax */
  subtotal: number;
  /** Tax amount */
  tax?: number;
  /** Tax rate as percentage (e.g., 7.5 for 7.5%) */
  taxRate?: number;
  /** Optional discount amount */
  discount?: number;
  /** Optional shipping/handling */
  shipping?: number;
  /** Final total */
  total: number;
}

/**
 * Payment information.
 */
export interface InvoicePayment {
  /** Payment methods accepted */
  methods?: string;
  /** Bank details or payment instructions */
  bankDetails?: string;
  /** Terms (e.g., "Net 30", "Due on receipt") */
  terms?: string;
}

/**
 * Currency configuration.
 */
export interface InvoiceCurrency {
  /** Currency code (e.g., "USD", "EUR", "INR") */
  code?: string;
  /** Currency symbol (e.g., "$", "€", "₹") */
  symbol?: string;
  /** Decimal places (default: 2) */
  decimals?: number;
  /** Symbol position: 'before' or 'after' */
  position?: 'before' | 'after';
}

/**
 * Props for the InvoiceTemplate component.
 */
export interface InvoiceTemplateProps {
  /**
   * Visual variant of the invoice.
   * @default "classic"
   */
  variant?: InvoiceVariant;

  /**
   * Invoice number/identifier.
   */
  invoiceNumber: string;

  /**
   * Invoice issue date.
   */
  invoiceDate: string;

  /**
   * Payment due date.
   */
  dueDate: string;

  /**
   * Sender/company information.
   */
  company: InvoiceCompany;

  /**
   * Recipient/client information.
   */
  client: InvoiceClient;

  /**
   * Line items (products/services).
   */
  items: InvoiceLineItem[];

  /**
   * Invoice totals summary.
   * If not provided, will be calculated from items.
   */
  summary?: InvoiceSummary;

  /**
   * Tax rate as percentage (used if summary not provided).
   * @default 0
   */
  taxRate?: number;

  /**
   * Payment information.
   */
  payment?: InvoicePayment;

  /**
   * Currency configuration.
   * @default { symbol: '$', position: 'before', decimals: 2 }
   */
  currency?: InvoiceCurrency;

  /**
   * Additional notes or terms (displayed at bottom).
   */
  notes?: string;

  /**
   * Custom styles for the page.
   */
  style?: Style;

  /**
   * Document title for PDF metadata.
   */
  title?: string;
}
