import { useState } from "react";
import type { Permission, SendOptions } from "../types";
import { AutoInput } from "./AutoInput";
import { Toggle } from "./Toggle";

interface Props {
  permission: Permission;
  onRequest: () => void;
  onSend: (options: SendOptions) => void;
}

export function SendForm({ permission, onRequest, onSend }: Props) {
  const [title, setTitle] = useState("hi");
  const [body, setBody] = useState("it works");
  const [delay, setDelay] = useState("0");
  const [tag, setTag] = useState("");
  const [interact, setInteract] = useState(false);
  const [silent, setSilent] = useState(false);
  const [renotify, setRenotify] = useState(false);

  const unsupported = permission === "unsupported";

  const submit = () =>
    onSend({
      title,
      body,
      tag: tag.trim(),
      delay: Math.max(0, Number(delay) || 0),
      interact,
      silent,
      renotify,
    });

  return (
    <section>
      <p className="sentence">
        send{" "}
        <AutoInput value={title} placeholder="title" aria-label="title" onChange={(e) => setTitle(e.target.value)} />{" "}
        saying{" "}
        <AutoInput value={body} placeholder="message" aria-label="body" onChange={(e) => setBody(e.target.value)} />{" "}
        after{" "}
        <AutoInput
          value={delay}
          inputMode="numeric"
          aria-label="delay in seconds"
          onChange={(e) => setDelay(e.target.value)}
        />{" "}
        seconds.
      </p>

      <div className="opts">
        <span>options</span>
        <Toggle label="require interaction" on={interact} onChange={setInteract} />
        <Toggle label="silent" on={silent} onChange={setSilent} />
        <Toggle label="renotify" on={renotify} onChange={setRenotify} />
        <input
          className="tag"
          value={tag}
          placeholder="tag"
          aria-label="tag"
          onChange={(e) => setTag(e.target.value)}
        />
      </div>

      <div className="go">
        <button className="send" onClick={submit} disabled={unsupported}>
          send it
        </button>
        {permission === "default" && (
          <button className="link" onClick={onRequest}>
            grant permission
          </button>
        )}
      </div>

      <p className="status">
        {unsupported ? "this browser has no notification api." : `permission: ${permission}`}
      </p>
    </section>
  );
}
