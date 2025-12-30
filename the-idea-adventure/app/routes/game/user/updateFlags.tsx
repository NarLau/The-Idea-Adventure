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

  // --- Handle flag update ---
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

  // --- Handle item consumption ---
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

    if (!dbItem || dbItem.quantity <= 0) {
      return new Response(
        JSON.stringify({ success: false, message: "Item not found or quantity zero" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (dbItem.quantity === 1) {
      // Delete the row if last item
      await db
        .delete(inventoryItem)
        .where(
          and(
            eq(inventoryItem.userId, session.user.id),
            eq(inventoryItem.itemId, itemId)
          )
        );
    } else {
      // Otherwise decrement quantity
      await db
        .update(inventoryItem)
        .set({ quantity: dbItem.quantity - 1 })
        .where(
          and(
            eq(inventoryItem.userId, session.user.id),
            eq(inventoryItem.itemId, itemId)
          )
        );
    }

    return new Response(
      JSON.stringify({ success: true, itemId }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }

  // --- If neither flag nor itemId was provided ---
  return new Response(
    JSON.stringify({ success: false, message: "No flag or itemId provided" }),
    { status: 400, headers: { "Content-Type": "application/json" } }
  );
}

export default function UpdateFlags() {
  return null;
}
