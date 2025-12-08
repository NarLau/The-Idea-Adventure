CREATE TABLE "account" (
	"id" text PRIMARY KEY,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "character" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"portrait" text
);
--> statement-breakpoint
CREATE TABLE "dialogNode" (
	"id" serial PRIMARY KEY,
	"character_id" integer,
	"text" text NOT NULL,
	"nextNode" jsonb DEFAULT '[]' NOT NULL,
	"condition" text,
	"onSelectFlag" text
);
--> statement-breakpoint
CREATE TABLE "interactableObject" (
	"id" serial PRIMARY KEY,
	"scene_id" integer,
	"name" text NOT NULL,
	"description" text,
	"onClickAction" text,
	"required_item_id" integer,
	"reward_item_id" integer
);
--> statement-breakpoint
CREATE TABLE "inventory_item" (
	"item_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "item" (
	"id" text PRIMARY KEY,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"usableOn" jsonb DEFAULT '[]' NOT NULL,
	"price" integer,
	"isPurchasable" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "questProgress" (
	"user_id" integer,
	"quest_id" integer NOT NULL,
	"progress" integer DEFAULT 0 NOT NULL,
	"completed" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "rewardMoney" (
	"quest_id" integer NOT NULL,
	"name" text NOT NULL,
	"rewardMoney" integer NOT NULL,
	"rewardImage" text
);
--> statement-breakpoint
CREATE TABLE "scene" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"background" text
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL UNIQUE,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY,
	"name" text NOT NULL,
	"email" text NOT NULL UNIQUE,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"money" integer,
	"flags" jsonb DEFAULT '{}' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
