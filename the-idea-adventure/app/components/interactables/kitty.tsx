import { useState } from "react";
import type { DialogNode } from "~/context/userSessionContext";
import { useGame } from "~/routes/game/gameContent";
import { evaluateDialogCondition } from "~/utils/dialogHelper";

type CatProps = {
  dialogNodes: DialogNode[];
};

export default function Cat({ dialogNodes }: CatProps) {
  const { flags, addFlag, inventory, consumeItem } = useGame();
  const [dialogIndex, setDialogIndex] = useState<number>(-1);
  const [dialogOpen, setDialogOpen] = useState(false);

  const getNextNode = () =>
    dialogNodes.find((_, idx) =>
      idx > dialogIndex &&
      evaluateDialogCondition(dialogNodes[idx], flags, inventory, async (itemId) => {
        await consumeItem(itemId); 
      })
    ) || null;

  const handleClick = () => {
    if (dialogIndex === -1) {
      const next = getNextNode();
      if (next) setDialogIndex(dialogNodes.indexOf(next));
    }
    setDialogOpen(true);
  };

  const advanceDialog = () => {
    const node = dialogNodes[dialogIndex];
    if (!node) return;

    if (node.onSelectFlag) addFlag(node.onSelectFlag);

    const next = getNextNode();
    if (next) setDialogIndex(dialogNodes.indexOf(next));
    else setDialogOpen(false);
  };

  const currentNode = dialogIndex >= 0 ? dialogNodes[dialogIndex] : null;

  return (
    <>
      <div onClick={handleClick} style={{ cursor: "pointer", fontSize: 48 }}>
        KTTY
      </div>

      {dialogOpen && currentNode && (
        <div className="dialog-overlay" onClick={() => setDialogOpen(false)}>
          <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
            <p>{currentNode.text}</p>
            <button onClick={advanceDialog}>Next</button>
          </div>
        </div>
      )}
    </>
  );
}
