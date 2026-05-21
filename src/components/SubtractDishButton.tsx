import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import type { CartType, DishesType, ItemType } from "../context/DataTypes";

const SubtractDishButton = ({
  item,
  setCart,
}: {
  item: DishesType | ItemType;
  setCart: React.Dispatch<React.SetStateAction<CartType>>;
}) => {
  return (
    <Pressable
      onPress={() => {
        setCart((prevCart) => {
          const currentQuantity = prevCart[item.id]?.quantity || 0;
          if (currentQuantity > 1) {
            return {
              ...prevCart,
              [item.id]: {
                ...prevCart[item.id],
                quantity: currentQuantity - 1,
              },
            };
          } else {
            const { [item.id]: removedItem, ...rest } = prevCart;
            return rest;
          }
        });
      }}
    >
      <Text>-</Text>
    </Pressable>
  );
};

export default SubtractDishButton;

const styles = StyleSheet.create({});
