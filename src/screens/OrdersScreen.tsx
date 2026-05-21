import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { type OrderContextType, OrderContext } from "../context/OrderContext";
import { getData, removeData } from "../services/local-data";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OrdersScreen = () => {
  const context = React.useContext<OrderContextType>(OrderContext);
  const order = context?.order;
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchOrders = async () => {
      const ordersFromStorage = await getData("orders");
      setIsLoading(false);
    };
    fetchOrders();
  }, []);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }


  return (
    <View>
      <Text>{JSON.stringify(getData("orders"))}</Text>
    </View>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({});
