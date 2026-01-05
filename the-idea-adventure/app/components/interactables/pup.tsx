import { useState, useEffect } from "react";
import type { DialogNode } from "~/context/userSessionContext";
import { useGame } from "~/routes/game/gameContent";
import { evaluateDialogCondition } from "~/utils/dialogHelper";

type DogProps = {
  dialogNodes: DialogNode[];
};

export default function Dog({ dialogNodes }: DogProps) {
  const { flags, addFlag, inventory, consumeItem } = useGame();
  const [dialogIndex, setDialogIndex] = useState<number>(-1);
  const [dialogOpen, setDialogOpen] = useState(false);

  const isSleepingTime = () => {
    const now = new Date();
    const hours = now.getHours();
    return hours >= 20 || hours < 5; 
  };

  useEffect(() => {
    if (!isSleepingTime() && dialogIndex === -999) {
      setDialogIndex(-1);
      setDialogOpen(false);
    }
  }, [dialogIndex]);

  const getNextNode = async () => {
    if (isSleepingTime()) return -999;

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
    const nextIdx = await getNextNode();
    if (nextIdx !== null) setDialogIndex(nextIdx);
    setDialogOpen(true);
  };

  const advanceDialog = async () => {
    if (dialogIndex === -999) {
      setDialogOpen(false);
      setDialogIndex(-1);
      return;
    }

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

  const currentNode =
    dialogIndex === -999
      ? { id: -999, text: "The dog is sleeping, and so should you. Come back tomorrow." }
      : dialogIndex >= 0
      ? dialogNodes[dialogIndex]
      : null;

  return (
    <>
      <div onClick={handleClick} className="npc">
        🐕
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
