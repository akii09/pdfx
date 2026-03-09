import type { DocumentConfig, Page, PlacedComponent } from '@pdfx/builder-core';
import { nanoid } from 'nanoid';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

/**
 * Default document configuration
 */
const defaultConfig: DocumentConfig = {
  paperSize: 'A4',
  orientation: 'portrait',
  margins: {
    top: 20,
    right: 15,
    bottom: 20,
    left: 15,
  },
  name: 'Untitled Document',
};

/**
 * Create a default empty page
 */
function createDefaultPage(): Page {
  return {
    id: nanoid(),
    components: [],
  };
}

/**
 * Document store state interface
 */
interface DocumentState {
  // State
  isConfigured: boolean;
  config: DocumentConfig;
  pages: Page[];
  activePageIndex: number;

  // Actions - Config
  setConfig: (config: Partial<DocumentConfig>) => void;
  initializeDocument: (config: DocumentConfig) => void;
  resetDocument: () => void;

  // Actions - Pages
  addPage: () => void;
  removePage: (index: number) => void;
  setActivePage: (index: number) => void;

  // Actions - Components
  addComponent: (schemaId: string, afterIndex?: number) => string;
  updateComponent: (id: string, props: Record<string, unknown>) => void;
  removeComponent: (id: string) => void;
  reorderComponents: (from: number, to: number) => void;
  duplicateComponent: (id: string) => void;
}

/**
 * Document store with localStorage persistence
 */
export const useDocumentStore = create<DocumentState>()(
  persist(
    immer((set, _get) => ({
      // Initial state
      isConfigured: false,
      config: defaultConfig,
      pages: [],
      activePageIndex: 0,

      // Config actions
      setConfig: (config) =>
        set((state) => {
          state.config = { ...state.config, ...config };
        }),

      initializeDocument: (config) =>
        set((state) => {
          state.config = config;
          state.pages = [createDefaultPage()];
          state.activePageIndex = 0;
          state.isConfigured = true;
        }),

      resetDocument: () =>
        set((state) => {
          state.isConfigured = false;
          state.config = defaultConfig;
          state.pages = [];
          state.activePageIndex = 0;
        }),

      // Page actions
      addPage: () =>
        set((state) => {
          state.pages.push(createDefaultPage());
          state.activePageIndex = state.pages.length - 1;
        }),

      removePage: (index) =>
        set((state) => {
          if (state.pages.length > 1) {
            state.pages.splice(index, 1);
            if (state.activePageIndex >= state.pages.length) {
              state.activePageIndex = state.pages.length - 1;
            }
          }
        }),

      setActivePage: (index) =>
        set((state) => {
          if (index >= 0 && index < state.pages.length) {
            state.activePageIndex = index;
          }
        }),

      // Component actions
      addComponent: (schemaId, afterIndex) => {
        const id = nanoid();
        set((state) => {
          const page = state.pages[state.activePageIndex];
          if (!page) return;

          const newComponent: PlacedComponent = {
            id,
            schemaId,
            props: {}, // Will be populated with defaults from schema
          };

          if (afterIndex !== undefined) {
            page.components.splice(afterIndex + 1, 0, newComponent);
          } else {
            page.components.push(newComponent);
          }
        });
        return id;
      },

      updateComponent: (id, props) =>
        set((state) => {
          const page = state.pages[state.activePageIndex];
          if (!page) return;

          const component = page.components.find((c) => c.id === id);
          if (component) {
            component.props = { ...component.props, ...props };
          }
        }),

      removeComponent: (id) =>
        set((state) => {
          const page = state.pages[state.activePageIndex];
          if (!page) return;

          const index = page.components.findIndex((c) => c.id === id);
          if (index !== -1) {
            page.components.splice(index, 1);
          }
        }),

      reorderComponents: (from, to) =>
        set((state) => {
          const page = state.pages[state.activePageIndex];
          if (!page) return;

          const [removed] = page.components.splice(from, 1);
          page.components.splice(to, 0, removed);
        }),

      duplicateComponent: (id) =>
        set((state) => {
          const page = state.pages[state.activePageIndex];
          if (!page) return;

          const index = page.components.findIndex((c) => c.id === id);
          if (index !== -1) {
            const original = page.components[index];
            const duplicate: PlacedComponent = {
              id: nanoid(),
              schemaId: original.schemaId,
              props: { ...original.props },
            };
            page.components.splice(index + 1, 0, duplicate);
          }
        }),
    })),
    {
      name: 'pdfx-builder-document',
      // Only persist these fields
      partialize: (state) => ({
        isConfigured: state.isConfigured,
        config: state.config,
        pages: state.pages,
        activePageIndex: state.activePageIndex,
      }),
    }
  )
);
