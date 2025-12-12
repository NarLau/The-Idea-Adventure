import { createContext, useContext, useState, type ReactNode } from "react";
import type { InventoryItemS } from "~/context/userSessionContext";

type GameItemContextType = {
  inventory: InventoryItemS[];
  setInventory: (inv: InventoryItemS[]) => void;
};

const GameItemContext = createContext<GameItemContextType | undefined>(undefined);

export function GameItemProvider({
  children,
  initialItems = [],
}: {
  children: ReactNode;
  initialItems?: InventoryItemS[];
}) {
  const [inventory, setInventory] = useState<InventoryItemS[]>(initialItems);

  return (
    <GameItemContext.Provider value={{ inventory, setInventory }}>
      {children}
    </GameItemContext.Provider>
  );
}

export const useGameItems = () => {
  const ctx = useContext(GameItemContext);
  if (!ctx) throw new Error("useGameItems must be used inside GameItemProvider");
  return ctx;
};
