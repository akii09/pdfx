import { Text as PDFText, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import type React from 'react';
import { usePdfxTheme, useSafeMemo } from '../../lib/pdfx-theme-context';
import { createListStyles } from './list.styles';
import type { ListItem, ListVariant, PdfListProps } from './list.types';

type Styles = ReturnType<typeof createListStyles>;
type GapProp = 'xs' | 'sm' | 'md';

function getGapStyle(gap: GapProp, styles: Styles): Style {
  if (gap === 'xs') return styles.itemRowGapXs;
  if (gap === 'md') return styles.itemRowGapMd;
  return styles.itemRowGapSm;
}

function buildRowStyles(
  index: number,
  total: number,
  gap: GapProp,
  styles: Styles,
  align: 'start' | 'center' = 'start'
): Style[] {
  const row: Style[] = [align === 'center' ? styles.itemRowCenter : styles.itemRow];
  if (index !== total - 1) row.push(getGapStyle(gap, styles));
  return row;
}

/** Bullet dot marker — solid filled for level 0, outline ring for nested levels. */
function dotMarker(level: number, styles: Styles): React.ReactElement {
  return level === 0 ? (
    <View style={styles.markerBulletWrap}>
      <View style={styles.markerBulletDot} />
    </View>
  ) : (
    <View style={styles.markerBulletSubWrap}>
      <View style={styles.markerBulletSubDot} />
    </View>
  );
}

function renderBulletItem(
  item: ListItem,
  index: number,
  total: number,
  gap: GapProp,
  styles: Styles,
  level: number
): React.ReactElement {
  return (
    <View key={index}>
      <View style={buildRowStyles(index, total, gap, styles)}>
        {dotMarker(level, styles)}
        <View style={{ flex: 1 }}>
          <PDFText style={styles.itemText}>{item.text}</PDFText>
        </View>
      </View>
      {item.children && item.children.length > 0
        ? renderItemList(item.children, 'bullet', gap, styles, level + 1)
        : null}
    </View>
  );
}

function renderNumberedItem(
  item: ListItem,
  index: number,
  total: number,
  gap: GapProp,
  styles: Styles
): React.ReactElement {
  return (
    <View key={index} style={buildRowStyles(index, total, gap, styles, 'center')}>
      <View style={styles.markerNumberBadge}>
        <PDFText style={styles.markerNumberText}>{`${index + 1}`}</PDFText>
      </View>
      <PDFText style={styles.itemText}>{item.text}</PDFText>
    </View>
  );
}

function renderChecklistItem(
  item: ListItem,
  index: number,
  total: number,
  gap: GapProp,
  styles: Styles
): React.ReactElement {
  const isChecked = item.checked ?? true;
  return (
    <View key={index} style={buildRowStyles(index, total, gap, styles, 'center')}>
      <View style={[styles.checkBox, isChecked ? styles.checkBoxChecked : {}]}>
        {isChecked ? <PDFText style={styles.checkMark}>✓</PDFText> : null}
      </View>
      <PDFText style={styles.itemText}>{item.text}</PDFText>
    </View>
  );
}

function renderIconItem(
  item: ListItem,
  index: number,
  total: number,
  gap: GapProp,
  styles: Styles
): React.ReactElement {
  return (
    <View key={index} style={buildRowStyles(index, total, gap, styles, 'center')}>
      <View style={styles.iconBox}>
        <PDFText style={styles.iconMark}>★</PDFText>
      </View>
      <PDFText style={styles.itemText}>{item.text}</PDFText>
    </View>
  );
}

function renderMultiLevelItem(
  item: ListItem,
  index: number,
  total: number,
  gap: GapProp,
  styles: Styles,
  level: number
): React.ReactElement {
  return (
    <View key={index}>
      <View style={buildRowStyles(index, total, gap, styles)}>
        {dotMarker(level, styles)}
        <PDFText
          style={[
            level === 0 ? styles.itemText : styles.itemTextSub,
            level === 0 ? styles.itemTextBold : {},
          ]}
        >
          {item.text}
        </PDFText>
      </View>
      {item.children && item.children.length > 0
        ? renderItemList(item.children, 'multi-level', gap, styles, level + 1)
        : null}
    </View>
  );
}

function renderDescriptiveItem(
  item: ListItem,
  index: number,
  total: number,
  gap: GapProp,
  styles: Styles
): React.ReactElement {
  return (
    <View key={index} style={buildRowStyles(index, total, gap, styles)}>
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

function renderItem(
  item: ListItem,
  index: number,
  total: number,
  variant: ListVariant,
  gap: GapProp,
  styles: Styles,
  level: number
): React.ReactElement | null {
  switch (variant) {
    case 'bullet':
      return renderBulletItem(item, index, total, gap, styles, level);
    case 'numbered':
      return renderNumberedItem(item, index, total, gap, styles);
    case 'checklist':
      return renderChecklistItem(item, index, total, gap, styles);
    case 'icon':
      return renderIconItem(item, index, total, gap, styles);
    case 'multi-level':
      return renderMultiLevelItem(item, index, total, gap, styles, level);
    case 'descriptive':
      return renderDescriptiveItem(item, index, total, gap, styles);
  }
}

function renderItemList(
  items: ListItem[],
  variant: ListVariant,
  gap: GapProp,
  styles: Styles,
  level: number
): React.ReactElement {
  return (
    <View style={level > 0 ? styles.childrenContainer : undefined}>
      {items.map((item, index) =>
        renderItem(item, index, items.length, variant, gap, styles, level)
      )}
    </View>
  );
}

export function PdfList({
  items,
  variant = 'bullet',
  gap = 'sm',
  style,
  noWrap = false,
  _level = 0,
}: PdfListProps) {
  const theme = usePdfxTheme();
  const styles = useSafeMemo(() => createListStyles(theme), [theme]);

  const containerStyles: Style[] = [styles.container];
  if (_level > 0) containerStyles.push(styles.childrenContainer);
  const styleArray = style ? [...containerStyles, style] : containerStyles;

  return (
    <View wrap={!noWrap} style={styleArray}>
      {items.map((item, index) =>
        renderItem(item, index, items.length, variant, gap, styles, _level)
      )}
    </View>
  );
}
