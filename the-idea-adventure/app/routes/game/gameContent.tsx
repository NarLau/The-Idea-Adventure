import { createContext, useContext, useState, type ReactNode} from "react";

type GameContextType = {
  scene: "home" | "town" | "forest" | "shop";
  setScene: (s: GameContextType["scene"]) => void;
  inventory: Record<string, number>;
  setInventory: (inv: Record<string, number>) => void;
  money: number;
  setMoney: (m: number) => void;
  flags: Record<string, boolean>;
  setFlags: (f: Record<string, boolean>) => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [scene, setScene] = useState<GameContextType["scene"]>("home");
  const [inventory, setInventory] = useState<Record<string, number>>({});
  const [money, setMoney] = useState(0);
  const [flags, setFlags] = useState<Record<string, boolean>>({});

  return (
    <GameContext.Provider
      value={{ scene, setScene, inventory, setInventory, money, setMoney, flags, setFlags }}
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
