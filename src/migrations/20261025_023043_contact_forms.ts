import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_card_grid_card_link_style" AS ENUM('arrow', 'button');
  CREATE TYPE "public"."enum_pages_blocks_contact_forms_default_form" AS ENUM('book-conversation', 'partner', 'early-access', 'hub-interest');
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_card_link_style" AS ENUM('arrow', 'button');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_forms_default_form" AS ENUM('book-conversation', 'partner', 'early-access', 'hub-interest');
  ALTER TYPE "public"."enum_pages_blocks_hero_art" ADD VALUE 'contact' BEFORE 'none';
  ALTER TYPE "public"."enum__pages_v_blocks_hero_art" ADD VALUE 'contact' BEFORE 'none';
  CREATE TABLE "pages_blocks_contact_forms" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"default_form" "enum_pages_blocks_contact_forms_default_form" DEFAULT 'book-conversation',
  	"aside_title" varchar DEFAULT 'Need an adjustment?',
  	"aside_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_forms" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"default_form" "enum__pages_v_blocks_contact_forms_default_form" DEFAULT 'book-conversation',
  	"aside_title" varchar DEFAULT 'Need an adjustment?',
  	"aside_text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_card_grid" ADD COLUMN "card_link_style" "enum_pages_blocks_card_grid_card_link_style" DEFAULT 'arrow';
  ALTER TABLE "_pages_v_blocks_card_grid" ADD COLUMN "card_link_style" "enum__pages_v_blocks_card_grid_card_link_style" DEFAULT 'arrow';
  ALTER TABLE "pages_blocks_contact_forms" ADD CONSTRAINT "pages_blocks_contact_forms_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_forms" ADD CONSTRAINT "_pages_v_blocks_contact_forms_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_contact_forms_order_idx" ON "pages_blocks_contact_forms" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_forms_parent_id_idx" ON "pages_blocks_contact_forms" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_forms_path_idx" ON "pages_blocks_contact_forms" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_forms_order_idx" ON "_pages_v_blocks_contact_forms" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_forms_parent_id_idx" ON "_pages_v_blocks_contact_forms" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_forms_path_idx" ON "_pages_v_blocks_contact_forms" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_contact_forms" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_forms" CASCADE;
  ALTER TABLE "pages_blocks_hero" ALTER COLUMN "art" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_hero" ALTER COLUMN "art" SET DEFAULT 'photo'::text;
  DROP TYPE "public"."enum_pages_blocks_hero_art";
  CREATE TYPE "public"."enum_pages_blocks_hero_art" AS ENUM('checkIn', 'photo', 'tiles', 'centred', 'none');
  ALTER TABLE "pages_blocks_hero" ALTER COLUMN "art" SET DEFAULT 'photo'::"public"."enum_pages_blocks_hero_art";
  ALTER TABLE "pages_blocks_hero" ALTER COLUMN "art" SET DATA TYPE "public"."enum_pages_blocks_hero_art" USING "art"::"public"."enum_pages_blocks_hero_art";
  ALTER TABLE "_pages_v_blocks_hero" ALTER COLUMN "art" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_hero" ALTER COLUMN "art" SET DEFAULT 'photo'::text;
  DROP TYPE "public"."enum__pages_v_blocks_hero_art";
  CREATE TYPE "public"."enum__pages_v_blocks_hero_art" AS ENUM('checkIn', 'photo', 'tiles', 'centred', 'none');
  ALTER TABLE "_pages_v_blocks_hero" ALTER COLUMN "art" SET DEFAULT 'photo'::"public"."enum__pages_v_blocks_hero_art";
  ALTER TABLE "_pages_v_blocks_hero" ALTER COLUMN "art" SET DATA TYPE "public"."enum__pages_v_blocks_hero_art" USING "art"::"public"."enum__pages_v_blocks_hero_art";
  ALTER TABLE "pages_blocks_card_grid" DROP COLUMN "card_link_style";
  ALTER TABLE "_pages_v_blocks_card_grid" DROP COLUMN "card_link_style";
  DROP TYPE "public"."enum_pages_blocks_card_grid_card_link_style";
  DROP TYPE "public"."enum_pages_blocks_contact_forms_default_form";
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_card_link_style";
  DROP TYPE "public"."enum__pages_v_blocks_contact_forms_default_form";`)
}
