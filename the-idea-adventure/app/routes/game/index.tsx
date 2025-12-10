import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authClient } from "~/servers/auth/client"; 
import { GameProvider } from "./gameContent";
import GamePage from "~/components/scenes/gamePage";

export default function GameRoute() {
  const { data: session } = authClient.useSession();
  const navigate = useNavigate();

  useEffect(() => {
  if (!session) navigate("/");
   }, [session, navigate]);

  if (!session) return <p>Loading...</p>;

  return (
    <GameProvider>
      <GamePage />
    </GameProvider>
  );
}
