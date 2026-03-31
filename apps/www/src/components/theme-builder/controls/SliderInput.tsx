interface SliderInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
  description?: string;
}

/**
 * Labeled range slider with a clearly split filled/unfilled track.
 *
 * The filled portion (left of thumb) uses a solid foreground color so it's
 * instantly distinguishable from the unfilled remainder in both light and dark
 * themes — no hsl() wrapping needed, just direct CSS custom properties.
 */
export function SliderInput({
  label,
  value,
  min,
  max,
  step = 1,
  unit = 'pt',
  onChange,
  description,
}: SliderInputProps) {
  const percent = ((value - min) / (max - min)) * 100;

  /*
   * Track gradient:
   *   filled  → var(--foreground)  = near-black (light) / near-white (dark)
   *   unfilled → 18% opacity of foreground blended toward background
   *              achieved via color-mix(), supported in all evergreen browsers
   */
  const trackStyle: React.CSSProperties = {
    background: `linear-gradient(
      to right,
      var(--foreground) 0%,
      var(--foreground) ${percent}%,
      color-mix(in oklab, var(--foreground) 18%, var(--background)) ${percent}%,
      color-mix(in oklab, var(--foreground) 18%, var(--background)) 100%
    )`,
  };

  return (
    <div className="py-1.5">
      <div className="flex items-center justify-between mb-2">
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground leading-none">{label}</p>
          {description && (
            <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">{description}</p>
          )}
        </div>
        <span className="text-xs font-mono font-semibold text-foreground tabular-nums shrink-0 ml-3 bg-muted rounded px-1.5 py-0.5">
          {value}
          {unit}
        </span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={trackStyle}
        className={[
          'w-full h-2 rounded-full appearance-none cursor-pointer',
          // webkit thumb
          '[&::-webkit-slider-thumb]:appearance-none',
          '[&::-webkit-slider-thumb]:h-[18px]',
          '[&::-webkit-slider-thumb]:w-[18px]',
          '[&::-webkit-slider-thumb]:rounded-full',
          '[&::-webkit-slider-thumb]:bg-background',
          '[&::-webkit-slider-thumb]:border-[2.5px]',
          '[&::-webkit-slider-thumb]:border-foreground',
          '[&::-webkit-slider-thumb]:shadow-sm',
          '[&::-webkit-slider-thumb]:cursor-grab',
          '[&::-webkit-slider-thumb]:transition-transform',
          '[&::-webkit-slider-thumb]:hover:scale-110',
          '[&::-webkit-slider-thumb]:active:scale-95',
          '[&::-webkit-slider-thumb]:active:cursor-grabbing',
          // firefox thumb
          '[&::-moz-range-thumb]:h-[18px]',
          '[&::-moz-range-thumb]:w-[18px]',
          '[&::-moz-range-thumb]:rounded-full',
          '[&::-moz-range-thumb]:bg-background',
          '[&::-moz-range-thumb]:border-[2.5px]',
          '[&::-moz-range-thumb]:border-solid',
          '[&::-moz-range-thumb]:border-foreground',
          '[&::-moz-range-thumb]:cursor-grab',
          // focus
          'focus-visible:outline-none',
          'focus-visible:[&::-webkit-slider-thumb]:ring-2',
          'focus-visible:[&::-webkit-slider-thumb]:ring-ring',
          'focus-visible:[&::-webkit-slider-thumb]:ring-offset-1',
        ].join(' ')}
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
      />
    </div>
  );
}
