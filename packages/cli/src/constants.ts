export const DEFAULTS = {
  REGISTRY_URL: 'https://pdfx.akashpise.dev/r',
  SCHEMA_URL: 'https://pdfx.akashpise.dev/schema.json',
  COMPONENT_DIR: './src/components/pdfx',
  THEME_FILE: './src/lib/pdfx-theme.ts',
  BLOCK_DIR: './src/blocks/pdfx',
} as const;

export const REGISTRY_SUBPATHS = {
  BLOCKS: 'blocks',
} as const;

export const REQUIRED_VERSIONS = {
  '@react-pdf/renderer': '>=3.0.0',
  react: '>=16.8.0',
  node: '>=20.0.0',
};
