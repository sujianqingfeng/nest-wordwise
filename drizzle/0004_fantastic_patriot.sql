CREATE TABLE IF NOT EXISTS "read_later" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"url" varchar(100),
	"title" varchar(50),
	"desc" varchar(100),
	"author" varchar(20),
	"published_time" timestamp DEFAULT now(),
	"content" text,
	"user_id" uuid,
	"create_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "dictionary" ALTER COLUMN "create_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "dictionary" ALTER COLUMN "create_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "profiles" ALTER COLUMN "create_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "profiles" ALTER COLUMN "create_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "create_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "create_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "words" ALTER COLUMN "create_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "words" ALTER COLUMN "create_at" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "read_later" ADD CONSTRAINT "read_later_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
