type CompassMarkProps = { compact?: boolean };

export function CompassMark({ compact = false }: CompassMarkProps) {
  return (
    <span className={compact ? 'compass-mark compass-mark--compact' : 'compass-mark'} aria-hidden="true">
      <span className="compass-mark__needle" />
      <span className="compass-mark__dot" />
    </span>
  );
}