
import { auth } from "~/servers/auth";
import type { Route } from "../+types/root";

export async function loader({ request }: Route.LoaderArgs) {
  return auth.handler(request);
}
export async function action({ request }: Route.ActionArgs) {
  return auth.handler(request);
}