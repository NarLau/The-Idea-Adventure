import { useState, useEffect } from "react";
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

  const [serverHour, setServerHour] = useState<number | null>(null);


  useEffect(() => {
    async function fetchTime() {
      try {
        const res = await fetch(
          "https://worldtimeapi.org/api/timezone/Europe/Stockholm"
        );
        const data = await res.json();
        const date = new Date(data.datetime);
        setServerHour(date.getHours());
      } catch {

        setServerHour(new Date().getHours());
      }
    }

    fetchTime();
  }, []);


  const isSleepingTime = () => {
    if (serverHour === null) return false; 
    return serverHour >= 10 || serverHour < 5;
  };

  useEffect(() => {
    if (!isSleepingTime() && dialogIndex === -999) {
      setDialogIndex(-1);
      setDialogOpen(false);
    }
  }, [dialogIndex, serverHour]);

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
    if (isSleepingTime()) {
      setDialogIndex(-999);
      setDialogOpen(true);
      return;
    }

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
      ? {
          id: -999,
          text: "The animal is sleeping, and so should you. Come back tomorrow.",
        }
      : dialogIndex >= 0
      ? dialogNodes[dialogIndex]
      : null;

  return (
    <>
      <div onClick={handleClick} className="npc cat">
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
