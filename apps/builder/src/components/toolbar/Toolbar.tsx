export function Toolbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold text-slate-900">PDFx Builder</h1>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          Export Code
        </button>
      </div>
    </header>
  );
}
