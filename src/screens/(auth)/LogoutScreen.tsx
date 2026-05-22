import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { removeData } from "../../services/local-data";
import { useNavigation } from "@react-navigation/native";
import {
  ProfileContext,
  type ProfileContextType,
} from "../../context/ProfileContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LogoutScreen = () => {
  const context = React.useContext<ProfileContextType | null>(ProfileContext);
  const navigation = useNavigation<any>();

  const handleLogout = () => {
    removeData("loggedInUser");
    context?.setProfile(null);
    alert("Logged out successfully");
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>Account</Text>
        <Text style={styles.subtitle}>Manage your session and order data</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Session</Text>
        <Text style={styles.cardText}>
          Sign out from this device and return to the login screen.
        </Text>

        <Pressable
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleLogout}
        >
          <Text style={styles.primaryButtonText}>Logout</Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Order History</Text>
        <Text style={styles.cardText}>
          Clear your saved order history from local storage.
        </Text>

        <Pressable
          style={({ pressed }) => [
            styles.secondaryButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={async () => {
            await AsyncStorage.clear();
            alert("Cleared the Data and Logged out successfully");
            navigation.reset({
              index: 0,
              routes: [{ name: "Onboarding" }],
            });
            }}
          >
          <Text style={styles.secondaryButtonText}>Clear all Local Data and Logout</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LogoutScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F7F3F3",
    paddingHorizontal: 22,
    paddingTop: 34,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    color: "#262222",
    fontSize: 30,
    fontWeight: "900",
  },
  subtitle: {
    color: "#8B8585",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 6,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#EEE4E4",
    shadowColor: "#1F1A1A",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 3,
  },
  cardTitle: {
    color: "#262222",
    fontSize: 18,
    fontWeight: "900",
  },
  cardText: {
    color: "#8B8585",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
    marginTop: 7,
    marginBottom: 16,
  },
  primaryButton: {
    height: 50,
    borderRadius: 999,
    backgroundColor: "#D33135",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#D33135",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "900",
  },
  secondaryButton: {
    height: 50,
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.4,
    borderColor: "#D33135",
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    color: "#D33135",
    fontSize: 15,
    fontWeight: "900",
  },
  buttonPressed: {
    opacity: 0.84,
  },
});
