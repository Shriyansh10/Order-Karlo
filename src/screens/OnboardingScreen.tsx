import { View, Text } from "react-native";
import { Button } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import { getData } from "../services/local-data";

function OnboardingScreen() {
  const navigation = useNavigation<any>();

  

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Welcome to Order Karlo</Text>
      <Button onPress={() => navigation.navigate("Signup")}>Get Started</Button>
    </View>
  );
}

export default OnboardingScreen;
