interface ChipProps {
  label: string;
  selected: boolean;
  onSelect: () => void;
}

/** Single-select pill used across the qualifier steps. */
export function Chip({ label, selected, onSelect }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`border px-4 py-3 text-left text-[13.5px] leading-snug transition-all duration-300 ${
        selected
          ? "border-gold bg-gold/10 text-ink shadow-[inset_0_0_0_1px_var(--color-gold)]"
          : "border-line bg-white text-muted hover:border-ink/35 hover:text-ink"
      }`}
    >
      {label}
    </button>
  );
}
