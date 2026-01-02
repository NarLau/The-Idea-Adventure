import { useState } from "react";
import { useGame, type Item } from "~/routes/game/gameContent";

type BuyItemProps = {
  itemId: string;
  itemName: string;
};

export default function BuyItem({ itemId, itemName }: BuyItemProps) {
  const { consumeItem, money, setMoney, hasItem } = useGame();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const price = 5;

  // Check if item is already in inventory (bought)
  const alreadyBought = hasItem(itemId);

  const handleClick = () => {
    if (alreadyBought) return; // do nothing if already bought
    setError(null); // reset previous errors
    setDialogOpen(true);
  };

  const buyItem = async () => {
    if (money < price) {
      setError("You don't have enough money!");
      return;
    }

    const fullItem: Item = { id: itemId, name: itemName };
    await consumeItem(fullItem, true); // add item to inventory
    setMoney(money - price); // deduct money
    setDialogOpen(false);
  };

  return (
    <div>
      <div
        onClick={handleClick}
        style={{
          cursor: alreadyBought ? "not-allowed" : "pointer",
          fontSize: 48,
          opacity: alreadyBought ? 0.5 : 1, // visually show sold out
        }}
      >
        🛒
      </div>

      {dialogOpen && (
        <div className="dialog-overlay" onClick={() => setDialogOpen(false)}>
          <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
            <p>Do you want to buy the {itemName} for 💰{price}?</p>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button onClick={buyItem}>Yes</button>
            <button onClick={() => setDialogOpen(false)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
}
