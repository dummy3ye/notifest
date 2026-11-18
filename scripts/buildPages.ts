import { existsSync } from "node:fs";
import { cp, mkdir, rm, writeFile } from "node:fs/promises";

console.log("Packaging build for GitHub Pages with /notifest subpath...");

if (existsSync("out_pages")) {
  await rm("out_pages", { recursive: true, force: true });
}

const proc = Bun.spawn(["bun", "x", "next", "build"], {
  env: { ...process.env, OUTPUT_EXPORT: "true" },
  stdout: "inherit",
  stderr: "inherit",
});

const exitCode = await proc.exited;
if (exitCode !== 0) {
  process.exit(exitCode);
}

await mkdir("out_pages/notifest", { recursive: true });
await cp("out", "out_pages/notifest", { recursive: true });
await writeFile("out_pages/.nojekyll", "");

const redirectHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Redirecting to /notifest</title>
    <meta http-equiv="refresh" content="0; url=/notifest">
    <link rel="canonical" href="/notifest">
  </head>
  <body>
    <script>window.location.replace("/notifest");</script>
    <p>Redirecting to <a href="/notifest">/notifest</a>...</p>
  </body>
</html>
`;

await writeFile("out_pages/index.html", redirectHtml);
console.log("Packaging complete in out_pages/");
