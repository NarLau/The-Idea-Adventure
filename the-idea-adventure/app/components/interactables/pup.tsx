import  { useState } from "react";
import type { DialogNode } from "~/context/userSessionContext";

type DogProps = {
  dialogNodes: DialogNode[];
  userFlags: string[];
  updateFlags: (flag: string) => void;
  position?: { left: number; top: number }; // optional
};

export default function Dog({
  dialogNodes,
  userFlags,
  updateFlags,
  position = { left: 200, top: 250 },
}: DogProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentNode, setCurrentNode] = useState<DialogNode | null>(null);

  const getNextNode = () => {
    return dialogNodes.find((node) => {
      if (!node.condition) return true;
      if (node.condition.startsWith("!")) {
        return !userFlags.includes(node.condition.slice(1));
      }
      return userFlags.includes(node.condition);
    }) || null;
  };

  const handleClick = () => {
    if (!currentNode) setCurrentNode(getNextNode());
    setDialogOpen(true);
  };

  const advanceDialog = () => {
    if (!currentNode) return;

    if (currentNode.onSelectFlag) updateFlags(currentNode.onSelectFlag);

    const nextNode = getNextNode();
    setCurrentNode(nextNode);

    if (!nextNode) setDialogOpen(false);
  };

  return (
    <>
      <div
        className="dog-npc"
        style={{
          position: "absolute", // <-- ensure it’s clickable
          left: position.left,
          top: position.top,
          fontSize: 48,
          cursor: "pointer",
          userSelect: "none",
          zIndex: 10,
        }}
        onClick={handleClick}
      >
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
