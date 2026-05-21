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
    <View style={styles.container}>
      {!restaurantId && (
        <View style={styles.content}>
          <Text style={styles.text}>{textToDisplay}</Text>
        </View>
      )}

      {comp === "Cart" && (
        <Pressable
          style={({ pressed }) => [styles.content, pressed && styles.pressed]}
          onPress={() => {
            navigation.navigate("Cart", { restaurantId });
          }}
        >
          <Text style={styles.text}>{textToDisplay}</Text>
        </Pressable>
      )}

      {comp === "Order" && (
        <Pressable
          style={({ pressed }) => [styles.content, pressed && styles.pressed]}
          onPress={async () => {
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
          <Text style={styles.text}>{textToDisplay}</Text>
        </Pressable>
      )}
    </View>
  );
};

export default CustomModal;
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
    minHeight: 60,
    backgroundColor: "#0F8F45",
    borderRadius: 18,
    shadowColor: "#0F8F45",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.24,
    shadowRadius: 16,
    elevation: 6,
    zIndex: 100,
    overflow: "hidden",
  },
  content: {
    minHeight: 60,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.82,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
    textAlign: "center",
  },
});
