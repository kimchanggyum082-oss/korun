import { mkdir, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import path from "node:path";
import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { blobStoreId, blobToken, localUploadEnabled } from "@/lib/admin/blob";
import { readImageDimensions } from "@/lib/admin/image-size";
import { getAdminSession } from "@/lib/auth/session";

export const runtime = "nodejs";

const MAX_BYTES = 8 * 1024 * 1024;
const MAX_CONTENT_LENGTH = MAX_BYTES + 64 * 1024;

type SniffedImage = { mime: string; extension: string };

type SniffedFile = SniffedImage & { kind: "image" | "file" };

/** Document types the admin may attach to a board post. */
const FILE_MIME_BY_EXTENSION: Record<string, string> = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ppt: "application/vnd.ms-powerpoint",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  zip: "application/zip",
  hwp: "application/x-hwp",
  hwpx: "application/vnd.hancom.hwpx",
  txt: "text/plain",
  csv: "text/csv",
};

const ZIP_BASED_EXTENSIONS = new Set(["docx", "xlsx", "pptx", "hwpx", "zip"]);
const OLE_BASED_EXTENSIONS = new Set(["doc", "xls", "ppt", "hwp"]);

function extensionOf(name: string): string {
  const match = /\.([a-z0-9]+)$/i.exec(name.trim());
  return match ? match[1].toLowerCase() : "";
}

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

function sniffFileType(
  bytes: Uint8Array,
  originalName: string,
): SniffedFile | null {
  const image = sniffImageType(bytes);
  if (image) return { ...image, kind: "image" };

  const extension = extensionOf(originalName);
  const mime = FILE_MIME_BY_EXTENSION[extension];
  if (!mime) return null;

  const isPdf = matchesAscii(bytes, 0, "%PDF-");
  if (isPdf) {
    return extension === "pdf" ? { mime, extension, kind: "file" } : null;
  }

  const isZip =
    bytes.length >= 4 &&
    bytes[0] === 0x50 &&
    bytes[1] === 0x4b &&
    (bytes[2] === 0x03 || bytes[2] === 0x05 || bytes[2] === 0x07);
  if (isZip) {
    return ZIP_BASED_EXTENSIONS.has(extension)
      ? { mime, extension, kind: "file" }
      : null;
  }

  const isOle =
    bytes.length >= 8 &&
    bytes[0] === 0xd0 &&
    bytes[1] === 0xcf &&
    bytes[2] === 0x11 &&
    bytes[3] === 0xe0 &&
    bytes[4] === 0xa1 &&
    bytes[5] === 0xb1 &&
    bytes[6] === 0x1a &&
    bytes[7] === 0xe1;
  if (isOle) {
    return OLE_BASED_EXTENSIONS.has(extension)
      ? { mime, extension, kind: "file" }
      : null;
  }

  if (extension === "txt" || extension === "csv") {
    const sample = bytes.subarray(0, Math.min(bytes.length, 8192));
    if (sample.includes(0)) return null;
    return { mime, extension, kind: "file" };
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
  const storeId = blobStoreId();
  const useBlob = Boolean(token || storeId);
  if (!useBlob && !localUploadEnabled()) {
    return NextResponse.json(
      {
        error:
          "이미지 업로드가 설정되지 않았습니다. BLOB_READ_WRITE_TOKEN 또는 BLOB_STORE_ID를 설정해 주세요.",
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
  const fileType = sniffFileType(bytes, file.name);
  if (!fileType) {
    return NextResponse.json(
      {
        error:
          "이미지(PNG, JPEG, GIF, WEBP) 또는 문서(PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, ZIP, HWP, HWPX, TXT, CSV) 파일만 업로드할 수 있습니다.",
      },
      { status: 400 },
    );
  }
  const dimensions =
    fileType.kind === "image" ? readImageDimensions(bytes) : undefined;
  const metadata = {
    name: file.name,
    size: file.size,
    contentType: fileType.mime,
    width: dimensions?.width ?? null,
    height: dimensions?.height ?? null,
  };

  try {
    if (!useBlob) {
      const filename = `${randomUUID()}.${fileType.extension}`;
      const dir = path.join(process.cwd(), "public", "uploads");
      await mkdir(dir, { recursive: true });
      await writeFile(path.join(dir, filename), bytes);
      return NextResponse.json({
        url: `/uploads/${filename}`,
        ...metadata,
      });
    }

    const folder = fileType.kind === "image" ? "images" : "files";
    const blob = await put(
      `admin/${folder}/${randomUUID()}.${fileType.extension}`,
      bytes,
      {
        access: "public",
        contentType: fileType.mime,
        addRandomSuffix: true,
        ...(token ? { token } : {}),
        ...(storeId ? { storeId } : {}),
      },
    );

    return NextResponse.json({
      url: blob.url,
      ...metadata,
    });
  } catch (error) {
    console.error("admin upload failed", error);
    return NextResponse.json(
      { error: "업로드에 실패했습니다." },
      { status: 502 },
    );
  }
}
