import { verifyToken } from "../helpers/jwt";

export function requireAuth(
  handler: (req: Request, userId: string) => Response | Promise<Response>
) {
  return async (req: Request): Promise<Response> => {
    const auth = req.headers.get("Authorization");
    if (!auth?.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ success: false, message: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    try {
      const token = auth.split(" ")[1];
      const { sub } = verifyToken<{ sub: string }>(token!);

      return handler(req, sub);
    } catch {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid token" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
  };
}
