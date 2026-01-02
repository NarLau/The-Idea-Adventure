import { createContext, useContext, useState, type ReactNode, type SetStateAction, type Dispatch } from "react";
import type { InventoryItemS } from "~/context/userSessionContext";

export type Item = { id: string; name: string };

type GameContextType = {
  scene: "home" | "town" | "forest" | "shop";
  setScene: (s: GameContextType["scene"]) => void;
  inventory: InventoryItemS[];
  setInventory: Dispatch<SetStateAction<InventoryItemS[]>>;
  money: number;
  setMoney: (m: number) => void;
  flags: string[];
  addFlag: (flag: string) => void;
  hasItem: (itemId: string) => boolean;
  consumeItem: (item: Item | string, pickup?: boolean) => Promise<void>;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({
  children,
  initialInventory = [],
  initialMoney = 0,
  initialFlags = [],
}: {
  children: ReactNode;
  initialInventory?: InventoryItemS[];
  initialMoney?: number;
  initialFlags?: string[];
}) {
  const [scene, setScene] = useState<GameContextType["scene"]>("home");
  const [inventory, setInventory] = useState<InventoryItemS[]>(initialInventory);
  const [money, setMoney] = useState<number>(initialMoney);
  const [flags, setFlags] = useState<string[]>(initialFlags);

  const hasItem = (itemId: string) =>
    inventory.some((i) => i.item.id === itemId && i.quantity > 0);

  const consumeItem = async (item: Item | string, pickup = false) => {
    const itemObj: Item =
      typeof item === "string" ? { id: item, name: item } : item;

    const itemInInventory = inventory.find(i => i.item.id === itemObj.id);

    setInventory(prev => {
      if (itemInInventory) {
        const newQty = pickup ? itemInInventory.quantity + 1 : itemInInventory.quantity - 1;
        if (newQty <= 0) return prev.filter(i => i.item.id !== itemObj.id);
        return prev.map(i =>
          i.item.id === itemObj.id ? { ...i, quantity: newQty } : i
        );
      } else if (pickup) {
        return [...prev, { item: itemObj, quantity: 1 }];
      }
      return prev;
    });

    try {
      const formData = new FormData();
      formData.append("itemId", itemObj.id);
      if (!pickup) formData.append("consume", "true");

      const response = await fetch("/game/user/updateFlags", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) console.error("Failed to update item on server");
    } catch (err) {
      console.error(err);
    }
  };

 const addFlag = async (flag: string) => {
  if (!flags.includes(flag)) {
    let tempMoney = money;
    if (flag === "dogPlayed" || flag === "catPlayed") {
      tempMoney += 5;
      setMoney(tempMoney); 
    }

    try {
      const formData = new FormData();
      formData.append("flag", flag);
      if (flag === "dogPlayed" || flag === "catPlayed") {
        formData.append("money", tempMoney.toString());
      }

      const res = await fetch("/game/user/updateFlags", {
        method: "POST",
        body: formData,
      });

      let data: any = {};
      try {
        data = await res.json();
      } catch {
        console.warn("Server did not return JSON, ignoring");
      }

      if (data.money) setMoney(data.money); 
      if (data.flags) setFlags(data.flags);
    } catch (err) {
      console.error("Failed to add flag or update money:", err);
    }
  }
};

  return (
    <GameContext.Provider value={{
      scene, setScene,
      inventory, setInventory,
      money, setMoney,
      flags, addFlag,
      hasItem, consumeItem
    }}>
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used inside GameProvider");
  return ctx;
};
