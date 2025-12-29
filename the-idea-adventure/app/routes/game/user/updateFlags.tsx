import { type ActionFunctionArgs } from "react-router-dom";
import { db } from "~/servers/database";
import { user } from "~/servers/database/schema";
import { eq } from "drizzle-orm";
import { auth } from "~/servers/auth";

export async function action({ request }: ActionFunctionArgs) {
	const session = await auth.api.getSession({
		headers: request.headers
	});

	if (!session?.user) {
		return new Response("Not logged in", { status: 401 });
	}

	const formData = await request.formData();
	const flag = formData.get("flag") as string;
	if (!flag) {
		return new Response("No flag provided", { status: 400 });
	}

	const [dbUser] = await db
		.select({ flags: user.flags })
		.from(user)
		.where(eq(user.id, session.user.id));

	const currentFlags = Array.isArray(dbUser?.flags) ? dbUser.flags : [];

	if (currentFlags.includes(flag)) {
		return new Response(JSON.stringify({
			success: false,
			message: "Flag already exists",
			flags: currentFlags
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	}

	const updatedFlags = [...currentFlags, flag];

	await db
		.update(user)
		.set({ flags: updatedFlags })
		.where(eq(user.id, session.user.id));

	return new Response(JSON.stringify({
		success: true,
		flags: updatedFlags
	}), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
}

// This component won't be rendered since it's a resource route
export default function UpdateFlags() {
	return null;
}