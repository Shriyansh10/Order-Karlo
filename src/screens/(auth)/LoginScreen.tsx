import { StyleSheet, TextInput, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Button } from "@react-navigation/elements";
import {
  ProfileContext,
  type ProfileContextType,
} from "../../context/ProfileContext";
import { setData, getData } from "../../services/local-data";

const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const context = React.useContext<ProfileContextType>(ProfileContext);
  const setProfile = context!.setProfile;
  const [email, setEmail] = React.useState("agarwalshriyansh007@gmail.com");
  const [password, setPassword] = React.useState("root123");

  const handleSubmit = async () => {
    const userData = await getData("userData");
    if (
      userData &&
      userData.email === email &&
      userData.password === password
    ) {
      setProfile({ name: userData.name, email: userData.email });
    } else {
      alert("Invalid credentials");
      return;
    }
    await setData("loggedInUser", {
      name: userData.name,
      email: userData.email,
    });
    navigation.reset({
      index: 0,
      routes: [{ name: "Tabs" }],
    });
  };

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button onPress={handleSubmit}>Submit</Button>
      <Button onPress={() => navigation.navigate("Signup")}>
        Don't have an account? Sign Up
      </Button>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
