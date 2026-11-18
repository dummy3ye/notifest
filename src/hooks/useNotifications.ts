import { useCallback, useState } from "react";
import type { Logger, Permission, SendOptions } from "../types";

const supported = typeof window !== "undefined" && "Notification" in window;
const readPermission = (): Permission => (supported ? Notification.permission : "unsupported");

export function useNotifications(log: Logger) {
  const [permission, setPermission] = useState<Permission>(readPermission);

  const request = useCallback(async () => {
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
      if (Notification.permission !== "granted") {
        return log(`can't send, permission is ${Notification.permission}`, true);
      }
      const options: NotificationOptions & { renotify?: boolean } = {
        body: o.body,
        requireInteraction: o.interact,
        silent: o.silent,
      };
      if (o.tag) {
        options.tag = o.tag;
        options.renotify = o.renotify;
      }
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
