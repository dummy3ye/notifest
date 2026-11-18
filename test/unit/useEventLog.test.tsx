import { describe, expect, it } from "bun:test";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { useEventLog } from "../../src/hooks";
import type { LogEntry, Logger } from "../../src/types";

let currentEntries: LogEntry[] = [];
let addFn: Logger = () => {};
let clearFn: () => void = () => {};

function EventLogHarness() {
  const { entries, add, clear } = useEventLog();
  currentEntries = entries;
  addFn = add;
  clearFn = clear;
  return null;
}

describe("useEventLog hook", () => {
  it("initializes empty and correctly manages log entries", () => {
    const container = document.createElement("div");
    const root = createRoot(container);

    act(() => {
      root.render(<EventLogHarness />);
    });

    expect(currentEntries).toEqual([]);

    act(() => {
      addFn("Standard event");
    });

    expect(currentEntries.length).toBe(1);
    expect(currentEntries[0]?.message).toBe("Standard event");
    expect(currentEntries[0]?.error).toBe(false);

    act(() => {
      addFn("Error occurred", true);
    });

    expect(currentEntries.length).toBe(2);
    expect(currentEntries[0]?.message).toBe("Error occurred");
    expect(currentEntries[0]?.error).toBe(true);
    expect(currentEntries[1]?.message).toBe("Standard event");

    act(() => {
      clearFn();
    });

    expect(currentEntries.length).toBe(0);

    act(() => {
      root.unmount();
    });
  });
});
