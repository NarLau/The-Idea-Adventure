import { useState } from "react";
import PlayerMoveScene from "./PlayerMoveScene";

export default function HomeScene() {
  const [doorToggled, setDoorToggled] = useState(false);

  return (
    <div className="playerHome sceneGlobal">
      <p>Home</p>

      <button
      title="door"
        className="door-toggle"
        onClick={() => setDoorToggled(true)}>
        
      </button>

      {doorToggled && (
        <div className="dialog-overlay"
          onClick={() => setDoorToggled(false)}>
          <div className="door-panel open"
          onClick={(e) => e.stopPropagation()}>
            <PlayerMoveScene targetScene="forest" label="Go to Forest" type="door"/>
            <PlayerMoveScene targetScene="town" label="Go to Town" type="door"/>
          </div>
        </div>
      )}
    </div>
  );
}
