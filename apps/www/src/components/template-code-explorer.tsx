import { useMemo, useState } from 'react';
import { cn } from '../lib/utils';
import { CodeBlock } from './code-block';

export interface TemplateCodeFile {
  path: string;
  content: string;
  language?: string;
}

interface TemplateCodeExplorerProps {
  files: TemplateCodeFile[];
  className?: string;
  initialPath?: string;
}

function inferLanguage(path: string): string {
  if (path.endsWith('.tsx')) return 'tsx';
  if (path.endsWith('.ts')) return 'ts';
  if (path.endsWith('.json')) return 'json';
  if (path.endsWith('.md')) return 'markdown';
  return 'tsx';
}

function parsePath(filePath: string): { folder: string; filename: string } {
  const idx = filePath.lastIndexOf('/');
  if (idx === -1) return { folder: '', filename: filePath };
  return { folder: filePath.slice(0, idx), filename: filePath.slice(idx + 1) };
}

// ── Tree Node Structure ─────────────────────────────────────────────────────

interface TreeNode {
  name: string;
  fullPath: string;
  children: Map<string, TreeNode>;
  files: TemplateCodeFile[];
}

function createTreeNode(name: string, fullPath: string): TreeNode {
  return { name, fullPath, children: new Map(), files: [] };
}

function buildFileTree(files: TemplateCodeFile[]): TreeNode {
  const root = createTreeNode('', '');

  for (const file of files) {
    const { folder } = parsePath(file.path);

    if (!folder) {
      // Root-level file
      root.files.push(file);
    } else {
      // Navigate/create path in tree
      const parts = folder.split('/');
      let current = root;
      let pathSoFar = '';

      for (const part of parts) {
        pathSoFar = pathSoFar ? `${pathSoFar}/${part}` : part;
        if (!current.children.has(part)) {
          current.children.set(part, createTreeNode(part, pathSoFar));
        }
        const next = current.children.get(part);
        if (next) current = next;
      }

      current.files.push(file);
    }
  }

  return root;
}

function sortTreeNodes(nodes: TreeNode[]): TreeNode[] {
  return nodes.sort((a, b) => {
    // Templates before components
    const aIsTemplate = a.fullPath.startsWith('templates/');
    const bIsTemplate = b.fullPath.startsWith('templates/');
    if (aIsTemplate && !bIsTemplate) return -1;
    if (!aIsTemplate && bIsTemplate) return 1;
    return a.name.localeCompare(b.name);
  });
}

// ── Tree Renderer Component ────────────────────────────────────────────────

function TreeNodeRenderer({
  node,
  depth,
  activePath,
  onSelect,
  expandedPaths,
  onToggle,
}: {
  node: TreeNode;
  depth: number;
  activePath: string;
  onSelect: (path: string) => void;
  expandedPaths: Set<string>;
  onToggle: (path: string) => void;
}) {
  const isExpanded = expandedPaths.has(node.fullPath);
  const sortedChildren = sortTreeNodes([...node.children.values()]);
  const paddingLeft = depth * 12 + 8;

  return (
    <>
      {/* Folder header (skip root) */}
      {node.name && (
        <button
          type="button"
          onClick={() => onToggle(node.fullPath)}
          className="w-full flex items-center gap-1 pt-1.5 pb-0.5 hover:bg-accent/30 rounded transition-colors"
          style={{ paddingLeft }}
        >
          <ChevronIcon expanded={isExpanded} />
          <FolderIcon />
          <span
            className="font-mono text-[11px] text-muted-foreground/80 truncate"
            title={node.fullPath}
          >
            {node.name}/
          </span>
        </button>
      )}

      {/* Files at this level */}
      {(isExpanded || !node.name) &&
        node.files.map((file) => {
          const selected = file.path === activePath;
          const { filename } = parsePath(file.path);
          const filePadding = node.name ? paddingLeft + 16 : paddingLeft;
          return (
            <button
              key={file.path}
              type="button"
              onClick={() => onSelect(file.path)}
              className={cn(
                'w-full text-left rounded-md font-mono text-[12px] leading-snug transition-colors flex items-center gap-1.5 py-1 pr-2',
                selected
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
              )}
              style={{ paddingLeft: filePadding }}
              title={file.path}
            >
              <FileIcon selected={selected} />
              <span className="truncate">{filename}</span>
            </button>
          );
        })}

      {/* Child folders (recursive) */}
      {(isExpanded || !node.name) &&
        sortedChildren.map((child) => (
          <TreeNodeRenderer
            key={child.fullPath}
            node={child}
            depth={node.name ? depth + 1 : depth}
            activePath={activePath}
            onSelect={onSelect}
            expandedPaths={expandedPaths}
            onToggle={onToggle}
          />
        ))}
    </>
  );
}

