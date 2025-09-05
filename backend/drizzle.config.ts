import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/database/schema",
  out: "./drizzle",
  dbCredentials: {
    host:
      process.env.DB_HOST ??
      (() => {
        throw new Error("DB_HOST is not defined");
      })(),
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database:
      process.env.DB_NAME ??
      (() => {
        throw new Error("DB_NAME is not defined");
      })(),
    ssl: false,
  },
});
