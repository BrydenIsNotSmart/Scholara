import { loginSchema, type LoginInput } from "../../validation";
import { db } from "../../database";
import { eq } from "drizzle-orm";
import { users } from "../../database/schema/users";
import bcrypt from "bcrypt";
import { signAccessToken, signRefreshToken } from "../../helpers/jwt";
import { sessions } from "../../database/schema/sessions";
import { randomUUID } from "crypto";

export async function loginPost(req: Request): Promise<Response> {
  try {
    const body = await req.json();
    const parsed: LoginInput = loginSchema.parse(body);

    const { email, password } = parsed;

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid credentials" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid credentials" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const sessionId = randomUUID();
    const userAgent = req.headers.get("user-agent") ?? "unknown";
    const ip = req.headers.get("x-forwarded-for") ?? "local";

    await db.insert(sessions).values({
      token: sessionId,
      user_id: user.id,
      ip_address: ip,
      user_agent: userAgent,
      expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    });

    const accessToken = signAccessToken(user.id.toString());
    const refreshToken = signRefreshToken(sessionId);

    return Response.json({ success: true, accessToken, refreshToken });
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
