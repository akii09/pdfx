import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">
            PDFX
          </Link>
          <nav className="flex gap-6">
            <Link to="/docs" className="hover:underline">
              Docs
            </Link>
            <Link to="/components/heading" className="hover:underline">
              Components
            </Link>
            <a
              href="https://github.com/akii09/pdfx"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              GitHub
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          Built with React + Vite. Inspired by shadcn/ui.
        </div>
      </footer>
    </div>
  );
}
