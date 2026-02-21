import { ChevronDown } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { CodeBlock } from './code-block';
import { PackageManagerTabs } from './package-manager-tabs';

const PREVIEW_LINES = 12;

type InstallMethod = 'command' | 'manual';

interface RegistryFile {
  path: string;
  content: string;
}

interface RegistryItem {
  files: RegistryFile[];
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

function getFileName(filePath: string): string {
  return filePath.split('/').at(-1) ?? filePath;
}

function getLanguage(filePath: string): string {
  return filePath.endsWith('.tsx') ? 'tsx' : 'typescript';
}

export function InstallationTabs({
  installCommand,
  componentName,
  usageFilename,
  className,
}: InstallationTabsProps) {
  const [activeTab, setActiveTab] = useState<InstallMethod>('command');
  const [registryFiles, setRegistryFiles] = useState<RegistryFile[] | null>(null);
  const [selectedFileIdx, setSelectedFileIdx] = useState(0);
  const [registryData, setRegistryData] = useState<RegistryItem | null>(null);
  const [isLoadingManual, setIsLoadingManual] = useState(false);
  const [manualError, setManualError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const fetchManualCode = useCallback(async () => {
    if (registryFiles !== null) return;
    setIsLoadingManual(true);
    setManualError(null);
    try {
      const res = await fetch(`/r/${componentName}.json`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = (await res.json()) as RegistryItem;
      setRegistryData(data);
      if (!data.files?.length) throw new Error('No files');
      setRegistryFiles(data.files);
      setSelectedFileIdx(0);
    } catch {
      setManualError('Could not load component code from the registry.');
    } finally {
      setIsLoadingManual(false);
    }
  }, [componentName, registryFiles]);

  useEffect(() => {
    if (activeTab === 'manual') {
      fetchManualCode();
    }
  }, [activeTab, fetchManualCode]);

  const selectedFile = registryFiles?.[selectedFileIdx];
  const isMultiFile = (registryFiles?.length ?? 0) > 1;
  const hasMoreLines = selectedFile
    ? selectedFile.content.split('\n').length > PREVIEW_LINES
    : false;

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
          {registryData?.registryDependencies && registryData.registryDependencies.length > 0 && (
            <div className="rounded-lg border border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/20 p-4">
              <div className="flex items-start gap-3">
                <svg
                  className="h-5 w-5 text-amber-700 dark:text-amber-500 shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-label="Warning icon"
                  role="img"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <div className="space-y-1.5">
                  <p className="text-sm font-semibold text-amber-900 dark:text-amber-200">
                    Dependencies Required
                  </p>
                  <p className="text-sm text-amber-900 dark:text-amber-300">
                    This component requires:{' '}
                    {registryData.registryDependencies.map((dep, idx) => (
                      <span key={dep}>
                        <code className="rounded bg-amber-200/60 dark:bg-amber-900/40 px-1.5 py-0.5 font-mono text-xs font-semibold text-amber-950 dark:text-amber-100">
                          {dep}
                        </code>
                        {idx < (registryData.registryDependencies?.length ?? 0) - 1 && ', '}
                      </span>
                    ))}
                  </p>
                  <p className="text-xs text-amber-800 dark:text-amber-400">
                    Using CLI? Dependencies are installed automatically. Manual install? Copy all
                    required components.
                  </p>
                </div>
              </div>
            </div>
          )}

          <p className="text-sm text-muted-foreground">
            {isMultiFile ? (
              <>
                Save each file into your{' '}
                <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono font-semibold">
                  src/components/pdfx/
                </code>{' '}
                directory.
              </>
            ) : (
              <>
                Copy and paste the following code into{' '}
                <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono font-semibold">
                  {usageFilename}
                </code>
              </>
            )}
          </p>

          {/* File tab selector for multi-file components */}
          {isMultiFile && registryFiles && (
            <div className="flex items-center gap-1 flex-wrap">
              {registryFiles.map((file, idx) => (
                <button
                  key={file.path}
                  type="button"
                  onClick={() => {
                    setSelectedFileIdx(idx);
                    setIsExpanded(false);
                  }}
                  className={cn(
                    'px-3 py-1.5 text-xs font-mono font-medium rounded-md border transition-all',
                    selectedFileIdx === idx
                      ? 'bg-foreground text-background border-foreground'
                      : 'bg-background text-muted-foreground border-border hover:border-foreground/40 hover:text-foreground'
                  )}
                >
                  {getFileName(file.path)}
                </button>
              ))}
            </div>
          )}

          <div className="overflow-hidden rounded-lg border">
            {isLoadingManual ? (
              <div className="flex items-center justify-center p-8 text-sm text-muted-foreground">
                Loading...
              </div>
            ) : manualError ? (
              <div className="p-4 text-sm text-muted-foreground">{manualError}</div>
            ) : selectedFile ? (
              <>
                <div
                  className={cn(
                    'relative',
                    !isExpanded && hasMoreLines && 'max-h-[320px] overflow-hidden'
                  )}
                >
                  <CodeBlock
                    code={
                      isExpanded
                        ? selectedFile.content
                        : getCodePreview(selectedFile.content, PREVIEW_LINES)
                    }
                    copyValue={selectedFile.content}
                    language={getLanguage(selectedFile.path)}
                    filename={getFileName(selectedFile.path)}
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
