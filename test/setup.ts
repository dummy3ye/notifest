import { GlobalWindow } from "happy-dom";

const window = new GlobalWindow({ url: "http://localhost:3000" });

for (const prop of Object.getOwnPropertyNames(window)) {
  if (!(prop in globalThis)) {
    try {
      Object.defineProperty(globalThis, prop, {
        configurable: true,
        get: () => (window as unknown as Record<string, unknown>)[prop],
        set: (v) => {
          (window as unknown as Record<string, unknown>)[prop] = v;
        },
      });
    } catch {
      // Ignore read-only properties
    }
  }
}

// Mock Notification API if not present in the DOM environment
if (!("Notification" in window)) {
  class MockNotification extends EventTarget {
    static permission: NotificationPermission = "default";
    static requestPermission = async () => MockNotification.permission;
    title: string;
    options: NotificationOptions;
    onshow: (() => void) | null = null;
    onclick: (() => void) | null = null;
    onclose: (() => void) | null = null;
    onerror: (() => void) | null = null;

    constructor(title: string, options: NotificationOptions = {}) {
      super();
      this.title = title;
      this.options = options;
    }

    close() {
      this.onclose?.();
    }
  }

  (window as unknown as Record<string, unknown>).Notification = MockNotification;
}

// Ensure standard globals are bound
Object.assign(globalThis, {
  window,
  document: window.document,
  navigator: window.navigator,
  location: window.location,
  Notification: (window as unknown as Record<string, unknown>).Notification,
  IS_REACT_ACT_ENVIRONMENT: true,
});
