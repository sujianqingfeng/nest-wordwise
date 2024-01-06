DO $$ BEGIN
 CREATE TYPE "default_translation" AS ENUM('deepL', 'volcano', 'openAI');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dictionary" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"word" varchar(20),
	"sw" varchar(20),
	"uk_phonetic" varchar(20),
	"us_phonetic" varchar(20),
	"uk_speech" varchar(100),
	"us_speech" varchar(100),
	"translations" json,
	"prototype_id" uuid,
	"form_name" varchar(10),
	"create_at" date DEFAULT now(),
	CONSTRAINT "dictionary_word_unique" UNIQUE("word")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"volcano_access_key_id" varchar(50),
	"volcano_secret_key" varchar(50),
	"deep_l_auth_key" varchar(50),
	"open_ai_key" varchar(50),
	"deepL" "default_translation",
	"user_id" uuid NOT NULL,
	"create_at" date DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(50),
	"name" varchar(12),
	"avatar" varchar(255),
	"create_at" date DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_to_words" (
	"user_id" uuid NOT NULL,
	"word_id" uuid NOT NULL,
	CONSTRAINT "users_to_words_user_id_word_id_pk" PRIMARY KEY("user_id","word_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "words" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"word" varchar(20),
	"simple_translate" varchar(100),
	"user_id" uuid,
	"create_at" date DEFAULT now(),
	CONSTRAINT "words_word_unique" UNIQUE("word")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_words" ADD CONSTRAINT "users_to_words_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_words" ADD CONSTRAINT "users_to_words_word_id_words_id_fk" FOREIGN KEY ("word_id") REFERENCES "public"."words"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "words" ADD CONSTRAINT "words_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
