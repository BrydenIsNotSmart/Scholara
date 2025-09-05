import { pgTable, varchar } from "drizzle-orm/pg-core";
import { snowflake } from "../../helpers";

export const users = pgTable("users", {
  id: snowflake("id").primaryKey(),
  first_name: varchar("first_name", { length: 255 }).notNull(),
  last_name: varchar("last_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
});
