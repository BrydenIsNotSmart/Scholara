import { Snowflake } from "@theinternetfolks/snowflake";
import { db } from "../../database";
import { users } from "../../database/schema/users";
import {
  registerSchema,
  checkAccountWithEmailExists,
  type RegisterInput,
} from "../../validation/";
import { SNOWFLAKE_USER_SHARD } from "../../config";
import bcrypt from "bcrypt";

export async function registerPost(req: Request): Promise<Response> {
  try {
    const body = await req.json();
    const parsed: RegisterInput = registerSchema.parse(body);

    if (await checkAccountWithEmailExists(parsed.email)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "An acccount with this email already exists",
        }),
        { status: 409, headers: { "Content-Type": "application/json" } }
      );
    }

    const { first_name, last_name, email, password } = parsed;
    const id = Snowflake.generate({ shard_id: SNOWFLAKE_USER_SHARD });

    const hashedPassword = await bcrypt.hash(password, 10);

    const [newUser] = await db
      .insert(users)
      .values({
        id,
        first_name,
        last_name,
        email,
        password: hashedPassword,
      })
      .returning();

    if (!newUser) {
      return new Response(
        JSON.stringify({ success: false, message: "Failed to create user" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const { password: _pw, ...strippedUser } = newUser;

    return new Response(JSON.stringify({ success: true, data: strippedUser }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    if (err instanceof Error && "issues" in err) {
      return new Response(
        JSON.stringify({ success: false, errors: (err as any).issues }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: false, message: "Server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
