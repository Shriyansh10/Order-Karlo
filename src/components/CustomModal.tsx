import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  type OrderContextType,
  type OrderType,
  OrderContext,
} from "../context/OrderContext";
import { setData, getData } from "../services/local-data";

const CustomModal = ({
  restaurantId,
  textToDisplay,
  comp,
  orderDetails,
}: {
  restaurantId?: string;
  textToDisplay: string;
  comp: string;
  orderDetails?: OrderType[keyof OrderType]| null;
}) => {
  const navigation = useNavigation<any>();
  const context = React.useContext<OrderContextType>(OrderContext);
  const { order, setOrder } = context!;

  React.useEffect(() => {
    console.log(order);

  }, [order]);

  return (
    <View
      style={{
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
            const oldOrders = await getData("orders");
            if (oldOrders) {
              await setData("orders", JSON.stringify([...JSON.parse(oldOrders), orderDetails]));
            } else {
              await setData("orders", JSON.stringify([orderDetails]));
            }
            setOrder((prev) => {
              return {
                ...prev,
                [Object.keys(order).length]: orderDetails!,
              };
            });
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
