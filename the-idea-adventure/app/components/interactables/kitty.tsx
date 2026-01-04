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

  const getNextNode = async () => {
    for (let idx = dialogIndex + 1; idx < dialogNodes.length; idx++) {
      const node = dialogNodes[idx];
      const valid = evaluateDialogCondition(node, flags, inventory, async (item) => {
        await consumeItem(item);
      });
      if (valid) return idx;
    }
    return null;
  };

  const handleClick = async () => {
    if (dialogIndex === -1) {
      const nextIdx = await getNextNode();
      if (nextIdx !== null) setDialogIndex(nextIdx);
    }
    setDialogOpen(true);
  };

  const advanceDialog = async () => {
    const node = dialogNodes[dialogIndex];
    if (!node) return;
    if (node.onSelectFlag) addFlag(node.onSelectFlag);

    const nextIdx = await getNextNode();
    if (nextIdx !== null) {
      setDialogIndex(nextIdx);
    } else {
      setDialogOpen(false);
      setDialogIndex(-1); 
    }
  };

  const currentNode = dialogIndex >= 0 ? dialogNodes[dialogIndex] : null;

  return (
    <>
      <div onClick={handleClick} style={{ cursor: "pointer", fontSize: 48 }}>
        KTTY
      </div>

      {dialogOpen && currentNode && (
        <div className="dialog-overlay" onClick={() => setDialogOpen(false)}>
          <div className="dialog-box" onClick={e => e.stopPropagation()}>
            <p>{currentNode.text}</p>
            <button onClick={advanceDialog}>Next</button>
          </div>
        </div>
      )}
    </>
  );
}
