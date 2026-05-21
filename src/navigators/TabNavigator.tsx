import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNavigator from "./HomeNavigator";
import DrawerNavigator from "./DrawerNavigator";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import Ionicons from "@react-native-vector-icons/ionicons";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Menu"
        component={HomeNavigator}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";

          return {
            headerShown: false,
            animation: "shift",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="menu" size={size} color={color} />
            ),
            tabBarStyle:
              routeName === "Restaurant" || routeName === "Cart"
                ? { display: "none" }
                : undefined,
          };
        }}
      />
      <Tab.Screen
        name="Me"
        component={DrawerNavigator}
        options={{
          headerShown: false,
          animation: "shift",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
