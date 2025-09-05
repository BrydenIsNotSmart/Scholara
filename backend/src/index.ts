import { serve } from "bun";
import { readdirSync } from "fs";
import path from "path";
import { PORT } from "./config";
import chalk from "chalk";
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
      console.info(
        `${chalk.blue.bold("[SERVER]")}: Registered ${file
          .trim()
          .slice(0, -3)} route.`
      );
    }
  }
}

const server = serve({
  port: PORT,
  routes,
});

console.info(`${chalk.blue.bold("[SERVER]")}: Running at ${server.url}.`);
