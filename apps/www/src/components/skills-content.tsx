import { CodeBlock } from '@/components/code-block';
import { useCopy } from '@/hooks/use-copy';
import {
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  FileCode,
  Info,
  PlugZap,
  Sparkles,
} from 'lucide-react';
import { useState } from 'react';
import { PDFX_SKILLS_CONTENT } from '../constants';

export function SkillsContent() {
  const [fileOpen, setFileOpen] = useState(false);
  const { copied, copy } = useCopy(PDFX_SKILLS_CONTENT);

  return (
    <div className="space-y-10">
      <section id="skills-overview">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-amber-500" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">PDFx Skills File</h1>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          A structured AI context document that gives any AI editor accurate, comprehensive
          knowledge of PDFx — every component, prop, block, theme, and CLI command. Drop it into
          your editor's context file and your AI generates correct PDFx code without guessing.
        </p>
      </section>

      <section id="skills-setup">
        <h2 className="text-lg font-semibold mb-4">Setup</h2>

        <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 px-4 py-3 flex items-start gap-2.5 mb-5">
          <Info className="h-3.5 w-3.5 text-blue-500/80 shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            Works with any AI editor — Claude Code (CLAUDE.md), Cursor (.cursor/rules/pdfx.mdc), VS
            Code (copilot-instructions.md), Windsurf (.windsurf/rules/pdfx.md), opencode and Qoder
            (AGENTS.md), and more. The interactive prompt handles editor-specific paths and
            frontmatter automatically, or pass{' '}
            <code className="font-mono bg-muted px-1 py-0.5 rounded text-[11px]">
              --platform &lt;name&gt;
            </code>{' '}
            to skip it.
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              1 — Run the setup command
            </p>
            <CodeBlock code="npx pdfx-cli@latest skills init" lang="bash" />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Or add manually
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Copy the skills file content below and place it in your editor's context file. Cursor
              and Windsurf require a YAML frontmatter block at the top — run{' '}
              <code className="font-mono bg-muted px-1 py-0.5 rounded text-[11px]">
                skills init --platform cursor
              </code>{' '}
              (or windsurf) to get the exact file with frontmatter already applied.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              2 — Verify
            </p>
            <div className="rounded-lg border border-border/60 bg-muted/30 px-4 py-3 flex items-start gap-2">
              <Check className="h-3.5 w-3.5 text-green-500 shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground">
                Ask your AI: <span className="italic">"what PDFx components are available?"</span> —
                it should list all 24 components with accurate prop information.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="skills-file">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">The Skills File</h2>
          <button
            type="button"
            onClick={copy}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium border border-border bg-background hover:bg-muted text-foreground transition-colors"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-green-500" /> Copied!
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" /> Copy all
              </>
            )}
          </button>
        </div>
        <p className="text-xs text-muted-foreground mb-3">
          ~600 lines · Markdown · 24 components, 10 blocks, CLI reference, patterns, anti-patterns
        </p>

        <button
          type="button"
          onClick={() => setFileOpen((prev) => !prev)}
          className="w-full flex items-center justify-between rounded-lg border border-border/60 bg-muted/20 px-4 py-2.5 text-sm font-medium hover:bg-muted/40 transition-colors mb-2"
        >
          <span>{fileOpen ? 'Hide file content' : 'Show file content'}</span>
          {fileOpen ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </button>

        {fileOpen && (
          <div className="rounded-xl border border-border/60 bg-zinc-950 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-red-500/70" />
                <span className="h-2 w-2 rounded-full bg-yellow-500/70" />
                <span className="h-2 w-2 rounded-full bg-green-500/70" />
              </div>
              <span className="text-[10px] font-mono text-zinc-600">
                CLAUDE.md / AGENTS.md / pdfx.mdc…
              </span>
              <button
                type="button"
                onClick={copy}
                className="flex items-center gap-1 px-2 py-1 rounded text-zinc-400 hover:text-zinc-200 hover:bg-white/10 transition-colors text-[11px] font-mono"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-400" /> copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" /> copy
                  </>
                )}
              </button>
            </div>
            <pre
              className="px-4 py-4 font-mono text-[11.5px] leading-relaxed text-zinc-400 overflow-x-auto max-h-[560px] overflow-y-auto"
              style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgb(63 63 70) transparent' }}
            >
              {PDFX_SKILLS_CONTENT}
            </pre>
          </div>
        )}
      </section>

      <section id="skills-with-mcp">
        <h2 className="text-lg font-semibold mb-3">Use With MCP for Best Results</h2>
        <div className="rounded-xl border border-border/60 bg-muted/20 px-5 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <div className="font-semibold text-foreground mb-1 flex items-center gap-2">
                <FileCode className="h-4 w-4" /> Skills file
              </div>
              <ul className="space-y-1 text-xs">
                <li>• Always-on context — no AI call needed</li>
                <li>• Works offline</li>
                <li>• Best for: prop reference, patterns</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-foreground mb-1 flex items-center gap-2">
                <PlugZap className="h-4 w-4" /> MCP server
              </div>
              <ul className="space-y-1 text-xs">
                <li>• Live data — always up to date</li>
                <li>• Full component source on demand</li>
                <li>• Best for: fetching actual code</li>
              </ul>
            </div>
          </div>
          <p className="mt-4 text-xs text-muted-foreground border-t border-border/60 pt-3">
            Skills file = the AI knows the shape. MCP = the AI gets the exact code. Together = no
            hallucinations.
          </p>
        </div>
      </section>
    </div>
  );
}
