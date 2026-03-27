import { Highlight, themes } from 'prism-react-renderer';
import '../lib/prism-languages';
import { useMemo } from 'react';
import { cn } from '../lib/utils';
import { CopyButton } from './copy-button';

interface CodeBlockProps {
  code: string;
  /** If provided, the copy button copies this value instead of the displayed code */
  copyValue?: string;
  language?: string;
  /** Backward-compatible alias for language */
  lang?: string;
  filename?: string;
  className?: string;
}

const theme = themes.oneDark;

export function CodeBlock({
  code,
  copyValue,
  language,
  lang,
  filename,
  className,
}: CodeBlockProps) {
  const resolvedLanguage = language ?? lang ?? 'tsx';

  const languageForHighlight = useMemo(() => {
    if (resolvedLanguage === 'bash' || resolvedLanguage === 'sh' || resolvedLanguage === 'shell')
      return 'bash';
    if (resolvedLanguage === 'ts' || resolvedLanguage === 'typescript') return 'typescript';
    return resolvedLanguage;
  }, [resolvedLanguage]);

  return (
    <div
      className={cn(
        'relative rounded-lg border border-border overflow-hidden',
        'bg-[#282c34]',
        className
      )}
    >
      {filename && (
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 bg-black/30">
          <span className="text-sm text-zinc-400 font-mono">{filename}</span>
          <CopyButton
            value={copyValue ?? code}
            className="text-zinc-400 hover:text-zinc-100 hover:bg-white/10 rounded-md p-1.5 transition-colors"
          />
        </div>
      )}
      <div className="relative">
        {!filename && (
          <CopyButton
            value={copyValue ?? code}
            className="absolute right-3 top-3 z-10 text-zinc-400 hover:text-zinc-100 hover:bg-white/10 rounded-md p-1.5 transition-colors"
          />
        )}
        <Highlight theme={theme} code={code.trim()} language={languageForHighlight}>
          {({ className: preClassName, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={cn(
                preClassName,
                'overflow-x-auto p-4 text-sm font-mono leading-relaxed',
                filename ? 'pt-4' : 'pt-4'
              )}
              style={style}
            >
              {tokens.map((line, lineIndex) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: Prism tokens are static, order never changes
                <div key={lineIndex} {...getLineProps({ line })}>
                  {line.map((token, tokenIndex) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: Prism tokens are static, order never changes
                    <span key={tokenIndex} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
}
