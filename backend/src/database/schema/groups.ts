import { pgTable, varchar, timestamp } from "drizzle-orm/pg-core";
import { snowflake } from "../../helpers";

export const groups = pgTable("groups", {
  id: snowflake("id").primaryKey(),
  name: varchar("name").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});
