import { Text as PDFText, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import type React from 'react';
import { usePdfxTheme, useSafeMemo } from '../../lib/pdfx-theme-context';
import { createListStyles } from './list.styles';
import type { ListItem, ListVariant, PdfListProps } from './list.types';

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
  const theme = usePdfxTheme();
  const styles = useSafeMemo(() => createListStyles(theme), [theme]);

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
