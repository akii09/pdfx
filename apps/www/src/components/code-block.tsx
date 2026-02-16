import { cn } from '../lib/utils';
import { CopyButton } from './copy-button';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
}

export function CodeBlock({ code, language = 'tsx', filename, className }: CodeBlockProps) {
  return (
    <div className={cn('relative rounded-lg border overflow-hidden', className)}>
      {filename && (
        <div className="flex items-center justify-between border-b px-4 py-2.5 bg-muted/40">
          <span className="text-sm text-muted-foreground font-mono">{filename}</span>
          <CopyButton
            value={code}
            className="text-muted-foreground hover:text-foreground hover:bg-accent"
          />
        </div>
      )}
      <div className="relative">
        {!filename && (
          <CopyButton
            value={code}
            className="absolute right-2 top-2 z-10 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
          />
        )}
        <pre className="overflow-x-auto p-4 bg-zinc-950 text-zinc-100 text-sm font-mono leading-relaxed">
          <code data-language={language}>{code}</code>
        </pre>
      </div>
    </div>
  );
}
