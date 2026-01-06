import { useGame } from "~/routes/game/gameContent";
import ForestScene from "./forestScene";
import HomeScene from "./homeScene";
import ShopScene from "./shopScene";
import TownScene from "./townScene";
import InventoryPanel from "../inventory/inventoryPanel";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { authClient } from "~/servers/auth/client";

export default function GamePage() {
  const { scene } = useGame();
    const [settingsOpen, setSettingsOpen] = useState(false);
    const navigate = useNavigate();
    

  return (
    <div className="game-page-grid">
      <header className="top-bar">
         <h3 className="logo gameLogo">The Idea Adventure</h3>
      </header>
      <main className="game-frame">
        {scene === "home" && <HomeScene />}
        {scene === "town" && <TownScene />}
        {scene === "forest" && <ForestScene />}
        {scene === "shop" && <ShopScene />}
      </main>
      <footer className="bottom-hud">
  <InventoryPanel />

  <button className="settings-button"
    onClick={() => setSettingsOpen(true)}
  >
    ⚙️
  </button>

    {settingsOpen && (
    <div className="dialog-overlay"
      onClick={() => setSettingsOpen(false)}
    >
      <div className="settings-panel open"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "absolute",
          bottom: "80px",
          right: "16px",
          zIndex: 1000,
        }} >
        <h3>Settings</h3>
        <div className="playgamewrapper">
          <button className="profileBtn playOrLogin">
            <NavLink to="/userprofile">My profile</NavLink>
          </button>
            <button className="gameLogOut playOrLogin"
            onClick={async () => {
              await authClient.signOut();
              navigate("/navplaygame");
            }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    )}
    </footer>


  </div>
  );
}
