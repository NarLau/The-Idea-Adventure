import type { DialogNode, InventoryItemS } from "~/context/userSessionContext";
import type { Item } from "~/routes/game/gameContent";
import { useGame } from "~/routes/game/gameContent";

export function evaluateDialogCondition(
  node: DialogNode,
  flags: string[],
  inventory: InventoryItemS[],
  consumeItem?: (item: Item | string, pickup?: boolean) => Promise<void>
): boolean {
  if (!node.condition) return true;
  const parts = node.condition.split("&&").map(p => p.trim());

  return parts.every(part => {
    if (part.startsWith("!")) {
      const flag = part.slice(1);
      return !flags.includes(flag);
    }
    if (part.startsWith("hasItem:")) {
      const itemId = part.split(":")[1] ?? "";
      const itemInInventory = inventory.find(i => i.item.id === itemId && i.quantity > 0);
      if (itemInInventory && consumeItem) {
        consumeItem({ id: itemId, name: itemInInventory.item.name });
      }
      return !!itemInInventory;
    }
    return flags.includes(part);
  });
}
