export const DEFAULTS = {
  REGISTRY_URL: 'https://pdfx.akashpise.dev/r',
  SCHEMA_URL: 'https://pdfx.akashpise.dev/schema.json',
  COMPONENT_DIR: './src/components/pdfx',
  THEME_FILE: './src/lib/pdfx-theme.ts',
  TEMPLATE_DIR: './src/templates/pdfx',
} as const;

export const REGISTRY_SUBPATHS = {
  TEMPLATES: 'templates',
} as const;
