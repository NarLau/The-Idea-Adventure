import { type ActionFunctionArgs } from "react-router-dom";
import { db } from "~/servers/database";
import { user, inventoryItem } from "~/servers/database/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "~/servers/auth";

export async function action({ request }: ActionFunctionArgs) {
  // --- Get session ---
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user) {
    return new Response("Not logged in", { status: 401 });
  }

  const formData = await request.formData();
  const flag = formData.get("flag") as string | null;

  if (flag) {
    const [dbUser] = await db
      .select({ flags: user.flags })
      .from(user)
      .where(eq(user.id, session.user.id));

    const currentFlags = Array.isArray(dbUser?.flags) ? dbUser.flags : [];

    if (!currentFlags.includes(flag)) {
      const updatedFlags = [...currentFlags, flag];
      await db
        .update(user)
        .set({ flags: updatedFlags })
        .where(eq(user.id, session.user.id));

      return new Response(
        JSON.stringify({ success: true, flags: updatedFlags }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: false, message: "Flag exists", flags: currentFlags }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }

  const itemId = formData.get("itemId") as string | null;
  if (itemId) {
    const [dbItem] = await db
      .select()
      .from(inventoryItem)
      .where(
        and(
          eq(inventoryItem.userId, session.user.id),
          eq(inventoryItem.itemId, itemId)
        )
      );

    if (!dbItem) {
      await db.insert(inventoryItem).values({
        userId: session.user.id,
        itemId,
        quantity: 1
      });
    } else {
      const newQuantity = (formData.get("consume") === "true")
        ? dbItem.quantity - 1
        : dbItem.quantity + 1;

      if (newQuantity <= 0) {
        await db
          .delete(inventoryItem)
          .where(
            and(
              eq(inventoryItem.userId, session.user.id),
              eq(inventoryItem.itemId, itemId)
            )
          );
      } else {
        await db
          .update(inventoryItem)
          .set({ quantity: newQuantity })
          .where(
            and(
              eq(inventoryItem.userId, session.user.id),
              eq(inventoryItem.itemId, itemId)
            )
          );
      }
    }

    return new Response(
      JSON.stringify({ success: true, itemId }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(
    JSON.stringify({ success: false, message: "No flag or itemId provided" }),
    { status: 400, headers: { "Content-Type": "application/json" } }
  );
}

export default function UpdateFlags() {
  return null;
}
