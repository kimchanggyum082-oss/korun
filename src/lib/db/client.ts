import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

function createDb(url: string) {
  return drizzle(neon(url), { schema });
}

export type Database = ReturnType<typeof createDb>;

let cached: Database | null = null;

export function databaseUrl(): string | undefined {
  const url = process.env.DATABASE_URL?.trim();
  return url ? url : undefined;
}

export function isDatabaseConfigured(): boolean {
  return databaseUrl() !== undefined;
}

export function getDb(): Database | null {
  if (cached) return cached;
  const url = databaseUrl();
  if (!url) return null;
  cached = createDb(url);
  return cached;
}
