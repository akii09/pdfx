import { themePresets } from '@pdfx/shared';
import dedent from 'dedent';
import { z } from 'zod';
import { textResponse } from '../utils.js';

export const getThemeSchema = z.object({
  theme: z.enum(['professional', 'modern', 'minimal']).describe('Theme preset name'),
});

export async function getTheme(
  args: z.infer<typeof getThemeSchema>
): Promise<ReturnType<typeof textResponse>> {
  const preset = themePresets[args.theme];
  const { colors, typography, spacing, page } = preset;

  return textResponse(dedent`
    # PDFx Theme: ${args.theme}

    ## Colors
    | Token | Value |
    |-------|-------|
    | foreground | \`${colors.foreground}\` |
    | background | \`${colors.background}\` |
    | primary | \`${colors.primary}\` |
    | primaryForeground | \`${colors.primaryForeground}\` |
    | accent | \`${colors.accent}\` |
    | muted | \`${colors.muted}\` |
    | mutedForeground | \`${colors.mutedForeground}\` |
    | border | \`${colors.border}\` |
    | destructive | \`${colors.destructive}\` |
    | success | \`${colors.success}\` |
    | warning | \`${colors.warning}\` |
    | info | \`${colors.info}\` |

    ## Typography

    ### Body
    - Font family: \`${typography.body.fontFamily}\`
    - Font size: ${typography.body.fontSize}pt
    - Line height: ${typography.body.lineHeight}

    ### Headings
    - Font family: \`${typography.heading.fontFamily}\`
    - Font weight: ${typography.heading.fontWeight}
    - Line height: ${typography.heading.lineHeight}
    - h1: ${typography.heading.fontSize.h1}pt
    - h2: ${typography.heading.fontSize.h2}pt
    - h3: ${typography.heading.fontSize.h3}pt
    - h4: ${typography.heading.fontSize.h4}pt
    - h5: ${typography.heading.fontSize.h5}pt
    - h6: ${typography.heading.fontSize.h6}pt

    ## Spacing
    - Page margins: top=${spacing.page.marginTop}pt · right=${spacing.page.marginRight}pt · bottom=${spacing.page.marginBottom}pt · left=${spacing.page.marginLeft}pt
    - Section gap: ${spacing.sectionGap}pt
    - Paragraph gap: ${spacing.paragraphGap}pt
    - Component gap: ${spacing.componentGap}pt

    ## Page
    - Size: ${page.size}
    - Orientation: ${page.orientation}

    ## Apply This Theme
    \`\`\`bash
    npx @akii09/pdfx-cli theme switch ${args.theme}
    \`\`\`

    ## Usage in Components
    \`\`\`tsx
    // Access theme values in a PDFx component
    import type { PdfxTheme } from '@pdfx/shared';

    interface Props {
      theme: PdfxTheme;
    }

    export function MyComponent({ theme }: Props) {
      return (
        <View style={{ backgroundColor: theme.colors.background }}>
          <Text style={{ color: theme.colors.foreground, fontSize: theme.typography.body.fontSize }}>
            Content
          </Text>
        </View>
      );
    }
    \`\`\`
  `);
}
