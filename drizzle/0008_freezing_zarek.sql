DO $$ BEGIN
 CREATE TYPE "default_ai_engine" AS ENUM('openAI', 'gemini');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "gemini_key" varchar(50);--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "gemini" "default_ai_engine";