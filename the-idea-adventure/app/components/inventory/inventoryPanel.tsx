import { useState } from "react";
import { useGame } from "~/routes/game/gameContent";


export default function InventoryPanel() {
   const [inventoryOpen, setInventoryOpen] = useState(false);
  const { inventory, money } = useGame();

  return (
    <>
      <button
        className="inventory-toggle"
        onClick={() => setInventoryOpen((prev) => !prev)}
      >
        🎒
      </button>

   
      <div className={`inventory-panel ${inventoryOpen ? "open" : ""}`}>
        <h3>Inventory</h3>
        {inventory.length === 0 ? (
          <p className="empty">Your inventory is empty.</p>
        ) : (
          <ul>
            {inventory.map(({ item, quantity }) => (
              <li key={item.id}>
                {item.name} x{quantity}
              </li>
            ))}
          </ul>
        )}
        <div className="money">💰 {money}</div>
      </div>
    </>
  );
}