import { useState } from "react";
import PlayerMoveScene from "./PlayerMoveScene";
import { useLoaderData } from "react-router";
import type { DialogNode, UserSession } from "~/context/userSessionContext";
import Dog from "../interactables/pup";


export default function TownScene() {
  const { userSession } = useLoaderData<{ userSession: UserSession }>();

  const [doorToggled, setDoorToggled] = useState(false);
  const [signToggled, setSignToggled] = useState(false);

  const dog = userSession.npcs?.dog;
  const dogDialogNodes: DialogNode[] = dog?.dialogNodes || [];
console.log("Dog loaded in middleware:", userSession.npcs?.dog);
const firstDialog = dogDialogNodes.find((node) => {
  console.log("Checking node:", node);
  if (!node.condition) return true;
  if (node.condition.startsWith("!")) {
    const result = !userSession.user.flags.includes(node.condition.slice(1));
    console.log("Negated condition result:", result);
    return result;
  }
  const result = userSession.user.flags.includes(node.condition);
  console.log("Positive condition result:", result);
  return result;
}) || null;

  // update flags in DB
  const updateFlags = async (flag: string) => {
    if (!userSession.user.flags.includes(flag)) {
      const newFlags = [...userSession.user.flags, flag];
      // simple fetch to backend endpoint to persist flag
      await fetch("/api/user/updateFlags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ flag }),
      });
      userSession.user.flags.push(flag); // update locally
    }
  };

  return (
    <div className="playerTown sceneGlobal" style={{ position: "relative" }}>
      
      <h1>We are in the Town</h1>

     {dog && dogDialogNodes.length > 0 && (
  <Dog
    dialogNodes={dogDialogNodes}
    userFlags={userSession.user.flags}   // <-- pass the flags
    updateFlags={updateFlags}
  />
)}

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
