import { describe, expect, it } from "bun:test";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { App } from "../../src/App";

describe("App integration", () => {
  it("renders complete application shell with interactive elements", () => {
    const container = document.createElement("div");
    const root = createRoot(container);

    act(() => {
      root.render(<App />);
    });

    expect(container.querySelector("h1")?.textContent).toContain("does it");
    expect(container.querySelector("nav")?.textContent).toContain("notifest");
    expect(container.querySelector("footer")?.textContent).toContain("sagittarius");
    expect(container.querySelector("section.log")?.textContent).toContain("log");

    act(() => {
      root.unmount();
    });
  });
});
