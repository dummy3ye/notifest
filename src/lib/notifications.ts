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

/**
 * Registers the service worker needed for mobile notification support.
 * Returns the ServiceWorkerRegistration or null if unavailable.
 */
export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) {
    return null;
  }
  try {
    return await navigator.serviceWorker.register("/sw.js");
  } catch {
    return null;
  }
}

/**
 * Returns true if the browser requires ServiceWorker-based notifications
 * (i.e. `new Notification()` throws — Android Chrome).
 */
export function needsServiceWorker(): boolean {
  if (!isNotificationSupported()) return false;
  try {
    // Android Chrome throws TypeError on `new Notification()`
    const n = new Notification("");
    n.close();
    return false;
  } catch {
    return true;
  }
}
