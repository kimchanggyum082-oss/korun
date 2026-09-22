import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

export const ADMIN_SESSION_COOKIE = "korun_admin_session";

const SESSION_ISSUER = "korun-admin";
const SESSION_AUDIENCE = "korun-admin";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;
const DEVELOPMENT_SECRET = "korun-admin-development-secret";

export type AdminSession = {
  email: string;
  role: string;
};

function sessionSecret(): Uint8Array | null {
  const configured = process.env.ADMIN_SESSION_SECRET?.trim();
  if (process.env.NODE_ENV === "production") {
    if (!configured || configured.length < 32) return null;
    return new TextEncoder().encode(configured);
  }
  const secret =
    configured || process.env.ADMIN_PASSWORD?.trim() || DEVELOPMENT_SECRET;
  return new TextEncoder().encode(secret);
}

export async function createSessionToken(
  session: AdminSession,
): Promise<string> {
  const secret = sessionSecret();
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not configured");
  }
  const issuedAt = Math.floor(Date.now() / 1000);
  return new SignJWT({ email: session.email, role: session.role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt(issuedAt)
    .setIssuer(SESSION_ISSUER)
    .setAudience(SESSION_AUDIENCE)
    .setExpirationTime(issuedAt + SESSION_MAX_AGE_SECONDS)
    .sign(secret);
}

export async function verifySessionToken(
  token: string,
): Promise<AdminSession | null> {
  const secret = sessionSecret();
  if (!secret) return null;
  try {
    const { payload } = await jwtVerify(token, secret, {
      issuer: SESSION_ISSUER,
      audience: SESSION_AUDIENCE,
    });
    const email = typeof payload.email === "string" ? payload.email : "";
    if (!email) return null;
    const role = typeof payload.role === "string" ? payload.role : "admin";
    return { email, role };
  } catch {
    return null;
  }
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const store = await cookies();
  const token = store.get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export async function setAdminSessionCookie(token: string): Promise<void> {
  const store = await cookies();
  store.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function clearAdminSessionCookie(): Promise<void> {
  const store = await cookies();
  store.set(ADMIN_SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}
