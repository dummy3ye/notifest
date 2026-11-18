import { useCallback, useState } from "react";
import {
  buildNotificationOptions,
  getNotificationPermission,
  isNotificationSupported,
} from "../lib/notifications";
import type { Logger, Permission, SendOptions } from "../types";

export function useNotifications(log: Logger) {
  const [permission, setPermission] = useState<Permission>(getNotificationPermission);

  const request = useCallback(async () => {
    if (!isNotificationSupported()) {
      log("Notification API is not supported in this browser", true);
      return;
    }
    try {
      const result = await Notification.requestPermission();
      log(`permission → ${result}`);
      setPermission(result);
    } catch (e) {
      log(`permission error: ${(e as Error).message}`, true);
    }
  }, [log]);

  const fire = useCallback(
    (o: SendOptions) => {
      if (!isNotificationSupported() || Notification.permission !== "granted") {
        return log(`can't send, permission is ${getNotificationPermission()}`, true);
      }
      const options = buildNotificationOptions(o);
      try {
        const n = new Notification(o.title || "notifest", options);
        n.onshow = () => log("show");
        n.onclick = () => {
          log("click");
          window.focus();
          n.close();
        };
        n.onclose = () => log("close");
        n.onerror = () => log("error", true);
        log("created");
      } catch (e) {
        log(`failed: ${(e as Error).message}`, true);
      }
    },
    [log],
  );

  const send = useCallback(
    (o: SendOptions) => {
      if (o.delay > 0) {
        log(`scheduled, ${o.delay}s`);
        setTimeout(() => fire(o), o.delay * 1000);
      } else {
        fire(o);
      }
    },
    [fire, log],
  );

  return { permission, request, send };
}
