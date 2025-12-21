import { useState } from "react";
import PlayerMoveScene from "./PlayerMoveScene";


export default function ForestScene() {
           const [signToggled, setSignToggled] = useState(false);
    return (<div className="playerForest sceneGlobal">
            <h1>We are in the Forest</h1>
            <button
        className="sign-toggle"
        onClick={() => setSignToggled((prev) => !prev)}
      >
        Sign
      </button>
      <div className={`sign-panel ${signToggled ? "open" : ""}`}>
            <PlayerMoveScene targetScene="home" label="Go home" type="sign" />
          <PlayerMoveScene targetScene="town" label="Go to Town" type="sign" />
          </div>
        </div>
        )
}