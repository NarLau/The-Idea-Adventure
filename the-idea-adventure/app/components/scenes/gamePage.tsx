import { useGame } from "~/routes/game/gameContent";
import InventoryPanel from "../inventory/inventoryPanel";
import ForestScene from "./forestScene";
import HomeScene from "./homeScene";
import ShopScene from "./shopScene";
import TownScene from "./townScene";
import SignIn from "~/routes/signIn";

export default function GamePage() {
  const { scene, money } = useGame();

  return (
    <div className="game-page flex">
      <InventoryPanel />
      <div className="buttonwrapper gameLogOut">
        <SignIn />
      </div>

      <p>money: {money}</p>

      <div className="scene-container flex-1 ml-4">
        {scene === "home" && <HomeScene />}
        {scene === "town" && <TownScene />}
        {scene === "forest" && <ForestScene />}
        {scene === "shop" && <ShopScene />}
      </div>
    </div>
  );
}
