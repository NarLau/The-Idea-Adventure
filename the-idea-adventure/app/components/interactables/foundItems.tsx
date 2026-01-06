import { useState } from "react";
import { useGame, type Item } from "~/routes/game/gameContent";

type PickupItemProps = {
  itemId: string;
  itemName: string;
};
export default function PickupItem({ itemId, itemName }: PickupItemProps) {
  const { consumeItem, hasItem, flags } = useGame();
  const [dialogOpen, setDialogOpen] = useState(false);

  const oneTimeFlags: Record<string, string> = {
    '"dogToy"': "dogPlayed",
    '"catToy"': "catPlayed",
  };

  const disabled =
    hasItem(itemId) || (oneTimeFlags[itemId] && flags.includes(oneTimeFlags[itemId]));

  const handleClick = () => {
    if (!disabled) setDialogOpen(true);
  };

  const pickUpItem = async () => {
    const fullItem: Item = { id: itemId, name: itemName };
    await consumeItem(fullItem, true); 
    setDialogOpen(false);
  };

  const itemClass = itemName.replace(/\s+/g, "-").toLowerCase();

  return (
    <>
      <div
        onClick={handleClick}        
        className={`item ${itemClass}`} 
        style={{
          opacity: disabled ? 0.5 : 1,
          pointerEvents: disabled ? "none" : "auto",
        }}
      />

      {dialogOpen && (
        <div className="dialog-overlay" onClick={() => setDialogOpen(false)}>
          <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
            <p>Do you want to pick up the {itemName}?</p>
            <button onClick={pickUpItem}>Yes</button>
            <button onClick={() => setDialogOpen(false)}>No</button>
          </div>
        </div>
      )}
    </>
  );
}
