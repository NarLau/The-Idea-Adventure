import { pgTable, text, timestamp, boolean, integer, serial } from "drizzle-orm/pg-core";
import { jsonb } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text().primaryKey(),
  name: text().notNull(),
  email: text().notNull().unique(),
  emailVerified: boolean().default(false).notNull(),
  image: text(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => /* @PURE */ new Date())
    .notNull(),
  money: integer(),
  flags: jsonb("flags").notNull().default({}),

});

export const session = pgTable("session", {
  id: text().primaryKey(),
  expiresAt: timestamp().notNull(),
  token: text().notNull().unique(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp()
    .$onUpdate(() => /* @PURE */ new Date())
    .notNull(),
  ipAddress: text(),
  userAgent: text(),
  userId: text()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text().primaryKey(),
  accountId: text().notNull(),
  providerId: text().notNull(),
  userId: text()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text(),
  refreshToken: text(),
  idToken: text(),
  accessTokenExpiresAt: timestamp(),
  refreshTokenExpiresAt: timestamp(),
  scope: text(),
  password: text(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp()
    .$onUpdate(() => /* @PURE */ new Date())
    .notNull(),
});

export const verification = pgTable("verification", {
  id: text().primaryKey(),
  identifier: text().notNull(),
  value: text().notNull(),
  expiresAt: timestamp().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => /* @PURE */ new Date())
    .notNull(),
});

export const item = pgTable("item", {
  id: text().primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  usableOn: jsonb("usableOn").notNull().default([]), 
  price: integer("price"),
  isPurchasable: boolean("isPurchasable").notNull().default(false),
});


export const inventoryItem = pgTable("inventory_item", {
  itemId: text()
    .notNull()
    .references(() => item.id),
  userId: text()
    .notNull()
    .references(() => user.id),
  quantity: integer("quantity").notNull().default(1),
});


export const scene = pgTable("scene", {
  id: serial().primaryKey(),
  name: text("name").notNull(),
  background: text("background"), 
});


export const interactableObject = pgTable("interactableObject", {
  id: serial().primaryKey(),
  sceneId: integer().references(() => scene.id),
  name: text("name").notNull(),
  description: text("description"),
  onClickAction: text("onClickAction"),
  requiredItemId: integer(),
  rewardItemId: integer(),
});


export const character = pgTable("character", {
  id: serial().primaryKey(),
  name: text("name").notNull(),
  portrait: text("portrait"), // sprite
});

export const dialogNode = pgTable("dialogNode", {
  id: serial().primaryKey(),
  characterId: integer().references(() => character.id),
  text: text("text").notNull(),
  nextNode: jsonb("nextNode").notNull().default([]), // list<int>
  condition: text("condition"),
  onSelectFlag: text("onSelectFlag"),
});

export const rewardMoney = pgTable("rewardMoney", {
  questId: integer().notNull(),
  name: text("name").notNull(),
  rewardMoney: integer("rewardMoney").notNull(),
  rewardImage: text("rewardImage"),
});
export const questProgress = pgTable("questProgress", {
  userId: text().references(() => user.id),
  questId: integer().notNull(),
  progress: integer("progress").notNull().default(0),
  completed: boolean("completed").notNull().default(false),
});
