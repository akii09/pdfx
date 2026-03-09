import { useThemeStore } from '@/stores';
import { useDocumentStore } from '@/stores/documentStore';
import type { DocumentConfig, ThemeState } from '@pdfx/builder-core';
import { useNavigate } from 'react-router-dom';

export function SetupPage() {
  const navigate = useNavigate();
  const initializeDocument = useDocumentStore((state) => state.initializeDocument);
  const setPreset = useThemeStore((state) => state.setPreset);

  const handleCreateDocument = (
    config: Partial<DocumentConfig>,
    themePreset: ThemeState['preset']
  ) => {
    /**
     * Initialize document with configuration
     * Set theme preset
     * Navigate to editor
     */
    initializeDocument({
      paperSize: config.paperSize ?? 'A4',
      orientation: config.orientation ?? 'portrait',
      margins: config.margins ?? {
        top: 20,
        right: 15,
        bottom: 20,
        left: 15,
      },
      name: config.name ?? 'Untitled Document',
    });
    setPreset(themePreset);
    navigate('/editor');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="w-full max-w-2xl rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-2xl font-bold text-slate-900">New PDF Document</h1>

        <div className="space-y-6">
          {/* Paper Settings */}
          <section className="rounded-lg border border-slate-200 p-4">
            <h2 className="mb-3 font-semibold text-slate-700">Paper</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="paper-size" className="mb-1 block text-sm text-slate-600">
                  Size
                </label>
                <select
                  id="paper-size"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                >
                  <option value="A4">A4 (210 × 297mm)</option>
                  <option value="A3">A3 (297 × 420mm)</option>
                  <option value="LETTER">Letter (8.5 × 11 in)</option>
                  <option value="LEGAL">Legal (8.5 × 14 in)</option>
                </select>
              </div>
              <div>
                <p className="mb-1 block text-sm text-slate-600">Orientation</p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="flex-1 rounded-md border border-blue-600 bg-blue-50 px-3 py-2 text-sm text-blue-600"
                  >
                    Portrait
                  </button>
                  <button
                    type="button"
                    className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-600"
                  >
                    Landscape
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Theme Settings */}
          <section className="rounded-lg border border-slate-200 p-4">
            <h2 className="mb-3 font-semibold text-slate-700">Theme</h2>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => handleCreateDocument({}, 'professional')}
                className="rounded-md border-2 border-blue-600 p-3 text-center"
              >
                <div className="mb-2 flex justify-center gap-1">
                  <div className="h-4 w-4 rounded bg-blue-900" />
                  <div className="h-4 w-4 rounded bg-blue-700" />
                </div>
                <span className="text-sm font-medium">Professional</span>
              </button>
              <button type="button" className="rounded-md border border-slate-300 p-3 text-center">
                <div className="mb-2 flex justify-center gap-1">
                  <div className="h-4 w-4 rounded bg-violet-600" />
                  <div className="h-4 w-4 rounded bg-violet-400" />
                </div>
                <span className="text-sm font-medium">Modern</span>
              </button>
              <button type="button" className="rounded-md border border-slate-300 p-3 text-center">
                <div className="mb-2 flex justify-center gap-1">
                  <div className="h-4 w-4 rounded bg-slate-800" />
                  <div className="h-4 w-4 rounded bg-slate-400" />
                </div>
                <span className="text-sm font-medium">Minimal</span>
              </button>
            </div>
          </section>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => handleCreateDocument({}, 'professional')}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Create Document →
          </button>
        </div>
      </div>
    </div>
  );
}
