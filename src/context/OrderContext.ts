import React from "react";
import type { ItemType } from "./DataTypes";

export type OrderType = {
    [key: string]: {
        restaurantId: string;
        cartItems: ItemType[]
        totalPrice: number;
    }
}

export type OrderContextType = {
    order: OrderType,   
    setOrder: React.Dispatch<React.SetStateAction<OrderType>>
} | null

export const OrderContext = React.createContext<OrderContextType>(null);
    
