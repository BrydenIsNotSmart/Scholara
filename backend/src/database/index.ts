import { SQL } from "bun";
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } from "../config";

export const db = new SQL({
  hostname: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  adapter: "postgres",
});

const now = await db`SELECT NOW()`;

console.log(now);
