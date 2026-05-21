import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import type { CartType, DishesType, ItemType } from "../context/DataTypes";

const SubtractDishButton = ({
  dishId,
  item,
  setCart,
}: {
  dishId?: string;
  item: DishesType | ItemType
  setCart: React.Dispatch<React.SetStateAction<CartType>>;
}) => {

  const handleSubtract = () => {
    if('dishType' in item){
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
    }
    else{
      if(dishId){
        setCart((prevCart) => {
          const currentQuantity = prevCart[dishId]?.quantity || 0;
          if (currentQuantity > 1) {
            return {
              ...prevCart,
              [dishId]: {
                ...prevCart[dishId],
                quantity: currentQuantity - 1,
              },
            };
          } else {
            const { [dishId]: removedItem, ...rest } = prevCart;
            return rest;
          }
        });

      }
    }
  }
  return (
    <Pressable
      onPress={handleSubtract}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
      ]}
    >
      <Text style={styles.text}>-</Text>
    </Pressable>
  );
};

export default SubtractDishButton;

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
