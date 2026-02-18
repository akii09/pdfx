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
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full min-w-[640px] text-sm">
        <colgroup>
          <col className="w-[140px]" />
          <col className="w-auto" />
          <col className="w-[100px]" />
          <col className="w-[40%]" />
        </colgroup>
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Prop</th>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Type</th>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Default</th>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr key={prop.name} className="border-b last:border-b-0">
              <td className="px-4 py-3 align-top">
                <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">
                  {prop.name}
                  {prop.required && <span className="text-destructive ml-0.5">*</span>}
                </code>
              </td>
              <td className="px-4 py-3 align-top">
                <code className="text-xs font-mono text-muted-foreground break-words">
                  {prop.type}
                </code>
              </td>
              <td className="px-4 py-3 align-top text-muted-foreground">
                {prop.defaultValue ? (
                  <code className="text-xs font-mono">{prop.defaultValue}</code>
                ) : (
                  <span className="text-xs">-</span>
                )}
              </td>
              <td className="px-4 py-3 align-top text-muted-foreground">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
