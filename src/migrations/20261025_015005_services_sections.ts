import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_subheading_size" AS ENUM('large', 'small', 'hidden');
  CREATE TYPE "public"."enum_pages_blocks_steps_layout" AS ENUM('stacked', 'flow');
  CREATE TYPE "public"."enum_pages_blocks_cards_cards_icon" AS ENUM('phone', 'people', 'home', 'chart', 'user', 'briefcase', 'graduation', 'bank', 'leaf', 'heart', 'wave', 'moon', 'cloud', 'message', 'shield', 'cup', 'desk', 'search', 'file', 'calendar', 'hand', 'mail', 'pin', 'target', 'eye', 'copy', 'check', 'plus', 'minus', 'alert');
  CREATE TYPE "public"."enum_pages_blocks_cards_cards_tone" AS ENUM('purple', 'terracotta', 'teal', 'ochre', 'green', 'blue');
  CREATE TYPE "public"."enum_pages_blocks_cards_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_prices_tone" AS ENUM('purple', 'terracotta', 'teal', 'ochre', 'green', 'blue');
  CREATE TYPE "public"."enum_pages_blocks_note_style" AS ENUM('tinted', 'outlined');
  CREATE TYPE "public"."enum_pages_blocks_note_icon" AS ENUM('phone', 'people', 'home', 'chart', 'user', 'briefcase', 'graduation', 'bank', 'leaf', 'heart', 'wave', 'moon', 'cloud', 'message', 'shield', 'cup', 'desk', 'search', 'file', 'calendar', 'hand', 'mail', 'pin', 'target', 'eye', 'copy', 'check', 'plus', 'minus', 'alert');
  CREATE TYPE "public"."enum_pages_blocks_actions_actions_variant" AS ENUM('primary', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_actions_button_tone" AS ENUM('purple', 'terracotta', 'teal', 'ochre', 'green', 'blue');
  CREATE TYPE "public"."enum_pages_blocks_text_style" AS ENUM('body', 'small', 'emphasis');
  CREATE TYPE "public"."enum_pages_blocks_list_panels_panels_style" AS ENUM('checks', 'documents');
  CREATE TYPE "public"."enum_pages_blocks_section_background" AS ENUM('white', 'cream');
  CREATE TYPE "public"."enum_pages_blocks_section_intro_layout" AS ENUM('stacked', 'split');
  CREATE TYPE "public"."enum_pages_blocks_section_aside" AS ENUM('none', 'app', 'photo');
  CREATE TYPE "public"."enum_pages_blocks_section_accent" AS ENUM('purple', 'terracotta', 'teal', 'ochre', 'green', 'blue');
  CREATE TYPE "public"."enum__pages_v_blocks_subheading_size" AS ENUM('large', 'small', 'hidden');
  CREATE TYPE "public"."enum__pages_v_blocks_steps_layout" AS ENUM('stacked', 'flow');
  CREATE TYPE "public"."enum__pages_v_blocks_cards_cards_icon" AS ENUM('phone', 'people', 'home', 'chart', 'user', 'briefcase', 'graduation', 'bank', 'leaf', 'heart', 'wave', 'moon', 'cloud', 'message', 'shield', 'cup', 'desk', 'search', 'file', 'calendar', 'hand', 'mail', 'pin', 'target', 'eye', 'copy', 'check', 'plus', 'minus', 'alert');
  CREATE TYPE "public"."enum__pages_v_blocks_cards_cards_tone" AS ENUM('purple', 'terracotta', 'teal', 'ochre', 'green', 'blue');
  CREATE TYPE "public"."enum__pages_v_blocks_cards_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_prices_tone" AS ENUM('purple', 'terracotta', 'teal', 'ochre', 'green', 'blue');
  CREATE TYPE "public"."enum__pages_v_blocks_note_style" AS ENUM('tinted', 'outlined');
  CREATE TYPE "public"."enum__pages_v_blocks_note_icon" AS ENUM('phone', 'people', 'home', 'chart', 'user', 'briefcase', 'graduation', 'bank', 'leaf', 'heart', 'wave', 'moon', 'cloud', 'message', 'shield', 'cup', 'desk', 'search', 'file', 'calendar', 'hand', 'mail', 'pin', 'target', 'eye', 'copy', 'check', 'plus', 'minus', 'alert');
  CREATE TYPE "public"."enum__pages_v_blocks_actions_actions_variant" AS ENUM('primary', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_actions_button_tone" AS ENUM('purple', 'terracotta', 'teal', 'ochre', 'green', 'blue');
  CREATE TYPE "public"."enum__pages_v_blocks_text_style" AS ENUM('body', 'small', 'emphasis');
  CREATE TYPE "public"."enum__pages_v_blocks_list_panels_panels_style" AS ENUM('checks', 'documents');
  CREATE TYPE "public"."enum__pages_v_blocks_section_background" AS ENUM('white', 'cream');
  CREATE TYPE "public"."enum__pages_v_blocks_section_intro_layout" AS ENUM('stacked', 'split');
  CREATE TYPE "public"."enum__pages_v_blocks_section_aside" AS ENUM('none', 'app', 'photo');
  CREATE TYPE "public"."enum__pages_v_blocks_section_accent" AS ENUM('purple', 'terracotta', 'teal', 'ochre', 'green', 'blue');
  ALTER TYPE "public"."enum_pages_blocks_hero_tiles_tone" ADD VALUE 'green';
  ALTER TYPE "public"."enum_pages_blocks_hero_tiles_tone" ADD VALUE 'blue';
  ALTER TYPE "public"."enum_pages_blocks_card_grid_cards_tone" ADD VALUE 'green';
  ALTER TYPE "public"."enum_pages_blocks_card_grid_cards_tone" ADD VALUE 'blue';
  ALTER TYPE "public"."enum_pages_blocks_stats_stats_tone" ADD VALUE 'green';
  ALTER TYPE "public"."enum_pages_blocks_stats_stats_tone" ADD VALUE 'blue';
  ALTER TYPE "public"."enum_pages_blocks_values_values_tone" ADD VALUE 'green';
  ALTER TYPE "public"."enum_pages_blocks_values_values_tone" ADD VALUE 'blue';
  ALTER TYPE "public"."enum__pages_v_blocks_hero_tiles_tone" ADD VALUE 'green';
  ALTER TYPE "public"."enum__pages_v_blocks_hero_tiles_tone" ADD VALUE 'blue';
  ALTER TYPE "public"."enum__pages_v_blocks_card_grid_cards_tone" ADD VALUE 'green';
  ALTER TYPE "public"."enum__pages_v_blocks_card_grid_cards_tone" ADD VALUE 'blue';
  ALTER TYPE "public"."enum__pages_v_blocks_stats_stats_tone" ADD VALUE 'green';
  ALTER TYPE "public"."enum__pages_v_blocks_stats_stats_tone" ADD VALUE 'blue';
  ALTER TYPE "public"."enum__pages_v_blocks_values_values_tone" ADD VALUE 'green';
  ALTER TYPE "public"."enum__pages_v_blocks_values_values_tone" ADD VALUE 'blue';
  CREATE TABLE "pages_blocks_subheading" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"size" "enum_pages_blocks_subheading_size" DEFAULT 'large',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_steps_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"layout" "enum_pages_blocks_steps_layout" DEFAULT 'stacked',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_cards_cards_icon",
  	"tone" "enum_pages_blocks_cards_cards_tone" DEFAULT 'purple',
  	"price" varchar,
  	"title" varchar,
  	"body" varchar
  );
  
  CREATE TABLE "pages_blocks_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"columns" "enum_pages_blocks_cards_columns" DEFAULT '3',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_prices_prices" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"price" varchar,
  	"unit" varchar,
  	"note" varchar,
  	"featured" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_prices" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tone" "enum_pages_blocks_prices_tone" DEFAULT 'purple',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_note" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"style" "enum_pages_blocks_note_style" DEFAULT 'tinted',
  	"icon" "enum_pages_blocks_note_icon",
  	"text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_actions_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"variant" "enum_pages_blocks_actions_actions_variant" DEFAULT 'primary',
  	"arrow" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"button_tone" "enum_pages_blocks_actions_button_tone" DEFAULT 'purple',
  	"note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"style" "enum_pages_blocks_text_style" DEFAULT 'body',
  	"text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_list_panels_panels_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_list_panels_panels" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"style" "enum_pages_blocks_list_panels_panels_style" DEFAULT 'checks'
  );
  
  CREATE TABLE "pages_blocks_list_panels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"background" "enum_pages_blocks_section_background" DEFAULT 'white',
  	"intro_eyebrow" varchar,
  	"intro_heading" varchar,
  	"intro_badge" varchar,
  	"intro_lead" varchar,
  	"intro_layout" "enum_pages_blocks_section_intro_layout" DEFAULT 'stacked',
  	"aside" "enum_pages_blocks_section_aside" DEFAULT 'none',
  	"image_id" integer,
  	"accent" "enum_pages_blocks_section_accent" DEFAULT 'teal',
  	"beside_count" numeric DEFAULT 0,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_sticky_menu_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"anchor" varchar
  );
  
  CREATE TABLE "pages_blocks_sticky_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'On this page',
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_subheading" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"size" "enum__pages_v_blocks_subheading_size" DEFAULT 'large',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_steps_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"layout" "enum__pages_v_blocks_steps_layout" DEFAULT 'stacked',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_cards_cards_icon",
  	"tone" "enum__pages_v_blocks_cards_cards_tone" DEFAULT 'purple',
  	"price" varchar,
  	"title" varchar,
  	"body" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"columns" "enum__pages_v_blocks_cards_columns" DEFAULT '3',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_prices_prices" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"price" varchar,
  	"unit" varchar,
  	"note" varchar,
  	"featured" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_prices" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tone" "enum__pages_v_blocks_prices_tone" DEFAULT 'purple',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_note" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"style" "enum__pages_v_blocks_note_style" DEFAULT 'tinted',
  	"icon" "enum__pages_v_blocks_note_icon",
  	"text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_actions_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"variant" "enum__pages_v_blocks_actions_actions_variant" DEFAULT 'primary',
  	"arrow" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"button_tone" "enum__pages_v_blocks_actions_button_tone" DEFAULT 'purple',
  	"note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"style" "enum__pages_v_blocks_text_style" DEFAULT 'body',
  	"text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_list_panels_panels_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_list_panels_panels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"style" "enum__pages_v_blocks_list_panels_panels_style" DEFAULT 'checks',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_list_panels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"background" "enum__pages_v_blocks_section_background" DEFAULT 'white',
  	"intro_eyebrow" varchar,
  	"intro_heading" varchar,
  	"intro_badge" varchar,
  	"intro_lead" varchar,
  	"intro_layout" "enum__pages_v_blocks_section_intro_layout" DEFAULT 'stacked',
  	"aside" "enum__pages_v_blocks_section_aside" DEFAULT 'none',
  	"image_id" integer,
  	"accent" "enum__pages_v_blocks_section_accent" DEFAULT 'teal',
  	"beside_count" numeric DEFAULT 0,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_sticky_menu_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"anchor" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_sticky_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'On this page',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_subheading" ADD CONSTRAINT "pages_blocks_subheading_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_steps_steps" ADD CONSTRAINT "pages_blocks_steps_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_steps" ADD CONSTRAINT "pages_blocks_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cards_cards" ADD CONSTRAINT "pages_blocks_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cards" ADD CONSTRAINT "pages_blocks_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_prices_prices" ADD CONSTRAINT "pages_blocks_prices_prices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_prices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_prices" ADD CONSTRAINT "pages_blocks_prices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_note" ADD CONSTRAINT "pages_blocks_note_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_actions_actions" ADD CONSTRAINT "pages_blocks_actions_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_actions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_actions" ADD CONSTRAINT "pages_blocks_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_text" ADD CONSTRAINT "pages_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_list_panels_panels_items" ADD CONSTRAINT "pages_blocks_list_panels_panels_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_list_panels_panels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_list_panels_panels" ADD CONSTRAINT "pages_blocks_list_panels_panels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_list_panels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_list_panels" ADD CONSTRAINT "pages_blocks_list_panels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_section" ADD CONSTRAINT "pages_blocks_section_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_section" ADD CONSTRAINT "pages_blocks_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_sticky_menu_items" ADD CONSTRAINT "pages_blocks_sticky_menu_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_sticky_menu"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_sticky_menu" ADD CONSTRAINT "pages_blocks_sticky_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_subheading" ADD CONSTRAINT "_pages_v_blocks_subheading_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_steps_steps" ADD CONSTRAINT "_pages_v_blocks_steps_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_steps" ADD CONSTRAINT "_pages_v_blocks_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cards_cards" ADD CONSTRAINT "_pages_v_blocks_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cards" ADD CONSTRAINT "_pages_v_blocks_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_prices_prices" ADD CONSTRAINT "_pages_v_blocks_prices_prices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_prices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_prices" ADD CONSTRAINT "_pages_v_blocks_prices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_note" ADD CONSTRAINT "_pages_v_blocks_note_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_actions_actions" ADD CONSTRAINT "_pages_v_blocks_actions_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_actions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_actions" ADD CONSTRAINT "_pages_v_blocks_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_text" ADD CONSTRAINT "_pages_v_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_list_panels_panels_items" ADD CONSTRAINT "_pages_v_blocks_list_panels_panels_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_list_panels_panels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_list_panels_panels" ADD CONSTRAINT "_pages_v_blocks_list_panels_panels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_list_panels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_list_panels" ADD CONSTRAINT "_pages_v_blocks_list_panels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_section" ADD CONSTRAINT "_pages_v_blocks_section_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_section" ADD CONSTRAINT "_pages_v_blocks_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_sticky_menu_items" ADD CONSTRAINT "_pages_v_blocks_sticky_menu_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_sticky_menu"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_sticky_menu" ADD CONSTRAINT "_pages_v_blocks_sticky_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_subheading_order_idx" ON "pages_blocks_subheading" USING btree ("_order");
  CREATE INDEX "pages_blocks_subheading_parent_id_idx" ON "pages_blocks_subheading" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_subheading_path_idx" ON "pages_blocks_subheading" USING btree ("_path");
  CREATE INDEX "pages_blocks_steps_steps_order_idx" ON "pages_blocks_steps_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_steps_steps_parent_id_idx" ON "pages_blocks_steps_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_steps_order_idx" ON "pages_blocks_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_steps_parent_id_idx" ON "pages_blocks_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_steps_path_idx" ON "pages_blocks_steps" USING btree ("_path");
  CREATE INDEX "pages_blocks_cards_cards_order_idx" ON "pages_blocks_cards_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_cards_cards_parent_id_idx" ON "pages_blocks_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cards_order_idx" ON "pages_blocks_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_cards_parent_id_idx" ON "pages_blocks_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cards_path_idx" ON "pages_blocks_cards" USING btree ("_path");
  CREATE INDEX "pages_blocks_prices_prices_order_idx" ON "pages_blocks_prices_prices" USING btree ("_order");
  CREATE INDEX "pages_blocks_prices_prices_parent_id_idx" ON "pages_blocks_prices_prices" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_prices_order_idx" ON "pages_blocks_prices" USING btree ("_order");
  CREATE INDEX "pages_blocks_prices_parent_id_idx" ON "pages_blocks_prices" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_prices_path_idx" ON "pages_blocks_prices" USING btree ("_path");
  CREATE INDEX "pages_blocks_note_order_idx" ON "pages_blocks_note" USING btree ("_order");
  CREATE INDEX "pages_blocks_note_parent_id_idx" ON "pages_blocks_note" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_note_path_idx" ON "pages_blocks_note" USING btree ("_path");
  CREATE INDEX "pages_blocks_actions_actions_order_idx" ON "pages_blocks_actions_actions" USING btree ("_order");
  CREATE INDEX "pages_blocks_actions_actions_parent_id_idx" ON "pages_blocks_actions_actions" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_actions_order_idx" ON "pages_blocks_actions" USING btree ("_order");
  CREATE INDEX "pages_blocks_actions_parent_id_idx" ON "pages_blocks_actions" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_actions_path_idx" ON "pages_blocks_actions" USING btree ("_path");
  CREATE INDEX "pages_blocks_text_order_idx" ON "pages_blocks_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_text_parent_id_idx" ON "pages_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_text_path_idx" ON "pages_blocks_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_list_panels_panels_items_order_idx" ON "pages_blocks_list_panels_panels_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_list_panels_panels_items_parent_id_idx" ON "pages_blocks_list_panels_panels_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_list_panels_panels_order_idx" ON "pages_blocks_list_panels_panels" USING btree ("_order");
  CREATE INDEX "pages_blocks_list_panels_panels_parent_id_idx" ON "pages_blocks_list_panels_panels" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_list_panels_order_idx" ON "pages_blocks_list_panels" USING btree ("_order");
  CREATE INDEX "pages_blocks_list_panels_parent_id_idx" ON "pages_blocks_list_panels" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_list_panels_path_idx" ON "pages_blocks_list_panels" USING btree ("_path");
  CREATE INDEX "pages_blocks_section_order_idx" ON "pages_blocks_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_section_parent_id_idx" ON "pages_blocks_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_section_path_idx" ON "pages_blocks_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_section_image_idx" ON "pages_blocks_section" USING btree ("image_id");
  CREATE INDEX "pages_blocks_sticky_menu_items_order_idx" ON "pages_blocks_sticky_menu_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_sticky_menu_items_parent_id_idx" ON "pages_blocks_sticky_menu_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_sticky_menu_order_idx" ON "pages_blocks_sticky_menu" USING btree ("_order");
  CREATE INDEX "pages_blocks_sticky_menu_parent_id_idx" ON "pages_blocks_sticky_menu" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_sticky_menu_path_idx" ON "pages_blocks_sticky_menu" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_subheading_order_idx" ON "_pages_v_blocks_subheading" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_subheading_parent_id_idx" ON "_pages_v_blocks_subheading" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_subheading_path_idx" ON "_pages_v_blocks_subheading" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_steps_steps_order_idx" ON "_pages_v_blocks_steps_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_steps_steps_parent_id_idx" ON "_pages_v_blocks_steps_steps" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_steps_order_idx" ON "_pages_v_blocks_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_steps_parent_id_idx" ON "_pages_v_blocks_steps" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_steps_path_idx" ON "_pages_v_blocks_steps" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cards_cards_order_idx" ON "_pages_v_blocks_cards_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cards_cards_parent_id_idx" ON "_pages_v_blocks_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cards_order_idx" ON "_pages_v_blocks_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cards_parent_id_idx" ON "_pages_v_blocks_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cards_path_idx" ON "_pages_v_blocks_cards" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_prices_prices_order_idx" ON "_pages_v_blocks_prices_prices" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_prices_prices_parent_id_idx" ON "_pages_v_blocks_prices_prices" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_prices_order_idx" ON "_pages_v_blocks_prices" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_prices_parent_id_idx" ON "_pages_v_blocks_prices" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_prices_path_idx" ON "_pages_v_blocks_prices" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_note_order_idx" ON "_pages_v_blocks_note" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_note_parent_id_idx" ON "_pages_v_blocks_note" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_note_path_idx" ON "_pages_v_blocks_note" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_actions_actions_order_idx" ON "_pages_v_blocks_actions_actions" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_actions_actions_parent_id_idx" ON "_pages_v_blocks_actions_actions" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_actions_order_idx" ON "_pages_v_blocks_actions" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_actions_parent_id_idx" ON "_pages_v_blocks_actions" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_actions_path_idx" ON "_pages_v_blocks_actions" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_text_order_idx" ON "_pages_v_blocks_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_text_parent_id_idx" ON "_pages_v_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_text_path_idx" ON "_pages_v_blocks_text" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_list_panels_panels_items_order_idx" ON "_pages_v_blocks_list_panels_panels_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_list_panels_panels_items_parent_id_idx" ON "_pages_v_blocks_list_panels_panels_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_list_panels_panels_order_idx" ON "_pages_v_blocks_list_panels_panels" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_list_panels_panels_parent_id_idx" ON "_pages_v_blocks_list_panels_panels" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_list_panels_order_idx" ON "_pages_v_blocks_list_panels" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_list_panels_parent_id_idx" ON "_pages_v_blocks_list_panels" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_list_panels_path_idx" ON "_pages_v_blocks_list_panels" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_section_order_idx" ON "_pages_v_blocks_section" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_section_parent_id_idx" ON "_pages_v_blocks_section" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_section_path_idx" ON "_pages_v_blocks_section" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_section_image_idx" ON "_pages_v_blocks_section" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_sticky_menu_items_order_idx" ON "_pages_v_blocks_sticky_menu_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_sticky_menu_items_parent_id_idx" ON "_pages_v_blocks_sticky_menu_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_sticky_menu_order_idx" ON "_pages_v_blocks_sticky_menu" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_sticky_menu_parent_id_idx" ON "_pages_v_blocks_sticky_menu" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_sticky_menu_path_idx" ON "_pages_v_blocks_sticky_menu" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_subheading" CASCADE;
  DROP TABLE "pages_blocks_steps_steps" CASCADE;
  DROP TABLE "pages_blocks_steps" CASCADE;
  DROP TABLE "pages_blocks_cards_cards" CASCADE;
  DROP TABLE "pages_blocks_cards" CASCADE;
  DROP TABLE "pages_blocks_prices_prices" CASCADE;
  DROP TABLE "pages_blocks_prices" CASCADE;
  DROP TABLE "pages_blocks_note" CASCADE;
  DROP TABLE "pages_blocks_actions_actions" CASCADE;
  DROP TABLE "pages_blocks_actions" CASCADE;
  DROP TABLE "pages_blocks_text" CASCADE;
  DROP TABLE "pages_blocks_list_panels_panels_items" CASCADE;
  DROP TABLE "pages_blocks_list_panels_panels" CASCADE;
  DROP TABLE "pages_blocks_list_panels" CASCADE;
  DROP TABLE "pages_blocks_section" CASCADE;
  DROP TABLE "pages_blocks_sticky_menu_items" CASCADE;
  DROP TABLE "pages_blocks_sticky_menu" CASCADE;
  DROP TABLE "_pages_v_blocks_subheading" CASCADE;
  DROP TABLE "_pages_v_blocks_steps_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_cards_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_prices_prices" CASCADE;
  DROP TABLE "_pages_v_blocks_prices" CASCADE;
  DROP TABLE "_pages_v_blocks_note" CASCADE;
  DROP TABLE "_pages_v_blocks_actions_actions" CASCADE;
  DROP TABLE "_pages_v_blocks_actions" CASCADE;
  DROP TABLE "_pages_v_blocks_text" CASCADE;
  DROP TABLE "_pages_v_blocks_list_panels_panels_items" CASCADE;
  DROP TABLE "_pages_v_blocks_list_panels_panels" CASCADE;
  DROP TABLE "_pages_v_blocks_list_panels" CASCADE;
  DROP TABLE "_pages_v_blocks_section" CASCADE;
  DROP TABLE "_pages_v_blocks_sticky_menu_items" CASCADE;
  DROP TABLE "_pages_v_blocks_sticky_menu" CASCADE;
  ALTER TABLE "pages_blocks_hero_tiles" ALTER COLUMN "tone" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_hero_tiles" ALTER COLUMN "tone" SET DEFAULT 'purple'::text;
  DROP TYPE "public"."enum_pages_blocks_hero_tiles_tone";
  CREATE TYPE "public"."enum_pages_blocks_hero_tiles_tone" AS ENUM('purple', 'terracotta', 'teal', 'ochre');
  ALTER TABLE "pages_blocks_hero_tiles" ALTER COLUMN "tone" SET DEFAULT 'purple'::"public"."enum_pages_blocks_hero_tiles_tone";
  ALTER TABLE "pages_blocks_hero_tiles" ALTER COLUMN "tone" SET DATA TYPE "public"."enum_pages_blocks_hero_tiles_tone" USING "tone"::"public"."enum_pages_blocks_hero_tiles_tone";
  ALTER TABLE "pages_blocks_card_grid_cards" ALTER COLUMN "tone" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_card_grid_cards" ALTER COLUMN "tone" SET DEFAULT 'purple'::text;
  DROP TYPE "public"."enum_pages_blocks_card_grid_cards_tone";
  CREATE TYPE "public"."enum_pages_blocks_card_grid_cards_tone" AS ENUM('purple', 'terracotta', 'teal', 'ochre');
  ALTER TABLE "pages_blocks_card_grid_cards" ALTER COLUMN "tone" SET DEFAULT 'purple'::"public"."enum_pages_blocks_card_grid_cards_tone";
  ALTER TABLE "pages_blocks_card_grid_cards" ALTER COLUMN "tone" SET DATA TYPE "public"."enum_pages_blocks_card_grid_cards_tone" USING "tone"::"public"."enum_pages_blocks_card_grid_cards_tone";
  ALTER TABLE "pages_blocks_stats_stats" ALTER COLUMN "tone" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_stats_stats" ALTER COLUMN "tone" SET DEFAULT 'purple'::text;
  DROP TYPE "public"."enum_pages_blocks_stats_stats_tone";
  CREATE TYPE "public"."enum_pages_blocks_stats_stats_tone" AS ENUM('purple', 'terracotta', 'teal', 'ochre');
  ALTER TABLE "pages_blocks_stats_stats" ALTER COLUMN "tone" SET DEFAULT 'purple'::"public"."enum_pages_blocks_stats_stats_tone";
  ALTER TABLE "pages_blocks_stats_stats" ALTER COLUMN "tone" SET DATA TYPE "public"."enum_pages_blocks_stats_stats_tone" USING "tone"::"public"."enum_pages_blocks_stats_stats_tone";
  ALTER TABLE "pages_blocks_values_values" ALTER COLUMN "tone" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_values_values" ALTER COLUMN "tone" SET DEFAULT 'purple'::text;
  DROP TYPE "public"."enum_pages_blocks_values_values_tone";
  CREATE TYPE "public"."enum_pages_blocks_values_values_tone" AS ENUM('purple', 'terracotta', 'teal', 'ochre');
  ALTER TABLE "pages_blocks_values_values" ALTER COLUMN "tone" SET DEFAULT 'purple'::"public"."enum_pages_blocks_values_values_tone";
  ALTER TABLE "pages_blocks_values_values" ALTER COLUMN "tone" SET DATA TYPE "public"."enum_pages_blocks_values_values_tone" USING "tone"::"public"."enum_pages_blocks_values_values_tone";
  ALTER TABLE "_pages_v_blocks_hero_tiles" ALTER COLUMN "tone" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_hero_tiles" ALTER COLUMN "tone" SET DEFAULT 'purple'::text;
  DROP TYPE "public"."enum__pages_v_blocks_hero_tiles_tone";
  CREATE TYPE "public"."enum__pages_v_blocks_hero_tiles_tone" AS ENUM('purple', 'terracotta', 'teal', 'ochre');
  ALTER TABLE "_pages_v_blocks_hero_tiles" ALTER COLUMN "tone" SET DEFAULT 'purple'::"public"."enum__pages_v_blocks_hero_tiles_tone";
  ALTER TABLE "_pages_v_blocks_hero_tiles" ALTER COLUMN "tone" SET DATA TYPE "public"."enum__pages_v_blocks_hero_tiles_tone" USING "tone"::"public"."enum__pages_v_blocks_hero_tiles_tone";
  ALTER TABLE "_pages_v_blocks_card_grid_cards" ALTER COLUMN "tone" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_card_grid_cards" ALTER COLUMN "tone" SET DEFAULT 'purple'::text;
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_cards_tone";
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_cards_tone" AS ENUM('purple', 'terracotta', 'teal', 'ochre');
  ALTER TABLE "_pages_v_blocks_card_grid_cards" ALTER COLUMN "tone" SET DEFAULT 'purple'::"public"."enum__pages_v_blocks_card_grid_cards_tone";
  ALTER TABLE "_pages_v_blocks_card_grid_cards" ALTER COLUMN "tone" SET DATA TYPE "public"."enum__pages_v_blocks_card_grid_cards_tone" USING "tone"::"public"."enum__pages_v_blocks_card_grid_cards_tone";
  ALTER TABLE "_pages_v_blocks_stats_stats" ALTER COLUMN "tone" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_stats_stats" ALTER COLUMN "tone" SET DEFAULT 'purple'::text;
  DROP TYPE "public"."enum__pages_v_blocks_stats_stats_tone";
  CREATE TYPE "public"."enum__pages_v_blocks_stats_stats_tone" AS ENUM('purple', 'terracotta', 'teal', 'ochre');
  ALTER TABLE "_pages_v_blocks_stats_stats" ALTER COLUMN "tone" SET DEFAULT 'purple'::"public"."enum__pages_v_blocks_stats_stats_tone";
  ALTER TABLE "_pages_v_blocks_stats_stats" ALTER COLUMN "tone" SET DATA TYPE "public"."enum__pages_v_blocks_stats_stats_tone" USING "tone"::"public"."enum__pages_v_blocks_stats_stats_tone";
  ALTER TABLE "_pages_v_blocks_values_values" ALTER COLUMN "tone" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_values_values" ALTER COLUMN "tone" SET DEFAULT 'purple'::text;
  DROP TYPE "public"."enum__pages_v_blocks_values_values_tone";
  CREATE TYPE "public"."enum__pages_v_blocks_values_values_tone" AS ENUM('purple', 'terracotta', 'teal', 'ochre');
  ALTER TABLE "_pages_v_blocks_values_values" ALTER COLUMN "tone" SET DEFAULT 'purple'::"public"."enum__pages_v_blocks_values_values_tone";
  ALTER TABLE "_pages_v_blocks_values_values" ALTER COLUMN "tone" SET DATA TYPE "public"."enum__pages_v_blocks_values_values_tone" USING "tone"::"public"."enum__pages_v_blocks_values_values_tone";
  DROP TYPE "public"."enum_pages_blocks_subheading_size";
  DROP TYPE "public"."enum_pages_blocks_steps_layout";
  DROP TYPE "public"."enum_pages_blocks_cards_cards_icon";
  DROP TYPE "public"."enum_pages_blocks_cards_cards_tone";
  DROP TYPE "public"."enum_pages_blocks_cards_columns";
  DROP TYPE "public"."enum_pages_blocks_prices_tone";
  DROP TYPE "public"."enum_pages_blocks_note_style";
  DROP TYPE "public"."enum_pages_blocks_note_icon";
  DROP TYPE "public"."enum_pages_blocks_actions_actions_variant";
  DROP TYPE "public"."enum_pages_blocks_actions_button_tone";
  DROP TYPE "public"."enum_pages_blocks_text_style";
  DROP TYPE "public"."enum_pages_blocks_list_panels_panels_style";
  DROP TYPE "public"."enum_pages_blocks_section_background";
  DROP TYPE "public"."enum_pages_blocks_section_intro_layout";
  DROP TYPE "public"."enum_pages_blocks_section_aside";
  DROP TYPE "public"."enum_pages_blocks_section_accent";
  DROP TYPE "public"."enum__pages_v_blocks_subheading_size";
  DROP TYPE "public"."enum__pages_v_blocks_steps_layout";
  DROP TYPE "public"."enum__pages_v_blocks_cards_cards_icon";
  DROP TYPE "public"."enum__pages_v_blocks_cards_cards_tone";
  DROP TYPE "public"."enum__pages_v_blocks_cards_columns";
  DROP TYPE "public"."enum__pages_v_blocks_prices_tone";
  DROP TYPE "public"."enum__pages_v_blocks_note_style";
  DROP TYPE "public"."enum__pages_v_blocks_note_icon";
  DROP TYPE "public"."enum__pages_v_blocks_actions_actions_variant";
  DROP TYPE "public"."enum__pages_v_blocks_actions_button_tone";
  DROP TYPE "public"."enum__pages_v_blocks_text_style";
  DROP TYPE "public"."enum__pages_v_blocks_list_panels_panels_style";
  DROP TYPE "public"."enum__pages_v_blocks_section_background";
  DROP TYPE "public"."enum__pages_v_blocks_section_intro_layout";
  DROP TYPE "public"."enum__pages_v_blocks_section_aside";
  DROP TYPE "public"."enum__pages_v_blocks_section_accent";`)
}
