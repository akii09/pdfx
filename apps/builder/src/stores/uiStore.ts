import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

/**
 * UI store state interface
 */
interface UIState {
  // Selection
  selectedComponentId: string | null;

  // Panels
  sidebarPanel: 'components' | 'templates' | 'assets';
  rightPanel: 'properties' | 'theme' | 'code';

  // View
  zoom: number;
  showGrid: boolean;
  showRulers: boolean;
  previewVisible: boolean;

  // Actions
  selectComponent: (id: string | null) => void;
  setSidebarPanel: (panel: UIState['sidebarPanel']) => void;
  setRightPanel: (panel: UIState['rightPanel']) => void;
  setZoom: (zoom: number) => void;
  toggleGrid: () => void;
  toggleRulers: () => void;
  togglePreview: () => void;
}

/**
 * UI store with localStorage persistence
 */
export const useUIStore = create<UIState>()(
  persist(
    immer((set) => ({
      // Initial state
      selectedComponentId: null,
      sidebarPanel: 'components',
      rightPanel: 'properties',
      zoom: 100,
      showGrid: true,
      showRulers: false,
      previewVisible: true,

      // Actions
      selectComponent: (id) =>
        set((state) => {
          state.selectedComponentId = id;
        }),

      setSidebarPanel: (panel) =>
        set((state) => {
          state.sidebarPanel = panel;
        }),

      setRightPanel: (panel) =>
        set((state) => {
          state.rightPanel = panel;
        }),

      setZoom: (zoom) =>
        set((state) => {
          state.zoom = Math.max(25, Math.min(400, zoom));
        }),

      toggleGrid: () =>
        set((state) => {
          state.showGrid = !state.showGrid;
        }),

      toggleRulers: () =>
        set((state) => {
          state.showRulers = !state.showRulers;
        }),

      togglePreview: () =>
        set((state) => {
          state.previewVisible = !state.previewVisible;
        }),
    })),
    {
      name: 'pdfx-builder-ui',
      partialize: (state) => ({
        sidebarPanel: state.sidebarPanel,
        rightPanel: state.rightPanel,
        zoom: state.zoom,
        showGrid: state.showGrid,
        showRulers: state.showRulers,
        previewVisible: state.previewVisible,
      }),
    }
  )
);
