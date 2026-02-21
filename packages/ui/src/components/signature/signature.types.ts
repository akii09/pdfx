import type { Style } from '@react-pdf/types';

/** Signature block layout variant. */
export type SignatureVariant = 'single' | 'double' | 'inline';

/** Data for a single signer inside a signature block. */
export interface SignatureSigner {
  label?: string;
  name?: string;
  title?: string;
  date?: string;
}

export interface PdfSignatureBlockProps {
  variant?: SignatureVariant;
  label?: string;
  name?: string;
  title?: string;
  date?: string;
  signers?: [SignatureSigner, SignatureSigner];
  style?: Style;
}
