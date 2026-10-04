export function blobToken(): string | undefined {
  const token = process.env.BLOB_READ_WRITE_TOKEN?.trim();
  return token ? token : undefined;
}

export function isBlobConfigured(): boolean {
  return blobToken() !== undefined;
}

/** Dev-only fallback: uploads are written to `public/uploads` when no token is set. */
export function localUploadEnabled(): boolean {
  return process.env.NODE_ENV !== "production";
}

export function isUploadConfigured(): boolean {
  return isBlobConfigured() || localUploadEnabled();
}
