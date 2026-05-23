CREATE TABLE "meetis" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"title" varchar(255) NOT NULL,
	"details" text NOT NULL,
	"available_seats" integer NOT NULL,
	"date" date NOT NULL,
	"time" time NOT NULL,
	"image" varchar(100) NOT NULL,
	"community_id" uuid NOT NULL,
	"category_id" uuid NOT NULL,
	"created_by" text NOT NULL,
	"virtual" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "meeti_locations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"meeti_id" uuid NOT NULL,
	"place_name" varchar(255) NOT NULL,
	"address" varchar(255) NOT NULL,
	"city" varchar(100) NOT NULL,
	"country" varchar(100) NOT NULL,
	"latitude" double precision NOT NULL,
	"longitude" double precision NOT NULL
);
--> statement-breakpoint
ALTER TABLE "meetis" ADD CONSTRAINT "meetis_community_id_communities_id_fkey" FOREIGN KEY ("community_id") REFERENCES "communities"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "meetis" ADD CONSTRAINT "meetis_created_by_users_id_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "meeti_locations" ADD CONSTRAINT "meeti_locations_meeti_id_meetis_id_fkey" FOREIGN KEY ("meeti_id") REFERENCES "meetis"("id") ON DELETE CASCADE;