import { useCallback, useEffect, useRef, useState } from "react";
import {
  buildNotificationOptions,
  getNotificationPermission,
  isNotificationSupported,
  needsServiceWorker,
  registerServiceWorker,
} from "../lib/notifications";
import type { Logger, Permission, SendOptions } from "../types";

export function useNotifications(log: Logger) {
  const [permission, setPermission] = useState<Permission>(getNotificationPermission);
  const swReg = useRef<ServiceWorkerRegistration | null>(null);
  const useSW = useRef(false);

  useEffect(() => {
    useSW.current = needsServiceWorker();
    registerServiceWorker().then((reg) => {
      swReg.current = reg;
    });
  }, []);

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
      const title = o.title || "notifest";

      // Use ServiceWorker on browsers that don't support `new Notification()`
      if (useSW.current && swReg.current) {
        swReg.current
          .showNotification(title, options)
          .then(() => log("created (sw)"))
          .catch((e: Error) => log(`failed: ${e.message}`, true));
        return;
      }

      try {
        const n = new Notification(title, options);
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
