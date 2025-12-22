import { createContext } from "react";

export type GameItem = {
  id: string;
  name: string;
  description?: string;
  usableOn?: string[]; // from item.usableOn
  price?: number;
  isPurchasable?: boolean;
};
export type InventoryItemS = {
  item: GameItem; // full item data
  quantity: number;
};
export type DialogNode = {
  id: number;
  text: string;
  nextNode?: number[];
  condition?: string;      // ✅ add this
  onSelectFlag?: string;
};
export type NPC = {
  data: any; // interactableObject type, you can refine if you want
  dialogNodes: DialogNode[];
};

export type UserSession = {
  session: {
    token: string;
    expiresAt: string | Date;
  };
  user: {
    id: string;
    email: string;
    name: string;
    money: number;
    flags: string[]; 
  };
  inventoryItem: { itemId: string; userId: string; quantity: number }[]; 
    inventory?: InventoryItemS[];
     npcs?: { [key: string]: NPC }; // e.g., { dog: NPC }


};

export const userSessionContext = createContext<UserSession | null>(null);

