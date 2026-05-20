import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import CartScreen from "../screens/CartScreen";
import RestrauantScreen from "../screens/RestrauantScreen";
import HomescreenHeader from "../components/HomescreenHeader";
import React from "react";

const Stack = createNativeStackNavigator();

function HomeNavigator() {
  const [searchText, setSearchText] = React.useState<string>("");
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        options={{
          animation: "slide_from_left",

          headerTitle: () => (
            <HomescreenHeader
              location="New York"
              searchText={searchText}
              setSearchText={setSearchText}
            />
          ),
        }}
      >
        {(props) => <HomeScreen {...props} searchText={searchText} />}
      </Stack.Screen>
      <Stack.Screen
        name="Restrauant"
        component={RestrauantScreen}
        options={{
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          animation: "slide_from_bottom",
        }}
      />
    </Stack.Navigator>
  );
}

export default HomeNavigator;
