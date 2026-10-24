import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_form_submissions_status" AS ENUM('new', 'replied', 'closed');
  CREATE TYPE "public"."enum_form_submissions_form" AS ENUM('early-access', 'book-conversation', 'hub-interest', 'partner');
  CREATE TYPE "public"."enum_form_submissions_i_am_a" AS ENUM('An individual', 'A student', 'An employer', 'Other');
  CREATE TYPE "public"."enum_form_submissions_sector" AS ENUM('Health and social care', 'Employer or workplace', 'College or university', 'Council, NHS or public sector', 'Charity or community', 'Other');
  CREATE TYPE "public"."enum_form_submissions_partnership_type" AS ENUM('Programme licences', 'Training for frontline teams', 'Sponsored Hub places', 'Evaluation and evidence', 'Research partnership', 'Other');
  CREATE TABLE "form_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"status" "enum_form_submissions_status" DEFAULT 'new',
  	"form" "enum_form_submissions_form" NOT NULL,
  	"first_name" varchar,
  	"name" varchar,
  	"email" varchar NOT NULL,
  	"i_am_a" "enum_form_submissions_i_am_a",
  	"age_confirmed" boolean,
  	"organisation" varchar,
  	"role" varchar,
  	"sector" "enum_form_submissions_sector",
  	"topic" varchar,
  	"adjustments" varchar,
  	"town_city" varchar,
  	"hub_use" varchar,
  	"partnership_type" "enum_form_submissions_partnership_type",
  	"message" varchar,
  	"consent" boolean DEFAULT false NOT NULL,
  	"ip_hash" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "form_submissions_id" integer;
  CREATE INDEX "form_submissions_form_idx" ON "form_submissions" USING btree ("form");
  CREATE INDEX "form_submissions_ip_hash_idx" ON "form_submissions" USING btree ("ip_hash");
  CREATE INDEX "form_submissions_updated_at_idx" ON "form_submissions" USING btree ("updated_at");
  CREATE INDEX "form_submissions_created_at_idx" ON "form_submissions" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_form_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "form_submissions" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "form_submissions" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_form_submissions_fk";
  
  DROP INDEX "payload_locked_documents_rels_form_submissions_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "form_submissions_id";
  DROP TYPE "public"."enum_form_submissions_status";
  DROP TYPE "public"."enum_form_submissions_form";
  DROP TYPE "public"."enum_form_submissions_i_am_a";
  DROP TYPE "public"."enum_form_submissions_sector";
  DROP TYPE "public"."enum_form_submissions_partnership_type";`)
}
