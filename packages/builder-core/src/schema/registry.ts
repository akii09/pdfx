import type { ComponentSchema } from './types';

/**
 * Registry of all available component schemas
 * Components are registered by their schema ID
 */
export const componentRegistry: Record<string, ComponentSchema> = {
  // Will be populated with actual schemas in Phase 1, Week 2
  // Example:
  // text: textSchema,
  // heading: headingSchema,
  // ...
};

/**
 * Get a component schema by ID
 */
export function getComponentSchema(id: string): ComponentSchema | undefined {
  return componentRegistry[id];
}

/**
 * Get all component schemas grouped by category
 */
export function getComponentsByCategory(): Record<string, ComponentSchema[]> {
  const grouped: Record<string, ComponentSchema[]> = {};

  for (const schema of Object.values(componentRegistry)) {
    if (!grouped[schema.category]) {
      grouped[schema.category] = [];
    }
    grouped[schema.category].push(schema);
  }

  return grouped;
}

/**
 * Get all component schemas as an array
 */
export function getAllComponents(): ComponentSchema[] {
  return Object.values(componentRegistry);
}
