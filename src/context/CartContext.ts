import React from "react";
import type { CartType } from "./DataTypes";

export const CartContext = React.createContext<{
  cart: CartType;
  setCart: React.Dispatch<React.SetStateAction<CartType>>;
} | null>(null);

export type CartContextType = {
    cart: CartType,
    setCart: React.Dispatch<React.SetStateAction<CartType>>
} | null
