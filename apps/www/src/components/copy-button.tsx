import { Check, Copy } from 'lucide-react';
import { useCallback, useState } from 'react';
import { cn } from '../lib/utils';

interface CopyButtonProps {
  value: string;
  className?: string;
  onCopy?: (value: string) => void;
}

export function CopyButton({ value, className, onCopy }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    onCopy?.(value);
    setTimeout(() => setCopied(false), 2000);
  }, [value, onCopy]);

  return (
    <>
      <button
        type="button"
        onClick={handleCopy}
        className={cn(
          'inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors',
          className
        )}
        aria-label={copied ? 'Copied' : 'Copy to clipboard'}
        aria-pressed={copied}
      >
        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
      </button>
      {copied && (
        <output className="sr-only" aria-live="polite">
          Copied to clipboard
        </output>
      )}
    </>
  );
}
