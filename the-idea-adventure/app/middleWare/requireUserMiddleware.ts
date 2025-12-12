import { eq } from "drizzle-orm";
import { redirect } from "react-router";
import { auth } from "~/servers/auth";
import { db } from "~/servers/database";
import { user, inventoryItem, item } from "~/servers/database/schema";

export async function requireUserMiddleware({ request, context }: any) {
  const userSession = await auth.api.getSession(request);
  if (!userSession?.user) throw redirect("/");

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
      item: matchedItem || { id: inv.itemId, name: "Unknown Item" },
      quantity: inv.quantity,
    };
  });

  context.userSession = {
    ...userSession,
    user: { ...userSession.user, money: dbUser?.money ?? 0 },
    inventory: fullInventory,
  };
}
