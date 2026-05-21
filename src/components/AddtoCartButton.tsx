import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { type CartType, type DishesType } from "../context/DataTypes";

const AddtoCartButton = ({
  item,
  setCart,
}: {
  item: DishesType;
  setCart: React.Dispatch<React.SetStateAction<CartType>>;
}) => {

  
  return (
    <Pressable
      onPress={() => {
        // Check if the item is already in the cart
        setCart((prevCart) => {
          // If it is, increase the quantity
          return {
            ...prevCart,
            [item.id]: {
              id: item.id,
              quantity: 1,
              name: item.name,
              price: item.price,
            },
          };
        });
      }}
    >
      <Text>Add to Cart</Text>
    </Pressable>
  );
};

export default AddtoCartButton;

const styles = StyleSheet.create({});
