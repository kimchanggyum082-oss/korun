import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { isEditableEntityKey } from "@/lib/admin/entities";
import { getAdminSession } from "@/lib/auth/session";
import { publish, saveDraft } from "@/lib/content/store";
import { isDatabaseConfigured } from "@/lib/db/client";

const MAX_BODY_BYTES = 512 * 1024;

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

function isJsonContentType(request: Request): boolean {
  const contentType = request.headers.get("content-type");
  if (!contentType) return false;
  return contentType.split(";")[0]?.trim().toLowerCase() === "application/json";
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json(
      { error: "로그인이 필요합니다." },
      { status: 401 },
    );
  }

  if (!originMatchesHost(request)) {
    return NextResponse.json(
      { error: "허용되지 않은 요청입니다." },
      { status: 403 },
    );
  }

  if (!isJsonContentType(request)) {
    return NextResponse.json(
      { error: "application/json 형식의 요청만 허용됩니다." },
      { status: 415 },
    );
  }

  const contentLength = request.headers.get("content-length");
  const declaredLength = contentLength ? Number(contentLength) : Number.NaN;
  if (
    !Number.isFinite(declaredLength) ||
    declaredLength < 0 ||
    declaredLength > MAX_BODY_BYTES
  ) {
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

  if (JSON.stringify(payload).length > MAX_BODY_BYTES) {
    return NextResponse.json(
      { error: "요청 본문이 너무 큽니다." },
      { status: 413 },
    );
  }

  const body = payload as {
    key?: unknown;
    action?: unknown;
    json?: unknown;
  };

  if (!isEditableEntityKey(body.key)) {
    return NextResponse.json(
      { error: "편집할 수 없는 콘텐츠 키입니다." },
      { status: 400 },
    );
  }
  if (body.action !== "draft" && body.action !== "publish") {
    return NextResponse.json(
      { error: "action은 draft 또는 publish여야 합니다." },
      { status: 400 },
    );
  }
  if (body.json === undefined || body.json === null) {
    return NextResponse.json(
      { error: "저장할 내용이 비어 있습니다." },
      { status: 400 },
    );
  }

  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { error: "데이터베이스가 설정되지 않아 저장할 수 없습니다." },
      { status: 503 },
    );
  }

  try {
    if (body.action === "publish") {
      await publish(body.key, body.json, session.email);
      revalidatePath("/", "layout");
    } else {
      await saveDraft(body.key, body.json, session.email);
    }
  } catch (error) {
    console.error("admin content save failed", error);
    return NextResponse.json(
      { error: "저장 중 오류가 발생했습니다." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, key: body.key, action: body.action });
}
