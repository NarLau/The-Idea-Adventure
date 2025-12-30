import { eq } from "drizzle-orm";
import { redirect } from "react-router";
import { auth } from "~/servers/auth";
import { db } from "~/servers/database";
import { user, inventoryItem, item, interactableObject, dialogNode } from "~/servers/database/schema";

export async function requireUserMiddleware({ request, context }: any) {
  const userSession = await auth.api.getSession(request);
  if (!userSession?.user) throw redirect("/navplaygame");

  const [dbUser] = await db
    .select()
    .from(user)
    .where(eq(user.email, userSession.user.email));

  const inventoryItems = await db
    .select()
    .from(inventoryItem)
    .where(eq(inventoryItem.userId, userSession.user.id));

  const allItems = await db.select().from(item);
  const fullInventory = inventoryItems.map((inv) => {
  const matchedItem = allItems.find((i) => i.id === inv.itemId);
  
    return {
      item: matchedItem || { id: inv.itemId, name: inv.itemId }, 
      quantity: inv.quantity,
    };
  });

  const userFlags = Array.isArray(dbUser?.flags) ? dbUser.flags : [];
  const [dogData] = await db.select().from(interactableObject).where(eq(interactableObject.id, "11"));

  context.userSession = {
    ...userSession,
    user: { ...userSession.user, money: dbUser?.money ?? 0, flags: userFlags },
    inventory: fullInventory,
    npcs: {
      dog: {
        data: {},
        dialogNodes: await db.select().from(dialogNode).where(eq(dialogNode.characterId, 1))
      },
      cat: {
        data: {},
        dialogNodes: await db.select().from(dialogNode).where(eq(dialogNode.characterId, 2))
      },
    },
  };
}
