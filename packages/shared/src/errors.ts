/** Base error class for all PDFx errors */
export class PdfxError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly suggestion?: string
  ) {
    super(message);
    this.name = 'PdfxError';
  }
}

/** Thrown when pdfx.json is missing, malformed, or has invalid fields */
export class ConfigError extends PdfxError {
  constructor(message: string, suggestion?: string) {
    super(message, 'CONFIG_ERROR', suggestion);
    this.name = 'ConfigError';
  }
}

/** Thrown when registry responses are invalid or components are not found */
export class RegistryError extends PdfxError {
  constructor(message: string, suggestion?: string) {
    super(message, 'REGISTRY_ERROR', suggestion);
    this.name = 'RegistryError';
  }
}

/** Thrown for network failures (DNS, timeout, connection refused) */
export class NetworkError extends PdfxError {
  constructor(message: string, suggestion?: string) {
    super(
      message,
      'NETWORK_ERROR',
      suggestion ?? 'Check your internet connection and registry URL'
    );
    this.name = 'NetworkError';
  }
}

/** Thrown when input validation fails (component names, file paths) */
export class ValidationError extends PdfxError {
  constructor(message: string, suggestion?: string) {
    super(message, 'VALIDATION_ERROR', suggestion);
    this.name = 'ValidationError';
  }
}
