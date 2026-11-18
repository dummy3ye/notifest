export type Permission = NotificationPermission | "unsupported";

export interface SendOptions {
  title: string;
  body: string;
  delay: number;
  tag: string;
  interact: boolean;
  silent: boolean;
  renotify: boolean;
}

export interface LogEntry {
  id: number;
  time: string;
  message: string;
  error: boolean;
}

export type Logger = (message: string, error?: boolean) => void;
