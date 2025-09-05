import { JWT_SECRET } from "../config";
import jwt from "jsonwebtoken";

export function signAccessToken(userId: string) {
  return jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: "15m" });
}

export function signRefreshToken(sessionId: string) {
  return jwt.sign({ sid: sessionId }, JWT_SECRET, { expiresIn: "30d" });
}

export function verifyToken<T>(token: string): T {
  return jwt.verify(token, JWT_SECRET) as T;
}
