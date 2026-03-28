import { AnimatePresence, motion } from 'framer-motion';
import { PlugZap, Sparkles, Terminal } from 'lucide-react';
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
    <nav className="sticky top-20 hidden xl:block w-48 shrink-0">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
        On this page
      </p>
      <ul className="space-y-2 relative border-l border-border/50 ml-1 pl-4">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <li key={item.id} className="relative">
              {isActive && (
                <motion.div
                  layoutId="activeToCInfo"
                  className="absolute -left-[17px] top-1.5 w-[2px] h-3.5 bg-foreground rounded-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`block text-[13px] transition-colors leading-snug ${isActive ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'}`}
                style={{ paddingLeft: item.level === 3 ? '0.75rem' : '0' }}
              >
                {item.title}
              </a>
            </li>
          );
        })}
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

  const tabs = [
    { id: 'mcp' as Tab, label: 'MCP Server', icon: PlugZap, desc: 'Dynamic tool execution' },
    { id: 'skills' as Tab, label: 'Skills File', icon: Sparkles, desc: 'Static instruction set' },
  ];

  return (
    <div className="flex gap-8 relative overflow-hidden">
      {/* Main content */}
      <div className="flex-1 min-w-0 py-12 max-w-3xl">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-xl bg-muted border border-border">
              <Terminal className="w-5 h-5 text-foreground" />
            </div>
            <span className="text-sm font-bold uppercase tracking-widest text-foreground">
              AI Integration
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground">
            MCP & Skills
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl font-medium">
            Supercharge your AI editor with fluent context about PDFx. Choose the dynamic power of
            our MCP Server or the simplicity of our Skills file.
          </p>
        </motion.div>

        {/* Custom Animated Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-3 mb-12"
        >
          {tabs.map(({ id, label, icon: Icon, desc }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setTab(id)}
                className={`relative flex-1 group flex flex-col items-start p-4 rounded-2xl transition-all duration-300 border text-left
                  ${isActive ? 'border-border bg-muted/30 shadow-sm' : 'border-border/50 bg-transparent hover:border-border hover:bg-muted/10'}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabBadge"
                    className="absolute inset-0 rounded-2xl border-2 border-foreground/10 bg-muted/50"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <div className="relative z-10 flex items-center gap-3 w-full">
                  <div
                    className={`p-2 rounded-lg transition-colors duration-300 ${isActive ? 'bg-background text-foreground shadow-sm border border-border' : 'bg-muted/50 text-muted-foreground group-hover:text-foreground'}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3
                      className={`font-semibold text-base transition-colors duration-300 ${isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}
                    >
                      {label}
                    </h3>
                    <p
                      className={`text-xs mt-0.5 transition-colors duration-300 ${isActive ? 'text-muted-foreground' : 'text-muted-foreground/70'}`}
                    >
                      {desc}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </motion.div>

        {/* Tab content */}
        <div className="relative">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {activeTab === 'mcp' ? <MCPContent /> : <SkillsContent />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Right ToC */}
      <div className="pt-12">
        <InlineToC items={toc} />
      </div>
    </div>
  );
}
