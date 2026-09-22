import {
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const contentEntities = pgTable("content_entities", {
  key: text("key").primaryKey(),
  draftJson: jsonb("draft_json"),
  publishedJson: jsonb("published_json"),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  updatedBy: text("updated_by"),
});

export const mediaAssets = pgTable("media_assets", {
  id: text("id").primaryKey(),
  url: text("url"),
  storageKey: text("storage_key"),
  width: integer("width"),
  height: integer("height"),
  mime: text("mime"),
  size: integer("size"),
  altJson: jsonb("alt_json"),
  createdAt: timestamp("created_at", { withTimezone: true }),
});

export const revisions = pgTable(
  "revisions",
  {
    id: text("id").primaryKey(),
    entityKey: text("entity_key"),
    json: jsonb("json"),
    status: text("status"),
    note: text("note"),
    createdAt: timestamp("created_at", { withTimezone: true }),
    author: text("author"),
  },
  (table) => [index("revisions_entity_key_idx").on(table.entityKey)],
);

export const adminUsers = pgTable(
  "admin_users",
  {
    id: text("id").primaryKey(),
    email: text("email"),
    passwordHash: text("password_hash"),
    role: text("role"),
  },
  (table) => [uniqueIndex("admin_users_email_unique").on(table.email)],
);
