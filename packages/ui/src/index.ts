export type { PDFComponentProps } from '@pdfx/shared';
export {
  Heading,
  type HeadingProps,
  type HeadingWeight,
  type HeadingTracking,
} from './components/heading';
export {
  Divider,
  type DividerProps,
  type DividerVariant,
  type DividerThickness,
  type DividerSpacing,
} from './components/divider';
export { PageBreak, type PageBreakProps } from './components/page-break';
export {
  PdfPageNumber,
  type PdfPageNumberProps,
  type PageNumberAlign,
  type PageNumberSize,
} from './components/page-number';
export {
  PdfWatermark,
  type PdfWatermarkProps,
  type WatermarkPosition,
} from './components/watermark';
export {
  PdfQRCode,
  type PdfQRCodeProps,
  type QRCodeErrorLevel,
} from './components/qrcode';
export {
  PdfAlert,
  type PdfAlertProps,
  type AlertVariant,
} from './components/alert';
export { Link, type LinkProps, type LinkVariant, type LinkUnderline } from './components/link';
export {
  Text,
  type TextProps,
  type TextVariant,
  type TextWeight,
  type TextDecoration,
} from './components/text';
export {
  Stack,
  type StackProps,
  type StackGap,
  type StackDirection,
  type StackAlign,
  type StackJustify,
} from './components/stack';
export {
  Section,
  type SectionProps,
  type SectionSpacing,
  type SectionPadding,
  type SectionVariant,
} from './components/section';
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  type TableProps,
  type TableSectionProps,
  type TableRowProps,
  type TableCellProps,
  type TableVariant,
} from './components/table';
export {
  DataTable,
  type DataTableProps,
  type DataTableColumn,
  type DataTableSize,
} from './components/data-table';
export {
  Badge,
  type BadgeProps,
  type BadgeVariant,
  type BadgeSize,
} from './components/badge';
export {
  KeyValue,
  type KeyValueProps,
  type KeyValueEntry,
  type KeyValueDirection,
  type KeyValueSize,
} from './components/key-value';
export {
  PageHeader,
  type PageHeaderProps,
  type PageHeaderVariant,
} from './components/page-header';
export {
  PageFooter,
  type PageFooterProps,
  type PageFooterVariant,
} from './components/page-footer';
export { PdfList, type PdfListProps, type ListVariant, type ListItem } from './components/list';
export { PdfCard, type PdfCardProps, type CardVariant } from './components/card';
export {
  PdfForm,
  type PdfFormProps,
  type PdfFormVariant,
  type PdfFormField,
  type PdfFormGroup,
  type FormLayout,
  type FormLabelPosition,
} from './components/form';
export {
  PdfSignatureBlock,
  type PdfSignatureBlockProps,
  type SignatureVariant,
  type SignatureSigner,
} from './components/signature';
export { KeepTogether, type KeepTogetherProps } from './components/keep-together/keep-together';
export {
  PdfImage,
  type PdfImageProps,
  type PdfImageSrc,
  type PdfImageVariant,
  type PdfImageFit,
} from './components/pdf-image/pdf-image';
export {
  PdfGraph,
  getGraphWidth,
  A4_WIDTH,
  GRAPH_SAFE_WIDTHS,
  type GraphProps,
  type GraphVariant,
  type GraphDataPoint,
  type GraphSeries,
  type GraphLegendPosition,
  type GraphWidthOptions,
} from './components/graph/graph';
export { PdfxThemeProvider, usePdfxTheme, PdfxThemeContext } from './lib/pdfx-theme-context';

// Templates
export {
  InvoiceTemplate,
  type InvoiceClient,
  type InvoiceCompany,
  type InvoiceCurrency,
  type InvoiceLineItem,
  type InvoicePayment,
  type InvoiceSummary,
  type InvoiceTemplateProps,
  type InvoiceVariant,
} from './templates/invoice';

export {
  ResumeTemplate,
  type ResumeCertification,
  type ResumeEducation,
  type ResumeExperience,
  type ResumeLanguage,
  type ResumePersonal,
  type ResumeProject,
  type ResumeSkillCategory,
  type ResumeSummary,
  type ResumeTemplateProps,
  type ResumeVariant,
} from './templates/resume';
