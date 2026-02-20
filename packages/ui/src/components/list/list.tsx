import type { PdfxTheme } from '@pdfx/shared';
import { Text as PDFText, StyleSheet, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import type React from 'react';
import { theme as defaultTheme } from '../../lib/pdfx-theme';

export type ListVariant =
  | 'bullet'
  | 'numbered'
  | 'checklist'
  | 'icon'
  | 'multi-level'
  | 'descriptive';

export interface ListItem {
  /** Primary text / title of the item. */
  text: string;
  /** Optional description shown below the title (used by descriptive variant). */
  description?: string;
  /** Optional checked state (used by checklist variant). */
  checked?: boolean;
  /** Optional nested children (used by multi-level variant). */
  children?: ListItem[];
}

export interface PdfListProps {
  /** Array of list items. */
  items: ListItem[];
  /** Visual style of the list. @default 'bullet' */
  variant?: ListVariant;
  /** Spacing between list items. @default 'sm' */
  gap?: 'xs' | 'sm' | 'md';
  /** Custom style override applied to the outer container. */
  style?: Style;
  /** Indent level for nested rendering (internal use). */
  _level?: number;
}

// ─── Style cache ──────────────────────────────────────────────────────────────

let cachedTheme: PdfxTheme | null = null;
let cachedStyles: ReturnType<typeof createListStyles> | null = null;

function getStyles(t: PdfxTheme) {
  if (cachedTheme !== t || !cachedStyles) {
    cachedStyles = createListStyles(t);
    cachedTheme = t;
  }
  return cachedStyles;
}

function createListStyles(t: PdfxTheme) {
  const { spacing, fontWeights, typography } = t.primitives;

  return StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      marginBottom: t.spacing.componentGap,
    },
    itemRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    itemRowGapXs: { marginBottom: spacing[1] },
    itemRowGapSm: { marginBottom: spacing[2] },
    itemRowGapMd: { marginBottom: spacing[3] },
    markerBullet: {
      width: spacing[3],
      marginTop: 2,
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.typography.body.fontSize,
      color: t.colors.primary,
    },
    markerBulletSub: {
      width: spacing[3],
      marginTop: 2,
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.typography.body.fontSize,
      color: t.colors.mutedForeground,
    },
    markerNumber: {
      width: spacing[4],
      marginTop: 0,
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.typography.body.fontSize,
      color: t.colors.primary,
      fontWeight: fontWeights.semibold,
    },
    checkBox: {
      width: spacing[4],
      height: spacing[4],
      borderWidth: 1,
      borderColor: t.colors.border,
      borderStyle: 'solid',
      borderRadius: 2,
      marginTop: 1,
      marginRight: spacing[2],
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: t.colors.background,
    },
    checkBoxChecked: {
      backgroundColor: t.colors.success,
      borderColor: t.colors.success,
    },
    checkMark: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: 8,
      color: t.colors.background,
      fontWeight: fontWeights.bold,
    },
    iconBox: {
      width: spacing[4],
      height: spacing[4],
      borderRadius: 2,
      backgroundColor: t.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 1,
      marginRight: spacing[2],
    },
    iconMark: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: 8,
      color: t.colors.primaryForeground,
      fontWeight: fontWeights.bold,
    },
    itemText: {
      flex: 1,
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.typography.body.fontSize,
      lineHeight: t.typography.body.lineHeight,
      color: t.colors.foreground,
    },
    itemTextBold: {
      fontWeight: fontWeights.semibold,
    },
    descriptiveTitle: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.typography.body.fontSize,
      lineHeight: t.typography.body.lineHeight,
      color: t.colors.foreground,
      fontWeight: fontWeights.semibold,
    },
    descriptiveDesc: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: typography.sm,
      lineHeight: t.typography.body.lineHeight,
      color: t.colors.mutedForeground,
      marginTop: 1,
    },
    descriptiveAccent: {
      width: spacing[1],
      borderLeftWidth: spacing[1],
      borderLeftColor: t.colors.primary,
      borderLeftStyle: 'solid',
      marginRight: spacing[3],
    },
    descriptiveContent: {
      flex: 1,
    },
    childrenContainer: {
      marginLeft: spacing[4],
      marginTop: spacing[1],
    },
  });
}

// ─── Gap helper ──────────────────────────────────────────────────────────────

function getGapStyle(gap: 'xs' | 'sm' | 'md', styles: ReturnType<typeof createListStyles>): Style {
  if (gap === 'xs') return styles.itemRowGapXs;
  if (gap === 'md') return styles.itemRowGapMd;
  return styles.itemRowGapSm;
}

