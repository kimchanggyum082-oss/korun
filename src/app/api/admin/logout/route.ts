import { NextResponse } from "next/server";
import { clearAdminSessionCookie, getAdminSession } from "@/lib/auth/session";

export async function POST() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json(
      { error: "로그인이 필요합니다." },
      { status: 401 },
    );
  }

  await clearAdminSessionCookie();
  return NextResponse.json({ ok: true });
}
