import type { Style } from '@react-pdf/types';

/** List visual style variant. */
export type ListVariant =
  | 'bullet'
  | 'numbered'
  | 'checklist'
  | 'icon'
  | 'multi-level'
  | 'descriptive';

/** A single list item, optionally with nested children. */
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
