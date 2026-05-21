import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "../screens/OnboardingScreen";
import LoginScreen from "../screens/(auth)/LoginScreen";
import SignupScreen from "../screens/(auth)/SignupScreen";
import TabNavigator from "./TabNavigator";
import { getData } from "../services/local-data";
import React from "react";
import {
  ProfileContext,
  type ProfileContextType,
} from "../context/ProfileContext";
import Loading from "../screens/Loading";

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const [isOnboarded, setIsOnboarded] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const context = React.useContext<ProfileContextType>(ProfileContext);

  React.useEffect(() => {
    const setup = async () => {
      const onboarded = await getData("isOnboarded");
      setIsOnboarded(onboarded);

      const loggedInUser = await getData("loggedInUser");

      if (onboarded && loggedInUser && context) {
        context.setProfile(loggedInUser);
        console.log(loggedInUser, context?.profile);

        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }

      setIsLoading(false);
    };

    setup();
  }, []);

  if (isLoading) {
    return (
      <Loading></Loading>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={
        isOnboarded ? (isLoggedIn ? "Tabs" : "Login") : "Onboarding"
      }
    >
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
      <Stack.Screen name="Signup" component={SignupScreen} options={{headerShown: false}} />
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default RootNavigator;
