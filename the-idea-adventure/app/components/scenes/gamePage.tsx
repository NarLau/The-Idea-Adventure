import { useGame } from "~/routes/game/gameContent";
import SignIn from "~/routes/signIn";
import InventoryPanel from "../inventory/inventoryPanel";
import ForestScene from "./forestScene";
import HomeScene from "./homeScene";
import ShopScene from "./shopScene";
import TownScene from "./townScene";


export default function GamePage() {
  const { scene } = useGame();

  return (
    <div className="game-page flex">
      <InventoryPanel />
      <div className="buttonwrapper gameLogOut">
          <SignIn />
        </div>

      <div className="scene-container flex-1 ml-4">
        {/* Keep SignIn visible for login/logout */}
        

        {/* Render the current scene */}
        {scene === "home" && <HomeScene />}
        {scene === "town" && <TownScene />}
        {scene === "forest" && <ForestScene />}
        {scene === "shop" && <ShopScene />}
      </div>
    </div>
  );
}
