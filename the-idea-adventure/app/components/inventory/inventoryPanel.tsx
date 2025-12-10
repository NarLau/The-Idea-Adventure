import { useGame } from "~/routes/game/gameContent";


export default function InventoryPanel() {
  const { inventory, money } = useGame();

  return (
    <div className="inventory-panel p-4 border rounded bg-gray-100 shadow-md w-64">
      <h3 className="text-lg font-bold mb-2">Inventory</h3>
      
      {Object.keys(inventory).length === 0 ? (
        <p>Your inventory is empty.</p>
      ) : (
        <ul className="list-disc pl-5">
          {Object.entries(inventory).map(([itemId, qty]) => (
            <li key={itemId}>
              {itemId} x{qty}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4">
        <p className="font-semibold">Money: {money}</p>
      </div>
    </div>
  );
}
