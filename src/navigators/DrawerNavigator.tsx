import { createDrawerNavigator } from "@react-navigation/drawer";
import LogoutScreen from "../screens/(auth)/LogoutScreen";
import ProfileScreen from "../screens/(auth)/ProfileScreen";
import OrdersScreen from "../screens/OrdersScreen";

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator screenOptions={{ drawerType: "front" }}>
      <Drawer.Screen name="Profile" component={ProfileScreen} />

      <Drawer.Screen name="Orders" component={OrdersScreen} />
      <Drawer.Screen name="Logout" component={LogoutScreen} />
    </Drawer.Navigator>
  );
}

export default MyDrawer;
