import { describe, expect, it } from "bun:test";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { Circles, Footer, Nav } from "../../src/components";

describe("Layout components", () => {
  it("renders Nav brand and external link", () => {
    const container = document.createElement("div");
    const root = createRoot(container);

    act(() => {
      root.render(<Nav />);
    });

    const brand = container.querySelector("b");
    const link = container.querySelector("a");
    expect(brand?.textContent).toBe("notifest");
    expect(link?.getAttribute("href")).toBe("https://arinaholic.me");

    act(() => {
      root.unmount();
    });
  });

  it("renders Footer notice", () => {
    const container = document.createElement("div");
    const root = createRoot(container);

    act(() => {
      root.render(<Footer />);
    });

    expect(container.textContent).toContain("needs https or localhost");

    act(() => {
      root.unmount();
    });
  });

  it("renders background Circles elements", () => {
    const container = document.createElement("div");
    const root = createRoot(container);

    act(() => {
      root.render(<Circles />);
    });

    const circles = container.querySelectorAll(".circle");
    expect(circles.length).toBe(3);

    act(() => {
      root.unmount();
    });
  });
});
