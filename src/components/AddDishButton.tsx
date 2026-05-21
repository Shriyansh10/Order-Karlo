import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { type CartType, type DishesType, type ItemType } from "../context/DataTypes";

const AddDishButton = ({
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
          return {
            ...prevCart,
            [item.id]: {
              ...prevCart[item.id],
              quantity: (prevCart[item.id]?.quantity || 0) + 1,
            },
          };
        });
      }}
    >
      <Text>+</Text>
    </Pressable>
  );
};

export default AddDishButton;

const styles = StyleSheet.create({});
