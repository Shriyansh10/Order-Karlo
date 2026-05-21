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
    <View
      style={{
        width: "90%",
        marginHorizontal: "auto",
        alignItems: "center",
        flex: 1,
      }}
    >
      <View>
        <View>
          <Text>Your Order</Text>
          <Text>
            <Text>Place: </Text>
            {restaurantName}
          </Text>
        </View>
        <FlatList
          style={{ backgroundColor: "red", flexGrow: 0, marginBottom: 20 }}
          data={Object.entries(cart)}
          renderItem={({ item }) => {
            const [id, itemData] = item;
            return (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text>{itemData.name}</Text>
                </View>
                <View>
                  <View>
                    <SubtractDishButton item={item[1]} setCart={setCart} dishId={item[0]} />
                    <Text>{cart[item[0]]?.quantity}</Text>
                    <AddDishButton item={item[1]} setCart={setCart} dishId={item[0]} />
                  </View>
                  <Text>
                    ₹{(itemData.price * itemData.quantity).toFixed(2)}
                  </Text>
                </View>
              </View>
            );
          }}
          keyExtractor={(cartItem) => cartItem[1].id}
        />
        <View>
          <Text>Item Total: ₹{itemTotal.toFixed(2)}</Text>
          <Text>Delivery Fee: ₹50</Text>
          <Text>Total Amount: ₹{(itemTotal + 50).toFixed(2)}</Text>
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

const styles = StyleSheet.create({});
