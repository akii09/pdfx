export type { PDFComponentProps } from './types.js';

export type {
  PdfxTheme,
  PrimitiveTokens,
  ColorTokens,
  TypographyTokens,
  SpacingTokens,
  PageTokens,
  TypographyScale,
  SpacingScale,
  FontWeights,
  LineHeights,
} from './theme.js';

export {
  configSchema,
  registryItemSchema,
  registryFileSchema,
  registrySchema,
  componentNameSchema,
  themeSchema,
  colorTokensSchema,
  typographyTokensSchema,
  spacingTokensSchema,
  pageTokensSchema,
  primitiveTokensSchema,
  headingFontSizeSchema,
  type Config,
  type RegistryItem,
  type RegistryFile,
} from './schemas.js';

export {
  defaultPrimitives,
  professionalTheme,
  modernTheme,
  minimalTheme,
  themePresets,
  type ThemePresetName,
} from './themes/index.js';

export { PdfxError, ConfigError, RegistryError, NetworkError, ValidationError } from './errors.js';
