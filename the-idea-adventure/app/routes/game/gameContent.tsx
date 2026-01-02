import { createContext, useContext, useState, type ReactNode, type SetStateAction, type Dispatch, } from "react";
import type { InventoryItemS } from "~/context/userSessionContext";

export type Item = { id: string; name: string };
type CoinPopup = { id: number; amount: number };

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
  addMoney: (amount: number, type?: "quest" | "shop") => void;
  spendMoney: (amount: number) => void;
  coinPopups: CoinPopup[];
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
  const [coinPopups, setCoinPopups] = useState<CoinPopup[]>([]);
  const hasItem = (itemId: string) =>
    inventory.some(i => i.item.id === itemId && i.quantity > 0);
  const consumeItem = async (item: Item | string, pickup = false) => {
  const itemObj: Item = typeof item === "string" ? { id: item, name: item } : item;
  const itemInInventory = inventory.find(i => i.item.id === itemObj.id);

  setInventory(prev => {
    if (itemInInventory) {
      const newQty = pickup ? itemInInventory.quantity + 1 : itemInInventory.quantity - 1;
      if (newQty <= 0) return prev.filter(i => i.item.id !== itemObj.id);
      return prev.map(i => i.item.id === itemObj.id ? { ...i, quantity: newQty } : i);
    } else if (pickup) {
      return [...prev, { item: itemObj, quantity: 1 }];
    }
    return prev;
  });

  try {
    const formData = new FormData();
    formData.append("itemId", itemObj.id);

    if (!pickup) formData.append("consume", "true");

    const res = await fetch("/game/user/updateFlags", {
      method: "POST",
      body: formData
    });

    if (!res.ok) {
      const data = await res.json();
      if (data.message.includes("Out of stock") || data.message.includes("already fed")) {
        console.warn("Item consumption ignored:", data.message);
        return;
      }
      setInventory(prev => pickup
        ? prev.filter(i => i.item.id !== itemObj.id)
        : itemInInventory
          ? prev.map(i => i.item.id === itemObj.id ? { ...i, quantity: i.quantity + 1 } : i)
          : prev
      );
    }
  } catch (err) {
    console.error("Failed to update item on server", err);
    setInventory(prev => pickup
      ? prev.filter(i => i.item.id !== itemObj.id)
      : itemInInventory
        ? prev.map(i => i.item.id === itemObj.id ? { ...i, quantity: i.quantity + 1 } : i)
        : prev
    );
  }
};
  const addMoney = (amount: number, type: "quest" | "shop" = "quest") => {
    setMoney(prev => prev + amount);
    if (type === "quest" && amount > 0) {
      const id = Date.now();
      setCoinPopups(prev => [...prev, { id, amount }]);
      setTimeout(
        () => setCoinPopups(prev => prev.filter(p => p.id !== id)),
        1500
      );
    }
  };
  const spendMoney = (amount: number) =>
    setMoney(prev => prev - amount);
  const addFlag = async (flag: string) => {
    if (flags.includes(flag)) return;
    setFlags(prev => [...prev, flag]);
    if (flag === "dogPlayed" || flag === "catPlayed") {
      addMoney(5, "quest");
    } try {
      const formData = new FormData();
      formData.append("flag", flag);
      await fetch("/game/user/updateFlags", {
        method: "POST",
        body: formData,
      });
    } catch (err) {
      console.error("Failed to add flag:", err);
      setFlags(prev => prev.filter(f => f !== flag));
    }
  };

  return (
    <GameContext.Provider
      value={{ scene, setScene, inventory, setInventory, money, setMoney, flags, addFlag, hasItem, consumeItem, addMoney, spendMoney, coinPopups,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) {
    throw new Error("useGame must be used inside GameProvider");
  }
  return ctx;
};
