interface Props {
  label: string;
  on: boolean;
  onChange: (on: boolean) => void;
}

export function Toggle({ label, on, onChange }: Props) {
  return (
    <button type="button" className="toggle" aria-pressed={on} onClick={() => onChange(!on)}>
      {label}
    </button>
  );
}
