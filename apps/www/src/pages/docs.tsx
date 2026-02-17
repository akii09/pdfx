import { TableOfContents } from '../components/table-of-contents';
import { useDocumentTitle } from '../hooks/use-document-title';
import Intro from './components/getting-started/intro';
import Installation from './components/getting-started/installation';
import UsageAndCli from './components/getting-started/usage-cli';
import Theming from './components/getting-started/theming';
import HowItWorks from './components/getting-started/how-it-works';

const tocItems = [
  { id: 'installation', title: 'Installation', level: 2 },
  { id: 'usage', title: 'Usage', level: 2 },
  { id: 'cli-commands', title: 'CLI Commands', level: 2 },
  { id: 'theming', title: 'Theming', level: 2 },
  { id: 'theme-cli', title: 'Theme CLI', level: 3 },
  { id: 'customizing', title: 'Customizing', level: 3 },
  { id: 'how-it-works', title: 'How It Works', level: 2 },
];

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
