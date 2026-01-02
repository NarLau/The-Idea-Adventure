import { type ActionFunctionArgs } from "react-router-dom";
import { db } from "~/servers/database";
import { user, inventoryItem } from "~/servers/database/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "~/servers/auth";

export async function action({ request }: ActionFunctionArgs) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user) {
      return new Response(JSON.stringify({ success: false, message: "Not logged in" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
    const formData = await request.formData();
    const flag = formData.get("flag") as string | null;
    const itemId = formData.get("itemId") as string | null;
    const consume = formData.get("consume") === "true";
    const [dbUser] = await db
      .select({ flags: user.flags, money: user.money })
      .from(user)
      .where(eq(user.id, session.user.id));

    const currentFlags = Array.isArray(dbUser?.flags) ? dbUser.flags : [];
    let updatedFlags = [...currentFlags];
    let newMoney = dbUser?.money ?? 0;
    if (flag && !currentFlags.includes(flag)) {
      updatedFlags.push(flag);

      if (flag === "dogPlayed" || flag === "catPlayed") {
        newMoney += 5;
      }

      await db.update(user)
        .set({ flags: updatedFlags, money: newMoney })
        .where(eq(user.id, session.user.id));

      return new Response(
        JSON.stringify({ success: true, flags: updatedFlags, money: newMoney }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    if (itemId) {
      const isTreat = itemId === '"dogTreat"' || itemId === '"catTreat"';
      if (isTreat) {
        if ((itemId === '"dogTreat"' && currentFlags.includes("dogAte")) ||
            (itemId === '"catTreat"' && currentFlags.includes("catAte"))) {
          return new Response(
            JSON.stringify({ success: false, message: "Out of stock" }),
            { status: 400, headers: { "Content-Type": "application/json" } }
          );
        }

        const cost = 5;
        if (newMoney < cost) {
          return new Response(
            JSON.stringify({ success: false, message: "Not enough money" }),
            { status: 400, headers: { "Content-Type": "application/json" } }
          );
        }

        newMoney -= cost;
        await db.update(user).set({ money: newMoney }).where(eq(user.id, session.user.id));
      }
      const [dbItem] = await db
        .select()
        .from(inventoryItem)
        .where(and(eq(inventoryItem.userId, session.user.id), eq(inventoryItem.itemId, itemId)));

      if (consume) {
        if (!dbItem || dbItem.quantity <= 0) {
          return new Response(
            JSON.stringify({ success: false, message: "Item not in inventory" }),
            { status: 400, headers: { "Content-Type": "application/json" } }
          );
        }
        const newQuantity = dbItem.quantity - 1;
        if (newQuantity <= 0) {
          await db.delete(inventoryItem)
            .where(and(eq(inventoryItem.userId, session.user.id), eq(inventoryItem.itemId, itemId)));
        } else {
          await db.update(inventoryItem)
            .set({ quantity: newQuantity })
            .where(and(eq(inventoryItem.userId, session.user.id), eq(inventoryItem.itemId, itemId)));
        }
      } else {
        if (!dbItem) {
          await db.insert(inventoryItem)
            .values({ userId: session.user.id, itemId, quantity: 1 });
        } else if (!isTreat) {
          const newQuantity = dbItem.quantity + 1;
          await db.update(inventoryItem)
            .set({ quantity: newQuantity })
            .where(and(eq(inventoryItem.userId, session.user.id), eq(inventoryItem.itemId, itemId)));
        }
      }
      return new Response(
        JSON.stringify({ success: true, itemId, money: newMoney }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response(
      JSON.stringify({ success: false, message: "No flag or itemId provided" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("UpdateFlags error:", err);
    return new Response(
      JSON.stringify({ success: false, message: "Server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export default function UpdateFlags() {
  return null;
}
