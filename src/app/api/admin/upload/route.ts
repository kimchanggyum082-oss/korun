import { randomUUID } from "node:crypto";
import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { blobToken } from "@/lib/admin/blob";
import { readImageDimensions } from "@/lib/admin/image-size";
import { getAdminSession } from "@/lib/auth/session";

export const runtime = "nodejs";

const MAX_BYTES = 8 * 1024 * 1024;
const MAX_CONTENT_LENGTH = MAX_BYTES + 64 * 1024;

type SniffedImage = { mime: string; extension: string };

function matchesAscii(
  bytes: Uint8Array,
  start: number,
  value: string,
): boolean {
  if (start + value.length > bytes.length) return false;
  for (let i = 0; i < value.length; i += 1) {
    if (bytes[start + i] !== value.charCodeAt(i)) return false;
  }
  return true;
}

function sniffImageType(bytes: Uint8Array): SniffedImage | null {
  if (
    bytes.length >= 8 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47 &&
    bytes[4] === 0x0d &&
    bytes[5] === 0x0a &&
    bytes[6] === 0x1a &&
    bytes[7] === 0x0a
  ) {
    return { mime: "image/png", extension: "png" };
  }
  if (
    bytes.length >= 3 &&
    bytes[0] === 0xff &&
    bytes[1] === 0xd8 &&
    bytes[2] === 0xff
  ) {
    return { mime: "image/jpeg", extension: "jpg" };
  }
  if (matchesAscii(bytes, 0, "GIF87a") || matchesAscii(bytes, 0, "GIF89a")) {
    return { mime: "image/gif", extension: "gif" };
  }
  if (
    bytes.length >= 12 &&
    matchesAscii(bytes, 0, "RIFF") &&
    matchesAscii(bytes, 8, "WEBP")
  ) {
    return { mime: "image/webp", extension: "webp" };
  }
  return null;
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json(
      { error: "로그인이 필요합니다." },
      { status: 401 },
    );
  }

  const token = blobToken();
  if (!token) {
    return NextResponse.json(
      {
        error:
          "BLOB_READ_WRITE_TOKEN이 설정되지 않아 업로드할 수 없습니다. 이미지 URL을 직접 입력해 주세요.",
        code: "blob_not_configured",
      },
      { status: 503 },
    );
  }

  const contentLength = request.headers.get("content-length");
  const declaredLength = contentLength ? Number(contentLength) : Number.NaN;
  if (
    !Number.isFinite(declaredLength) ||
    declaredLength < 0 ||
    declaredLength > MAX_CONTENT_LENGTH
  ) {
    return NextResponse.json(
      { error: "파일 크기는 8MB를 넘을 수 없습니다." },
      { status: 413 },
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json(
      { error: "업로드 형식이 올바르지 않습니다." },
      { status: 400 },
    );
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json(
      { error: "업로드할 파일을 선택해 주세요." },
      { status: 400 },
    );
  }
  if (file.size === 0) {
    return NextResponse.json(
      { error: "비어 있는 파일은 업로드할 수 없습니다." },
      { status: 400 },
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "파일 크기는 8MB를 넘을 수 없습니다." },
      { status: 413 },
    );
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const image = sniffImageType(bytes);
  if (!image) {
    return NextResponse.json(
      { error: "PNG, JPEG, GIF, WEBP 이미지 파일만 업로드할 수 있습니다." },
      { status: 400 },
    );
  }
  const dimensions = readImageDimensions(bytes);

  try {
    const blob = await put(`admin/${randomUUID()}.${image.extension}`, bytes, {
      access: "public",
      contentType: image.mime,
      addRandomSuffix: true,
      token,
    });

    return NextResponse.json({
      url: blob.url,
      width: dimensions?.width ?? null,
      height: dimensions?.height ?? null,
    });
  } catch (error) {
    console.error("admin upload failed", error);
    return NextResponse.json(
      { error: "업로드에 실패했습니다." },
      { status: 502 },
    );
  }
}
