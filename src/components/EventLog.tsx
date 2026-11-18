import type { LogEntry } from "../types";

interface Props {
  entries: LogEntry[];
  onClear: () => void;
}

export function EventLog({ entries, onClear }: Props) {
  return (
    <section className="log">
      <h2>log</h2>
      {entries.length === 0 ? (
        <div>nothing yet.</div>
      ) : (
        entries.map((e) => (
          <div key={e.id} className={e.error ? "err" : undefined}>
            <span>{e.time}</span>
            <span>{e.message}</span>
          </div>
        ))
      )}
      <button className="link clear" onClick={onClear}>
        clear
      </button>
    </section>
  );
}
