import { useGameItems } from "~/routes/game/gameItemContext";
import { useGame } from "~/routes/game/gameContent";

export default function InventoryPanel() {
  const { inventory } = useGame();
  const { money } = useGame();

  return (
    <div className="inventory-panel p-4 border rounded bg-gray-100 shadow-md w-64">
      <h3 className="text-lg font-bold mb-2">Inventory</h3>

      {inventory.length === 0 ? (
        <p>Your inventory is empty.</p>
      ) : (
        <ul className="list-disc pl-5">
          {inventory.map(({ item, quantity }) => (
            <li key={item.id}>
              {item.name} x{quantity}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4">
        <p>Money: {money}</p>
      </div>
    </div>
  );
}
