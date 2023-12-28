DO $$ BEGIN
 CREATE TYPE "default_translation" AS ENUM('deepL', 'volcano', 'openAI');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "deepL" "default_translation";