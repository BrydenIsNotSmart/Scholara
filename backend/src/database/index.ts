import { SQL } from "bun";
import { drizzle } from "drizzle-orm/bun-sql";
import { migrate } from "drizzle-orm/bun-sql/migrator";
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } from "../config";
import { users, sessions } from "./schema";

const client = new SQL({
  hostname: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  adapter: "postgres",
});

export const db = drizzle(client);
await migrate(db, { migrationsFolder: "./drizzle" });

const selectUsers = await db.select().from(users);
console.log("Existing users:", selectUsers);

const selectSessions = await db.select().from(sessions);
console.log("Existing sessions:", selectSessions);
