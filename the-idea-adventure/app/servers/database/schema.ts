import { pgTable, text, timestamp, boolean, integer, serial, primaryKey } from "drizzle-orm/pg-core";
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
  flags: jsonb("flags").notNull().default([]),

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


export const inventoryItem = pgTable(
  "inventory_item",
  {
    itemId: text()
      .notNull()
      .references(() => item.id),
    userId: text()
      .notNull()
      .references(() => user.id),
    quantity: integer("quantity").notNull().default(1),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.itemId] }),
  })
);


export const scene = pgTable("scene", {
  id: text().primaryKey(),
  name: text("name").notNull(),
  background: text("background"), 
});
export const character = pgTable("character", {
  id: serial().primaryKey(),
  name: text("name").notNull(),
  portrait: text("portrait"), // sprite
});

export const interactableObject = pgTable("interactableObject", {
  id: text().primaryKey(),
  sceneId: text().references(() => scene.id),
  name: text("name").notNull(),
  description: text("description"),
  onClickAction: text("onClickAction"),
  requiredItemId: text().references(() => item.id),
  rewardItemId: text().references(() => item.id),
  isOneTimeUse: boolean("isOneTimeUse"),
  characterId: integer().references(() => character.id),
});




export const dialogNode = pgTable("dialogNode", {
  id: serial().primaryKey(),
  characterId: integer().references(() => character.id),
  text: text("text").notNull(),
  nextNode: jsonb("nextNode").notNull().default([]), // list<int>
  condition: text("condition"),
  onSelectFlag: text("onSelectFlag"),
});
export const quest = pgTable("quest", {
  id: text().primaryKey(),
  name: text().notNull(),
  description: text().notNull(),
  itemId:  text().references(() => item.id),
  sceneId: text().references(() => scene.id),
  requiredFlag: text(), 
  rewardItemId: text().references(() => item.id),
  rewardMoney: integer().default(0),
  rewardFlag: text(), 
  order: integer().default(0),
});

export const rewardMoney = pgTable("rewardMoney", {
  questId: text().references(() => quest.id),
  name: text("name").notNull(),
  rewardMoney: integer("rewardMoney").notNull(),
  rewardImage: text("rewardImage"),
});
export const questProgress = pgTable("questProgress", {
  userId: text().references(() => user.id),
  questId: text().references(() => quest.id),
  progress: integer("progress").notNull().default(0),
  completed: boolean("completed").notNull().default(false),
});
