import { cn } from '../../../lib/utils';

interface SegmentedControlOption<T extends string> {
  value: T;
  label: string;
}

interface SegmentedControlProps<T extends string> {
  label?: string;
  options: SegmentedControlOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

/**
 * Horizontal pill-style segmented control for selecting one option from a small set.
 */
export function SegmentedControl<T extends string>({
  label,
  options,
  value,
  onChange,
}: SegmentedControlProps<T>) {
  return (
    <div className="py-1.5">
      {label && <p className="text-sm font-medium text-foreground leading-none mb-2">{label}</p>}
      <div
        aria-label={label}
        className="inline-flex rounded-lg border border-border bg-muted/50 p-0.5 gap-0.5 w-full"
      >
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={value === option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              'flex-1 rounded-md px-2 py-1 text-xs font-medium transition-all duration-150',
              'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
              value === option.value
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
