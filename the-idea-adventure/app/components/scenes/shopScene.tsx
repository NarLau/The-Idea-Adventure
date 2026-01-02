
import { useState } from "react";
import BuyItem from "../interactables/buyItem";
import PlayerMoveScene from "./PlayerMoveScene";

export default function ShopScene() {
  const [doorToggled, setDoorToggled] = useState(false);

  return (
    <div className="playerShop sceneGlobal">
      <h1>Welcome to the Shop</h1>

      <BuyItem itemId='"dogTreat"' itemName="Dog Yums"  />
      <BuyItem itemId='"catTreat"' itemName="Cat Nams" />

      <button
        className="door-toggle"
        onClick={() => setDoorToggled((prev) => !prev)}
      >
        door
      </button>
      <div className={`door-panel ${doorToggled ? "open" : ""}`}>
        
        <PlayerMoveScene targetScene="town" label="Go to Town" type="door" />
      </div>
    </div>
  );
}
