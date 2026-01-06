
import { useState } from "react";
import BuyItem from "../interactables/buyItem";
import PlayerMoveScene from "./PlayerMoveScene";

export default function ShopScene() {
  const [doorToggled, setDoorToggled] = useState(false);

  return (
    <div className="playerShop sceneGlobal">
      <p>Shop</p>

      <BuyItem itemId='"dogTreat"' itemName="Dog Yums"  />
      <BuyItem itemId='"catTreat"' itemName="Cat Nams" />

      <button className="door-toggle"
      title="door"
      onClick={() => setDoorToggled(true)}>
        
      </button>

      {doorToggled && (
        <div className="dialog-overlay"
        onClick={() => setDoorToggled(false)}>
          <div className="door-panel open"
          onClick={(e) => e.stopPropagation()}>
            <PlayerMoveScene targetScene="town" label="Go to Town" type="door" />
          </div>
        </div>
      )}
    </div>
  );
}
