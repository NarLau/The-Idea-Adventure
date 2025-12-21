import { useState } from "react";
import PlayerMoveScene from "./PlayerMoveScene";

export default function TownScene() {
     const [signToggled, setSignToggled] = useState(false);
     const [doorToggled, setDoorToggled] = useState(false);
    return (
    <div className="playerTown sceneGlobal">
        <h1>We are in the Town</h1>
               <button
        className="sign-toggle"
        onClick={() => setSignToggled((prev) => !prev)}
      >
        Sign
      </button>

      <div className={`sign-panel ${signToggled ? "open" : ""}`}>
        <PlayerMoveScene targetScene="forest" label="Go to Forest" type="sign" />
        <PlayerMoveScene targetScene="home" label="Go Home" type="sign" />
        </div>
         <button
        className="door-toggle"
        onClick={() => setDoorToggled((prev) => !prev)}
      >
        door
      </button>
      <div className={`door-panel ${doorToggled ? "open" : ""}`}>
         <PlayerMoveScene targetScene="shop" label="Go to the Shop" type="door" />
            </div>
    </div>
    )
}