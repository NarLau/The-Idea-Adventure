import { useLoaderData } from "react-router";
import type { UserSession } from "~/context/userSessionContext";
import Dog from "../interactables/pup";
import PlayerMoveScene from "./PlayerMoveScene";
import { useState } from "react";
import PickupItem from "../interactables/foundItems";

export default function TownScene() {
  const { userSession } = useLoaderData<{ userSession: UserSession }>();
  const dog = userSession.npcs?.dog;
  const dogDialogNodes = dog?.dialogNodes || [];
  const [doorToggled, setDoorToggled] = useState(false);
  const [signToggled, setSignToggled] = useState(false);


  return (
    <div className="playerTown sceneGlobal" style={{ position: "relative" }}>
      <h1>We are in the Town</h1>
     {dog && <Dog dialogNodes={dogDialogNodes} />}

     <PickupItem itemId='"catToy"' itemName="Yarn" />
      <button
              className="door-toggle"
              onClick={() => setDoorToggled(true)}>
              door
            </button>
      
            {doorToggled && (
              <div
                className="dialog-overlay"
                onClick={() => setDoorToggled(false)}>
                <div
                  className="door-panel open"
                  onClick={(e) => e.stopPropagation()}>
              
              <PlayerMoveScene targetScene="shop" label="Go to Shop" type="door" />
              </div>
            </div>
            )}
      <button
              className="sign-toggle"
              onClick={() => setSignToggled(true)}>
              Sign
            </button>
      
            {signToggled && (
              <div
                className="dialog-overlay"
                onClick={() => setSignToggled(false)}>
                <div
                  className="sign-panel open"
                  onClick={(e) => e.stopPropagation()}>
              
              <PlayerMoveScene targetScene="forest" label="Go to the Forest" type="sign" />
              <PlayerMoveScene targetScene="home" label="Go Home" type="sign" />
              </div>
            </div>
            )}
    </div>
  );
}
