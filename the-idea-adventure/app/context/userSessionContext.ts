import { createContext } from "react";

export type GameItem = {
  id: string;
  name: string;
  description?: string;
  usableOn?: string[]; 
  price?: number;
  isPurchasable?: boolean;
};
export type InventoryItemS = {
  item: GameItem; 
  quantity: number;
};
export type DialogNode = {
  id: number;
  text: string;
  nextNode?: number[];
  condition?: string;
  onSelectFlag?: string;
};
export type NPC = {
  data: any; 
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
     npcs?: { [key: string]: NPC }; 


};

export const userSessionContext = createContext<UserSession | null>(null);

