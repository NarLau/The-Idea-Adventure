import type { DialogNode, InventoryItemS } from "~/context/userSessionContext";
export function evaluateDialogCondition(
  node: DialogNode,
  flags: string[],
  inventory: InventoryItemS[],
  consumeItem?: (itemId: string) => void
): boolean {
  if (!node.condition) return true;

  const parts = node.condition.split("&&").map((p) => p.trim());

  return parts.every((part) => {
    if (part.startsWith("!")) {
      const flag = part.slice(1);
      return !flags.includes(flag);
    }

    if (part.startsWith("hasItem:")) {
      const itemId = part.split(":")[1];
      const has = inventory.some((i) => i.item.id === itemId && i.quantity > 0);
      if (has && consumeItem) consumeItem(itemId); 
      return has;
    }

    return flags.includes(part);
  });
}
