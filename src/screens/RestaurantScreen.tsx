import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { restaurantsData } from "../data/restaurantData";
import { type CartType, type DishesType } from "../context/DataTypes";
import AddtoCartButton from "../components/AddtoCartButton";
import AddDishButton from "../components/AddDishButton";
import SubtractDishButton from "../components/SubtractDishButton";
import { CartContext, type CartContextType } from "../context/CartContext";
import CustomModal from "../components/CustomModal";

const RestaurantScreen = ({ searchText }: { searchText: string }) => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { restaurantId } = route.params;
  const restaurant = restaurantsData.find(
    (restaurant) => restaurant.id === restaurantId,
  );
  const context = React.useContext<CartContextType>(CartContext);
  const { cart, setCart } = context!;
  const [modalVisible, setModalVisible] = React.useState(false);

  React.useEffect(() => {
    console.log(cart);
    if (Object.entries(cart).some((cartItem) => cartItem[1].quantity > 0)) {
      setModalVisible(true);
    } else {
      setModalVisible(false);
    }
  }, [cart]);
  return (
    <View>
      <View>
        <Text>{restaurant?.name}</Text>
        <Text>{restaurant?.location}</Text>
      </View>

      <FlatList
        style={{ padding: 10, marginBottom: 100 }}
        data={restaurant?.dishes}
        renderItem={({ item }) => (
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <Text>{item.name}</Text>
              <Text>₹{item.price.toFixed(2)}</Text>
              {item.dishType === "veg" ? (
                <Text>Veg</Text>
              ) : (
                <Text>Non-Veg</Text>
              )}
            </View>
            <View>
              <Image
                source={{ uri: item.image }}
                style={{ width: 100, height: 100 }}
              />

              {cart[item.id]?.quantity > 0 ? (
                <View>
                  <SubtractDishButton item={item} setCart={setCart} />
                  <Text>{cart[item.id]?.quantity}</Text>
                  <AddDishButton item={item} setCart={setCart} />
                </View>
              ) : (
                <AddtoCartButton item={item} setCart={setCart} />
              )}
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      {modalVisible && (
        <CustomModal  restaurantId={restaurantId} textToDisplay="Proceed to Cart" comp="Cart" />
      )}
      {!modalVisible && (
        <CustomModal textToDisplay="Your cart is empty" comp="" />
      )}
    </View>
  );
};

export default RestaurantScreen;

const styles = StyleSheet.create({});
