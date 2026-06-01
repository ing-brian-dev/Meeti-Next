CREATE TABLE "meeti_attendees" (
	"meeti_id" uuid NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "meeti_attendees" ADD CONSTRAINT "meeti_attendees_meeti_id_meetis_id_fkey" FOREIGN KEY ("meeti_id") REFERENCES "meetis"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "meeti_attendees" ADD CONSTRAINT "meeti_attendees_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;