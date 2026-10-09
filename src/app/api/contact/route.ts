import { NextResponse } from "next/server";
import {
  createContactRequest,
  isContactStoreConfigured,
} from "@/lib/contact/requests";

const LIMITS = {
  name: 120,
  company: 200,
  email: 254,
  phone: 60,
  subject: 200,
  message: 5000,
};

const MAX_BODY_BYTES = 32 * 1024;

function str(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function originMatchesHost(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  const host = request.headers.get("host");
  if (!host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!originMatchesHost(request)) {
    return NextResponse.json(
      { error: "허용되지 않은 요청입니다." },
      { status: 403 },
    );
  }

  const contentType = request.headers
    .get("content-type")
    ?.split(";")[0]
    ?.trim()
    .toLowerCase();
  if (contentType !== "application/json") {
    return NextResponse.json(
      { error: "application/json 형식의 요청만 허용됩니다." },
      { status: 415 },
    );
  }

  const declared = Number(request.headers.get("content-length") ?? Number.NaN);
  if (!Number.isFinite(declared) || declared < 0 || declared > MAX_BODY_BYTES) {
    return NextResponse.json(
      { error: "요청 본문이 너무 큽니다." },
      { status: 413 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "요청 형식을 확인해 주세요." },
      { status: 400 },
    );
  }
  if (
    typeof payload !== "object" ||
    payload === null ||
    Array.isArray(payload)
  ) {
    return NextResponse.json(
      { error: "요청 형식을 확인해 주세요." },
      { status: 400 },
    );
  }

  const body = payload as Record<string, unknown>;
  const name = str(body.name, LIMITS.name);
  const company = str(body.company, LIMITS.company);
  const email = str(body.email, LIMITS.email);
  const phone = str(body.phone, LIMITS.phone);
  const subject = str(body.subject, LIMITS.subject);
  const message = str(body.message, LIMITS.message);
  const locale = str(body.locale, 8);
  const page = str(body.page, 300);

  if (!name || !email || !message || !isEmail(email)) {
    return NextResponse.json(
      { error: "필수 항목을 확인해 주세요." },
      { status: 400 },
    );
  }

  if (!isContactStoreConfigured()) {
    return NextResponse.json(
      { error: "데이터베이스가 설정되지 않아 문의를 저장할 수 없습니다." },
      { status: 503 },
    );
  }

  try {
    await createContactRequest({
      name,
      company,
      email,
      phone,
      subject,
      message,
      locale,
      page,
    });
  } catch (error) {
    console.error("contact request failed", error);
    return NextResponse.json(
      { error: "문의 저장 중 오류가 발생했습니다." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
