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


};

export const userSessionContext = createContext<UserSession | null>(null);

