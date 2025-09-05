import { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "../../database";
import { users } from "../../database/schema";

export const registerSchema = z.object({
  first_name: z.string().min(1, "First name must be at least 1 character"),
  last_name: z.string().min(1, "Last name must be at least 1 character"),
  email: z.email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const checkAccountWithEmailExists = async (email: string) => {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  return user;
};
