import { createContext, useContext, useState, type ReactNode, type SetStateAction, type Dispatch } from "react";
import type { InventoryItemS } from "~/context/userSessionContext";

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
  consumeItem: (itemId: string) => Promise<void>;
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

  const consumeItem = async (itemId: string) => {
  const itemInInventory = inventory.find(i => i.item.id === itemId);
  if (!itemInInventory || itemInInventory.quantity <= 0) return;

  setInventory(prev =>
    prev
      .map(i =>
        i.item.id === itemId
          ? { ...i, quantity: i.quantity - 1 }
          : i
      )
      .filter(i => i.quantity > 0) 
  );

  try {
    const formData = new FormData();
    formData.append("itemId", itemId);

    const response = await fetch("/game/user/updateFlags", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      setInventory(prev =>
        prev.map(i =>
          i.item.id === itemId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      );
    }
  } catch {
    setInventory(prev =>
      prev.map(i =>
        i.item.id === itemId
          ? { ...i, quantity: i.quantity + 1 }
          : i
      )
    );
  }
};

  const addFlag = async (flag: string) => {
    if (!flags.includes(flag)) {
      setFlags(prev => [...prev, flag]);
      try {
        const formData = new FormData();
        formData.append("flag", flag);
        const response = await fetch("/game/user/updateFlags", {
          method: "POST",
          body: formData,
        });
        if (!response.ok) setFlags(prev => prev.filter(f => f !== flag));
      } catch {
        setFlags(prev => prev.filter(f => f !== flag));
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
