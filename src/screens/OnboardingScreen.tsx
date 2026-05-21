import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

function OnboardingScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.screen}>
      <View style={styles.hero}>
        <View style={styles.logoBadge}>
          <Text style={styles.logoText}>OK</Text>
        </View>

        <Text style={styles.brand}>Order Karlo</Text>
        <Text style={styles.title}>Food delivery made simple</Text>
        <Text style={styles.subtitle}>
          Find nearby restaurants, add your favorites, and checkout in seconds.
        </Text>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.primaryButton,
          pressed && styles.primaryButtonPressed,
        ]}
        onPress={() => navigation.navigate("Signup")}
      >
        <Text style={styles.primaryButtonText}>Get Started</Text>
      </Pressable>
    </View>
  );
}

export default OnboardingScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F7F3F3",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingBottom: 34,
  },
  hero: {
    alignItems: "center",
    marginBottom: 44,
  },
  logoBadge: {
    width: 86,
    height: 86,
    borderRadius: 24,
    backgroundColor: "#D33135",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    shadowColor: "#D33135",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.24,
    shadowRadius: 18,
    elevation: 6,
  },
  logoText: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "900",
  },
  brand: {
    color: "#D33135",
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 10,
  },
  title: {
    color: "#262222",
    fontSize: 31,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    color: "#8B8585",
    fontSize: 15,
    fontWeight: "500",
    lineHeight: 22,
    textAlign: "center",
    maxWidth: 300,
  },
  primaryButton: {
    height: 56,
    borderRadius: 999,
    backgroundColor: "#D33135",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#D33135",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.22,
    shadowRadius: 14,
    elevation: 4,
  },
  primaryButtonPressed: {
    opacity: 0.84,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
  },
});
