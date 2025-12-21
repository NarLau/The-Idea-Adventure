import { useGame } from "~/routes/game/gameContent";
import ForestScene from "./forestScene";
import HomeScene from "./homeScene";
import ShopScene from "./shopScene";
import TownScene from "./townScene";
import InventoryPanel from "../inventory/inventoryPanel";
import { useState } from "react";
import { NavLink } from "react-router";

export default function GamePage() {
  const { scene } = useGame();
    const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="game-page-grid">
      <header className="top-bar">
        <div className="logo">My Game</div>
        
      </header>

      <main className="game-frame">
        {scene === "home" && <HomeScene />}
        {scene === "town" && <TownScene />}
        {scene === "forest" && <ForestScene />}
        {scene === "shop" && <ShopScene />}
      </main>

      {/* Bottom HUD: inventory, settings */}
      <footer className="bottom-hud">
  <InventoryPanel />
  <button
    className="settings-button"
    onClick={() => setSettingsOpen((prev) => !prev)}
  >
    ⚙️
  </button>

  {/* Settings panel */}
  <div
    className={`settings-panel ${settingsOpen ? "open" : ""}`}
    style={{ position: "absolute", bottom: "80px", right: "16px", zIndex: 1000 }}
  >
    <h3>Settings</h3>
    <div className="buttonwrapper gameLogOut">
      <NavLink to="/navplaygame">Sign Out</NavLink>
    </div>
  </div>
</footer>

    </div>
  );
}
