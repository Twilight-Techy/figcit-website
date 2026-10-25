import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"closing_text" varchar,
  	"closing_label" varchar,
  	"closing_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_legal_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" jsonb
  );
  
  CREATE TABLE "pages_blocks_legal" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"notice" varchar,
  	"show_cookie_settings" boolean DEFAULT false,
  	"show_contact_details" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"closing_text" varchar,
  	"closing_label" varchar,
  	"closing_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_legal_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_legal" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"notice" varchar,
  	"show_cookie_settings" boolean DEFAULT false,
  	"show_contact_details" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "subline" varchar;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "subline" varchar;
  ALTER TABLE "pages_blocks_faq_items" ADD CONSTRAINT "pages_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_legal_sections" ADD CONSTRAINT "pages_blocks_legal_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_legal"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_legal" ADD CONSTRAINT "pages_blocks_legal_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_items" ADD CONSTRAINT "_pages_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq" ADD CONSTRAINT "_pages_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_legal_sections" ADD CONSTRAINT "_pages_v_blocks_legal_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_legal"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_legal" ADD CONSTRAINT "_pages_v_blocks_legal_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_faq_items_order_idx" ON "pages_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_items_parent_id_idx" ON "pages_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_order_idx" ON "pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_parent_id_idx" ON "pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_path_idx" ON "pages_blocks_faq" USING btree ("_path");
  CREATE INDEX "pages_blocks_legal_sections_order_idx" ON "pages_blocks_legal_sections" USING btree ("_order");
  CREATE INDEX "pages_blocks_legal_sections_parent_id_idx" ON "pages_blocks_legal_sections" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_legal_order_idx" ON "pages_blocks_legal" USING btree ("_order");
  CREATE INDEX "pages_blocks_legal_parent_id_idx" ON "pages_blocks_legal" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_legal_path_idx" ON "pages_blocks_legal" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_faq_items_order_idx" ON "_pages_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_items_parent_id_idx" ON "_pages_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_order_idx" ON "_pages_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_parent_id_idx" ON "_pages_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_path_idx" ON "_pages_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_legal_sections_order_idx" ON "_pages_v_blocks_legal_sections" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_legal_sections_parent_id_idx" ON "_pages_v_blocks_legal_sections" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_legal_order_idx" ON "_pages_v_blocks_legal" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_legal_parent_id_idx" ON "_pages_v_blocks_legal" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_legal_path_idx" ON "_pages_v_blocks_legal" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_faq_items" CASCADE;
  DROP TABLE "pages_blocks_faq" CASCADE;
  DROP TABLE "pages_blocks_legal_sections" CASCADE;
  DROP TABLE "pages_blocks_legal" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_items" CASCADE;
  DROP TABLE "_pages_v_blocks_faq" CASCADE;
  DROP TABLE "_pages_v_blocks_legal_sections" CASCADE;
  DROP TABLE "_pages_v_blocks_legal" CASCADE;
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "subline";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "subline";`)
}
