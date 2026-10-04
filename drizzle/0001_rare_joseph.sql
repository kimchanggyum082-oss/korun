CREATE TABLE "page_contents" (
	"key" text NOT NULL,
	"locale" text NOT NULL,
	"value" text DEFAULT '' NOT NULL,
	"updated_at" timestamp with time zone,
	"updated_by" text
);
--> statement-breakpoint
CREATE UNIQUE INDEX "page_contents_key_locale_unique" ON "page_contents" USING btree ("key","locale");