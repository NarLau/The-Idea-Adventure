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
	"id" text PRIMARY KEY,
	"scene_id" text,
	"name" text NOT NULL,
	"description" text,
	"onClickAction" text,
	"required_item_id" text,
	"reward_item_id" text,
	"isOneTimeUse" boolean,
	"character_id" integer
);
--> statement-breakpoint
CREATE TABLE "inventory_item" (
	"item_id" text,
	"user_id" text,
	"quantity" integer DEFAULT 1 NOT NULL,
	CONSTRAINT "inventory_item_pkey" PRIMARY KEY("user_id","item_id")
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
CREATE TABLE "quest" (
	"id" text PRIMARY KEY,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"item_id" text,
	"scene_id" text,
	"required_flag" text,
	"reward_item_id" text,
	"reward_money" integer DEFAULT 0,
	"reward_flag" text,
	"order" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "questProgress" (
	"user_id" text,
	"quest_id" text,
	"progress" integer DEFAULT 0 NOT NULL,
	"completed" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "rewardMoney" (
	"quest_id" text,
	"name" text NOT NULL,
	"rewardMoney" integer NOT NULL,
	"rewardImage" text
);
--> statement-breakpoint
CREATE TABLE "scene" (
	"id" text PRIMARY KEY,
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
	"flags" jsonb DEFAULT '[]' NOT NULL
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
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "dialogNode" ADD CONSTRAINT "dialogNode_character_id_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "character"("id");--> statement-breakpoint
ALTER TABLE "interactableObject" ADD CONSTRAINT "interactableObject_scene_id_scene_id_fkey" FOREIGN KEY ("scene_id") REFERENCES "scene"("id");--> statement-breakpoint
ALTER TABLE "interactableObject" ADD CONSTRAINT "interactableObject_required_item_id_item_id_fkey" FOREIGN KEY ("required_item_id") REFERENCES "item"("id");--> statement-breakpoint
ALTER TABLE "interactableObject" ADD CONSTRAINT "interactableObject_reward_item_id_item_id_fkey" FOREIGN KEY ("reward_item_id") REFERENCES "item"("id");--> statement-breakpoint
ALTER TABLE "interactableObject" ADD CONSTRAINT "interactableObject_character_id_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "character"("id");--> statement-breakpoint
ALTER TABLE "inventory_item" ADD CONSTRAINT "inventory_item_item_id_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("id");--> statement-breakpoint
ALTER TABLE "inventory_item" ADD CONSTRAINT "inventory_item_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id");--> statement-breakpoint
ALTER TABLE "quest" ADD CONSTRAINT "quest_item_id_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("id");--> statement-breakpoint
ALTER TABLE "quest" ADD CONSTRAINT "quest_scene_id_scene_id_fkey" FOREIGN KEY ("scene_id") REFERENCES "scene"("id");--> statement-breakpoint
ALTER TABLE "quest" ADD CONSTRAINT "quest_reward_item_id_item_id_fkey" FOREIGN KEY ("reward_item_id") REFERENCES "item"("id");--> statement-breakpoint
ALTER TABLE "questProgress" ADD CONSTRAINT "questProgress_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id");--> statement-breakpoint
ALTER TABLE "questProgress" ADD CONSTRAINT "questProgress_quest_id_quest_id_fkey" FOREIGN KEY ("quest_id") REFERENCES "quest"("id");--> statement-breakpoint
ALTER TABLE "rewardMoney" ADD CONSTRAINT "rewardMoney_quest_id_quest_id_fkey" FOREIGN KEY ("quest_id") REFERENCES "quest"("id");--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;