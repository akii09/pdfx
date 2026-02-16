export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-6xl font-bold mb-6">PDFX</h1>
        <p className="text-xl text-gray-600 mb-8">
          Professional PDF components for React. Copy, paste, customize.
        </p>
        <div className="flex gap-4 justify-center">
          <a href="/docs" className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Get Started
          </a>
          <a
            href="/components/heading"
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Browse Components
          </a>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-bold mb-2">Copy & Paste</h3>
            <p className="text-gray-600">
              Components are copied directly into your project. You own the code.
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-bold mb-2">Fully Customizable</h3>
            <p className="text-gray-600">
              Edit components to match your needs. No limits, no restrictions.
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-bold mb-2">Type Safe</h3>
            <p className="text-gray-600">
              Built with TypeScript. Full type safety and IntelliSense support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
