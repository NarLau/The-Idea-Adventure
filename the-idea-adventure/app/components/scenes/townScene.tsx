import { useLoaderData } from "react-router";
import type { UserSession } from "~/context/userSessionContext";
import Dog from "../interactables/pup";
import PlayerMoveScene from "./PlayerMoveScene";
import { useState } from "react";

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

      <button className="door-toggle" onClick={() => setDoorToggled((p) => !p)}>door</button>
      <div className={`door-panel ${doorToggled ? "open" : ""}`}>
        <PlayerMoveScene targetScene="shop" label="Go to the Shop" type="door" />
      </div>

      <button className="sign-toggle" onClick={() => setSignToggled((p) => !p)}>Sign</button>
      <div className={`sign-panel ${signToggled ? "open" : ""}`}>
        <PlayerMoveScene targetScene="forest" label="Go to Forest" type="sign" />
        <PlayerMoveScene targetScene="home" label="Go Home" type="sign" />
      </div>
    </div>
  );
}
