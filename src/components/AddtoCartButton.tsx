import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { type CartType, type DishesType } from "../context/DataTypes";
import uuid from "react-native-uuid";

const AddtoCartButton = ({
  item,
  setCart,
}: {
  item: DishesType;
  setCart: React.Dispatch<React.SetStateAction<CartType>>;
}) => {
  
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      onPress={() => {
        setCart((prevCart) => {
          return {
            ...prevCart,
            [item.id]: {
              restaurantId: item.id,
              id: uuid.v4().toString(),
              quantity: 1,
              name: item.name,
              price: item.price,
            },
          };
        });
      }}
    >
      <Text style={styles.text}>ADD</Text>
      <Text style={styles.plus}>+</Text>
    </Pressable>
  );
};

export default AddtoCartButton;

const styles = StyleSheet.create({
  button: {
    minWidth: 92,
    height: 38,
    borderRadius: 10,
    borderWidth: 1.4,
    borderColor: "#0F8F45",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  buttonPressed: {
    backgroundColor: "#ECF8F0",
  },
  text: {
    color: "#0F8F45",
    fontSize: 15,
    fontWeight: "900",
  },
  plus: {
    color: "#0F8F45",
    fontSize: 19,
    fontWeight: "900",
    marginTop: -2,
  },
});
