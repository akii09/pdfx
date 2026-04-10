import{c as w,j as h}from"./index-qneBZpLb.js";import{j as t}from"./vendor-react-pdf-D5yotT0u.js";import{r as x}from"./vendor-router-CswRncel.js";import{C as F}from"./code-block-DgotPMTm.js";/**
 * @license lucide-react v0.564.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],Pe=w("chevron-right",D);/**
 * @license lucide-react v0.564.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],Fe=w("eye",k),V="https://pdfx.akashpise.dev/schema/registry-item.json",W="key-value",B="registry:ui",R="KeyValue",M="Label-value pair display with horizontal/vertical layout and dividers",L=[{path:"components/pdfx/key-value/pdfx-key-value.tsx",content:`import { Text as PDFText, StyleSheet, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { usePdfxTheme, useSafeMemo } from '../lib/pdfx-theme-context';
type PdfxTheme = ReturnType<typeof usePdfxTheme>;

export type KeyValueDirection = 'horizontal' | 'vertical';
export type KeyValueSize = 'sm' | 'md' | 'lg';

/**
 * A single key-value row with optional per-item color and style overrides.
 * Props - \`key\` | \`value\` | \`valueColor\` | \`valueStyle\` | \`keyStyle\`
 * @see {@link KeyValueEntry}
 */
export interface KeyValueEntry {
  key: string;
  value: string;
  valueColor?: string;
  valueStyle?: Style;
  keyStyle?: Style;
}

/**
 * List of key-value pairs with layout and style options.
 * Props - \`items\` | \`direction\` | \`divided\` | \`size\` | \`labelFlex\` | \`labelColor\` | \`valueColor\` | \`boldValue\` | \`noWrap\` | \`dividerColor\` | \`dividerThickness\` | \`dividerMargin\` | \`style\`
 * @see {@link KeyValueProps}
 */
export interface KeyValueProps {
  /** Custom styles to merge with component defaults */
  style?: Style;
  items: KeyValueEntry[];
  /**
   * @default 'horizontal'
   */
  direction?: KeyValueDirection;
  /**
   * @default false
   */
  divided?: boolean;
  /**
   * @default 'md'
   */
  size?: KeyValueSize;
  /**
   * @default 1
   */
  labelFlex?: number;
  labelColor?: string;
  valueColor?: string;
  /**
   * @default false
   */
  boldValue?: boolean;
  /**
   * @default false
   */
  noWrap?: boolean;
  dividerColor?: string;
  dividerThickness?: number;
  dividerMargin?: number;
}

const THEME_COLOR_KEYS = ['foreground','muted','mutedForeground','primary','primaryForeground','accent','destructive','success','warning','info'] as const;
function resolveColor(value: string, colors: Record<string, string>): string {
  return THEME_COLOR_KEYS.includes(value as (typeof THEME_COLOR_KEYS)[number]) ? colors[value] : value;
}
function createKeyValueStyles(t: PdfxTheme) {
  const { spacing, fontWeights } = t.primitives;
  const c = t.colors;
  const { body } = t.typography;
  const keyBase = {
    fontFamily: body.fontFamily,
    color: c.mutedForeground,
    fontWeight: fontWeights.medium,
  };
  const valueBase = {
    fontFamily: body.fontFamily,
    color: c.foreground,
    fontWeight: fontWeights.regular,
  };
  return StyleSheet.create({
    container: { flexDirection: 'column' },
    rowHorizontal: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: spacing[1] },
    rowVertical: { flexDirection: 'column', marginBottom: t.spacing.paragraphGap },
    divider: {
      borderBottomWidth: spacing[0.5],
      borderBottomColor: c.border,
      borderBottomStyle: 'solid',
    },
    keySm: { ...keyBase, fontSize: t.primitives.typography.xs },
    keyMd: { ...keyBase, fontSize: body.fontSize },
    keyLg: { ...keyBase, fontSize: t.primitives.typography.base },
    valueSm: { ...valueBase, fontSize: t.primitives.typography.xs },
    valueMd: { ...valueBase, fontSize: body.fontSize },
    valueLg: { ...valueBase, fontSize: t.primitives.typography.base },
    valueBold: { fontWeight: fontWeights.bold },
  });
}