// ─── Render helpers (plain functions, not React components) ───────────────────

function renderItem(
  item: ListItem,
  index: number,
  total: number,
  variant: ListVariant,
  gap: 'xs' | 'sm' | 'md',
  styles: ReturnType<typeof createListStyles>,
  level: number
): React.ReactElement | null {
  const gapStyle = getGapStyle(gap, styles);
  const isLast = index === total - 1;
  const rowStyles: Style[] = [styles.itemRow];
  if (!isLast) rowStyles.push(gapStyle);

  if (variant === 'bullet') {
    const marker = level === 0 ? '\u2022' : '\u25E6';
    const markerStyle = level === 0 ? styles.markerBullet : styles.markerBulletSub;
    return (
      <View key={index}>
        <View style={rowStyles}>
          <PDFText style={markerStyle}>{marker} </PDFText>
          <View style={{ flex: 1 }}>
            <PDFText style={styles.itemText}>{item.text}</PDFText>
          </View>
        </View>
        {item.children && item.children.length > 0
          ? renderItemList(item.children, variant, gap, styles, level + 1)
          : null}
      </View>
    );
  }

  if (variant === 'numbered') {
    return (
      <View key={index} style={rowStyles}>
        <PDFText style={styles.markerNumber}>{index + 1}. </PDFText>
        <PDFText style={styles.itemText}>{item.text}</PDFText>
      </View>
    );
  }

  if (variant === 'checklist') {
    const isChecked = item.checked ?? true;
    return (
      <View key={index} style={rowStyles}>
        <View style={[styles.checkBox, isChecked ? styles.checkBoxChecked : {}]}>
          {isChecked ? <PDFText style={styles.checkMark}>✓</PDFText> : null}
        </View>
        <PDFText style={styles.itemText}>{item.text}</PDFText>
      </View>
    );
  }

  if (variant === 'icon') {
    return (
      <View key={index} style={rowStyles}>
        <View style={styles.iconBox}>
          <PDFText style={styles.iconMark}>★</PDFText>
        </View>
        <PDFText style={styles.itemText}>{item.text}</PDFText>
      </View>
    );
  }

  if (variant === 'multi-level') {
    return (
      <View key={index}>
        <View style={rowStyles}>
          <PDFText style={level === 0 ? styles.markerBullet : styles.markerBulletSub}>
            {level === 0 ? '\u2022' : '\u25E6'}{' '}
          </PDFText>
          <PDFText style={[styles.itemText, level === 0 ? styles.itemTextBold : {}]}>
            {item.text}
          </PDFText>
        </View>
        {item.children && item.children.length > 0
          ? renderItemList(item.children, variant, gap, styles, level + 1)
          : null}
      </View>
    );
  }

  if (variant === 'descriptive') {
    return (
      <View key={index} style={rowStyles}>
        <View style={styles.descriptiveAccent} />
        <View style={styles.descriptiveContent}>
          <PDFText style={styles.descriptiveTitle}>{item.text}</PDFText>
          {item.description ? (
            <PDFText style={styles.descriptiveDesc}>{item.description}</PDFText>
          ) : null}
        </View>
      </View>
    );
  }

  return null;
}

function renderItemList(
  items: ListItem[],
  variant: ListVariant,
  gap: 'xs' | 'sm' | 'md',
  styles: ReturnType<typeof createListStyles>,
  level: number
): React.ReactElement {
  const containerStyles: Style[] = level > 0 ? [styles.childrenContainer] : [];
  return (
    <View style={containerStyles.length ? containerStyles : styles.childrenContainer}>
      {items.map((item, index) =>
        renderItem(item, index, items.length, variant, gap, styles, level)
      )}
    </View>
  );
}

// ─── PdfList ──────────────────────────────────────────────────────────────────

export function PdfList({
  items,
  variant = 'bullet',
  gap = 'sm',
  style,
  _level = 0,
}: PdfListProps) {
  const styles = getStyles(defaultTheme);

  const containerStyles: Style[] = [styles.container];
  if (_level > 0) containerStyles.push(styles.childrenContainer);
  const styleArray = style ? [...containerStyles, style] : containerStyles;

  return (
    <View style={styleArray}>
      {items.map((item, index) =>
        renderItem(item, index, items.length, variant, gap, styles, _level)
      )}
    </View>
  );
}
