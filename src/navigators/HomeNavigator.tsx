import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import CartScreen from "../screens/CartScreen";
import RestaurantScreen from "../screens/RestaurantScreen";
import RestaurantScreenHeader from "../components/RestaurantscreenHeader";
import HomescreenHeader from "../components/HomescreenHeader";
import React from "react";
import { type CartType } from "../context/DataTypes";
import { CartContext } from "../context/CartContext";

const Stack = createNativeStackNavigator();

function HomeNavigator() {
  const [searchText, setSearchText] = React.useState<string>("");
  const [restaurantsSearchText, setRestaurantsSearchText] = React.useState<string>("");
  
 const [cart, setCart] = React.useState<CartType>({});

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{
            animation: "slide_from_left",

            headerTitle: () => (
              <HomescreenHeader
                location="Delhi, India"
                searchText={searchText}
                setSearchText={setSearchText}
              />
            ),
          }}
        >
          {(props) => <HomeScreen {...props} searchText={searchText} />}
        </Stack.Screen>
        <Stack.Screen
          name="Restaurant"
          options={{
            animation: "slide_from_right",
            headerTitle: () => (
              <RestaurantScreenHeader
                restaurantsSearchText={restaurantsSearchText}
                setRestaurantsSearchText={setRestaurantsSearchText}
              />
            ),
          }}
        >
          {(props) => (
            <RestaurantScreen {...props} searchText={restaurantsSearchText} />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{
            animation: "slide_from_bottom",
          }}
        />
      </Stack.Navigator>
    </CartContext.Provider>
  );
}

export default HomeNavigator;
