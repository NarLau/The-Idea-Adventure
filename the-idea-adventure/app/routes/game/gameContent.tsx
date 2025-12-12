import { createContext, useContext, useState, type ReactNode } from "react";
import type { InventoryItemS } from "~/context/userSessionContext";

type GameContextType = {
  scene: "home" | "town" | "forest" | "shop";
  setScene: (s: GameContextType["scene"]) => void;
  inventory: InventoryItemS[]; // user's inventory
  setInventory: (inv: InventoryItemS[]) => void;
  money: number;
  setMoney: (m: number) => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({
  children,
  initialInventory = [],
  initialMoney = 0,
}: {
  children: ReactNode;
  initialInventory?: InventoryItemS[];
  initialMoney?: number;
}) {
  const [scene, setScene] = useState<GameContextType["scene"]>("home");
  const [inventory, setInventory] = useState<InventoryItemS[]>(initialInventory);
  const [money, setMoney] = useState<number>(initialMoney);

  return (
    <GameContext.Provider
      value={{ scene, setScene, inventory, setInventory, money, setMoney }}
    >
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used inside GameProvider");
  return ctx;
};
