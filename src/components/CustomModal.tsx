import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { type OrderType } from "../context/DataTypes";
import { setData, getData } from "../services/local-data";
import { CartContext } from "../context/CartContext";

const CustomModal = ({
  restaurantId,
  textToDisplay,
  comp,
  orderDetails,
}: {
  restaurantId?: string;
  textToDisplay: string;
  comp: string;
  orderDetails?: OrderType[keyof OrderType] | null;
}) => {
  const navigation = useNavigation<any>();

    const context = React.useContext(CartContext);
  const { setCart } = context!;
  return (
    <View
      style={{
        // Pin the modal near the bottom of the screen.
        position: "absolute",
        bottom: 40,
        left: 20,
        right: 20,
        height: 60,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        elevation: 5,
        zIndex: 100,
      }}
    >
      {!restaurantId && (
        <View>
          <Text>{textToDisplay}</Text>
        </View>
      )}
      {comp === "Cart" && (
        <Pressable
          onPress={() => {
            navigation.navigate("Cart", { restaurantId });
          }}
        >
          <Text> {textToDisplay}</Text>
        </Pressable>
      )}
      {comp === "Order" && (
        <Pressable
          onPress={async () => {
            // Persist the order before navigating away.
            const oldOrders: OrderType[keyof OrderType][] | null =
              await getData("orders");
            if (oldOrders) {
              await setData("orders", [
                ...oldOrders,
                orderDetails,
              ] as OrderType[keyof OrderType][]);
            } else {
              await setData("orders", [
                orderDetails,
              ] as OrderType[keyof OrderType][]);
            }
            setCart({});
            alert("Order Placed!");
            navigation.goBack();
          }}
        >
          <Text> {textToDisplay}</Text>
        </Pressable>
      )}
    </View>
  );
};

export default CustomModal;

const styles = StyleSheet.create({});
