import { describe, expect, it } from "bun:test";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { AutoInput } from "../../src/components/ui/AutoInput";

describe("AutoInput component", () => {
  it("calculates size dynamically from value or placeholder", () => {
    const container = document.createElement("div");
    const root = createRoot(container);

    act(() => {
      root.render(<AutoInput value="long text string" placeholder="short" readOnly />);
    });

    const input = container.querySelector("input");
    expect(input).not.toBeNull();
    expect(input?.getAttribute("size")).toBe("16");
    expect(input?.value).toBe("long text string");

    act(() => {
      root.render(<AutoInput value="" placeholder="placeholder-test" readOnly />);
    });

    const updatedInput = container.querySelector("input");
    expect(updatedInput?.getAttribute("size")).toBe("16");

    act(() => {
      root.unmount();
    });
  });

  it("handles empty value and placeholder with minimum size 2", () => {
    const container = document.createElement("div");
    const root = createRoot(container);

    act(() => {
      root.render(<AutoInput value="" placeholder="" readOnly />);
    });

    const input = container.querySelector("input");
    expect(input?.getAttribute("size")).toBe("2");

    act(() => {
      root.unmount();
    });
  });
});
