import type { InputHTMLAttributes } from "react";

/** Text input that dynamically grows with its content. */
export function AutoInput({ value, placeholder, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  const length = String(value ?? "").length || String(placeholder ?? "").length;
  return <input {...rest} value={value} placeholder={placeholder} size={Math.max(2, length)} />;
}
