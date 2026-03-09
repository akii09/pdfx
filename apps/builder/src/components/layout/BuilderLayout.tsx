import { Canvas } from '../canvas/Canvas';
import { PanelTabs } from '../panels/PanelTabs';
import { Sidebar } from '../sidebar/Sidebar';
import { Toolbar } from '../toolbar/Toolbar';

export function BuilderLayout() {
  return (
    <div className="flex h-screen flex-col bg-slate-100">
      {/* Top Toolbar */}
      <Toolbar />

      {/* Main Content - Three Column Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Component Palette */}
        <Sidebar />

        {/* Center - Canvas */}
        <main className="flex-1 overflow-auto p-4">
          <Canvas />
        </main>

        {/* Right Panel - Properties/Theme/Code */}
        <aside className="w-80 border-l border-slate-200 bg-white">
          <PanelTabs />
        </aside>
      </div>
    </div>
  );
}
