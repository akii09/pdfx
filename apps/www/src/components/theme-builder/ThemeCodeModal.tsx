import type { PdfxTheme } from '@pdfx/shared';
import { Check, Code2, Copy, Download, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { PresetName } from '../../lib/theme-code-generator';
import { generateDeltaCode, generateThemeCode } from '../../lib/theme-code-generator';
import { cn } from '../../lib/utils';
import { CodeBlock } from '../code-block';

type CodeTab = 'full' | 'delta';

interface ThemeCodeModalProps {
  theme: PdfxTheme;
  basePreset: PresetName;
  open: boolean;
  onClose: () => void;
}

export function ThemeCodeModal({ theme, basePreset, open, onClose }: ThemeCodeModalProps) {
  const [tab, setTab] = useState<CodeTab>('full');
  const [copied, setCopied] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const code = tab === 'full' ? generateThemeCode(theme) : generateDeltaCode(theme, basePreset);
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

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

  if (!open) return null;

  return (
    /* Backdrop */
    <dialog
      open
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-transparent border-0 m-0 max-w-none w-full h-full"
      aria-label="Generated theme code"
    >
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => e.key === 'Escape' && onClose()}
        aria-hidden="true"
      />
      <div className="relative z-10 w-full max-w-3xl rounded-xl border border-border bg-background shadow-2xl flex flex-col overflow-hidden max-h-[85vh]">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
              <Code2 className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-foreground">Generated Theme Code</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Copy into{' '}
                <code className="font-mono text-[10px] bg-muted rounded px-1 py-0.5">
                  src/lib/pdfx-theme.ts
                </code>{' '}
                in your project
              </p>
            </div>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex items-center justify-between px-5 py-2.5 border-b border-border/60 bg-muted/30 shrink-0">
          <div className="flex rounded-lg border border-border overflow-hidden bg-background">
            <button
              type="button"
              onClick={() => setTab('full')}
              className={cn(
                'px-3.5 py-1.5 text-xs font-medium transition-colors',
                tab === 'full'
                  ? 'bg-foreground text-background'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              Full Theme
            </button>
            <button
              type="button"
              onClick={() => setTab('delta')}
              className={cn(
                'px-3.5 py-1.5 text-xs font-medium border-l border-border transition-colors',
                tab === 'delta'
                  ? 'bg-foreground text-background'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              Delta from <span className="capitalize">{basePreset}</span>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all',
                copied
                  ? 'bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/30'
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
              className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              Download .ts
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-auto min-h-0">
          <CodeBlock
            code={code}
            language="typescript"
            filename="pdfx-theme.ts"
            className="rounded-none border-0 h-full"
          />
        </div>
        <div className="px-5 py-3 border-t border-border/60 bg-muted/20 shrink-0">
          <p className="text-[11px] text-muted-foreground">
            <strong className="text-foreground/70">Tip:</strong> Use the{' '}
            <strong className="font-mono text-foreground/70">Delta</strong> tab if you only changed
            a few values — it shows a minimal override to merge with your base preset.
          </p>
        </div>
      </div>
    </dialog>
  );
}
