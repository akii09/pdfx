import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t py-6 mt-auto" aria-label="Site footer">
      <div className="container mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground/70 text-center sm:text-left">
          © {new Date().getFullYear()} PDFx · MIT License
        </p>
        <nav className="flex items-center gap-5" aria-label="Footer navigation">
          <a
            href="https://github.com/akii09/pdfx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors"
            aria-label="PDFx on GitHub"
          >
            GitHub
          </a>
          <Link
            to="/docs"
            className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors"
          >
            Docs
          </Link>
          <Link
            to="/components"
            className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors"
          >
            Components
          </Link>
        </nav>
      </div>
    </footer>
  );
}
