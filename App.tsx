import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigators/RootNavigator";
import { ProfileContext, type ProfileType } from "./src/context/ProfileContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import type { OrderType } from "./src/context/DataTypes";

export default function App() {
  const [profile, setProfile] = React.useState<ProfileType | null>(null);
  const [order, setOrder] = React.useState<OrderType>({});

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </ProfileContext.Provider>
  );
}
