import { useState } from "react";
import PlayerMoveScene from "./PlayerMoveScene";

export default function ShopScene() {
    const [doorToggled, setDoorToggled] = useState(false);
    return (
        <div className="playerShop sceneGlobal">
            <h1>We are in the Shop</h1>
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
        )
}