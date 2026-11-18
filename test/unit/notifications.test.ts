import { describe, expect, it } from "bun:test";
import {
  buildNotificationOptions,
  formatTimestamp,
  getNotificationPermission,
  isNotificationSupported,
} from "../../src/lib/notifications";

describe("notifications lib", () => {
  it("checks notification support correctly", () => {
    expect(isNotificationSupported()).toBe(true);
  });

  it("reads current permission", () => {
    const perm = getNotificationPermission();
    expect(["default", "granted", "denied", "unsupported"]).toContain(perm);
  });

  it("builds notification options with default tags", () => {
    const options = buildNotificationOptions({
      title: "Test Title",
      body: "Test Body",
      delay: 0,
      tag: "",
      interact: true,
      silent: true,
      renotify: false,
    });

    expect(options.body).toBe("Test Body");
    expect(options.requireInteraction).toBe(true);
    expect(options.silent).toBe(true);
    expect(options.tag).toBeUndefined();
    expect(options.renotify).toBeUndefined();
  });

  it("builds notification options with custom tag and renotify", () => {
    const options = buildNotificationOptions({
      title: "Alert",
      body: "Update available",
      delay: 5,
      tag: "update-tag",
      interact: false,
      silent: false,
      renotify: true,
    });

    expect(options.tag).toBe("update-tag");
    expect(options.renotify).toBe(true);
  });

  it("formats timestamp into HH:mm:ss format", () => {
    const date = new Date(2026, 0, 1, 14, 30, 45);
    const formatted = formatTimestamp(date);
    expect(formatted).toMatch(/^\d{2}:\d{2}:\d{2}$/);
  });
});
