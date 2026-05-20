import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNavigator from "./HomeNavigator";
import DrawerNavigator from "./DrawerNavigator";
import DiningScreen from "../screens/DiningScreen";


const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Menu"
        component={HomeNavigator}
        options={{ headerShown: false, animation: "shift" }}
      />
      <Tab.Screen
        name="Dining"
        component={DiningScreen}
        options={{ animation: "shift" }}
      />
      <Tab.Screen
        name="Me"
        component={DrawerNavigator}
        options={{
          headerShown: false,
          animation: "shift",
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
