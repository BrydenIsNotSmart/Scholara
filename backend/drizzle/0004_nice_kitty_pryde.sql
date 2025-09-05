CREATE TABLE "sessions" (
	"token" uuid PRIMARY KEY NOT NULL,
	"user_id" bigint NOT NULL,
	"ip_address" varchar(45),
	"user_agent" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"expires_at" timestamp NOT NULL
);
