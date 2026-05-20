import { StyleSheet, TextInput, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Button } from "@react-navigation/elements";
import {
  ProfileContext,
  type ProfileContextType,
} from "../../context/ProfileContext";
import { getData, setData } from "../../services/local-data";

const SignupScreen = () => {
  const context = React.useContext<ProfileContextType>(ProfileContext);
  const setProfile = context!.setProfile;
  const [name, setName] = React.useState("Shriyansh");
  const [email, setEmail] = React.useState("agarwalshriyansh007@gmail.com");
  const [password, setPassword] = React.useState("root123");
  const navigation = useNavigation<any>();

  const handleSubmit = async () => {
    setProfile({ name, email });
    await setData("userData", { name, email, password });
    await setData("isOnboarded", true);
    navigation.reset({
      index: 0,
      routes: [{ name: "Tabs" }],
    });
  };

  return (
    <View>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button onPress={handleSubmit}>Register</Button>
      <Button
        onPress={async () => {
          console.log(
            context!.profile,
            await getData("userData"),
            await getData("isOnboarded"),
          );
        }}
      >
        Show Data
      </Button>
      <Button onPress={() => navigation.navigate("Login")}>
        Already have an account? Login
      </Button>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({});
