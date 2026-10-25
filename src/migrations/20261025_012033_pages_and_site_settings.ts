import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_hero_actions_variant" AS ENUM('primary', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_hero_tiles_icon" AS ENUM('phone', 'people', 'home', 'chart', 'user', 'briefcase', 'graduation', 'bank', 'leaf', 'heart', 'wave');
  CREATE TYPE "public"."enum_pages_blocks_hero_tiles_tone" AS ENUM('purple', 'terracotta', 'teal', 'ochre');
  CREATE TYPE "public"."enum_pages_blocks_hero_art" AS ENUM('checkIn', 'photo', 'tiles', 'none');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_cards_kind" AS ENUM('card', 'photo');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_cards_icon" AS ENUM('phone', 'people', 'home', 'chart', 'user', 'briefcase', 'graduation', 'bank', 'leaf', 'heart', 'wave');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_cards_tone" AS ENUM('purple', 'terracotta', 'teal', 'ochre');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_background" AS ENUM('white', 'cream');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_intro_layout" AS ENUM('stacked', 'split', 'centred');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_columns" AS ENUM('3', '4');
  CREATE TYPE "public"."enum_pages_blocks_path_cards_paths_icon" AS ENUM('phone', 'people', 'home', 'chart', 'user', 'briefcase', 'graduation', 'bank', 'leaf', 'heart', 'wave');
  CREATE TYPE "public"."enum_pages_blocks_path_cards_intro_layout" AS ENUM('stacked', 'split', 'centred');
  CREATE TYPE "public"."enum_pages_blocks_story_timeline_moments_dot" AS ENUM('yellow', 'orange', 'green', 'purple');
  CREATE TYPE "public"."enum_pages_blocks_story_timeline_intro_layout" AS ENUM('stacked', 'split', 'centred');
  CREATE TYPE "public"."enum_pages_blocks_stats_stats_tone" AS ENUM('purple', 'terracotta', 'teal', 'ochre');
  CREATE TYPE "public"."enum_pages_blocks_stats_background" AS ENUM('white', 'cream');
  CREATE TYPE "public"."enum_pages_blocks_stats_intro_layout" AS ENUM('stacked', 'split', 'centred');
  CREATE TYPE "public"."enum_pages_blocks_feature_split_background" AS ENUM('white', 'cream');
  CREATE TYPE "public"."enum_pages_blocks_feature_split_intro_layout" AS ENUM('stacked', 'split', 'centred');
  CREATE TYPE "public"."enum_pages_blocks_values_values_tone" AS ENUM('purple', 'terracotta', 'teal', 'ochre');
  CREATE TYPE "public"."enum_pages_blocks_cta_band_actions_variant" AS ENUM('primary', 'outline');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_actions_variant" AS ENUM('primary', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_tiles_icon" AS ENUM('phone', 'people', 'home', 'chart', 'user', 'briefcase', 'graduation', 'bank', 'leaf', 'heart', 'wave');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_tiles_tone" AS ENUM('purple', 'terracotta', 'teal', 'ochre');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_art" AS ENUM('checkIn', 'photo', 'tiles', 'none');
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_cards_kind" AS ENUM('card', 'photo');
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_cards_icon" AS ENUM('phone', 'people', 'home', 'chart', 'user', 'briefcase', 'graduation', 'bank', 'leaf', 'heart', 'wave');
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_cards_tone" AS ENUM('purple', 'terracotta', 'teal', 'ochre');
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_background" AS ENUM('white', 'cream');
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_intro_layout" AS ENUM('stacked', 'split', 'centred');
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_columns" AS ENUM('3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_path_cards_paths_icon" AS ENUM('phone', 'people', 'home', 'chart', 'user', 'briefcase', 'graduation', 'bank', 'leaf', 'heart', 'wave');
  CREATE TYPE "public"."enum__pages_v_blocks_path_cards_intro_layout" AS ENUM('stacked', 'split', 'centred');
  CREATE TYPE "public"."enum__pages_v_blocks_story_timeline_moments_dot" AS ENUM('yellow', 'orange', 'green', 'purple');
  CREATE TYPE "public"."enum__pages_v_blocks_story_timeline_intro_layout" AS ENUM('stacked', 'split', 'centred');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_stats_tone" AS ENUM('purple', 'terracotta', 'teal', 'ochre');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_background" AS ENUM('white', 'cream');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_intro_layout" AS ENUM('stacked', 'split', 'centred');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_split_background" AS ENUM('white', 'cream');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_split_intro_layout" AS ENUM('stacked', 'split', 'centred');
  CREATE TYPE "public"."enum__pages_v_blocks_values_values_tone" AS ENUM('purple', 'terracotta', 'teal', 'ochre');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_band_actions_variant" AS ENUM('primary', 'outline');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "pages_blocks_hero_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"variant" "enum_pages_blocks_hero_actions_variant" DEFAULT 'primary',
  	"arrow" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_hero_tiles" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"icon" "enum_pages_blocks_hero_tiles_icon",
  	"tone" "enum_pages_blocks_hero_tiles_tone" DEFAULT 'purple'
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"highlight" varchar,
  	"lead" varchar,
  	"art" "enum_pages_blocks_hero_art" DEFAULT 'photo',
  	"image_id" integer,
  	"check_in_label" varchar DEFAULT 'Today’s check-in',
  	"check_in_status" varchar DEFAULT 'Conditional',
  	"check_in_hint" varchar DEFAULT 'Try a two-minute reset first',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_card_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_pages_blocks_card_grid_cards_kind" DEFAULT 'card',
  	"icon" "enum_pages_blocks_card_grid_cards_icon",
  	"tone" "enum_pages_blocks_card_grid_cards_tone" DEFAULT 'purple',
  	"title" varchar,
  	"body" varchar,
  	"badge" varchar,
  	"link_label" varchar,
  	"link_href" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_card_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"background" "enum_pages_blocks_card_grid_background" DEFAULT 'white',
  	"intro_eyebrow" varchar,
  	"intro_heading" varchar,
  	"intro_lead" varchar,
  	"intro_layout" "enum_pages_blocks_card_grid_intro_layout" DEFAULT 'stacked',
  	"columns" "enum_pages_blocks_card_grid_columns" DEFAULT '3',
  	"action_label" varchar,
  	"action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_path_cards_paths" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_path_cards_paths_icon",
  	"title" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "pages_blocks_path_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"intro_eyebrow" varchar,
  	"intro_heading" varchar,
  	"intro_lead" varchar,
  	"intro_layout" "enum_pages_blocks_path_cards_intro_layout" DEFAULT 'stacked',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_story_timeline_moments" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"time" varchar,
  	"text" varchar,
  	"dot" "enum_pages_blocks_story_timeline_moments_dot" DEFAULT 'purple'
  );
  
  CREATE TABLE "pages_blocks_story_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"intro_eyebrow" varchar,
  	"intro_heading" varchar,
  	"intro_lead" varchar,
  	"intro_layout" "enum_pages_blocks_story_timeline_intro_layout" DEFAULT 'stacked',
  	"image_id" integer,
  	"image_badge" varchar DEFAULT 'Illustrative story',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"source" varchar,
  	"tone" "enum_pages_blocks_stats_stats_tone" DEFAULT 'purple'
  );
  
  CREATE TABLE "pages_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background" "enum_pages_blocks_stats_background" DEFAULT 'white',
  	"intro_eyebrow" varchar,
  	"intro_heading" varchar,
  	"intro_lead" varchar,
  	"intro_layout" "enum_pages_blocks_stats_intro_layout" DEFAULT 'stacked',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_feature_split_figures" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_feature_split" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background" "enum_pages_blocks_feature_split_background" DEFAULT 'white',
  	"intro_eyebrow" varchar,
  	"intro_heading" varchar,
  	"intro_lead" varchar,
  	"intro_layout" "enum_pages_blocks_feature_split_intro_layout" DEFAULT 'stacked',
  	"link_label" varchar,
  	"link_href" varchar,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_values_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"tone" "enum_pages_blocks_values_values_tone" DEFAULT 'purple'
  );
  
  CREATE TABLE "pages_blocks_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"highlight" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_band_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"variant" "enum_pages_blocks_cta_band_actions_variant" DEFAULT 'primary',
  	"arrow" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_cta_band" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_pages_v_blocks_hero_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"variant" "enum__pages_v_blocks_hero_actions_variant" DEFAULT 'primary',
  	"arrow" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_tiles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"icon" "enum__pages_v_blocks_hero_tiles_icon",
  	"tone" "enum__pages_v_blocks_hero_tiles_tone" DEFAULT 'purple',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"highlight" varchar,
  	"lead" varchar,
  	"art" "enum__pages_v_blocks_hero_art" DEFAULT 'photo',
  	"image_id" integer,
  	"check_in_label" varchar DEFAULT 'Today’s check-in',
  	"check_in_status" varchar DEFAULT 'Conditional',
  	"check_in_hint" varchar DEFAULT 'Try a two-minute reset first',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_card_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kind" "enum__pages_v_blocks_card_grid_cards_kind" DEFAULT 'card',
  	"icon" "enum__pages_v_blocks_card_grid_cards_icon",
  	"tone" "enum__pages_v_blocks_card_grid_cards_tone" DEFAULT 'purple',
  	"title" varchar,
  	"body" varchar,
  	"badge" varchar,
  	"link_label" varchar,
  	"link_href" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_card_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"background" "enum__pages_v_blocks_card_grid_background" DEFAULT 'white',
  	"intro_eyebrow" varchar,
  	"intro_heading" varchar,
  	"intro_lead" varchar,
  	"intro_layout" "enum__pages_v_blocks_card_grid_intro_layout" DEFAULT 'stacked',
  	"columns" "enum__pages_v_blocks_card_grid_columns" DEFAULT '3',
  	"action_label" varchar,
  	"action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_path_cards_paths" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_path_cards_paths_icon",
  	"title" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_path_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"intro_eyebrow" varchar,
  	"intro_heading" varchar,
  	"intro_lead" varchar,
  	"intro_layout" "enum__pages_v_blocks_path_cards_intro_layout" DEFAULT 'stacked',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_story_timeline_moments" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"time" varchar,
  	"text" varchar,
  	"dot" "enum__pages_v_blocks_story_timeline_moments_dot" DEFAULT 'purple',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_story_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"intro_eyebrow" varchar,
  	"intro_heading" varchar,
  	"intro_lead" varchar,
  	"intro_layout" "enum__pages_v_blocks_story_timeline_intro_layout" DEFAULT 'stacked',
  	"image_id" integer,
  	"image_badge" varchar DEFAULT 'Illustrative story',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"source" varchar,
  	"tone" "enum__pages_v_blocks_stats_stats_tone" DEFAULT 'purple',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background" "enum__pages_v_blocks_stats_background" DEFAULT 'white',
  	"intro_eyebrow" varchar,
  	"intro_heading" varchar,
  	"intro_lead" varchar,
  	"intro_layout" "enum__pages_v_blocks_stats_intro_layout" DEFAULT 'stacked',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_split_figures" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_split" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background" "enum__pages_v_blocks_feature_split_background" DEFAULT 'white',
  	"intro_eyebrow" varchar,
  	"intro_heading" varchar,
  	"intro_lead" varchar,
  	"intro_layout" "enum__pages_v_blocks_feature_split_intro_layout" DEFAULT 'stacked',
  	"link_label" varchar,
  	"link_href" varchar,
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_values_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"tone" "enum__pages_v_blocks_values_values_tone" DEFAULT 'purple',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"highlight" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_band_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"variant" "enum__pages_v_blocks_cta_band_actions_variant" DEFAULT 'primary',
  	"arrow" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_band" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"legal_name" varchar DEFAULT 'Figcit Ltd' NOT NULL,
  	"company_number" varchar,
  	"email" varchar DEFAULT 'admin@figcit.co.uk' NOT NULL,
  	"phone" varchar,
  	"locality" varchar DEFAULT 'Reading',
  	"region" varchar DEFAULT 'Thames Valley',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "pages_blocks_hero_actions" ADD CONSTRAINT "pages_blocks_hero_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_tiles" ADD CONSTRAINT "pages_blocks_hero_tiles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_grid_cards" ADD CONSTRAINT "pages_blocks_card_grid_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_grid_cards" ADD CONSTRAINT "pages_blocks_card_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_grid" ADD CONSTRAINT "pages_blocks_card_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_path_cards_paths" ADD CONSTRAINT "pages_blocks_path_cards_paths_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_path_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_path_cards" ADD CONSTRAINT "pages_blocks_path_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_story_timeline_moments" ADD CONSTRAINT "pages_blocks_story_timeline_moments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_story_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_story_timeline" ADD CONSTRAINT "pages_blocks_story_timeline_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_story_timeline" ADD CONSTRAINT "pages_blocks_story_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_stats" ADD CONSTRAINT "pages_blocks_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats" ADD CONSTRAINT "pages_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_split_figures" ADD CONSTRAINT "pages_blocks_feature_split_figures_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_split"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_split" ADD CONSTRAINT "pages_blocks_feature_split_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_split" ADD CONSTRAINT "pages_blocks_feature_split_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_values_values" ADD CONSTRAINT "pages_blocks_values_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_values"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_values" ADD CONSTRAINT "pages_blocks_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_band_actions" ADD CONSTRAINT "pages_blocks_cta_band_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta_band"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_band" ADD CONSTRAINT "pages_blocks_cta_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_actions" ADD CONSTRAINT "_pages_v_blocks_hero_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_tiles" ADD CONSTRAINT "_pages_v_blocks_hero_tiles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_grid_cards" ADD CONSTRAINT "_pages_v_blocks_card_grid_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_grid_cards" ADD CONSTRAINT "_pages_v_blocks_card_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_grid" ADD CONSTRAINT "_pages_v_blocks_card_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_path_cards_paths" ADD CONSTRAINT "_pages_v_blocks_path_cards_paths_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_path_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_path_cards" ADD CONSTRAINT "_pages_v_blocks_path_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_story_timeline_moments" ADD CONSTRAINT "_pages_v_blocks_story_timeline_moments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_story_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_story_timeline" ADD CONSTRAINT "_pages_v_blocks_story_timeline_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_story_timeline" ADD CONSTRAINT "_pages_v_blocks_story_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_stats" ADD CONSTRAINT "_pages_v_blocks_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats" ADD CONSTRAINT "_pages_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_split_figures" ADD CONSTRAINT "_pages_v_blocks_feature_split_figures_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_split"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_split" ADD CONSTRAINT "_pages_v_blocks_feature_split_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_split" ADD CONSTRAINT "_pages_v_blocks_feature_split_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_values_values" ADD CONSTRAINT "_pages_v_blocks_values_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_values"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_values" ADD CONSTRAINT "_pages_v_blocks_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_band_actions" ADD CONSTRAINT "_pages_v_blocks_cta_band_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta_band"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_band" ADD CONSTRAINT "_pages_v_blocks_cta_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_actions_order_idx" ON "pages_blocks_hero_actions" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_actions_parent_id_idx" ON "pages_blocks_hero_actions" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_tiles_order_idx" ON "pages_blocks_hero_tiles" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_tiles_parent_id_idx" ON "pages_blocks_hero_tiles" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_image_idx" ON "pages_blocks_hero" USING btree ("image_id");
  CREATE INDEX "pages_blocks_card_grid_cards_order_idx" ON "pages_blocks_card_grid_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_card_grid_cards_parent_id_idx" ON "pages_blocks_card_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_card_grid_cards_image_idx" ON "pages_blocks_card_grid_cards" USING btree ("image_id");
  CREATE INDEX "pages_blocks_card_grid_order_idx" ON "pages_blocks_card_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_card_grid_parent_id_idx" ON "pages_blocks_card_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_card_grid_path_idx" ON "pages_blocks_card_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_path_cards_paths_order_idx" ON "pages_blocks_path_cards_paths" USING btree ("_order");
  CREATE INDEX "pages_blocks_path_cards_paths_parent_id_idx" ON "pages_blocks_path_cards_paths" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_path_cards_order_idx" ON "pages_blocks_path_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_path_cards_parent_id_idx" ON "pages_blocks_path_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_path_cards_path_idx" ON "pages_blocks_path_cards" USING btree ("_path");
  CREATE INDEX "pages_blocks_story_timeline_moments_order_idx" ON "pages_blocks_story_timeline_moments" USING btree ("_order");
  CREATE INDEX "pages_blocks_story_timeline_moments_parent_id_idx" ON "pages_blocks_story_timeline_moments" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_story_timeline_order_idx" ON "pages_blocks_story_timeline" USING btree ("_order");
  CREATE INDEX "pages_blocks_story_timeline_parent_id_idx" ON "pages_blocks_story_timeline" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_story_timeline_path_idx" ON "pages_blocks_story_timeline" USING btree ("_path");
  CREATE INDEX "pages_blocks_story_timeline_image_idx" ON "pages_blocks_story_timeline" USING btree ("image_id");
  CREATE INDEX "pages_blocks_stats_stats_order_idx" ON "pages_blocks_stats_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_stats_parent_id_idx" ON "pages_blocks_stats_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_order_idx" ON "pages_blocks_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_parent_id_idx" ON "pages_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_path_idx" ON "pages_blocks_stats" USING btree ("_path");
  CREATE INDEX "pages_blocks_feature_split_figures_order_idx" ON "pages_blocks_feature_split_figures" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_split_figures_parent_id_idx" ON "pages_blocks_feature_split_figures" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_split_order_idx" ON "pages_blocks_feature_split" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_split_parent_id_idx" ON "pages_blocks_feature_split" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_split_path_idx" ON "pages_blocks_feature_split" USING btree ("_path");
  CREATE INDEX "pages_blocks_feature_split_image_idx" ON "pages_blocks_feature_split" USING btree ("image_id");
  CREATE INDEX "pages_blocks_values_values_order_idx" ON "pages_blocks_values_values" USING btree ("_order");
  CREATE INDEX "pages_blocks_values_values_parent_id_idx" ON "pages_blocks_values_values" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_values_order_idx" ON "pages_blocks_values" USING btree ("_order");
  CREATE INDEX "pages_blocks_values_parent_id_idx" ON "pages_blocks_values" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_values_path_idx" ON "pages_blocks_values" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_band_actions_order_idx" ON "pages_blocks_cta_band_actions" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_band_actions_parent_id_idx" ON "pages_blocks_cta_band_actions" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_band_order_idx" ON "pages_blocks_cta_band" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_band_parent_id_idx" ON "pages_blocks_cta_band" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_band_path_idx" ON "pages_blocks_cta_band" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "_pages_v_blocks_hero_actions_order_idx" ON "_pages_v_blocks_hero_actions" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_actions_parent_id_idx" ON "_pages_v_blocks_hero_actions" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_tiles_order_idx" ON "_pages_v_blocks_hero_tiles" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_tiles_parent_id_idx" ON "_pages_v_blocks_hero_tiles" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_image_idx" ON "_pages_v_blocks_hero" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_card_grid_cards_order_idx" ON "_pages_v_blocks_card_grid_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_card_grid_cards_parent_id_idx" ON "_pages_v_blocks_card_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_card_grid_cards_image_idx" ON "_pages_v_blocks_card_grid_cards" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_card_grid_order_idx" ON "_pages_v_blocks_card_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_card_grid_parent_id_idx" ON "_pages_v_blocks_card_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_card_grid_path_idx" ON "_pages_v_blocks_card_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_path_cards_paths_order_idx" ON "_pages_v_blocks_path_cards_paths" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_path_cards_paths_parent_id_idx" ON "_pages_v_blocks_path_cards_paths" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_path_cards_order_idx" ON "_pages_v_blocks_path_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_path_cards_parent_id_idx" ON "_pages_v_blocks_path_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_path_cards_path_idx" ON "_pages_v_blocks_path_cards" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_story_timeline_moments_order_idx" ON "_pages_v_blocks_story_timeline_moments" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_story_timeline_moments_parent_id_idx" ON "_pages_v_blocks_story_timeline_moments" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_story_timeline_order_idx" ON "_pages_v_blocks_story_timeline" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_story_timeline_parent_id_idx" ON "_pages_v_blocks_story_timeline" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_story_timeline_path_idx" ON "_pages_v_blocks_story_timeline" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_story_timeline_image_idx" ON "_pages_v_blocks_story_timeline" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_stats_stats_order_idx" ON "_pages_v_blocks_stats_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_stats_parent_id_idx" ON "_pages_v_blocks_stats_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_order_idx" ON "_pages_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_parent_id_idx" ON "_pages_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_path_idx" ON "_pages_v_blocks_stats" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_feature_split_figures_order_idx" ON "_pages_v_blocks_feature_split_figures" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_split_figures_parent_id_idx" ON "_pages_v_blocks_feature_split_figures" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_split_order_idx" ON "_pages_v_blocks_feature_split" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_split_parent_id_idx" ON "_pages_v_blocks_feature_split" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_split_path_idx" ON "_pages_v_blocks_feature_split" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_feature_split_image_idx" ON "_pages_v_blocks_feature_split" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_values_values_order_idx" ON "_pages_v_blocks_values_values" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_values_values_parent_id_idx" ON "_pages_v_blocks_values_values" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_values_order_idx" ON "_pages_v_blocks_values" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_values_parent_id_idx" ON "_pages_v_blocks_values" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_values_path_idx" ON "_pages_v_blocks_values" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_band_actions_order_idx" ON "_pages_v_blocks_cta_band_actions" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_band_actions_parent_id_idx" ON "_pages_v_blocks_cta_band_actions" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_band_order_idx" ON "_pages_v_blocks_cta_band" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_band_parent_id_idx" ON "_pages_v_blocks_cta_band" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_band_path_idx" ON "_pages_v_blocks_cta_band" USING btree ("_path");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero_actions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_hero_tiles" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_card_grid_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_card_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_path_cards_paths" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_path_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_story_timeline_moments" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_story_timeline" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_stats_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_feature_split_figures" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_feature_split" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_values_values" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_values" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_cta_band_actions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_cta_band" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero_actions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero_tiles" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_card_grid_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_card_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_path_cards_paths" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_path_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_story_timeline_moments" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_story_timeline" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_stats_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_feature_split_figures" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_feature_split" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_values_values" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_values" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_cta_band_actions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_cta_band" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_hero_actions" CASCADE;
  DROP TABLE "pages_blocks_hero_tiles" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_card_grid_cards" CASCADE;
  DROP TABLE "pages_blocks_card_grid" CASCADE;
  DROP TABLE "pages_blocks_path_cards_paths" CASCADE;
  DROP TABLE "pages_blocks_path_cards" CASCADE;
  DROP TABLE "pages_blocks_story_timeline_moments" CASCADE;
  DROP TABLE "pages_blocks_story_timeline" CASCADE;
  DROP TABLE "pages_blocks_stats_stats" CASCADE;
  DROP TABLE "pages_blocks_stats" CASCADE;
  DROP TABLE "pages_blocks_feature_split_figures" CASCADE;
  DROP TABLE "pages_blocks_feature_split" CASCADE;
  DROP TABLE "pages_blocks_values_values" CASCADE;
  DROP TABLE "pages_blocks_values" CASCADE;
  DROP TABLE "pages_blocks_cta_band_actions" CASCADE;
  DROP TABLE "pages_blocks_cta_band" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_actions" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_tiles" CASCADE;
  DROP TABLE "_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_card_grid_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_card_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_path_cards_paths" CASCADE;
  DROP TABLE "_pages_v_blocks_path_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_story_timeline_moments" CASCADE;
  DROP TABLE "_pages_v_blocks_story_timeline" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_split_figures" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_split" CASCADE;
  DROP TABLE "_pages_v_blocks_values_values" CASCADE;
  DROP TABLE "_pages_v_blocks_values" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_band_actions" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_band" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_pages_fk";
  
  DROP INDEX "payload_locked_documents_rels_pages_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "pages_id";
  DROP TYPE "public"."enum_pages_blocks_hero_actions_variant";
  DROP TYPE "public"."enum_pages_blocks_hero_tiles_icon";
  DROP TYPE "public"."enum_pages_blocks_hero_tiles_tone";
  DROP TYPE "public"."enum_pages_blocks_hero_art";
  DROP TYPE "public"."enum_pages_blocks_card_grid_cards_kind";
  DROP TYPE "public"."enum_pages_blocks_card_grid_cards_icon";
  DROP TYPE "public"."enum_pages_blocks_card_grid_cards_tone";
  DROP TYPE "public"."enum_pages_blocks_card_grid_background";
  DROP TYPE "public"."enum_pages_blocks_card_grid_intro_layout";
  DROP TYPE "public"."enum_pages_blocks_card_grid_columns";
  DROP TYPE "public"."enum_pages_blocks_path_cards_paths_icon";
  DROP TYPE "public"."enum_pages_blocks_path_cards_intro_layout";
  DROP TYPE "public"."enum_pages_blocks_story_timeline_moments_dot";
  DROP TYPE "public"."enum_pages_blocks_story_timeline_intro_layout";
  DROP TYPE "public"."enum_pages_blocks_stats_stats_tone";
  DROP TYPE "public"."enum_pages_blocks_stats_background";
  DROP TYPE "public"."enum_pages_blocks_stats_intro_layout";
  DROP TYPE "public"."enum_pages_blocks_feature_split_background";
  DROP TYPE "public"."enum_pages_blocks_feature_split_intro_layout";
  DROP TYPE "public"."enum_pages_blocks_values_values_tone";
  DROP TYPE "public"."enum_pages_blocks_cta_band_actions_variant";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_hero_actions_variant";
  DROP TYPE "public"."enum__pages_v_blocks_hero_tiles_icon";
  DROP TYPE "public"."enum__pages_v_blocks_hero_tiles_tone";
  DROP TYPE "public"."enum__pages_v_blocks_hero_art";
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_cards_kind";
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_cards_icon";
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_cards_tone";
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_background";
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_intro_layout";
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_columns";
  DROP TYPE "public"."enum__pages_v_blocks_path_cards_paths_icon";
  DROP TYPE "public"."enum__pages_v_blocks_path_cards_intro_layout";
  DROP TYPE "public"."enum__pages_v_blocks_story_timeline_moments_dot";
  DROP TYPE "public"."enum__pages_v_blocks_story_timeline_intro_layout";
  DROP TYPE "public"."enum__pages_v_blocks_stats_stats_tone";
  DROP TYPE "public"."enum__pages_v_blocks_stats_background";
  DROP TYPE "public"."enum__pages_v_blocks_stats_intro_layout";
  DROP TYPE "public"."enum__pages_v_blocks_feature_split_background";
  DROP TYPE "public"."enum__pages_v_blocks_feature_split_intro_layout";
  DROP TYPE "public"."enum__pages_v_blocks_values_values_tone";
  DROP TYPE "public"."enum__pages_v_blocks_cta_band_actions_variant";
  DROP TYPE "public"."enum__pages_v_version_status";`)
}
