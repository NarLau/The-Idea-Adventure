import { useState } from "react";
import { useGame, type Item } from "~/routes/game/gameContent";

type BuyItemProps = {
  itemId: string;
  itemName: string;
};

export default function BuyItem({ itemId, itemName }: BuyItemProps) {
  const { money, spendMoney, consumeItem, hasItem, flags, addFlag } = useGame();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [hover, setHover] = useState(false);

  const isDogTreat = itemId === '"dogTreat"';
  const isCatTreat = itemId === '"catTreat"';

  const cannotBuy =
    (isDogTreat && (hasItem('"dogTreat"') || flags.includes("dogAte"))) ||
    (isCatTreat && (hasItem('"catTreat"') || flags.includes("catAte")));

  const tooltipMessage = cannotBuy
    ? isDogTreat
      ? "You already fed your dog"
      : "You already fed your cat"
    : "";

  const handleClick = () => {
    if (!cannotBuy) setDialogOpen(true);
  };

  const buyItem = async () => {
    const cost = 5;
    if (money < cost) return alert("Not enough coins!");

    try {
      spendMoney(cost);
      await consumeItem({ id: itemId, name: itemName }, true);
      if (isDogTreat) addFlag("dogAte");
      if (isCatTreat) addFlag("catAte");

      setDialogOpen(false);
    } catch (err) {
      console.error("BuyItem error:", err);
      alert("Purchase failed");
    }
  };

  const iconStyle = {
    cursor: cannotBuy ? "not-allowed" : "pointer",
    fontSize: 48,
    opacity: cannotBuy ? 0.4 : 1,
    position: "relative" as const,
  };

  const tooltipStyle = {
    position: "absolute" as const,
    bottom: "100%",
    left: "50%",
    transform: "translateX(-50%)",
    padding: "4px 8px",
    backgroundColor: "#333",
    color: "#fff",
    borderRadius: "4px",
    fontSize: "12px",
    whiteSpace: "nowrap" as const,
    pointerEvents: "none" as const,
    opacity: hover ? 1 : 0,
    transition: "opacity 0.2s ease",
    zIndex: 10,
  };

  return (
    <div className="shopItem">
      <div style={{ display: "inline-block", position: "relative" }}>
        <div
          onClick={handleClick}
          style={iconStyle}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          🛒
          {cannotBuy && tooltipMessage && <div style={tooltipStyle}>{tooltipMessage}</div>}
        </div>

        {dialogOpen && (
          <div className="dialog-overlay" onClick={() => setDialogOpen(false)}>
            <div className="dialog-box" onClick={e => e.stopPropagation()}>
              <p>Do you want to buy the {itemName} for 5 coins?</p>
              <button onClick={buyItem} disabled={cannotBuy}>
                {cannotBuy ? "Cannot buy" : "Yes"}
              </button>
              <button onClick={() => setDialogOpen(false)}>No</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
