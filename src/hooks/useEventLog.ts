import { useCallback, useRef, useState } from "react";
import type { LogEntry, Logger } from "../types";

export function useEventLog() {
  const [entries, setEntries] = useState<LogEntry[]>([]);
  const nextId = useRef(0);

  const add: Logger = useCallback((message, error = false) => {
    const time = new Date().toLocaleTimeString([], { hour12: false });
    setEntries((prev) => [{ id: nextId.current++, time, message, error }, ...prev]);
  }, []);

  const clear = useCallback(() => setEntries([]), []);

  return { entries, add, clear };
}
