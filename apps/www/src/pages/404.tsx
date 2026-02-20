import { ArrowLeft, FileQuestion } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/use-document-title';

export default function NotFoundPage() {
  useDocumentTitle('Page Not Found');

  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <FileQuestion className="h-16 w-16 text-muted-foreground/40 mb-6" />
      <h1 className="text-4xl font-bold tracking-tight mb-3">Page not found</h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex gap-4">
        <Link
          to="/docs"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Go to Docs
        </Link>
        <Link
          to="/components"
          className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
        >
          Browse Components
        </Link>
      </div>
    </div>
  );
}
