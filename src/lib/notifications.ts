import type { Permission, SendOptions } from "../types";

/**
 * Checks whether the Notification API is supported in the current environment.
 */
export function isNotificationSupported(): boolean {
  return typeof window !== "undefined" && "Notification" in window;
}

/**
 * Reads the current Notification permission or returns 'unsupported'.
 */
export function getNotificationPermission(): Permission {
  if (!isNotificationSupported()) {
    return "unsupported";
  }
  return Notification.permission;
}

/**
 * Formats a NotificationOptions payload from SendOptions.
 */
export function buildNotificationOptions(
  options: SendOptions,
): NotificationOptions & { renotify?: boolean } {
  const result: NotificationOptions & { renotify?: boolean } = {
    body: options.body,
    requireInteraction: options.interact,
    silent: options.silent,
  };

  if (options.tag.trim()) {
    result.tag = options.tag.trim();
    result.renotify = options.renotify;
  }

  return result;
}

/**
 * Formats a current timestamp as HH:mm:ss.
 */
export function formatTimestamp(date: Date = new Date()): string {
  return date.toLocaleTimeString([], { hour12: false });
}
