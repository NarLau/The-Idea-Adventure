import { useState } from "react";
import PlayerMoveScene from "./PlayerMoveScene";
import type { UserSession } from "~/context/userSessionContext";
import { useLoaderData } from "react-router-dom";
import Cat from "../interactables/kitty";
import PickupItem from "../interactables/foundItems";


export default function ForestScene() {
  const { userSession } = useLoaderData<{ userSession: UserSession }>();
  const [signToggled, setSignToggled] = useState(false);
  const cat = userSession.npcs?.cat;
  const catDialogNodes = cat?.dialogNodes || [];

    return (
    <div className="playerForest sceneGlobal">

      <p>Forest</p>
      {cat && <Cat dialogNodes={catDialogNodes} />}
      <PickupItem itemId='"dogToy"' itemName="Ball" />
      <button
      title="sign"
        className="sign-toggle"
        onClick={() => setSignToggled(true)}>
        
      </button>
            
      {signToggled && (
        <div
          className="dialog-overlay"
          onClick={() => setSignToggled(false)}>
          <div className="sign-panel open"
          onClick={(e) => e.stopPropagation()}> 
        <PlayerMoveScene targetScene="town" label="Go to Town" type="sign" />
        <PlayerMoveScene targetScene="home" label="Go Home" type="sign" />
        </div>
      </div>
      )}
    </div>
  )
}