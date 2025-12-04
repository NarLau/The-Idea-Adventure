import { authClient } from "~/servers/auth/client";

const { data: session, error } = await authClient.getSession();