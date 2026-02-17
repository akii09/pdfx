import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '../lib/utils';

export interface DropDownOption<T = string> {
  value: T;
  label: string;
}

interface DropDownProps<T = string> {
  options: DropDownOption<T>[];
  value: T;
  onChange: (value: T) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export default function DropDown<T = string>({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  className,
  disabled = false,
}: DropDownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
    return undefined;
  }, [isOpen]);

  const handleSelect = (option: DropDownOption<T>) => {
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={cn('relative inline-block', className)}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          'inline-flex items-center justify-between gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
          'bg-background border border-border hover:bg-muted',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1',
          disabled && 'opacity-50 cursor-not-allowed hover:bg-background',
          isOpen && 'bg-muted'
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="text-foreground">{selectedOption?.label || placeholder}</span>
        <ChevronDown
          className={cn(
            'h-4 w-4 text-muted-foreground transition-transform',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <div
          className={cn(
            'absolute right-0 mt-1.5 min-w-[160px] rounded-md border border-border bg-popover shadow-lg z-50',
            'animate-in fade-in-0 zoom-in-95'
          )}
          // biome-ignore lint/a11y/useSemanticElements: Custom dropdown provides better UX than native select
          role="listbox"
          tabIndex={-1}
        >
          <div className="py-1">
            {options.map((option) => (
              <button
                key={String(option.value)}
                type="button"
                onClick={() => handleSelect(option)}
                className={cn(
                  'w-full text-left px-3 py-2 text-sm transition-colors',
                  'hover:bg-accent hover:text-accent-foreground',
                  'focus:bg-accent focus:text-accent-foreground focus:outline-none',
                  option.value === value && 'bg-accent/50 font-medium'
                )}
                // biome-ignore lint/a11y/useSemanticElements: Custom option provides enhanced interactions
                role="option"
                aria-selected={option.value === value}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
