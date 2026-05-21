import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "@react-navigation/elements";
import { removeData } from "../../services/local-data";
import { useNavigation } from "@react-navigation/native";
import { ProfileContext, type ProfileContextType } from "../../context/ProfileContext";

const LogoutScreen = () => {
  const context = React.useContext<ProfileContextType|null>(ProfileContext)
  const handleLogout = () => {
    removeData("loggedInUser");
    context?.setProfile(null);
    alert("Logged out successfully");
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };
  const navigation = useNavigation<any>();
  return (
    <View>
      <View>
        <Button
          onPress={() => {
            handleLogout();
          }}
        >
          Logout
        </Button>
      </View>
      <View>
        <Button
          onPress={() => {
            removeData("orders");
            alert("Order history cleared!");
          }}
        >
          Clear Order History
        </Button>
      </View>
    </View>
  );
};

export default LogoutScreen;

const styles = StyleSheet.create({});
