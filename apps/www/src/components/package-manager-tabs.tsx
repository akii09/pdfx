import { useState } from 'react';
import { cn } from '../lib/utils';
import { CopyButton } from './copy-button';

type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun';

interface PackageManagerTabsProps {
  command: string;
  className?: string;
}

const managers: PackageManager[] = ['npm', 'pnpm', 'yarn', 'bun'];

function getCommand(base: string, pm: PackageManager): string {
  if (base.startsWith('npx ')) {
    const rest = base.slice(4);
    switch (pm) {
      case 'npm':
        return `npx ${rest}`;
      case 'pnpm':
        return `pnpm dlx ${rest}`;
      case 'yarn':
        return `yarn dlx ${rest}`;
      case 'bun':
        return `bunx ${rest}`;
    }
  }
  return base;
}

export function PackageManagerTabs({ command, className }: PackageManagerTabsProps) {
  const [active, setActive] = useState<PackageManager>('npm');
  const displayCommand = getCommand(command, active);

  return (
    <div className={cn('rounded-lg border overflow-hidden', className)}>
      <div className="flex items-center gap-0 border-b bg-muted/40 px-1 pt-1">
        {managers.map((pm) => (
          <button
            key={pm}
            type="button"
            onClick={() => setActive(pm)}
            className={cn(
              'relative px-4 py-2 text-sm font-medium rounded-t-md transition-all',
              active === pm
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {pm}
          </button>
        ))}
      </div>
      <div className="relative">
        <pre className="overflow-x-auto p-4 bg-zinc-950 text-zinc-100 text-sm font-mono leading-relaxed">
          <code>{displayCommand}</code>
        </pre>
        <CopyButton
          value={displayCommand}
          className="absolute right-2 top-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
        />
      </div>
    </div>
  );
}
