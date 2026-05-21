import { Pressable, StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { type OrderType } from "../context/DataTypes";
import { getData, removeData } from "../services/local-data";
import { useFocusEffect } from "@react-navigation/native";
import { restaurantsData } from "../data/restaurantData";
import Loading from "./Loading";

const OrdersScreen = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [orders, setOrders] = React.useState<
    OrderType[keyof OrderType][] | null
  >(null);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const fetchOrders = async () => {
        const ordersFromStorage = await getData("orders");
        if (isActive) {
          setOrders(ordersFromStorage);
          setIsLoading(false);
        }
      };

      fetchOrders();
      return () => {
        isActive = false;
      };
    }, []),
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View>
      {orders && orders.length > 0 ? (
        <FlatList
          data={orders}
          inverted={true}
          renderItem={({ item }: { item: OrderType[keyof OrderType] }) => (
            <View style={{ marginBottom: 20 }}>
              <Text>Restaurant Name: {restaurantsData.find((restaurant) => restaurant.id === item.restaurantId)?.name}</Text>
              <Text>Total Price: {item.totalPrice}</Text>
              <Text>Items:</Text>
              <FlatList
                data={item.cartItems}
                renderItem={({ item }) => (
                  <View style={{ marginLeft: 20 }}>
                    <Text>{item.quantity} x {item.name}</Text>
                  </View>
                )}
                keyExtractor={(cartItem) => `${item.id}-${cartItem.id}`}
              />
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text>No orders found.</Text>
      )}
    </View>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({});
