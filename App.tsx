import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigators/RootNavigator";
import { ProfileContext, type ProfileType } from "./src/context/ProfileContext";
import { enableScreens } from "react-native-screens";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

enableScreens();

export default function App() {
  const [profile, setProfile] = React.useState<ProfileType | null>(null);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </SafeAreaView>
      </SafeAreaProvider>
    </ProfileContext.Provider>
  );
}
