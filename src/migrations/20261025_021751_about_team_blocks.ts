import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_feature_split_heading_style" AS ENUM('heading', 'statement');
  CREATE TYPE "public"."enum_pages_blocks_feature_split_image_shape" AS ENUM('rounded', 'arch');
  CREATE TYPE "public"."enum_pages_blocks_note_band_style" AS ENUM('crisis', 'dashed');
  CREATE TYPE "public"."enum_pages_blocks_mission_vision_cards_icon" AS ENUM('target', 'eye');
  CREATE TYPE "public"."enum_pages_blocks_mission_vision_cards_tone" AS ENUM('purple', 'terracotta', 'teal', 'ochre', 'green', 'blue');
  CREATE TYPE "public"."enum_pages_blocks_team_members_tone" AS ENUM('purple', 'terracotta', 'teal', 'ochre', 'green', 'blue');
  CREATE TYPE "public"."enum_pages_blocks_team_background" AS ENUM('white', 'cream');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_split_heading_style" AS ENUM('heading', 'statement');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_split_image_shape" AS ENUM('rounded', 'arch');
  CREATE TYPE "public"."enum__pages_v_blocks_note_band_style" AS ENUM('crisis', 'dashed');
  CREATE TYPE "public"."enum__pages_v_blocks_mission_vision_cards_icon" AS ENUM('target', 'eye');
  CREATE TYPE "public"."enum__pages_v_blocks_mission_vision_cards_tone" AS ENUM('purple', 'terracotta', 'teal', 'ochre', 'green', 'blue');
  CREATE TYPE "public"."enum__pages_v_blocks_team_members_tone" AS ENUM('purple', 'terracotta', 'teal', 'ochre', 'green', 'blue');
  CREATE TYPE "public"."enum__pages_v_blocks_team_background" AS ENUM('white', 'cream');
  ALTER TYPE "public"."enum_pages_blocks_hero_art" ADD VALUE 'centred' BEFORE 'none';
  ALTER TYPE "public"."enum_pages_blocks_card_grid_cards_icon" ADD VALUE 'compass' BEFORE 'plus';
  ALTER TYPE "public"."enum_pages_blocks_cards_cards_icon" ADD VALUE 'compass' BEFORE 'plus';
  ALTER TYPE "public"."enum_pages_blocks_note_icon" ADD VALUE 'compass' BEFORE 'plus';
  ALTER TYPE "public"."enum__pages_v_blocks_hero_art" ADD VALUE 'centred' BEFORE 'none';
  ALTER TYPE "public"."enum__pages_v_blocks_card_grid_cards_icon" ADD VALUE 'compass' BEFORE 'plus';
  ALTER TYPE "public"."enum__pages_v_blocks_cards_cards_icon" ADD VALUE 'compass' BEFORE 'plus';
  ALTER TYPE "public"."enum__pages_v_blocks_note_icon" ADD VALUE 'compass' BEFORE 'plus';
  CREATE TABLE "pages_blocks_mission_vision_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"icon" "enum_pages_blocks_mission_vision_cards_icon" DEFAULT 'target',
  	"text" varchar,
  	"tone" "enum_pages_blocks_mission_vision_cards_tone" DEFAULT 'purple'
  );
  
  CREATE TABLE "pages_blocks_mission_vision" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_story" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Our story',
  	"quote" varchar,
  	"body" varchar,
  	"attribution" varchar,
  	"link_label" varchar,
  	"link_href" varchar,
  	"portrait_id" integer,
  	"portrait_initials" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_approach_questions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_approach" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"matrix_label" varchar DEFAULT 'Capacity Matrix',
  	"matrix_title" varchar DEFAULT 'Energy × mood, shown as a gentle traffic light',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_profile" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Founder',
  	"name" varchar,
  	"role" varchar,
  	"bio" varchar,
  	"quote" varchar,
  	"short_bio_label" varchar DEFAULT 'Short bio — for events, speaker profiles and social media',
  	"short_bio_text" varchar,
  	"portrait_id" integer,
  	"portrait_initials" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_team_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"bio" varchar,
  	"photo_id" integer,
  	"tone" "enum_pages_blocks_team_members_tone" DEFAULT 'purple'
  );
  
  CREATE TABLE "pages_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background" "enum_pages_blocks_team_background" DEFAULT 'white',
  	"eyebrow" varchar,
  	"note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_policy_links_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "pages_blocks_policy_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_mission_vision_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"icon" "enum__pages_v_blocks_mission_vision_cards_icon" DEFAULT 'target',
  	"text" varchar,
  	"tone" "enum__pages_v_blocks_mission_vision_cards_tone" DEFAULT 'purple',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_mission_vision" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_story" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Our story',
  	"quote" varchar,
  	"body" varchar,
  	"attribution" varchar,
  	"link_label" varchar,
  	"link_href" varchar,
  	"portrait_id" integer,
  	"portrait_initials" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_approach_questions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_approach" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"matrix_label" varchar DEFAULT 'Capacity Matrix',
  	"matrix_title" varchar DEFAULT 'Energy × mood, shown as a gentle traffic light',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_profile" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Founder',
  	"name" varchar,
  	"role" varchar,
  	"bio" varchar,
  	"quote" varchar,
  	"short_bio_label" varchar DEFAULT 'Short bio — for events, speaker profiles and social media',
  	"short_bio_text" varchar,
  	"portrait_id" integer,
  	"portrait_initials" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"bio" varchar,
  	"photo_id" integer,
  	"tone" "enum__pages_v_blocks_team_members_tone" DEFAULT 'purple',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background" "enum__pages_v_blocks_team_background" DEFAULT 'white',
  	"eyebrow" varchar,
  	"note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_policy_links_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_policy_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_feature_split" ADD COLUMN "heading_style" "enum_pages_blocks_feature_split_heading_style" DEFAULT 'heading';
  ALTER TABLE "pages_blocks_feature_split" ADD COLUMN "body" varchar;
  ALTER TABLE "pages_blocks_feature_split" ADD COLUMN "image_shape" "enum_pages_blocks_feature_split_image_shape" DEFAULT 'rounded';
  ALTER TABLE "pages_blocks_note_band" ADD COLUMN "style" "enum_pages_blocks_note_band_style" DEFAULT 'crisis';
  ALTER TABLE "pages_blocks_note_band" ADD COLUMN "label" varchar;
  ALTER TABLE "_pages_v_blocks_feature_split" ADD COLUMN "heading_style" "enum__pages_v_blocks_feature_split_heading_style" DEFAULT 'heading';
  ALTER TABLE "_pages_v_blocks_feature_split" ADD COLUMN "body" varchar;
  ALTER TABLE "_pages_v_blocks_feature_split" ADD COLUMN "image_shape" "enum__pages_v_blocks_feature_split_image_shape" DEFAULT 'rounded';
  ALTER TABLE "_pages_v_blocks_note_band" ADD COLUMN "style" "enum__pages_v_blocks_note_band_style" DEFAULT 'crisis';
  ALTER TABLE "_pages_v_blocks_note_band" ADD COLUMN "label" varchar;
  ALTER TABLE "pages_blocks_mission_vision_cards" ADD CONSTRAINT "pages_blocks_mission_vision_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_mission_vision"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_mission_vision" ADD CONSTRAINT "pages_blocks_mission_vision_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_story" ADD CONSTRAINT "pages_blocks_story_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_story" ADD CONSTRAINT "pages_blocks_story_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_approach_questions" ADD CONSTRAINT "pages_blocks_approach_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_approach"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_approach" ADD CONSTRAINT "pages_blocks_approach_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_profile" ADD CONSTRAINT "pages_blocks_profile_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_profile" ADD CONSTRAINT "pages_blocks_profile_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_members" ADD CONSTRAINT "pages_blocks_team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_members" ADD CONSTRAINT "pages_blocks_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team" ADD CONSTRAINT "pages_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_policy_links_links" ADD CONSTRAINT "pages_blocks_policy_links_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_policy_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_policy_links" ADD CONSTRAINT "pages_blocks_policy_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_mission_vision_cards" ADD CONSTRAINT "_pages_v_blocks_mission_vision_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_mission_vision"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_mission_vision" ADD CONSTRAINT "_pages_v_blocks_mission_vision_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_story" ADD CONSTRAINT "_pages_v_blocks_story_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_story" ADD CONSTRAINT "_pages_v_blocks_story_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_approach_questions" ADD CONSTRAINT "_pages_v_blocks_approach_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_approach"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_approach" ADD CONSTRAINT "_pages_v_blocks_approach_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_profile" ADD CONSTRAINT "_pages_v_blocks_profile_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_profile" ADD CONSTRAINT "_pages_v_blocks_profile_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_members" ADD CONSTRAINT "_pages_v_blocks_team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_members" ADD CONSTRAINT "_pages_v_blocks_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team" ADD CONSTRAINT "_pages_v_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_policy_links_links" ADD CONSTRAINT "_pages_v_blocks_policy_links_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_policy_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_policy_links" ADD CONSTRAINT "_pages_v_blocks_policy_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_mission_vision_cards_order_idx" ON "pages_blocks_mission_vision_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_mission_vision_cards_parent_id_idx" ON "pages_blocks_mission_vision_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_mission_vision_order_idx" ON "pages_blocks_mission_vision" USING btree ("_order");
  CREATE INDEX "pages_blocks_mission_vision_parent_id_idx" ON "pages_blocks_mission_vision" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_mission_vision_path_idx" ON "pages_blocks_mission_vision" USING btree ("_path");
  CREATE INDEX "pages_blocks_story_order_idx" ON "pages_blocks_story" USING btree ("_order");
  CREATE INDEX "pages_blocks_story_parent_id_idx" ON "pages_blocks_story" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_story_path_idx" ON "pages_blocks_story" USING btree ("_path");
  CREATE INDEX "pages_blocks_story_portrait_idx" ON "pages_blocks_story" USING btree ("portrait_id");
  CREATE INDEX "pages_blocks_approach_questions_order_idx" ON "pages_blocks_approach_questions" USING btree ("_order");
  CREATE INDEX "pages_blocks_approach_questions_parent_id_idx" ON "pages_blocks_approach_questions" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_approach_order_idx" ON "pages_blocks_approach" USING btree ("_order");
  CREATE INDEX "pages_blocks_approach_parent_id_idx" ON "pages_blocks_approach" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_approach_path_idx" ON "pages_blocks_approach" USING btree ("_path");
  CREATE INDEX "pages_blocks_profile_order_idx" ON "pages_blocks_profile" USING btree ("_order");
  CREATE INDEX "pages_blocks_profile_parent_id_idx" ON "pages_blocks_profile" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_profile_path_idx" ON "pages_blocks_profile" USING btree ("_path");
  CREATE INDEX "pages_blocks_profile_portrait_idx" ON "pages_blocks_profile" USING btree ("portrait_id");
  CREATE INDEX "pages_blocks_team_members_order_idx" ON "pages_blocks_team_members" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_members_parent_id_idx" ON "pages_blocks_team_members" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_members_photo_idx" ON "pages_blocks_team_members" USING btree ("photo_id");
  CREATE INDEX "pages_blocks_team_order_idx" ON "pages_blocks_team" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_parent_id_idx" ON "pages_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_path_idx" ON "pages_blocks_team" USING btree ("_path");
  CREATE INDEX "pages_blocks_policy_links_links_order_idx" ON "pages_blocks_policy_links_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_policy_links_links_parent_id_idx" ON "pages_blocks_policy_links_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_policy_links_order_idx" ON "pages_blocks_policy_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_policy_links_parent_id_idx" ON "pages_blocks_policy_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_policy_links_path_idx" ON "pages_blocks_policy_links" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_mission_vision_cards_order_idx" ON "_pages_v_blocks_mission_vision_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_mission_vision_cards_parent_id_idx" ON "_pages_v_blocks_mission_vision_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_mission_vision_order_idx" ON "_pages_v_blocks_mission_vision" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_mission_vision_parent_id_idx" ON "_pages_v_blocks_mission_vision" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_mission_vision_path_idx" ON "_pages_v_blocks_mission_vision" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_story_order_idx" ON "_pages_v_blocks_story" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_story_parent_id_idx" ON "_pages_v_blocks_story" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_story_path_idx" ON "_pages_v_blocks_story" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_story_portrait_idx" ON "_pages_v_blocks_story" USING btree ("portrait_id");
  CREATE INDEX "_pages_v_blocks_approach_questions_order_idx" ON "_pages_v_blocks_approach_questions" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_approach_questions_parent_id_idx" ON "_pages_v_blocks_approach_questions" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_approach_order_idx" ON "_pages_v_blocks_approach" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_approach_parent_id_idx" ON "_pages_v_blocks_approach" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_approach_path_idx" ON "_pages_v_blocks_approach" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_profile_order_idx" ON "_pages_v_blocks_profile" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_profile_parent_id_idx" ON "_pages_v_blocks_profile" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_profile_path_idx" ON "_pages_v_blocks_profile" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_profile_portrait_idx" ON "_pages_v_blocks_profile" USING btree ("portrait_id");
  CREATE INDEX "_pages_v_blocks_team_members_order_idx" ON "_pages_v_blocks_team_members" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_members_parent_id_idx" ON "_pages_v_blocks_team_members" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_members_photo_idx" ON "_pages_v_blocks_team_members" USING btree ("photo_id");
  CREATE INDEX "_pages_v_blocks_team_order_idx" ON "_pages_v_blocks_team" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_parent_id_idx" ON "_pages_v_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_path_idx" ON "_pages_v_blocks_team" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_policy_links_links_order_idx" ON "_pages_v_blocks_policy_links_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_policy_links_links_parent_id_idx" ON "_pages_v_blocks_policy_links_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_policy_links_order_idx" ON "_pages_v_blocks_policy_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_policy_links_parent_id_idx" ON "_pages_v_blocks_policy_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_policy_links_path_idx" ON "_pages_v_blocks_policy_links" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_mission_vision_cards" CASCADE;
  DROP TABLE "pages_blocks_mission_vision" CASCADE;
  DROP TABLE "pages_blocks_story" CASCADE;
  DROP TABLE "pages_blocks_approach_questions" CASCADE;
  DROP TABLE "pages_blocks_approach" CASCADE;
  DROP TABLE "pages_blocks_profile" CASCADE;
  DROP TABLE "pages_blocks_team_members" CASCADE;
  DROP TABLE "pages_blocks_team" CASCADE;
  DROP TABLE "pages_blocks_policy_links_links" CASCADE;
  DROP TABLE "pages_blocks_policy_links" CASCADE;
  DROP TABLE "_pages_v_blocks_mission_vision_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_mission_vision" CASCADE;
  DROP TABLE "_pages_v_blocks_story" CASCADE;
  DROP TABLE "_pages_v_blocks_approach_questions" CASCADE;
  DROP TABLE "_pages_v_blocks_approach" CASCADE;
  DROP TABLE "_pages_v_blocks_profile" CASCADE;
  DROP TABLE "_pages_v_blocks_team_members" CASCADE;
  DROP TABLE "_pages_v_blocks_team" CASCADE;
  DROP TABLE "_pages_v_blocks_policy_links_links" CASCADE;
  DROP TABLE "_pages_v_blocks_policy_links" CASCADE;
  ALTER TABLE "pages_blocks_hero" ALTER COLUMN "art" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_hero" ALTER COLUMN "art" SET DEFAULT 'photo'::text;
  DROP TYPE "public"."enum_pages_blocks_hero_art";
  CREATE TYPE "public"."enum_pages_blocks_hero_art" AS ENUM('checkIn', 'photo', 'tiles', 'none');
  ALTER TABLE "pages_blocks_hero" ALTER COLUMN "art" SET DEFAULT 'photo'::"public"."enum_pages_blocks_hero_art";
  ALTER TABLE "pages_blocks_hero" ALTER COLUMN "art" SET DATA TYPE "public"."enum_pages_blocks_hero_art" USING "art"::"public"."enum_pages_blocks_hero_art";
  ALTER TABLE "pages_blocks_card_grid_cards" ALTER COLUMN "icon" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_blocks_card_grid_cards_icon";
  CREATE TYPE "public"."enum_pages_blocks_card_grid_cards_icon" AS ENUM('phone', 'people', 'home', 'chart', 'user', 'briefcase', 'graduation', 'bank', 'leaf', 'heart', 'wave', 'moon', 'cloud', 'message', 'shield', 'cup', 'desk', 'search', 'file', 'calendar', 'hand', 'mail', 'pin', 'target', 'eye', 'copy', 'check', 'plus', 'minus', 'alert');
  ALTER TABLE "pages_blocks_card_grid_cards" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_pages_blocks_card_grid_cards_icon" USING "icon"::"public"."enum_pages_blocks_card_grid_cards_icon";
  ALTER TABLE "pages_blocks_cards_cards" ALTER COLUMN "icon" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_blocks_cards_cards_icon";
  CREATE TYPE "public"."enum_pages_blocks_cards_cards_icon" AS ENUM('phone', 'people', 'home', 'chart', 'user', 'briefcase', 'graduation', 'bank', 'leaf', 'heart', 'wave', 'moon', 'cloud', 'message', 'shield', 'cup', 'desk', 'search', 'file', 'calendar', 'hand', 'mail', 'pin', 'target', 'eye', 'copy', 'check', 'plus', 'minus', 'alert');
  ALTER TABLE "pages_blocks_cards_cards" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_pages_blocks_cards_cards_icon" USING "icon"::"public"."enum_pages_blocks_cards_cards_icon";
  ALTER TABLE "pages_blocks_note" ALTER COLUMN "icon" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_blocks_note_icon";
  CREATE TYPE "public"."enum_pages_blocks_note_icon" AS ENUM('phone', 'people', 'home', 'chart', 'user', 'briefcase', 'graduation', 'bank', 'leaf', 'heart', 'wave', 'moon', 'cloud', 'message', 'shield', 'cup', 'desk', 'search', 'file', 'calendar', 'hand', 'mail', 'pin', 'target', 'eye', 'copy', 'check', 'plus', 'minus', 'alert');
  ALTER TABLE "pages_blocks_note" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_pages_blocks_note_icon" USING "icon"::"public"."enum_pages_blocks_note_icon";
  ALTER TABLE "_pages_v_blocks_hero" ALTER COLUMN "art" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_hero" ALTER COLUMN "art" SET DEFAULT 'photo'::text;
  DROP TYPE "public"."enum__pages_v_blocks_hero_art";
  CREATE TYPE "public"."enum__pages_v_blocks_hero_art" AS ENUM('checkIn', 'photo', 'tiles', 'none');
  ALTER TABLE "_pages_v_blocks_hero" ALTER COLUMN "art" SET DEFAULT 'photo'::"public"."enum__pages_v_blocks_hero_art";
  ALTER TABLE "_pages_v_blocks_hero" ALTER COLUMN "art" SET DATA TYPE "public"."enum__pages_v_blocks_hero_art" USING "art"::"public"."enum__pages_v_blocks_hero_art";
  ALTER TABLE "_pages_v_blocks_card_grid_cards" ALTER COLUMN "icon" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_cards_icon";
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_cards_icon" AS ENUM('phone', 'people', 'home', 'chart', 'user', 'briefcase', 'graduation', 'bank', 'leaf', 'heart', 'wave', 'moon', 'cloud', 'message', 'shield', 'cup', 'desk', 'search', 'file', 'calendar', 'hand', 'mail', 'pin', 'target', 'eye', 'copy', 'check', 'plus', 'minus', 'alert');
  ALTER TABLE "_pages_v_blocks_card_grid_cards" ALTER COLUMN "icon" SET DATA TYPE "public"."enum__pages_v_blocks_card_grid_cards_icon" USING "icon"::"public"."enum__pages_v_blocks_card_grid_cards_icon";
  ALTER TABLE "_pages_v_blocks_cards_cards" ALTER COLUMN "icon" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_blocks_cards_cards_icon";
  CREATE TYPE "public"."enum__pages_v_blocks_cards_cards_icon" AS ENUM('phone', 'people', 'home', 'chart', 'user', 'briefcase', 'graduation', 'bank', 'leaf', 'heart', 'wave', 'moon', 'cloud', 'message', 'shield', 'cup', 'desk', 'search', 'file', 'calendar', 'hand', 'mail', 'pin', 'target', 'eye', 'copy', 'check', 'plus', 'minus', 'alert');
  ALTER TABLE "_pages_v_blocks_cards_cards" ALTER COLUMN "icon" SET DATA TYPE "public"."enum__pages_v_blocks_cards_cards_icon" USING "icon"::"public"."enum__pages_v_blocks_cards_cards_icon";
  ALTER TABLE "_pages_v_blocks_note" ALTER COLUMN "icon" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_blocks_note_icon";
  CREATE TYPE "public"."enum__pages_v_blocks_note_icon" AS ENUM('phone', 'people', 'home', 'chart', 'user', 'briefcase', 'graduation', 'bank', 'leaf', 'heart', 'wave', 'moon', 'cloud', 'message', 'shield', 'cup', 'desk', 'search', 'file', 'calendar', 'hand', 'mail', 'pin', 'target', 'eye', 'copy', 'check', 'plus', 'minus', 'alert');
  ALTER TABLE "_pages_v_blocks_note" ALTER COLUMN "icon" SET DATA TYPE "public"."enum__pages_v_blocks_note_icon" USING "icon"::"public"."enum__pages_v_blocks_note_icon";
  ALTER TABLE "pages_blocks_feature_split" DROP COLUMN "heading_style";
  ALTER TABLE "pages_blocks_feature_split" DROP COLUMN "body";
  ALTER TABLE "pages_blocks_feature_split" DROP COLUMN "image_shape";
  ALTER TABLE "pages_blocks_note_band" DROP COLUMN "style";
  ALTER TABLE "pages_blocks_note_band" DROP COLUMN "label";
  ALTER TABLE "_pages_v_blocks_feature_split" DROP COLUMN "heading_style";
  ALTER TABLE "_pages_v_blocks_feature_split" DROP COLUMN "body";
  ALTER TABLE "_pages_v_blocks_feature_split" DROP COLUMN "image_shape";
  ALTER TABLE "_pages_v_blocks_note_band" DROP COLUMN "style";
  ALTER TABLE "_pages_v_blocks_note_band" DROP COLUMN "label";
  DROP TYPE "public"."enum_pages_blocks_feature_split_heading_style";
  DROP TYPE "public"."enum_pages_blocks_feature_split_image_shape";
  DROP TYPE "public"."enum_pages_blocks_note_band_style";
  DROP TYPE "public"."enum_pages_blocks_mission_vision_cards_icon";
  DROP TYPE "public"."enum_pages_blocks_mission_vision_cards_tone";
  DROP TYPE "public"."enum_pages_blocks_team_members_tone";
  DROP TYPE "public"."enum_pages_blocks_team_background";
  DROP TYPE "public"."enum__pages_v_blocks_feature_split_heading_style";
  DROP TYPE "public"."enum__pages_v_blocks_feature_split_image_shape";
  DROP TYPE "public"."enum__pages_v_blocks_note_band_style";
  DROP TYPE "public"."enum__pages_v_blocks_mission_vision_cards_icon";
  DROP TYPE "public"."enum__pages_v_blocks_mission_vision_cards_tone";
  DROP TYPE "public"."enum__pages_v_blocks_team_members_tone";
  DROP TYPE "public"."enum__pages_v_blocks_team_background";`)
}
