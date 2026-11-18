import { describe, expect, it } from "bun:test";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { EventLog } from "../../src/components/notifications/EventLog";
import type { LogEntry } from "../../src/types";

describe("EventLog component", () => {
  it("renders empty state message when entries are empty", () => {
    const container = document.createElement("div");
    const root = createRoot(container);

    act(() => {
      root.render(<EventLog entries={[]} onClear={() => {}} />);
    });

    expect(container.textContent).toContain("nothing yet.");

    act(() => {
      root.unmount();
    });
  });

  it("renders list of log entries and highlights errors", () => {
    const entries: LogEntry[] = [
      { id: 1, time: "12:00:01", message: "Initial start", error: false },
      { id: 2, time: "12:00:05", message: "Failed request", error: true },
    ];
    let cleared = false;

    const container = document.createElement("div");
    const root = createRoot(container);

    act(() => {
      root.render(
        <EventLog
          entries={entries}
          onClear={() => {
            cleared = true;
          }}
        />,
      );
    });

    expect(container.textContent).toContain("Initial start");
    expect(container.textContent).toContain("Failed request");

    const errorDiv = container.querySelector(".err");
    expect(errorDiv).not.toBeNull();
    expect(errorDiv?.textContent).toContain("Failed request");

    const clearButton = container.querySelector("button.clear");
    act(() => {
      clearButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(cleared).toBe(true);

    act(() => {
      root.unmount();
    });
  });
});
