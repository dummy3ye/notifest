import index from "./index.html";

const port = Number(process.env.PORT ?? 3000);

Bun.serve({
  port,
  routes: { "/*": index },
  development: process.env.NODE_ENV !== "production",
});

console.log(`notifest running on http://localhost:${port}`);
