import { createContext, useContext, useState, useRef, type ReactNode, type SetStateAction, type Dispatch } from "react";
import type { InventoryItemS } from "~/context/userSessionContext";
import { Form } from "react-router-dom";

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

  const flagFormRef = useRef<HTMLFormElement>(null);
  const flagInputRef = useRef<HTMLInputElement>(null);

  const hasItem = (itemId: string) => inventory.some((i) => i.item.id === itemId && i.quantity > 0);

  const addFlag = async (flag: string) => {
	if (!flags.includes(flag)) {

		setFlags((prev) => [...prev, flag]);
		try {
			const formData = new FormData();
			formData.append("flag", flag);
			const response = await fetch("/game/user/updateFlags", {
				method: "POST",
				body: formData,
			});
			if (!response.ok) {
			
				setFlags((prev) => prev.filter(f => f !== flag));
				console.error("Failed to update flag");
			}
		} catch (error) {
		
			setFlags((prev) => prev.filter(f => f !== flag));
			console.error("Failed to update flag:", error);
		}
	}
};

  return (
    <GameContext.Provider value={{ scene, setScene, inventory, setInventory, money, setMoney, flags, addFlag, hasItem }}>
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used inside GameProvider");
  return ctx;
};
