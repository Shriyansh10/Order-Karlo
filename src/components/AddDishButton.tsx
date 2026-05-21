import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  type CartType,
  type DishesType,
  type ItemType,
} from "../context/DataTypes";

const AddDishButton = ({
  dishId,
  item,
  setCart,
}: {
  dishId?: string;
  item: DishesType | ItemType;
  setCart: React.Dispatch<React.SetStateAction<CartType>>;
}) => {
  const handleAdd = () => {
    if ("dishType" in item) {
      setCart((prevCart) => {
        return {
          ...prevCart,
          [item.id]: {
            ...prevCart[item.id],
            quantity: (prevCart[item.id]?.quantity || 0) + 1,
          },
        };
      });
    } else {
      if (dishId) {
        setCart((prevCart) => {
          return {
            ...prevCart,
            [dishId]: {
              ...prevCart[dishId],
              quantity: (prevCart[dishId]?.quantity || 0) + 1,
            },
          };
        });
      }
    }
  };
  return (
    <Pressable
      onPress={handleAdd}
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
    >
      <Text style={styles.text}>+</Text>
    </Pressable>
  );
};

export default AddDishButton;

const styles = StyleSheet.create({
  button: {
    width: 34,
    height: 34,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPressed: {
    opacity: 0.7,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "800",
    lineHeight: 26,
  },
});
