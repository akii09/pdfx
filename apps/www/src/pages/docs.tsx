import { tocItems } from '@/constants';
import { TableOfContents } from '../components/table-of-contents';
import { useDocumentTitle } from '../hooks/use-document-title';
import Intro from './components/getting-started/intro';

export default function DocsPage() {
  useDocumentTitle('Documentation');

  return (
    <div className="flex gap-6">
      <div className="flex-1 min-w-0 py-12 max-w-3xl">
        <Intro />
      </div>

      <TableOfContents items={tocItems} />
    </div>
  );
}
