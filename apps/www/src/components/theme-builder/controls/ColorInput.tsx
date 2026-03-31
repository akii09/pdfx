import { useEffect, useRef, useState } from 'react';
import { cn } from '../../../lib/utils';

interface ColorInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  description?: string;
}

function isValidHex(value: string): boolean {
  return /^#[0-9a-fA-F]{6}$/.test(value);
}

/**
 * Color picker with a clickable swatch and a synced hex text input.
 * The native color picker opens when the swatch is clicked.
 */
export function ColorInput({ label, value, onChange, description }: ColorInputProps) {
  const [text, setText] = useState(value);
  const [open, setOpen] = useState(false);
  const pickerRef = useRef<HTMLInputElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Keep local text in sync when value changes externally
  useEffect(() => {
    setText(value);
  }, [value]);

  // Close popover on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  function handleTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    setText(raw);
    const normalized = raw.startsWith('#') ? raw : `#${raw}`;
    if (isValidHex(normalized)) {
      onChange(normalized);
    }
  }

  function handleTextBlur() {
    // Restore to last valid value if input is incomplete
    if (!isValidHex(text)) {
      setText(value);
    }
  }

  function handlePickerChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value);
    setText(e.target.value);
  }

  return (
    <div className="flex items-center justify-between gap-3 py-1.5">
      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground leading-none">{label}</p>
        {description && (
          <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">{description}</p>
        )}
      </div>

      <div className="flex items-center gap-2 shrink-0" ref={popoverRef}>
        {/* Swatch button */}
        <button
          type="button"
          onClick={() => {
            setOpen(!open);
            pickerRef.current?.click();
          }}
          className="h-7 w-7 rounded-md border border-border shadow-sm shrink-0 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          style={{ backgroundColor: isValidHex(value) ? value : '#ffffff' }}
          aria-label={`Pick color for ${label}`}
          title={value}
        />

        {/* Hidden native color picker */}
        <input
          ref={pickerRef}
          type="color"
          value={isValidHex(value) ? value : '#ffffff'}
          onChange={handlePickerChange}
          className="sr-only"
          tabIndex={-1}
          aria-hidden="true"
        />

        {/* Hex text input */}
        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          onBlur={handleTextBlur}
          spellCheck={false}
          maxLength={7}
          className={cn(
            'w-[84px] h-7 rounded-md border bg-muted/50 px-2 font-mono text-xs text-foreground',
            'focus:outline-none focus-visible:ring-1 focus-visible:ring-ring transition-colors',
            !isValidHex(text) && 'border-destructive/70 text-destructive'
          )}
          aria-label={`Hex value for ${label}`}
        />
      </div>
    </div>
  );
}
