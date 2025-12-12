import { Outlet } from "react-router";
import { redirect } from "react-router-dom"; // ✅ correct import
import type { Route } from "../+types/root";
import { requireUserMiddleware } from "~/middleWare/requireUserMiddleware";

export const middleware: Route.MiddlewareFunction[] = [requireUserMiddleware];

export async function loader({ context }: { context: any }) {
  const userSession = context.userSession;
  if (!userSession) throw redirect("/"); // redirect if missing

  return { userSession }; // return userSession for nested routes
}

export default function Shell({
  loaderData,
}: {
  loaderData: { userSession: any } // adjust type if you have UserSession type
}) {
  return <Outlet />; // Shell only renders the child route
}
