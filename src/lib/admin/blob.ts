export function blobToken(): string | undefined {
  const token = process.env.BLOB_READ_WRITE_TOKEN?.trim();
  return token ? token : undefined;
}

/**
 * Vercel Blob store id. A connected store that authenticates through Vercel
 * OIDC (instead of a static read/write token) exposes this, and `@vercel/blob`
 * resolves credentials from it plus `VERCEL_OIDC_TOKEN`.
 */
export function blobStoreId(): string | undefined {
  const id = process.env.BLOB_STORE_ID?.trim();
  return id ? id : undefined;
}

export function isBlobConfigured(): boolean {
  return blobToken() !== undefined || blobStoreId() !== undefined;
}

/** Dev-only fallback: uploads are written to `public/uploads` when no token is set. */
export function localUploadEnabled(): boolean {
  return process.env.NODE_ENV !== "production";
}

export function isUploadConfigured(): boolean {
  return isBlobConfigured() || localUploadEnabled();
}
