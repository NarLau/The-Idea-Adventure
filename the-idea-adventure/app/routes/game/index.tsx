import { useLoaderData } from "react-router";
import { GameProvider } from "./gameContent";
import GamePage from "~/components/scenes/gamePage";
import type { UserSession } from "~/context/userSessionContext";
import { redirect } from "react-router";

export async function loader({ context }: { context: any }) {
  const userSession = context.userSession;
  if (!userSession) throw redirect("/"); 
  return { userSession };
}

export default function GameRoute() {
  const { userSession } = useLoaderData<{ userSession: UserSession }>();

  return (
    <GameProvider
      initialMoney={userSession.user.money}
      initialInventory={userSession.inventory ?? []}
      initialFlags={userSession.user.flags} 
    >
      <GamePage />
    </GameProvider>
  );
}
