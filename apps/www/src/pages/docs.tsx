import { tocItems } from '@/constants';
import { TableOfContents } from '../components/table-of-contents';
import { useDocumentTitle } from '../hooks/use-document-title';
import HowItWorks from './components/getting-started/how-it-works';
import Installation from './components/getting-started/installation';
import Intro from './components/getting-started/intro';
import Theming from './components/getting-started/theming';
import UsageAndCli from './components/getting-started/usage-cli';

export default function DocsPage() {
  useDocumentTitle('Documentation');

  return (
    <div className="flex gap-6">
      <div className="flex-1 min-w-0 py-12 max-w-3xl">
        <Intro />
        <Installation />
        <UsageAndCli />
        <Theming />
        <HowItWorks />
      </div>

      <TableOfContents items={tocItems} />
    </div>
  );
}
