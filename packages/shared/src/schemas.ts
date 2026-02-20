import { z } from 'zod';

// ─── Theme Schemas ──────────────────────────────────────────────────────────

/** Schema for semantic color tokens */
export const colorTokensSchema = z.object({
  foreground: z.string().min(1),
  background: z.string().min(1),
  muted: z.string().min(1),
  mutedForeground: z.string().min(1),
  primary: z.string().min(1),
  primaryForeground: z.string().min(1),
  border: z.string().min(1),
  accent: z.string().min(1),
  destructive: z.string().min(1),
  success: z.string().min(1),
  warning: z.string().min(1),
  info: z.string().min(1),
});

/** Schema for heading font size map */
export const headingFontSizeSchema = z.object({
  h1: z.number().positive(),
  h2: z.number().positive(),
  h3: z.number().positive(),
  h4: z.number().positive(),
  h5: z.number().positive(),
  h6: z.number().positive(),
});

/** Schema for typography tokens */
export const typographyTokensSchema = z.object({
  body: z.object({
    fontFamily: z.string().min(1),
    fontSize: z.number().positive(),
    lineHeight: z.number().positive(),
  }),
  heading: z.object({
    fontFamily: z.string().min(1),
    fontWeight: z.number().int().min(100).max(900),
    lineHeight: z.number().positive(),
    fontSize: headingFontSizeSchema,
  }),
});

/** Schema for spacing tokens */
export const spacingTokensSchema = z.object({
  page: z.object({
    marginTop: z.number().min(0),
    marginRight: z.number().min(0),
    marginBottom: z.number().min(0),
    marginLeft: z.number().min(0),
  }),
  sectionGap: z.number().min(0),
  paragraphGap: z.number().min(0),
  componentGap: z.number().min(0),
});

/** Schema for page tokens */
export const pageTokensSchema = z.object({
  size: z.enum(['A4', 'LETTER', 'LEGAL']),
  orientation: z.enum(['portrait', 'landscape']),
});

/** Schema for primitive tokens */
export const primitiveTokensSchema = z.object({
  typography: z.record(z.number()),
  spacing: z.record(z.number()),
  fontWeights: z.object({
    regular: z.number(),
    medium: z.number(),
    semibold: z.number(),
    bold: z.number(),
  }),
  lineHeights: z.object({
    tight: z.number(),
    normal: z.number(),
    relaxed: z.number(),
  }),
  borderRadius: z.object({
    none: z.number(),
    sm: z.number(),
    md: z.number(),
    lg: z.number(),
    full: z.number(),
  }),
  letterSpacing: z.object({
    tight: z.number(),
    normal: z.number(),
    wide: z.number(),
    wider: z.number(),
  }),
});

/** Schema for the complete PdfxTheme object */
export const themeSchema = z.object({
  name: z.string().min(1),
  primitives: primitiveTokensSchema,
  colors: colorTokensSchema,
  typography: typographyTokensSchema,
  spacing: spacingTokensSchema,
  page: pageTokensSchema,
});

// ─── Config & Registry Schemas ──────────────────────────────────────────────

/** Schema for pdfx.json config file */
export const configSchema = z.object({
  $schema: z.string().optional(),
  componentDir: z.string().min(1, 'componentDir must not be empty'),
  registry: z.string().url('registry must be a valid URL'),
  theme: z.string().min(1).optional(),
});

/** Valid file types for registry items */
export const registryFileTypes = ['registry:component', 'registry:lib', 'registry:style'] as const;

/** Schema for a single file in a registry item */
export const registryFileSchema = z.object({
  path: z.string().min(1),
  content: z.string(),
  type: z.enum(registryFileTypes),
});

/** Schema for a component fetched from the registry */
export const registryItemSchema = z.object({
  name: z.string().min(1),
  type: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  files: z.array(registryFileSchema).min(1, 'Component must have at least one file'),
  dependencies: z.array(z.string()).optional(),
});

/** Schema for the full registry index */
export const registrySchema = z.object({
  $schema: z.string(),
  name: z.string(),
  homepage: z.string(),
  items: z.array(
    z.object({
      name: z.string().min(1),
      type: z.string(),
      title: z.string(),
      description: z.string(),
      files: z.array(
        z.object({
          path: z.string().min(1),
          type: z.string(),
        })
      ),
      dependencies: z.array(z.string()).optional(),
    })
  ),
});

/**
 * Validates component names.
 * Must start with lowercase letter, contain only lowercase letters, numbers, and hyphens.
 */
export const componentNameSchema = z
  .string()
  .regex(
    /^[a-z][a-z0-9-]*$/,
    'Component name must start with a lowercase letter and contain only lowercase letters, numbers, and hyphens'
  );

export type Config = z.infer<typeof configSchema>;
export type RegistryItem = z.infer<typeof registryItemSchema>;
export type RegistryFile = z.infer<typeof registryFileSchema>;
export type Registry = z.infer<typeof registrySchema>;
