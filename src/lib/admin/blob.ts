export function blobToken(): string | undefined {
  const token = process.env.BLOB_READ_WRITE_TOKEN?.trim();
  return token ? token : undefined;
}

export function isBlobConfigured(): boolean {
  return blobToken() !== undefined;
}
