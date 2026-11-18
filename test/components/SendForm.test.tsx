import { describe, expect, it } from "bun:test";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { SendForm } from "../../src/components/notifications/SendForm";
import type { SendOptions } from "../../src/types";

describe("SendForm component", () => {
  it("submits configured notification options on click", () => {
    let sentPayload: SendOptions | null = null;
    let requested = false;

    const container = document.createElement("div");
    const root = createRoot(container);

    act(() => {
      root.render(
        <SendForm
          permission="default"
          onRequest={() => {
            requested = true;
          }}
          onSend={(opts) => {
            sentPayload = opts;
          }}
        />,
      );
    });

    const sendBtn = container.querySelector("button.send");
    expect(sendBtn).not.toBeNull();
    expect(sendBtn?.getAttribute("disabled")).toBeNull();

    act(() => {
      sendBtn?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(sentPayload).not.toBeNull();
    if (sentPayload) {
      expect((sentPayload as SendOptions).title).toBe("hi");
      expect((sentPayload as SendOptions).body).toBe("it works");
      expect((sentPayload as SendOptions).delay).toBe(0);
    }

    const grantBtn = container.querySelector("button.link");
    expect(grantBtn).not.toBeNull();
    act(() => {
      grantBtn?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(requested).toBe(true);

    act(() => {
      root.unmount();
    });
  });

  it("disables send button when permission is unsupported", () => {
    const container = document.createElement("div");
    const root = createRoot(container);

    act(() => {
      root.render(<SendForm permission="unsupported" onRequest={() => {}} onSend={() => {}} />);
    });

    const sendBtn = container.querySelector("button.send");
    expect(sendBtn?.hasAttribute("disabled")).toBe(true);
    expect(container.textContent).toContain("this browser has no notification api.");

    act(() => {
      root.unmount();
    });
  });
});
