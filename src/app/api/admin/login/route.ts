import { NextResponse } from "next/server";
import { verifyAdminCredentials } from "@/lib/auth/credentials";
import { createSessionToken, setAdminSessionCookie } from "@/lib/auth/session";

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_ATTEMPTS = 10;
const RATE_LIMIT_MAX_ENTRIES = 1000;

const BAD_REQUEST_MESSAGE = "요청 형식을 확인해 주세요.";
const INVALID_CREDENTIALS_MESSAGE = "이메일 또는 비밀번호가 올바르지 않습니다.";
const RATE_LIMITED_MESSAGE =
  "로그인 시도가 너무 많습니다. 잠시 후 다시 시도해 주세요.";
const SERVER_ERROR_MESSAGE = "로그인 중 오류가 발생했습니다.";

type AttemptRecord = { count: number; resetAt: number };

const attempts = new Map<string, AttemptRecord>();

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function isRateLimited(key: string, now: number): boolean {
  const record = attempts.get(key);
  if (!record || record.resetAt <= now) return false;
  return record.count >= RATE_LIMIT_MAX_ATTEMPTS;
}

function recordFailure(key: string, now: number): void {
  const record = attempts.get(key);
  if (!record || record.resetAt <= now) {
    if (attempts.size >= RATE_LIMIT_MAX_ENTRIES) {
      const oldest = attempts.keys().next().value;
      if (oldest !== undefined) attempts.delete(oldest);
    }
    attempts.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return;
  }
  record.count += 1;
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: BAD_REQUEST_MESSAGE }, { status: 400 });
  }

  if (
    typeof payload !== "object" ||
    payload === null ||
    Array.isArray(payload)
  ) {
    return NextResponse.json({ error: BAD_REQUEST_MESSAGE }, { status: 400 });
  }

  const body = payload as { email?: unknown; password?: unknown };
  if (typeof body.email !== "string" || typeof body.password !== "string") {
    return NextResponse.json({ error: BAD_REQUEST_MESSAGE }, { status: 400 });
  }

  const email = body.email.trim();
  const password = body.password;
  if (!email || !password) {
    return NextResponse.json(
      { error: "이메일과 비밀번호를 모두 입력해 주세요." },
      { status: 400 },
    );
  }

  const key = `${clientIp(request)}|${email.toLowerCase()}`;
  const now = Date.now();
  if (isRateLimited(key, now)) {
    return NextResponse.json({ error: RATE_LIMITED_MESSAGE }, { status: 429 });
  }

  let session;
  try {
    session = await verifyAdminCredentials(email, password);
  } catch (error) {
    console.error("admin login verification failed", error);
    return NextResponse.json({ error: SERVER_ERROR_MESSAGE }, { status: 500 });
  }

  if (!session) {
    recordFailure(key, now);
    return NextResponse.json(
      { error: INVALID_CREDENTIALS_MESSAGE },
      { status: 401 },
    );
  }

  try {
    const token = await createSessionToken(session);
    await setAdminSessionCookie(token);
  } catch (error) {
    console.error("admin session creation failed", error);
    return NextResponse.json({ error: SERVER_ERROR_MESSAGE }, { status: 500 });
  }

  attempts.delete(key);
  return NextResponse.json({
    ok: true,
    email: session.email,
    role: session.role,
  });
}
