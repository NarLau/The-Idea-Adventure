import { useState } from "react";
import PlayerMoveScene from "./PlayerMoveScene";
import type { UserSession } from "~/context/userSessionContext";
import { useLoaderData } from "react-router-dom";
import Cat from "../interactables/kitty";


export default function ForestScene() {
  const { userSession } = useLoaderData<{ userSession: UserSession }>();
  const [signToggled, setSignToggled] = useState(false);
   const cat = userSession.npcs?.cat;
  const catDialogNodes = cat?.dialogNodes || [];
    return (<div className="playerForest sceneGlobal">
            <h1>We are in the Forest</h1>
             {cat && <Cat dialogNodes={catDialogNodes} />}
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