export function TemplateCodeExplorer({ files, className, initialPath }: TemplateCodeExplorerProps) {
  const ordered = useMemo(() => [...files].sort((a, b) => a.path.localeCompare(b.path)), [files]);

  const initial =
    initialPath && ordered.some((f) => f.path === initialPath)
      ? initialPath
      : (ordered[0]?.path ?? '');

  const [activePath, setActivePath] = useState(initial);

  // Build initial expanded paths - expand folders containing initial file + top-level folders
  const initialExpandedPaths = useMemo(() => {
    const paths = new Set<string>();
    // Expand path to initial file
    if (initial) {
      const { folder } = parsePath(initial);
      if (folder) {
        const parts = folder.split('/');
        let pathSoFar = '';
        for (const part of parts) {
          pathSoFar = pathSoFar ? `${pathSoFar}/${part}` : part;
          paths.add(pathSoFar);
        }
      }
    }
    // Also expand top-level template folders
    for (const file of ordered) {
      const { folder } = parsePath(file.path);
      if (folder) {
        const firstPart = folder.split('/')[0];
        if (firstPart.startsWith('templates')) {
          paths.add(firstPart);
          // Expand second level for templates
          const parts = folder.split('/');
          if (parts.length >= 2) {
            paths.add(`${parts[0]}/${parts[1]}`);
            if (parts.length >= 3) {
              paths.add(`${parts[0]}/${parts[1]}/${parts[2]}`);
            }
          }
        }
      }
    }
    return paths;
  }, [initial, ordered]);

  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(initialExpandedPaths);

  const activeFile = ordered.find((file) => file.path === activePath) ?? ordered[0];

  const tree = useMemo(() => buildFileTree(ordered), [ordered]);

  const handleToggle = (path: string) => {
    setExpandedPaths((prev) => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  };

  if (!activeFile) {
    return (
      <div
        className={cn(
          'rounded-xl border border-border bg-muted/30 p-4 text-sm text-muted-foreground',
          className
        )}
      >
        No files available.
      </div>
    );
  }

  return (
    <div
      className={cn(
        'grid grid-cols-[260px_minmax(0,1fr)] rounded-xl border border-border overflow-hidden',
        className
      )}
    >
      {/* ── File tree ──────────────────────────────────────────────── */}
      <div className="border-r border-border bg-card/80 flex flex-col min-h-0">
        <div className="px-3 py-2 border-b border-border text-[11px] font-medium uppercase tracking-wider text-muted-foreground shrink-0">
          Files
        </div>
        <div className="overflow-auto flex-1 py-1.5">
          <TreeNodeRenderer
            node={tree}
            depth={0}
            activePath={activePath}
            onSelect={setActivePath}
            expandedPaths={expandedPaths}
            onToggle={handleToggle}
          />
        </div>
      </div>

      {/* ── Code panel ─────────────────────────────────────────────── */}
      <CodeBlock
        code={activeFile.content}
        filename={activeFile.path}
        language={activeFile.language ?? inferLanguage(activeFile.path)}
        className="rounded-none border-0 max-h-[70vh] overflow-auto"
      />
    </div>
  );
}

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      aria-hidden="true"
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        'shrink-0 text-muted-foreground/50 transition-transform',
        expanded ? 'rotate-90' : 'rotate-0'
      )}
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg
      aria-hidden="true"
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 text-muted-foreground/50"
    >
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function FileIcon({ selected }: { selected: boolean }) {
  return (
    <svg
      aria-hidden="true"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        'shrink-0',
        selected ? 'text-accent-foreground/70' : 'text-muted-foreground/40'
      )}
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}
