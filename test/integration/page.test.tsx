import { describe, expect, it } from "bun:test";
import { act } from "react";
import { createRoot } from "react-dom/client";
import HomePage from "../../app/page";

describe("HomePage page entrypoint", () => {
  it("renders page with client boundary", () => {
    const container = document.createElement("div");
    const root = createRoot(container);

    act(() => {
      root.render(<HomePage />);
    });

    expect(container.querySelector("h1")?.textContent).toContain("does it");
    expect(container.querySelector("button.send")).not.toBeNull();

    act(() => {
      root.unmount();
    });
  });
});
