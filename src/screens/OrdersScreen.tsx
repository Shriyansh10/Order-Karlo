import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import React from "react";
import { type OrderType } from "../context/DataTypes";
import { getData } from "../services/local-data";
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
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>Orders</Text>
        <Text style={styles.subtitle}>Your recent food deliveries</Text>
      </View>

      {orders && orders.length > 0 ? (
        <FlatList
          data={orders}
          inverted={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }: { item: OrderType[keyof OrderType] }) => {
            const restaurantImage = restaurantsData.find(
              (restaurant) => restaurant.id === item.restaurantId,
            )?.image;
            const restaurantName =
              restaurantsData.find(
                (restaurant) => restaurant.id === item.restaurantId,
              )?.name ?? "Restaurant";

            return (
              <View style={styles.orderCard}>
                <View style={styles.cardHeader}>
                  <View style={styles.restaurantBadge}>
                    
                      {restaurantImage ? (
                        <Image source={{ uri: restaurantImage }} style={styles.restaurantImage} />
                      ) : (
                        <Text style={styles.restaurantBadgeText}>
                          {restaurantName.charAt(0).toUpperCase()}
                        </Text>
                      )}
                  </View>

                  <View style={styles.restaurantInfo}>
                    <Text style={styles.restaurantName} numberOfLines={1}>
                      {restaurantName}
                    </Text>
                    <Text style={styles.orderDate}>
                      {new Date(item.time).toLocaleDateString()}
                    </Text>
                  </View>

                  <Text style={styles.totalPrice}>₹{item.totalPrice}</Text>
                </View>

                <View style={styles.divider} />

                <Text style={styles.itemsLabel}>Items</Text>

                <FlatList
                  data={item.cartItems}
                  scrollEnabled={false}
                  renderItem={({ item: cartItem }) => (
                    <View style={styles.itemRow}>
                      <Text style={styles.itemQuantity}>
                        {cartItem.quantity}x
                      </Text>
                      <Text style={styles.itemName} numberOfLines={1}>
                        {cartItem.name}
                      </Text>
                    </View>
                  )}
                  keyExtractor={(cartItem) => `${item.id}-${cartItem.id}`}
                />
              </View>
            );
          }}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No orders found</Text>
          <Text style={styles.emptyText}>
            Your completed orders will appear here.
          </Text>
        </View>
      )}
    </View>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F7F3F3",
    paddingHorizontal: 18,
    paddingTop: 22,
  },
  header: {
    marginBottom: 18,
  },
  title: {
    color: "#262222",
    fontSize: 30,
    fontWeight: "900",
  },
  subtitle: {
    color: "#8B8585",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 6,
  },
  listContent: {
    gap: 14,
    paddingBottom: 28,
  },
  orderCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#EEE4E4",
    shadowColor: "#1F1A1A",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  restaurantBadge: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  restaurantBadgeText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
  },
  restaurantImage: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#EFEAEA",
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantName: {
    color: "#262222",
    fontSize: 16,
    fontWeight: "900",
  },
  orderDate: {
    color: "#8B8585",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 4,
  },
  totalPrice: {
    color: "#0F8F45",
    fontSize: 17,
    fontWeight: "900",
  },
  divider: {
    height: 1,
    backgroundColor: "#EEE4E4",
    marginVertical: 14,
  },
  itemsLabel: {
    color: "#8B8585",
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 8,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 4,
  },
  itemQuantity: {
    color: "#D33135",
    fontSize: 13,
    fontWeight: "900",
    minWidth: 28,
  },
  itemName: {
    flex: 1,
    color: "#262222",
    fontSize: 14,
    fontWeight: "700",
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 26,
  },
  emptyTitle: {
    color: "#262222",
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 8,
  },
  emptyText: {
    color: "#8B8585",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
    textAlign: "center",
  },
});
