CREATE TABLE "admin_users" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text,
	"password_hash" text,
	"role" text
);
--> statement-breakpoint
CREATE TABLE "content_entities" (
	"key" text PRIMARY KEY NOT NULL,
	"draft_json" jsonb,
	"published_json" jsonb,
	"updated_at" timestamp with time zone,
	"published_at" timestamp with time zone,
	"updated_by" text
);
--> statement-breakpoint
CREATE TABLE "media_assets" (
	"id" text PRIMARY KEY NOT NULL,
	"url" text,
	"storage_key" text,
	"width" integer,
	"height" integer,
	"mime" text,
	"size" integer,
	"alt_json" jsonb,
	"created_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "revisions" (
	"id" text PRIMARY KEY NOT NULL,
	"entity_key" text,
	"json" jsonb,
	"status" text,
	"note" text,
	"created_at" timestamp with time zone,
	"author" text
);
--> statement-breakpoint
CREATE UNIQUE INDEX "admin_users_email_unique" ON "admin_users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "revisions_entity_key_idx" ON "revisions" USING btree ("entity_key");