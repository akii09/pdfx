/**
 * Property type enumeration for component schema definitions
 */
export type PropType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'select'
  | 'color'
  | 'array'
  | 'object';

/**
 * Component category for organizing the sidebar palette
 */
export type ComponentCategory =
  | 'typography'
  | 'layout'
  | 'data'
  | 'structure'
  | 'media'
  | 'forms';

/**
 * Option for select-type properties
 */
export interface SelectOption {
  label: string;
  value: string;
}

/**
 * Property grouping for organizing the properties panel
 */
export type PropGroup =
  | 'content'
  | 'typography'
  | 'style'
  | 'layout'
  | 'advanced';

/**
 * Schema definition for a single component property
 */
export interface PropSchema {
  name: string;
  label: string;
  type: PropType;
  default?: unknown;
  required?: boolean;
  group?: PropGroup;
  description?: string;
  options?: SelectOption[];
  items?: PropSchema;
  fields?: PropSchema[];
  min?: number;
  max?: number;
  multiline?: boolean;
}

/**
 * Constraints on component placement
 */
export interface ComponentConstraints {
  allowedPositions?: ('first' | 'last' | 'any')[];
  singleton?: boolean;
  noNesting?: boolean;
}

/**
 * Complete schema definition for a PDFx component
 */
export interface ComponentSchema {
  id: string;
  label: string;
  category: ComponentCategory;
  icon: string;
  description: string;
  props: PropSchema[];
  defaults: Record<string, unknown>;
  constraints?: ComponentConstraints;
  importName: string;
  isContainer?: boolean;
}