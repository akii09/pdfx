import { motion } from 'framer-motion';
import { PlugZap, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MCPContent } from '../components/mcp-content';
import { SkillsContent } from '../components/skills-content';
import { MCP_TOC, SKILLS_TOC } from '../constants';
import { useDocumentTitle } from '../hooks/use-document-title';

type Tab = 'mcp' | 'skills';

function InlineToC({ items }: { items: { id: string; title: string; level: number }[] }) {
  const [active, setActive] = useState('');

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActive(e.target.id);
            break;
          }
        }
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );
    for (const el of els) obs.observe(el);
    return () => obs.disconnect();
  }, [items]);

  return (
    <nav className="sticky top-20 hidden xl:block w-44 shrink-0">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
        On this page
      </p>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`block text-xs transition-colors leading-snug ${
                active === item.id
                  ? 'text-foreground font-medium'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              style={{ paddingLeft: item.level === 3 ? '0.75rem' : '0' }}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function MCPPage() {
  useDocumentTitle('MCP & Skills');
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab: Tab = (searchParams.get('tab') as Tab) ?? 'mcp';

  function setTab(tab: Tab) {
    setSearchParams({ tab });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const toc = activeTab === 'mcp' ? MCP_TOC : SKILLS_TOC;

  return (
    <div className="flex gap-8">
      {/* ── Main content ── */}
      <div className="flex-1 min-w-0 py-10 max-w-3xl">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              AI Tools
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">MCP & Skills</h1>
          <p className="text-muted-foreground leading-relaxed">
            Make your AI editor fluent in PDFx. Two approaches, pick one or use both.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-lg bg-muted/50 border border-border/60 w-fit mb-10">
          {[
            { id: 'mcp' as Tab, label: 'MCP Server', icon: PlugZap },
            { id: 'skills' as Tab, label: 'Skills File', icon: Sparkles },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === id
                  ? 'bg-background text-foreground shadow-sm border border-border/60'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          {activeTab === 'mcp' ? <MCPContent /> : <SkillsContent />}
        </motion.div>
      </div>

      {/* ── Right ToC ── */}
      <div className="pt-10">
        <InlineToC items={toc} />
      </div>
    </div>
  );
}
