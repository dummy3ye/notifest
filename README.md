# notifest

> **does it notify.** — A minimal browser notification workbench for testing permissions, payload options, and lifecycle events.

[![Bun](https://img.shields.io/badge/Bun-1.2+-000?logo=bun&logoColor=fff)](https://bun.sh)
[![Next.js](https://img.shields.io/badge/Next.js-16-000?logo=nextdotjs&logoColor=fff)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-000?logo=react&logoColor=61DAFB)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-000?logo=typescript&logoColor=3178C6)](https://www.typescriptlang.org)
[![Biome](https://img.shields.io/badge/code_style-Biome-60a5fa?logo=biome&logoColor=fff)](https://biomejs.dev)

---

Web notifications are notoriously finicky across operating systems and browsers. **notifest** gives you an immediate, zero-friction interface to test how notifications actually behave on your machine: permission handshakes, delayed scheduling, duplicate tags, sound suppression, and click/close listeners.

No raw HTML files, no heavy boilerplate. Built with React 19 and Next.js App Router on Bun.

---

## What It Tests

- **Permission Lifecycle**: Check whether your browser reports `default`, `granted`, or `denied`, and trigger the native permission prompt.
- **Conversational Dispatch**: Interactive inline sentence inputs (`send [title] saying [message] after [delay] seconds.`) that expand dynamically with input length.
- **Payload Flags**:
  - `require interaction`: Prevents the notification from auto-dismissing (platform-dependent).
  - `silent`: Mutes sound/vibration regardless of device profile.
  - `tag`: Deduplicates notifications with a shared identifier.
  - `renotify`: Re-alerts the user when replacing an existing tagged notification.
  - `delay`: Schedules dispatch using `setTimeout` so you can switch tabs or minimize the browser before it fires.
- **Real-Time Event Stream**: Captures and logs `show`, `click`, `close`, `error`, and permission state changes with timestamps.

---

## Quickstart

### Prerequisites

- [Bun](https://bun.sh) (v1.2+)

### Run Locally

```bash
# Clone and install dependencies
git clone https://github.com/dummy3ye/notifest.git
cd notifest
bun install

# Start development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Browser Requirement**: The Web Notification API requires a secure context. It will only execute on `localhost` or over an `https://` domain.

---

## Browser & OS Notes

| Platform / Browser | Behavior |
| --- | --- |
| **macOS (Chrome / Safari / Firefox)** | Requires system-level notification permissions enabled in macOS *System Settings → Notifications* for each individual browser. |
| **Windows 10/11** | Notifications route through the Windows Action Center / Focus Assist. "Do Not Disturb" may suppress banners silently. |
| **Linux (Freedesktop / DBus)** | Dependent on your desktop environment's notification daemon (dunst, mako, GNOME shell). Certain daemon flags like `silent` may be ignored. |
| **Mobile (iOS Safari / Android Chrome)** | iOS requires web apps to be installed to the Home Screen (PWA) before granting push/notification permissions. |

---

## Scripts

| Command | Action |
| --- | --- |
| `bun dev` | Starts Next.js development server on `http://localhost:3000` |
| `bun run build` | Compiles optimized production bundle with Turbopack |
| `bun start` | Starts Next.js production server |
| `bun test` | Runs all 19 unit, component, and integration tests |
| `bun run typecheck` | Validates TypeScript types (`tsc --noEmit`) |
| `bun run lint` | Runs Biome linter across all project files |
| `bun run lint:fix` | Automatically formats and fixes lint issues |

---

## Project Structure

```
notifest/
├── app/
│   ├── layout.tsx                  # Pure TSX root document, Jost font loader, metadata
│   └── page.tsx                    # Client boundary page
├── src/
│   ├── App.tsx                     # Main view container
│   ├── components/
│   │   ├── ui/                     # Primitives: AutoInput, Toggle, Circles
│   │   ├── layout/                 # Site chrome: Nav, Footer
│   │   ├── notifications/          # Workbench components: SendForm, EventLog
│   │   └── index.ts                # Component barrel export
│   ├── hooks/
│   │   ├── useNotifications.ts     # Web Notification API dispatcher and scheduler
│   │   ├── useEventLog.ts          # Event history state management
│   │   └── index.ts
│   ├── lib/
│   │   └── notifications.ts        # Pure utility helpers (payload builder, formatters)
│   ├── types/
│   │   └── index.ts                # TypeScript interfaces and union types
│   └── styles/
│       ├── global.css              # Reset, CSS tokens, editorial theme
│       ├── form.css                # Sentence inputs and toggle buttons
│       └── log.css                 # Tabular event log
├── test/
│   ├── setup.ts                    # happy-dom environment & Notification mock
│   ├── unit/                       # Lib, hook, and utility tests
│   ├── components/                 # Isolated UI unit tests
│   └── integration/                # Full App and Page integration tests
├── next.config.ts                  # Next.js configuration
├── bunfig.toml                     # Bun test runner config
├── biome.json                      # Biome rules and code formatter config
├── tsconfig.json                   # Strict TypeScript compiler options
└── package.json
```

---

## License

MIT © [sagittarius](https://arinaholic.me)
