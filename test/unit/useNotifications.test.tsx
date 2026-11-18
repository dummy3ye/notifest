import { describe, expect, it } from "bun:test";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { useNotifications } from "../../src/hooks";
import type { Permission, SendOptions } from "../../src/types";

let currentPermission: Permission = "unsupported";
let reqFn = () => {};
let sendFn = (_o: SendOptions) => {};
const logs: string[] = [];

function NotificationsHarness() {
  const { permission, request, send } = useNotifications((msg) => logs.push(msg));
  currentPermission = permission;
  reqFn = request;
  sendFn = send;
  return null;
}

describe("useNotifications hook", () => {
  it("initializes and exposes handlers", () => {
    const container = document.createElement("div");
    const root = createRoot(container);

    act(() => {
      root.render(<NotificationsHarness />);
    });

    expect(["default", "granted", "denied", "unsupported"]).toContain(currentPermission);
    expect(typeof reqFn).toBe("function");
    expect(typeof sendFn).toBe("function");

    // Test send with delay schedules log
    act(() => {
      sendFn({
        title: "Delayed message",
        body: "Coming later",
        delay: 2,
        tag: "",
        interact: false,
        silent: false,
        renotify: false,
      });
    });

    expect(logs.some((msg) => msg.includes("scheduled, 2s"))).toBe(true);

    act(() => {
      root.unmount();
    });
  });
});
