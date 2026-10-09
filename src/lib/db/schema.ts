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

/**
 * Flat page-content overrides — one row per (key, locale), matching MCell's
 * `pageContent` model. `value` holds text, a media URL, or a JSON array for
 * list kinds. An empty value means "fall back to the data-file default".
 */
export const pageContents = pgTable(
  "page_contents",
  {
    key: text("key").notNull(),
    locale: text("locale").notNull(),
    value: text("value").notNull().default(""),
    updatedAt: timestamp("updated_at", { withTimezone: true }),
    updatedBy: text("updated_by"),
  },
  (table) => [
    uniqueIndex("page_contents_key_locale_unique").on(table.key, table.locale),
  ],
);

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

/** Contact-us form submissions from the public product pages. */
export const contactRequests = pgTable(
  "contact_requests",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    company: text("company"),
    email: text("email").notNull(),
    phone: text("phone"),
    subject: text("subject"),
    message: text("message").notNull(),
    locale: text("locale"),
    page: text("page"),
    createdAt: timestamp("created_at", { withTimezone: true }),
  },
  (table) => [index("contact_requests_created_at_idx").on(table.createdAt)],
);