export function KeyValue({
  items,
  direction = 'horizontal',
  divided = false,
  size = 'md',
  labelFlex = 1,
  labelColor,
  valueColor,
  boldValue = false,
  noWrap = false,
  dividerColor,
  dividerThickness,
  dividerMargin,
  style,
}: KeyValueProps) {
  const theme = usePdfxTheme();
  const styles = useSafeMemo(() => createKeyValueStyles(theme), [theme]);
  const keyStyleMap = { sm: styles.keySm, md: styles.keyMd, lg: styles.keyLg } as Record<
    KeyValueSize,
    Style
  >;
  const valueStyleMap = { sm: styles.valueSm, md: styles.valueMd, lg: styles.valueLg } as Record<
    KeyValueSize,
    Style
  >;
  const containerStyles: Style[] = [styles.container];
  if (style) containerStyles.push(...[style].flat());

  return (
    <View wrap={!noWrap} style={containerStyles}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const keyStyles: Style[] = [keyStyleMap[size]];
        if (labelColor) keyStyles.push({ color: resolveColor(labelColor, theme.colors) });
        if (item.keyStyle) keyStyles.push(item.keyStyle);
        const valStyles: Style[] = [valueStyleMap[size]];
        if (boldValue) valStyles.push(styles.valueBold);
        const resolvedValueColor = item.valueColor ?? valueColor;
        if (resolvedValueColor)
          valStyles.push({ color: resolveColor(resolvedValueColor, theme.colors) });
        if (item.valueStyle) valStyles.push(item.valueStyle);

        if (direction === 'horizontal') {
          const rowStyles: Style[] = [styles.rowHorizontal];
          if (divided && !isLast) {
            const dividerStyle: Style = {};
            if (dividerColor)
              dividerStyle.borderBottomColor = resolveColor(dividerColor, theme.colors);
            if (dividerThickness) dividerStyle.borderBottomWidth = dividerThickness;
            if (dividerMargin) dividerStyle.marginBottom = dividerMargin;
            rowStyles.push({ ...styles.divider, ...dividerStyle });
          }
          return (
            <View key={item.key} style={rowStyles}>
              <PDFText style={[...keyStyles, { flex: labelFlex }]}>{item.key}</PDFText>
              <PDFText style={[...valStyles, { flex: 1, textAlign: 'right' }]}>
                {item.value}
              </PDFText>
            </View>
          );
        }

        const rowStyles: Style[] = [styles.rowVertical];
        if (divided && !isLast) rowStyles.push(styles.divider);
        return (
          <View key={item.key} style={rowStyles}>
            <PDFText style={keyStyles}>{item.key}</PDFText>
            <PDFText style={valStyles}>{item.value}</PDFText>
          </View>
        );
      })}
    </View>
  );
}
`,type:"registry:component"}],E=["@react-pdf/renderer"],z=["theme"],De={$schema:V,name:W,type:B,title:R,description:M,files:L,dependencies:E,registryDependencies:z},$="https://pdfx.akashpise.dev/schema/registry-item.json",j="page-footer",O="registry:ui",H="PageFooter",N="Fixed or inline page footer with 6 layout variants and contact info support",_=JSON.parse("[{\"path\":\"components/pdfx/page-footer/pdfx-page-footer.tsx\",\"content\":\"import { Text as PDFText, StyleSheet, View } from '@react-pdf/renderer';\\nimport type { Style } from '@react-pdf/types';\\nimport { usePdfxTheme, useSafeMemo } from '../lib/pdfx-theme-context';\\ntype PdfxTheme = ReturnType<typeof usePdfxTheme>;\\n\\nexport type PageFooterVariant =\\n  | 'simple'\\n  | 'centered'\\n  | 'branded'\\n  | 'minimal'\\n  | 'three-column'\\n  | 'detailed';\\n\\n/**\\n * Footer row with layout variants, optional sticky or fixed positioning, and contact info support.\\n * Props - `leftText` | `rightText` | `centerText` | `variant` | `background` | `textColor` | `marginTop` | `address` | `phone` | `email` | `website` | `fixed` | `sticky` | `pagePadding` | `noWrap` | `style`\\n * @see {@link PageFooterProps}\\n */\\nexport interface PageFooterProps {\\n  /** Custom styles to merge with component defaults */\\n  style?: Style;\\n  leftText?: string;\\n  rightText?: string;\\n  centerText?: string;\\n  /**\\n   * @default 'simple'\\n   */\\n  variant?: PageFooterVariant;\\n  background?: string;\\n  textColor?: string;\\n  marginTop?: number;\\n  address?: string;\\n  phone?: string;\\n  email?: string;\\n  website?: string;\\n  /**\\n   * @default false\\n   */\\n  fixed?: boolean;\\n  /**\\n   * @default false\\n   */\\n  sticky?: boolean;\\n  /**\\n   * @default 0\\n   */\\n  pagePadding?: number;\\n  /**\\n   * @default true\\n   */\\n  noWrap?: boolean;\\n}\\n\\nconst THEME_COLOR_KEYS = ['foreground','muted','mutedForeground','primary','primaryForeground','accent','destructive','success','warning','info'] as const;\\nfunction resolveColor(value: string, colors: Record<string, string>): string {\\n  return THEME_COLOR_KEYS.includes(value as (typeof THEME_COLOR_KEYS)[number]) ? colors[value] : value;\\n}\\nfunction createPageFooterStyles(t: PdfxTheme) {\\n  const { spacing, fontWeights } = t.primitives;\\n  const c = t.colors;\\n  const { body } = t.typography;\\n\\n  const textBase = {\\n    fontFamily: body.fontFamily,\\n    fontSize: t.primitives.typography.xs,\\n    color: c.mutedForeground,\\n    lineHeight: body.lineHeight,\\n  };\\n\\n  return StyleSheet.create({\\n    simpleContainer: {\\n      display: 'flex',\\n      flexDirection: 'row',\\n      alignItems: 'center',\\n      justifyContent: 'space-between',\\n      paddingTop: spacing[3],\\n      borderTopWidth: spacing[0.5],\\n      borderTopColor: c.border,\\n      borderTopStyle: 'solid',\\n    },\\n\\n    centeredContainer: {\\n      display: 'flex',\\n      flexDirection: 'column',\\n      alignItems: 'center',\\n      paddingTop: spacing[3],\\n      borderTopWidth: spacing[0.5],\\n      borderTopColor: c.border,\\n      borderTopStyle: 'solid',\\n    },\\n\\n    minimalContainer: {\\n      display: 'flex',\\n      flexDirection: 'row',\\n      alignItems: 'center',\\n      justifyContent: 'space-between',\\n      paddingTop: spacing[1],\\n      paddingBottom: spacing[1],\\n    },\\n\\n    brandedContainer: {\\n      display: 'flex',\\n      flexDirection: 'row',\\n      alignItems: 'center',\\n      justifyContent: 'space-between',\\n      backgroundColor: c.primary,\\n      paddingHorizontal: spacing[4],\\n      paddingVertical: spacing[3],\\n    },\\n\\n    textLeft: {\\n      ...textBase,\\n      flex: 1,\\n    },\\n    textCenter: {\\n      ...textBase,\\n      textAlign: 'center',\\n      flex: 1,\\n    },\\n    textRight: {\\n      ...textBase,\\n      textAlign: 'right',\\n    },\\n    textCenteredVariant: {\\n      ...textBase,\\n      textAlign: 'center',\\n      marginBottom: spacing[1],\\n    },\\n    textBranded: {\\n      ...textBase,\\n      color: c.primaryForeground,\\n      fontWeight: fontWeights.medium,\\n    },\\n    textBrandedRight: {\\n      ...textBase,\\n      color: c.primaryForeground,\\n      textAlign: 'right',\\n    },\\n\\n    threeColumnContainer: {\\n      display: 'flex',\\n      flexDirection: 'row',\\n      alignItems: 'flex-start',\\n      justifyContent: 'space-between',\\n      paddingTop: spacing[3],\\n      borderTopWidth: spacing[0.5],\\n      borderTopColor: c.border,\\n      borderTopStyle: 'solid',\\n    },\\n    threeColumnLeft: {\\n      display: 'flex',\\n      flexDirection: 'column',\\n      flex: 1,\\n    },\\n    threeColumnCenter: {\\n      display: 'flex',\\n      flexDirection: 'column',\\n      alignItems: 'center',\\n      flex: 1,\\n    },\\n    threeColumnRight: {\\n      display: 'flex',\\n      flexDirection: 'column',\\n      alignItems: 'flex-end',\\n      flex: 1,\\n    },\\n    companyName: {\\n      ...textBase,\\n      fontWeight: fontWeights.medium,\\n      color: c.foreground,\\n    },\\n    contactInfoCenter: {\\n      ...textBase,\\n      textAlign: 'center',\\n      fontSize: t.primitives.typography.xs - 1,\\n      marginTop: spacing[0.5],\\n    },\\n\\n    detailedContainer: {\\n      display: 'flex',\\n      flexDirection: 'column',\\n      paddingTop: spacing[3],\\n      borderTopWidth: spacing[1],\\n      borderTopColor: c.border,\\n      borderTopStyle: 'solid',\\n    },\\n    detailedTopRow: {\\n      display: 'flex',\\n      flexDirection: 'row',\\n      alignItems: 'flex-start',\\n      justifyContent: 'space-between',\\n      marginBottom: spacing[2],\\n    },\\n    detailedLeft: {\\n      display: 'flex',\\n      flexDirection: 'column',\\n      flex: 1,\\n    },\\n    detailedRight: {\\n      display: 'flex',\\n      flexDirection: 'column',\\n      alignItems: 'flex-end',\\n    },\\n    companyBold: {\\n      ...textBase,\\n      fontWeight: fontWeights.bold,\\n      color: c.foreground,\\n    },\\n    detailedPageNumber: {\\n      ...textBase,\\n      textAlign: 'center',\\n      paddingTop: spacing[2],\\n      borderTopWidth: spacing[0.5],\\n      borderTopColor: c.border,\\n      borderTopStyle: 'solid',\\n    },\\n  });\\n}\\n\\nexport function PageFooter({\\n  leftText,\\n  rightText,\\n  centerText,\\n  variant = 'simple',\\n  background,\\n  textColor,\\n  marginTop,\\n  address,\\n  phone,\\n  email,\\n  website,\\n  fixed = false,\\n  sticky = false,\\n  pagePadding = 0,\\n  noWrap = true,\\n  style,\\n}: PageFooterProps) {\\n  const theme = usePdfxTheme();\\n  const styles = useSafeMemo(() => createPageFooterStyles(theme), [theme]);\\n  // sticky implies fixed; marginTop is irrelevant with absolute positioning\\n  const isFixed = fixed || sticky;\\n  const mt = sticky ? 0 : (marginTop ?? theme.spacing.sectionGap);\\n  const resolvedTextColor = textColor ? resolveColor(textColor, theme.colors) : undefined;\\n  const stickyStyle: Style = sticky\\n    ? { position: 'absolute', bottom: pagePadding, left: pagePadding, right: pagePadding }\\n    : {};\\n\\n  function applyOverrides(base: Style[]): Style[] {\\n    if (background) base.push({ backgroundColor: resolveColor(background, theme.colors) });\\n    if (style) base.push(style);\\n    if (sticky) base.push(stickyStyle);\\n    return base;\\n  }\\n\\n  if (variant === 'branded') {\\n    const containerStyles = applyOverrides([styles.brandedContainer, { marginTop: mt }]);\\n\\n    const lStyle: Style[] = [styles.textBranded];\\n    const rStyle: Style[] = [styles.textBrandedRight];\\n    if (resolvedTextColor) {\\n      lStyle.push({ color: resolvedTextColor });\\n      rStyle.push({ color: resolvedTextColor });\\n    }\\n\\n    return (\\n      <View wrap={!noWrap} fixed={isFixed} style={containerStyles}>\\n        {leftText && <PDFText style={lStyle}>{leftText}</PDFText>}\\n        {rightText && <PDFText style={rStyle}>{rightText}</PDFText>}\\n      </View>\\n    );\\n  }\\n\\n  if (variant === 'centered') {\\n    const containerStyles = applyOverrides([styles.centeredContainer, { marginTop: mt }]);\\n\\n    const tStyle: Style[] = [styles.textCenteredVariant];\\n    if (resolvedTextColor) tStyle.push({ color: resolvedTextColor });\\n\\n    return (\\n      <View wrap={!noWrap} fixed={isFixed} style={containerStyles}>\\n        {leftText && <PDFText style={tStyle}>{leftText}</PDFText>}\\n        {rightText && <PDFText style={tStyle}>{rightText}</PDFText>}\\n      </View>\\n    );\\n  }\\n\\n  if (variant === 'three-column') {\\n    const containerStyles = applyOverrides([styles.threeColumnContainer, { marginTop: mt }]);\\n\\n    const leftStyle: Style[] = [styles.companyName];\\n    const centerStyle: Style[] = [styles.contactInfoCenter];\\n    const rightStyle: Style[] = [styles.textRight];\\n    if (resolvedTextColor) {\\n      leftStyle.push({ color: resolvedTextColor });\\n      centerStyle.push({ color: resolvedTextColor });\\n      rightStyle.push({ color: resolvedTextColor });\\n    }\\n\\n    return (\\n      <View wrap={!noWrap} fixed={isFixed} style={containerStyles}>\\n        <View style={styles.threeColumnLeft}>\\n          {leftText && <PDFText style={leftStyle}>{leftText}</PDFText>}\\n          {address && <PDFText style={styles.textLeft}>{address}</PDFText>}\\n        </View>\\n        <View style={styles.threeColumnCenter}>\\n          {phone && <PDFText style={centerStyle}>{phone}</PDFText>}\\n          {email && <PDFText style={centerStyle}>{email}</PDFText>}\\n          {website && <PDFText style={centerStyle}>{website}</PDFText>}\\n        </View>\\n        <View style={styles.threeColumnRight}>\\n          {rightText && <PDFText style={rightStyle}>{rightText}</PDFText>}\\n        </View>\\n      </View>\\n    );\\n  }\\n\\n  if (variant === 'detailed') {\\n    const containerStyles = applyOverrides([styles.detailedContainer, { marginTop: mt }]);\\n\\n    const companyStyle: Style[] = [styles.companyBold];\\n    const addrStyle: Style[] = [styles.textLeft];\\n    const contactStyle: Style[] = [styles.textRight];\\n    const pageNumStyle: Style[] = [styles.detailedPageNumber];\\n    if (resolvedTextColor) {\\n      companyStyle.push({ color: resolvedTextColor });\\n      addrStyle.push({ color: resolvedTextColor });\\n      contactStyle.push({ color: resolvedTextColor });\\n      pageNumStyle.push({ color: resolvedTextColor });\\n    }\\n\\n    return (\\n      <View wrap={!noWrap} fixed={isFixed} style={containerStyles}>\\n        <View style={styles.detailedTopRow}>\\n          <View style={styles.detailedLeft}>\\n            {leftText && <PDFText style={companyStyle}>{leftText}</PDFText>}\\n            {address && <PDFText style={addrStyle}>{address}</PDFText>}\\n          </View>\\n          <View style={styles.detailedRight}>\\n            {phone && <PDFText style={contactStyle}>{`Phone: ${phone}`}</PDFText>}\\n            {email && <PDFText style={contactStyle}>{`Email: ${email}`}</PDFText>}\\n            {website && <PDFText style={contactStyle}>{`Web: ${website}`}</PDFText>}\\n          </View>\\n        </View>\\n        {rightText && <PDFText style={pageNumStyle}>{rightText}</PDFText>}\\n      </View>\\n    );\\n  }\\n\\n  if (variant === 'minimal') {\\n    const containerStyles = applyOverrides([styles.minimalContainer, { marginTop: mt }]);\\n\\n    const lStyle: Style[] = [styles.textLeft];\\n    const rStyle: Style[] = [styles.textRight];\\n    if (resolvedTextColor) {\\n      lStyle.push({ color: resolvedTextColor });\\n      rStyle.push({ color: resolvedTextColor });\\n    }\\n\\n    return (\\n      <View wrap={!noWrap} fixed={isFixed} style={containerStyles}>\\n        {leftText && <PDFText style={lStyle}>{leftText}</PDFText>}\\n        {rightText && <PDFText style={rStyle}>{rightText}</PDFText>}\\n      </View>\\n    );\\n  }\\n\\n  const containerStyles = applyOverrides([styles.simpleContainer, { marginTop: mt }]);\\n\\n  const lStyle: Style[] = [styles.textLeft];\\n  const cStyle: Style[] = [styles.textCenter];\\n  const rStyle: Style[] = [styles.textRight];\\n  if (resolvedTextColor) {\\n    lStyle.push({ color: resolvedTextColor });\\n    cStyle.push({ color: resolvedTextColor });\\n    rStyle.push({ color: resolvedTextColor });\\n  }\\n\\n  return (\\n    <View wrap={!noWrap} fixed={isFixed} style={containerStyles}>\\n      {leftText && <PDFText style={lStyle}>{leftText}</PDFText>}\\n      {centerText && <PDFText style={cStyle}>{centerText}</PDFText>}\\n      {rightText && <PDFText style={rStyle}>{rightText}</PDFText>}\\n    </View>\\n  );\\n}\\n\",\"type\":\"registry:component\"}]"),I=["@react-pdf/renderer"],A=["theme"],ke={$schema:$,name:j,type:O,title:H,description:N,files:_,dependencies:I,registryDependencies:A},K="https://pdfx.akashpise.dev/schema/registry-item.json",Y="page-header",G="registry:ui",J="PageHeader",X="Fixed or inline page header with 7 layout variants including logo support",q=JSON.parse("[{\"path\":\"components/pdfx/page-header/pdfx-page-header.tsx\",\"content\":\"import { Text as PDFText, StyleSheet, View } from '@react-pdf/renderer';\\nimport type { Style } from '@react-pdf/types';\\nimport type { ReactNode } from 'react';\\nimport { usePdfxTheme, useSafeMemo } from '../lib/pdfx-theme-context';\\ntype PdfxTheme = ReturnType<typeof usePdfxTheme>;\\n\\nexport type PageHeaderVariant =\\n  | 'simple'\\n  | 'centered'\\n  | 'minimal'\\n  | 'branded'\\n  | 'logo-left'\\n  | 'logo-right'\\n  | 'two-column';\\n\\n/**\\n * Header row with layout variants, logo support, and optional fixed positioning.\\n * Props - `title` | `subtitle` | `rightText` | `rightSubText` | `variant` | `background` | `titleColor` | `marginBottom` | `address` | `phone` | `email` | `logo` | `fixed` | `noWrap` | `style`\\n * @see {@link PageHeaderProps}\\n */\\nexport interface PageHeaderProps {\\n  /** Custom styles to merge with component defaults */\\n  style?: Style;\\n  title: string;\\n  subtitle?: string;\\n  rightText?: string;\\n  rightSubText?: string;\\n  /**\\n   * @default 'simple'\\n   */\\n  variant?: PageHeaderVariant;\\n  background?: string;\\n  titleColor?: string;\\n  marginBottom?: number;\\n  address?: string;\\n  phone?: string;\\n  email?: string;\\n  logo?: ReactNode;\\n  /**\\n   * @default false\\n   */\\n  fixed?: boolean;\\n  /**\\n   * @default true\\n   */\\n  noWrap?: boolean;\\n}\\n\\nconst THEME_COLOR_KEYS = ['foreground','muted','mutedForeground','primary','primaryForeground','accent','destructive','success','warning','info'] as const;\\nfunction resolveColor(value: string, colors: Record<string, string>): string {\\n  return THEME_COLOR_KEYS.includes(value as (typeof THEME_COLOR_KEYS)[number]) ? colors[value] : value;\\n}\\nfunction createPageHeaderStyles(t: PdfxTheme) {\\n  const { spacing, borderRadius, fontWeights } = t.primitives;\\n  const c = t.colors;\\n  const { heading, body } = t.typography;\\n\\n  return StyleSheet.create({\\n    simpleContainer: {\\n      display: 'flex',\\n      flexDirection: 'row',\\n      alignItems: 'flex-start',\\n      justifyContent: 'space-between',\\n      paddingBottom: spacing[4],\\n      borderBottomWidth: spacing[0.5],\\n      borderBottomColor: c.border,\\n      borderBottomStyle: 'solid',\\n    },\\n    simpleLeft: {\\n      display: 'flex',\\n      flexDirection: 'column',\\n      flex: 1,\\n    },\\n    simpleRight: {\\n      display: 'flex',\\n      flexDirection: 'column',\\n      alignItems: 'flex-end',\\n    },\\n\\n    centeredContainer: {\\n      display: 'flex',\\n      flexDirection: 'column',\\n      alignItems: 'center',\\n      paddingBottom: spacing[4],\\n      borderBottomWidth: spacing[0.5],\\n      borderBottomColor: c.border,\\n      borderBottomStyle: 'solid',\\n    },\\n\\n    minimalContainer: {\\n      display: 'flex',\\n      flexDirection: 'row',\\n      alignItems: 'center',\\n      justifyContent: 'space-between',\\n      borderBottomWidth: spacing[1],\\n      borderBottomColor: c.primary,\\n      borderBottomStyle: 'solid',\\n      paddingBottom: spacing[3],\\n    },\\n    minimalLeft: {\\n      flex: 1,\\n    },\\n    minimalRight: {\\n      alignItems: 'flex-end',\\n    },\\n\\n    brandedContainer: {\\n      display: 'flex',\\n      flexDirection: 'column',\\n      alignItems: 'center',\\n      backgroundColor: c.primary,\\n      padding: spacing[6],\\n      borderRadius: borderRadius.sm,\\n    },\\n\\n    title: {\\n      fontFamily: heading.fontFamily,\\n      fontSize: heading.fontSize.h3,\\n      fontWeight: fontWeights.bold,\\n      color: c.foreground,\\n      lineHeight: heading.lineHeight,\\n      marginBottom: 0,\\n    },\\n    titleCentered: {\\n      textAlign: 'center',\\n    },\\n    titleBranded: {\\n      color: c.primaryForeground,\\n    },\\n    titleMinimal: {\\n      fontSize: heading.fontSize.h3,\\n      fontWeight: fontWeights.bold,\\n    },\\n\\n    subtitle: {\\n      fontFamily: body.fontFamily,\\n      fontSize: body.fontSize,\\n      color: c.mutedForeground,\\n      marginTop: spacing[1],\\n      lineHeight: body.lineHeight,\\n    },\\n    subtitleCentered: {\\n      textAlign: 'center',\\n    },\\n    subtitleBranded: {\\n      color: c.primaryForeground,\\n      marginTop: spacing[1],\\n    },\\n\\n    rightText: {\\n      fontFamily: body.fontFamily,\\n      fontSize: body.fontSize,\\n      color: c.foreground,\\n      fontWeight: fontWeights.medium,\\n      textAlign: 'right',\\n    },\\n    rightSubText: {\\n      fontFamily: body.fontFamily,\\n      fontSize: t.primitives.typography.xs,\\n      color: c.mutedForeground,\\n      textAlign: 'right',\\n      marginTop: spacing[1],\\n    },\\n\\n    logoLeftContainer: {\\n      display: 'flex',\\n      flexDirection: 'row',\\n      alignItems: 'center',\\n      paddingBottom: spacing[4],\\n      borderBottomWidth: spacing[0.5],\\n      borderBottomColor: c.border,\\n      borderBottomStyle: 'solid',\\n    },\\n    logoContainer: {\\n      marginRight: spacing[4],\\n      width: 48,\\n      height: 48,\\n    },\\n    logoContent: {\\n      flex: 1,\\n      display: 'flex',\\n      flexDirection: 'column',\\n    },\\n\\n    logoRightContainer: {\\n      display: 'flex',\\n      flexDirection: 'row',\\n      alignItems: 'center',\\n      justifyContent: 'space-between',\\n      paddingBottom: spacing[4],\\n      borderBottomWidth: spacing[0.5],\\n      borderBottomColor: c.border,\\n      borderBottomStyle: 'solid',\\n    },\\n    logoRightContent: {\\n      flex: 1,\\n      display: 'flex',\\n      flexDirection: 'column',\\n    },\\n    logoRightLogoContainer: {\\n      marginLeft: spacing[4],\\n      width: 48,\\n      height: 48,\\n    },\\n\\n    twoColumnContainer: {\\n      display: 'flex',\\n      flexDirection: 'row',\\n      alignItems: 'flex-start',\\n      justifyContent: 'space-between',\\n      paddingBottom: spacing[4],\\n      borderBottomWidth: spacing[0.5],\\n      borderBottomColor: c.border,\\n      borderBottomStyle: 'solid',\\n    },\\n    twoColumnLeft: {\\n      display: 'flex',\\n      flexDirection: 'column',\\n      flex: 1,\\n    },\\n    twoColumnRight: {\\n      display: 'flex',\\n      flexDirection: 'column',\\n      alignItems: 'flex-end',\\n    },\\n    contactInfo: {\\n      fontFamily: body.fontFamily,\\n      fontSize: t.primitives.typography.xs,\\n      color: c.mutedForeground,\\n      textAlign: 'right',\\n      marginTop: spacing[0.5],\\n    },\\n  });\\n}\\n\\nexport function PageHeader({\\n  title,\\n  subtitle,\\n  rightText,\\n  rightSubText,\\n  variant = 'simple',\\n  background,\\n  titleColor,\\n  marginBottom,\\n  logo,\\n  address,\\n  phone,\\n  email,\\n  fixed = false,\\n  noWrap = true,\\n  style,\\n}: PageHeaderProps) {\\n  const theme = usePdfxTheme();\\n  const styles = useSafeMemo(() => createPageHeaderStyles(theme), [theme]);\\n  const mb = marginBottom ?? theme.spacing.sectionGap;\\n\\n  if (variant === 'branded') {\\n    const containerStyles: Style[] = [styles.brandedContainer, { marginBottom: mb }];\\n    if (background) {\\n      containerStyles.push({ backgroundColor: resolveColor(background, theme.colors) });\\n    }\\n    if (style) containerStyles.push(style);\\n\\n    const titleStyles: Style[] = [styles.title, styles.titleBranded, styles.titleCentered];\\n    if (titleColor) titleStyles.push({ color: resolveColor(titleColor, theme.colors) });\\n\\n    return (\\n      <View wrap={!noWrap} fixed={fixed} style={containerStyles}>\\n        <PDFText style={titleStyles}>{title}</PDFText>\\n        {subtitle && (\\n          <PDFText style={[styles.subtitle, styles.subtitleBranded]}>{subtitle}</PDFText>\\n        )}\\n      </View>\\n    );\\n  }\\n\\n  if (variant === 'centered') {\\n    const containerStyles: Style[] = [styles.centeredContainer, { marginBottom: mb }];\\n    if (background) {\\n      containerStyles.push({ backgroundColor: resolveColor(background, theme.colors) });\\n    }\\n    if (style) containerStyles.push(style);\\n\\n    const titleStyles: Style[] = [styles.title, styles.titleCentered];\\n    if (titleColor) titleStyles.push({ color: resolveColor(titleColor, theme.colors) });\\n\\n    return (\\n      <View wrap={!noWrap} fixed={fixed} style={containerStyles}>\\n        <PDFText style={titleStyles}>{title}</PDFText>\\n        {subtitle && (\\n          <PDFText style={[styles.subtitle, styles.subtitleCentered]}>{subtitle}</PDFText>\\n        )}\\n      </View>\\n    );\\n  }\\n\\n  if (variant === 'logo-right') {\\n    const containerStyles: Style[] = [styles.logoRightContainer, { marginBottom: mb }];\\n    if (background) {\\n      containerStyles.push({ backgroundColor: resolveColor(background, theme.colors) });\\n    }\\n    if (style) containerStyles.push(style);\\n\\n    const titleStyles: Style[] = [styles.title];\\n    if (titleColor) titleStyles.push({ color: resolveColor(titleColor, theme.colors) });\\n\\n    return (\\n      <View wrap={!noWrap} fixed={fixed} style={containerStyles}>\\n        <View style={styles.logoRightContent}>\\n          <PDFText style={titleStyles}>{title}</PDFText>\\n          {subtitle && <PDFText style={styles.subtitle}>{subtitle}</PDFText>}\\n        </View>\\n        {logo && <View style={styles.logoRightLogoContainer}>{logo}</View>}\\n      </View>\\n    );\\n  }\\n\\n  if (variant === 'logo-left') {\\n    const containerStyles: Style[] = [styles.logoLeftContainer, { marginBottom: mb }];\\n    if (background) {\\n      containerStyles.push({ backgroundColor: resolveColor(background, theme.colors) });\\n    }\\n    if (style) containerStyles.push(style);\\n\\n    const titleStyles: Style[] = [styles.title];\\n    if (titleColor) titleStyles.push({ color: resolveColor(titleColor, theme.colors) });\\n\\n    return (\\n      <View wrap={!noWrap} fixed={fixed} style={containerStyles}>\\n        {logo && <View style={styles.logoContainer}>{logo}</View>}\\n        <View style={styles.logoContent}>\\n          <PDFText style={titleStyles}>{title}</PDFText>\\n          {subtitle && <PDFText style={styles.subtitle}>{subtitle}</PDFText>}\\n        </View>\\n        {(rightText || rightSubText) && (\\n          <View style={styles.simpleRight}>\\n            {rightText && <PDFText style={styles.rightText}>{rightText}</PDFText>}\\n            {rightSubText && <PDFText style={styles.rightSubText}>{rightSubText}</PDFText>}\\n          </View>\\n        )}\\n      </View>\\n    );\\n  }\\n\\n  if (variant === 'two-column') {\\n    const containerStyles: Style[] = [styles.twoColumnContainer, { marginBottom: mb }];\\n    if (background) {\\n      containerStyles.push({ backgroundColor: resolveColor(background, theme.colors) });\\n    }\\n    if (style) containerStyles.push(style);\\n\\n    const titleStyles: Style[] = [styles.title];\\n    if (titleColor) titleStyles.push({ color: resolveColor(titleColor, theme.colors) });\\n\\n    return (\\n      <View wrap={!noWrap} fixed={fixed} style={containerStyles}>\\n        <View style={styles.twoColumnLeft}>\\n          <PDFText style={titleStyles}>{title}</PDFText>\\n          {subtitle && <PDFText style={styles.subtitle}>{subtitle}</PDFText>}\\n        </View>\\n        {(address || phone || email) && (\\n          <View style={styles.twoColumnRight}>\\n            {address && <PDFText style={styles.contactInfo}>{address}</PDFText>}\\n            {phone && <PDFText style={styles.contactInfo}>{phone}</PDFText>}\\n            {email && <PDFText style={styles.contactInfo}>{email}</PDFText>}\\n          </View>\\n        )}\\n      </View>\\n    );\\n  }\\n\\n  if (variant === 'minimal') {\\n    const containerStyles: Style[] = [styles.minimalContainer, { marginBottom: mb }];\\n    if (background) {\\n      containerStyles.push({ backgroundColor: resolveColor(background, theme.colors) });\\n    }\\n    if (style) containerStyles.push(style);\\n\\n    const titleStyles: Style[] = [styles.title, styles.titleMinimal];\\n    if (titleColor) titleStyles.push({ color: resolveColor(titleColor, theme.colors) });\\n\\n    return (\\n      <View wrap={!noWrap} fixed={fixed} style={containerStyles}>\\n        <View style={styles.minimalLeft}>\\n          <PDFText style={titleStyles}>{title}</PDFText>\\n          {subtitle && <PDFText style={styles.subtitle}>{subtitle}</PDFText>}\\n        </View>\\n        {(rightText || rightSubText) && (\\n          <View style={styles.minimalRight}>\\n            {rightText && <PDFText style={styles.rightText}>{rightText}</PDFText>}\\n            {rightSubText && <PDFText style={styles.rightSubText}>{rightSubText}</PDFText>}\\n          </View>\\n        )}\\n      </View>\\n    );\\n  }\\n\\n  const containerStyles: Style[] = [styles.simpleContainer, { marginBottom: mb }];\\n  if (background) {\\n    containerStyles.push({ backgroundColor: resolveColor(background, theme.colors) });\\n  }\\n  if (style) containerStyles.push(style);\\n\\n  const titleStyles: Style[] = [styles.title];\\n  if (titleColor) titleStyles.push({ color: resolveColor(titleColor, theme.colors) });\\n\\n  return (\\n    <View wrap={!noWrap} fixed={fixed} style={containerStyles}>\\n      <View style={styles.simpleLeft}>\\n        <PDFText style={titleStyles}>{title}</PDFText>\\n        {subtitle && <PDFText style={styles.subtitle}>{subtitle}</PDFText>}\\n      </View>\\n      {(rightText || rightSubText) && (\\n        <View style={styles.simpleRight}>\\n          {rightText && <PDFText style={styles.rightText}>{rightText}</PDFText>}\\n          {rightSubText && <PDFText style={styles.rightSubText}>{rightSubText}</PDFText>}\\n        </View>\\n      )}\\n    </View>\\n  );\\n}\\n\",\"type\":\"registry:component\"}]"),Q=["@react-pdf/renderer"],U=["theme"],Ve={$schema:K,name:Y,type:G,title:J,description:X,files:q,dependencies:Q,registryDependencies:U},Z="https://pdfx.akashpise.dev/schema/registry-item.json",ee="section",te="registry:ui",ne="Section",oe="Logical section with theme-based spacing",re=[{path:"components/pdfx/section/pdfx-section.tsx",content:`import { StyleSheet, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { usePdfxTheme, useSafeMemo } from '../lib/pdfx-theme-context';
import type React from 'react';
type PdfxTheme = ReturnType<typeof usePdfxTheme>;

export type SectionSpacing = 'none' | 'sm' | 'md' | 'lg' | 'xl';
export type SectionPadding = 'none' | 'sm' | 'md' | 'lg';
export type SectionVariant = 'default' | 'callout' | 'highlight' | 'card';

/**
 * Layout container with spacing, padding, and visual style variants.
 * Props - \`spacing\` | \`padding\` | \`background\` | \`border\` | \`variant\` | \`accentColor\` | \`noWrap\` | \`children\` | \`style\`
 * @see {@link SectionProps}
 */
export interface SectionProps {
  /** Custom styles to merge with component defaults */
  style?: Style;
  /** Content to render */
  children: React.ReactNode;
  /**
   * @default 'md'
   */
  spacing?: SectionSpacing;
  padding?: SectionPadding;
  background?: string;
  /**
   * @default false
   */
  border?: boolean;
  /**
   * @default 'default'
   */
  variant?: SectionVariant;
  accentColor?: string;
  /**
   * @default false
   */
  noWrap?: boolean;
}

const THEME_COLOR_KEYS = ['foreground','muted','mutedForeground','primary','primaryForeground','accent','destructive','success','warning','info'] as const;
function resolveColor(value: string, colors: Record<string, string>): string {
  return THEME_COLOR_KEYS.includes(value as (typeof THEME_COLOR_KEYS)[number]) ? colors[value] : value;
}
function createSectionStyles(t: PdfxTheme) {
  const { spacing, borderRadius } = t.primitives;
  return StyleSheet.create({
    base: { flexDirection: 'column' },
    spacingNone: { marginVertical: spacing[0] },
    spacingSm: { marginVertical: spacing[4] },
    spacingMd: { marginVertical: t.spacing.sectionGap },
    spacingLg: { marginVertical: spacing[8] },
    spacingXl: { marginVertical: spacing[12] },
    paddingNone: { padding: spacing[0] },
    paddingSm: { padding: spacing[3] },
    paddingMd: { padding: spacing[4] },
    paddingLg: { padding: spacing[6] },
    border: {
      borderWidth: spacing[0.5],
      borderColor: t.colors.border,
      borderStyle: 'solid',
      borderRadius: borderRadius.md,
    },
    callout: {
      borderLeftWidth: spacing[1],
      borderLeftColor: t.colors.primary,
      borderLeftStyle: 'solid',
      paddingLeft: spacing[4],
      paddingVertical: spacing[2],
    },
    highlight: {
      backgroundColor: t.colors.muted,
      borderLeftWidth: spacing[1],
      borderLeftColor: t.colors.primary,
      borderLeftStyle: 'solid',
      padding: spacing[4],
    },
    card: {
      borderWidth: spacing[0.5],
      borderColor: t.colors.border,
      borderStyle: 'solid',
      borderRadius: borderRadius.md,
      padding: spacing[4],
    },
  });
}

export function Section({
  spacing = 'md',
  padding,
  background,
  border,
  variant = 'default',
  accentColor,
  noWrap = false,
  children,
  style,
}: SectionProps) {
  const theme = usePdfxTheme();
  const styles = useSafeMemo(() => createSectionStyles(theme), [theme]);
  const spacingMap = {
    none: styles.spacingNone,
    sm: styles.spacingSm,
    md: styles.spacingMd,
    lg: styles.spacingLg,
    xl: styles.spacingXl,
  };
  const paddingMap = {
    none: styles.paddingNone,
    sm: styles.paddingSm,
    md: styles.paddingMd,
    lg: styles.paddingLg,
  };
  const variantMap: Record<SectionVariant, Style | null> = {
    default: null,
    callout: styles.callout,
    highlight: styles.highlight,
    card: styles.card,
  };
  const styleArray: Style[] = [styles.base, spacingMap[spacing]];
  const variantStyle = variantMap[variant];
  if (variantStyle) styleArray.push(variantStyle);
  if (accentColor && (variant === 'callout' || variant === 'highlight')) {
    styleArray.push({ borderLeftColor: resolveColor(accentColor, theme.colors) });
  }
  if (padding && padding in paddingMap) styleArray.push(paddingMap[padding]);
  if (border && variant === 'default') styleArray.push(styles.border);
  if (background) styleArray.push({ backgroundColor: resolveColor(background, theme.colors) });
  if (style) styleArray.push(...[style].flat());
  return (
    <View wrap={noWrap ? false : undefined} style={styleArray}>
      {children}
    </View>
  );
}
`,type:"registry:component"}],ie=["@react-pdf/renderer"],se=["theme"],We={$schema:Z,name:ee,type:te,title:ne,description:oe,files:re,dependencies:ie,registryDependencies:se},le="https://pdfx.akashpise.dev/schema/registry-item.json",ae="text",de="registry:ui",ce="Text",ye="PDF text component for paragraphs",pe=[{path:"components/pdfx/text/pdfx-text.tsx",content:`import { Text as PDFText, StyleSheet } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { usePdfxTheme, useSafeMemo } from '../lib/pdfx-theme-context';
import type React from 'react';
type PdfxTheme = ReturnType<typeof usePdfxTheme>;

export type TextVariant = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';
export type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold';
export type TextDecoration = 'underline' | 'line-through' | 'none';

/**
 * Body text with typography scale, alignment, and decoration options.
 * Props - \`variant\` | \`align\` | \`color\` | \`weight\` | \`italic\` | \`decoration\` | \`transform\` | \`noMargin\` | \`children\` | \`style\`
 * @see {@link TextProps}
 */
export interface TextProps {
  /** Custom styles to merge with component defaults */
  style?: Style;
  /** Content to render */
  children: React.ReactNode;
  /**
   * @default 'base'
   */
  variant?: TextVariant;
  /**
   * @default 'left'
   */
  align?: 'left' | 'center' | 'right' | 'justify';
  color?: string;
  /**
   * @default 'normal'
   */
  weight?: TextWeight;
  /**
   * @default false
   */
  italic?: boolean;
  /**
   * @default 'none'
   */
  decoration?: TextDecoration;
  transform?: 'uppercase' | 'lowercase' | 'capitalize';
  /**
   * @default false
   */
  noMargin?: boolean;
}

const THEME_COLOR_KEYS = ['foreground','muted','mutedForeground','primary','primaryForeground','accent','destructive','success','warning','info'] as const;
function resolveColor(value: string, colors: Record<string, string>): string {
  return THEME_COLOR_KEYS.includes(value as (typeof THEME_COLOR_KEYS)[number]) ? colors[value] : value;
}
function createTextStyles(t: PdfxTheme) {
  const { fontWeights, letterSpacing } = t.primitives;
  const base = {
    fontFamily: t.typography.body.fontFamily,
    lineHeight: t.typography.body.lineHeight,
    color: t.colors.foreground,
    marginBottom: t.spacing.paragraphGap,
    marginTop: 0,
  };
  return StyleSheet.create({
    text: { ...base, fontSize: t.typography.body.fontSize },
    xs: { ...base, fontSize: t.primitives.typography.xs },
    sm: { ...base, fontSize: t.primitives.typography.sm },
    base: { ...base, fontSize: t.primitives.typography.base },
    lg: { ...base, fontSize: t.primitives.typography.lg },
    xl: { ...base, fontSize: t.primitives.typography.xl },
    '2xl': { ...base, fontSize: t.primitives.typography['2xl'] },
    '3xl': { ...base, fontSize: t.primitives.typography['3xl'] },
    weightNormal: { fontWeight: fontWeights.regular },
    weightMedium: { fontWeight: fontWeights.medium },
    weightSemibold: { fontWeight: fontWeights.semibold },
    weightBold: { fontWeight: fontWeights.bold },
    italic: { fontStyle: 'italic' },
    underline: { textDecoration: 'underline' },
    lineThrough: { textDecoration: 'line-through' },
    decorationNone: { textDecoration: 'none' },
    uppercase: { textTransform: 'uppercase', letterSpacing: letterSpacing.wider * 10 },
    lowercase: { textTransform: 'lowercase' },
    capitalize: { textTransform: 'capitalize' },
    noMargin: { marginBottom: 0, marginTop: 0 },
  });
}

export function Text({
  variant,
  align,
  color,
  weight,
  italic,
  decoration,
  transform,
  noMargin,
  children,
  style,
}: TextProps) {
  const theme = usePdfxTheme();
  const styles = useSafeMemo(() => createTextStyles(theme), [theme]);
  const weightMap = {
    normal: styles.weightNormal,
    medium: styles.weightMedium,
    semibold: styles.weightSemibold,
    bold: styles.weightBold,
  };
  const decorationMap = {
    underline: styles.underline,
    'line-through': styles.lineThrough,
    none: styles.decorationNone,
  };
  const transformMap = {
    uppercase: styles.uppercase,
    lowercase: styles.lowercase,
    capitalize: styles.capitalize,
  };
  const styleArray: Style[] = [variant ? styles[variant] : styles.text];
  if (weight && weight in weightMap) styleArray.push(weightMap[weight]);
  if (italic) styleArray.push(styles.italic);
  if (decoration && decoration in decorationMap) styleArray.push(decorationMap[decoration]);
  if (transform && transform in transformMap) styleArray.push(transformMap[transform]);
  if (noMargin) styleArray.push(styles.noMargin);
  const semantic = {} as Style;
  if (align) semantic.textAlign = align;
  if (color) semantic.color = resolveColor(color, theme.colors);
  if (Object.keys(semantic).length > 0) styleArray.push(semantic);
  if (style) styleArray.push(...[style].flat());
  return <PDFText style={styleArray}>{children}</PDFText>;
}
`,type:"registry:component"}],ge=["@react-pdf/renderer"],me=["theme"],Be={$schema:le,name:ae,type:de,title:ce,description:ye,files:pe,dependencies:ge,registryDependencies:me};function fe(e){return e.endsWith(".tsx")?"tsx":e.endsWith(".ts")?"ts":e.endsWith(".json")?"json":e.endsWith(".md")?"markdown":"tsx"}function S(e){const n=e.lastIndexOf("/");return n===-1?{folder:"",filename:e}:{folder:e.slice(0,n),filename:e.slice(n+1)}}function C(e,n){return{name:e,fullPath:n,children:new Map,files:[]}}function ue(e){const n=C("","");for(const i of e){const{folder:o}=S(i.path);if(!o)n.files.push(i);else{const s=o.split("/");let l=n,a="";for(const d of s){a=a?`${a}/${d}`:d,l.children.has(d)||l.children.set(d,C(d,a));const g=l.children.get(d);g&&(l=g)}l.files.push(i)}}return n}function xe(e){return e.sort((n,i)=>{const o=n.fullPath.startsWith("templates/"),s=i.fullPath.startsWith("templates/");return o&&!s?-1:!o&&s?1:n.name.localeCompare(i.name)})}function P({node:e,depth:n,activePath:i,onSelect:o,expandedPaths:s,onToggle:l}){const a=s.has(e.fullPath),d=xe([...e.children.values()]),g=n*12+8;return t.jsxs(t.Fragment,{children:[e.name&&t.jsxs("button",{type:"button",onClick:()=>l(e.fullPath),className:"w-full flex items-center gap-1 pt-1.5 pb-0.5 hover:bg-accent/30 rounded transition-colors",style:{paddingLeft:g},children:[t.jsx(he,{expanded:a}),t.jsx(Se,{}),t.jsxs("span",{className:"font-mono text-[11px] text-muted-foreground/80 truncate",title:e.fullPath,children:[e.name,"/"]})]}),(a||!e.name)&&e.files.map(c=>{const m=c.path===i,{filename:b}=S(c.path),T=e.name?g+16:g;return t.jsxs("button",{type:"button",onClick:()=>o(c.path),className:h("w-full text-left rounded-md font-mono text-[12px] leading-snug transition-colors flex items-center gap-1.5 py-1 pr-2",m?"bg-accent text-accent-foreground":"text-muted-foreground hover:text-foreground hover:bg-accent/50"),style:{paddingLeft:T},title:c.path,children:[t.jsx(be,{selected:m}),t.jsx("span",{className:"truncate",children:b})]},c.path)}),(a||!e.name)&&d.map(c=>t.jsx(P,{node:c,depth:e.name?n+1:n,activePath:i,onSelect:o,expandedPaths:s,onToggle:l},c.fullPath))]})}function Re({files:e,className:n,initialPath:i}){var v;const o=x.useMemo(()=>[...e].sort((r,f)=>r.path.localeCompare(f.path)),[e]),s=i&&o.some(r=>r.path===i)?i:((v=o[0])==null?void 0:v.path)??"",[l,a]=x.useState(s),d=x.useMemo(()=>{const r=new Set;if(s){const{folder:f}=S(s);if(f){const y=f.split("/");let u="";for(const p of y)u=u?`${u}/${p}`:p,r.add(u)}}for(const f of o){const{folder:y}=S(f.path);if(y){const u=y.split("/")[0];if(u.startsWith("templates")){r.add(u);const p=y.split("/");p.length>=2&&(r.add(`${p[0]}/${p[1]}`),p.length>=3&&r.add(`${p[0]}/${p[1]}/${p[2]}`))}}}return r},[s,o]),[g,c]=x.useState(d),m=o.find(r=>r.path===l)??o[0],b=x.useMemo(()=>ue(o),[o]),T=r=>{c(f=>{const y=new Set(f);return y.has(r)?y.delete(r):y.add(r),y})};return m?t.jsxs("div",{className:h("grid grid-cols-[260px_minmax(0,1fr)] rounded-xl border border-border overflow-hidden",n),children:[t.jsxs("div",{className:"border-r border-border bg-card/80 flex flex-col min-h-0",children:[t.jsx("div",{className:"px-3 py-2 border-b border-border text-[11px] font-medium uppercase tracking-wider text-muted-foreground shrink-0",children:"Files"}),t.jsx("div",{className:"overflow-auto flex-1 py-1.5",children:t.jsx(P,{node:b,depth:0,activePath:l,onSelect:a,expandedPaths:g,onToggle:T})})]}),t.jsx(F,{code:m.content,filename:m.path,language:m.language??fe(m.path),className:"rounded-none border-0 max-h-[70vh] overflow-auto"})]}):t.jsx("div",{className:h("rounded-xl border border-border bg-muted/30 p-4 text-sm text-muted-foreground",n),children:"No files available."})}function he({expanded:e}){return t.jsx("svg",{"aria-hidden":"true",width:"10",height:"10",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:h("shrink-0 text-muted-foreground/50 transition-transform",e?"rotate-90":"rotate-0"),children:t.jsx("polyline",{points:"9 18 15 12 9 6"})})}function Se(){return t.jsx("svg",{"aria-hidden":"true",width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round",className:"shrink-0 text-muted-foreground/50",children:t.jsx("path",{d:"M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"})})}function be({selected:e}){return t.jsxs("svg",{"aria-hidden":"true",width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round",className:h("shrink-0",e?"text-accent-foreground/70":"text-muted-foreground/40"),children:[t.jsx("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),t.jsx("polyline",{points:"14 2 14 8 20 8"})]})}export{Pe as C,Fe as E,Re as T,Ve as a,De as k,ke as p,We as s,Be as t};
