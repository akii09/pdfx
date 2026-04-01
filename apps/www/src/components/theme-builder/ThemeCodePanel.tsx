import type { PdfxTheme } from '@pdfx/shared';
import { Check, ChevronDown, ChevronUp, Copy, Download } from 'lucide-react';
import { useCallback, useState } from 'react';
import type { PresetName } from '../../lib/theme-code-generator';
import { generateDeltaCode, generateThemeCode } from '../../lib/theme-code-generator';
import { cn } from '../../lib/utils';
import { CodeBlock } from '../code-block';

type CodeTab = 'full' | 'delta';

interface ThemeCodePanelProps {
  theme: PdfxTheme;
  basePreset: PresetName;
}

export function ThemeCodePanel({ theme, basePreset }: ThemeCodePanelProps) {
  const [tab, setTab] = useState<CodeTab>('full');
  const [collapsed, setCollapsed] = useState(false);
  const [copied, setCopied] = useState(false);

  const code = tab === 'full' ? generateThemeCode(theme) : generateDeltaCode(theme, basePreset);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  function handleDownload() {
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pdfx-theme.ts';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 100);
  }

  return (
    <div className="border-t border-border bg-background shrink-0">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/60">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
          >
            {collapsed ? (
              <ChevronUp className="h-3.5 w-3.5" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5" />
            )}
            Generated Code
          </button>
          {!collapsed && (
            <div className="flex rounded-md border border-border overflow-hidden bg-muted/50 ml-2">
              <button
                type="button"
                onClick={() => setTab('full')}
                className={cn(
                  'px-3 py-1 text-xs font-medium transition-colors',
                  tab === 'full'
                    ? 'bg-background text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                Full Theme
              </button>
              <button
                type="button"
                onClick={() => setTab('delta')}
                className={cn(
                  'px-3 py-1 text-xs font-medium transition-colors border-l border-border',
                  tab === 'delta'
                    ? 'bg-background text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                Delta from {basePreset}
              </button>
            </div>
          )}
        </div>
        {!collapsed && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all',
                copied
                  ? 'bg-success/10 text-success border border-success/30'
                  : 'border border-border hover:bg-muted text-muted-foreground hover:text-foreground'
              )}
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  Copy
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all',
                'bg-primary text-primary-foreground hover:bg-primary/90'
              )}
            >
              <Download className="h-3.5 w-3.5" />
              Download .ts
            </button>
          </div>
        )}
      </div>
      {!collapsed && (
        <div className="h-52 overflow-auto">
          <CodeBlock
            code={code}
            language="typescript"
            filename="pdfx-theme.ts"
            className="rounded-none border-0 h-full"
          />
        </div>
      )}
    </div>
  );
}
