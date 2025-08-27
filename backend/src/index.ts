import { serve } from "bun";
import { readdirSync } from "fs";
import path from "path";
import { PORT } from "./config";
import "./database";

type Routes = Record<
  string,
  Record<string, (req: Request) => Response | Promise<Response>>
>;

const routes: Routes = {};

for (const file of readdirSync(path.join(import.meta.dir, "routes"))) {
  if (file.endsWith(".ts")) {
    const mod = await import(`./routes/${file}`);
    if (mod.routes) {
      Object.assign(routes, mod.routes);
    }
  }
}

const server = serve({
  port: PORT,
  routes,
});

console.log(`🚀 Server running at ${server.url}`);
