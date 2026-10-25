import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_hero_accent" AS ENUM('orange', 'teal', 'terracotta');
  CREATE TYPE "public"."enum_pages_blocks_feature_split_link_style" AS ENUM('arrow', 'button');
  CREATE TYPE "public"."enum_pages_blocks_feature_split_image_side" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum_pages_blocks_feature_split_accent" AS ENUM('orange', 'teal');
  CREATE TYPE "public"."enum_pages_blocks_cta_band_background" AS ENUM('white', 'cream');
  CREATE TYPE "public"."enum_pages_blocks_promise_actions_variant" AS ENUM('primary', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_note_band_background" AS ENUM('white', 'cream');
  CREATE TYPE "public"."enum_pages_blocks_statement_background" AS ENUM('white', 'cream');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_accent" AS ENUM('orange', 'teal', 'terracotta');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_split_link_style" AS ENUM('arrow', 'button');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_split_image_side" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_split_accent" AS ENUM('orange', 'teal');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_band_background" AS ENUM('white', 'cream');
  CREATE TYPE "public"."enum__pages_v_blocks_promise_actions_variant" AS ENUM('primary', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_note_band_background" AS ENUM('white', 'cream');
  CREATE TYPE "public"."enum__pages_v_blocks_statement_background" AS ENUM('white', 'cream');
  ALTER TYPE "public"."enum_pages_blocks_card_grid_cards_icon" ADD VALUE 'moon';
  ALTER TYPE "public"."enum_pages_blocks_card_grid_cards_icon" ADD VALUE 'cloud';
  ALTER TYPE "public"."enum_pages_blocks_card_grid_cards_icon" ADD VALUE 'message';
  ALTER TYPE "public"."enum_pages_blocks_card_grid_cards_icon" ADD VALUE 'shield';
  ALTER TYPE "public"."enum_pages_blocks_card_grid_cards_icon" ADD VALUE 'cup';
  ALTER TYPE "public"."enum_pages_blocks_card_grid_cards_icon" ADD VALUE 'desk';
  ALTER TYPE "public"."enum_pages_blocks_card_grid_cards_icon" ADD VALUE 'search';
  ALTER TYPE "public"."enum_pages_blocks_card_grid_cards_icon" ADD VALUE 'file';
  ALTER TYPE "public"."enum_pages_blocks_card_grid_cards_icon" ADD VALUE 'calendar';
  ALTER TYPE "public"."enum_pages_blocks_card_grid_cards_icon" ADD VALUE 'hand';
  ALTER TYPE "public"."enum_pages_blocks_card_grid_cards_icon" ADD VALUE 'mail';
  ALTER TYPE "public"."enum_pages_blocks_card_grid_cards_icon" ADD VALUE 'pin';
  ALTER TYPE "public"."enum_pages_blocks_card_grid_cards_icon" ADD VALUE 'target';
  ALTER TYPE "public"."enum_pages_blocks_card_grid_cards_icon" ADD VALUE 'eye';
  ALTER TYPE "public"."enum_pages_blocks_card_grid_cards_icon" ADD VALUE 'copy';
  ALTER TYPE "public"."enum_pages_blocks_card_grid_cards_icon" ADD VALUE 'check';
  ALTER TYPE "public"."enum_pages_blocks_card_grid_cards_icon" ADD VALUE 'plus';
  ALTER TYPE "public"."enum_pages_blocks_card_grid_cards_icon" ADD VALUE 'minus';
  ALTER TYPE "public"."enum_pages_blocks_card_grid_cards_icon" ADD VALUE 'alert';
  ALTER TYPE "public"."enum_pages_blocks_card_grid_columns" ADD VALUE '2' BEFORE '3';
  ALTER TYPE "public"."enum__pages_v_blocks_card_grid_cards_icon" ADD VALUE 'moon';
  ALTER TYPE "public"."enum__pages_v_blocks_card_grid_cards_icon" ADD VALUE 'cloud';
  ALTER TYPE "public"."enum__pages_v_blocks_card_grid_cards_icon" ADD VALUE 'message';
  ALTER TYPE "public"."enum__pages_v_blocks_card_grid_cards_icon" ADD VALUE 'shield';
  ALTER TYPE "public"."enum__pages_v_blocks_card_grid_cards_icon" ADD VALUE 'cup';
  ALTER TYPE "public"."enum__pages_v_blocks_card_grid_cards_icon" ADD VALUE 'desk';
  ALTER TYPE "public"."enum__pages_v_blocks_card_grid_cards_icon" ADD VALUE 'search';
  ALTER TYPE "public"."enum__pages_v_blocks_card_grid_cards_icon" ADD VALUE 'file';
  ALTER TYPE "public"."enum__pages_v_blocks_card_grid_cards_icon" ADD VALUE 'calendar';
  ALTER TYPE "public"."enum__pages_v_blocks_card_grid_cards_icon" ADD VALUE 'hand';
  ALTER TYPE "public"."enum__pages_v_blocks_card_grid_cards_icon" ADD VALUE 'mail';
  ALTER TYPE "public"."enum__pages_v_blocks_card_grid_cards_icon" ADD VALUE 'pin';
  ALTER TYPE "public"."enum__pages_v_blocks_card_grid_cards_icon" ADD VALUE 'target';
  ALTER TYPE "public"."enum__pages_v_blocks_card_grid_cards_icon" ADD VALUE 'eye';
  ALTER TYPE "public"."enum__pages_v_blocks_card_grid_cards_icon" ADD VALUE 'copy';
  ALTER TYPE "public"."enum__pages_v_blocks_card_grid_cards_icon" ADD VALUE 'check';
  ALTER TYPE "public"."enum__pages_v_blocks_card_grid_cards_icon" ADD VALUE 'plus';
  ALTER TYPE "public"."enum__pages_v_blocks_card_grid_cards_icon" ADD VALUE 'minus';
  ALTER TYPE "public"."enum__pages_v_blocks_card_grid_cards_icon" ADD VALUE 'alert';
  ALTER TYPE "public"."enum__pages_v_blocks_card_grid_columns" ADD VALUE '2' BEFORE '3';
  CREATE TABLE "pages_blocks_hero_figures" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_promise_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"variant" "enum_pages_blocks_promise_actions_variant" DEFAULT 'primary',
  	"arrow" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_promise" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"body" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_note_band" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background" "enum_pages_blocks_note_band_background" DEFAULT 'white',
  	"text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_statement" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background" "enum_pages_blocks_statement_background" DEFAULT 'white',
  	"eyebrow" varchar,
  	"text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_figures" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_promise_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"variant" "enum__pages_v_blocks_promise_actions_variant" DEFAULT 'primary',
  	"arrow" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_promise" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"body" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_note_band" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background" "enum__pages_v_blocks_note_band_background" DEFAULT 'white',
  	"text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_statement" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background" "enum__pages_v_blocks_statement_background" DEFAULT 'white',
  	"eyebrow" varchar,
  	"text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "accent" "enum_pages_blocks_hero_accent" DEFAULT 'orange';
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "figures_source" varchar;
  ALTER TABLE "pages_blocks_feature_split" ADD COLUMN "link_style" "enum_pages_blocks_feature_split_link_style" DEFAULT 'arrow';
  ALTER TABLE "pages_blocks_feature_split" ADD COLUMN "image_side" "enum_pages_blocks_feature_split_image_side" DEFAULT 'right';
  ALTER TABLE "pages_blocks_feature_split" ADD COLUMN "accent" "enum_pages_blocks_feature_split_accent" DEFAULT 'orange';
  ALTER TABLE "pages_blocks_cta_band" ADD COLUMN "background" "enum_pages_blocks_cta_band_background" DEFAULT 'white';
  ALTER TABLE "pages_blocks_cta_band" ADD COLUMN "body" varchar;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "accent" "enum__pages_v_blocks_hero_accent" DEFAULT 'orange';
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "figures_source" varchar;
  ALTER TABLE "_pages_v_blocks_feature_split" ADD COLUMN "link_style" "enum__pages_v_blocks_feature_split_link_style" DEFAULT 'arrow';
  ALTER TABLE "_pages_v_blocks_feature_split" ADD COLUMN "image_side" "enum__pages_v_blocks_feature_split_image_side" DEFAULT 'right';
  ALTER TABLE "_pages_v_blocks_feature_split" ADD COLUMN "accent" "enum__pages_v_blocks_feature_split_accent" DEFAULT 'orange';
  ALTER TABLE "_pages_v_blocks_cta_band" ADD COLUMN "background" "enum__pages_v_blocks_cta_band_background" DEFAULT 'white';
  ALTER TABLE "_pages_v_blocks_cta_band" ADD COLUMN "body" varchar;
  ALTER TABLE "pages_blocks_hero_figures" ADD CONSTRAINT "pages_blocks_hero_figures_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_promise_actions" ADD CONSTRAINT "pages_blocks_promise_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_promise"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_promise" ADD CONSTRAINT "pages_blocks_promise_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_note_band" ADD CONSTRAINT "pages_blocks_note_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_statement" ADD CONSTRAINT "pages_blocks_statement_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_figures" ADD CONSTRAINT "_pages_v_blocks_hero_figures_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_promise_actions" ADD CONSTRAINT "_pages_v_blocks_promise_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_promise"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_promise" ADD CONSTRAINT "_pages_v_blocks_promise_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_note_band" ADD CONSTRAINT "_pages_v_blocks_note_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_statement" ADD CONSTRAINT "_pages_v_blocks_statement_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_figures_order_idx" ON "pages_blocks_hero_figures" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_figures_parent_id_idx" ON "pages_blocks_hero_figures" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_promise_actions_order_idx" ON "pages_blocks_promise_actions" USING btree ("_order");
  CREATE INDEX "pages_blocks_promise_actions_parent_id_idx" ON "pages_blocks_promise_actions" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_promise_order_idx" ON "pages_blocks_promise" USING btree ("_order");
  CREATE INDEX "pages_blocks_promise_parent_id_idx" ON "pages_blocks_promise" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_promise_path_idx" ON "pages_blocks_promise" USING btree ("_path");
  CREATE INDEX "pages_blocks_note_band_order_idx" ON "pages_blocks_note_band" USING btree ("_order");
  CREATE INDEX "pages_blocks_note_band_parent_id_idx" ON "pages_blocks_note_band" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_note_band_path_idx" ON "pages_blocks_note_band" USING btree ("_path");
  CREATE INDEX "pages_blocks_statement_order_idx" ON "pages_blocks_statement" USING btree ("_order");
  CREATE INDEX "pages_blocks_statement_parent_id_idx" ON "pages_blocks_statement" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_statement_path_idx" ON "pages_blocks_statement" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_figures_order_idx" ON "_pages_v_blocks_hero_figures" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_figures_parent_id_idx" ON "_pages_v_blocks_hero_figures" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_promise_actions_order_idx" ON "_pages_v_blocks_promise_actions" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_promise_actions_parent_id_idx" ON "_pages_v_blocks_promise_actions" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_promise_order_idx" ON "_pages_v_blocks_promise" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_promise_parent_id_idx" ON "_pages_v_blocks_promise" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_promise_path_idx" ON "_pages_v_blocks_promise" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_note_band_order_idx" ON "_pages_v_blocks_note_band" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_note_band_parent_id_idx" ON "_pages_v_blocks_note_band" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_note_band_path_idx" ON "_pages_v_blocks_note_band" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_statement_order_idx" ON "_pages_v_blocks_statement" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_statement_parent_id_idx" ON "_pages_v_blocks_statement" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_statement_path_idx" ON "_pages_v_blocks_statement" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_hero_figures" CASCADE;
  DROP TABLE "pages_blocks_promise_actions" CASCADE;
  DROP TABLE "pages_blocks_promise" CASCADE;
  DROP TABLE "pages_blocks_note_band" CASCADE;
  DROP TABLE "pages_blocks_statement" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_figures" CASCADE;
  DROP TABLE "_pages_v_blocks_promise_actions" CASCADE;
  DROP TABLE "_pages_v_blocks_promise" CASCADE;
  DROP TABLE "_pages_v_blocks_note_band" CASCADE;
  DROP TABLE "_pages_v_blocks_statement" CASCADE;
  ALTER TABLE "pages_blocks_card_grid_cards" ALTER COLUMN "icon" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_blocks_card_grid_cards_icon";
  CREATE TYPE "public"."enum_pages_blocks_card_grid_cards_icon" AS ENUM('phone', 'people', 'home', 'chart', 'user', 'briefcase', 'graduation', 'bank', 'leaf', 'heart', 'wave');
  ALTER TABLE "pages_blocks_card_grid_cards" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_pages_blocks_card_grid_cards_icon" USING "icon"::"public"."enum_pages_blocks_card_grid_cards_icon";
  ALTER TABLE "pages_blocks_card_grid" ALTER COLUMN "columns" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_card_grid" ALTER COLUMN "columns" SET DEFAULT '3'::text;
  DROP TYPE "public"."enum_pages_blocks_card_grid_columns";
  CREATE TYPE "public"."enum_pages_blocks_card_grid_columns" AS ENUM('3', '4');
  ALTER TABLE "pages_blocks_card_grid" ALTER COLUMN "columns" SET DEFAULT '3'::"public"."enum_pages_blocks_card_grid_columns";
  ALTER TABLE "pages_blocks_card_grid" ALTER COLUMN "columns" SET DATA TYPE "public"."enum_pages_blocks_card_grid_columns" USING "columns"::"public"."enum_pages_blocks_card_grid_columns";
  ALTER TABLE "_pages_v_blocks_card_grid_cards" ALTER COLUMN "icon" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_cards_icon";
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_cards_icon" AS ENUM('phone', 'people', 'home', 'chart', 'user', 'briefcase', 'graduation', 'bank', 'leaf', 'heart', 'wave');
  ALTER TABLE "_pages_v_blocks_card_grid_cards" ALTER COLUMN "icon" SET DATA TYPE "public"."enum__pages_v_blocks_card_grid_cards_icon" USING "icon"::"public"."enum__pages_v_blocks_card_grid_cards_icon";
  ALTER TABLE "_pages_v_blocks_card_grid" ALTER COLUMN "columns" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_card_grid" ALTER COLUMN "columns" SET DEFAULT '3'::text;
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_columns";
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_columns" AS ENUM('3', '4');
  ALTER TABLE "_pages_v_blocks_card_grid" ALTER COLUMN "columns" SET DEFAULT '3'::"public"."enum__pages_v_blocks_card_grid_columns";
  ALTER TABLE "_pages_v_blocks_card_grid" ALTER COLUMN "columns" SET DATA TYPE "public"."enum__pages_v_blocks_card_grid_columns" USING "columns"::"public"."enum__pages_v_blocks_card_grid_columns";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "accent";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "figures_source";
  ALTER TABLE "pages_blocks_feature_split" DROP COLUMN "link_style";
  ALTER TABLE "pages_blocks_feature_split" DROP COLUMN "image_side";
  ALTER TABLE "pages_blocks_feature_split" DROP COLUMN "accent";
  ALTER TABLE "pages_blocks_cta_band" DROP COLUMN "background";
  ALTER TABLE "pages_blocks_cta_band" DROP COLUMN "body";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "accent";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "figures_source";
  ALTER TABLE "_pages_v_blocks_feature_split" DROP COLUMN "link_style";
  ALTER TABLE "_pages_v_blocks_feature_split" DROP COLUMN "image_side";
  ALTER TABLE "_pages_v_blocks_feature_split" DROP COLUMN "accent";
  ALTER TABLE "_pages_v_blocks_cta_band" DROP COLUMN "background";
  ALTER TABLE "_pages_v_blocks_cta_band" DROP COLUMN "body";
  DROP TYPE "public"."enum_pages_blocks_hero_accent";
  DROP TYPE "public"."enum_pages_blocks_feature_split_link_style";
  DROP TYPE "public"."enum_pages_blocks_feature_split_image_side";
  DROP TYPE "public"."enum_pages_blocks_feature_split_accent";
  DROP TYPE "public"."enum_pages_blocks_cta_band_background";
  DROP TYPE "public"."enum_pages_blocks_promise_actions_variant";
  DROP TYPE "public"."enum_pages_blocks_note_band_background";
  DROP TYPE "public"."enum_pages_blocks_statement_background";
  DROP TYPE "public"."enum__pages_v_blocks_hero_accent";
  DROP TYPE "public"."enum__pages_v_blocks_feature_split_link_style";
  DROP TYPE "public"."enum__pages_v_blocks_feature_split_image_side";
  DROP TYPE "public"."enum__pages_v_blocks_feature_split_accent";
  DROP TYPE "public"."enum__pages_v_blocks_cta_band_background";
  DROP TYPE "public"."enum__pages_v_blocks_promise_actions_variant";
  DROP TYPE "public"."enum__pages_v_blocks_note_band_background";
  DROP TYPE "public"."enum__pages_v_blocks_statement_background";`)
}
