import { customType } from "drizzle-orm/pg-core";

export const snowflake = customType<{ data: string }>({
  dataType() {
    return "bigint";
  },
  fromDriver(value: unknown): string {
    return String(value);
  },
  toDriver(value: string): string {
    return value;
  },
});
