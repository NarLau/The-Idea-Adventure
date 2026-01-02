import { useState, useEffect } from "react";
import { useGame } from "~/routes/game/gameContent";

export default function InventoryPanel() {
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [showCoinPopup, setShowCoinPopup] = useState(false);
  const { inventory, money } = useGame();
  const [prevMoney, setPrevMoney] = useState(money);

  useEffect(() => {
    if (money > prevMoney) {
      setShowCoinPopup(true);
      const timer = setTimeout(() => setShowCoinPopup(false), 1500);
      return () => clearTimeout(timer);
    }
    setPrevMoney(money);
  }, [money, prevMoney]);

  return (
    <>
      <div style={{ position: "relative", display: "inline-block" }}>
        <button
          className="inventory-toggle"
          onClick={() => setInventoryOpen(prev => !prev)}
        >
          🎒
        </button>

        {showCoinPopup && (
          <span className="coin-popup">+5</span>
        )}
      </div>

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
