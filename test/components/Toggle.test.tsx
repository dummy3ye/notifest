import { describe, expect, it } from "bun:test";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { Toggle } from "../../src/components/ui/Toggle";

describe("Toggle component", () => {
  it("renders with correct aria-pressed and label", () => {
    let active = false;
    const container = document.createElement("div");
    const root = createRoot(container);

    act(() => {
      root.render(
        <Toggle
          label="require interaction"
          on={active}
          onChange={(val) => {
            active = val;
          }}
        />,
      );
    });

    const button = container.querySelector("button");
    expect(button).not.toBeNull();
    expect(button?.getAttribute("aria-pressed")).toBe("false");
    expect(button?.textContent).toBe("require interaction");

    act(() => {
      button?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(active).toBe(true);

    act(() => {
      root.unmount();
    });
  });
});
