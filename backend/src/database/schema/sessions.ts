import { pgTable, timestamp, uuid, varchar, text } from "drizzle-orm/pg-core";
import { snowflake } from "../../helpers";

export const sessions = pgTable("sessions", {
  token: uuid("token").primaryKey(),
  user_id: snowflake("user_id").notNull(),
  ip_address: varchar("ip_address", { length: 45 }),
  user_agent: text("user_agent"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  expires_at: timestamp("expires_at").notNull(),
});
