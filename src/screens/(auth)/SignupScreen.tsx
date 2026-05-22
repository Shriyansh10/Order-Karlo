import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ProfileContext,
  type ProfileContextType,
} from "../../context/ProfileContext";
import { getData, setData } from "../../services/local-data";

const SignupScreen = () => {
  const context = React.useContext<ProfileContextType>(ProfileContext);
  const setProfile = context!.setProfile;
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
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
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.brand}>Order Karlo</Text>
          <Text style={styles.title}>Create account</Text>
          <Text style={styles.subtitle}>Fresh meals, faster checkout.</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              placeholderTextColor="#A7A1A1"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#A7A1A1"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#A7A1A1"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <Pressable style={styles.primaryButton} onPress={handleSubmit}>
            <Text style={styles.primaryButtonText}>Register</Text>
          </Pressable>

          
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text style={styles.footerLink}> Login</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F7F3F3",
    justifyContent: "center",
    paddingHorizontal: 22,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingHorizontal: 22,
    paddingVertical: 28,
    shadowColor: "#1F1A1A",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 6,
  },
  header: {
    marginBottom: 26,
  },
  brand: {
    color: "#D33135",
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 10,
  },
  title: {
    color: "#262222",
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 8,
  },
  subtitle: {
    color: "#8B8585",
    fontSize: 14,
    fontWeight: "500",
  },
  form: {
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    color: "#3A3333",
    fontSize: 13,
    fontWeight: "700",
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#EEE4E4",
    borderRadius: 16,
    backgroundColor: "#FBF8F8",
    paddingHorizontal: 16,
    color: "#262222",
    fontSize: 15,
    fontWeight: "500",
  },
  primaryButton: {
    height: 54,
    borderRadius: 999,
    backgroundColor: "#D33135",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    shadowColor: "#D33135",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.22,
    shadowRadius: 14,
    elevation: 4,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  footerText: {
    color: "#8B8585",
    fontSize: 14,
    fontWeight: "500",
  },
  footerLink: {
    color: "#D33135",
    fontSize: 14,
    fontWeight: "800",
  },
});
