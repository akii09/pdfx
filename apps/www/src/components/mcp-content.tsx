import { CodeBlock } from '@/components/code-block';
import { Check, Info, PlugZap } from 'lucide-react';
import { MCP_TOOLS } from '../constants';

const GENERIC_MCP_CONFIG = `{
  "mcpServers": {
    "pdfx": {
      "command": "npx",
      "args": ["-y", "@akii09/pdfx-cli@latest", "mcp"]
    }
  }
}`;

export function MCPContent() {
  return (
    <div className="space-y-10">
      <section id="mcp-overview">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-violet-500/30 flex items-center justify-center">
            <PlugZap className="h-4 w-4 text-violet-500" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">PDFx MCP Server</h1>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          Gives your AI editor live, structured access to every PDFx component, block, and theme. No
          hallucinated props. No stale docs.
        </p>
      </section>

      <section id="mcp-setup">
        <h2 className="text-lg font-semibold mb-4">Setup</h2>

        <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 px-4 py-3 flex items-start gap-2.5 mb-5">
          <Info className="h-3.5 w-3.5 text-blue-500/80 shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            Works with any MCP-capable AI tool — Claude Code, Cursor, VS Code, Windsurf, opencode,
            Antigravity, and more. The interactive prompt detects your editor, or pass{' '}
            <code className="font-mono bg-muted px-1 py-0.5 rounded text-[11px]">
              --client &lt;name&gt;
            </code>{' '}
            to go straight to config.
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              1 — Run the setup command
            </p>
            <CodeBlock code="npx @akii09/pdfx-cli@latest mcp init" lang="bash" />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              2 — Restart your editor, then verify
            </p>
            <div className="rounded-lg border border-border/60 bg-muted/30 px-4 py-3 flex items-start gap-2">
              <Check className="h-3.5 w-3.5 text-green-500 shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground">
                Ask your AI: <span className="italic">"list all pdfx components using MCP"</span> —
                if the server is connected, you will get an accurate component list back.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="mcp-manual">
        <h2 className="text-lg font-semibold mb-2">Manual Config</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Prefer editing config files yourself? Add the pdfx entry to your editor's MCP config file.
          The command is always the same — only the JSON wrapper key differs per editor.
        </p>
        <CodeBlock code={GENERIC_MCP_CONFIG} lang="json" filename="mcp-config.json" />
        <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
          VS Code uses{' '}
          <code className="font-mono bg-muted px-1 py-0.5 rounded text-[11px]">"servers"</code> +{' '}
          <code className="font-mono bg-muted px-1 py-0.5 rounded text-[11px]">
            "type": "stdio"
          </code>
          . opencode uses{' '}
          <code className="font-mono bg-muted px-1 py-0.5 rounded text-[11px]">"mcp"</code> +{' '}
          <code className="font-mono bg-muted px-1 py-0.5 rounded text-[11px]">
            "type": "local"
          </code>{' '}
          with a unified command array. Run{' '}
          <code className="font-mono bg-muted px-1 py-0.5 rounded text-[11px]">
            mcp init --client &lt;name&gt;
          </code>{' '}
          to get the exact JSON for your editor.
        </p>
      </section>

      <section id="mcp-tools">
        <h2 className="text-lg font-semibold mb-2">Tools</h2>
        <p className="text-sm text-muted-foreground mb-4">
          {MCP_TOOLS.length} tools registered with the server. Your AI can call any of these once
          connected.
        </p>
        <div className="rounded-xl border border-border/60 overflow-hidden">
          {MCP_TOOLS.map((tool, i) => (
            <div
              key={tool.name}
              className={`flex items-start gap-3 px-4 py-3 ${i !== MCP_TOOLS.length - 1 ? 'border-b border-border/40' : ''}`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-green-500/80 mt-1.5 shrink-0" />
              <div>
                <code className="text-[12px] font-mono font-medium text-foreground">
                  {tool.name}
                </code>
                <p className="text-xs text-muted-foreground mt-0.5">{tool.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
