import { describe, expect, it } from 'vitest';
import { themeSchema } from './schemas';
import { minimalTheme, modernTheme, professionalTheme, themePresets } from './themes/index';

describe('themeSchema', () => {
  it.each(['professional', 'modern', 'minimal'] as const)(
    '%s preset should validate against themeSchema',
    (name) => {
      const result = themeSchema.safeParse(themePresets[name]);
      expect(result.success).toBe(true);
    }
  );

  it('should reject theme with missing name', () => {
    const { name: _, ...noName } = professionalTheme;
    const result = themeSchema.safeParse(noName);
    expect(result.success).toBe(false);
  });

  it('should reject theme with empty name', () => {
    const result = themeSchema.safeParse({ ...professionalTheme, name: '' });
    expect(result.success).toBe(false);
  });

  it('should reject theme with missing colors', () => {
    const { colors: _, ...noColors } = professionalTheme;
    const result = themeSchema.safeParse(noColors);
    expect(result.success).toBe(false);
  });

  it('should reject theme with negative font size', () => {
    const result = themeSchema.safeParse({
      ...professionalTheme,
      typography: {
        ...professionalTheme.typography,
        body: { ...professionalTheme.typography.body, fontSize: -1 },
      },
    });
    expect(result.success).toBe(false);
  });

  it('should reject theme with invalid page size', () => {
    const result = themeSchema.safeParse({
      ...professionalTheme,
      page: { size: 'B5', orientation: 'portrait' },
    });
    expect(result.success).toBe(false);
  });

  it('should reject theme with invalid orientation', () => {
    const result = themeSchema.safeParse({
      ...professionalTheme,
      page: { size: 'A4', orientation: 'diagonal' },
    });
    expect(result.success).toBe(false);
  });

  it('should reject theme with font weight outside 100-900', () => {
    const result = themeSchema.safeParse({
      ...professionalTheme,
      typography: {
        ...professionalTheme.typography,
        heading: { ...professionalTheme.typography.heading, fontWeight: 1000 },
      },
    });
    expect(result.success).toBe(false);
  });
});

describe('theme presets', () => {
  it.each(['professional', 'modern', 'minimal'] as const)(
    '%s preset should have all 6 heading levels with positive sizes',
    (name) => {
      const theme = themePresets[name];
      for (let i = 1; i <= 6; i++) {
        const key = `h${i}` as keyof typeof theme.typography.heading.fontSize;
        expect(theme.typography.heading.fontSize[key]).toBeGreaterThan(0);
      }
    }
  );

  it.each(['professional', 'modern', 'minimal'] as const)(
    '%s preset should have valid hex colors',
    (name) => {
      const theme = themePresets[name];
      const hexRegex = /^#[0-9a-fA-F]{6}$/;
      for (const [, value] of Object.entries(theme.colors)) {
        expect(value).toMatch(hexRegex);
      }
    }
  );

  it.each(['professional', 'modern', 'minimal'] as const)(
    '%s preset heading font sizes should decrease from h1 to h6',
    (name) => {
      const sizes = themePresets[name].typography.heading.fontSize;
      expect(sizes.h1).toBeGreaterThan(sizes.h2);
      expect(sizes.h2).toBeGreaterThan(sizes.h3);
      expect(sizes.h3).toBeGreaterThan(sizes.h4);
      expect(sizes.h4).toBeGreaterThan(sizes.h5);
      expect(sizes.h5).toBeGreaterThan(sizes.h6);
    }
  );

  it.each(['professional', 'modern', 'minimal'] as const)(
    '%s preset should have positive page margins',
    (name) => {
      const margins = themePresets[name].spacing.page;
      expect(margins.marginTop).toBeGreaterThan(0);
      expect(margins.marginRight).toBeGreaterThan(0);
      expect(margins.marginBottom).toBeGreaterThan(0);
      expect(margins.marginLeft).toBeGreaterThan(0);
    }
  );

  it('professional theme should use Times-Roman for headings', () => {
    expect(professionalTheme.typography.heading.fontFamily).toBe('Times-Roman');
  });

  it('modern theme should use Helvetica for headings', () => {
    expect(modernTheme.typography.heading.fontFamily).toBe('Helvetica');
  });

  it('minimal theme should use Courier for headings', () => {
    expect(minimalTheme.typography.heading.fontFamily).toBe('Courier');
  });

  it('each preset should have a unique name', () => {
    const names = Object.values(themePresets).map((t) => t.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it('minimal theme should have wider margins than professional', () => {
    expect(minimalTheme.spacing.page.marginTop).toBeGreaterThan(
      professionalTheme.spacing.page.marginTop
    );
  });

  it('modern theme should have tighter margins than professional', () => {
    expect(modernTheme.spacing.page.marginTop).toBeLessThan(
      professionalTheme.spacing.page.marginTop
    );
  });
});
