export interface PropDefinition {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
  required?: boolean;
}

interface PropsTableProps {
  props: PropDefinition[];
}

export function PropsTable({ props }: PropsTableProps) {
  if (!props || props.length === 0) return null;

  return (
    <div className="overflow-x-auto rounded-xl border border-border/60 bg-card shadow-sm w-full">
      <table className="w-full text-sm text-left min-w-[700px]">
        <thead>
          <tr className="border-b border-border/40 bg-zinc-50/50 dark:bg-zinc-900/20">
            <th className="px-5 py-3.5 font-medium text-foreground whitespace-nowrap w-[20%]">
              Prop
            </th>
            <th className="px-5 py-3.5 font-medium text-foreground whitespace-nowrap w-[25%]">
              Type
            </th>
            <th className="px-5 py-3.5 font-medium text-foreground whitespace-nowrap w-[15%]">
              Default
            </th>
            <th className="px-5 py-3.5 font-medium text-foreground w-[40%]">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/40">
          {props.map((prop) => (
            <tr key={prop.name} className="transition-colors hover:bg-muted/30">
              <td className="px-5 py-4 align-top">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-mono text-[13px] font-semibold text-foreground">
                    {prop.name}
                  </span>
                  {prop.required && (
                    <span className="inline-flex items-center rounded-full bg-destructive/10 px-1.5 py-0.5 text-[10px] font-medium text-destructive ring-1 ring-inset ring-destructive/20">
                      Required
                    </span>
                  )}
                </div>
              </td>
              <td className="px-5 py-4 align-top">
                <div className="inline-flex rounded-md bg-blue-500/10 dark:bg-blue-500/15 px-2 py-1 max-w-full">
                  <span className="font-mono text-[12px] text-blue-700 dark:text-blue-300 break-words leading-relaxed">
                    {prop.type}
                  </span>
                </div>
              </td>
              <td className="px-5 py-4 align-top">
                {prop.defaultValue && prop.defaultValue !== "''" && prop.defaultValue !== '...' ? (
                  <span className="inline-flex rounded-md bg-muted px-2 py-1 font-mono text-[12px] text-muted-foreground whitespace-nowrap">
                    {prop.defaultValue}
                  </span>
                ) : (
                  <span className="text-muted-foreground/40 font-medium">—</span>
                )}
              </td>
              <td className="px-5 py-4 align-top text-muted-foreground leading-relaxed text-[13.5px]">
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
