import { ChevronDown } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { CodeBlock } from './code-block';
import { PackageManagerTabs } from './package-manager-tabs';

const PREVIEW_LINES = 12;

type InstallMethod = 'command' | 'manual';

interface RegistryItem {
  files: Array<{ path: string; content: string }>;
  dependencies?: string[];
  registryDependencies?: string[];
}

interface InstallationTabsProps {
  installCommand: string;
  componentName: string;
  usageFilename: string;
  className?: string;
}

function getCodePreview(code: string, lines: number): string {
  return code.split('\n').slice(0, lines).join('\n');
}

export function InstallationTabs({
  installCommand,
  componentName,
  usageFilename,
  className,
}: InstallationTabsProps) {
  const [activeTab, setActiveTab] = useState<InstallMethod>('command');
  const [manualCode, setManualCode] = useState<string | null>(null);
  const [isLoadingManual, setIsLoadingManual] = useState(false);
  const [manualError, setManualError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const fetchManualCode = useCallback(async () => {
    if (manualCode !== null) return;
    setIsLoadingManual(true);
    setManualError(null);
    try {
      const res = await fetch(`/r/${componentName}.json`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = (await res.json()) as RegistryItem;
      const firstFile = data.files?.[0];
      if (!firstFile?.content) throw new Error('No content');
      setManualCode(firstFile.content);
    } catch {
      setManualError('Could not load component code from the registry.');
    } finally {
      setIsLoadingManual(false);
    }
  }, [componentName, manualCode]);

  useEffect(() => {
    if (activeTab === 'manual') {
      fetchManualCode();
    }
  }, [activeTab, fetchManualCode]);

  const hasMoreLines = manualCode ? manualCode.split('\n').length > PREVIEW_LINES : false;

  return (
    <div className={cn('rounded-lg border overflow-hidden', className)}>
      <div className="flex items-center gap-0 border-b bg-muted/40 px-1 pt-1">
        <button
          type="button"
          onClick={() => setActiveTab('command')}
          className={cn(
            'relative px-4 py-2 text-sm font-medium rounded-t-md transition-all',
            activeTab === 'command'
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          CLI
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('manual')}
          className={cn(
            'relative px-4 py-2 text-sm font-medium rounded-t-md transition-all',
            activeTab === 'manual'
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          Manual
        </button>
      </div>

      {activeTab === 'command' ? (
        <PackageManagerTabs
          command={installCommand}
          className="border-0 rounded-none shadow-none"
        />
      ) : (
        <div className="p-4 bg-background space-y-4">
          <p className="text-sm text-muted-foreground">
            Copy and paste the following code into{' '}
            <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono font-semibold">
              {usageFilename}
            </code>
          </p>

          <div className="overflow-hidden rounded-lg border">
            {isLoadingManual ? (
              <div className="flex items-center justify-center p-8 text-sm text-muted-foreground">
                Loading...
              </div>
            ) : manualError ? (
              <div className="p-4 text-sm text-muted-foreground">{manualError}</div>
            ) : manualCode ? (
              <>
                <div
                  className={cn(
                    'relative',
                    !isExpanded && hasMoreLines && 'max-h-[320px] overflow-hidden'
                  )}
                >
                  <CodeBlock
                    code={isExpanded ? manualCode : getCodePreview(manualCode, PREVIEW_LINES)}
                    copyValue={manualCode}
                    language="tsx"
                    filename={usageFilename}
                    className="border-0 rounded-none"
                  />
                  {!isExpanded && hasMoreLines && (
                    <div
                      className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
                      style={{
                        background: 'linear-gradient(to top, #282c34, transparent)',
                      }}
                    />
                  )}
                </div>
                {hasMoreLines && (
                  <button
                    type="button"
                    onClick={() => setIsExpanded((prev) => !prev)}
                    className="flex w-full items-center justify-center gap-2 border-t border-border bg-muted/30 py-3 text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
                  >
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 shrink-0 transition-transform',
                        isExpanded && 'rotate-180'
                      )}
                      aria-hidden
                    />
                    {isExpanded ? 'Collapse' : 'Expand'}
                  </button>
                )}
              </>
            ) : null}
          </div>

          <p className="text-xs text-muted-foreground">
            Not set up yet?{' '}
            <Link to="/docs#installation" className="text-foreground underline font-medium">
              Follow the installation guide
            </Link>{' '}
            to configure your project first.
          </p>
        </div>
      )}
    </div>
  );
}
