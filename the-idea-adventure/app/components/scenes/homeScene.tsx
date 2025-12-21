import { useState } from "react";
import PlayerMoveScene from "./PlayerMoveScene";

export default function HomeScene() {
  const [doorToggled, setDoorToggled] = useState(false);
    return (<div className="playerHome sceneGlobal">
        
        <h1>We are at Home</h1>
        <button
        className="door-toggle"
        onClick={() => setDoorToggled((prev) => !prev)}
      >
        door
      </button>
      <div className={`door-panel ${doorToggled ? "open" : ""}`}>
    <PlayerMoveScene targetScene="forest" label="Go to Forest" type="door" />
      <PlayerMoveScene targetScene="town" label="Go to Town" type="door" />
    </div>
    </div>)
}