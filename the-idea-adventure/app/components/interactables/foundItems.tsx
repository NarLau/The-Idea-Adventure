import { useState } from "react";
import { useGame } from "~/routes/game/gameContent";

type PickupItemProps = {
  itemId: string;
  itemName: string;
};

export default function PickupItem({ itemId, itemName }: PickupItemProps) {
  const { consumeItem } = useGame();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClick = () => setDialogOpen(true);

  const pickUpItem = async () => {
    await consumeItem(itemId, true);
    setDialogOpen(false);
  };

  return (
    <div>
      <div
        onClick={handleClick}
        style={{ cursor: "pointer", fontSize: 48 }}
      >
        🎁
      </div>

      {dialogOpen && (
        <div className="dialog-overlay" onClick={() => setDialogOpen(false)}>
          <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
            <p>Do you want to pick up the {itemName}?</p>
            <button onClick={pickUpItem}>Yes</button>
            <button onClick={() => setDialogOpen(false)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
}
