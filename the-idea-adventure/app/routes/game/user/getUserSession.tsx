/* import { type LoaderFunctionArgs } from "react-router-dom";
import { db } from "~/servers/database";
import { user, inventoryItem } from "~/servers/database/schema";
import { eq } from "drizzle-orm";
import { auth } from "~/servers/auth";

const ITEM_NAMES: Record < string, string > = {
	dogToy: "Ball",
	catToy: "Yarn",
};

export async function loader({ request }: LoaderFunctionArgs) {
	const session = await auth.api.getSession({ headers: request.headers });
	if (!session?.user) {
		return new Response(
			JSON.stringify({ error: "Not logged in" }), { status: 401, headers: { "Content-Type": "application/json" } }
		);
	}

	const [dbUser] = await db
		.select({ flags: user.flags, money: user.money })
		.from(user)
		.where(eq(user.id, session.user.id));

	const inventory = await db
		.select()
		.from(inventoryItem)
		.where(eq(inventoryItem.userId, session.user.id));

	const formattedInventory = inventory.map(item => ({
		item: {
			id: item.itemId,
			name: ITEM_NAMES[item.itemId] ?? item.itemId
		},
		quantity: item.quantity
	}));

	return new Response(
		JSON.stringify({
			user: {
				...session.user,
				money: dbUser?.money ?? 0,
				flags: dbUser?.flags ?? []
			},
			inventory: formattedInventory
		}), { status: 200, headers: { "Content-Type": "application/json" } }
	);
}

export default function GetUserSession() {
	return null;
} */