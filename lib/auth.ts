import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "chamoth_portfolio_super_secure_jwt_secret_key_2026_!@#$"
);

export const AUTH_COOKIE_NAME = "chamoth_admin_token";

export interface TokenPayload {
  userId: string;
  email: string;
  name: string;
}

export async function signAdminToken(payload: TokenPayload): Promise<string> {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET);
}

export async function verifyAdminToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as TokenPayload;
  } catch (error) {
    return null;
  }
}

export async function getAdminSessionFromCookies(): Promise<TokenPayload | null> {
  const cookieStore = cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  if (!token) return null;
  return await verifyAdminToken(token);
}

export async function verifyAdminRequest(req: NextRequest): Promise<TokenPayload | null> {
  const tokenCookie = req.cookies.get(AUTH_COOKIE_NAME)?.value;
  const authHeader = req.headers.get("authorization");
  const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : null;

  const token = tokenCookie || bearerToken;
  if (!token) return null;

  return await verifyAdminToken(token);
}
