import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { restaurantsData } from "../data/restaurantData";
import { type CartType, type ItemType } from "../context/DataTypes";

import AddDishButton from "../components/AddDishButton";
import SubtractDishButton from "../components/SubtractDishButton";

import { CartContext } from "../context/CartContext";
import CustomModal from "../components/CustomModal";
import type { OrderType } from "../context/DataTypes";

import uuid from "react-native-uuid";


const CartScreen = () => {
  const route = useRoute<any>();
  const { restaurantId }: { restaurantId: string } = route.params;

  const context = React.useContext(CartContext);
  const { cart, setCart } = context!;

  const [modalVisible, setModalVisible] = React.useState(true);
  const restaurantName = restaurantsData.find(
    (restaurant) => restaurant.id === restaurantId,
  )?.name;

  const [orderDetails, setOrderDetails] = React.useState<
    OrderType[keyof OrderType] | null
  >(null);
  const [itemTotal, setItemTotal] = React.useState<number>(0);


  const placeOrder = () => {
    return {
      restaurantId,
      cartItems: Object.entries(cart).map((cartItem) => {
        const [id, itemData] = cartItem;
        return {
          restaurantId: itemData.restaurantId,
          id: uuid.v4().toString(),
          name: itemData.name,
          price: itemData.price,
          quantity: itemData.quantity,
        };
      }) as ItemType[],
      totalPrice: total + 50,
      id: uuid.v4().toString(),
      time: new Date(Date.now()),
    } 
  };

  const total = Object.values(cart).reduce(
    (total, cartItem) => total + cartItem.price * cartItem.quantity,
    0,
  );


  React.useEffect(() => {
    console.log(cart);
    setItemTotal(total);
    if (!Object.entries(cart).some((cartItem) => cartItem[1].quantity > 0)) {
      setModalVisible(false);
    } else {
      setModalVisible(true);
    }
    setOrderDetails(placeOrder());
  }, [cart]);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>My Cart</Text>
        <Text style={styles.subtitle}>Review your order before checkout</Text>
      </View>

      <View style={styles.deliveryCard}>
        <Text style={styles.deliveryLabel}>Delivered to</Text>
        <Text style={styles.deliveryAddress}>St. Abigail</Text>
      </View>

      <View style={styles.restaurantCard}>
        <Text style={styles.restaurantLabel}>Restaurant</Text>
        <Text style={styles.restaurantName}>{restaurantName}</Text>
      </View>

      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        data={Object.entries(cart)}
        renderItem={({ item }) => {
          const [id, itemData] = item;

          return (
            <View style={styles.cartItem}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName} numberOfLines={2}>
                  {itemData.name}
                </Text>
                <Text style={styles.itemPrice}>
                  ₹{itemData.price.toFixed(2)}
                </Text>
              </View>

              <View style={styles.itemActions}>
                <View style={styles.quantityControl}>
                  <SubtractDishButton
                    item={item[1]}
                    setCart={setCart}
                    dishId={item[0]}
                  />
                  <Text style={styles.quantityText}>
                    {cart[item[0]]?.quantity}
                  </Text>
                  <AddDishButton
                    item={item[1]}
                    setCart={setCart}
                    dishId={item[0]}
                  />
                </View>

                <Text style={styles.lineTotal}>
                  ₹{(itemData.price * itemData.quantity).toFixed(2)}
                </Text>
              </View>
            </View>
          );
        }}
        keyExtractor={(cartItem) => cartItem[1].id}
      />

      <View style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Item Total</Text>
          <Text style={styles.summaryValue}>₹{itemTotal.toFixed(2)}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Delivery Fee</Text>
          <Text style={styles.summaryValue}>₹50.00</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalValue}>₹{(itemTotal + 50).toFixed(2)}</Text>
        </View>
      </View>

      {modalVisible && (
        <CustomModal
          restaurantId={restaurantId}
          textToDisplay="Place Order"
          comp="Order"
          orderDetails={orderDetails}
        />
      )}

      {!modalVisible && (
        <CustomModal textToDisplay="Your cart is empty" comp="" />
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F7F3F3",
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 120,
  },
  header: {
    marginBottom: 18,
  },
  title: {
    color: "#262222",
    fontSize: 28,
    fontWeight: "900",
  },
  subtitle: {
    color: "#8B8585",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 6,
  },
  deliveryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#EEE4E4",
  },
  deliveryLabel: {
    color: "#8B8585",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 4,
  },
  deliveryAddress: {
    color: "#262222",
    fontSize: 15,
    fontWeight: "900",
  },
  restaurantCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#EEE4E4",
  },
  restaurantLabel: {
    color: "#8B8585",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 4,
  },
  restaurantName: {
    color: "#262222",
    fontSize: 16,
    fontWeight: "900",
  },
  list: {
    flexGrow: 0,
  },
  listContent: {
    gap: 12,
    paddingBottom: 16,
  },
  cartItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 14,
    borderWidth: 1,
    borderColor: "#EEE4E4",
    shadowColor: "#1F1A1A",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.05,
    shadowRadius: 14,
    elevation: 2,
  },
  itemInfo: {
    flex: 1,
    justifyContent: "center",
  },
  itemName: {
    color: "#262222",
    fontSize: 16,
    fontWeight: "900",
    lineHeight: 21,
  },
  itemPrice: {
    color: "#8B8585",
    fontSize: 13,
    fontWeight: "700",
    marginTop: 7,
  },
  itemActions: {
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 9,
  },
  quantityControl: {
    minWidth: 108,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#0F8F45",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    shadowColor: "#0F8F45",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  quantityText: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "900",
  },
  lineTotal: {
    color: "#262222",
    fontSize: 14,
    fontWeight: "900",
  },
  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginTop: 6,
    borderWidth: 1,
    borderColor: "#EEE4E4",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
  },
  summaryLabel: {
    color: "#8B8585",
    fontSize: 14,
    fontWeight: "700",
  },
  summaryValue: {
    color: "#262222",
    fontSize: 14,
    fontWeight: "800",
  },
  divider: {
    height: 1,
    backgroundColor: "#EEE4E4",
    marginVertical: 8,
  },
  totalLabel: {
    color: "#262222",
    fontSize: 17,
    fontWeight: "900",
  },
  totalValue: {
    color: "#0F8F45",
    fontSize: 20,
    fontWeight: "900",
  },
});
